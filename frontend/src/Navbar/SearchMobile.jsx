import { useAppContext } from "../contexts/UseAppContext";
import logo from '../assets/images/logo_transparent_banner.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RemoveScroll } from "react-remove-scroll";
import UseNavbar from "./useNavbar";
import { useTranslation } from 'react-i18next';
import Card_announcement from '../components/Cards/Card_announcement';
import Card_Square_user_list_presentation from '../components/Cards/Card_Square_user_list_presentation';


const SearchMobile = () => {

    const location = useLocation()

    const locationUrl = location.pathname.split("/")[1]

    const { t } = useTranslation();

    const {
        // SEARCH
        editSearch, setEditSearch,
        SearchUserNameAPI,
        handleChangeSearch,
        SearchUserName,
        promiseSearchTags, SearchTags,
        handleClick, localHistoricalJSON
    } = UseNavbar()

    const { localTheme,
        promiseUsers,
        promiseAnnouncement, } = useAppContext()

    const navigate = useNavigate();

    return (
        <>
            <RemoveScroll className="blanket_opacte open-element-page-melted scrollbar" style={{ zIndex: 25000, paddingTop: 0, display: 'flex', justifyContent: 'start', flexDirection: 'column', overflow: 'auto', paddingTop: 50 }} data-theme={localTheme}>
                <div className='nav_bar_scnd' style={{ margin: 0, padding: 0, height: 50, borderRadius: 0, alignItems: 'start', position: 'fixed', top: 0, zIndex: 10000, }} data-theme={localTheme}>
                    <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', marginTop: 5 }}>
                        <div onClick={() => navigate(-1)} className='button_option_container' style={{ maxWidth: 50, marginLeft: 10, display: 'flex', background: 'none' }} data-theme={localTheme}>
                            <div className='button_option' style={{ height: 40, width: 40, borderRadius: 100, marginRight: 5 }} data-theme={localTheme}><FontAwesomeIcon icon={faArrowLeft} /></div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', maxWidth: 200, justifyContent: 'center' }}>
                            <img className='logo_event' style={{ height: 30 }} src={logo} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                        </div>
                    </div>
                </div>
                <div className='cter_sect' style={{ marginTop: 20 }}>
                    <div className='container_input_text_nav' style={{ width: '98%' }}>
                        <div style={{ display: 'flex', width: '100%' }}>
                            <input style={{borderRadius: 50}} value={editSearch} onKeyDown={handleChangeSearch} onChange={handleChangeSearch} className='input_text' placeholder={t('search')} type="text" name="" id="" data-theme={localTheme} />
                            {editSearch !== '' && <div className='button_option_container' style={{ width: '100%', maxWidth: 40, marginLeft: 5, display: 'flex', background: 'none', borderRadius: 100 }} data-theme={localTheme}>
                                <div className='button_option' onClick={() => { setEditSearch('') }} style={{ height: 40, width: 40 }} data-theme={localTheme}><FontAwesomeIcon icon={faXmark} /></div>
                            </div>}
                            <div className='button_option_container' style={{ width: '100%', maxWidth: 40, marginLeft: 5, display: 'flex', background: 'none', borderRadius: 100 }} data-theme={localTheme}>
                                <div className='button_option' onClick={SearchUserName} style={{ height: 40, width: 40 }} data-theme={localTheme}><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='cter_sect' style={{ marginTop: 20 }}>
                    <div style={{ width: '92%', maxWidth: 1000, display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                        <div className='title_color'>- Historical</div>
                        <div className='button_optionRed' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 100 }} onClick={() => {
                            localStorage.removeItem("Historical")
                            navigate(-1)
                        }} data-theme={localTheme}>
                            {t('delete')}
                        </div>
                    </div>

                    {editSearch === '' ? <div className='button_option_container' style={{ width: '98%', maxWidth: 1000, height: '100%', minHeight: 100 }} data-theme={localTheme}>
                        {localHistoricalJSON ? <div className='scrollbar' style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                            {localHistoricalJSON?.map((promise) => (
                                <Link to={`/${locationUrl == 'search-articles' ? 'search-articles' : null || locationUrl == 'search-users' ? 'search-users' : null || 'search-articles'}/${promise}`} style={{ paddingTop: 5, paddingBottom: 5 }} className='button_option' translate='no' onClick={() => {
                                    handleClick(promise)
                                    SearchTags(promise)
                                }} data-theme={localTheme} key={promise}>{promise.charAt(0).toUpperCase() + promise.slice(1)}</Link>
                            ))}
                        </div> : <div className='title_color' style={{ textAlign: 'center', height: 50 }}>No historical</div>}
                    </div>
                        :
                        <div className='button_option_container' style={{ width: '98%', maxWidth: 1000 }} data-theme={localTheme}>
                            {promiseSearchTags.length !== 0 ? <div className='scrollbar' style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', overflowY: 'overlay' }}>
                                {promiseSearchTags?.map((promise) => (
                                    <Link to={`/${locationUrl == 'search-articles' ? 'search-articles' : null || locationUrl == 'search-users' ? 'search-users' : null || 'search-articles'}/${promise.tag}`} style={{ paddingTop: 5, paddingBottom: 5 }} className='button_option animation' translate='no' onClick={() => {
                                        handleClick(promise.tag)
                                        SearchUserNameAPI(promise.tag)
                                    }} data-theme={localTheme} key={promise.tag}>{promise.tag.charAt(0).toUpperCase() + promise.tag.slice(1)}</Link>
                                ))}
                            </div> :
                                <div className='title_color' style={{ textAlign: 'center', height: 50 }}>No results</div>}
                        </div>}
                </div>


                <div className='title_color' style={{ margin: 5 }}>- Some announcements</div>
                <div style={{ height: '100%' }}>
                    <Card_announcement promise={promiseAnnouncement} button={true} />
                </div>
                <div className='title_color' style={{ margin: 5 }}>- Most populars users</div>
                <div style={{ height: '100%', marginBottom: 100 }}>
                    <Card_Square_user_list_presentation promise={promiseUsers.promise} />
                </div>
            </RemoveScroll>
        </>
    )
}

export default SearchMobile