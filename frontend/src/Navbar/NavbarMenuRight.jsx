import '../sass/components/SideNav.scss';
import imgProfile from '../assets/images/logo.png';
import imgRemplace from '../assets/images/vaisseau-spatial-futuriste-orbite-autour-mysterieuse-planete-dans-galaxie-profonde-generee-par-intelligence-artificielle.jpg';
import { RemoveScroll } from "react-remove-scroll";
import { useAppContext } from "../contexts/UseAppContext";
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useKeypress from 'react-use-keypress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faLanguage, faCubes, faPanorama, faBriefcase, faGears, faPowerOff, faUsers, faXmark, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { API_URL, SOCKET_URL } from '../config';
import axios from "axios";
import { SystemName, SystemPicture } from '../assets/data/data';
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { stateToHTML } from 'draft-js-export-html';
import io from "socket.io-client";
import UseNavbar from './useNavbar';
import Function_utils from '../components/versatile_function/usefunction_utils';
import { faClock } from '@fortawesome/free-regular-svg-icons';


const socket = io.connect(SOCKET_URL);

const NavbarMenuRigh = () => {

    const { t } = useTranslation();

    const { localTheme,
        isNavbarVisible, setNavbarVisible,
        handleModeEco, setActiveAnimation,
        activeAnimation,
        animationSelect,
        setLanguageSelect,
        hiddenMenuSidebareRight,
        setHiddenMenuSidebareRight,
        setHiddenMenuSidebare,
        hiddenMenuSidebare,
        handleTheme,
        setPromiseIdentifiedUser,
        promiseIdentifiedUser,
        notif,
        GetNotifFromAPI,
        GetMyProfilFromAPI,
        notifMessage,
        GetNotifMessageFromAPI,
        promiseUsers,
        GetUsersPopularFromAPI,
        handleThemeBackground,
        localThemeBackground,
        promiseAnnouncement,
        setThemeBackground,
        hiddenConnection,
        setHiddenConnection,
        handleClearIndexedDB,
        systemDetectMobile } = useAppContext()


    const {
        handleButtonClick,
        handleLogout,
        handleDelete,
        handleDeleteAllNotif,
        hiddenAnswer, setHiddenAnswer,
        errorAnswer,
        editorState, setEditorState,
        handleDeleteAllMessage,
        editor,
        submitMessage,
        handleDeleteNotifMessage
    } = UseNavbar()

    const { addSearchToUrl } = Function_utils()

    const wrapperRef = useRef(null);

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    handleButtonClick()
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    useOutsideAlerter(wrapperRef);

    //const handleButtonClick = () => {
    //    // Activez l'animation en mettant à jour l'état local
    //    setActiveAnimation(false);
    //    // Vous pouvez également désactiver l'animation après un certain délai si nécessaire
    //    setTimeout(() => {
    //        setHiddenMenuSidebareRight(false)
    //    }, 300); // Par exemple, désactivez l'animation après 1 seconde
    //};

    //const handleLogout = async () => {
    //    handleButtonClick()
    //    await axios.get(`${API_URL}api/auth/logout`,
    //        { withCredentials: true })
    //        .then(() => {
    //            setPromiseIdentifiedUser(false)
    //            handleClearIndexedDB()
    //            localStorage.removeItem("last-URL-home");
    //            //navigate('/login')
    //            setThemeBackground(SystemPicture)
    //            return;
    //        })
    //}
    //const handleDelete = async (id) => {
    //    await axios.delete(`${API_URL}api/eventv/delete/notif/${id}`,
    //        { withCredentials: true })
    //        .then(() => {
    //            return GetNotifFromAPI()
    //        })
    //}
    //const handleDeleteAllNotif = async () => {
    //    await axios.delete(`${API_URL}api/eventv/delete/notifs`,
    //        { withCredentials: true })
    //        .then(() => {
    //            return GetNotifFromAPI()
    //        })
    //}


    //const [hiddenAnswer, setHiddenAnswer] = useState(false)
    //const [errorAnswer, setErrorAnswer] = useState(false)

    //const handleDeleteAllMessage = async () => {
    //    await axios.delete(`${API_URL}api/eventv/delete/messages`,
    //        { withCredentials: true })
    //        .then(() => {
    //            return GetNotifMessageFromAPI()
    //        })
    //}


    //const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    //const editor = useRef(null);

    //const submitMessage = async (uuid, id, userId) => {
    //    if (editorState.getCurrentContent().getPlainText() !== "") {
    //        try {
    //            await axios.post(`${API_URL}api/eventv/post/message`, {
    //                id: null,
    //                text: stateToHTML(editorState.getCurrentContent()),
    //                uuId: uuid,
    //                userId: id
    //            }, { withCredentials: true })
    //                .then(() => {
    //                    setEditorState(() => EditorState.createEmpty())
    //                    handleDeleteNotifMessage(uuid)
    //                    socket.emit('message-created', { uuId: uuid });
    //                    socket.emit('notify-message', { uuId: uuid, text: stateToHTML(editorState.getCurrentContent()), userId: userId, sessionUserId: promiseIdentifiedUser.user.id, status: true });
    //                })
    //        } catch (error) {
    //            setErrorAnswer(error.response.data.message)
    //        }
    //    }
    //}
    //const handleDeleteNotifMessage = async (uuId) => {
    //    try {
    //        await axios.delete(`${API_URL}api/eventv/delete/notifMessage/${uuId}`,
    //            { withCredentials: true })
    //            .then(() => {
    //                GetNotifMessageFromAPI();
    //            })
    //    } catch (error) {
    //    }
    //}


    const touchStartX = useRef(null);
    const touchStartY = useRef(null);
    const swipeTolerance = 10; // Tolérance de swipe

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
        if (!touchStartX.current || !touchStartY.current) {
            return;
        }

        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;
        const deltaX = touchStartX.current - touchEndX;
        const deltaY = touchStartY.current - touchEndY;

        // Vérifier si la différence de position X dépasse la tolérance de swipe
        if (Math.abs(deltaX) > swipeTolerance && Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 0) {
                // Swipe vers la gauche détecté

            } else {
                // Swipe vers la droite détecté
                handleButtonClick()
            }
        }

        touchStartX.current = null;
        touchStartY.current = null;
    };

    if (!systemDetectMobile) return null

    if (!hiddenMenuSidebareRight) return null

    if (!promiseIdentifiedUser) return null

    return (
        <>
            <div className="blanket open-element-page-melted" style={{ zIndex: 25000, paddingTop: 0, display: 'flex', justifyContent: 'end' }}>
                <RemoveScroll
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    removeScrollBar={true} ref={wrapperRef} className={activeAnimation ? "sideNav open-element-page-side-right scrollbar" : "sideNav close-element-page-side-right scrollbar"} data-theme={localTheme}>
                    <div className='sideNavContent'>
                        <Link onClick={() => {
                            handleButtonClick()
                        }} to={localStorage.getItem("last-URL-home") || `/profile/${promiseIdentifiedUser?.user.id}/home?type=Illustrations`} style={{ backgroundImage: `url(${promiseIdentifiedUser?.user.imageUrlCover || imgRemplace})`, backgroundPosition: `50% ${promiseIdentifiedUser.user.resizeImageUrlCover}%`, borderRadius: 0 }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='CoverImage FlexEmbed FlexEmbed--2by1'>
                        </Link>
                        <Link className='text' onClick={() => {
                            handleButtonClick()
                        }} style={{ zIndex: 10, textDecoration: 'none' }} to={localStorage.getItem("last-URL-home") || `/profile/${promiseIdentifiedUser?.user.id}/home?type=Illustrations`} data-theme={localTheme}>
                            <img style={{ cursor: 'pointer', width: 100, height: 100, borderRadius: '100%', marginTop: -30 }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='Profile_picture_nav hovercursor' src={promiseIdentifiedUser.user.imageUrl || imgProfile} alt="" />
                            <div className='title_color' style={{ textAlign: 'center', fontSize: 18, fontWeight: 800 }} translate='no'>{promiseIdentifiedUser?.user.pseudo}</div>
                        </Link>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                            <div onClick={handleTheme} className='buttonCircle' style={{ width: 23, height: 23, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, marginRight: 10 }} data-theme={localTheme}>
                                {localTheme === null && <FontAwesomeIcon icon={faMoon} />}
                                {localTheme === 'default' && <FontAwesomeIcon icon={faMoon} />}
                                {localTheme === 'dark' && <FontAwesomeIcon icon={faSun} />}
                            </div>
                            {/*<div className='buttonCircle' onClick={handleModeEco} style={{ color: animationSelect === 'eco' ? '#00aa00' : '#ec1c24', width: 23, height: 23, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, marginRight: 10 }} data-theme={localTheme}>
                                <FontAwesomeIcon icon={faCubes} />
                    </div>*/}
                            <div onClick={() => {
                                handleButtonClick()
                                setLanguageSelect(null)
                            }} className='buttonCircle' style={{ width: 23, height: 23, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, marginRight: 10 }} data-theme={localTheme}>
                                <FontAwesomeIcon icon={faLanguage} />
                            </div>
                        </div>
                        {/*<div className='button_option_container' style={{ width: '90%', marginTop: 10 }} data-theme={localTheme}>
                            <Link className='button_option' onClick={() => {
                                handleButtonClick()
                            }} to={'/works/file'} data-theme={localTheme} >
                                <FontAwesomeIcon style={{ marginRight: 5 }} icon={faBriefcase} />{t('workspace')}
                            </Link>
                        </div>*/}

                        <div className='button_option_container' style={{ width: '90%', marginTop: 10 }} data-theme={localTheme}>
                            <Link className='button_option' onClick={() => {
                                handleButtonClick()
                            }} to={`/profile/${promiseIdentifiedUser.user.id}/contact?list=followers`} data-theme={localTheme} >
                                <FontAwesomeIcon style={{ marginRight: 5 }} icon={faUsers} />{t('follewers')}
                            </Link>
                        </div>

                        <div className='button_option_container' style={{ width: '90%', marginTop: 10 }} data-theme={localTheme}>
                            <div className='button_option' onClick={() => {
                                handleButtonClick()
                                addSearchToUrl(`#Recently_viewed`)
                            }} data-theme={localTheme}>
                                <FontAwesomeIcon style={{ marginRight: 5 }} icon={faClock} />{t('last_view')}</div>
                        </div>

                        <div className='button_option_container' style={{ width: '90%', marginTop: 10 }} data-theme={localTheme}>
                            <Link to={`/parameters/profile`} className='button_option' onClick={() => {
                                handleButtonClick()
                            }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 5 }} icon={faGears} />{t('parameter')}</Link>
                        </div>
                        <div className='button_option_container' style={{ width: '90%', marginTop: 20 }} data-theme={localTheme}>
                            <div className='button_optionRed' onClick={handleLogout} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 5 }} icon={faPowerOff} />{t('logout')}</div>
                        </div>

                        <div style={{ width: '95%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 50, marginTop: 50, borderTop: '1px solid grey' }}>
                            <h4 className='title_color' style={{ display: 'flex', justifyContent: 'center', margin: 0 }}>Notifcations&nbsp;<span>{notif.length}</span></h4>
                            <div className='button_option_container' style={{ width: '100%', maxWidth: 100, display: 'flex', background: 'none' }} data-theme={localTheme}>
                                <div onClick={handleDeleteAllNotif} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, textDecoration: 'none' }} className={notif.length !== 0 ? 'button_optionRed' : 'button_optionDisable'} data-theme={localTheme}>
                                    All delete
                                </div>
                            </div>
                        </div>
                        {notif.length === 0 &&
                            <div className='title_color' style={{ textAlign: 'center' }}>No notifcations</div>}
                        {notif?.map((notif) => (
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: 10, paddingBottom: 10, borderBottom: '1px solid grey', width: '100%' }} key={notif.id}>
                                {notif.adminId && <><Link onClick={() => {
                                    handleDelete(notif.notifId)
                                    handleButtonClick()
                                }} className='notif' to={`/profile/${notif.adminId}/home?type=Illustrations`} data-theme={localTheme}>
                                    <img className='Profile_picture_nav' src={notif.user.imageUrl || imgProfile} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                                    <div>{notif.user.pseudo}&nbsp;{notif.data}.</div>
                                </Link>
                                    <div className='buttonCircle' data-theme={localTheme} style={{ width: 35, height: 35, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 13 }} onClick={() => handleDelete(notif.notifId)}>
                                        <FontAwesomeIcon icon={faXmark} />
                                    </div></>}
                            </div>
                        ))}



                        <h4 className='title_color' style={{ display: 'flex', justifyContent: 'center', paddingTop: 50, marginTop: 50 }}>Messages&nbsp;<span>{notifMessage.length}</span></h4>

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div className='button_option_container' style={{ width: '100%', display: 'flex', background: 'none' }} data-theme={localTheme}>
                                <div onClick={handleDeleteAllMessage} className={notifMessage.length !== 0 ? 'button_optionRed' : 'button_optionDisable'} style={{ width: 130, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, textDecoration: 'none' }} data-theme={localTheme}>
                                    All delete
                                </div>
                                <Link to={'/discussions'} onClick={() => { handleButtonClick() }} className='button_optionBlue' style={{ width: 150, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, textDecoration: 'none' }} data-theme={localTheme}>
                                    All discussions
                                </Link>
                            </div>
                        </div>
                        {notifMessage.length === 0 && <div className='title_color'>No messages</div>}

                        {notifMessage?.map((message) => (
                            <div className='container_mess_nav' key={message.id} data-theme={localTheme}>
                                <div onClick={() => { setHiddenAnswer(message.id) }} style={{ display: 'flex', justifyContent: 'space-around', cursor: 'pointer' }}>
                                    <img className='Profile_picture_nav' src={message.user.imageUrl || imgProfile} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                                    <h4>{message.user.pseudo}</h4>
                                </div>
                                {hiddenAnswer === message.id && <>
                                    <div>Message:</div>
                                    <div className='message_nav' style={{ textAlign: 'center' }} data-theme={localTheme}>{parse(message.text)}</div>
                                    {<div style={{ color: 'red' }}>{errorAnswer}</div>}
                                    <div translate="no" className="textarea_mess" style={{ width: '98%' }} data-theme={localTheme}>
                                        <Editor
                                            ref={editor}
                                            editorState={editorState}
                                            onChange={setEditorState}
                                            placeholder="..."
                                        />
                                    </div>
                                    <div style={{ marginTop: 10, display: 'flex' }}>
                                        <div onClick={() => { handleDeleteNotifMessage(message.uuId) }} className='buttonCircleRed' style={{ width: 90, height: 35, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, textDecoration: 'none' }} data-theme={localTheme}>
                                            Delete
                                        </div>
                                        <div onClick={() => { setHiddenAnswer(false) }} className='buttonCircle' style={{ width: 120, height: 35, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, textDecoration: 'none' }} data-theme={localTheme}>
                                            Cancel
                                        </div>
                                        <div onClick={() => { submitMessage(message.uuId, message.user.id, message.user.id) }} className={editorState.getCurrentContent().getPlainText() ? 'buttonCircleBlue' : 'buttonCircleDisable'} style={{ width: 120, height: 35, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, textDecoration: 'none' }} data-theme={localTheme}>
                                            <FontAwesomeIcon icon={faPaperPlane} />
                                        </div>
                                    </div>
                                </>}
                            </div>
                        ))}
                    </div>
                </RemoveScroll>
            </div>
        </>
    )
}

export default NavbarMenuRigh