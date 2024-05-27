import './creative.scss';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SystemLogo, SystemName, SystemPicture } from "../../assets/data/data";
import { useAppContext } from "../../contexts/UseAppContext";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBriefcase, faCheck, faCubes, faDownload, faExclamationTriangle, faExpand, faGears, faLanguage, faMinus, faPowerOff, faRefresh, faMoon, faSun, faPlus, faXmark, faPalette, faMagnifyingGlass, faMagnifyingGlassLocation, faPen, faSliders, faT, faCrop, faCube, faMagnifyingGlassPlus, faTriangleExclamation, faArrowRight, faEraser, faGrip, faBold, faUnderline, faHighlighter, faItalic, faAlignLeft, faAlignCenter, faAlignRight, faAlignJustify, faArrowsUpDown, faArrowsLeftRight, faPencil, faArchive, faBars, faCompress } from "@fortawesome/free-solid-svg-icons";
import Select_creatives from "./select_creative";
import { RemoveScroll } from "react-remove-scroll";
import { useTranslation } from "react-i18next";
import { faEdit, faEye, faFolder, faHeart, faImage, faImages, faPenToSquare, faSave, faUser } from "@fortawesome/free-regular-svg-icons";
import { UseFiles } from "../WorkSpace/Files_display/useFiles";
import { IndexedDB, ajouterElementCreative, chercherElementCreative } from "../../assets/data/IndexedDB";
import Tools_filter from "./tools/tool_filter";
import logo from '../../assets/images/creative.png';
import Tool_text from "./tools/tool_text";
import Text_edit_Creative from './tools/components/text_edit';
import UseCreative from './useCreative';
import Text_edit_show_Creative from './tools/components/text_edit_show';




