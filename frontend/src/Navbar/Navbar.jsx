import '../sass/components/Navbar.scss';
import imgProfile from '../assets/images/logo.png';
import imgRemplace from '../assets/images/vaisseau-spatial-futuriste-orbite-autour-mysterieuse-planete-dans-galaxie-profonde-generee-par-intelligence-artificielle.jpg';
import logo from '../assets/images/logo_transparent_banner.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faMagnifyingGlass, faXmark, faCommentDots, faPaperPlane, faMoon, faSun, faBars, faLanguage, faCubes, faGift, faCoins, faImage, faPanorama, faDownload, faBriefcase, faGears, faPowerOff, faBasketShopping, faTicket, faUsers, faArrowLeft, faCube, faCrown, faWandSparkles, faMedal, faGamepad, faCubesStacked, faVectorSquare, faShapes, faPuzzlePiece, faStore, faUserSecret, faPencil } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useRef, useEffect } from "react";
import { API_URL, SOCKET_URL } from '../config';
import axios from "axios";
import { RemoveScroll } from 'react-remove-scroll';
import parse from 'html-react-parser';
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { stateToHTML } from 'draft-js-export-html';
import { useAppContext } from '../contexts/UseAppContext';
import Card_announcement from '../components/Cards/Card_announcement';
import { useTranslation } from 'react-i18next';
import Card_Square_user_list_presentation from '../components/Cards/Card_Square_user_list_presentation';
import { SystemName, SystemPicture } from '../assets/data/data';
import UseNavbar from './useNavbar';
import SearchMobile from './SearchMobile';
import Function_utils from '../components/versatile_function/usefunction_utils';
import { faClock, faGem } from '@fortawesome/free-regular-svg-icons';



