import { useAppContext } from '../../../contexts/UseAppContext';
import { API_URL } from '../../../config';
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Card_list from '../../../components/Cards/Card_Square_user_list_presentation';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faExternalLink, faIcons, faMaximize, faMinimize, faPen, faPlus, faSquarePen, faThumbTack } from '@fortawesome/free-solid-svg-icons';
import Home_profile from './Home/Home_profile';
import { faBookmark, faCalendarDays, faEye, faEyeSlash, faHeart, faImages, faPenToSquare, faUser } from '@fortawesome/free-regular-svg-icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Card_articles_side_pinned from '../../../components/Cards/Card_articles_side_pinned';
import Window_pinned_illustrations from './windows_more/Window_pinned_illustrations';
import Function_utils from '../../../components/versatile_function/usefunction_utils';
import Window_pinned_users from './windows_more/Window_pinned_users';
import Text_manage from '../../../components/versatile_function/Text_manage';
import { EditorState } from 'draft-js';

const News = (props) => {
    const { localTheme, promiseIdentifiedUser, addErrorMessage } = useAppContext()

    const [errorSecurity, setErrorSecurity] = useState("");
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [editorStateOn, setEditorStateOn] = useState(true);

    const navigate = useNavigate()

    const location = useLocation()

    const url = window.location.href;
    const Id = parseInt(url.split("/")[4]);

    const [promiseUsers, setPromiseUsers] = useState([]);
    const [promiseIllustration, setPromiseIllustration] = useState([]);



    const { t } = useTranslation();

    const GetUsersPopularFromAPI = async () => {
        try {
            await axios.get(`${API_URL}api/eventv/user/get/pinned/${Id}`,
                { withCredentials: true })
                .then((res) => {
                    setPromiseUsers(res.data.promise);

                })
        } catch (error) {
            if (error.response.data.message === 'private') {
                setPromiseUsers(error.response.data.message);
            }
        }
    }

    const GetIllustrationFromAPI = async () => {
        try {
            await axios.get(`${API_URL}api/eventv/user/get/pinned-illustration/${Id}`,
                { withCredentials: true })
                .then((res) => {
                    setPromiseIllustration(res.data.promise);
                })
        } catch (error) {
            if (error.response.data.message === 'private') {
                setPromiseIllustration(error.response.data.message);
            }
        }
    }


    useEffect(() => {
        if (promiseIdentifiedUser) {
            GetUsersPopularFromAPI()
            GetIllustrationFromAPI()
        } else {
            setPromiseUsers([]);
            setPromiseIllustration([]);
        }
    }, [promiseIdentifiedUser]);

    //if (promiseIdentifiedUser === false) return (
    //    <Invited localTheme={localTheme} />
    //)

    //if (!promiseIdentifiedUser || !promiseUsers) return null

    const { addSearchToUrl } = Function_utils()

    const [checked, setCheckbox] = useState(false)
    //const [checkedPrivateIllustration, setCheckedPrivateIllustration] = useState(props.promiseUser?.user.privatePinnedIllustrations);
    //const [checkedPrivateUsers, setCheckedPrivateUsers] = useState(props.promiseUser?.user.privatePinnedUsers);

    const privateIllustration = async (e) => {
        setCheckbox(true)
        try {
            await axios.put(`${API_URL}api/eventv/updateUserAll`,
                {
                    privatePinnedIllustrations: e
                },
                { withCredentials: true })
                .then(() => {
                    setCheckbox(false)
                    props.setCheckedPrivateIllustration(e)
                })
        } catch (error) {
            addErrorMessage('Une erreur s\'est produite ( Favori privée ) 🤕.', 3000, '#ea384d')
            props.setCheckedPrivateIllustration(!e)
            setErrorSecurity(error.response.data.message)
            setCheckbox(false)
        }
    };
    const privateUsers = async (e) => {
        setCheckbox(true)
        try {
            await axios.put(`${API_URL}api/eventv/updateUserAll`,
                {
                    privatePinnedUsers: e
                },
                { withCredentials: true })
                .then(() => {
                    props.setCheckedPrivateUsers(e)
                    setCheckbox(false)
                })
        } catch (error) {
            addErrorMessage('Une erreur s\'est produite ( Users privée ) 🤕.', 3000, '#ea384d')
            props.setCheckedPrivateUsers(!e)
            setErrorSecurity(error.response.data.message)
            setCheckbox(false)
        }

    };

    return (
        <>

            {location.hash === '#pinned-illustration' && <Window_pinned_illustrations promiseUser={props.promiseUser} promiseIllustration={promiseIllustration} />}
            {location.hash === '#pinned-user' && <Window_pinned_users promiseUser={props.promiseUser} promise={promiseUsers} />}

            <div className='cter_sect'>

                <div className='rowDoubleposition'>
                    <div className='rowDoublepositionContent' data-theme={localTheme}>

                        <div className='nav_bar_scnd' style={{ margin: 0, padding: 0 }} data-theme={localTheme}>
                            <div style={{ width: '98%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <h4 style={{ margin: 10 }}>{t("description")}<FontAwesomeIcon style={{ marginLeft: 5 }} icon={faUser} /></h4>
                                {editorStateOn ? <>
                                    {promiseIdentifiedUser && <>
                                        {Id === promiseIdentifiedUser?.user.id && <div onClick={() => { setEditorStateOn(false) }} className='buttonCircle' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: -5, fontSize: 13 }} data-theme={localTheme}>
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </div>}
                                    </>}
                                </>
                                    :
                                    <div style={{ display: 'flex' }}>
                                        <div className='button_optionRed' onClick={() => { setEditorStateOn(true) }} style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 100, marginRight: 5 }} data-theme={localTheme}>
                                            {t('cancel')}
                                        </div>
                                        <div className='button_optionBlue' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 100 }} data-theme={localTheme}>
                                            {t('save')}
                                        </div>
                                    </div>}
                            </div>
                        </div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <div style={{ width: '97%', maxWidth: 1000, marginTop: 10, marginBottom: 20, padding: 10, borderRadius: 5, border: editorStateOn ? 'none' : '1px solid grey' }} data-theme={localTheme}>
                                <Text_manage data={props.promiseUser?.caption} promiseText={editorState} setPromiseText={setEditorState} readOnly={promiseIdentifiedUser ? !editorStateOn : false} />
                            </div>
                        </div>
                    </div>

                    <div className='rowDoublepositionContent' data-theme={localTheme}>

                        <div className='nav_bar_scnd' style={{ margin: 0, padding: 0 }} data-theme={localTheme}>
                            <div style={{ width: '98%' }}>
                                <h4 style={{ margin: 10 }}>Events<FontAwesomeIcon style={{ marginLeft: 5 }} icon={faCalendarDays} /></h4>
                            </div>
                        </div>

                        <div style={{ width: '98%', display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                            <div className='buttonCircle' style={{ width: 'max-content', height: 25, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, padding: '0px 10px 0px 10px', background: 'none' }} data-theme={localTheme}>
                                {t('seeMore')} <FontAwesomeIcon style={{ marginLeft: 5 }} icon={faArrowUpRightFromSquare} />
                            </div>
                        </div>
                    </div>
                </div>

                {promiseIdentifiedUser && <div className='rowDoubleposition'>

                    <div className='rowDoublepositionContent' data-theme={localTheme}>

                        <div className='nav_bar_scnd' style={{ margin: 0, padding: 0 }} data-theme={localTheme}>
                            <div style={{ width: '98%', display: 'flex', justifyContent: 'space-between' }}>
                                <h4 style={{ margin: 10 }} data-theme={localTheme}>Favorite <FontAwesomeIcon style={{ marginLeft: 5 }} icon={faHeart} /></h4>
                                {Id === promiseIdentifiedUser?.user.id && <div className="toggle-rect" style={{ marginTop: 10, display: 'flex' }}>
                                    <input checked={props.checkedPrivateIllustration || 0} onChange={(e) => privateIllustration(e.target.checked)} disabled={checked} type="checkbox" id="privateIllustration" name="privateIllustration" />
                                    <label htmlFor="privateIllustration"></label><FontAwesomeIcon style={{ marginLeft: 5 }} icon={props.checkedPrivateIllustration ? faEyeSlash : faEye} />
                                </div>}
                            </div>
                        </div>

                        <div className='scrollbar' style={{ display: 'flex', overflow: 'auto', alignItems: 'center', width: '98%' }}>
                            <Card_articles_side_pinned promise={promiseIllustration === 'private' ? promiseIllustration : promiseIllustration.slice(0, 10)} />
                        </div>


                        {promiseIllustration?.length > 0 && <div style={{ width: '98%', display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                            <div onClick={() => { addSearchToUrl('#pinned-illustration') }} className='buttonCircle' style={{ width: 'max-content', height: 25, marginTop: 10, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, padding: '0px 10px 0px 10px', background: 'none' }} data-theme={localTheme}>
                                {t('seeMore')} ...
                            </div>
                        </div>}
                    </div>

                    <div className='rowDoublepositionContent' data-theme={localTheme}>

                        <div className='nav_bar_scnd' style={{ margin: 0, padding: 0 }} data-theme={localTheme}>
                            <div style={{ width: '98%', display: 'flex', justifyContent: 'space-between' }}>
                                <h4 style={{ margin: 10 }}>Pinned users<FontAwesomeIcon style={{ marginLeft: 5 }} icon={faBookmark} /></h4>
                                {Id === promiseIdentifiedUser?.user.id && <div className="toggle-rect" style={{ marginTop: 10, display: 'flex' }}>
                                    <input checked={props.checkedPrivateUsers || 0} onChange={(e) => privateUsers(e.target.checked)} disabled={checked} type="checkbox" id="privateUsers" name="privateUsers" />
                                    <label htmlFor="privateUsers"></label><FontAwesomeIcon style={{ marginLeft: 5 }} icon={props.checkedPrivateUsers ? faEyeSlash : faEye} />
                                </div>}
                            </div>
                        </div>

                        <Card_list promise={promiseUsers} />

                        {promiseUsers?.length > 0 && <div style={{ width: '98%', display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                            <div onClick={() => { addSearchToUrl('#pinned-user') }} className='buttonCircle' style={{ width: 'max-content', height: 25, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, padding: '0px 10px 0px 10px', background: 'none' }} data-theme={localTheme}>
                                {t('seeMore')} ...
                            </div>
                        </div>}
                    </div>
                </div>}

                <Home_profile />
            </div>
        </>
    )
}

export default News