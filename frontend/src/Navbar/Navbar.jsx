import '../sass/components/Navbar.scss';
import imgProfile from '../assets/images/logo.png';
import imgRemplace from '../assets/images/vaisseau-spatial-futuriste-orbite-autour-mysterieuse-planete-dans-galaxie-profonde-generee-par-intelligence-artificielle.jpg';
import logo from '../assets/images/logo_transparent_banner.png';
import logoBlack from '../assets/images/logo_transparent_banner_black.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faMagnifyingGlass, faXmark, faCommentDots, faPaperPlane, faMoon, faSun, faBars, faLanguage, faCubes, faGift, faCoins, faImage, faPanorama, faDownload, faBriefcase, faGears, faPowerOff, faBasketShopping, faTicket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import React, { useState, useRef, useEffect } from "react";
import { API_URL, SOCKET_URL } from '../config';
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';
import useKeypress from 'react-use-keypress';
import { RemoveScroll } from 'react-remove-scroll';
import io from "socket.io-client";
import parse from 'html-react-parser';
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { stateToHTML } from 'draft-js-export-html';
import { useAppContext } from '../contexts/UseAppContext';
import Card_announcement from '../components/Cards/Card_announcement';
import { useTranslation } from 'react-i18next';
import img1 from '../assets/background/84391.jpg';
import Card_Square_user_list_presentation from '../components/Cards/Card_Square_user_list_presentation';


const socket = io.connect(SOCKET_URL);

