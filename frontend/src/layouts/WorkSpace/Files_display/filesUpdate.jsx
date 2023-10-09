import { UseFiles } from './useFiles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faRefresh, faBell, faXmark } from '@fortawesome/free-solid-svg-icons';
import Picture from '../../../assets/images/logo.png';
import { useState } from 'react';
import Card_picture from '../../../components/Cards/Card_picture';
import { Editor } from 'draft-js';
import { spinner } from '../../../utils';
import { RemoveScroll } from 'react-remove-scroll';
import { useAppContext } from '../../../contexts/UseAppContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CirclePicker } from 'react-color';
import { customColors } from '../../../assets/data/data';




const FilesUpdate = () => {

    const { t } = useTranslation();

    const { localTheme, handleFullScreen } = useAppContext();

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
        handleDelete,
        handleClick,
        hiddenFileInput,
        editor,
        handleLoad,
        removeImage,
        deleteSpin,
        handleDeleteImageClient,
        navigate,
        message,
        err,
        messageDownloadImg,
        editeAI, setEditeAI,
        downloadImg,
        setAddImg,
        addImg } = UseFiles();




    const [validate, setValidate] = useState({
        value: false,
        text: ''
    })
    const handleValidate = (val) => {
        if (val) {
            handleDelete(promise.id)
            setValidate({
                value: false,
                text: ''
            })
        } else {
            setValidate({
                value: false,
                text: ''
            })
        }
    }

    const onClick = () => {
        if (window.confirm('Are you sure you want to delete this file ?')) {
            handleDelete(promise?.id)
            navigate(`/works/files`)
            //props.setTab(JSON.parse(localStorage.getItem('tab-Work-Place')))
        } else {
            alert('Change cancelled.')
        }
    }


    const [manage, setManage] = useState(false)
    const [manageSelected, setManageSelected] = useState([])

    //console.log(manageSelected);

    const handleDeleteImage = (el) => {
        setManageSelected((manageSelected) => Array.from(new Set([el, ...manageSelected])))
    }

    const handleRestoreImage = (el) => {
        const filteredPromise = manageSelected?.filter((array) => array != el)
        setManageSelected(filteredPromise)
    }

    const handleSelectedAllImage = (arr) => {
        arr?.map((el) => {
            setManageSelected((manageSelected) => Array.from(new Set([...manageSelected, el.imageUrl])))
        })
    }
    const [resizeTest, setResizeTest] = useState(5)
    // corver image rezize
    const handleRangeTest = (e) => {
        setResizeTest(e.target.value);
    }

    const [colorWorkManga, setColorWorkManga] = useState();


    //if (!promise) return (
    //    <>
    //        <div className='cter_sect' style={{ paddingBottom: 20, marginTop: 25 }}>
    //            <div className='ctent_arti' style={{ maxWidth: 900 }} data-theme={localTheme}>
    //                {spinner()}
    //                <div>Wait a moment...</div>
    //            </div>
    //        </div>
    //    </>
    //)

    // {items != undefined &&<div style={{ backgroundImage: `url(${items[0]?.imageUrl || Picture})`, backgroundPosition: `50% ${resize || 0}%`, borderRadius: 5 }} className='CoverImage FlexEmbed FlexEmbed--2by1_card' />}


    if (promise === false) return (
        <div className='cter_sect' style={{ paddingBottom: 20, marginTop: 25 }}>
            <div className='ctent_arti' style={{ maxWidth: 900, overflow: 'visible' }} data-theme={localTheme}>
                <h1 style={{ color: '#ec1c24' }}>{t('projectDeletedMessage.message1')}</h1>
                <div className="copy-box two">
                    <div className="inner">
                        <div className="line right"></div>
                        <ol>
                            <li>{t('projectDeletedMessage.message2')}</li>
                            <li>{t('projectDeletedMessage.message3')}</li>
                            <li>{t('projectDeletedMessage.message4')}</li>
                        </ol>
                    </div>
                </div>
                <div onClick={() => navigate(-1)} className='button_option' data-theme={localTheme}>{t('projectDeletedMessage.message5')}</div>
            </div>
        </div>
    )

    return (
        <div className='open-elementPage'>
            {!refresh && <div className='button_option_container animation' style={{
                width: 'max-content',
                position: 'fixed',
                top: '50%',
                left: '50%',
                zIndex: 1000,
                padding: 10,
                background: 'black',
                transform: 'translate(-50%, -50%)'
            }} data-theme={localTheme}>
                <div style={{ color: '#ec1c24', fontSize: 20, fontWeight: 'bolder' }}><span><FontAwesomeIcon className={refresh ? '' : 'rotate'} icon={faRefresh} /></span></div>
            </div>}

            <div className='cter_sect' style={{ padding: 0, margin: 0 }}>
                <div style={{ width: '100%', maxWidth: 900 }}>
                    <div className="copy-box two">
                        <div className="inner">
                            <div className="line right"></div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <div className='button_option_container' style={{ width: 'max-content' }} data-theme={localTheme}>
                                    <div onClick={() => { refreshAuto ? console.log('refresh-auto active') : refresh ? GetMyFileFromAPI() : console.log('wait') }} style={{ width: 50 }} className='button_optionPic_v' data-theme={localTheme}>
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

            {addImg &&
                <RemoveScroll className='blanket scrollbar' style={{ zIndex: 15000, display: 'flex', alignItems: 'start', justifyContent: 'center', top: 0, overflowY: 'auto' }} >
                    <div className='menu_navbar open-elementPage' style={{ width: '90%', maxWidth: 1800, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }} data-theme={localTheme}>
                        <div className='cter_sect' style={{ padding: 0 }}>
                            <div className='ctent_artiMiniProfil' style={{ paddingBottom: 20 }} data-theme={localTheme}>
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
                                    <input ref={hiddenFileInput} onChange={handleLoad} accept="img/*" type='file' multiple={true} key={imgUpload} hidden={true} />
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
                                        <img loading="lazy" className='picture_hover' key={index} onClick={() => handleRemoveImgUpload(imgUrl, index)} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ borderRadius: 15, objectFit: 'contain', margin: 5 }} src={imgUrl} alt="" data-sizes={img?.length <= 10 && 'big' || img?.length <= 20 && 'medium' || img?.length > 40 && 'small'} />
                                    ))}
                                </div>}
                            </div>
                        </div>
                    </div>
                </RemoveScroll>}


            <div className='cter_sect' style={{ paddingBottom: 20, marginTop: 25 }}>
                <div className='ctent_arti' style={{ maxWidth: 900, overflow: 'visible' }} data-theme={localTheme}>
                    <div style={{ marginTop: 10, width: '90%' }}>{t('name')} :</div>
                    <input style={{ marginTop: 10, width: '80%', maxWidth: '80%' }} className='input_text' onChange={(e) => { handleChange(e) }} defaultValue={edite} placeholder='Named' type="text" name="Named" id="Named" data-theme={localTheme} />

                    <div style={{ marginTop: 10, width: '90%' }}>{t('description')} :</div>
                    <div style={{ marginTop: 10, width: '80%', border: 'none', maxWidth: '100%', borderRadius: 5 }} className="textarea_mess" data-theme={localTheme}>
                        {promise ? <Editor
                            ref={editor}
                            editorState={editorState}
                            onChange={setEditorState}
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
                    {items != undefined && <img src={items[0]?.imageUrl || Picture} onClick={() => handleFullScreen({ img: items[0]?.imageUrl || Picture, analyse: false })} alt="" style={{ borderRadius: 20, objectFit: 'cover', width: '100%', maxWidth: 300 }} />}
                </div>
            </div>


            {promise?.type === 'Manga' && <div className='cter_sect' style={{ paddingBottom: 20, marginTop: 25 }}>
                <div className='ctent_arti' style={{ maxWidth: 900 }} data-theme={localTheme}>
                    <div className='CoverImage FlexEmbed FlexEmbed--2by1WorkFile' onClick={() => handleFullScreen({ img: items[1]?.imageUrl || Picture, analyse: false })} style={{ backgroundImage: `url(${items[1]?.imageUrl || Picture})`, backgroundPosition: `50% ${resize || 0}%`, borderRadius: 0 }}></div>
                    <div style={{ width: '90%' }}>{t('imageCover')} :</div>


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
            </div>}


            <div className='cter_sect' style={{ paddingBottom: 20 }}>
                <div style={{ width: '100%', maxWidth: 900 }}>
                    <div className="copy-box two">
                        <div className="inner">
                            <div className="line right"></div>
                            <div style={{ maxWidth: 900, fontSize: 15 }}>
                                <h4>{t('imageCover')}, {t('images')}</h4>
                                <div style={{ marginTop: 10 }}>{t('workFile.workFileNotice7')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




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
                    <div style={{ width: '100%', maxWidth: 200, display: 'flex', marginTop: 10, justifyContent: 'space-between' }}>
                        <div className="checkbox-wrapper-46Radio">
                            <input className="inp-cbxRadio" onChange={() => { setEditeVisibility(false) }} type="radio" name="rdo2" id="opt6" checked={editeVisibility == 0} />
                            <label className="cbxRadio" htmlFor="opt6">
                                <span></span><span style={{ marginLeft: 5 }}>{t('private')}</span>
                            </label>
                        </div>
                        <div className="checkbox-wrapper-46Radio">
                            <input className="inp-cbxRadio" onChange={() => { setEditeVisibility(true) }} type="radio" name="rdo2" id="opt7" checked={editeVisibility == 1} />
                            <label className="cbxRadio" htmlFor="opt7">
                                <span></span><span style={{ marginLeft: 5 }}>{t('public')}</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

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
                        {editeTags?.length ? <>{editeTags?.map((el) => (
                            <div onClick={() => { handleRemoveTag(el) }} className='tagsManage' translate='no' key={el} data-theme={localTheme}>
                                {el}
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
                        <input
                            className="inp-cbx" id="hj54" type="checkbox" />
                        <label className="cbx" htmlFor="hj54"><span>
                            <svg width="12px" height="12px" viewBox="0 0 12 10">
                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                            </svg></span><span style={{ marginLeft: 10 }}>{t('allowUsersEditTags')}?</span>
                        </label>
                    </div>
                </div>
            </div>

            <div className='cter_sect' style={{ paddingBottom: 20 }}>
                <div style={{ width: '100%', maxWidth: 900 }}>
                    <div className="copy-box two">
                        <div className="inner">
                            <div className="line right"></div>
                            <div style={{ maxWidth: 900, fontSize: 15 }}>
                                <p>{t('workFile.workFileNotice2')}</p>
                                <p>{t('workFile.workFileNotice3')}</p>
                                <p>{t('workFile.workFileNotice4')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {promise?.type === 'Manga' && <div className='cter_sect' style={{ paddingBottom: 20, marginTop: 25 }}>
                <div className='ctent_arti' style={{ maxWidth: 900 }} data-theme={localTheme}>
                    <div className="checkbox-wrapper-46" style={{ marginBottom: 10, marginTop: 20 }}>
                        <input
                            className="inp-cbx" id="hj54455436" type="checkbox" />
                        <label className="cbx" htmlFor="hj54455436"><span>
                            <svg width="12px" height="12px" viewBox="0 0 12 10">
                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                            </svg></span><span style={{ marginLeft: 10 }}>
                                <FontAwesomeIcon className='bell' icon={faBell} style={{ marginRight: 10 }} />
                                {t('notifyUsersToUpdate')} ?</span>
                        </label>
                    </div>
                </div>
            </div>}

            {promise && <div className='cter_sect'>
                <div className='button_option_container shadowbox' style={{ width: '90%', maxWidth: 500, display: 'flex' }} data-theme={localTheme}>
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


            <div className='cter_sect' style={{ paddingBottom: 20 }}>
                <div style={{ width: '100%', maxWidth: 900 }}>
                    <div className="copy-box two">
                        <div className="inner">
                            <div className="line right"></div>
                            <div style={{ maxWidth: 900, fontSize: 15 }}>
                                <h4>{t('images')}</h4>

                                <div>{t('workFile.workFileNotice5')}</div >

                                <div style={{ marginTop: 10 }}>{t('workFile.workFileNotice6')}</div >

                                {promise?.type === 'Manga' && <>

                                <h4>Auto Layout</h4>

                                <div style={{ marginTop: 10 }}>Auto Layout will adapt your thumbnail and cover image, use this option only if your thumbnail and cover image don't have a layout.</div>

                                <div className="checkbox-wrapper-46" style={{ marginTop: 10 }}>
                                    <input
                                        className="inp-cbx" id="hj54445687" type="checkbox" />
                                    <label className="cbx" htmlFor="hj54445687"><span>
                                        <svg width="12px" height="12px" viewBox="0 0 12 10">
                                            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                        </svg></span><span style={{ marginLeft: 10 }}>
                                            Automatic layout?</span>
                                    </label>
                                </div>
                                </>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='cter_sect' style={{ paddingBottom: 25 }}>
                {promise && <div className='button_option_container shadowbox' style={{ width: '90%', maxWidth: 400, display: 'flex' }} data-theme={localTheme}>

                    <div className='button_optionPic_v'
                        onClick={() => {
                            setAddImg(true)
                        }}
                        data-theme={localTheme}>{t('addPictures')}</div>
                </div>}
                <div>{messageDownloadImg}</div>
            </div>

            <div className='cter_sect' style={{ paddingBottom: 25 }}>
                {promise && <div className='button_option_container shadowbox' style={{ width: '90%', maxWidth: 900, display: 'flex' }} data-theme={localTheme}>

                    {manageSelected?.length != 0 && <div onClick={() => {
                        setManage(false)
                        setManageSelected([])
                    }} className='button_option' data-theme={localTheme}>{t('cancel')}</div>}

                    <div className='button_optionBlue'
                        style={{ width: '100%' }}
                        onClick={() => {
                            handleSelectedAllImage(items)
                        }}
                        data-theme={localTheme}>{t('allSelected')}</div>

                    {manageSelected?.length != 0 && <div onClick={() => {
                        handleDeleteImageClient(manageSelected)
                        setManageSelected([])
                    }} className='button_option' style={{ width: '100%', color: 'red' }} data-theme={localTheme}>{t('delete')}</div>}
                </div>}
                <div>{messageDownloadImg}</div>
            </div>



            <div className='cter_sect'>
                <div className='ctent_arti' style={{ paddingTop: 10, paddingBottom: 60 }} data-theme={localTheme}>

                    <div style={{ width: '95%', display: 'flex' }}>{t('images')} : <div>{items?.length}</div>/<div>{'200'}</div></div>

                    < Card_picture
                        manage={manage}
                        type={promise?.type}
                        localTheme={localTheme}
                        setPromise={setPromise}
                        handleRestoreImage={handleRestoreImage}
                        handleDeleteImage={handleDeleteImage}
                        manageSelected={manageSelected}
                        hidden={false}
                        items={items}
                        setItems={setItems} />

                </div>
            </div>



        </div>
    )
}

export default FilesUpdate