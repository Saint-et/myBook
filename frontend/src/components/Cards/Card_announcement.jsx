import Picture from '../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppContext } from '../../contexts/UseAppContext';
import { useState } from 'react';
import UpdatePost from '../../layouts/UserProfil/News/Home/UpdatePost';
import { useNavigate } from 'react-router-dom';
import { faImage, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { Editor } from 'draft-js';
import { EditorState, convertFromRaw } from "draft-js";
import dayjs from "dayjs";
import 'dayjs/locale/fr';
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);


const Card_announcement = (props) => {

    const navigate = useNavigate()

    const { localTheme,
        localThemeBackground,
        promiseIdentifiedUser,
        setNavbarVisible,
        handleFullScreen } = useAppContext();

    const [update, setUpdate] = useState(false)

    //<Linkify>
    //    <div translate='no'>
    //        {parse(stateToHTML(convertFromRaw(JSON.parse(promise.data))))}
    //    </div>
    //</Linkify>


    if (!promiseIdentifiedUser || !props.promise) return (
        <>
            <div className='scrollbar' style={{ display: 'flex', flexDirection: 'row', overflow: 'auto', width: '100%' }}>
                {[1, 2, 3, 4, 5, 6, 7]?.map((num) => (
                    <div className='card_post loarder_article_in animation' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 80, color: '#8080804d' }} data-theme={localTheme} key={num}>
                        <FontAwesomeIcon icon={faImage} />
                    </div>
                ))}
            </div>
        </>
    )

    if (props.promise?.length === 0) return (
        <>
            <div className='cter_sect' style={{ fontSize: 20, paddingTop: 30 }}>
                <h4 className="text" data-background={localThemeBackground} data-theme={localTheme}>No results</h4>
            </div>
        </>
    )


    return (
        <>
            {update && <UpdatePost update={update} setAnnouncement={setUpdate} GetMyFilesFromAPIAnnouncement={props.GetMyFilesFromAPIAnnouncement} />}
            <div className='scrollbar' style={{ display: 'flex', flexDirection: 'row', overflow: 'auto', width: '100%' }}>
                {props.promise?.map((promise) => (
                    <div className='card_post animation' style={{ height: 380, justifyContent: 'space-between' }} key={promise.id} data-theme={localTheme}>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                            {!props.buttonName && <><div className='article_card_menu'>
                                <div onClick={() => { navigate(`/profile/${promise.user.id}/page?type=Illustrations`) }} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', width: 'max-content', overflow: 'hidden', marginLeft: 5 }}>
                                    {promiseIdentifiedUser.user.id == promise.user.id && <img className='article_card_menu_img' onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} src={promiseIdentifiedUser.user.imageUrl || Picture} alt='' />}
                                    {promiseIdentifiedUser.user.id != promise.user.id && <img className='article_card_menu_img' onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} src={promise.user.imageUrl || Picture} alt='' />}
                                    <div className='article_card_menu_text'>
                                        {promise.user.pseudo}
                                    </div>
                                </div>


                                {!props.button && <>{parseInt(promiseIdentifiedUser.user.id) === parseInt(promise.user.id) && <div style={{ display: 'flex', width: 'max-content', alignItems: 'center', justifyContent: 'end' }}>
                                    <div className='buttonCircle' onClick={() => {
                                        setUpdate(promise)
                                        setNavbarVisible(false)
                                    }} data-theme={localTheme}>
                                        <FontAwesomeIcon style={{ fontSize: 13 }} icon={faPenToSquare} />
                                    </div>
                                </div>}</>}

                            </div></>}

                            <img onClick={() => { handleFullScreen({ img: promise.imageUrl }) }} className='hovercursor' loading="lazy" src={promise.imageUrl || Picture} style={{ height: 180, width: '99%', objectFit: 'cover', borderRadius: 5, cursor: 'pointer', marginTop: 10, objectPosition: `50% 15%` }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} alt="" />
                            <div className='article_card_title' translate='no'>{promise.title.charAt(0).toUpperCase() + promise.title.slice(1)}</div>
                        </div>

                        <div className='scrollbar' style={{ height: '100%', overflow: 'auto' }}>
                            <div style={{ width: '100%', overflow: 'hidden', fontSize: 12, display: 'flex', justifyContent: 'center' }}>
                                {convertFromRaw(JSON.parse(promise.data)).getPlainText().length > 0 ?
                                    <div style={{ marginTop: 10, marginBottom: 20, width: '98%' }} data-theme={localTheme}>{convertFromRaw(JSON.parse(promise.data)).getPlainText()}</div>

                                    :
                                    <div style={{ marginTop: 10, width: '98%' }} data-theme={localTheme}>L’utilisateur n’a laissé aucun commentaire sur cette publication.</div>
                                }
                            </div>
                        </div>
                        {promise.createdAt && <div style={{ fontSize: 12, color: '#0078e9' }}>{dayjs(promise.createdAt).add(0, 'hour').locale('fr').fromNow()}</div>}
                    </div>
                ))}
            </div>
        </>
    )
}

export default Card_announcement