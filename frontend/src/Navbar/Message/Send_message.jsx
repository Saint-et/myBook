import React, { useState, useEffect, useRef } from "react";
import { API_URL, SOCKET_URL } from '../../config';
import axios from "axios";
import PageNoFound from "../../components/page_err";
import Picture from '../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faFlag, faArrowLeft, faPaperPlane, faX } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import io from "socket.io-client";
import { useNavigate } from 'react-router-dom';
import { spinner } from "../../utils";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { stateToHTML } from 'draft-js-export-html';
import parse from 'html-react-parser';
import { useAppContext } from '../../contexts/UseAppContext';

const socket = io.connect(SOCKET_URL);

const Send_message = (props) => {
    const { localTheme,
        setHiddenMenuMiniProfil,
        setHiddenMenu,
        promiseIdentifiedUser } = useAppContext();

    const navigate = useNavigate()

    const url = window.location.href;
    const Id = url.split("/")[5];


    const [promiseDiscussion, setPromiseDiscussion] = useState()

    const GetDiscussion = async () => {
        try {
            await axios.get(`${API_URL}api/eventv/discussion/get/${Id}`,
                { withCredentials: true })
                .then((res) => {
                    setPromiseDiscussion(res.data.promise);
                    GetMessage(res.data.promise.uuId)
                    socket.on(res.data.promise.uuId, () => {
                        GetMessage(res.data.promise.uuId)
                    })
                })
        } catch (error) {
            setPromiseDiscussion(true)
        }
    }


    const [promiseMessage, setPromiseMessage] = useState()

    const GetMessage = async (id) => {
        try {
            await axios.get(`${API_URL}api/eventv/message/get/${id}`,
                { withCredentials: true })
                .then((res) => {
                    setPromiseMessage(res.data.promise);
                })
        } catch (error) {
            setPromiseMessage(true)
        }
    }

    // vérification du login avant d'exécuter les post
    useEffect(() => {
        GetDiscussion()
    }, []);


    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    const editor = useRef(null);


    const submit = async (uuid, id, userId) => {
        if (editorState.getCurrentContent().getPlainText().trim().split(/ +/).join(" ") !== "") {
            try {
                await axios.post(`${API_URL}api/eventv/post/message`, {
                    id: id,
                    text: stateToHTML(editorState.getCurrentContent()).split(/&nbsp;/).join(""),
                    uuId: uuid,
                    imageUrl: ''
                }, { withCredentials: true })
                    .then(() => {
                        setEditorState(() => EditorState.createEmpty())
                        GetMessage(uuid);
                        socket.emit('message-created', { uuId: uuid });
                        socket.emit('notify-message', { uuId: uuid, text: stateToHTML(editorState.getCurrentContent()), userId: userId, sessionUserId: promiseIdentifiedUser.user.id, status: true });
                    })
            } catch (error) {

            }
        }
    }


    const handleDelete = async (id, userId) => {
        try {
            await axios.delete(`${API_URL}api/eventv/message/delete/${id}`,
                { withCredentials: true })
                .then(() => {
                    socket.emit('notify-message', { userId: userId, status: false });
                    socket.emit('discussion-created', (`${userId}-discussion-refresh`));
                    navigate('/discussions')
                })
        } catch (error) {
            navigate('/discussions')
        }
    }

    const [hiddenInfo, setHiddenInfo] = useState(false)
    // <textarea value={edite.text} className="textarea_mess" onChange={handleChange('text')} style={{width: '90%', resize: 'none', borderRadius: 15, border: 'none', outline: 'none', padding: 10, fontSize: 20, height: 100}} name="textarea" id="textarea" cols="30" rows="10" placeholder="Write here" data-theme={localTheme}></textarea>


    if (!promiseDiscussion || !promiseIdentifiedUser) return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}>
            {spinner()}
        </div>
    )


    if (promiseDiscussion === true) return (<PageNoFound localTheme={localTheme} />)

    return (
        <div className='main'>

            {hiddenInfo && <div className='blanket' style={{ zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: -100 }} >
                <div className='menu_navbar' style={{ width: '100%', flexDirection: 'column', maxWidth: 900, height: 400 }} data-theme={localTheme}>
                    <div className='submenu_navbar_title' style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'row-reverse' }}>
                            <div className='buttonCircle' onClick={() => { setHiddenInfo(false) }} style={{ width: 30, height: 30, fontSize: 15, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute' }} data-theme={localTheme}>
                                <FontAwesomeIcon icon={faX} />
                            </div>
                        </div>
                        <h2 style={{ display: 'flex', justifyContent: 'center' }}>Informations</h2>
                    </div>
                </div>
            </div>}


            <div className='cter_sect' style={{ marginTop: 20 }}>
                <div className='ctent_arti' style={{ paddingTop: 30, maxWidth: 1000 }} data-theme={localTheme}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '90%' }}>
                        <div style={{ display: 'flex' }}>
                            <img onClick={() => { 
                                setHiddenMenu(true)
                                setHiddenMenuMiniProfil(promiseDiscussion.user) }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ height: 70, width: 70, objectPosition: `${50}% ${10}%`, borderRadius: 50, cursor: 'pointer', marginRight: 10 }} src={promiseDiscussion.user.imageUrl || Picture} alt='' />
                            <h3>{promiseDiscussion.user.pseudo}</h3>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <Link to={'/discussions'} className='buttonCircle' style={{ width: 35, height: 35, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15 }} data-theme={localTheme}>
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </Link>
                            <div onClick={() => { setHiddenInfo(true) }} className='buttonCircleBlue' style={{ width: 35, height: 35, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15 }} data-theme={localTheme}>
                                <FontAwesomeIcon icon={faInfo} />
                            </div>
                            <div className='buttonCircleRed' style={{ width: 35, height: 35, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15 }} data-theme={localTheme}>
                                <FontAwesomeIcon icon={faFlag} />
                            </div>
                        </div>
                    </div>

                    <div className="container_mess" data-theme={localTheme}>
                        {promiseMessage?.map((promise) => (
                            <div translate="no" className={promiseIdentifiedUser.user.id != promise.user.id ? "" : "content_mess active"} style={{ display: 'flex' }} key={promise.id}>
                                {promiseIdentifiedUser.user.id != promise.user.id && <img style={{ width: 45, height: 45, borderRadius: '100%' }} src={promise.user.imageUrl || Picture} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />}
                                <div className='message' data-theme={localTheme}>{parse(promise.text)}</div>
                            </div>
                        ))}


                    </div>

                    <div translate="no" className="textarea_mess" data-theme={localTheme}>
                        <Editor
                            ref={editor}
                            editorState={editorState}
                            onChange={setEditorState}
                            placeholder="..."
                        />
                    </div>

                    <div style={{ marginTop: 10, display: 'flex' }}>
                        <div onClick={() => { setEditorState(() => EditorState.createEmpty()) }} className='buttonCircle' style={{ width: 120, height: 35, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, textDecoration: 'none' }} data-theme={localTheme}>
                            Erased
                        </div>
                        <div onClick={() => { submit(promiseDiscussion.uuId, promiseDiscussion.id, promiseDiscussion.user.id) }} className={editorState.getCurrentContent().getPlainText().trim().split(/ +/).join(" ") !== "" ? 'buttonCircleBlue' : 'buttonCircleDisable'} style={{ width: 120, height: 35, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, textDecoration: 'none' }} data-theme={localTheme}>
                            <FontAwesomeIcon icon={faPaperPlane} />&nbsp;Send
                        </div>
                    </div>
                    <div onClick={() => { handleDelete(promiseDiscussion.uuId, promiseDiscussion.user.id) }} className='buttonCircleRed' style={{ marginTop: 20, width: 220, height: 35, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, textDecoration: 'none' }} data-theme={localTheme}>
                        Closing this discussion
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Send_message