const Navbar = (props) => {

  const { t } = useTranslation();

  const { localTheme: localThemeContext,
    isNavbarVisible, setNavbarVisible,
    handleModeEco, setActiveAnimation,
    animationSelect,
    setLanguageSelect,
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
    setThemeBackground } = useAppContext()

  let localHistoricalJSON = JSON.parse(localStorage.getItem('Historical'))
  let Log = props.IsLog();

  const location = useLocation().pathname.split("/")[1]

  const localTheme = localStorage.getItem('theme');

  const navigate = useNavigate()

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}api/eventv/delete/notif/${id}`,
      { withCredentials: true })
      .then(() => {
        return GetNotifFromAPI()
      })

  }
  const handleDeleteAllNotif = async () => {
    await axios.delete(`${API_URL}api/eventv/delete/notifs`,
      { withCredentials: true })
      .then(() => {
        return GetNotifFromAPI()
      })

  }

  const handleDeleteAllMessage = async () => {
    await axios.delete(`${API_URL}api/eventv/delete/messages`,
      { withCredentials: true })
      .then(() => {
        return GetNotifMessageFromAPI()
      })

  }

  const [edite, setEdite] = useState({
    email: "",
    password: ""
  });


  const [error, setError] = useState("");


  const handleChange = (name) => event => {
    setEdite({ ...edite, [name]: event.target.value })
  };

  const [hiddenMenu, setHiddenMenu] = useState(false)
  const [themeChange, setThemeChange] = useState()
  const [notifcation, setNotification] = useState(false)
  const [hiddenMessage, setHiddenMessage] = useState(false)

  const handlehidden = () => {
    setHiddenMenu(!hiddenMenu)
    if (localTheme === 'dark') {
      setThemeChange(true)
    } else {
      setThemeChange(false)
    }
  };


  const handlenotifcation = () => {
    setNotification(!notifcation)
  };

  const handleMessage = () => {
    setHiddenMessage(!hiddenMessage)
  };

  const submit = async () => {
    setError('')
    try {
      await axios.post(`${API_URL}api/auth/login`, {
        email: edite.email,
        password: edite.password
      }, { withCredentials: true })
        .then((res) => {
          if (res.data.message == 'log') {
            GetUsersPopularFromAPI()
            return GetMyProfilFromAPI()
          }
        })
    } catch (error) {
      setError(error.response.data.message)
    }

  }

  const handleLogout = async () => {
    setNotification(false)
    setHiddenMenu(false)
    setHiddenMessage(false)
    await axios.get(`${API_URL}api/auth/logout`,
      { withCredentials: true })
      .then(() => {
        localStorage.removeItem("last-URL-home");
        navigate('/login')
        setThemeBackground(img1)
        return setPromiseIdentifiedUser(false)
      })
  }

  useKeypress('Enter', () => {
    if (promiseIdentifiedUser === false) {
      return submit()
    }
  })

  const [hiddenConnection, setHiddenConnection] = useState(false)


  const [hiddenAnswer, setHiddenAnswer] = useState(false)
  const [errorAnswer, setErrorAnswer] = useState(false)

  const submitMessage = async (uuid, id, userId) => {
    if (editorState.getCurrentContent().getPlainText() !== "") {
      try {
        await axios.post(`${API_URL}api/eventv/post/message`, {
          id: null,
          text: stateToHTML(editorState.getCurrentContent()),
          uuId: uuid,
          userId: id
        }, { withCredentials: true })
          .then(() => {
            setEdite({ text: "" });
            setEditorState(() => EditorState.createEmpty())
            handleDeleteNotifMessage(uuid)
            socket.emit('message-created', { uuId: uuid });
            socket.emit('notify-message', { uuId: uuid, text: stateToHTML(editorState.getCurrentContent()), userId: userId, sessionUserId: promiseIdentifiedUser.user.id, status: true });
          })
      } catch (error) {
        setErrorAnswer(error.response.data.message)
      }
    }
  }
  const handleDeleteNotifMessage = async (uuId) => {
    try {
      await axios.delete(`${API_URL}api/eventv/delete/notifMessage/${uuId}`,
        { withCredentials: true })
        .then(() => {
          GetNotifMessageFromAPI();
        })
    } catch (error) {

    }
  }

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const editor = useRef(null);



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

  const [editSearch, setEditSearch] = useState('');
  const [historical, setHistorical] = useState(false);
  const [errFront, setErrFront] = useState({
    err: ''
  })
  // lecture des changement effectué
  const handleChangeSearch = (event) => {
    setEditSearch(event.target.value);
    SearchTags(event.target.value)

    if (event.key === 'Enter') {
      setHistorical(false)
      SearchUserName()
    }
  };

  const handleClick = (promise) => {
    SearchUserName()
    setHistorical(false)
    setEditSearch(promise)
  }


  const SearchUserName = async () => {
    if (!editSearch.trim().split(/ +/).join(" ")) {
      return null
    }
    if (localHistoricalJSON == null) {
      localStorage.setItem('Historical', JSON.stringify([editSearch.trim().split(/ +/).join(" ")]))
      navigate(`/${location == 'search-articles' ? 'search-articles' : null || location == 'search-users' ? 'search-users' : null || 'search-articles'}/${editSearch}`, { replace: true })
      NewSearchTags()
    } else {
      const filteredEditSearch = localHistoricalJSON.filter((id) => id == editSearch)
      if (filteredEditSearch[0] !== editSearch) {
        localStorage.setItem('Historical', JSON.stringify([editSearch.trim().split(/ +/).join(" "), ...localHistoricalJSON]))
      }
      navigate(`/${location == 'search-articles' ? 'search-articles' : null || location == 'search-users' ? 'search-users' : null || 'search-articles'}/${editSearch}`, { replace: true })
      NewSearchTags()
    }
  }

  const SearchUserNameAPI = async (tag) => {
    if (!tag) {
      return null
    }
    if (localHistoricalJSON == null) {
      localStorage.setItem('Historical', JSON.stringify([tag]))
      navigate(`/${location == 'search-articles' ? 'search-articles' : null || location == 'search-users' ? 'search-users' : null || 'search-articles'}/${tag}`, { replace: true })
    } else {
      const filteredEditSearch = localHistoricalJSON.filter((id) => id == tag)
      if (filteredEditSearch[0] !== tag) {
        localStorage.setItem('Historical', JSON.stringify([tag, ...localHistoricalJSON]))
      }
      navigate(`/${location == 'search-articles' ? 'search-articles' : null || location == 'search-users' ? 'search-users' : null || 'search-articles'}/${tag}`, { replace: true })
    }
  }

  const NewSearchTags = async () => {
    if (editSearch.trim().split(/ +/).join(" ").length > 3) {
      await axios.post(`${API_URL}api/eventv/search/new-tags`, {
        tag: editSearch.trim().split(/ +/).join(" ")
      },
        { withCredentials: true })
        .then(() => { })
    }
  }


  const [promiseSearchTags, setPromiseSearchTags] = useState([])

  const SearchTags = async (e) => {
    if (e) {
      await axios.get(`${API_URL}api/eventv/search/tags/${e}`,
        { withCredentials: true })
        .then((res) => {
          setPromiseSearchTags(res.data.promise)
        })
    }
  }

  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const scrollThreshold = 50; // Niveau de défilement à partir duquel masquer la barre de navigation

  useEffect(() => {
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


  //{editSearch === '' && <>{historical && }</>}


  if (promiseIdentifiedUser === false) return (
    <>
      <div className='container_banner_navbar'>
        <div className='banner_navbar animation' data-theme={localThemeContext}>
          <Link to={'/login'} style={{ display: 'flex', width: '100%', alignItems: 'center', maxWidth: 200, justifyContent: 'center' }}>
            {localThemeContext === null && <img className='logo_event' src={logoBlack} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />}
            {localThemeContext === 'default' && <img className='logo_event' src={logoBlack} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />}
            {localThemeContext === 'dark' && <img className='logo_event' src={logo} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />}
          </Link >
          <div style={{ display: 'flex', marginRight: 20, zIndex: 5000, alignItems: 'center', width: '100%', maxWidth: 400, justifyContent: 'center' }}>

            {Log && <div onClick={() => { setHiddenConnection(true) }} className='buttonCircle' style={{ width: 120, height: 35, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, textDecoration: 'none' }} data-theme={localThemeContext}>
              Connection
            </div>}
            {Log && <Link to={'/signup'} className='buttonCircleBlue' style={{ width: 120, height: 35, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, textDecoration: 'none' }} data-theme={localThemeContext}>
              Sign'up
            </Link>}
            {!Log && <Link to={'/'} className='buttonCircleBlue' style={{ width: 150, height: 35, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, textDecoration: 'none' }} data-theme={localThemeContext}>
              Visit the website ?
            </Link>}
          </div>
        </div>

        {hiddenConnection && <div className='blanket animation' style={{ zIndex: 70, display: 'flex', alignItems: 'start', justifyContent: 'center' }} >
          <RemoveScroll className='menu_navbar' style={{ width: '100%', flexDirection: 'column', maxWidth: 900, height: 350 }} data-theme={localThemeContext}>
            <div className='submenu_navbar_title' style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'row-reverse' }}>
                <div className='buttonCircle' onClick={() => { setHiddenConnection(false) }} style={{ width: 30, height: 30, fontSize: 15, display: 'flex', justifyContent: 'center', alignItems: 'center' }} data-theme={localThemeContext}>
                  <FontAwesomeIcon icon={faXmark} />
                </div>
              </div>
              <h2 style={{ display: 'flex', justifyContent: 'center' }}>Connection</h2>
              <p style={{ color: 'white', marginRight: 5 }}>Email</p>
              <input className='input_text' type='email' onChange={handleChange('email')} />
              <p style={{ color: 'white', marginRight: 5 }}>password</p>
              <input className='input_text' type="password" onChange={handleChange('password')} />
              <div className='button_option_container' style={{ width: '100%', maxWidth: 300, marginTop: 20 }} data-theme={localTheme}>
                <div className='button_option' onClick={submit} style={{ width: '100%', maxWidth: 300 }} data-theme={localTheme}>Login</div>
              </div>
            </div>
          </RemoveScroll>
        </div>}
      </div>
    </>
  )

  if (!promiseIdentifiedUser || !notif) return null

  // className={isNavbarVisible ? 'container_banner_navbar' : 'container_banner_navbar active'}

  return (
    <>
      <div className={isNavbarVisible ? 'container_banner_navbar' : 'container_banner_navbar active'}>
        <div className='banner_navbar' data-theme={localThemeContext}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div onClick={() => {
              setHiddenMenuSidebare(!hiddenMenuSidebare)
              setActiveAnimation(true)
            }} style={{ width: 45, height: 30, display: 'flex', fontSize: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 200, marginRight: 90, cursor: 'pointer' }} data-theme={localThemeContext}>
              <FontAwesomeIcon icon={faBars} />
            </div>
            <Link to={'/'} style={{ display: 'flex', width: '100%', alignItems: 'center', maxWidth: 200, justifyContent: 'center' }}>
              <img className='logo_event' src={logo} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
            </Link >
          </div>

          <div style={{ display: 'flex', width: '100%', maxWidth: 600, justifyContent: 'center', alignItems: 'center' }}>
            {!historical && <div className='input_text input_text_navMobile input_text_navPc' style={{ color: 'grey' }} onClick={() => { setHistorical(true) }} data-theme={localThemeContext} >
              <span translate='no'>{editSearch}</span>
              <span>{editSearch == '' && t('search')}</span>
            </div>}
          </div>

          <div className='button_option_container button_option_container_Pc button_option_container_Mobile' data-theme={localTheme}>
            <div onClick={handleMessage} className='button_optionNav' style={{ width: '100%' }} data-theme={localTheme}><FontAwesomeIcon icon={faCommentDots} />
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
            <div onClick={handlenotifcation} className='button_optionNav' style={{ width: '100%' }} data-theme={localTheme}><FontAwesomeIcon icon={faBell} />
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
            <div onClick={() => { setHistorical(true) }} className='button_optionNav button_optionNavPc' style={{ width: '100%' }} data-theme={localTheme}><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
            <div className='button_optionNav' onClick={handlehidden}><img onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='Profile_picture_nav' src={promiseIdentifiedUser.user.imageUrl || imgProfile} alt="" /></div>
          </div>
        </div>

        {hiddenMenu && <div className='blanket_nav animation' style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }} >
          <RemoveScroll removeScrollBar={false} ref={wrapperRef} className='menu_navbar menu_navbar_navMobile menu_navbar_navPc open-elementHeightPage scrollbar' data-theme={localTheme}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Link onClick={() => {
                setHiddenMenu(false)
              }} to={localStorage.getItem("last-URL-home") || `/profile/${promiseIdentifiedUser.user.id}/page?type=Illustrations`} style={{ backgroundImage: `url(${promiseIdentifiedUser.user.imageUrlCover || imgRemplace})`, backgroundPosition: `50% ${promiseIdentifiedUser.user.resizeImageUrlCover}%`, borderRadius: 15 }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='CoverImage FlexEmbed FlexEmbed--2by1'>
              </Link>
              <Link className='text' onClick={() => {
                setHiddenMenu(false)
              }} style={{ zIndex: 10, textDecoration: 'none' }} to={localStorage.getItem("last-URL-home") || `/profile/${promiseIdentifiedUser.user.id}/page?type=Illustrations`} data-theme={localThemeContext}>
                <img style={{ cursor: 'pointer', width: 100, height: 100, borderRadius: '100%', marginTop: -100 }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='Profile_picture_nav hovercursor' src={promiseIdentifiedUser.user.imageUrl || imgProfile} alt="" />
                <div className='title_color' style={{ textAlign: 'center', fontSize: 18, fontWeight: 800 }} translate='no'>{promiseIdentifiedUser.user.pseudo}</div>
              </Link>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                <div onClick={handleTheme} className='buttonCircle' style={{ width: 23, height: 23, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, marginRight: 10 }} data-theme={localTheme}>
                  {localTheme === null && <FontAwesomeIcon icon={faMoon} />}
                  {localTheme === 'default' && <FontAwesomeIcon icon={faMoon} />}
                  {localTheme === 'dark' && <FontAwesomeIcon icon={faSun} />}
                </div>
                <div className='buttonCircle' onClick={handleThemeBackground} style={{ color: localThemeBackground === 'off' ? '#00aa00' : '#ec1c24', width: 23, height: 23, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, marginRight: 10 }} data-theme={localTheme}>
                  <FontAwesomeIcon icon={faPanorama} />
                </div>
                <div className='buttonCircle' onClick={handleModeEco} style={{ color: animationSelect === 'eco' ? '#00aa00' : '#ec1c24', width: 23, height: 23, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, marginRight: 10 }} data-theme={localTheme}>
                  <FontAwesomeIcon icon={faCubes} />
                </div>
                <div onClick={() => {
                  setHiddenMenu(false)
                  setLanguageSelect(null)
                }} className='buttonCircle' style={{ width: 23, height: 23, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, marginRight: 10 }} data-theme={localTheme}>
                  <FontAwesomeIcon icon={faLanguage} />
                </div>
              </div>
              <div className='button_option_container hovercursor' style={{ width: '90%', marginTop: 10 }} data-theme={localTheme}>
                <Link className='button_option' onClick={() => {
                  setHiddenMenu(false)
                }} to={localStorage.getItem("last-URL-workplace") || '/works/files'} data-theme={localTheme} >
                  <FontAwesomeIcon style={{ marginRight: 5 }} icon={faBriefcase} />{t('workspace')}
                </Link>
              </div>

              <div className='button_option_container hovercursor' style={{ width: '90%', marginTop: 10 }} data-theme={localTheme}>
                <Link className='button_option' onClick={() => {
                  setNotification(false)
                  setHiddenMenu(!hiddenMenu)
                }} to={'/parameters/customization'} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 5 }} icon={faGears} />{t('parameter')}</Link>
              </div>
              <div className='button_option_container hovercursor' style={{ width: '90%', marginTop: 20 }} data-theme={localTheme}>
                <div className='button_optionRed' onClick={handleLogout} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 5 }} icon={faPowerOff} />{t('logout')}</div>
              </div>
            </div>
          </RemoveScroll></div>}


        {hiddenMessage && <div className={isNavbarVisible ? 'blanket_nav animation' : 'blanket_nav active animation'} style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }} >
          <RemoveScroll removeScrollBar={false} ref={wrapperRef} className='menu_navbar menu_navbar_navMobile menu_navbar_navPc open-elementHeightPage' style={{ width: '100%', flexDirection: 'column', maxWidth: 900, height: 500, overflowY: 'auto' }} data-theme={localThemeContext}>
            <div className='submenu_navbar_title' style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className='button_option_container' style={{ width: '100%', display: 'flex', background: 'none' }} data-theme={localThemeContext}>
                    <div onClick={handleDeleteAllMessage} className={notifMessage.length !== 0 ? 'button_optionRed' : 'button_optionDisable'} style={{ width: 130, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, textDecoration: 'none' }} data-theme={localThemeContext}>
                      All delete
                    </div>
                    <Link to={'/discussions'} onClick={handleMessage} className='button_optionBlue' style={{ width: 150, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, textDecoration: 'none' }} data-theme={localThemeContext}>
                      All discussions
                    </Link>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <h3 className='title_color' style={{ display: 'flex', justifyContent: 'center', margin: 0 }}>Messages&nbsp;<span>{notifMessage.length}</span></h3>
                </div>
              </div>
              {notifMessage.length === 0 && <div className='title_color'>No messages</div>}

              {notifMessage?.map((message) => (
                <div className='container_mess_nav' key={message.id} data-theme={localThemeContext}>
                  <div onClick={() => { setHiddenAnswer(message.id) }} style={{ display: 'flex', justifyContent: 'space-around', cursor: 'pointer' }}>
                    <img className='Profile_picture_nav' src={message.user.imageUrl || imgProfile} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                    <h4>{message.user.pseudo}</h4>
                  </div>
                  {hiddenAnswer === message.id && <>
                    <div>Message:</div>
                    <div className='message_nav' style={{ textAlign: 'center' }} data-theme={localThemeContext}>{parse(message.text)}</div>
                    {<div style={{ color: 'red' }}>{errorAnswer}</div>}
                    <div translate="no" className="textarea_mess" style={{ width: '98%' }} data-theme={localThemeContext}>
                      <Editor
                        ref={editor}
                        editorState={editorState}
                        onChange={setEditorState}
                        placeholder="..."
                      />
                    </div>
                    <div style={{ marginTop: 10, display: 'flex' }}>
                      <div onClick={() => { handleDeleteNotifMessage(message.uuId) }} className='buttonCircleRed' style={{ width: 90, height: 35, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, textDecoration: 'none' }} data-theme={localThemeContext}>
                        Delete
                      </div>
                      <div onClick={() => { setHiddenAnswer(false) }} className='buttonCircle' style={{ width: 120, height: 35, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, textDecoration: 'none' }} data-theme={localThemeContext}>
                        Cancel
                      </div>
                      <div onClick={() => { submitMessage(message.uuId, message.user.id, message.user.id) }} className={editorState.getCurrentContent().getPlainText() ? 'buttonCircleBlue' : 'buttonCircleDisable'} style={{ width: 120, height: 35, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, textDecoration: 'none' }} data-theme={localThemeContext}>
                        <FontAwesomeIcon icon={faPaperPlane} />
                      </div>
                    </div>
                  </>}
                </div>
              ))}
            </div>
          </RemoveScroll>
        </div>}


        {notifcation && <div className={isNavbarVisible ? 'blanket_nav animation' : 'blanket_nav active animation'} style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }} >
          <RemoveScroll removeScrollBar={false} ref={wrapperRef} className='menu_navbar menu_navbar_navMobile menu_navbar_navPc open-elementHeightPage' style={{ flexDirection: 'column', maxWidth: 500, height: 500, overflowY: 'auto' }} data-theme={localThemeContext}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
              <div className='button_option_container' style={{ width: '100%', maxWidth: 130, display: 'flex', background: 'none' }} data-theme={localThemeContext}>
                <div onClick={handleDeleteAllNotif} style={{ width: 150, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, textDecoration: 'none' }} className={notif.length !== 0 ? 'button_optionRed' : 'button_optionDisable'} data-theme={localThemeContext}>
                  All delete
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 className='title_color' style={{ display: 'flex', justifyContent: 'center', margin: 0 }}>Notifcations&nbsp;<span>{notif.length}</span></h3>
              </div>
            </div>
            {notif.length === 0 &&
              <div className='title_color' style={{ textAlign: 'center' }}>No notifcations</div>}
            {notif?.map((notif) => (
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }} key={notif.id}>
                <Link onClick={() => {
                  handleDelete(notif.notifId)
                  setHiddenMenu(false)
                  setNotification(!notifcation)
                }} className='notif' to={`/profile/${notif.adminId}/activities`} data-theme={localThemeContext}>
                  <img className='Profile_picture_nav' src={notif.user.imageUrl || imgProfile} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                  <div>{notif.user.pseudo}&nbsp;{notif.data}.</div>
                </Link>
                <div className='buttonCircle' data-theme={localThemeContext} style={{ width: 35, height: 35, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 13 }} onClick={() => handleDelete(notif.notifId)}>
                  <FontAwesomeIcon icon={faXmark} />
                </div>
              </div>
            ))}
          </RemoveScroll>
        </div>}
      </div>

      {historical && <div className={isNavbarVisible ? 'blanket_nav animation' : 'blanket_nav active animation'} style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', zIndex: 20000 }} >
        <RemoveScroll ref={wrapperRef} removeScrollBar={false} className='menu_navbar menu_navbar_navMobile menu_navbar_navPc scrollbar open-elementHeightPage' style={{ width: '100%', maxWidth: 700, overflow: 'auto', alignSelf: 'center' }} data-theme={localTheme}>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
            <input ref={inputRef} value={editSearch} onClick={() => { setHistorical(true) }} onKeyDown={handleChangeSearch} onChange={handleChangeSearch} className='input_text' placeholder={t('search')} type="text" name="" id="" data-theme={localThemeContext} />
            {editSearch !== "" && <div className='button_option_container' style={{ width: '100%', maxWidth: 100, marginLeft: 10, display: 'flex', background: 'none' }} data-theme={localTheme}>
              <div className='button_option' onClick={SearchUserName} style={{ width: '100%', maxWidth: 300 }} data-theme={localTheme}><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
              <div className='button_option' onClick={() => { setEditSearch('') }} style={{ width: '100%', maxWidth: 300 }} data-theme={localTheme}><FontAwesomeIcon icon={faXmark} /></div>
            </div>}
          </div>
          {editSearch === "" ?
            <>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <div className='title_color' style={{ margin: 5 }}>- Historical</div>
                <div className='button_optionRed' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5 }} onClick={() => {
                  localStorage.removeItem("Historical")
                  setHistorical(false)
                }} data-theme={localThemeContext}>
                  {t('delete')}
                </div>
              </div>
              <div className='button_option_container' style={{ height: '100%', minHeight: 150 }} data-theme={localThemeContext}>
                {localHistoricalJSON ? <div className='scrollbar' style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                  {localHistoricalJSON?.map((promise) => (
                    <Link to={`/${location == 'search-articles' ? 'search-articles' : null || location == 'search-users' ? 'search-users' : null || 'search-articles'}/${promise}`} style={{ paddingTop: 5, paddingBottom: 5 }} className='button_option' translate='no' onClick={() => {
                      handleClick(promise)
                      SearchTags(promise)
                    }} data-theme={localThemeContext} key={promise}>{promise.charAt(0).toUpperCase() + promise.slice(1)}</Link>
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
              <div className='button_option_container' data-theme={localThemeContext}>
                {promiseSearchTags.length !== 0 ? <div className='scrollbar' style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', overflowY: 'overlay' }}>
                  {promiseSearchTags?.map((promise) => (
                    <Link to={`/${location == 'search-articles' ? 'search-articles' : null || location == 'search-users' ? 'search-users' : null || 'search-articles'}/${promise.tag}`} style={{ paddingTop: 5, paddingBottom: 5 }} className='button_option animation' translate='no' onClick={() => {
                      handleClick(promise.tag)
                      SearchUserNameAPI(promise.tag)
                    }} data-theme={localThemeContext} key={promise.tag}>{promise.tag.charAt(0).toUpperCase() + promise.tag.slice(1)}</Link>
                  ))}
                </div> :
                  <div className='title_color' style={{ textAlign: 'center', height: 50 }}>No results</div>}
              </div>
            </>}
        </RemoveScroll>
      </div>}

      {hiddenMenu && <div className='button_option_container mobileHidden' style={{ width: '100%', marginTop: 10, position: 'fixed', bottom: 0, opacity: 0.5, borderRadius: 0 }} data-theme={localTheme}>
        <div style={{ width: '100%', height: 30 }} onClick={() => {
          setHiddenAnswer(false)
          setNotification(false)
          setHiddenMenu(false)
          setHiddenMessage(false)
          setHistorical(false)
        }} className='button_optionRed' data-theme={localTheme}>Close</div>
      </div>}

      {historical && <div className='button_option_container mobileHidden' style={{ width: '100%', marginTop: 10, position: 'fixed', bottom: 0, opacity: 0.5, borderRadius: 0 }} data-theme={localTheme}>
        <div style={{ width: '100%', height: 30 }} onClick={() => {
          setHiddenAnswer(false)
          setNotification(false)
          setHiddenMenu(false)
          setHiddenMessage(false)
          setHistorical(false)
        }} className='button_optionRed' data-theme={localTheme}>Close</div>
      </div>}

      {hiddenMessage && <div className='button_option_container mobileHidden' style={{ width: '100%', marginTop: 10, position: 'fixed', bottom: 0, opacity: 0.5, borderRadius: 0 }} data-theme={localTheme}>
        <div style={{ width: '100%', height: 30 }} onClick={() => {
          setHiddenAnswer(false)
          setNotification(false)
          setHiddenMenu(false)
          setHiddenMessage(false)
          setHistorical(false)
        }} className='button_optionRed' data-theme={localTheme}>Close</div>
      </div>}

      {notifcation && <div className='button_option_container mobileHidden' style={{ width: '100%', marginTop: 10, position: 'fixed', bottom: 0, opacity: 0.5, borderRadius: 0 }} data-theme={localTheme}>
        <div style={{ width: '100%', height: 30 }} onClick={() => {
          setHiddenAnswer(false)
          setNotification(false)
          setHiddenMenu(false)
          setHiddenMessage(false)
          setHistorical(false)
        }} className='button_optionRed' data-theme={localTheme}>Close</div>
      </div>}
    </>
  )
}

export default Navbar