const Navbar = (props) => {

  const { t } = useTranslation();

  const { addSearchToUrl } = Function_utils()

  const { localTheme,
    isNavbarVisible, setNavbarVisible,
    handleModeEco, setActiveAnimation,
    animationSelect,
    setLanguageSelect,
    hiddenMenuSidebareRight,
    setHiddenMenuSidebareRight,
    setHiddenMenuSidebare,
    hiddenMenuSidebare,
    handleTheme,
    promiseIdentifiedUser,
    notif,
    notifMessage,
    promiseUsers,
    promiseAnnouncement,
    hiddenConnection,
    setHiddenConnection,
    systemDetectMobile,
    addErrorMessage } = useAppContext()

  const {
    handleLogout,
    handleDelete,
    handleDeleteAllNotif,
    hiddenAnswer, setHiddenAnswer,
    errorAnswer,
    editorState, setEditorState,
    handleDeleteAllMessage,
    editor,
    submitMessage,
    handleDeleteNotifMessage,
    hiddenMenu, setHiddenMenu,
    hiddenMenuAdd, setHiddenMenuAdd,
    notifcation, setNotification,
    hiddenMessage, setHiddenMessage,

    // SEARCH
    editSearch, setEditSearch,
    historical, setHistorical,
    handleChangeSearch, handleClick,
    SearchUserNameAPI, SearchUserName,
    promiseSearchTags,
    SearchTags
  } = UseNavbar()

  let localHistoricalJSON = JSON.parse(localStorage.getItem('Historical'))
  let Log = props.IsLog();

  const location = useLocation()

  const navigate = useNavigate()

  const locationUrl = location.pathname.split("/")[1]

  //const localTheme = localStorage.getItem('theme');

  //const navigate = useNavigate()

  //const handleDelete = async (id) => {
  //  await axios.delete(`${API_URL}api/eventv/delete/notif/${id}`,
  //    { withCredentials: true })
  //    .then(() => {
  //      return GetNotifFromAPI()
  //    })
  //}
  //const handleDeleteAllNotif = async () => {
  //  await axios.delete(`${API_URL}api/eventv/delete/notifs`,
  //    { withCredentials: true })
  //    .then(() => {
  //      return GetNotifFromAPI()
  //    })
  //}

  //const handleDeleteAllMessage = async () => {
  //  await axios.delete(`${API_URL}api/eventv/delete/messages`,
  //    { withCredentials: true })
  //    .then(() => {
  //      return GetNotifMessageFromAPI()
  //    })
  //}

  //const [edite, setEdite] = useState({
  //  email: "",
  //  password: ""
  //});


  //const [error, setError] = useState("");


  //const handleChange = (name) => event => {
  //  setEdite({ ...edite, [name]: event.target.value })
  //};

  //const [hiddenMenu, setHiddenMenu] = useState(false)
  //const [notifcation, setNotification] = useState(false)
  //const [hiddenMessage, setHiddenMessage] = useState(false)

  //const handlehidden = () => {
  //  setHiddenMenu(!hiddenMenu)
  //};


  //const handlenotifcation = () => {
  //  setNotification(!notifcation)
  //};

  //const handleMessage = () => {
  //  setHiddenMessage(!hiddenMessage)
  //};

  //const submit = async () => {
  //  setError('')
  //  try {
  //    await axios.post(`${API_URL}api/auth/login`, {
  //      email: edite.email,
  //      password: edite.password
  //    }, { withCredentials: true })
  //      .then((res) => {
  //        if (res.data.message == 'log') {
  //          GetUsersPopularFromAPI()
  //          return GetMyProfilFromAPI()
  //        }
  //      })
  //  } catch (error) {
  //    setError(error.response.data.message)
  //  }
  //}

  //const handleLogout = async () => {
  //  setNotification(false)
  //  setHiddenMenu(false)
  //  setHiddenMessage(false)
  //  await axios.get(`${API_URL}api/auth/logout`,
  //    { withCredentials: true })
  //    .then(() => {
  //      setPromiseIdentifiedUser(false)
  //      handleClearIndexedDB()
  //      localStorage.removeItem("last-URL-home");
  //      //navigate('/login')
  //      setThemeBackground(SystemPicture)
  //      return;
  //    })
  //}

  //useKeypress('Enter', () => {
  //  if (promiseIdentifiedUser === false) {
  //    return submit()
  //  }
  //})

  //const [hiddenConnection, setHiddenConnection] = useState(false)


  //const [hiddenAnswer, setHiddenAnswer] = useState(false)
  //const [errorAnswer, setErrorAnswer] = useState(false)
  //const submitMessage = async (uuid, id, userId) => {
  //  if (editorState.getCurrentContent().getPlainText() !== "") {
  //    try {
  //      await axios.post(`${API_URL}api/eventv/post/message`, {
  //        id: null,
  //        text: stateToHTML(editorState.getCurrentContent()),
  //        uuId: uuid,
  //        userId: id
  //      }, { withCredentials: true })
  //        .then(() => {
  //          setEdite({ text: "" });
  //          setEditorState(() => EditorState.createEmpty())
  //          handleDeleteNotifMessage(uuid)
  //          socket.emit('message-created', { uuId: uuid });
  //          socket.emit('notify-message', { uuId: uuid, text: stateToHTML(editorState.getCurrentContent()), userId: userId, sessionUserId: promiseIdentifiedUser.user.id, status: true });
  //        })
  //    } catch (error) {
  //      setErrorAnswer(error.response.data.message)
  //    }
  //  }
  //}
  //const handleDeleteNotifMessage = async (uuId) => {
  //  try {
  //    await axios.delete(`${API_URL}api/eventv/delete/notifMessage/${uuId}`,
  //      { withCredentials: true })
  //      .then(() => {
  //        GetNotifMessageFromAPI();
  //      })
  //  } catch (error) {
  //  }
  //}

  //const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  //const editor = useRef(null);



  const wrapperRef = useRef(null);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setHiddenAnswer(false)
          setNotification(false)
          setHiddenMenu(false)
          setHiddenMessage(false)
          setHistorical(false)
          setHiddenMenuAdd(false)
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

  //const [editSearch, setEditSearch] = useState('');
  //const [historical, setHistorical] = useState(false);
  //const [errFront, setErrFront] = useState({
  //  err: ''
  //})


  // lecture des changement effectué
  //const handleChangeSearch = (event) => {
  //  setEditSearch(event.target.value);
  //  SearchTags(event.target.value)
  //  if (event.key === 'Enter') {
  //    setHistorical(false)
  //    SearchUserName()
  //  }
  //};

  //const handleClick = (promise) => {
  //  SearchUserName()
  //  setHistorical(false)
  //  setEditSearch(promise)
  //}


  //const SearchUserName = async () => {
  //  if (!editSearch.trim().split(/ +/).join(" ")) {
  //    return null
  //  }
  //  if (localHistoricalJSON == null) {
  //    localStorage.setItem('Historical', JSON.stringify([editSearch.trim().split(/ +/).join(" ")]))
  //    navigate(`/${locationUrl == 'search-articles' ? 'search-articles' : null || locationUrl == 'search-users' ? 'search-users' : null || 'search-articles'}/${editSearch}`, { replace: true })
  //    NewSearchTags()
  //  } else {
  //    const filteredEditSearch = localHistoricalJSON.filter((id) => id == editSearch)
  //    if (filteredEditSearch[0] !== editSearch) {
  //      localStorage.setItem('Historical', JSON.stringify([editSearch.trim().split(/ +/).join(" "), ...localHistoricalJSON]))
  //    }
  //    navigate(`/${locationUrl == 'search-articles' ? 'search-articles' : null || locationUrl == 'search-users' ? 'search-users' : null || 'search-articles'}/${editSearch}`, { replace: true })
  //    NewSearchTags()
  //  }
  //}

  //const SearchUserNameAPI = async (tag) => {
  //  if (!tag) {
  //    return null
  //  }
  //  if (localHistoricalJSON == null) {
  //    localStorage.setItem('Historical', JSON.stringify([tag]))
  //    navigate(`/${locationUrl == 'search-articles' ? 'search-articles' : null || locationUrl == 'search-users' ? 'search-users' : null || 'search-articles'}/${tag}`, { replace: true })
  //  } else {
  //    const filteredEditSearch = localHistoricalJSON.filter((id) => id == tag)
  //    if (filteredEditSearch[0] !== tag) {
  //      localStorage.setItem('Historical', JSON.stringify([tag, ...localHistoricalJSON]))
  //    }
  //    navigate(`/${locationUrl == 'search-articles' ? 'search-articles' : null || locationUrl == 'search-users' ? 'search-users' : null || 'search-articles'}/${tag}`, { replace: true })
  //  }
  //}

  //const NewSearchTags = async () => {
  //  if (editSearch.trim().split(/ +/).join(" ").length > 3) {
  //    await axios.post(`${API_URL}api/eventv/search/new-tags`, {
  //      tag: editSearch.trim().split(/ +/).join(" ")
  //    },
  //      { withCredentials: true })
  //      .then(() => { })
  //  }
  //}


  //const [promiseSearchTags, setPromiseSearchTags] = useState([])

  //const SearchTags = async (e) => {
  //  if (e) {
  //    await axios.get(`${API_URL}api/eventv/search/tags/${e}`,
  //      { withCredentials: true })
  //      .then((res) => {
  //        setPromiseSearchTags(res.data.promise)
  //      })
  //  }
  //}


  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const scrollThreshold = 50; // Niveau de défilement à partir duquel masquer la barre de navigation

  useEffect(() => {
    //if (hiddenNav) {
    //  return;
    //}
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const scrollingDown = prevScrollPos < currentScrollPos;

      if (scrollingDown && currentScrollPos > scrollThreshold) {
        setNavbarVisible(false); // Masquer la barre de navigation après le seuil de défilement
      } else {
        setNavbarVisible(true); // Afficher la barre de navigation lorsque vous faites défiler vers le haut ou en dessous du seuil
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  const inputRef = useRef(null);

  useEffect(() => {
    // Mettre le focus sur le champ de texte lors du chargement du composant
    if (historical == true) {
      inputRef.current.focus();
    }
  }, [historical]);

  const [hiddenNav, setHiddenNav] = useState(false)

  if (location.pathname === `/${SystemName}-creative/${location.pathname.split("/")[2]}`) return null

  if (promiseIdentifiedUser === false) return (
    <>
      <div className={isNavbarVisible ? 'container_banner_navbar' : 'container_banner_navbar active'} data-theme={localTheme}>
        <div className='banner_navbar'>
          <div className='content_banner_navbar'>
            <Link to={'/'} style={{ display: 'flex', width: '100%', alignItems: 'center', maxWidth: 200, justifyContent: 'center' }}>
              <img className='logo_event' src={logo} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
            </Link >
          </div>

          <div style={{ display: 'flex' }}>
            {Log && <>
              <Link to={'/signup'} className='button_optionBlue' style={{ borderRadius: 5, fontSize: 14, height: 40, paddingLeft: 5, paddingRight: 5, width: 100, marginRight: 5 }} data-theme={localTheme}>
                Sign'up
              </Link>
              <div onClick={() => { setHiddenConnection(!hiddenConnection) }} className='button_option' style={{ borderRadius: 5, fontSize: 14, height: 40, paddingLeft: 5, paddingRight: 5, width: 100 }} data-theme={localTheme}>
                Connection
              </div>
            </>}
            {!Log && <Link to={'/'} className='button_optionPic_v' style={{ borderRadius: 5, fontSize: 14, height: 40, paddingLeft: 5, paddingRight: 5, width: 200 }} data-theme={localTheme}>
              Visit {SystemName} ?
            </Link>}
          </div>
        </div>
      </div>
    </>
  )

  if (!promiseIdentifiedUser || !notif) return null

  // className={isNavbarVisible ? 'container_banner_navbar' : 'container_banner_navbar active'}

  return (
    <>
      {location.hash === '#search' && <SearchMobile />}

      <div className={isNavbarVisible ? 'container_banner_navbar' : 'container_banner_navbar active'} data-theme={localTheme}>
        <div className='banner_navbar' style={{ justifyContent: hiddenNav ? 'center' : '' }}>
          {!hiddenNav && <div className='content_banner_navbar'>
            <div className='button_option_container' style={{ width: '100%', maxWidth: 50, marginLeft: 10, display: 'flex', background: 'none' }} data-theme={localTheme}>
              <div className='button_option' onClick={() => {
                setHiddenMenuSidebare(!hiddenMenuSidebare)
                setActiveAnimation(true)
              }} style={{ height: 40, width: 40, borderRadius: 100, marginRight: 5 }} data-theme={localTheme}><FontAwesomeIcon icon={faBars} /></div>
            </div>
            {/*<div onClick={() => {
              setHiddenMenuSidebare(!hiddenMenuSidebare)
              setActiveAnimation(true)
            }} style={{ width: 45, height: 30, display: 'flex', fontSize: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 200, cursor: 'pointer' }} data-theme={localTheme}>
              <FontAwesomeIcon icon={faBars} />
          </div>*/}
            <Link to={'/'} style={{ display: 'flex', width: '100%', alignItems: 'center', maxWidth: 200, justifyContent: 'center' }}>
              <img className='logo_event' src={logo} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
            </Link >
          </div>}

          {/*<div style={{ display: 'flex', width: '100%', maxWidth: 600, justifyContent: 'center', alignItems: 'center' }}>
            {!historical && <div className='input_text input_text_navMobile input_text_navPc' style={{ color: 'grey' }} onClick={() => { setHistorical(true) }} data-theme={localTheme} >
              <span translate='no'>{editSearch}</span>
              <span>{editSearch == '' && t('search')}</span>
            </div>}
          </div>*/}

          {!systemDetectMobile && <div className={hiddenNav ? 'container_input_text_nav' : 'container_input_text_nav hidden980'}>
            <div className={!hiddenNav ? 'hiddenMax' : ''} style={{ width: 40, marginRight: 10 }}>
              <div className='button_option_container' style={{ borderRadius: 100 }} data-theme={localTheme}>
                <div onClick={() => { setHiddenNav(false) }} className='button_option' style={{ height: 40, width: 40 }} data-theme={localTheme}><FontAwesomeIcon icon={faArrowLeft} /></div>
              </div>
            </div>
            <div style={{ display: 'flex', width: '100%' }}>
              <input style={{ borderRadius: 50 }} ref={inputRef} value={editSearch} onClick={() => { setHistorical(true) }} onKeyDown={handleChangeSearch} onChange={handleChangeSearch} className='input_text' placeholder={t('search')} type="text" name="" id="" data-theme={localTheme} />
              {editSearch !== '' && <div className='button_option_container' style={{ width: '100%', maxWidth: 40, marginLeft: 5, display: 'flex', background: 'none', borderRadius: 100 }} data-theme={localTheme}>
                <div className='button_option' onClick={() => { setEditSearch('') }} style={{ height: 40, width: 40 }} data-theme={localTheme}><FontAwesomeIcon icon={faXmark} /></div>
              </div>}
              <div className='button_option_container' style={{ width: '100%', maxWidth: 40, marginLeft: 5, display: 'flex', background: 'none', borderRadius: 100 }} data-theme={localTheme}>
                <div className='button_option' onClick={SearchUserName} style={{ height: 40, width: 40 }} data-theme={localTheme}><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
              </div>
            </div>
          </div>}

          {!hiddenNav && <div style={{ display: 'flex', width: '100%', maxWidth: 230, justifyContent: !systemDetectMobile ? 'space-between' : 'end' }} data-theme={localTheme}>
            {!systemDetectMobile && <>
              <div className='hiddenMax' style={{ height: 40 }}>
                <div className='button_option_container' style={{ width: '100%', maxWidth: 40, marginLeft: 5, display: 'flex', background: 'none', borderRadius: 100 }} data-theme={localTheme}>
                  <div className='button_option' onClick={() => { setHiddenNav(true) }} style={{ height: 40, width: 40 }} data-theme={localTheme}><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
                </div>
              </div>

              <div className='button_option_container' style={{ width: '100%', maxWidth: 40, marginLeft: 5, display: 'flex', background: 'none', borderRadius: 100 }} data-theme={localTheme}>
                <div onClick={() => {
                  if (systemDetectMobile) {
                    setHiddenMenuSidebareRight(!hiddenMenuSidebareRight)
                    setActiveAnimation(true)
                  } else {
                    setHiddenMessage(!hiddenMessage)
                  }
                }} className='button_option' style={{ height: 40, width: 40 }} data-theme={localTheme}><FontAwesomeIcon icon={faCommentDots} />
                  {notifMessage.length !== 0 && <div className='center_element'
                    style={{
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      marginLeft: 25,
                      borderRadius: 100,
                      height: 10, width: 10,
                      marginBottom: 25,
                      fontSize: 14,
                      background: '#ec1c24'
                    }}></div>}
                </div>
              </div>

              <div className='button_option_container' style={{ width: '100%', maxWidth: 40, marginLeft: 5, display: 'flex', background: 'none', borderRadius: 100 }} data-theme={localTheme}>
                <div onClick={() => {
                  if (systemDetectMobile) {
                    setHiddenMenuSidebareRight(!hiddenMenuSidebareRight)
                    setActiveAnimation(true)
                  } else {
                    setNotification(!notifcation)
                  }
                }} className='button_option' style={{ height: 40, width: 40 }} data-theme={localTheme}><FontAwesomeIcon icon={faBell} />
                  {notif.length !== 0 && <div className='center_element'
                    style={{
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      marginLeft: 25,
                      borderRadius: 100,
                      height: 10, width: 10,
                      marginBottom: 25,
                      fontSize: 14,
                      background: '#ec1c24'
                    }}></div>}
                </div>
              </div>

              <div className='button_option_container' style={{ width: '100%', maxWidth: 40, marginLeft: 5, display: 'flex', background: 'none', borderRadius: 100 }} data-theme={localTheme}>
                <div onClick={() => {
                  setHiddenMenuAdd(!hiddenMenuAdd)
                }} className='button_optionDimigo' style={{ height: 40, width: 40, fontSize: 20 }} data-theme={localTheme}><FontAwesomeIcon icon={faVectorSquare} /></div>
              </div>
            </>}
            {systemDetectMobile &&
              <div className='button_option_container' style={{ width: '100%', maxWidth: 40, marginLeft: 5, display: 'flex', background: 'none', borderRadius: 100 }} data-theme={localTheme}>
                <div onClick={() => { addSearchToUrl('#search') }} className='button_option' style={{ height: 40, width: 40 }} data-theme={localTheme}><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
              </div>}
            <div className='button_option_container' style={{ width: '100%', maxWidth: 40, marginLeft: 5, display: 'flex', background: 'none', borderRadius: 100 }} data-theme={localTheme}>
              <div className='hovercursor' style={{ height: 40, width: 40 }} onClick={() => {
                if (systemDetectMobile) {
                  setHiddenMenuSidebareRight(!hiddenMenuSidebareRight);
                  setActiveAnimation(true); // Consider if this line is necessary
                } else {
                  setHiddenMenu(!hiddenMenu); // Call handlehidden function for non-mobile systems
                }
              }}>
                {systemDetectMobile && <>{notif.length !== 0 && <div className='center_element'
                  style={{
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: 0,
                    borderRadius: 100,
                    height: 10, width: 10,
                    //marginBottom: 100,
                    fontSize: 15,
                    //background: '#ec1c24',
                    color: '#ffbb00'
                  }}><FontAwesomeIcon icon={faBell} /></div>}
                  {notifMessage.length !== 0 && <div className='center_element'
                    style={{
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      marginLeft: 25,
                      borderRadius: 100,
                      height: 10, width: 10,
                      //marginBottom: -25,
                      fontSize: 15,
                      //background: '#ec1c24'
                      color: '#1a7de0'
                    }}><FontAwesomeIcon icon={faCommentDots} /></div>}
                </>}
                <img onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='Profile_picture_nav' src={promiseIdentifiedUser.user.imageUrl || imgProfile} alt="" />
              </div>
            </div>
          </div>}
        </div>
      </div>

      {hiddenMenu &&
        <div className='blanket_nav open-element-page-melted' style={{
          zIndex: 10000
        }} >
          <RemoveScroll
            style={{
              width: '90%',
              maxWidth: 400,
              overflow: 'auto',
              maxHeight: 470,
              position: 'fixed',
              top: 50,
              left: '98%',
              transform: 'translate(-98%, 0%)'
            }}
            removeScrollBar={false} ref={wrapperRef} className='menu_navbar menu_navbar_nav980 menu_navbar_navPc scrollbar' data-theme={localTheme}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Link onClick={() => {
                setHiddenMenu(false)
              }} to={`/profile/${promiseIdentifiedUser.user.id}/home?type=Illustrations`} style={{ backgroundImage: `url(${promiseIdentifiedUser.user.imageUrlCover || imgRemplace})`, backgroundPosition: `50% ${promiseIdentifiedUser.user.resizeImageUrlCover}%`, borderRadius: 15 }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='CoverImage FlexEmbed FlexEmbed--2by1'>
              </Link>
              <Link className='text' onClick={() => {
                setHiddenMenu(false)
              }} style={{ zIndex: 10, textDecoration: 'none' }} to={`/profile/${promiseIdentifiedUser.user.id}/home?type=Illustrations`} data-theme={localTheme}>
                <img style={{ cursor: 'pointer', width: 100, height: 100, borderRadius: '100%', marginTop: -100 }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='Profile_picture_nav hovercursor' src={promiseIdentifiedUser.user.imageUrl || imgProfile} alt="" />
                <div className='title_color' style={{ textAlign: 'center', fontSize: 18, fontWeight: 800 }} translate='no'>{promiseIdentifiedUser.user.pseudo}</div>
              </Link>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                <div onClick={handleTheme} className='buttonCircle' style={{ width: 23, height: 23, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, marginRight: 10, border: 'none' }} data-theme={localTheme}>
                  {localTheme === null && <FontAwesomeIcon icon={faMoon} />}
                  {localTheme === 'default' && <FontAwesomeIcon icon={faMoon} />}
                  {localTheme === 'dark' && <FontAwesomeIcon icon={faSun} />}
                </div>
                {!systemDetectMobile && <div className='buttonCircle' onClick={handleModeEco} style={{ color: animationSelect === 'eco' ? '#00aa00' : '#ec1c24', width: 23, height: 23, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, marginRight: 10, border: 'none' }} data-theme={localTheme}>
                  <FontAwesomeIcon icon={faCubes} />
                </div>}
                <div onClick={() => {
                  setHiddenMenu(false)
                  setLanguageSelect(null)
                }} className='buttonCircle' style={{ width: 23, height: 23, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, marginRight: 10, border: 'none' }} data-theme={localTheme}>
                  <FontAwesomeIcon icon={faLanguage} />
                </div>
              </div>
              <div className='button_option_container' style={{ width: '90%', marginTop: 10 }} data-theme={localTheme}>
                <Link className='button_option' onClick={() => {
                  setHiddenMenu(false)
                }} to={'/works/file'} data-theme={localTheme} >
                  <FontAwesomeIcon style={{ marginRight: 5 }} icon={faBriefcase} />
                  {t('workspace')}
                </Link>
              </div>

              <div className='button_option_container' style={{ width: '90%', marginTop: 10 }} data-theme={localTheme}>
                <div className='button_option' onClick={() => {
                  setNotification(false)
                  setHiddenMenu(!hiddenMenu)
                  addSearchToUrl(`#Recently_viewed`)
                }} data-theme={localTheme}>
                  <FontAwesomeIcon style={{ marginRight: 5 }} icon={faClock} />{t('last_view')}</div>
              </div>

              <div className='button_option_container' style={{ width: '90%', marginTop: 10 }} data-theme={localTheme}>
                <Link to={`/parameters/profile`} className='button_option' onClick={() => {
                  setNotification(false)
                  setHiddenMenu(!hiddenMenu)
                }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 5 }} icon={faGears} />{t('parameter')}</Link>
              </div>

              <div className='button_option_container' style={{ width: '90%', marginTop: 20 }} data-theme={localTheme}>
                <div className='button_optionRed' onClick={handleLogout} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 5 }} icon={faPowerOff} />{t('logout')}</div>
              </div>
            </div>
          </RemoveScroll></div>}


      {hiddenMenuAdd && <div className='blanket_nav open-element-page-melted' style={{
        zIndex: 10000
      }} >
        <RemoveScroll
          style={{
            width: '90%',
            maxWidth: 600,
            maxHeight: '600px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'fixed',
            top: 60,
            left: '98%',
            transform: 'translate(-98%, 0%)',
            background: 'linear-gradient(to right, #ec008c, #fc6767)',
            color: 'white'
          }} className='menu_navbar menu_navbar_nav980 menu_navbar_navPc' removeScrollBar={false} ref={wrapperRef} data-theme={localTheme}>
          <h4>
            Services
          </h4>

          <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', background: '#00000099', paddingTop: 30, borderRadius: 5 }}>

            <Link to={'/parameters/premium'} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 5, width: 120, height: 120, textAlign: 'center', color: 'white', textDecoration: 'none' }}>
              <div style={{ height: 55, width: 55, marginBottom: 5, borderRadius: 5, fontSize: 25 }} className='btnPremium' data-theme={localTheme} ><FontAwesomeIcon style={{ color: '#cfc09f' }} icon={faCrown} /></div>
              {t("all_parameter.button2")}
            </Link>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 5, width: 120, height: 120, textAlign: 'center', color: 'white', textDecoration: 'none' }}>
              <div style={{ height: 55, width: 55, marginBottom: 5, borderRadius: 5, fontSize: 25 }} className='button_optionColoring' ><FontAwesomeIcon icon={faGem} /></div>
              {t('subscription')}
            </div>

            <Link onClick={() => { setHiddenMenuAdd(false) }} to={`/${SystemName}-accessPass/accessPass`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 5, width: 120, height: 120, textAlign: 'center', color: 'white', textDecoration: 'none' }}>
              <div style={{ height: 55, width: 55, marginBottom: 5, borderRadius: 5, fontSize: 25 }} className='button_optionColoringBlue' ><FontAwesomeIcon icon={faWandSparkles} /></div>
              {t('accessPass')}
            </Link>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 5, width: 120, height: 120, textAlign: 'center', color: 'white', textDecoration: 'none' }}>
              <div className='button_optionColoringPurple' style={{ height: 55, width: 55, marginBottom: 5, borderRadius: 5, fontSize: 25 }} data-theme={localTheme} ><FontAwesomeIcon icon={faMedal} /></div>
              {SystemName} Masterpiece
            </div>

            <Link to={`/${SystemName}-game`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 5, width: 120, height: 120, textAlign: 'center', color: 'white', textDecoration: 'none' }}>
              <div className='btn' style={{ height: 55, width: 55, marginBottom: 5, fontSize: 25, textDecoration: 'none', borderRadius: 5 }} ><FontAwesomeIcon icon={faGamepad} /></div>
              {SystemName} Game
            </Link>

            <Link to={`/${SystemName}-creative/home`} target='_blank' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 5, width: 120, height: 120, textAlign: 'center', color: 'white', textDecoration: 'none' }}>
              <div style={{ height: 55, width: 55, marginBottom: 5, borderRadius: 5, fontSize: 25 }} className='button_optionDimigo' data-theme={localTheme} ><FontAwesomeIcon icon={faPencil} /></div>
              Creative
            </Link>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 5, width: 120, height: 120, textAlign: 'center', color: 'white', textDecoration: 'none' }}>
              <div style={{ height: 55, width: 55, marginBottom: 5, borderRadius: 5, fontSize: 25 }} className='button_optionGreen' data-theme={localTheme} ><FontAwesomeIcon icon={faStore} /></div>
              {SystemName} Add
            </div>

          </div>

        </RemoveScroll>
      </div>}

      {notifcation && <div className='blanket_nav open-element-page-melted' style={{
        zIndex: 10000
      }} >
        <RemoveScroll
          style={{
            width: '90%',
            maxWidth: 500,
            overflow: 'auto',
            maxHeight: '500px',
            position: 'fixed',
            top: 50,
            left: '98%',
            transform: 'translate(-98%, 0%)',
          }} removeScrollBar={false} ref={wrapperRef} className='menu_navbar menu_navbar_nav980 menu_navbar_navPc scrollbar' data-theme={localTheme}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <div onClick={notif.length === 0 ? null : handleDeleteAllNotif} className={notif.length !== 0 ? 'button_optionRed' : 'button_optionDisable'} style={{ borderRadius: 5, fontSize: 14, height: 30, paddingLeft: 5, paddingRight: 5, width: 100, marginRight: 5 }} data-theme={localTheme}>
              All delete
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 className='title_color' style={{ display: 'flex', justifyContent: 'center', margin: 0 }}>Notifcations&nbsp;<span>{notif.length}</span></h4>
            </div>
          </div>
          {notif.length === 0 &&
            <div className='title_color' style={{ textAlign: 'center' }}>No notifcations</div>}
          {notif?.map((notif) => (
            <div style={{ display: 'flex', alignItems: 'center', marginTop: 10, paddingBottom: 10, borderBottom: '1px solid grey' }} key={notif.id}>
              <div onClick={() => {
                if (notif.adminId) {
                  handleDelete(notif.notifId)
                  setHiddenMenu(false)
                  setNotification(!notifcation)
                  navigate(`/profile/${notif.adminId}/home?type=Illustrations`)
                }
              }} className='notif' data-theme={localTheme}>
                  <img className='Profile_picture_nav' src={notif.user?.imageUrl || imgProfile} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                <div style={{ width: '90%' }} title={notif.data}>{notif.user?.pseudo || SystemName}: <div dangerouslySetInnerHTML={{ __html: notif.data }} /></div>
              </div>
              <div className='buttonCircle' data-theme={localTheme} style={{ width: 20, height: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 13 }} onClick={() => handleDelete(notif.notifId)}>
                <FontAwesomeIcon icon={faXmark} />
              </div>
            </div>
          ))}
        </RemoveScroll>
      </div>}

      {hiddenMessage && <div className='blanket_nav open-element-page-melted' style={{
        zIndex: 10000
      }} >
        <RemoveScroll
          style={{
            width: '90%',
            maxWidth: 800,
            overflow: 'auto',
            maxHeight: '500px',
            position: 'fixed',
            top: 50,
            left: '98%',
            transform: 'translate(-98%, 0%)',
          }}
          removeScrollBar={false} ref={wrapperRef} className='menu_navbar menu_navbar_nav980 menu_navbar_navPc' data-theme={localTheme}>
          <div className='submenu_navbar_title' style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div onClick={notifMessage.length === 0 ? null : handleDeleteAllMessage} className={notifMessage.length !== 0 ? 'button_optionRed' : 'button_optionDisable'} style={{ borderRadius: 5, fontSize: 14, height: 30, paddingLeft: 5, paddingRight: 5, width: 100, marginRight: 5 }} data-theme={localTheme}>
                  All delete
                </div>
                <Link to={'/discussions'} onClick={() => { setHiddenMessage(!hiddenMessage) }} className='button_option' style={{ borderRadius: 5, fontSize: 14, height: 30, paddingLeft: 5, paddingRight: 5, width: 100 }} data-theme={localTheme}>
                  All discussions
                </Link>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h4 className='title_color' style={{ display: 'flex', justifyContent: 'center', margin: 0 }}>Messages&nbsp;<span>{notifMessage.length}</span></h4>
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
      </div>}

      {historical && <div className='blanket_nav open-element-page-melted' style={{
        zIndex: 10000
      }} >
        <RemoveScroll
          style={{
            width: '90%',
            maxWidth: 800,
            overflow: 'auto',
            position: 'fixed',
            top: 50,
            left: '50%',
            transform: 'translate(-50%, 0%)',
          }} ref={wrapperRef} removeScrollBar={false} className='menu_navbar menu_navbar_nav980 menu_navbar_navPc scrollbar' data-theme={localTheme}>

          {editSearch === "" ?
            <>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <div className='title_color' style={{ margin: 5 }}>- Historical</div>
                <div className='button_optionRed' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 100 }} onClick={() => {
                  localStorage.removeItem("Historical")
                  addErrorMessage(`L'historique de recherche à été supprimé.`, 3000, '#396afc')
                  setHistorical(false)
                }} data-theme={localTheme}>
                  {t('delete')}
                </div>
              </div>
              <div className='button_option_container' style={{ height: '100%', minHeight: 100 }} data-theme={localTheme}>
                {localHistoricalJSON ? <div className='scrollbar' style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                  {localHistoricalJSON?.map((promise) => (
                    <Link to={`/${locationUrl == 'search-articles' ? 'search-articles' : null || locationUrl == 'search-users' ? 'search-users' : null || 'search-articles'}/${promise}`} style={{ paddingTop: 5, paddingBottom: 5 }} className='button_option' translate='no' onClick={() => {
                      handleClick(promise)
                      SearchTags(promise)
                    }} data-theme={localTheme} key={promise}>{promise.charAt(0).toUpperCase() + promise.slice(1)}</Link>
                  ))}
                </div> : <div className='title_color' style={{ textAlign: 'center', height: 50 }}>No historical</div>}
              </div>
              <div className='title_color' style={{ margin: 5 }}>- Some announcements</div>
              <div style={{ height: '100%' }}>
                <Card_announcement promise={promiseAnnouncement} button={true} />
              </div>
              <div className='title_color' style={{ margin: 5 }}>- Most populars users</div>
              <div style={{ height: '100%' }}>
                <Card_Square_user_list_presentation promise={promiseUsers.promise} />
              </div>
            </>
            :
            <>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <h3 className='title_color' style={{ margin: 0 }}>- Historical</h3>
              </div>
              <div className='button_option_container' data-theme={localTheme}>
                {promiseSearchTags.length !== 0 ? <div className='scrollbar' style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', overflowY: 'overlay' }}>
                  {promiseSearchTags?.map((promise) => (
                    <Link to={`/${locationUrl == 'search-articles' ? 'search-articles' : null || locationUrl == 'search-users' ? 'search-users' : null || 'search-articles'}/${promise.tag}`} style={{ paddingTop: 5, paddingBottom: 5 }} className='button_option open-element-page-melted' translate='no' onClick={() => {
                      handleClick(promise.tag)
                      SearchUserNameAPI(promise.tag)
                    }} data-theme={localTheme} key={promise.tag}>{promise.tag.charAt(0).toUpperCase() + promise.tag.slice(1)}</Link>
                  ))}
                </div> :
                  <div className='title_color' style={{ textAlign: 'center', height: 50 }}>No results</div>}
              </div>
            </>}
        </RemoveScroll>
      </div>}
    </>
  )
}

export default Navbar