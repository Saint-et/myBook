import { RemoveScroll } from "react-remove-scroll";
import { useAppContext } from "../../contexts/UseAppContext";
import { useTranslation } from "react-i18next";
import { faClose, faMinus, faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { API_URL } from "../../config";
import axios from "axios";
import dayjs from "dayjs";
import 'dayjs/locale/fr';
import { NSFW, SystemLogo, SystemName } from "../../assets/data/data";
import { useWorkspaceContext } from "../../contexts/UseWorkspaceContexte";
import Function_utils from "../../components/versatile_function/usefunction_utils";
import Text_manage from "../../components/versatile_function/Text_manage";
import { Link } from "react-router-dom";
import { spinner } from "../../utils";
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);




const User_diagnosis = (props) => {


    const { t } = useTranslation();

    const {
        systemDetectMobile,
        isNavbarVisible,
        localTheme,
        promiseIdentifiedUser,
        handleFullScreen
    } = useAppContext();


    const {
        handleConversionCoins,
        realCash,
        cashBack
    } = Function_utils()

    const {
        promiseFileStatistical, setPromiseFileStatistical
    } = useWorkspaceContext();

    const [promise, setPromise] = useState()

    // Search on the server second
    const GetMyFileFromAPI = async (Id) => {
        //setRefresh(false);
        try {
            await axios.get(`${API_URL}api/admin/admin-file/statisticale/${Id}`,
                { withCredentials: true })
                .then((res) => {
                    setPromise(res.data)
                    handleConversionCoins(res.data.price)
                })
        } catch (err) {

        }
    }

    const handleTags = (promise, promiseIdentifiedUser) => {
        if (!promise) {
            return
        }
        const users = promise?.filter((el) => el.userId === promiseIdentifiedUser?.user.id);
        return users.length;
    };

    useEffect(() => {
        if (!promiseFileStatistical) {
            return;
        }
        if (promiseFileStatistical === promise?.id) {
            return;
        }
        GetMyFileFromAPI(promiseFileStatistical)
    }, [promiseFileStatistical])

    if (!promiseFileStatistical || !promiseIdentifiedUser) return null

    if (!promise) return (
        <>
            <div style={{
                    zIndex: 9000,
                    width: '98%',
                    maxWidth: systemDetectMobile === false ? 500 : 300,
                    overflow: 'auto',
                    maxHeight: '50vh',
                    position: 'fixed',
                    top: isNavbarVisible ? 95 : 45,
                    left: systemDetectMobile === false ? '50%' : '5px',
                    transform: systemDetectMobile === false ? 'translate(-50%, 0%)' : 'translate(0%, 0%)',
                    border: '1px solid grey',
                    transition: '700ms',
                    borderRadius: 5
                }}
                className='menu_navbar menu_navbar_nav980 menu_navbar_navPc open-element-page-melted scrollbar' data-theme={localTheme}>
                <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10, borderBottom: '1px solid grey', marginBottom: 10 }}>
                    <h4 style={{ margin: 0 }}>{t('admin')}</h4>
                    <div onClick={() => { setPromiseFileStatistical(false) }} className='button_option button_option_work' style={{ width: 10, paddingLeft: 10, paddingRight: 10, justifyContent: 'center', whiteSpace: 'nowrap', height: 25, borderRadius: 100, marginLeft: 5, marginBottom: -5 }} data-theme={localTheme}>
                        <FontAwesomeIcon style={{ color: '#ec1c24' }} icon={faClose} />
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <FontAwesomeIcon style={{ fontSize: 50, color: 'grey' }} icon={faUserSecret} />
                    {spinner()}
                </div>
            </div>
        </>
    )

    return (
        <>
            <div style={{
                    zIndex: 28000,
                    width: '98%',
                    maxWidth: systemDetectMobile === false ? 700 : '90%',
                    // overflow: 'auto',
                    maxHeight: '70vh',
                    position: 'fixed',
                    top: isNavbarVisible ? 95 : 45,
                    left: systemDetectMobile === false ? '50%' : '5px',
                    transform: systemDetectMobile === false ? 'translate(-50%, 0%)' : 'translate(0%, 0%)',
                    border: '1px solid grey',
                    //transition: '700ms',
                    borderRadius: 5
                }}
                className='menu_navbar menu_navbar_nav980 menu_navbar_navPc open-element-page-melted' data-theme={localTheme}>
                <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10, borderBottom: '1px solid grey', marginBottom: 10 }}>
                    <h4 style={{ margin: 0 }}>{t('admin')}</h4>
                    <div style={{display: 'flex'}}>
                    <div onClick={() => { setPromiseFileStatistical() }} className='button_option button_option_work' style={{ width: 10, paddingLeft: 10, paddingRight: 10, justifyContent: 'center', whiteSpace: 'nowrap', height: 25, borderRadius: 100, marginLeft: 5, marginBottom: -5 }} data-theme={localTheme}>
                        <FontAwesomeIcon style={{ color: '#ec1c24' }} icon={faClose} />
                    </div>
                    </div>
                </div>

                <div className="scrollbar" style={{ width: '100%', overflowY: 'scroll' }}>
                    <div className='rowDoubleposition' style={{ height: 'auto', flexDirection: 'column' }}>
                        <div className='rowDoublepositionContent' style={{ background: 'none', justifyContent: 'start', alignItems: 'start', width: '100%' }} data-theme={localTheme}>
                            <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10, marginBottom: 10 }}>
                                <h4 style={{ margin: 0 }}>Action :</h4>
                            </div>

                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                <div className='button_optionRed' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 'max-content', marginRight: 5, marginTop: 5 }} data-theme={localTheme}>
                                    reported at {SystemName}
                                </div>
                                <div className='button_optionBlue' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 'max-content', marginRight: 5, marginTop: 5 }} data-theme={localTheme}>
                                    notification
                                </div>
                                <div className='button_option_free' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 'max-content', marginRight: 5, marginTop: 5 }} data-theme={localTheme}>
                                    Reset name
                                </div>
                                <div className='button_option_free' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 'max-content', marginRight: 5, marginTop: 5 }} data-theme={localTheme}>
                                    Reset data
                                </div>
                                <div className='button_option_free' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 'max-content', marginRight: 5, marginTop: 5 }} data-theme={localTheme}>
                                    Reset data2
                                </div>
                                <div className='button_optionRed' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 'max-content', marginRight: 5, marginTop: 5 }} data-theme={localTheme}>
                                    Reset params
                                </div>
                                <div className='button_option_free' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 'max-content', marginRight: 5, marginTop: 5 }} data-theme={localTheme}>
                                    Change tags
                                </div>
                                <div className='button_option_free' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 'max-content', marginRight: 5, marginTop: 5 }} data-theme={localTheme}>
                                    {t('private')}
                                </div>
                                <div className='button_option_free' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 'max-content', marginRight: 5, marginTop: 5 }} data-theme={localTheme}>
                                    {NSFW}
                                </div>
                            </div>

                            <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10, borderBottom: '1px solid grey', marginBottom: 10, marginTop: 10 }}>
                                <h4 style={{ margin: 0 }}>File :</h4>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                <img onClick={() => { handleFullScreen({ img: promise?.miniature }) }} style={{ height: 'auto', maxHeight: 200, width: 150, objectFit: 'contain', cursor: 'pointer' }} src={promise?.miniature || SystemLogo} alt="Miniature" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />

                                <ul>
                                    <li>Name : {promise?.name}</li>
                                    <li>Type : {promise?.type}</li>
                                    <li>AI : {promise?.ai ? 'yes' : 'no'}</li>
                                    <li>{NSFW} : {promise?.adult ? 'yes' : 'no'}</li>
                                    <li>Visibility : {
                                        promise?.visibility === 0 && t('private')
                                        ||
                                        promise?.visibility === 1 && t('public')
                                        ||
                                        promise?.visibility === 2 && t('byLink')}</li>
                                    <li>Images count : {promise?.imagesCount}</li>
                                    <li>Views : {promise?.view}</li>
                                    <li>Favorite : {promise?.bookMarks}</li>
                                    <li>Allow user edit tag : {promise?.allowUserEditTag ? 'yes' : 'no'}</li>
                                    <li>Tags : {promise?.tags.length}</li>
                                    <li>Tags of other user : {handleTags(promise?.tags, promiseIdentifiedUser)}</li>
                                </ul>

                                <ol>
                                    <h4 style={{margin: 0}}>Tags</h4>
                                    {promise?.tags?.map((el, index) => (
                                        <li key={index}>{el.tag}</li>
                                    ))}
                                </ol>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                <Link to={`/file/page_file/page?file_type=${promise?.type}&file=${promise?.id}&index=0`} className='button_optionBlue' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 'max-content', marginRight: 5, marginTop: 5 }} data-theme={localTheme}>
                                    Go to page
                                </Link>
                                <Link to={`/profile/${promise?.adminId}/home?type=Illustrations`} className='button_optionPurple' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 'max-content', marginRight: 5, marginTop: 5 }} data-theme={localTheme}>
                                    Go to Profile user
                                </Link>
                            </div>

                            <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10, borderBottom: '1px solid grey', marginBottom: 10, marginTop: 10 }}>
                                <h4 style={{ margin: 0 }}>{t('accessPass')} :</h4>
                            </div>

                            <ul>
                                <li>{t('accessPass')} : {promise?.shop ? 'yes' : 'no'}</li>
                                <li>Total price : {promise?.price ? `${promise?.price} €` : 'no'}</li>
                                <li>Total price converter : {realCash ? realCash : 'no'}</li>
                                <li>Coins back for user : {cashBack ? cashBack : 'no'}</li>
                                <li>Total purchases : {promise?.purchase}</li>
                                <li>Total coins : {promise?.totalCoins}</li>
                            </ul>

                            <Link to={`/ArtVibes-accessPass/page-accessPass?file=${promise?.id}`} className='button_optionColoringBlue' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 'max-content', marginRight: 5 }} data-theme={localTheme}>
                                Go to {t('accessPass')}
                            </Link>

                            <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10, borderBottom: '1px solid grey', marginBottom: 10, marginTop: 10 }}>
                                <h4 style={{ margin: 0 }}>{t('subscription')} :</h4>
                            </div>

                            <ul>
                                <li>{t('subscription')} : {promise?.diamond ? 'yes' : 'no'}</li>
                            </ul>
                            <div className='button_optionColoring' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 'max-content', marginRight: 5 }} data-theme={localTheme}>
                                Go to {t('subscription')}
                            </div>

                            <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10, borderBottom: '1px solid grey', marginBottom: 10, marginTop: 10 }}>
                                <h4 style={{ margin: 0 }}>Date :</h4>
                            </div>

                            <ul>
                                <li>Last Updated by user : {dayjs(promise?.dateRework).add(0, 'hour').locale('fr').fromNow()}</li>
                                <li>Last Updated : {dayjs(promise?.updatedAt).add(0, 'hour').locale('fr').fromNow()}</li>
                                <li>Creation date : {dayjs(promise?.createdAt).add(0, 'hour').locale('fr').fromNow()}</li>
                            </ul>
                        </div>
                        <div className='rowDoublepositionContent' style={{ background: 'none', justifyContent: 'start', alignItems: 'start', margin: 3, width: '100%' }} data-theme={localTheme}>
                            <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10, borderBottom: '1px solid grey', marginBottom: 10, marginTop: 10 }}>
                                <h4 style={{ margin: 0 }}>Data :</h4>
                            </div>


                            <Text_manage data={promise?.data} />

                            <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10, borderBottom: '1px solid grey', marginBottom: 10, marginTop: 10 }}>
                                <h4 style={{ margin: 0 }}>Data2 :</h4>
                            </div>


                            <Text_manage data={promise?.dataDescription} />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default User_diagnosis