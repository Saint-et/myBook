import { useAppContext } from '../../contexts/UseAppContext';
import logo from '../../assets/images/shop.png';
import { faArrowLeft, faArrowRight, faArrowRightArrowLeft, faBookOpen, faCoins, faEllipsisVertical, faFilter, faHome, faMagnifyingGlass, faPiggyBank, faWandSparkles } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import Shop from './layouts/shop';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RemoveScroll } from 'react-remove-scroll';
import React, { useEffect, useRef, useState } from 'react';
import imgProfile from '../../assets/images/logo.png';
import { faHeart, faImages, faUser } from '@fortawesome/free-regular-svg-icons';
import Shop_users from '../UserProfil/shop_users/shop_users';
import Function_utils from '../../components/versatile_function/usefunction_utils';
import axios from 'axios';
import { API_URL } from '../../config';
import Card_files from "../../components/Cards/Card_articles";
import Pub from '../../components/Pub/Pub';
import Page_article from './layouts/page_article';
import Card_Square_user_list_presentation from '../../components/Cards/Card_Square_user_list_presentation';
import Invited from '../../components/Invited';


const ShopNavbar = () => {

    const { localTheme, isNavbarVisible, promiseIdentifiedUser, GetUsersPopularFromAPI, promiseUsers } = useAppContext();
    const { addSearchToUrl, handleConversionCoins, realCash, cashBack } = Function_utils()

    const { t } = useTranslation();

    const fullUrl = useLocation()
    const navigate = useNavigate()

    const fullLocation = fullUrl.pathname;

    const [hiddenMenu, setHiddenMenu] = useState(false)

    const [hiddenMenuSearch, setHiddenMenuSearch] = useState(false)
    const [indexImg, setIndexImg] = useState(0)

    const wrapperRef = useRef(null);

    const searchParams = new URLSearchParams(fullUrl.search);
    const idUrl = parseInt(searchParams.get("file"));
    const location = fullLocation.split("/")
    const iconNav = location[2];

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setHiddenMenu(false)
                    setHiddenMenuSearch(false)
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

    let cashBackSession = promiseIdentifiedUser?.user?.coinBack || 0;
    let cashBuy = promiseIdentifiedUser?.user?.coinBuy || 0;


    const [promise, setPromise] = useState()
    const [promiseFile, setPromiseFile] = useState()


    const GetHomeFileFromAPI = async () => {
        try {
            await axios.get(`${API_URL}api/eventv/access-pass/home/files`,
                { withCredentials: true })
                .then((res) => {
                    setPromise(res.data);

                })
        } catch (error) {
            // Call the delete function with the ID of the item to be deleted if there is a limited access to a page
            console.log(error.response.data.message);
        }
    }

    const GetFileFromAPI = async (id) => {
        try {
            await axios.get(`${API_URL}api/eventv/access-pass/file/${id}`,
                { withCredentials: true })
                .then((res) => {
                    setPromiseFile(res.data);
                    handleConversionCoins(res.data.price)

                })
        } catch (error) {
            // Call the delete function with the ID of the item to be deleted if there is a limited access to a page
            console.log(error.response.data.message);
        }
    }


    const renderCardFilesWithAds = () => {
        const cardFilesWithAds = [];

        for (let i = 0; i < promise?.length; i += 18) {
            const sliceEnd = Math.min(i + 18, promise.length); // Pour éviter de dépasser la taille de promise
            const cardFilesSlice = promise.slice(i, sliceEnd);

            cardFilesWithAds.push(
                <React.Fragment key={i}>
                    <Card_files profile={promiseIdentifiedUser} promise={cardFilesSlice} accessPass={true} />
                    {sliceEnd < promise.length && <Pub pubType={'banner'} />}
                </React.Fragment>
            );
        }
        return cardFilesWithAds;
    };

    useEffect(() => {
        GetHomeFileFromAPI()
        GetUsersPopularFromAPI()
        //GetBestAnnouncementFromAPI()

    }, [promiseIdentifiedUser])
    useEffect(() => {
        if (idUrl) {
            setIndexImg(0)
            GetFileFromAPI(idUrl)
        }

    }, [promiseIdentifiedUser, idUrl])

    return (
        <div className='main'>
            <div className={!isNavbarVisible ? 'button_works_container nav_fixed' : 'button_works_container nav_fixed active'} style={{ width: '100%', display: 'flex', borderRadius: 0, position: 'sticky', zIndex: 1000, flexDirection: 'column', overflow: 'hidden' }} data-theme={localTheme}>
                <div style={{ display: 'flex', marginBottom: 5, marginTop: 5, justifyContent: 'center' }}>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '98%' }}>
                        <div className='content_banner_navbar'>
                            <div className='button_option_container' style={{ width: '100%', maxWidth: 50, marginLeft: 10, display: 'flex', background: 'none' }} data-theme={localTheme}>
                                <div onClick={() => { navigate(-1) }} className='button_option' style={{ height: 40, width: 40, borderRadius: 100, marginRight: 5 }} data-theme={localTheme}><FontAwesomeIcon icon={faArrowLeft} /></div>
                            </div>
                            <img onClick={() => { navigate('/ArtVibes-accessPass/accessPass') }} src={logo} style={{ height: 30, cursor: 'pointer' }} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div className='button_option_container' style={{ width: '100%', maxWidth: 40, marginLeft: 5, display: 'flex', background: 'none', borderRadius: 100 }} data-theme={localTheme}>
                                <div onClick={() => { setHiddenMenuSearch(true) }} className='button_option' style={{ height: 40, width: 40 }} data-theme={localTheme}><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
                            </div>
                            <div className='button_option_container' style={{ width: '100%', maxWidth: 40, marginLeft: 5, display: 'flex', background: 'none', borderRadius: 100 }} data-theme={localTheme}>
                                <div onClick={() => { setHiddenMenu(true) }} className='button_option' style={{ height: 40, width: 40 }} data-theme={localTheme}><FontAwesomeIcon icon={faEllipsisVertical} /></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            {hiddenMenu && <div className='blanket_nav open-element-page-melted' style={{
                zIndex: 900
            }} >
                <RemoveScroll
                    ref={wrapperRef}
                    style={{
                        width: '90%',
                        maxWidth: 400,
                        overflow: 'auto',
                        maxHeight: 360,
                        position: 'fixed',
                        top: isNavbarVisible ? 100 : 50,
                        left: '98%',
                        transform: 'translate(-98%, 0%)'
                    }}
                    removeScrollBar={false} className='menu_navbar menu_navbar_nav980 menu_navbar_navPc scrollbar' data-theme={localTheme}>

                    {promiseIdentifiedUser ? <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '98%' }}>
                        <img style={{ width: 100, height: 100, borderRadius: '100%', marginTop: 20 }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='Profile_picture_nav' src={promiseIdentifiedUser?.user.imageUrl || imgProfile} alt="" />
                        <div className='title_color' style={{ textAlign: 'center', fontSize: 18, fontWeight: 800 }}>{promiseIdentifiedUser?.user.pseudo}</div>
                        <div className='title_color' style={{ textAlign: 'center', fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 20 }}>
                            <span>{cashBackSession}</span>
                            <FontAwesomeIcon style={{ color: '#e3b620', marginLeft: 10 }} icon={faPiggyBank} />
                            <FontAwesomeIcon style={{ marginLeft: 10, marginRight: 10 }} icon={faArrowRightArrowLeft} />
                            {cashBuy}<FontAwesomeIcon style={{ color: '#e3b620', marginLeft: 10 }} icon={faCoins} />
                            <FontAwesomeIcon style={{ marginLeft: 10, marginRight: 10 }} icon={faArrowRight} />
                            {cashBuy + cashBackSession}<FontAwesomeIcon style={{ color: '#e3b620', marginLeft: 10 }} icon={faCoins} />
                        </div>

                        <div className='button_option_free' style={{ width: '90%', justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 5, margin: 3 }} data-theme={localTheme}>
                            <div><FontAwesomeIcon style={{ marginRight: 10, color: '#e3b620' }} icon={faCoins} />Buy coins</div>
                        </div>
                        <div className='button_optionHeart' style={{ width: '90%', justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 5, margin: 3 }} data-theme={localTheme}>
                            <div><FontAwesomeIcon style={{ marginRight: 10 }} icon={faHeart} />Wishlist</div>
                        </div>
                        <div onClick={() => { addSearchToUrl(`#${promiseIdentifiedUser?.user.pseudo}-accessPass`) }} className='button_optionColoringBlue' style={{ width: '90%', justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 5, margin: 3 }} >
                            <div><FontAwesomeIcon style={{ marginRight: 10 }} icon={faWandSparkles} />{!promiseIdentifiedUser?.user.accessPass && 'Start '}{t('accessPass')}</div>
                        </div>
                    </div>
                        :
                        <Invited />}

                </RemoveScroll>
            </div>}
            {hiddenMenuSearch && <div className='blanket_nav open-element-page-melted' style={{
                zIndex: 900
            }} >
                <RemoveScroll
                    ref={wrapperRef}
                    style={{
                        width: '90%',
                        maxWidth: 400,
                        overflow: 'auto',
                        maxHeight: 240,
                        position: 'fixed',
                        top: isNavbarVisible ? 100 : 50,
                        left: '98%',
                        transform: 'translate(-98%, 0%)'
                    }}
                    removeScrollBar={false} className='menu_navbar menu_navbar_nav980 menu_navbar_navPc scrollbar' data-theme={localTheme}>
                    <div>
                        <h4 style={{ margin: 0 }}>Filter:</h4>
                        <div style={{ marginBottom: 20, width: 'max-content' }} className="checkbox-wrapper-46Radio">
                            <input defaultChecked={true} className="inp-cbxRadio" type="radio" name="rdo2" id="opt61" />
                            <label className="cbxRadio" htmlFor="opt61">
                                <span></span><span style={{ marginLeft: 5 }}><FontAwesomeIcon style={{ marginRight: 10 }} icon={faWandSparkles} />{t('accessPass')}</span>
                            </label>
                        </div>

                        <div style={{ marginBottom: 20, width: 'max-content' }} className="checkbox-wrapper-46Radio">
                            <input className="inp-cbxRadio" type="radio" name="rdo2" id="opt62" />
                            <label className="cbxRadio" htmlFor="opt62">
                                <span></span><span style={{ marginLeft: 5 }}><FontAwesomeIcon style={{ marginRight: 10 }} icon={faImages} />Illustrations</span>
                            </label>
                        </div>

                        <div style={{ marginBottom: 20, width: 'max-content' }} className="checkbox-wrapper-46Radio">
                            <input className="inp-cbxRadio" type="radio" name="rdo2" id="opt63" />
                            <label className="cbxRadio" htmlFor="opt63">
                                <span></span><span style={{ marginLeft: 5 }}><FontAwesomeIcon style={{ marginRight: 10 }} icon={faBookOpen} />Manga</span>
                            </label>
                        </div>
                    </div>
                    <div className='cter_sect' style={{ padding: 0, margin: 0 }}>
                        <input style={{ marginBottom: 20 }} className='input_text' placeholder={t('search')} type="text" name="" id="" data-theme={localTheme} />

                        <div className='button_option_free' style={{ width: '90%', justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 5, margin: 3 }} data-theme={localTheme}>
                            <div><FontAwesomeIcon style={{ marginRight: 10 }} icon={faMagnifyingGlass} />{t('search')}</div>
                        </div>
                    </div>
                </RemoveScroll>
            </div>}


            {fullLocation === `/ArtVibes-accessPass/page-accessPass` && <Page_article GetFileFromAPI={GetFileFromAPI} promise={promise} realCash={realCash} cashBack={cashBack} cashBuy={cashBuy} cashBackSession={cashBackSession} promiseFile={promiseFile} renderCardFilesWithAds={renderCardFilesWithAds} indexImg={indexImg} setIndexImg={setIndexImg} />}
            {fullLocation === '/ArtVibes-accessPass/accessPass' && <Shop iconNav={iconNav} promise={promise} renderCardFilesWithAds={renderCardFilesWithAds} />}
            {promiseIdentifiedUser && <>{fullUrl.hash === `#${promiseIdentifiedUser?.user.pseudo}-accessPass` && <Shop_users sessionUser={promiseIdentifiedUser} />}</>}
            {/*fullLocation === `/${SystemName}-accessPass/illustration_accessPass` && <Illustration_accessPass />*/}
            {/*fullLocation === `/${SystemName}-accessPass/manga_accessPass` && <Manga_accessPass />`/${SystemName}-accessPass/accessPass`*/}
        </div>
    )
}

export default ShopNavbar