const Creative = () => {


    const {
        navigate,
        file_url,
        img_url,
        t,
        fileImgProject, setFileImgProject,


        //ref
        wrapperRef,
        canvasRef,
        canvasContainerRef,
        contextMenuRef,
        containerTextRef,
        canvasContainerScrollRef,
        sidebarRef,
        text_canvasRef,

        // state
        activeAnimation,
        hiddenMenuSidebare,
        activeExpandCreative,
        confirme_temporary,
        setConfirme_temporary,
        textCanvasVisible, setTextCanvasVisible,
        openTools, setopenTools,
        isVisible, setIsVisible,
        position,
        history, setHistory,
        setCtx,
        systemSetting, setSystemSetting,
        resetToDefault,
        saveTextCanvas,


        //fonction
        handleButtonClick,
        handleActiveExpandCreative,
        handleClick_confirme,
        handleContextMenu,
        draw, undo,
        handleRemoveSaveTextCanvas,


        //UseNavbar
        handleLogout,
        hiddenMenu,
        setHiddenMenu,
        setNotification,

        // UseAreaDrawCreative
        handleMouseDownResizing,
        handleMouseUpResizing,
        handleMouseMoveResizing,

        zoom, setZoom,
        handleDefaultDrawText,
        setDrawText,
        drawText,
    } = UseCreative()

    const {
        promise,
        GetMyFileFromLocal
    } = UseFiles()

    const { localTheme,
        handleFullScreen,
        handleModeEco,
        animationSelect,
        setLanguageSelect,
        handleTheme,
        promiseIdentifiedUser,
        systemDetectMobile
    } = useAppContext()




    useEffect(() => {
        if (!promiseIdentifiedUser || !file_url) {
            return;
        }
        GetMyFileFromLocal()
    }, [promiseIdentifiedUser, file_url])

    // Définir l'état local pour stocker les dimensions de l'image
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const rect = containerTextRef.current;
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }


        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = "Anonymous"; // Autoriser les requêtes cross-origin si nécessaire

        setCtx(ctx);

        img.onload = function () {
            // Redimensionner l'image pour s'adapter aux dimensions du canvas
            canvas.width = img.width;
            canvas.height = img.height;

            setImageSize({ width: img.width, height: img.height })

            ctx.filter = `
                brightness(${systemSetting?.brightness}%)
                contrast(${systemSetting?.contrast}%)
                saturate(${systemSetting?.saturation}%)
                sepia(${systemSetting?.sepia}%)
                hue-rotate(${systemSetting?.hue}deg)
                blur(${systemSetting?.blur}px)
                grayscale(${systemSetting?.grayscale}%)
                invert(${systemSetting?.invert}%)`;
            //invert(75%)

            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(img, 0, 0);

            if (null) {

                const text = drawText.value;
                const x = drawText.positionX - 17 + drawText.leftOffset; // Position horizontale du texte (au centre du canevas)
                const y = drawText.positionY - 11 + drawText.topOffset; // Position verticale du texte (au centre du canevas)
                ctx.font = `${drawText.fontSize}px Arial`; // Définissez la police et la taille du texte
                ctx.fillStyle = drawText.color; // Définissez la couleur de remplissage du texte
                ctx.textAlign = 'left'; // Même alignement que dans l'élément de texte HTML
                ctx.textBaseline = 'top'; // Même espacement que dans l'élément de texte HTML

                wrapText(ctx, text, x, y, drawText.width, drawText.height);
            }

            if (history.length === 0) {
                setHistory([{
                    img: canvasRef.current.toDataURL(),
                    setting: systemSetting
                }])
            }

            //if (rect) {
            //    // Définissez les propriétés du texte
            //    ctx.font = `${editeNumber}px Lato`; // Définissez la police et la taille du texte
            //    ctx.fillStyle = textColorCanvas; // Définissez la couleur de remplissage du texte
            //    //ctx.textAlign = 'start'; // Définissez l'alignement horizontal du texte
            //    //ctx.textBaseline = 'middle'; // Définissez l'alignement vertical du texte
            //    //ctx.fontWeight = 100;
            //    // Ajoutez du texte au canevas
            //    // ctx.fillText(text, x, y); // Dessinez le texte sur le canevas
            //    //ctx.resize = 'none';
            //}


            //applyTransformations(ctx, img);


        };

        img.src = img_url || SystemPicture;
    }, [
        drawText,
        img_url,
        SystemPicture,
        systemSetting,
    ]);


    function wrapText(ctx, text, x, y, maxWidth, maxHeight) {
        let line = '';
        let lineHeight = ctx.measureText('M').width * 1.35; // Estime de la hauteur de ligne
        let currentY = y;

        for (let i = 0; i < text.length; i++) {
            let testLine = line + text[i];
            let metrics = ctx.measureText(testLine);
            let testWidth = metrics.width;

            if (testWidth > maxWidth && line !== '') {
                if (currentY + lineHeight <= y + maxHeight) {
                    ctx.fillText(line, x, currentY);
                    line = text[i];
                    currentY += lineHeight;
                } else {
                    // Atteint la hauteur maximale, arrêtez de dessiner
                    return;
                }
            } else {
                line = testLine;
            }
        }

        // Dessine la dernière ligne de texte
        if (currentY + lineHeight <= y + maxHeight) {
            ctx.fillText(line, x, currentY);
        } else {
            // Atteint la hauteur maximale, arrêtez de dessiner
            return;
        }
    }


    const {
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        startX,
        startY,
        endX,
        endY,
        selecting
    } = Select_creatives()


    useEffect(() => {
        if (zoom) {
            canvasContainerScrollRef.current.getBoundingClientRect();
        }
    }, [canvasContainerScrollRef, zoom]);

    //console.log(saveTextCanvas);


    //console.log(activeExpandCreative);
    //console.log(activeExpandCreative, hiddenMenuSidebare, activeAnimation);

    //console.log(saveTextCanvas);

    let cursorPointer = openTools === 4 && { cursor: 'default' }


    //const hangleDrawText = ({ color2nd: color2nd, underline: underline, fontStyle: fontStyle, fontWeight: fontWeight }) => {
    //    console.log(underline);
    //    console.log(color2nd);
    //    setDrawText({ ...drawText, color2nd: color2nd, underline: underline })
    //}


    return (
        <>
            {isVisible &&
                <div className="contextMenuCreative open-element-page-meltedCreative" ref={contextMenuRef} style={{ top: position.y, left: position.x }} data-theme={localTheme}>
                    <div onClick={() => {
                        handleFullScreen({ img: canvasRef.current.toDataURL() })
                        setIsVisible(false)
                    }} className='button_optionCreative' style={{ justifyContent: 'start', height: 35 }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10, marginLeft: 10, color: '#ec1c24' }} icon={faEye} />{t('Preview')}</div>
                    <div onClick={() => {
                        setIsVisible(false)
                    }} className='button_optionCreative' style={{ justifyContent: 'start', height: 35 }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10, marginLeft: 10, color: '#ec1c24' }} icon={faDownload} />{t('download')}</div>
                    <div onClick={() => {
                        setIsVisible(false)
                    }} className='button_optionCreative' style={{ justifyContent: 'start', height: 35 }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10, marginLeft: 10, color: '#ec1c24' }} icon={faTriangleExclamation} />{t('problem')}</div>
                </div>}

            <RemoveScroll style={{ width: '100%', height: '100vh' }}>
                <div className='nav_bar_scndCreative' style={{ height: 40, top: 0, width: '100%', maxWidth: '100%', position: 'fixed', zIndex: 3000 }} data-theme={localTheme}>
                    <div style={{ display: 'flex', width: '99%', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {activeExpandCreative && <div className='button_option_container' style={{ width: '100%', maxWidth: 50, marginLeft: 10, display: 'flex', background: 'none' }} data-theme={localTheme}>
                                <div onClick={handleButtonClick} className='button_option' style={{ height: 30, width: 30, borderRadius: 100, marginRight: 5 }} data-theme={localTheme}><FontAwesomeIcon icon={faBars} /></div>
                            </div>}
                            <img className='logo_eventCreative' src={logo} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                            <div onClick={undo} className={history?.length > 1 ? 'button_optionCreative' : 'button_optionDisableCreative'} style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 80, marginRight: 5 }} data-theme={localTheme}>
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </div>
                            <div onClick={draw} className='button_optionCreative' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 80, marginLeft: 5 }} data-theme={localTheme}>
                                <FontAwesomeIcon icon={faArrowRight} />
                            </div>
                        </div>


                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div className='button_optionCreative' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 'max-content', marginRight: 5 }} data-theme={localTheme}>
                                <FontAwesomeIcon style={{ marginRight: 5 }} icon={faSave} />Save projet
                            </div>
                            <div className='button_optionCreative' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 'max-content', marginRight: 5 }} data-theme={localTheme}>
                                <FontAwesomeIcon style={{ marginRight: 5 }} icon={faDownload} />Download
                            </div>
                            <img onClick={() => { setHiddenMenu(!hiddenMenu) }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='Profile_picture_nav hovercursorCreative' src={promiseIdentifiedUser?.user.imageUrl || SystemLogo} alt="" />
                        </div>
                    </div>
                </div>



                <div className='rowDoublepositionCreative' style={{ width: '100%', display: 'flex', padding: 0, margin: 0, maxWidth: '100%', justifyContent: 'space-between' }}>
                    {!activeExpandCreative && <div className='rowDoublepositionContentCreative' style={{ width: '20%', minWidth: 316, maxWidth: 316, height: '100vh', display: 'block' }} data-theme={localTheme} />}
                    <div onMouseDown={(e) => {
                        if (textCanvasVisible) {
                            return null
                        }
                        return handleMouseDown(e)
                    }}
                        onMouseMove={(e) => {
                            if (!textCanvasVisible) {
                                return handleMouseMove(e)
                            }
                            return handleMouseMoveResizing(e)
                        }}
                        onMouseUp={(e) => {
                            if (!textCanvasVisible) {
                                return handleMouseUp(e)
                            }
                            return handleMouseUpResizing(e)
                        }}
                        onMouseLeave={handleMouseUp}
                        onContextMenu={handleContextMenu}
                        className='rowDoublepositionContentCreativeBody'
                        style={{
                            width: '100%',
                            height: '100vh',
                            minWidth: 155,
                            //background: 'none',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 0,
                            ...cursorPointer
                        }} data-theme={localTheme}>
                        {selecting && startX !== null && startY !== null &&
                            <div style={{
                                zIndex: 50,
                                position: 'absolute',
                                backgroundColor: 'rgba(237, 29, 36, 0.2)',
                                border: '1px solid #ec1c24',
                                left: Math.min(startX, endX),
                                top: Math.min(startY, endY),
                                width: Math.abs(endX - startX),
                                height: Math.abs(endY - startY),
                            }}
                            />}
                        <div ref={canvasContainerScrollRef}
                            style={{
                                //background: 'red',
                                height: '100%',
                                width: '100%',
                                marginTop: 40,
                                marginBottom: 40,
                                overflow: 'scroll',
                                //display: 'flex',
                                //alignItems: 'center',
                                //justifyContent: isImageLarger && zoom > 0.8 ? 'start' : 'center'
                                //background: 'yellow',
                            }}>
                            <div style={{
                                width: canvasContainerRef?.current?.getBoundingClientRect().width,
                                height: canvasContainerRef?.current?.getBoundingClientRect().height
                            }}>
                                <div ref={canvasContainerRef}
                                    style={{
                                        transform: `translate(0%, 0%) scale(${zoom})`,
                                        //transformOrigin: isImageLarger && zoom > 0.8 ? 'top left' : 'top',
                                        //transformOrigin: zoom > 1.0 ? 'top left' : 'top',
                                        //transformOrigin: 'center center',
                                        transformOrigin: 'top left',
                                        //marginLeft: 'auto',
                                        height: 'max-content',
                                        padding: 20,
                                        //margin: 20,
                                        width: 'max-content',
                                        transition: '100ms',
                                        //background: 'yellow'
                                    }}>
                                    <Text_edit_Creative
                                        text_canvasRef={text_canvasRef}
                                        textCanvasVisible={textCanvasVisible}
                                        drawText={drawText}
                                        setDrawText={setDrawText}
                                        handleMouseDownResizing={handleMouseDownResizing}
                                        containerTextRef={containerTextRef}
                                        localTheme={localTheme}
                                    />
                                    <Text_edit_show_Creative
                                        openTools={openTools === 4}
                                        saveTextCanvas={saveTextCanvas}
                                        localTheme={localTheme}
                                        textCanvasVisible={textCanvasVisible}
                                        setDrawText={setDrawText}
                                        setTextCanvasVisible={setTextCanvasVisible}
                                        handleRemoveSaveTextCanvas={handleRemoveSaveTextCanvas}
                                    />
                                    <canvas style={{ transform: 'translate(0%, 0%) scale(1)' }} ref={canvasRef} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {hiddenMenuSidebare && <div ref={sidebarRef} className={activeExpandCreative ? activeAnimation ? 'sidebarCreative open-element-page-side-left-creative' : 'sidebarCreative close-element-page-side-left-creative' : 'sidebarCreative'} data-theme={localTheme}>
                    <div className='scrollbarCreative' style={{ overflow: 'auto', height: '100%', width: '100%' }}>
                        <h4 style={{ margin: 10 }}>{SystemName}</h4>
                        <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', paddingTop: 10, borderBottom: '1px solid #3a3a3a' }}>

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 5, width: 100, height: 100, textAlign: 'center' }}>
                                <div onClick={() => !promise?.images ? setConfirme_temporary(false) : setFileImgProject(true)} style={{ height: 45, width: 45, marginBottom: 5, borderRadius: 5, fontSize: 23, border: promise.images ? 'none' : null }} className='buttonCircleCreative' data-theme={localTheme} >
                                    {promise?.images ? <img src={promise?.images[0].imageUrl ?? SystemLogo} style={{ height: 45, width: 45, objectFit: 'cover', objectPosition: '50% 20%', borderRadius: 5 }} alt="" />
                                        :
                                        <FontAwesomeIcon icon={faFolder} />}
                                </div>
                                {promise?.name || t('workspace')} pictures
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 5, width: 100, height: 100, textAlign: 'center' }}>
                                <div style={{ height: 45, width: 45, marginBottom: 5, borderRadius: 5, fontSize: 23 }} className='buttonCircleCreative' data-theme={localTheme} ><FontAwesomeIcon icon={faArchive} /></div>
                                Library
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 5, width: 100, height: 100, textAlign: 'center' }}>
                                <div style={{ height: 45, width: 45, marginBottom: 5, borderRadius: 5, fontSize: 23 }} className='buttonCircleCreative' data-theme={localTheme} ><FontAwesomeIcon icon={faFolder} /></div>
                                Projects
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 5, width: 100, height: 100, textAlign: 'center' }}>
                                <div style={{ height: 45, width: 45, marginBottom: 5, borderRadius: 5, fontSize: 23 }} className='buttonCircleCreative' data-theme={localTheme} ><FontAwesomeIcon icon={faImages} /></div>
                                pictures result
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 5, width: 100, height: 100, textAlign: 'center' }}>
                                <div style={{ height: 45, width: 45, marginBottom: 5, borderRadius: 5, fontSize: 23 }} className='buttonCircleCreative' data-theme={localTheme} ><FontAwesomeIcon icon={faPlus} /></div>
                                import pictures
                            </div>
                        </div>
                        <h4 style={{ margin: 10 }}>Tools</h4>
                        <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', paddingTop: 10, borderBottom: '1px solid #3a3a3a' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 5, width: 100, height: 100, textAlign: 'center' }}>
                                <div style={{ height: 45, width: 45, marginBottom: 5, borderRadius: 5, fontSize: 23 }} className='buttonCircleCreative' data-theme={localTheme} ><FontAwesomeIcon icon={faCrop} /></div>
                                Crop
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 5, width: 100, height: 100, textAlign: 'center' }}>
                                <div style={{ height: 45, width: 45, marginBottom: 5, borderRadius: 5, fontSize: 23 }} className='buttonCircleCreative' data-theme={localTheme} ><FontAwesomeIcon icon={faPencil} /></div>
                                Pen
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 5, width: 100, height: 100, textAlign: 'center' }}>
                                <div style={{ height: 45, width: 45, marginBottom: 5, borderRadius: 5, fontSize: 23 }} className='buttonCircleCreative' data-theme={localTheme} ><FontAwesomeIcon icon={faHeart} /></div>
                                Stickers
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 5, width: 100, height: 100, textAlign: 'center' }}>
                                <div onClick={() => {
                                    setopenTools(openTools === 4 ? null : 4)
                                    setTextCanvasVisible(false)
                                }} style={{ height: 45, width: 45, marginBottom: 5, borderRadius: 5, fontSize: 23 }} className={openTools === 4 ? 'buttonCircleCreative active' : 'buttonCircleCreative'} data-theme={localTheme} ><FontAwesomeIcon icon={faT} /></div>
                                Text
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 5, width: 100, height: 100, textAlign: 'center' }}>
                                <div onClick={() => { setopenTools(openTools === 5 ? null : 5) }} style={{ height: 45, width: 45, marginBottom: 5, borderRadius: 5, fontSize: 23 }} className={openTools === 5 ? 'buttonCircleCreative active' : 'buttonCircleCreative'} data-theme={localTheme} ><FontAwesomeIcon icon={faSliders} /></div>
                                Filter
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 5, width: 100, height: 100, textAlign: 'center' }}>
                                <div style={{ height: 45, width: 45, marginBottom: 5, borderRadius: 5, fontSize: 23 }} className='buttonCircleCreative' data-theme={localTheme} ><FontAwesomeIcon icon={faCube} /></div>
                                Form
                            </div>
                        </div>

                        <Tools_filter
                            openTools={openTools}
                            systemSetting={systemSetting}
                            setSystemSetting={setSystemSetting}
                            resetToDefault={resetToDefault}
                            draw={draw} />
                        <Tool_text
                            openTools={openTools}
                            handleDefaultDrawText={handleDefaultDrawText}
                            setTextCanvasVisible={setTextCanvasVisible}
                            textCanvasVisible={textCanvasVisible}
                            drawText={drawText}
                            setDrawText={setDrawText}
                        />

                    </div>
                    <div style={{ height: 40, minHeight: 40, width: '100%' }} />
                </div>}

                <div className='nav_bar_scndCreative' style={{ height: 40, bottom: 0, width: '100%', maxWidth: '100%', position: 'fixed', zIndex: 2000, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }} data-theme={localTheme}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className='button_optionCreative' style={{ borderRadius: 5, fontSize: 14, height: 30, paddingLeft: 5, paddingRight: 5, width: 'max-content', marginRight: 5, marginLeft: 5 }} data-theme={localTheme}>
                            <FontAwesomeIcon style={{ marginRight: 5 }} icon={faExclamationTriangle} />{t('problem')}
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div data-theme={localTheme}>{imageSize?.width}</div><FontAwesomeIcon style={{ marginLeft: 5, marginRight: 10 }} icon={faArrowsLeftRight} />
                        <div data-theme={localTheme}>{imageSize?.height}</div><FontAwesomeIcon style={{ marginLeft: 5 }} icon={faArrowsUpDown} />
                        <input min={0.5} max={20.0} step={0.1} value={zoom} onChange={(e) => { setZoom(e.target.value) }} style={{ minWidth: 200, marginLeft: 5 }} className="range-input" type="range" name="" id="" />
                        <div style={{ display: 'flex', alignItems: 'center', marginRight: 5, marginLeft: 5, minWidth: 50 }}>{zoom}%</div>
                        <div className='button_optionCreative' onClick={() => { handleFullScreen({ img: canvasRef.current.toDataURL() }) }} style={{ borderRadius: 5, fontSize: 14, height: 30, paddingLeft: 5, paddingRight: 5, width: 30, marginRight: 5, marginLeft: 5 }} data-theme={localTheme}>
                            <FontAwesomeIcon icon={faEye} />
                        </div>
                        <div className={activeExpandCreative ? 'buttonCircleCreative' : 'buttonCircleCreative active'} onClick={handleActiveExpandCreative} style={{ borderRadius: 5, fontSize: 14, height: 30, paddingLeft: 5, paddingRight: 5, width: 30, marginRight: 5, marginLeft: 5 }} data-theme={localTheme}>
                            <FontAwesomeIcon icon={activeExpandCreative ? faCompress : faExpand} />
                        </div>
                        <div className='button_optionCreative' style={{ borderRadius: 5, fontSize: 14, height: 30, paddingLeft: 5, paddingRight: 5, width: 30, marginRight: 5, marginLeft: 5 }} data-theme={localTheme}>
                            <FontAwesomeIcon icon={faGears} />
                        </div>
                    </div>
                </div>


                {fileImgProject && <div className='blanket' style={{ zIndex: 25000, display: 'flex', alignItems: 'start', justifyContent: 'center', top: 0 }} >
                    <div className='menu_navbar open-element-page-melted' style={{ width: '90%', height: '100vh', maxWidth: '100%', alignItems: 'center', justifyContent: 'start', padding: 0, margin: 0 }} data-theme={localTheme}>
                        <div className='nav_bar_scnd' style={{ width: '100%', maxWidth: '100%', borderRadius: 0 }} data-theme={localTheme}>
                            <div style={{ display: 'flex', width: '98%', alignItems: 'center', justifyContent: 'space-between' }}>
                                <h4 style={{ margin: 10 }}>Creatives</h4>

                                <div onClick={() => { setFileImgProject(false) }} className='button_option' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 'max-content', marginRight: 5 }} data-theme={localTheme}>
                                    <FontAwesomeIcon icon={faXmark} />
                                </div>
                            </div>
                        </div>
                        <div className="scrollbar" style={{ overflowY: 'auto', display: 'flex', justifyContent: 'space-around', flexDirection: 'row', flexWrap: 'wrap' }}>
                            {promise?.images?.map((promise, index) => (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '15px 10px 15px 10px' }} key={index}>
                                    <img
                                        className="hovercursor"
                                        onClick={() => {
                                            handleFullScreen({
                                                img: promise.imageUrl || SystemLogo,
                                                filter: systemSetting
                                            })
                                        }}
                                        src={promise.imageUrl}
                                        style={{
                                            objectFit: 'cover',
                                            objectPosition: `50% 10%`,
                                            margin: '10px 10px 0px 10px',
                                            borderRadius: 5,
                                            cursor: 'pointer',
                                            height: 200,
                                            width: 200,
                                            borderRadius: 10,
                                        }} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                                    <div>image{index + 1}</div>
                                    <div onClick={() => {
                                        setHistory([])
                                        resetToDefault()
                                        if (file_url) {
                                            //setOriginalImage(promise.imageUrl)
                                            //setNameTemplate(promise.id)
                                            navigate({ search: `${SystemName}-file=${file_url}&${SystemName}-img=${promise.imageUrl}` })
                                            setFileImgProject(false)
                                        }
                                    }} className='button_option' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 150, marginTop: 5 }} data-theme={localTheme}>
                                        Edit<FontAwesomeIcon style={{ marginLeft: 5 }} icon={faEdit} />
                                    </div>
                                </div>))}
                        </div>
                    </div>
                </div>}

                {hiddenMenu &&
                    <div style={{
                        width: '90%',
                        maxWidth: 400,
                        overflow: 'auto',
                        maxHeight: 420,
                        position: 'fixed',
                        top: 50,
                        left: '98%',
                        transform: 'translate(-98%, 0%)',
                        zIndex: 30000
                    }} ref={wrapperRef} className='menu_navbar menu_navbar_nav980 menu_navbar_navPc scrollbar open-element-page-meltedCreative' data-theme={localTheme}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Link onClick={() => {
                                setHiddenMenu(false)
                            }} to={`/profile/${promiseIdentifiedUser?.user.id}/home?type=Illustrations`} style={{ backgroundImage: `url(${promiseIdentifiedUser?.user.imageUrlCover || SystemPicture})`, backgroundPosition: `50% ${promiseIdentifiedUser?.user.resizeImageUrlCover}%`, borderRadius: 15 }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='CoverImage FlexEmbed FlexEmbed--2by1'>
                            </Link>
                            <Link className='text' onClick={() => {
                                setHiddenMenu(false)
                            }} style={{ zIndex: 10, textDecoration: 'none' }} to={`/profile/${promiseIdentifiedUser?.user.id}/home?type=Illustrations`} data-theme={localTheme}>
                                <img style={{ cursor: 'pointer', width: 100, height: 100, borderRadius: '100%', marginTop: -100 }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='Profile_picture_nav hovercursorCreative' src={promiseIdentifiedUser?.user.imageUrl || SystemLogo} alt="" />
                                <div className='title_color' style={{ textAlign: 'center', fontSize: 18, fontWeight: 800 }} translate='no'>{promiseIdentifiedUser?.user.pseudo}</div>
                            </Link>
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                                <div onClick={handleTheme} className='buttonCircle' style={{ width: 23, height: 23, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, marginRight: 10, border: 'none' }} data-theme={localTheme}>
                                    {localTheme === null && <FontAwesomeIcon icon={faMoon} />}
                                    {localTheme === 'default' && <FontAwesomeIcon icon={faMoon} />}
                                    {localTheme === 'dark' && <FontAwesomeIcon icon={faSun} />}
                                </div>
                                {!systemDetectMobile && <div className='buttonCircle' onClick={handleModeEco} style={{ color: animationSelect === 'eco' ? '#00aa00' : '#ec1c24', width: 23, height: 23, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, marginRight: 10, border: 'none' }} data-theme={localTheme}>
                                    <FontAwesomeIcon icon={faCubes} />
                                </div>}
                                <div onClick={() => {
                                    setHiddenMenu(false)
                                    setLanguageSelect(null)
                                }} className='buttonCircle' style={{ width: 23, height: 23, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, marginRight: 10, border: 'none' }} data-theme={localTheme}>
                                    <FontAwesomeIcon icon={faLanguage} />
                                </div>
                            </div>
                            <div className='button_option_container' style={{ width: '90%', marginTop: 10 }} data-theme={localTheme}>
                                <Link className='button_option' onClick={() => {
                                    setHiddenMenu(false)
                                }} to={'/works/file'} data-theme={localTheme} >
                                    <FontAwesomeIcon style={{ marginRight: 5 }} icon={faBriefcase} />
                                    {t('workspace')}
                                </Link>
                            </div>

                            <div className='button_option_container' style={{ width: '90%', marginTop: 10 }} data-theme={localTheme}>
                                <Link to={`/parameters/profile`} className='button_option' onClick={() => {
                                    setNotification(false)
                                    setHiddenMenu(!hiddenMenu)
                                }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 5 }} icon={faGears} />{t('parameter')}</Link>
                            </div>

                            <div className='button_option_container' style={{ width: '90%', marginTop: 20 }} data-theme={localTheme}>
                                <div className='button_optionRed' onClick={handleLogout} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 5 }} icon={faPowerOff} />{t('logout')}</div>
                            </div>
                        </div>
                    </div>}

                {promise === false && <div className='blanket open-element-page-melted' style={{ zIndex: 50000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                    <div className='cter_sect' style={{ paddingBottom: 25 }}>
                        <div className='ctent_arti' style={{ overflow: 'visible', maxWidth: 1000 }} data-theme={localTheme}>
                            <h2>Message d'avertissement</h2>
                            <div style={{ width: '90%' }}>
                                <p>Cher utilisateur,</p>
                                <p>Nous tenons à vous rappeler qu'il est strictement interdit d'essayer d'accéder à un document qui appartient à un autre utilisateur sans sa permission, que ce soit par des moyens directs ou indirects. Cette politique est en place pour garantir la confidentialité et la sécurité des données de tous nos utilisateurs.</p>
                                <p>Accéder à des documents appartenant à d'autres utilisateurs constitue une violation de la vie privée et peut entraîner des conséquences graves, y compris la résiliation de votre compte et des mesures légales si nécessaire.</p>
                                <p>Si vous rencontrez des problèmes d'accès à un document qui vous appartient légitimement, nous vous encourageons vivement à nous en informer immédiatement en signalant un bug. Nous prendrons toutes les mesures nécessaires pour résoudre le problème et vous assurer un accès sécurisé à vos documents.</p>
                                <p>Nous vous remercions de votre coopération et de votre compréhension.</p>
                                <p>Cordialement,<br />L'équipe de votre service</p>
                            </div>

                            <Link to={'/parameters/assistance'} className='button_option_container' style={{ width: '90%', marginTop: 20, maxWidth: 300 }} data-theme={localTheme}>
                                <div className='button_optionBlue'>{t('assistance')}</div>
                            </Link>

                            <div className='button_option_container_free' style={{ width: '90%', marginTop: 20, maxWidth: 300 }} data-theme={localTheme}>
                                <div className='button_optionPic_v'>{t('continue')}</div>
                            </div>
                        </div>
                    </div>
                </div>}

                {!confirme_temporary && <div className='blanket open-element-page-melted scrollbar' style={{ overflow: 'auto', zIndex: 40000, display: 'flex', alignItems: 'start', justifyContent: 'center' }} >
                    <div className='cter_sect' style={{ paddingBottom: 25, marginTop: 20 }}>
                        <div className='ctent_arti' style={{ overflow: 'auto', maxWidth: 1000 }} data-theme={localTheme}>
                            <h2>Creative</h2>
                            <div style={{ width: '90%' }}>
                                <h4>Des fonctionnalités intuitives :</h4>
                                <ul>
                                    <li><strong>Luminosité et Contraste :</strong> Modifiez la luminosité pour éclaircir ou assombrir vos images, et ajustez le contraste pour rendre les couleurs plus dynamiques.</li>
                                    <li><strong>Saturation et Teinte :</strong> Donnez à vos images un éclat supplémentaire en augmentant ou en diminuant la saturation, et ajustez la teinte pour des résultats plus précis.</li>
                                    <li><strong>Effets Artistiques :</strong> Explorez une gamme d'effets artistiques pour transformer vos photos en véritables œuvres d'art.</li>
                                </ul>
                            </div>

                            <h4>{SystemName} projets :</h4>


                            <div style={{ width: '90%' }}>
                                <p>Pour accéder au projet Artvibes, veuillez suivre ces étapes simples :</p>

                                <ol>
                                    <li>Connectez-vous à votre compte et accédez à votre espace de travail (workspace).</li>
                                    <li>Ouvrez le projet dans lequel vous souhaitez utiliser Creative.</li>
                                    <li>Une fois dans le projet, recherchez l'onglet ou le bouton "Creative".</li>
                                    <li>Cliquez sur "Creative" pour lancer l'application et commencer à travailler sur votre projet Artvibes.</li>
                                </ol>
                            </div>

                            <div style={{ color: 'grey', width: '90%' }}>
                                <h4 style={{ color: '#0077ff' }}>Avertissement sur les droits d'auteur et la propriété intellectuelle :</h4>
                                <p>En téléchargeant ou en modifiant du contenu sur ce site, vous reconnaissez et acceptez que vous êtes seul responsable du contenu que vous fournissez. Vous garantissez que vous avez le droit de télécharger et de modifier ce contenu, et que celui-ci ne viole aucun droit d'auteur, marque déposée, brevet ou autre droit de propriété intellectuelle d'une tierce partie.</p>
                                <p>Vous comprenez que toute violation des droits d'auteur ou des lois sur la propriété intellectuelle est strictement interdite et peut entraîner des conséquences légales, y compris des réclamations en dommages et intérêts et des poursuites judiciaires.</p>
                                <p>Nous nous réservons le droit de supprimer tout contenu que nous jugeons inapproprié ou en violation de ces conditions d'utilisation, ainsi que de prendre des mesures contre les utilisateurs qui enfreignent ces règles, y compris la résiliation de leur accès à notre site.</p>
                                <p>Merci de votre compréhension et de votre coopération.</p>
                            </div>
                            <div onClick={handleClick_confirme} className='button_option_container_free' style={{ width: '90%', marginTop: 20, maxWidth: 300 }} data-theme={localTheme}>
                                <div className='button_optionPic_v'>{t('continue')}</div>
                            </div>
                        </div>
                    </div>
                </div>}

            </RemoveScroll >
        </>
    )
}

export default Creative