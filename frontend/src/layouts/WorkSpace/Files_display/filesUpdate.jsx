import { UseFiles } from './useFiles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faRefresh, faBell, faListCheck, faLink, faXmark, faListUl, faAngleDoubleUp, faAngleDoubleDown, faDisplay, faDownload, faTableCellsLarge, faBagShopping, faEllipsisVertical, faBookOpen, faCheck, faArrowRight, faPhotoFilm, faCloudArrowUp, faRoute, faTrash, faBan, faTrashArrowUp, faUser, faUserTag } from '@fortawesome/free-solid-svg-icons';
import Picture from '../../../assets/images/logo.png';
import Card_picture from '../../../components/Cards/Card_picture';
import { Editor } from 'draft-js';
import { spinner } from '../../../utils';
import { RemoveScroll } from 'react-remove-scroll';
import { useAppContext } from '../../../contexts/UseAppContext';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { faCopy, faImages } from '@fortawesome/free-regular-svg-icons';
import imgCoverCard from '../../../assets/images/scene-tranquille-fleurs-cerisier-au-printemps-generee-par-ia.jpg';
import useKeypress from 'react-use-keypress';
import { useRef, useState } from 'react';



const FilesUpdate = () => {

    const { t } = useTranslation();


    const refUp = useRef(null);
    const ref = useRef(null);

    const { localTheme, localThemeBackground, promiseIdentifiedUser } = useAppContext();

    const { promise, setPromise, items, setItems, edite, editeTags, text, handleRemoveTag, GetMyFileFromAPI,
        refresh, handleAutoRefresh, refreshAuto,
        setEditorState, editorState,
        resize, handleRange, setResize,
        img,
        imgUpload,
        handleRemoveImgUpload,
        editeAdult, setEditeAdult,
        editeVisibility, setEditeVisibility,
        comments, setComments,
        Update,
        handleChange,
        handleChangeTags,
        handleClick,
        hiddenFileInput,
        editor,
        handleLoad,
        removeImage,
        deleteSpin,
        navigate,
        message,
        err,
        messageDownloadImg,
        editeAI, setEditeAI,
        downloadImg,
        notifyCommunity, allowUserEditTag,
        setNotifyCommunity, setAllowUserEditTag,
        autoLayout, setAutoLayout,
        copyShow,
        handleRestoreImage,
        handleDeleteImage,
        handleSelectedAllImage,
        handleCopyShow,
        handleDeleteImg,
        onClick,
        manage, setManage,
        manageSelected, setManageSelected,
        manageBlockSelectedActive, setManageBlockSelectedActive,
        manageBlockSelected, setManageBlockSelected,
        commonOption, setCommonOption,
        isVisible, position,
        contextMenuRef,
        handleContextMenu,
        setIsVisible,
        GetMyFileFromLocal,
        test, setTest
    } = UseFiles();

    //useKeypress(['Control', 's'], (event) => {
    //    event.preventDefault();
    //    if (items.length === 0) return;
    //    if (deleteSpin !== true) return;
    //    // Vérifier si la combinaison de touches est "Ctrl + S"
    //    if (event.ctrlKey && event.key === 's') {
    //        Update(promise?.id)
    //        // Ajoutez ici votre logique pour sauvegarder le contenu, par exemple.
    //    }
    //});

    if (promise === false) return (
        <div className='cter_sect' style={{ paddingBottom: 20, marginTop: 25 }}>
            <div style={{ backgroundImage: `url(${imgCoverCard})`, backgroundPosition: `50% ${50}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth: 600 }} className='CoverImage FlexEmbed FlexEmbed--2by1'>
                <div className='shadowbox' style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white' }}>
                    <h1>{t('projectDeletedMessage.title')}</h1>
                    <div className="copy-box two">
                        <div className="inner">
                            <div className="line right"></div>
                            <div>{t('projectDeletedMessage.message1')}</div>
                            <ol>
                                <li>{t('projectDeletedMessage.message2')}</li>
                                <li>{t('projectDeletedMessage.message3')}</li>
                            </ol>
                        </div>
                    </div>
                    <div className='button_option_container' style={{ width: '90%', marginTop: 20 }} data-theme={localTheme}>
                        <div onClick={() => navigate(-1)} className='button_option' data-theme={localTheme}>{t('Back_to_previous_page')}</div>
                    </div>
                </div>
            </div>
        </div>
    )


    return (
        <div onContextMenu={handleContextMenu} ref={contextMenuRef} className='open-elementPage'>
            {isVisible &&
                <div className="contextMenu animation" ref={contextMenuRef} style={{ top: position.y, left: position.x, width: 280 }} data-theme={localTheme}>
                    {!manageBlockSelectedActive && <>{refreshAuto ?
                        <div onClick={() => {
                            setIsVisible(false)
                            handleAutoRefresh()
                        }} className='button_option' style={{ justifyContent: 'start', height: 35 }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10, marginLeft: 10, color: '#ec1c24' }} icon={faBan} />{t('autoRefresh')}</div>
                        :
                        <div onClick={() => {
                            setIsVisible(false)
                            refresh ? GetMyFileFromLocal() : console.log('wait')
                        }} className='button_option' style={{ justifyContent: 'start', height: 35 }} data-theme={localTheme}><FontAwesomeIcon className={refreshAuto ? 'rotate' : refresh ? '' : 'rotate'} style={{ marginRight: 10, marginLeft: 10, color: '#ec1c24' }} icon={faRefresh} />{t('refresh')} (Local)</div>}</>}
                    <div onClick={() => {
                        setIsVisible(false)
                        handleClick()
                    }} className='button_option' style={{ justifyContent: 'start', height: 35 }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10, marginLeft: 10, color: '#ec1c24' }} icon={faImages} />{t('addPictures')}</div>
                    <div onClick={() => {
                        setIsVisible(false)
                        Update(promise?.id)
                    }} className='button_option' style={{ justifyContent: 'start', height: 35 }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10, marginLeft: 10, color: '#ec1c24' }} icon={faCloudArrowUp} />{t('save')}</div>
                    <div onClick={() => {
                        setIsVisible(false)
                        onClick()
                    }} className='button_option' style={{ justifyContent: 'start', height: 35 }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10, marginLeft: 10, color: '#ec1c24' }} icon={faTrashArrowUp} />{t('delete')}</div>

                    {manageSelected?.length === 0 ? <div onClick={() => {
                        setIsVisible(false)
                        handleSelectedAllImage(items)
                        setManageBlockSelected([])
                    }} className='button_option' style={{ justifyContent: 'start', height: 35, borderTop: '2px solid #ec1c24' }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10, marginLeft: 10, color: '#0084ff' }} icon={faListCheck} />{t('allSelected')} ({t('images')}:{manageSelected?.length}/{items?.length})</div>
                        :
                        <div onClick={() => {
                            setIsVisible(false)
                            setManage(false)
                            setManageSelected([])
                            setManageBlockSelected([])
                        }} className='button_option' style={{ justifyContent: 'start', height: 35, borderTop: '2px solid #ec1c24' }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10, marginLeft: 10, color: '#ec1c24' }} icon={faListUl} />{t('cancelSelection')} ({t('images')}:{manageSelected?.length}/{items?.length})</div>}

                    {!manageBlockSelectedActive ? <div onClick={() => {
                        setIsVisible(false)
                        setManageBlockSelectedActive(true)
                        setManageBlockSelected([])
                    }} className='button_option' style={{ justifyContent: 'start', height: 35 }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10, marginLeft: 10, color: '#ffbb00' }} icon={faRoute} /><span style={{ fontWeight: 900, marginRight: 5 }}>({t('activate')})</span> {t('workFile.selectionAnBlock.selectionBlock')}</div>
                        :
                        <div onClick={() => {
                            setIsVisible(false)
                            setManageBlockSelectedActive(false)
                            setManageBlockSelected([])
                        }} className='button_option' style={{ justifyContent: 'start', height: 35 }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10, marginLeft: 10, color: '#ffbb00' }} icon={faRoute} /><span style={{ fontWeight: 900, marginRight: 5 }}>({t('disable')})</span> {t('workFile.selectionAnBlock.selectionBlock')}</div>}

                    {test?.length !== 0 && <div onClick={() => {
                        setIsVisible(false)
                        handleDeleteImg(test)
                    }} className='button_option' style={{ justifyContent: 'start', height: 35, borderTop: '2px solid #ec1c24' }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10, marginLeft: 10, color: '#ec1c24' }} icon={faTrash} /><span style={{ fontWeight: 900, marginRight: 5 }}>{t("delete")}</span></div>}
                    {manageSelected?.length !== 0 && <div onClick={() => manageSelected?.length === 0 ? null : handleDeleteImg(manageSelected)} className='button_option' style={{ justifyContent: 'start', height: 35, borderTop: '2px solid #ec1c24' }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10, marginLeft: 10, color: '#ec1c24' }} icon={faTrash} /><span style={{ fontWeight: 900, marginRight: 5 }}>{t("delete")}</span>({t('images')} {t('select')})</div>}
                </div>}

            {commonOption && <RemoveScroll className='blanket scrollbar' style={{ zIndex: 25000, display: 'flex', alignItems: 'start', justifyContent: 'center', top: 0, overflowY: 'auto' }} >
                <div className='menu_navbar open-elementPage' style={{ width: '100%', flexDirection: 'column', maxWidth: 600, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }} data-theme={localTheme}>

                    <h3>{t("options")}</h3>
                    <div>Delete Images Select:</div>
                    <div className='button_option_container' style={{ width: '100%', maxWidth: 300, marginTop: 10 }} data-theme={localTheme}>
                        <div onClick={() => manageSelected?.length === 0 ? null : handleDeleteImg(manageSelected)} className='button_optionPic_v' data-theme={localTheme}>{t("permanentlyDelete")}</div>
                    </div>

                    <div className='button_option_container' style={{ width: '100%', maxWidth: 300, marginTop: 40 }} data-theme={localTheme}>
                        <div onClick={() => { setCommonOption(false) }} className='button_option' data-theme={localTheme}>{t("cancel")}</div>
                    </div>
                </div>
            </RemoveScroll>}

            {img?.length != 0 &&
                <RemoveScroll className='blanket' style={{ zIndex: 25000, display: 'flex', alignItems: 'start', justifyContent: 'center', top: 0, overflowY: 'auto' }} >
                    <div className='menu_navbar open-elementPage' style={{ width: '90%', maxWidth: 1800, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }} data-theme={localTheme}>
                        <div className='cter_sect' style={{ padding: 0 }}>
                            <div className='button_option_container' style={{ width: '100%', maxWidth: 500, display: 'flex' }} data-theme={localTheme}>
                                <div className='button_option' onClick={removeImage} data-theme={localTheme}>
                                    {t('cancel')}
                                </div>
                                <div className='button_optionPic_v' onClick={handleClick} data-theme={localTheme}>
                                    {t('addPictures')}
                                </div>
                                {img != '' && <>
                                    <div className='button_optionBlue' onClick={() => {
                                        downloadImg(promise?.id, items)
                                    }} style={{ width: '100%' }} data-theme={localTheme}>{t('save')}</div></>}
                                <input ref={hiddenFileInput} onChange={handleLoad} accept=".png, .jpg, .jpeg, .gif" type='file' multiple={true} key={imgUpload} hidden={true} />
                            </div>
                            <div style={{ width: '95%' }}>{t('addPictures')}:</div>
                            {img?.length != 0 && <div>{t('images')} : <span>{img?.length}</span>/<span>{Math.abs(items?.length - 200)}</span></div>}

                            {img?.length == 0 && <div className='scrollbar' style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                                <div onClick={handleClick} style={{ height: 200, width: 100, border: '1px dashed grey', borderRadius: 15, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </div>
                            </div>}

                            {img != '' && <div className='scrollbar' style={{ width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', marginBottom: 10 }}>
                                {img?.map((imgUrl, index) => (
                                    <div className='card_picture' key={index} data-theme={localTheme}>
                                        <img loading="lazy" className='picture_hover' onClick={() => handleRemoveImgUpload(imgUrl, index)} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ borderRadius: 15, objectFit: 'contain', margin: 5 }} src={imgUrl.file} alt="" data-sizes={img?.length <= 10 && 'big' || img?.length <= 20 && 'medium' || img?.length > 40 && 'small'} />
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                            {promise?.images.filter((array) => array.imageUrl.split('/')[4].split('-')[1] == imgUrl.name)[0]?.imageUrl.split('/')[4].split('-')[1] == imgUrl.name && <FontAwesomeIcon style={{ marginRight: 10, color: 'red' }} icon={faCopy} />}
                                            <div style={{ marginRight: 10, fontWeight: 800 }}>{index + 1}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>}
                        </div>
                    </div>
                </RemoveScroll>}

            {!refresh &&
                <RemoveScroll removeScrollBar={false} className='blanket' style={{ zIndex: 25000, display: 'flex', alignItems: 'center', justifyContent: 'center', top: 0, overflowY: 'auto', flexDirection: 'column' }} >
                    <div className='card_user animation' style={{ margin: 10, display: 'flex', alignItems: 'center', flexDirection: 'column' }} data-theme={localTheme}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ objectPosition: '50% 10%', objectFit: 'cover' }} src={promise.miniature || Picture} alt='' />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div>
                                {promise.type === 'Illustrations' && <FontAwesomeIcon style={{ marginRight: 5 }} icon={faImages} />}
                                {promise.type === 'Manga' && <FontAwesomeIcon style={{ marginRight: 5 }} icon={faBookOpen} />}
                                {promise.name}
                            </div>
                        </div>
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 'bolder', display: 'flex' }}><span><FontAwesomeIcon className='rotate' icon={faRefresh} /></span>Initialization in progress<div className='ellipsis-animation'></div></div>
                </RemoveScroll>}


            {!deleteSpin &&
                <RemoveScroll removeScrollBar={false} className='blanket' style={{ zIndex: 24000, display: 'flex', alignItems: 'start', justifyContent: 'center', top: 0, overflowY: 'auto' }} >
                    <div className='button_option_container animation' style={{
                        width: 'max-content',
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        zIndex: 1000,
                        padding: 10,
                        background: 'black',
                        transform: 'translate(-50%, -50%)'
                    }} data-theme={localTheme}>
                        <div style={{ fontSize: 20, fontWeight: 'bolder', display: 'flex' }}><span><FontAwesomeIcon className='rotate' icon={faRefresh} /></span>Stand by<div className='ellipsis-animation'></div></div>
                    </div>
                </RemoveScroll>}

            <div className='cter_sect' style={{ paddingBottom: 20 }}>
                <div className='ctent_arti' data-theme={localTheme}>
                    <div className="copy-box two" data-theme={localTheme}>
                        <div className="inner">
                            <div className="line right"></div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <div className='button_option_container' style={{ width: 'max-content' }} data-theme={localTheme}>
                                    <div className={!manageBlockSelectedActive ? 'button_optionPic_v' : 'button_optionDisable'} onClick={!manageBlockSelectedActive ? () => { refreshAuto ? console.log('refresh-auto active') : refresh ? GetMyFileFromAPI() : console.log('wait') } : null} style={{ width: 50 }} data-theme={localTheme}>
                                        <FontAwesomeIcon className={refreshAuto ? 'rotate' : refresh ? '' : 'rotate'} icon={faRefresh} />
                                    </div>
                                </div>
                                <div className="checkbox-wrapper-46" style={{ marginLeft: 10 }}>
                                    <input checked={refreshAuto} onChange={handleAutoRefresh}
                                        className="inp-cbx" id="hj544565" type="checkbox" />
                                    <label className="cbx" htmlFor="hj544565"><span>
                                        <svg width="12px" height="12px" viewBox="0 0 12 10">
                                            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                        </svg></span><span style={{ marginLeft: 10 }}>{t('autoRefresh')} ?</span>
                                    </label>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <p style={{ width: '100%' }}>
                                    {t('workFile.refreshNotice')}
                                    <Link style={{ color: '#0077ff' }} to={'/works/help'}>{t('knowMore')}</Link>
                                </p>
                                <div style={{ width: '90%' }}>{t('workFile.refreshNotice2')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='cter_sect' style={{ paddingBottom: 20, marginTop: 25 }}>
                <div className='ctent_arti' style={{ maxWidth: 900, overflow: 'visible' }} data-theme={localTheme}>
                    <div style={{ marginTop: 10, width: '90%' }}>{t('name')} :</div>
                    <input style={{ marginTop: 10, width: '80%', maxWidth: '80%' }} className='input_text' onChange={(e) => { handleChange(e) }} defaultValue={edite} placeholder='Named' type="text" name="Named" id="Named" data-theme={localTheme} />

                    <div style={{ marginTop: 10, width: '90%' }}>{t('description')} :</div>
                    <div style={{ marginTop: 10, width: '80%', border: 'none', maxWidth: '100%', borderRadius: 5 }} className="textarea_mess" data-theme={localTheme}>
                        {promise ? <Editor
                            ref={editor}
                            editorState={editorState}
                            onChange={(newEditorState) => setEditorState(newEditorState)}
                            placeholder="..."
                        /> :
                            <div style={{ marginTop: 10, width: '100%', display: 'flex', justifyContent: 'center' }} data-theme={localTheme}>
                                {spinner()}
                            </div>}
                    </div>
                </div>
            </div>

            <div className='cter_sect' style={{ paddingBottom: 20, marginTop: 25 }}>
                <div className='ctent_arti' style={{ maxWidth: 900 }} data-theme={localTheme}>
                    <div style={{ width: '90%' }}>{t('miniature')} :</div>
                    {items != undefined && <img src={items[0]?.imageUrl || Picture} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} alt="" style={{ borderRadius: '100%', objectFit: 'cover', width: 150, height: 150, objectPosition: '50% 10%' }} />}
                </div>
            </div>

            {promise?.type === 'Manga' && <>
                <div className='cter_sect' style={{ paddingBottom: 20, marginTop: 25 }}>
                    <div className='ctent_arti' style={{ maxWidth: 900 }} data-theme={localTheme}>
                        <div style={{ width: '90%' }}>{t('imageCover')} :</div>
                        {items != undefined && <div className='CoverImage FlexEmbed FlexEmbed--2by1' style={{ backgroundImage: `url(${items[1]?.imageUrl || items[0]?.imageUrl || Picture})`, backgroundPosition: `50% ${resize || 0}%`, maxWidth: 600 }}></div>}



                        <div className="range-container">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={resize || 0}
                                onChange={handleRange}
                                className="range-input"
                                onTouchMove={(e) => {
                                    // Updating the value when the finger moves
                                    const touch = e.targetTouches[0];
                                    const newValue = Math.round(
                                        ((touch.clientX - e.target.getBoundingClientRect().left) / e.target.offsetWidth) * 100);
                                    if (newValue >= 0 && newValue <= 100) {
                                        setResize(newValue);
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>



                <div className='cter_sect' style={{ marginTop: 25 }}>
                    <div className='ctent_arti' style={{ maxWidth: 900, alignItems: 'start' }} data-theme={localTheme}>
                        <div style={{ width: '90%', textAlign: 'center' }}>
                            <h4 style={{ margin: 0 }}>{t('imageCover')}, {t('images')}:</h4>
                            <div style={{ marginTop: 10 }}>{t('workFile.workFileNotice7')}</div>

                            <div className="checkbox-wrapper-46" style={{ marginTop: 10, marginLeft: 10 }}>
                                <input
                                    className="inp-cbx" id="hj54436" type="checkbox" />
                                <label className="cbx" htmlFor="hj54436"><span>
                                    <svg width="12px" height="12px" viewBox="0 0 12 10">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                    </svg></span><span style={{ marginLeft: 10 }}>
                                        <FontAwesomeIcon icon={faDisplay} style={{ marginRight: 10 }} />
                                        {t('showWallpapers')} ?</span>
                                </label>
                            </div>

                            <h4>{t('workFile.autoLayout.autoLayout')}</h4>

                            <div style={{ marginTop: 10 }}>{t('workFile.autoLayout.autoLayoutText')}.</div>

                            <div className="checkbox-wrapper-46" style={{ marginTop: 10 }}>
                                <input onChange={(e) => { setAutoLayout(e.target.checked) }} checked={autoLayout}
                                    className="inp-cbx" id="hj54445687" type="checkbox" />
                                <label className="cbx" htmlFor="hj54445687"><span>
                                    <svg width="12px" height="12px" viewBox="0 0 12 10">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                    </svg></span><span style={{ marginLeft: 10 }}>
                                        <FontAwesomeIcon icon={faTableCellsLarge} style={{ marginRight: 10 }} />
                                        {t('workFile.autoLayout.autoLayoutButton')}?</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </>}




            <div className='cter_sect' style={{ paddingBottom: 20 }}>
                <div className='ctent_arti' style={{ maxWidth: 900 }} data-theme={localTheme}>
                    <div style={{ marginTop: 10, width: '90%', display: 'flex', justifyContent: 'space-between' }}>{t('ai')} ? <div className={editeAI === null ? 'badge_require' : 'valide'} translate='no'>Require</div></div>

                    <div style={{ width: '100%', maxWidth: 200, display: 'flex', marginTop: 10, justifyContent: 'space-between' }}>
                        <div className="checkbox-wrapper-46Radio">
                            <input className="inp-cbxRadio" onChange={() => { setEditeAI(false) }} checked={editeAI == 0} type="radio" name="rdo1785" id="opt47586" />
                            <label className="cbxRadio" htmlFor="opt47586">
                                <span></span><span style={{ marginLeft: 5 }}>{t('no')}</span>
                            </label>
                        </div>
                        <div className="checkbox-wrapper-46Radio">
                            <input className="inp-cbxRadio" onChange={() => { setEditeAI(true) }} checked={editeAI == 1} type="radio" name="rdo1785" id="opt554782" />
                            <label className="cbxRadio" htmlFor="opt554782">
                                <span></span><span style={{ marginLeft: 5 }}>{t('yes')}</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className='cter_sect' style={{ paddingBottom: 20 }}>
                <div className='ctent_arti' style={{ maxWidth: 900 }} data-theme={localTheme}>
                    <div style={{ marginTop: 10, width: '90%', display: 'flex', justifyContent: 'space-between' }}>{t('adult')} ?<div className={editeAdult === null ? 'badge_require' : 'valide'} translate='no'>Require</div></div>
                    <div style={{ width: '90%', maxWidth: 400, display: 'flex', marginTop: 10, justifyContent: 'space-between' }}>
                        <div className="checkbox-wrapper-46Radio">
                            <input className="inp-cbxRadio" onChange={() => { setEditeAdult(0) }} type="radio" name="rdo1" id="opt4" checked={editeAdult == 0} />
                            <label className="cbxRadio" htmlFor="opt4">
                                <span></span><span style={{ marginLeft: 5 }}>{t('everyone')}</span>
                            </label>
                        </div>
                        <div className="checkbox-wrapper-46Radio">
                            <input className="inp-cbxRadio" onChange={() => { setEditeAdult(1) }} type="radio" name="rdo1" id="opt5" checked={editeAdult == 1} />
                            <label className="cbxRadio" htmlFor="opt5">
                                <span></span><div className='adult' style={{ marginLeft: 5 }} translate='no'>18+</div>
                            </label>
                        </div>
                        <div className="checkbox-wrapper-46Radio">
                            <input className="inp-cbxRadio" onChange={() => { setEditeAdult(2) }} type="radio" name="rdo1" id="opt586774" checked={editeAdult == 2} />
                            <label className="cbxRadio" htmlFor="opt586774">
                                <span></span><div className='adult' style={{ marginLeft: 5 }} translate='no'>18++</div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className='cter_sect' style={{ paddingBottom: 20 }}>
                <div className='ctent_arti' style={{ maxWidth: 900 }} data-theme={localTheme}>
                    <div style={{ marginTop: 10, width: '90%', display: 'flex', justifyContent: 'space-between' }}>{t('public')} ?<div className={editeVisibility === null ? 'badge_require' : 'valide'} translate='no'>Require</div></div>
                    <div style={{ width: '90%', maxWidth: 500, display: 'flex', marginTop: 10, justifyContent: 'space-between' }}>
                        <div className="checkbox-wrapper-46Radio">
                            <input className="inp-cbxRadio" onChange={() => { setEditeVisibility(0) }} type="radio" name="rdo2" id="opt6" checked={editeVisibility == 0} />
                            <label className="cbxRadio" htmlFor="opt6">
                                <span></span><span style={{ marginLeft: 5 }}>{t('private')}</span>
                            </label>
                        </div>
                        <div className="checkbox-wrapper-46Radio">
                            <input className="inp-cbxRadio" onChange={() => { setEditeVisibility(2) }} type="radio" name="rdo2" id="opt7456" checked={editeVisibility == 2} />
                            <label className="cbxRadio" htmlFor="opt7456">
                                <span></span><span style={{ marginLeft: 5 }}>{t('byLink')}</span>
                            </label>
                        </div>
                        <div className="checkbox-wrapper-46Radio">
                            <input className="inp-cbxRadio" onChange={() => { setEditeVisibility(1) }} type="radio" name="rdo2" id="opt7" checked={editeVisibility == 1} />
                            <label className="cbxRadio" htmlFor="opt7">
                                <span></span><span style={{ marginLeft: 5 }}>{t('public')}</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>


            {editeVisibility == 2 && <div className='cter_sect'>
                <div style={{ width: '100%', maxWidth: 900 }}>
                    <div className="copy-box two">
                        <div className="inner">
                            <div className="line right"></div>
                            <div>Unique link/{promise.id}<FontAwesomeIcon style={{ marginLeft: 10 }} icon={faLink} /></div>
                            <div style={{ maxWidth: 900, fontSize: 15 }}>
                                <div style={{ marginTop: 10 }}>{t('workFile.byLinkText')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}

            <div className='cter_sect' style={{ paddingBottom: 25 }}>
                <div className='ctent_arti' style={{ maxWidth: 900 }} data-theme={localTheme}>
                    <div style={{ marginTop: 10, width: '90%', display: 'flex', justifyContent: 'space-between' }}>{t('comment')} ?<div className={comments === null ? 'badge_require' : 'valide'} translate='no'>Require</div></div>
                    <div style={{ width: '100%', maxWidth: 200, display: 'flex', marginTop: 10, justifyContent: 'space-between' }}>
                        <div className="checkbox-wrapper-46Radio">
                            <input className="inp-cbxRadio" type="radio" name="rdo3" id="opt8" onChange={() => { setComments(false) }} checked={comments == 0} />
                            <label className="cbxRadio" htmlFor="opt8">
                                <span></span><span style={{ marginLeft: 5 }}>{t('no')}</span>
                            </label>
                        </div>
                        <div className="checkbox-wrapper-46Radio">
                            <input className="inp-cbxRadio" type="radio" name="rdo3" id="opt9" onChange={() => { setComments(true) }} checked={comments == 1} />
                            <label className="cbxRadio" htmlFor="opt9">
                                <span></span><span style={{ marginLeft: 5 }}>{t('yes')}</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className='cter_sect' style={{ paddingBottom: 20, marginTop: 25 }}>
                <div className='ctent_arti' style={{ maxWidth: 900 }} data-theme={localTheme}>
                    <div style={{ marginTop: 10, width: '90%', display: 'flex', justifyContent: 'space-between', color: editeTags?.length > 10 ? 'red' : '#00aa00', borderBottom: `1px solid ${editeTags?.length > 10 ? 'red' : '#00aa00'}` }}>{t('addTags')} : <span style={{ fontWeight: 800 }} translate='no'><span>{editeTags?.length || 0}</span>/10</span></div>

                    <div style={{ width: '90%', paddingTop: 20 }}>
                        <div>{t('tagsFound')} :</div>
                    </div>
                    <div style={{ width: '90%', display: 'flex', flexWrap: 'wrap', marginTop: 50 }} data-theme={localTheme}>
                        {editeTags?.length ? <>{editeTags?.map((el, index) => (
                            <div onClick={() => { handleRemoveTag(el) }} className='tagsManage' translate='no' key={index} data-theme={localTheme}>
                                {el.tag}<FontAwesomeIcon style={{ marginLeft: 5, color: el.userId !== promiseIdentifiedUser?.user.id ? 'grey' : '#00aa00' }} icon={el.userId === promiseIdentifiedUser?.user.id ? faUser : faUserTag} />
                            </div>
                        ))}</>
                            :
                            <>
                                <div style={{ color: 'grey' }}>{t('noTagsFound')}</div>
                            </>}
                    </div>
                    <input maxLength={31} onKeyDown={handleChangeTags} onChange={(e) => { handleChangeTags(e) }} style={{ marginTop: 20, resize: 'none' }} className='input_text' placeholder={`${t('addTags')}: #...`} type="text" name="tag" id="tag" value={text} data-theme={localTheme} />
                    <div><span>{text.length}</span>/30</div>
                    <div className="checkbox-wrapper-46" style={{ marginBottom: 10, marginTop: 20 }}>
                        <input onChange={(e) => { setAllowUserEditTag(e.target.checked) }} checked={allowUserEditTag}
                            className="inp-cbx" id="hj54" type="checkbox" />
                        <label className="cbx" htmlFor="hj54"><span>
                            <svg width="12px" height="12px" viewBox="0 0 12 10">
                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                            </svg></span><span style={{ marginLeft: 10 }}>{t('allowUsersEditTags')}?</span>
                        </label>
                    </div>
                </div>
            </div>




            <div className='cter_sect' style={{ paddingBottom: 20, marginTop: 25 }}>
                <div className='ctent_arti' style={{ maxWidth: 900, alignItems: 'start' }} data-theme={localTheme}>
                    <div className="checkbox-wrapper-46" style={{ marginTop: 10, marginLeft: 10 }}>
                        <input onChange={(e) => { setNotifyCommunity(e.target.checked) }} checked={notifyCommunity}
                            className="inp-cbx" id="hj54455436" type="checkbox" />
                        <label className="cbx" htmlFor="hj54455436"><span>
                            <svg width="12px" height="12px" viewBox="0 0 12 10">
                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                            </svg></span><span style={{ marginLeft: 10 }}>
                                <FontAwesomeIcon className='bell' icon={faBell} style={{ marginRight: 10 }} />
                                {t('notifyUsersToUpdate')} ?</span>
                        </label>
                    </div>

                    {promise && <div className='cter_sect' style={{ paddingBottom: 20, marginTop: 25 }}>
                        <div className='button_option_container' style={{ width: '90%', maxWidth: 500, display: 'flex' }} data-theme={localTheme}>
                            <div className='button_option' onClick={onClick} style={{ width: '100%' }} data-theme={localTheme}>{t('delete')}</div>
                            {deleteSpin ? <>{items?.length > 0 && <div className='button_optionBlue' style={{ width: '100%' }} onClick={() => {
                                Update(promise?.id)
                            }} data-theme={localTheme}>{t('save')}</div>}</>
                                :
                                <div className='button_optionDisable' style={{ background: 'none', width: '100%' }}>
                                    {spinner()}
                                </div>}
                        </div>
                        <div>{message}</div>
                        <div style={{ color: 'red' }}>{err}</div>
                    </div>}

                    <div className='button_option_container' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', background: 'none' }} data-theme={localTheme}>
                        {false ? <><div className='button_optionColoring hovercursor' style={{ width: 150, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, margin: 3 }} data-background={localThemeBackground} data-theme={localTheme}>
                            <div><FontAwesomeIcon style={{ marginRight: 5 }} icon={faPhotoFilm} />{promise?.name}</div>
                        </div>
                            <div className='button_optionColoringBlue hovercursor' style={{ width: 150, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, margin: 3 }} data-background={localThemeBackground} data-theme={localTheme}>
                                <div><FontAwesomeIcon style={{ marginRight: 5 }} icon={faBagShopping} />Shop</div>
                            </div></>
                            :
                            <div className='button_optionColoringBlue hovercursor' style={{ width: 250, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, margin: 3 }} data-background={localThemeBackground} data-theme={localTheme}>
                                <div><FontAwesomeIcon style={{ marginRight: 5 }} icon={faBagShopping} />{t('addTo')} {t('shop')}</div>
                            </div>}
                    </div>
                </div>
            </div>


            <div className='cter_sect' style={{ paddingBottom: 20 }}>
                <div className='ctent_arti' data-theme={localTheme}>
                    <div className="copy-box two" data-theme={localTheme}>
                        <div className="inner">
                            <div className="line right"></div>
                            <div>
                                <h4 style={{ margin: 0 }}>{t('warning')} :</h4>
                                <div>{t('workFile.workFileNotice2')}</div>
                                <div style={{ marginBottom: 20 }}>{t('workFile.workFileNotice3')}</div>

                                <h4 style={{ margin: 0 }}>{t('images')} :</h4>

                                <div>{t('workFile.workFileNotice5')}</div>

                                <div style={{ marginBottom: 20 }}>{t('workFile.workFileNotice6')}</div>


                                <h4 style={{ margin: 0 }}>{t('form')}<span style={{ marginLeft: 10 }} className='badge_require'>Require</span><FontAwesomeIcon style={{ marginLeft: 10 }} icon={faArrowRight} /><span style={{ marginLeft: 10 }} className='valide'>Require</span> :</h4>

                                <div>{t('workFile.workFileNotice8')}</div>

                                <p>{t('workFile.workFileNotice4')}</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className='cter_sect' style={{ paddingBottom: 25 }}>
                {promise && <div className='button_option_container shadowbox' style={{ width: '90%', maxWidth: 400, display: 'flex' }} data-theme={localTheme}>

                    <div className='button_optionPic_v'
                        onClick={handleClick}
                        data-theme={localTheme}>{t('addPictures')}</div>
                </div>}
                <div>{messageDownloadImg}</div>
                <div onClick={handleClick} className='shadowbox text' style={{ height: 200, width: '100%', maxWidth: 200, border: '1px dashed grey', borderRadius: 15, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }} data-theme={localTheme} data-background={localThemeBackground}>
                    <FontAwesomeIcon icon={faPlus} />
                </div>
                <input ref={hiddenFileInput} onChange={handleLoad} accept=".png, .jpg, .jpeg, .gif" type='file' multiple={true} key={imgUpload} hidden={true} />
            </div>



            <div className='cter_sect'>
                <div style={{ width: '95%', marginBottom: 10 }}>
                    {promise && <div style={{ display: 'flex', width: '98%', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <div className=' text' style={{ display: 'flex' }} data-background={localThemeBackground} data-theme={localTheme}>{t('select')}:<div style={{ marginLeft: 10 }}>{manageSelected?.length}</div></div>
                            <div className='button_option_container shadowbox' style={{ width: '100%', maxWidth: 150, marginTop: 10, display: 'flex' }} data-theme={localTheme}>
                                <div onClick={() => {
                                    setManage(false)
                                    setManageSelected([])
                                    setManageBlockSelected([])
                                }} className='button_option' style={{ color: '#ec1c24' }} data-theme={localTheme}><FontAwesomeIcon icon={faListUl} /></div>
                                <div style={{ color: '#0084ff' }}
                                    onClick={() => {
                                        handleSelectedAllImage(items)
                                        setManageBlockSelected([])
                                    }} className='button_option' data-theme={localTheme}><span><FontAwesomeIcon icon={faListCheck} /></span></div>
                                <div onClick={manageSelected?.length === 0 ? null : () => { setCommonOption(true) }} className={manageSelected?.length === 0 ? 'button_optionDisable' : 'button_optionBlue'} data-theme={localTheme}><FontAwesomeIcon icon={faEllipsisVertical} /></div>
                            </div>
                        </div>
                        <div className="checkbox-wrapper-46 text" style={{ marginTop: 10 }} data-background={localThemeBackground} data-theme={localTheme}>
                            <input onChange={(e) => {
                                setManageBlockSelectedActive(e.target.checked)
                                setManageBlockSelected([])
                            }} checked={manageBlockSelectedActive}
                                className="inp-cbx" id="hj57875727" type="checkbox" />
                            <label className="cbx" htmlFor="hj57875727" title={`${t('workFile.selectionAnBlock.selectionBlockText')}`}><span>
                                <svg width="12px" height="12px" viewBox="0 0 12 10">
                                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                </svg></span><span style={{ marginLeft: 5 }}>
                                    <FontAwesomeIcon icon={faRoute} /> {t('workFile.selectionAnBlock.selectionBlock')} ?</span>
                            </label>
                        </div>
                    </div>}
                </div>
                <div className='ctent_arti' style={{ paddingTop: 10 }} data-theme={localTheme}>
                    <div ref={refUp} style={{ width: '95%', display: 'flex', justifyContent: 'space-between' }}><div style={{ display: 'flex', width: '100%' }}>{t('images')} : <div>{items?.length}</div>/<div>{'200'}</div></div>
                        <div className='buttonCircle' onClick={() => { ref.current?.scrollIntoView({ block: 'center' }) }} data-theme={localTheme}>
                            <FontAwesomeIcon style={{ fontSize: 13 }} icon={faAngleDoubleDown} />
                        </div>
                    </div>

                    < Card_picture
                        isDraggable={!manageBlockSelectedActive}
                        manage={manage}
                        type={promise?.type}
                        localTheme={localTheme}
                        setPromise={setPromise}
                        setTest={setTest}
                        handleRestoreImage={handleRestoreImage}
                        handleDeleteImage={handleDeleteImage}
                        handleCopyShow={handleCopyShow}
                        manageSelected={manageSelected}
                        manageBlockSelected={manageBlockSelected[0]}
                        hidden={false}
                        items={items}
                        copyShow={copyShow}
                        setItems={setItems} />

                    <div ref={ref} style={{ width: '95%', display: 'flex', justifyContent: 'space-between', marginTop: 20 }}><div style={{ display: 'flex', width: '100%' }}>{t('images')} : <div>{items?.length}</div>/<div>{'200'}</div></div>
                        <div className='buttonCircle' onClick={() => { refUp.current?.scrollIntoView({ block: 'center' }) }} data-theme={localTheme}>
                            <FontAwesomeIcon style={{ fontSize: 13 }} icon={faAngleDoubleUp} />
                        </div>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default FilesUpdate