import Picture from '../../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowLeft, faArrowRight, faListUl, faListCheck, faXmark, faPhotoFilm, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import React from "react";
import Card_select from '../../../components/Cards/Card_select';
import ReactPaginate from 'react-paginate';
import imgProfile from '../../../assets/images/logo.png';
import AvatarImageCropper from 'react-avatar-image-cropper';
import Select from '../../../components/Select/Select';
import { NSFW, optionsType } from '../../../assets/data/data';
import { RemoveScroll } from 'react-remove-scroll';
import { useTranslation } from 'react-i18next';
import { Editor } from "draft-js";
import { spinner } from '../../../utils';
import { UseGroups_display } from './useGroups_display';
import imgCoverCard from '../../../assets/images/scene-tranquille-fleurs-cerisier-au-printemps-generee-par-ia.jpg';
import { useNavigate } from 'react-router-dom';


const Groups_display = () => {
    
    const navigate = useNavigate()

    const { t } = useTranslation();


    const {
        localTheme, promiseIdentifiedUser,
        SelectFilesFromAPI, numPage, location,
        hiddenSearch,
        hiddenButton, setHiddenButton,
        hideCrop, setHideCrop,
        hideCropName, setHideCropName, setImgUpload,
        visibility, setVisibility,
        commonOption, setCommonOption,
        addProjets, setAddProjets,
        adult, setAdult,
        img, setImg,
        editorState, setEditorState,
        editeHidden, setEditeHidden,
        filesSelected, setFilesSelected,
        editeTypeAllSelected, setEditeTypeAllSelected,
        editSearch,
        editor,
        promise,
        promiseGroup,
        pageCount, handlePage,
        edite,
        handleChange,
        editeType, setEditeType,
        created,
        errorFiles,
        createFile,
        handleFilesSelected,
        handleFilesSelectedRemove,
        updateFilesGroup,
        handleSearch,
        handleCloseSearch,
        SearchFiles,
        handleLoad,
        handleChangeGroupName,
        UpdateGroupFromAPI,
        handleAllSelected,
        UpdateGroupFilesFromAPI,
        handleValidate,
        handleValidateDeleteGroup,
        handleValidateSecurityDeleteGroup,
        setSecurityDel,
        securityDel
    } = UseGroups_display()

    
    if (!promiseIdentifiedUser) return null

    if (promiseGroup === false) return (
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
                                <li>{t('projectDeletedMessage.message4')}</li>
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
        <div className='open-element-page-melted'>

            {hideCropName && <RemoveScroll removeScrollBar={false} className='blanket scrollbar' style={{ zIndex: 25000, display: 'flex', alignItems: 'start', justifyContent: 'center', top: 0, overflowY: 'auto' }} >
                <div className='menu_navbar open-element-page-melted' style={{ width: '100%', flexDirection: 'column', maxWidth: 600, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }} data-theme={localTheme}>

                    <div style={{ marginBottom: 20, marginTop: 10 }}>
                        {!hideCrop && <img style={{ cursor: 'pointer' }} onClick={() => setHideCrop(true)} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='Profile_picture shadowbox' src={img || promiseGroup?.imageUrl || Picture} alt="" />}
                        {hideCrop && <div style={{ width: 200, height: 200 }}>
                            <AvatarImageCropper apply={handleLoad} text={'Select an image'} previewBorderRadius={'50%'} isBack={imgProfile} maxsize={1000 * 1000 * 5} />
                        </div>}
                    </div>

                    <div className='button_option_container' style={{ width: '100%', maxWidth: 100, marginBottom: 20 }} data-theme={localTheme}>
                        <div onClick={!hideCrop ? null : () => {
                            setImg(promiseGroup?.imageUrl)
                            setImgUpload(promiseGroup?.imageUrl)
                            setHideCrop(false)
                        }} className={!hideCrop ? 'button_optionDisable' : 'button_option'} data-theme={localTheme}><FontAwesomeIcon icon={faArrowLeft} /></div>
                    </div>
                    <div style={{ width: '98%' }}>
                        <div className="copy-box two">
                            <div className="inner">
                                <div className="line right"></div>
                                <div className='title_color' style={{ fontSize: 16, margin: 0 }}><span style={{ fontWeight: 800 }}>{t('imageChangeProfile.formats')}:</span> PNG/JPG/JPEG</div>
                                <div className='title_color' style={{ fontSize: 16, margin: 0 }}><span style={{ fontWeight: 800 }}>{t('imageChangeProfile.size')}:</span> 5MB</div>

                                <div className='title_color' style={{ width: '90%', marginTop: 10 }}>{t('imageChangeProfile.text1')}</div>

                                <div className='title_color' style={{ width: '90%' }}>{t('imageChangeProfile.text2')}</div>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: 10, width: '90%' }}>{t('name')} :</div>
                    <input className='input_text' onChange={handleChangeGroupName('name')} defaultValue={promiseGroup?.name} placeholder='Change the name...' type="text" data-theme={localTheme} />

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


                    <div className='button_option_container' style={{ width: '100%', maxWidth: 500, marginTop: 50 }} data-theme={localTheme}>
                        <div onClick={UpdateGroupFromAPI} className='button_optionBlue' data-theme={localTheme}>{t("save")}</div>
                    </div>

                    <div style={{ width: '98%' }}>
                        <div className="copy-box two">
                            <div className="inner">
                                <div className="line right"></div>
                                <div>{t("libraryWorkSpace.libraryOptionTitle1")}</div>
                                <div>{t("libraryWorkSpace.libraryOptionText1")}</div>
                                <div>{t("libraryWorkSpace.libraryOptionText2")}</div>
                                <div className='button_option_container' style={{ width: '100%', maxWidth: 500, marginTop: 10 }} data-theme={localTheme}>
                                    <div onClick={handleValidateDeleteGroup} className='button_option' data-theme={localTheme}>{t("deleteLibrary")}</div>
                                </div>

                                <div style={{ marginTop: 50 }}>{t("libraryWorkSpace.libraryOptionTitle2")}</div>
                                <div>{t("libraryWorkSpace.libraryOptionText3")}</div>
                                <div>{t("libraryWorkSpace.libraryOptionText4")} ( <span style={{ fontWeight: 600, color: '#0069cc' }}>{promiseGroup?.name}</span> ).</div>
                                <input onChange={(e) => { setSecurityDel(e.target.value) }} className='input_text' style={{ marginTop: 20 }} placeholder={promiseGroup?.name} type="text" data-theme={localTheme} />
                                <div className='button_option_container' style={{ width: '100%', maxWidth: 500, marginTop: 10 }} data-theme={localTheme}>
                                    <div onClick={handleValidateSecurityDeleteGroup} className={securityDel === promiseGroup?.name ? 'button_optionPic_v' : 'button_optionDisable'} data-theme={localTheme}>{t("deleteLibraryAndFile")}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='button_option_container' style={{ width: '100%', maxWidth: 500, marginTop: 10 }} data-theme={localTheme}>
                        <div onClick={() => {
                            setHideCropName(false)
                            setHideCrop(false)
                            setImg(promiseGroup?.imageUrl)
                            setImgUpload(promiseGroup?.imageUrl)
                            setSecurityDel('')
                        }} className='button_option' data-theme={localTheme}>{t("cancel")}</div>
                    </div>
                </div>
            </RemoveScroll>}

            {editeHidden && <RemoveScroll className='blanket scrollbar' style={{ zIndex: 25000, display: 'flex', alignItems: 'center', justifyContent: 'center', top: 0, overflowY: 'auto' }} >
                <div className='menu_navbar open-element-page-melted' style={{ width: '100%', flexDirection: 'column', maxWidth: 600, alignItems: 'center', justifyContent: 'center', marginBottom: 10, overflow: 'visible' }} data-theme={localTheme}>
                    <div style={{ width: '90%', maxWidth: 400 }}>
                        <div style={{ marginBottom: 10, marginTop: 10 }}>{t('create_a_new_project')}</div>
                        <input className='input_text' onChange={handleChange('name')} style={{ width: '100%' }} placeholder='Named' type="text" name="Named" id="Named" value={edite.name} data-theme={localTheme} />
                        <div>{t('type_of_file')}</div>
                        <div style={{ width: '100%', marginTop: 10 }}>
                            <Select setSelectedValue={setEditeType} selectedValue={editeType} arrays={optionsType} localTheme={localTheme} />
                        </div>
                        {created !== '' && <div>{created}</div>}
                        {errorFiles !== '' && <div style={{ color: 'red' }}>{errorFiles}</div>}
                        <div className='button_option_container' style={{ width: '100%', marginTop: 10 }} data-theme={localTheme}>
                            <div className='button_optionPic_v' onClick={() => { createFile() }} data-theme={localTheme}>{t("save")}</div>
                        </div>
                        <div className='button_option_container' style={{ width: '100%', marginTop: 10 }} data-theme={localTheme}>
                            <div onClick={() => {
                                setEditeHidden(false)
                                setEditeType(null)
                                setFilesSelected([])
                            }} className='button_option' data-theme={localTheme}>{t("cancel")}</div>
                        </div>
                    </div>
                </div>
            </RemoveScroll>}

            {commonOption && <RemoveScroll className='blanket scrollbar' style={{ zIndex: 25000, display: 'flex', alignItems: 'start', justifyContent: 'center', top: 0, overflowY: 'auto' }} >
                <div className='menu_navbar open-element-page-melted' style={{ width: '100%', flexDirection: 'column', maxWidth: 600, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }} data-theme={localTheme}>

                    <h3>{t("options")}</h3>

                    <div style={{ width: '90%' }}>{t('adult')}</div>
                    <div style={{ width: '100%', display: 'flex', marginTop: 10, justifyContent: 'space-around', marginBottom: 30 }}>
                        <div className="checkbox-wrapper-46Radio">
                            <input className="inp-cbxRadio" onChange={() => { setAdult() }} defaultChecked={adult === undefined} type="radio" name="rdo1" id="opt35564" />
                            <label className="cbxRadio" htmlFor="opt35564">
                                <span></span><span style={{ marginLeft: 5 }}>{t("none")}</span>
                            </label>
                        </div>
                        <div className="checkbox-wrapper-46Radio">
                            <input className="inp-cbxRadio" onChange={() => { setAdult(0) }} defaultChecked={adult === 0} type="radio" name="rdo1" id="opt3" />
                            <label className="cbxRadio" htmlFor="opt3">
                                <span></span><span style={{ marginLeft: 5 }}>{t("everyone")}</span>
                            </label>
                        </div>
                        <div className="checkbox-wrapper-46Radio">
                            <input className="inp-cbxRadio" onChange={() => { setAdult(1) }} defaultChecked={adult === 1} type="radio" name="rdo1" id="opt4" />
                            <label className="cbxRadio" htmlFor="opt4">
                                <span></span><div className='adult' style={{ marginLeft: 5 }} translate='no'>{NSFW}</div>
                            </label>
                        </div>
                    </div>


                    <div className='button_option_container' style={{ width: '100%', maxWidth: 300, marginTop: 10 }} data-theme={localTheme}>
                        <div onClick={UpdateGroupFilesFromAPI} className='button_option' data-theme={localTheme}>{t("save")}</div>
                    </div>

                    <div style={{ width: '94%' }} className="copy-box two">
                        <div className="inner">
                            <div className="line right"></div>
                            <div>{t("libraryWorkSpaceDisplay.optionText1")}</div>
                        </div>
                    </div>

                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <div className='button_option_container' style={{ width: '100%', maxWidth: 300, marginTop: 10 }} data-theme={localTheme}>
                            <div onClick={handleValidate} className='button_option' data-theme={localTheme}>{t("remove")}</div>
                        </div>
                    </div>

                    <div style={{ width: '94%' }} className="copy-box two">
                        <div className="inner">
                            <div className="line right"></div>
                            <div>{t("libraryWorkSpaceDisplay.optionText2")}</div>
                        </div>
                    </div>

                    <div className='button_option_container' style={{ width: '100%', maxWidth: 300, marginTop: 10 }} data-theme={localTheme}>
                        <div className='button_optionPic_v' data-theme={localTheme}>{t("delete")}</div>
                    </div>

                    <div className='button_option_container' style={{ width: '100%', maxWidth: 300, marginTop: 40 }} data-theme={localTheme}>
                        <div onClick={() => { setCommonOption(false) }} className='button_option' data-theme={localTheme}>{t("cancel")}</div>
                    </div>
                </div>
            </RemoveScroll>}

            <div className='cter_sect'>
                <div style={{ width: '98%', maxWidth: 900 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: 10, borderRadius: 5 }}>
                        <div>
                            <img onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='Profile_picture shadowbox' src={promiseGroup?.imageUrl || Picture} alt="" />
                            <div className='Profile_picture_button shadowbox'>
                                <div onClick={() => setHideCropName(true)} className='button_optionPic_v' style={{ width: 35, height: 35, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, position: 'absolute', borderRadius: '100%' }} data-theme={localTheme}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='cter_sect'>
                <div style={{ width: '98%', maxWidth: 500 }}>
                    {promiseGroup &&<h3 className='shadowbox' style={{ color: 'white', textAlign: 'center' }} translate='no'>{promiseGroup?.name.charAt(0).toUpperCase() + promiseGroup?.name.slice(1)}</h3>}
                </div>
            </div>

            <div className='cter_sect'>
                <div style={{ width: '97%' }}>
                    <div className="copy-box two">
                        <div className="inner" data-theme={localTheme}>
                            <div className="line right"></div>

                            <h4>{t("libraryWorkSpaceDisplay.title")}</h4>
                            <div>{t("libraryWorkSpaceDisplay.text1")}</div>
                            <div>{t("libraryWorkSpaceDisplay.text2")}</div>
                            <div>{t("libraryWorkSpaceDisplay.text3")}</div>

                            <div className='button_option_container shadowbox' style={{ width: '100%', maxWidth: 300, marginTop: 20 }} data-theme={localTheme}>
                                <div onClick={() => {
                                    setEditeHidden(true)
                                    setFilesSelected([])
                                }} className='button_optionPic_v' data-theme={localTheme}>{t('create_a_new_project')} ?</div>

                            </div>


                            <div className='button_option_container shadowbox' style={{ width: '100%', maxWidth: 300, marginTop: 20 }} data-theme={localTheme}>
                                {!addProjets && <div onClick={() => {
                                    setAddProjets(true)
                                    setHiddenButton(true)
                                    setFilesSelected([])
                                }} className='button_option' data-theme={localTheme}>{t('projects')}<FontAwesomeIcon style={{ color: '#ec1c24', marginLeft: 10 }} icon={faPhotoFilm} /></div>}

                                {addProjets && <> <div onClick={() => {
                                    setEditeType(null)
                                    //setHiddenPagination(false)
                                    setHiddenButton(false)
                                    //GetMyFilesFromAPI()
                                    setFilesSelected([])
                                    //setHiddenPaginationSearch(false)
                                    setAddProjets(false)
                                }} className='button_option' data-theme={localTheme}>{t("cancel")}</div>
                                </>}
                            </div>

                            {hiddenButton && <div className='button_option_container shadowbox' style={{ width: '100%', maxWidth: 300, marginTop: 20 }} data-theme={localTheme}>
                                {promiseGroup &&<div onClick={filesSelected.length === 0 ? null : () => {
                                    updateFilesGroup(location)
                                    setFilesSelected([])
                                }} className={filesSelected.length === 0 ? 'button_optionDisable' : 'button_optionBlue'} data-theme={localTheme}>{t("addTo")} ( {promiseGroup?.name.charAt(0).toUpperCase() + promiseGroup?.name.slice(1)} )</div>}
                            </div>}

                            <div style={{ marginTop: 20, display: 'flex', width: '98%', alignItems: 'center', justifyContent: 'center' }}>
                                <input onKeyDown={handleSearch} onChange={handleSearch} className='input_text' placeholder={t('search')} type="text" name="Search" id="Search" value={editSearch} data-theme={localTheme} />
                                <div className='button_option_container shadowbox' style={{ width: '100%', maxWidth: 80, marginLeft: 10, display: 'flex' }} data-theme={localTheme}>
                                    {hiddenSearch && <div className='button_option' onClick={handleCloseSearch} style={{ width: '100%' }} data-theme={localTheme}><FontAwesomeIcon icon={faXmark} /></div>}
                                    {editSearch !== "" && <div className='button_option' onClick={SearchFiles} style={{ width: '100%' }} data-theme={localTheme}><FontAwesomeIcon icon={faMagnifyingGlass} /></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='cter_sect open-element-page-melted'>
                <div style={{ display: 'flex', width: '95%', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <div style={{ width: '100%', maxWidth: 150 }}>
                        <div style={{ display: 'flex' }}>{t('select')}:<div style={{ marginLeft: 10 }}>{filesSelected.length}</div></div>
                        <div className='button_option_container shadowbox' style={{ marginTop: 10, display: 'flex' }} data-theme={localTheme}>
                            <div onClick={() => {
                                setFilesSelected([])
                            }} className='button_option' style={{ color: '#ec1c24' }} data-theme={localTheme}><FontAwesomeIcon icon={faListUl} /></div>
                            <div style={{ color: '#0084ff' }} onClick={handleAllSelected} className='button_option' data-theme={localTheme}><span><FontAwesomeIcon icon={faListCheck} /></span></div>
                            {!addProjets && <div onClick={filesSelected.length === 0 ? null : () => { setCommonOption(true) }} className={filesSelected.length === 0 ? 'button_optionDisable' : 'button_optionBlue'} data-theme={localTheme}><FontAwesomeIcon icon={faEllipsisVertical} /></div>}
                        </div>
                    </div>
                    {addProjets && <div style={{ fontSize: 16, fontWeight: 'bold' }}>{numPage + 1}/{pageCount}</div>}
                    <div style={{ width: '100%', maxWidth: 150 }}>
                        <div style={{ marginBottom: 10 }}>{t('type_of_file')}:</div>
                        <Select setSelectedValue={setEditeTypeAllSelected} selectedValue={editeTypeAllSelected} arrays={optionsType} localTheme={localTheme} />
                    </div>
                </div>
                <div className='ctent_arti' data-theme={localTheme}>
                    <div style={{ marginTop: 10, width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>


                        <Card_select checkbox={!addProjets ? !hiddenSearch ? !addProjets : false : false} location={location} filesSelected={filesSelected} handleFilesSelected={handleFilesSelected} handleFilesSelectedRemove={handleFilesSelectedRemove} promise={addProjets ? SelectFilesFromAPI : promise} localTheme={localTheme} />




                        {addProjets && <ReactPaginate
                            breakLabel="..."
                            previousLabel={<FontAwesomeIcon icon={faArrowLeft} />}
                            nextLabel={<FontAwesomeIcon icon={faArrowRight} />}
                            pageCount={pageCount}
                            onPageChange={handlePage}
                            initialPage={numPage}
                            containerClassName={"pagination"}
                            previousLinkClassName={"pagination_link"}
                            nextLinkClassName={"pagination_link"}
                            disabledClassName={"pagination_link--disabled"}
                            activeClassName={"pagination_link--active"}
                        />}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Groups_display