import { useAppContext } from '../../../contexts/UseAppContext';
import { API_URL } from '../../../config';
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Card_list from '../../../components/Cards/Card_Square_user_list_presentation';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faMaximize, faMinimize, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Editor, EditorState } from 'draft-js';
import Home_profile from './Home/Home_profile';
import { faImages, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Picture from '../../../assets/images/logo.png';

const News = () => {
    const { localTheme, localThemeBackground, promiseIdentifiedUser, GetMyFileFromLocal } = useAppContext()

    const navigate = useNavigate()
    const url = window.location.href;
    const Id = parseInt(url.split("/")[4]);

    const editor = useRef(null);
    const [captionSize, setCaptionSize] = useState(false);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    const [promiseUsers, setPromiseUsers] = useState('');
    const [promiseIllustration, setPromiseIllustration] = useState([]);

    const { t } = useTranslation();

    const GetUsersPopularFromAPI = async () => {
        try {
            await axios.get(`${API_URL}api/eventv/user/get/pinned/${Id}`,
                { withCredentials: true })
                .then((res) => {
                    setPromiseUsers(res.data);

                })
        } catch (error) {
            //setError(error.response.data);
        }
    }

    const GetIllustrationFromAPI = async () => {
        try {
            await axios.get(`${API_URL}api/eventv/user/get/pinned-illustration/${Id}`,
                { withCredentials: true })
                .then((res) => {
                    setPromiseIllustration(res.data);

                })
        } catch (error) {
            //setError(error.response.data);
        }
    }

    useEffect(() => {
        GetUsersPopularFromAPI()
        GetIllustrationFromAPI()
    }, []);

    //if (!promiseIdentifiedUser || !promiseUsers) return null

    return (
        <>
            <div className='cter_sect'>
                <div className='ctent_arti' data-theme={localTheme}>
                        <h3 style={{ width: '98%' }}>- Link :</h3>
                        <h3 style={{ width: '98%' }}>- {t("description")} :</h3>
                    <div style={{ width: '100%' }}>
                        <div className="copy-box two" data-theme={localTheme}>
                            <div className="inner">
                                <div className="line right"></div>
                                <div>{t("none")}</div>

                            </div>
                        </div>
                    </div>

                    {false && <><div style={{ marginTop: 10, width: '98%', display: 'flex', justifyContent: 'space-between' }}><span>Caption :</span> <span style={{ cursor: 'pointer' }} onClick={() => { setCaptionSize(!captionSize) }}>{!captionSize && <span>Maximize<FontAwesomeIcon style={{ marginLeft: 10 }} icon={faMaximize} /></span>}{captionSize && <span>Minimize<FontAwesomeIcon style={{ marginLeft: 10 }} icon={faMinimize} /></span>}</span></div>
                        <div className="textarea_mess scrollbar" style={{ maxHeight: !captionSize ? 250 : '100%', overflow: 'auto' }} data-theme={localTheme}>
                            <Editor
                                ref={editor}
                                editorState={editorState}
                                //onChange={props.onChange}
                                //plugins={[linkifyPlugin, hashtagPlugin]}
                                placeholder="Write a caption here..."
                            />
                        </div></>}
                </div>

                <div style={{ marginTop: 40, width: '98%', maxWidth: 1800, marginBottom: 20 }}>
                    <div style={{ width: '98%', marginBottom: 10 }}>
                        <h3 className='text' data-background={localThemeBackground} data-theme={localTheme} style={{ margin: 0 }}>- Pinned users</h3>
                    </div>
                    <Card_list promise={promiseUsers?.promise} />
                    {promiseUsers.promise?.length > 0 &&
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <div className='button_option_container' style={{ width: '100%', display: 'flex', marginTop: 10, maxWidth: 500 }} data-theme={localTheme}>
                                <div className='button_option' data-theme={localTheme}>
                                    {t('seeMore')}
                                    <FontAwesomeIcon style={{ marginLeft: 5 }} icon={faArrowUpRightFromSquare} />
                                </div>
                            </div>
                        </div>}
                </div>

                <div className='ctent_arti' data-theme={localTheme}>
                    <div style={{ width: '98%', marginBottom: 10 }}>
                        <h3 className='text' data-background={localThemeBackground} data-theme={localTheme} style={{ margin: 0 }}>- Pinned Illustration</h3>
                    </div>

                    <div className='scrollbar' style={{ display: 'flex', flexDirection: 'row', overflow: 'auto', alignItems: 'center', width: '98%' }}>
                        {promiseIllustration?.map((img, index) => (
                            <div style={{ margin: 5 }} className="hovercursor" key={index}>
                                <div className='article_card_menu'>
                                    <div onClick={() => { navigate(`/profile/${img.user.id}/page?type=Illustration`) }} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', width: 'max-content', overflow: 'hidden', marginLeft: 5 }}>
                                        {promiseIdentifiedUser?.user.id == img.user.id && <img className='article_card_menu_img' onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} src={promiseIdentifiedUser?.user.imageUrl || Picture} alt='' />}
                                        {promiseIdentifiedUser?.user.id != img.user.id && <img className='article_card_menu_img' onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} src={img.user.imageUrl || Picture} alt='' />}
                                        <div className='article_card_menu_text'>
                                            {img.user.pseudo}
                                        </div>
                                    </div>

                                    {promiseIdentifiedUser?.user.id == img.user.id && <div style={{ display: 'flex', width: 'max-content', alignItems: 'center', justifyContent: 'end' }}>
                                        <div onClick={() => { GetMyFileFromLocal(img.id) }} className='buttonCircle' data-theme={localTheme}>
                                            <FontAwesomeIcon style={{ fontSize: 13 }} icon={faPenToSquare} />
                                        </div>
                                    </div>}
                                </div>
                                <img onClick={() => { navigate(`/file/${img.type}/page?file=${img.id}&index=0`) }} loading="lazy" src={img.miniature} style={{ objectFit: 'cover', objectPosition: `50% ${10}%`, borderRadius: 5, cursor: 'pointer', height: 200, width: 180, marginTop: 5 }} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />

                                <div style={{ display: 'flex', marginBottom: 5 }}>
                                    <div className='badge' style={{ borderRadius: 5, marginRight: 5, display: 'flex', alignItems: 'center' }} data-theme={localTheme}>{img.imagesCount}
                                        <FontAwesomeIcon style={{ fontSize: 12, marginLeft: 5 }} icon={faImages} />
                                    </div>
                                    {img.adult == 1 && <div className='adult' style={{ marginRight: 5 }} translate='no'>18+</div>}
                                    {img.adult == 2 && <div className='adult' style={{ marginRight: 5 }} translate='no'>18++</div>}
                                    {img.ai == 1 && <div className='AI' style={{ marginRight: 5 }} translate='no'>AI</div>}
                                </div>
                            </div>
                        ))}
                    </div>

                    {promiseIllustration?.length > 0 &&
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <div className='button_option_container' style={{ width: '90%', display: 'flex', marginTop: 10, maxWidth: 500 }} data-theme={localTheme}>
                                <div className='button_option' data-theme={localTheme}>
                                    {t('seeMore')}
                                    <FontAwesomeIcon style={{ marginLeft: 5 }} icon={faArrowUpRightFromSquare} />
                                </div>
                            </div>
                        </div>}
                </div>

                <Home_profile />
            </div>
        </>
    )
}

export default News