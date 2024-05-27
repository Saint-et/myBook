import { useAppContext } from '../../contexts/UseAppContext';
import { useNavigate } from 'react-router-dom';
import Picture from '../../assets/images/logo.png';
import UpdatePost from '../../layouts/UserProfil/News/Home/UpdatePost';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faPenToSquare, faShareSquare } from '@fortawesome/free-regular-svg-icons';
import { Editor } from 'draft-js';
import { EditorState, convertFromRaw } from "draft-js";
import { useTranslation } from 'react-i18next';


const Card_Post = (props) => {

    const navigate = useNavigate()

    const { localTheme, promiseIdentifiedUser, handleFullScreen } = useAppContext()


    const { t } = useTranslation();

    const editor = useRef(null);

    const [update, setUpdate] = useState(false);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());


    let imgSize = 500;


    const [showMore, setShowMore] = useState(null)

    const [comments, setComments] = useState(null)

    

    return (
        <>
            {update && <UpdatePost update={update} setAnnouncement={setUpdate} GetMyFilesFromAPIAnnouncement={props.GetMyFilesFromAPIAnnouncement} />}

                {props.promise?.map((promise, index) => (
                    <div className='ctent_arti' style={{ maxWidth: 1000, paddingTop: 5, marginBottom: 100 }} key={promise.id} data-theme={localTheme}>
                        {!props.buttonName && <><div className='article_card_menu'>
                            <div onClick={() => { navigate(`/profile/${promise.user.id}/home?type=Illustrations`) }} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', width: 'max-content', overflow: 'hidden', marginLeft: 5 }}>
                                {promiseIdentifiedUser?.user.id == promise.user.id && <img className='article_card_menu_img' style={{ width: 40, height: 40 }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} src={promiseIdentifiedUser?.user.imageUrl || Picture} alt='' />}
                                {promiseIdentifiedUser?.user.id != promise.user.id && <img className='article_card_menu_img' style={{ width: 40, height: 40 }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} src={promise.user.imageUrl || Picture} alt='' />}
                                <div className='article_card_menu_text'>
                                    {promise.user.pseudo}
                                </div>
                            </div>

                            {!props.button && <>{parseInt(promiseIdentifiedUser?.user.id) === parseInt(promise.user.id) && <div style={{ display: 'flex', width: 'max-content', alignItems: 'center', justifyContent: 'end' }}>
                                <div className='buttonCircle' onClick={() => { setUpdate(promise) }} data-theme={localTheme}>
                                    <FontAwesomeIcon style={{ fontSize: 13 }} icon={faPenToSquare} />
                                </div>
                            </div>}</>}

                        </div></>}

                        <img onClick={() => handleFullScreen({ img: promise.imageUrl })} className='hovercursor' loading="lazy" src={promise.imageUrl || Picture} style={{ height: 'max-content', maxHeight: imgSize, width: '98%', maxWidth: imgSize, objectFit: 'contain', cursor: 'pointer', marginTop: 10 }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} alt="" />

                        <h3 className='article_card_title' translate='no'>{promise.title.charAt(0).toUpperCase() + promise.title.slice(1)}</h3>


                        {convertFromRaw(JSON.parse(promise.data)).getPlainText().length > 0 ?
                                <div style={{ height: showMore !== index ? 80 : 'max-content', width: '90%', overflow: 'hidden' }}>
                                    <div style={{ marginTop: 10, marginBottom: 20 }} data-theme={localTheme}><span style={{ margin: 5 }}>{convertFromRaw(JSON.parse(promise.data)).getPlainText()}</span></div>
                                </div>
                            :
                            <div style={{ width: '90%', textAlign: 'center', marginTop: 10, marginBottom: 20 }} data-theme={localTheme}><span style={{ margin: 5 }}>L’utilisateur n’a laissé aucun commentaire sur cette publication.</span></div>
                        }

                        <div className='article_card_menu' style={{ width: '98%', marginTop: 20 }}>
                            <div style={{display: 'flex'}}>
                            <div onClick={() => { setComments(comments !== index ? index : null) }} className='hovercursor' data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 5 }} icon={faComment} />254</div>
                            <div style={{marginLeft: 10}} className='hovercursor' data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 5 }} icon={faHeart} />2876</div>
                            <div style={{marginLeft: 10}} className='hovercursor' data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 5 }} icon={faShareSquare} />2876</div>
                            </div>

                            {convertFromRaw(JSON.parse(promise.data)).getPlainText().length > 0 &&<div onClick={() => { setShowMore(showMore !== index ? index : null) }} className='hovercursor' data-theme={localTheme}>
                                        {t(showMore !== index ? 'showMore' : 'showLess')}...
                                    </div>}
                        </div>

                        {comments === index &&
                            <div style={{ width: '98%' }}>
                                <div style={{ marginTop: 10, width: '98%', border: 'none', borderRadius: 5 }} className="textarea_mess" data-theme={localTheme}>
                                    <Editor
                                        ref={editor}
                                        editorState={editorState}
                                        onChange={(newEditorState) => setEditorState(newEditorState)}
                                        placeholder="Écrivez ici..."
                                    />
                                </div>

                                {true ? <div className="container_comment" data-theme={localTheme}>
                                    <div className="content_mess" style={{ display: 'flex' }}>
                                        <img style={{ width: 45, height: 45, borderRadius: '100%', objectFit: 'cover', objectPosition: `50% ${10}%`, marginLeft: 10 }} src={promise.user.imageUrl || Picture} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                                        <div className='message' data-theme={localTheme}>Soyez le premier à commenter cette publication.😊</div>
                                    </div>
                                </div>
                                    :
                                    <div className="container_comment" data-theme={localTheme}>
                                        <div className="content_mess" style={{ display: 'flex' }}>
                                            <img style={{ width: 45, height: 45, borderRadius: '100%', objectFit: 'cover', objectPosition: `50% ${10}%`, marginLeft: 10 }} src={promise.user.imageUrl || Picture} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                                            <div className='message' data-theme={localTheme}>L'utilisateur a choisi de désactiver les commentaires pour cette publication.🙁</div>
                                        </div>
                                    </div>}
                            </div>}

                    </div>))}
        </>
    )
}

export default Card_Post