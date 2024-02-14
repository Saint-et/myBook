import { RemoveScroll } from "react-remove-scroll";
import { useAppContext } from "../contexts/UseAppContext";
import { useRef, useState } from "react";
import { Editor } from 'draft-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinimize, faMaximize } from '@fortawesome/free-solid-svg-icons';
import { stateToHTML } from 'draft-js-export-html';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import createHashtagPlugin from '@draft-js-plugins/hashtag';
import imgProfile from '../assets/images/logo.png';
import { API_URL } from '../config';
import axios from "axios";

const Posts = (props) => {
    const { localTheme } = useAppContext();

    const editor = useRef(null);
//
    //const [title, setTitle] = useState('')
    //const [comments, setComments] = useState(null)
    //const [img, setImg] = useState('');
    //const [imgUpload, setImgUpload] = useState('');
    //const [errorFiles, setErrorFiles] = useState("");
    //const [editeTags, setEditeTags] = useState([]);
    //const [text, setText] = useState('');
//
    const [captionSize, setCaptionSize] = useState(false)
//
    ////Methode afin de cacher le bouton pour choisir un fichier
    //const hiddenFileInput = useRef(null);
//
    //// utilisation d'un bouton personalisé pour choisir une image
    //const handleClick = async () => {
    //    hiddenFileInput.current.click();
//
    //};
//
//
    ////chargement de l'image & Affichage de l’image
    //const handleLoad = (event) => {
    //    const fileUploaded = event.target.files[0]
    //    setImgUpload(fileUploaded);
    //    setImg(URL.createObjectURL(fileUploaded));
    //};
//
//
    //const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
//
    //const onChange = (newEditorState) => {
    //    props.setEditorState(newEditorState);
    //};
//
    ////console.log(stateToHTML(editorState.getCurrentContent()));
//
    //const createPost = async () => {
    //    setErrorFiles('')
    //    const contentStateRaw = convertToRaw(editorState.getCurrentContent());
    //    const contentStateJSON = JSON.stringify(contentStateRaw);
    //    const tags = JSON.stringify(editeTags);
//
    //    const formData = new FormData();
    //    formData.append("image", imgUpload || null);
    //    formData.append("title", title);
    //    formData.append("data", contentStateJSON);
    //    formData.append("tags", tags);
    //    //    formData.append("comments", comments);
    //    try {
    //        await axios.post(`${API_URL}api/eventv/post/new-post`,
    //            formData
    //            , { withCredentials: true })
    //            .then(() => {
    //                props.GetMyFilesFromAPIAnnouncement()
    //                props.setAnnouncement(false)
    //                console.log(1);
    //            })
    //    } catch (error) {
    //        setErrorFiles(error.response.data.message)
    //    }
    //}
//
//
    const linkifyPlugin = createLinkifyPlugin();
    const hashtagPlugin = createHashtagPlugin();
//
//
    //const handleChangeTags = (e) => {
    //    const expressionReguliere = /\s/;
    //    const regexTags = /#[a-zA-Z0-9_]+/g;
    //    const tagsTrouves = e.target.value.match(regexTags) || [];;
//
    //    // Utilisez setText pour mettre à jour l'état du texte
    //    setText(e.target.value);
//
//
    //    if (expressionReguliere.test(e.target.value) || e.target.value.length > 30 || e.key === 'Enter') {
    //        // Utilisez le setEditeTags pour mettre à jour l'état des tags
    //        e.preventDefault()
    //        setEditeTags(Array.from(new Set([...editeTags, ...tagsTrouves])));
    //        setText('');
    //    }
    //};
//
//
    //const handleRemoveTag = (el) => {
    //    const filteredPromise = editeTags?.filter((array) => array != el)
    //    setEditeTags(filteredPromise)
    //}



    return (
        <>
            <div className='blanket animation' style={{ zIndex: 25000, display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', top: 0, left: 0 }} >
                <RemoveScroll removeScrollBar={false} className='menu_navbar scrollbar open-elementPage' style={{ width: '100%', height: '100%', flexDirection: 'column', maxWidth: 1000, overflowY: 'auto', alignItems: 'center', background: 'none' }} data-theme={localTheme}>
                    <div className='cter_sect'>
                        <div className='ctent_artiMiniProfil' data-theme={localTheme}>
                            <h3>Published something</h3>
                            <input ref={props.hiddenFileInput} onChange={props.handleLoad} accept="img/*" type='file' multiple={false} key={props.imgUpload} hidden={true} />
                            {props.img == '' ? <div onClick={props.handleClick} style={{ height: 200, width: 200, border: '1px dashed grey', borderRadius: 15, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                                :
                                <img onClick={props.handleClick} style={{ width: 'max-content', objectFit: 'contain', height: 400, borderRadius: 15, cursor: 'pointer' }} src={props.img || imgProfile} alt="" />
                            }
                            <div className='button_option_container' style={{ width: '100%', maxWidth: 500, marginTop: 20, display: 'flex' }} data-theme={localTheme}>
                                {props.img != '' && <div onClick={props.handleRemoveImg} className='button_option' style={{ width: '100%' }} data-theme={localTheme}>Remove picture</div>}
                                <div onClick={props.handleClick} className='button_optionBlue' data-theme={localTheme}>Add picture</div>
                            </div>

                            <div className='title_color' style={{ fontSize: 16, margin: 0 }}><span style={{ fontWeight: 800 }}>Supported formats</span>PNG/JPG/JPEG/GIF</div>
                            <div className='title_color' style={{ fontSize: 16, margin: 0 }}><span style={{ fontWeight: 800 }}>Maximum file size</span>5MB</div>


                            <div style={{ marginTop: 20, width: '90%' }}>Title :</div>
                            <input onChange={(e) => { props.setTitle(e.target.value) }} defaultValue={props.title} style={{ marginTop: 20, marginBottom: 20 }} className="input_text" placeholder="Title..." type="text" name="" id="" data-theme={localTheme} />

                            <div style={{ marginTop: 10, width: '90%', display: 'flex', justifyContent: 'space-between' }}><span>Caption :</span> <span style={{ cursor: 'pointer' }} onClick={() => { setCaptionSize(!captionSize) }}>{!captionSize && <span>Maximize<FontAwesomeIcon style={{ marginLeft: 10 }} icon={faMaximize} /></span>}{captionSize && <span>Minimize<FontAwesomeIcon style={{ marginLeft: 10 }} icon={faMinimize} /></span>}</span></div>
                            <div className="textarea_mess scrollbar" style={{ maxHeight: !captionSize ? 150 : '100%', overflow: 'auto' }} data-theme={localTheme}>
                                <Editor
                                    ref={editor}
                                    editorState={props.editorState}
                                    onChange={props.onChange}
                                    plugins={[linkifyPlugin, hashtagPlugin]}
                                    placeholder="Write a caption here..."
                                />
                            </div>

                            <div style={{ marginTop: 10, width: '90%', display: 'flex', justifyContent: 'space-between', color: props.editeTags?.length > 10 ? 'red' : '#00aa00', borderBottom: `1px solid ${props.editeTags?.length > 10 ? 'red' : '#00aa00'}` }}>Add tag : <span style={{ fontWeight: 800 }} translate='no'><span>{props.editeTags?.length || 0}</span>/10</span></div>

                            <div style={{ width: '90%', paddingTop: 20 }}>
                                <div>Tags found :</div>
                            </div>
                            <div style={{ width: '90%', display: 'flex', flexWrap: 'wrap', marginTop: 50 }} data-theme={localTheme}>
                                {props.editeTags?.length ? <>{props.editeTags?.map((el) => (
                                    <div onClick={() => { props.handleRemoveTag(el) }} className='tagsManage' translate='no' key={el} data-theme={localTheme}>
                                        {el}
                                    </div>
                                ))}</>
                                    :
                                    <>
                                        <div style={{ color: 'grey' }}>No tags found</div>
                                    </>}
                            </div>
                            <input maxLength={31} onKeyDown={props.handleChangeTags} onChange={(e) => { props.handleChangeTags(e) }} style={{ marginTop: 20, resize: 'none' }} className='input_text' placeholder='Add a tag: #...' type="text" name="tag" id="tag" value={props.text} data-theme={localTheme} />
                            <div><span>{props.text.length}</span>/30</div>
                            <div className="checkbox-wrapper-46" style={{ marginBottom: 10, marginTop: 20 }}>
                                <input
                                    className="inp-cbx" id="hj54" type="checkbox" />
                                <label className="cbx" htmlFor="hj54"><span>
                                    <svg width="12px" height="12px" viewBox="0 0 12 10">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                    </svg></span><span style={{ marginLeft: 10 }}>Allow other users to edit tags?</span>
                                </label>
                            </div>

                            <div style={{ marginTop: 30, width: '90%', display: 'flex', justifyContent: 'space-between' }}>Allow you comments ?<div className={props.comments === null ? 'badge_require' : 'valide'} translate='no'>Require</div></div>
                            <div style={{ width: '100%', maxWidth: 200, display: 'flex', marginTop: 10, justifyContent: 'space-between' }}>
                                <div className="checkbox-wrapper-46Radio">
                                    <input className="inp-cbxRadio" type="radio" name="rdo3" id="opt8" onChange={() => { props.setComments(false) }} checked={props.comments == 0} />
                                    <label className="cbxRadio" htmlFor="opt8">
                                        <span></span><span style={{ marginLeft: 5 }}>No</span>
                                    </label>
                                </div>
                                <div className="checkbox-wrapper-46Radio">
                                    <input className="inp-cbxRadio" type="radio" name="rdo3" id="opt9" onChange={() => { props.setComments(true) }} checked={props.comments == 1} />
                                    <label className="cbxRadio" htmlFor="opt9">
                                        <span></span><span style={{ marginLeft: 5 }}>Yes</span>
                                    </label>
                                </div>
                            </div>


                            <div className='button_option_container' style={{ width: '100%', maxWidth: 500, display: 'flex', marginTop: 20 }} data-theme={localTheme}>
                                
                                <div className='button_option' style={{ width: '100%' }} data-theme={localTheme}>Delete</div>
                                <div className='button_optionPic_v' style={{ width: '100%' }} onClick={props.submit} data-theme={localTheme}>Publish</div>
                            </div>

                            <div className="checkbox-wrapper-46" style={{ marginBottom: 10, marginTop: 20 }}>
                                <input
                                    className="inp-cbx" id="j54758" type="checkbox" />
                                <label className="cbx" htmlFor="j54758"><span>
                                    <svg width="12px" height="12px" viewBox="0 0 12 10">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                    </svg></span><span style={{ marginLeft: 10 }}>Do you want to notify subscribers ?</span>
                                </label>
                            </div>

                            <div className='button_option_container' style={{ width: '100%', maxWidth: 500, display: 'flex', marginTop: 20 }} data-theme={localTheme}>
                            <div className='button_option' onClick={() => { props.setAnnouncement(false) }} data-theme={localTheme}>Cancel</div>
                            </div>

                        </div>
                    </div>
                </RemoveScroll>

            </div>
        </>
    )
}

export default Posts