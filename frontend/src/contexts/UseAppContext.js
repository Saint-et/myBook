import { createContext, useContext, useEffect, useState } from "react";
import { API_URL, SOCKET_URL } from '../config';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import io from "socket.io-client";
import { IndexedDB, recupererTousLesElements, supprimerElement, ajouterElement, chercherElement, clearTableWorkSpace } from '../assets/data/IndexedDB';
import i18n from "../assets/i18n/i18n";
import { useNavigate } from 'react-router-dom';
import img1 from '../assets/background/84391.jpg';

const socket = io.connect(SOCKET_URL);

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {

    const navigate = useNavigate()

    const [languageSelect, setLanguageSelect] = useState(localStorage.getItem('language') == null || false);
    const [animationSelect, setAnimationSelect] = useState('');
    const [animationNotif, setAnimationNotif] = useState(null);
    const [isNavbarVisible, setNavbarVisible] = useState(true);



    let root = document.querySelector(":root");
    const IdContext = useLocation().pathname.split("/")[2];
    const Url3 = useLocation().pathname.split("/")[3];

    let backgroundShadow = 0.3;

    const [localTheme, setLocalTheme] = useState('');
    const [localThemeBackground, setLocalThemeBackground] = useState('');
    const [themeBackground, setThemeBackground] = useState(img1);
    const [themeBackgroundSystem, setThemeBackgroundSystem] = useState(img1);
    const [resizeThemeBackgroundSystem, setResizeThemeBackgroundSystem] = useState(50)
    const [resizeThemeBackground, setResizeThemeBackground] = useState(50)
    const [hiddenMenuSidebare, setHiddenMenuSidebare] = useState(false)
    const [hiddenPageBackground, setHiddenPageBackground] = useState(false)
    const [activeAnimation, setActiveAnimation] = useState(false);
    const [hiddenMenuMiniProfil, setHiddenMenuMiniProfil] = useState({});
    const [hiddenMenu, setHiddenMenu] = useState(false);
    const [notif, setNotif] = useState([]);
    const [promiseIdentifiedUser, setPromiseIdentifiedUser] = useState();
    const [fullScreenImg, setFullScreenImg] = useState(null);
    const [fullScreenImgAnalyse, setFullscreenimgAnalyse] = useState(null);
    const [editeEmail, setEditeEmail] = useState({
        email: "",
        password: ""
    });
    const [language, setLanguage] = useState([{ value: 'null', label: 'null' }]);
    const [editePseudo, setEditePseudo] = useState({
        pseudo: ""
    });
    const [refreshTags, setRefreshTags] = useState(false);


    // Theme
    const handleTheme = () => {
        if (localTheme === null) {
            localStorage.setItem('theme', 'dark');
            setLocalTheme(localStorage.getItem('theme'));
            root.setAttribute('data-theme', localStorage.getItem('theme'));
        } else {
            if (localTheme === 'default') {
                localStorage.setItem('theme', 'dark');
                setLocalTheme(localStorage.getItem('theme'));
                root.setAttribute('data-theme', localStorage.getItem('theme'));
            } else {
                localStorage.setItem('theme', 'default');
                setLocalTheme(localStorage.getItem('theme'));
                root.setAttribute('data-theme', localStorage.getItem('theme'));
            }
        }
    }
    //___
    // Background
    const handleThemeBackground = () => {
        if (localThemeBackground === null) {
            localStorage.setItem('background', 'off');
            setLocalThemeBackground(localStorage.getItem('background'));
            //root.setAttribute('data-theme', localStorage.getItem('background'));
        } else {
            if (localThemeBackground === 'off') {
                localStorage.setItem('background', 'on');
                setLocalThemeBackground(localStorage.getItem('background'));
                root.setAttribute('data-background', localStorage.getItem('background'));
                //setThemeBackground(promiseIdentifiedUser?.user.background || themeBackground);
                root.style.background = `linear-gradient( rgba(0, 0, 0, ${backgroundShadow}), rgba(0, 0, 0, ${backgroundShadow}), rgba(0, 0, 0, ${backgroundShadow})),url(${themeBackground})`;
                root.style.backgroundSize = 'cover';
                root.style.backgroundRepeat = 'no-repeat';
                root.style.backgroundPosition = `50% ${resizeThemeBackground}%`;
                root.style.backgroundAttachment = 'fixed';
            } else {
                localStorage.setItem('background', 'off');
                setLocalThemeBackground(localStorage.getItem('background'));
                root.setAttribute('data-background', localStorage.getItem('background'));
                root.style.background = "";
            }
        }
    }
    //___
    // ModeEco
    const handleModeEco = () => {
        if (animationNotif === null) {
            if (animationSelect === null) {
                localStorage.setItem('animation', 'eco');
                setAnimationSelect(localStorage.getItem('animation'));
                setAnimationNotif(localStorage.getItem('animation'))
            } else {
                if (animationSelect === 'eco') {
                    localStorage.setItem('animation', 'normal');
                    setAnimationSelect(localStorage.getItem('animation'));
                    setAnimationNotif(localStorage.getItem('animation'))
                } else {
                    localStorage.setItem('animation', 'eco');
                    setAnimationSelect(localStorage.getItem('animation'));
                    setAnimationNotif(localStorage.getItem('animation'))
                }
            }

            // Utilisez setTimeout pour ajouter un délai de 3 secondes (3000 millisecondes)
            const delaiEnMillisecondes = 3000;


            // Déclenchez votre fonction après le délai
            setTimeout(() => {
                setAnimationNotif(null)

                // Après 3 secondes, réactivez la fonction en effaçant le timeout
                clearTimeout();
            }, delaiEnMillisecondes);
        }

    }

    //___


    const GetMyProfilFromAPI = async () => {
        await axios.get(`${API_URL}api/eventv/profil`,
            { withCredentials: true })
            .then((res) => {
                setPromiseIdentifiedUser(res.data);
                if (res.data != false) {
                    GetNotifFromAPI();
                    GetNotifMessageFromAPI();
                    setResizeThemeBackground(res.data.user.resizeThemeBackground)
                    setResizeThemeBackgroundSystem(res.data.user.resizeThemeBackground)
                    //Customization
                    setEditeEmail({
                        email: res.data.user.email,
                        password: ""
                    });
                    setLanguage(res.data.user.languages);
                    setEditePseudo({
                        pseudo: res.data.user.pseudo
                    });
                    //_____________
                    //console.log(res.data.user.background);
                    //if (localStorage.getItem('background') === 'on') {
                    //if (Url3 == 'game-user') return;


                    if (res.data.user.background != "") {
                        setThemeBackground(res.data.user.background)
                        setThemeBackgroundSystem(res.data.user.background)
                    } else {
                        setThemeBackground(img1)
                        setThemeBackgroundSystem(img1)
                    }
                    //}
                } else {
                    navigate('/login')
                    setThemeBackground(img1)
                    setPromiseIdentifiedUser(false)
                    localStorage.removeItem("last-URL-home");
                }
            })
    };


    const GetNotifFromAPI = async () => {
        await axios.get(`${API_URL}api/eventv/mynotif/notif`,
            { withCredentials: true })
            .then((res) => {
                setNotif(res.data);
            })
    };

    const [notifMessage, setNotifMessage] = useState([])
    const GetNotifMessageFromAPI = async () => {
        await axios.get(`${API_URL}api/eventv/mynotifMessage/notifMessage`,
            { withCredentials: true })
            .then((res) => {
                setNotifMessage(res.data);
            })
    };


    const handleFullScreen = (img) => {
        setFullScreenImg(img);
    };

    const handleFullscreenimgAnalyse = (el) => {
        setFullscreenimgAnalyse(el);
    };

    const [promiseUsers, setPromiseUsers] = useState('');
    const [error, setError] = useState("");


    const GetUsersPopularFromAPI = async () => {
        try {
            await axios.get(`${API_URL}api/eventv/populars/users`,
                { withCredentials: true })
                .then((res) => {
                    setPromiseUsers(res.data);

                })
        } catch (error) {
            setError(error.response.data);
        }
    }
    const [promiseAnnouncement, setPromiseAnnouncement] = useState([]);
    const GetBestAnnouncementFromAPI = async () => {
        try {
            await axios.get(`${API_URL}api/eventv/announcement/best-announcement`,
                { withCredentials: true })
                .then((res) => {
                    setPromiseAnnouncement(res.data);
                })
        } catch (error) {
            setError(error.response.data);
        }
    }

    const customStyles = {
        option: (defaultStyles) => ({
            ...defaultStyles,
            color: "#fff",
            backgroundColor: "#212529",
            cursor: 'pointer'
        }),
        control: (defaultStyles) => ({
            ...defaultStyles,
            backgroundColor: "#212529",
            cursor: 'pointer'
        }),
        singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#fff" }),
    };

    //useEffect(() => {
    //    GetMyProfilFromAPI();
    //    GetUsersPopularFromAPI();
    //    GetBestAnnouncementFromAPI();
    //    setLocalTheme(localStorage.getItem('theme'));
    //    root.setAttribute('data-theme', localStorage.getItem('theme'));
    //}, []);


    // WORKSPACE

    const [menuFile, setMenuFile] = useState(false)

    const [promise, setPromise] = useState([])
    const [total, setTotal] = useState('')

    const PER_PAGE = 5
    const [numPage, setNumPage] = useState(0)


    //console.log(numPage);

    const GetMyFilesFromAPI = async () => {
        //setTotal('');
        setNumPage((prevNumPage) => {
            // Utilisez prevNumPage directement ici ou effectuez des opérations avec lui
            //console.log(selectedPage);
            axios.get(`${API_URL}api/eventv/myfiles/files/${prevNumPage * PER_PAGE || 0}`,
                { withCredentials: true })
                .then((res) => {
                    setPromise(res.data.rows);
                    setTotal(res.data.count);
                    setMenuFile(false)
                })
            // Effectuez d'autres opérations ici
            return prevNumPage; // N'oubliez pas de retourner la nouvelle valeur
        });
    }

    const [promiseGetMyGroupsFromAPI, setPromiseGetMyGroupsFromAPI] = useState()
    const [numPageGetMyGroupsFromAPI, setNumPageGetMyGroupsFromAPI] = useState(0)

    const GetMyGroupsFromAPI = async () => {
        //setTotal('');
        setNumPageGetMyGroupsFromAPI((prevNumPage) => {
            axios.get(`${API_URL}api/eventv/mygroups/groups/${prevNumPage * PER_PAGE || 0}`,
                { withCredentials: true })
                .then((res) => {
                    setPromiseGetMyGroupsFromAPI(res.data.rows);
                    setTotal(res.data.count);
                })
            return prevNumPage;
        })
    }

    const [promiseGetTags, setPromiseGetTags] = useState([])

    const GetTags = async () => {
        setRefreshTags(true)
        await axios.get(`${API_URL}api/eventv/get/get-tags`,
            { withCredentials: true })
            .then((res) => {
                setRefreshTags(false)
                setPromiseGetTags(res.data || [])
            })
    }



    // IndexedDB

    const [localTabs, setLocalTabs] = useState([])

    const handleRecupererTousLesElements = async () => {
        // Appelez la fonction pour récupérer tous les éléments
        const db = await IndexedDB();
        recupererTousLesElements(db)
            .then((elements) => {
                //console.log(elements);
                setLocalTabs(elements);

                // Utilisez les éléments récupérés comme vous le souhaitez dans votre interface utilisateur
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération de tous les éléments :', error);
            });
    };

    const handleClearIndexedDB = async () => {
        const db = await IndexedDB();
        clearTableWorkSpace(db)
            .then(() => {
                //console.log('Élément supprimé avec succès');
                handleRecupererTousLesElements()
            })
            .catch((error) => {
                console.error('Erreur lors de la suppression des éléments :', error);
            });
    }

    // Search for local documentation first.
    const GetMyFileFromLocal = async (Id) => {
        const db = await IndexedDB();
        chercherElement(db, parseInt(Id))
            .then(async (element) => {

                if (element) {
                    console.log(1);
                    if (window.confirm(`Le projet ${element.name} a été téléchargé avec succès, vous souhaitez accéder à ${element.name} ?`)) {
                        navigate(`/works/file/${element.id}`)
                    } else {
                        return;
                    }
                } else {
                    GetMyFileFromAPI(Id)
                }

            })
            .catch((error) => {
                console.error('Erreur lors de la recherche de l\'élément :', error);
            });
    }
    // Search on the server second
    const GetMyFileFromAPI = async (Id) => {
        try {
            await axios.get(`${API_URL}api/eventv/myfile/file/${Id}`,
                { withCredentials: true })
                .then((res) => {
                    // Adding an item to indexedDB
                    handleAjouterElement({ ...res.data, timestamp: Date.now() });

                })
        } catch (error) {
            // Call the delete function with the ID of the item to be deleted if there is a limited access to a page
            //setErrorLogin(error.response.data.message);
            const db = await IndexedDB();
            supprimerElement(db, parseInt(Id))
        }

    }
    // function: Adding an item to indexedDB
    const handleAjouterElement = async (el) => {
        try {
            const db = await IndexedDB();
            const nouvelElement = el;
            await ajouterElement(db, nouvelElement)
                .then(() => {
                    handleRecupererTousLesElements()
                    if (window.confirm(`Le projet ${el.name} a été téléchargé avec succès, vous souhaitez accéder à ${el.name} ?`)) {
                        navigate(`/works/file/${el.id}`)
                    } else {
                        return;
                    }
                })
        } catch (error) {
            console.error('Erreur lors de l ajout de l élément :', error);
            navigate(`/works/file/${el.id}`)
        }
    };

    useEffect(() => {
        GetMyProfilFromAPI();
        i18n.changeLanguage(localStorage.getItem('language'))
        GetUsersPopularFromAPI()
        GetBestAnnouncementFromAPI();
        //if (promiseIdentifiedUser !== false && promiseIdentifiedUser !== undefined) {
        handleNext()
        //}
        setLocalTheme(localStorage.getItem('theme'));
        root.setAttribute('data-theme', localStorage.getItem('theme'));
        setAnimationSelect(localStorage.getItem('animation'));
        if (localStorage.getItem('background') == null) {
            setLocalThemeBackground('on');
            root.setAttribute('data-background', 'on');
        } else {
            root.setAttribute('data-background', localStorage.getItem('background'));
            setLocalThemeBackground(localStorage.getItem('background'));
        }
    }, [])

    useEffect(() => {
        if (localStorage.getItem('background') !== 'off') {
            root.style.background = `linear-gradient( rgba(0, 0, 0, ${backgroundShadow}), rgba(0, 0, 0, ${backgroundShadow}), rgba(0, 0, 0, ${backgroundShadow})),url(${themeBackground})`;
            // Autres styles facultatifs
            root.style.backgroundSize = 'cover'; // Ajustement de la taille de l'arrière-plan
            root.style.backgroundRepeat = 'no-repeat';
            root.style.backgroundPosition = `50% ${resizeThemeBackground}%`;
            root.style.backgroundAttachment = 'fixed';
        }
        if (promiseIdentifiedUser === false) {
            setThemeBackground(img1);
            setResizeThemeBackground(50);
        }
    }, [root, themeBackground, promiseIdentifiedUser])

    useEffect(() => {
        if (promiseIdentifiedUser) {
            socket.on(promiseIdentifiedUser.user.id, () => {
                GetNotifFromAPI();
                GetNotifMessageFromAPI();
            });
        }
    }, [promiseIdentifiedUser, GetNotifFromAPI, GetNotifMessageFromAPI, socket])

    useEffect(() => {
        if (promiseIdentifiedUser) {
            socket.on(`${promiseIdentifiedUser.user.id}-systeme`, () => {
                GetMyProfilFromAPI()
            });
        }
    }, [promiseIdentifiedUser, GetMyProfilFromAPI, socket])

    const handleNext = () => {
        GetUsersPopularFromAPI();
        GetBestAnnouncementFromAPI();
        GetTags();
        GetMyFilesFromAPI();
        GetMyGroupsFromAPI();
    }

    return (
        <AppContext.Provider
            value={{
                isNavbarVisible, setNavbarVisible,
                languageSelect, handleModeEco, animationNotif, handleThemeBackground, localThemeBackground,
                activeAnimation, setActiveAnimation,
                animationSelect, setLanguageSelect,
                setHiddenMenuSidebare,
                hiddenMenuSidebare,
                promiseIdentifiedUser,
                GetMyProfilFromAPI,
                setPromiseIdentifiedUser,
                IdContext,
                customStyles,
                themeBackground,
                setThemeBackground,
                resizeThemeBackground,
                setResizeThemeBackground,
                hiddenPageBackground,
                setHiddenPageBackground,
                themeBackgroundSystem,
                setThemeBackgroundSystem,
                resizeThemeBackgroundSystem,
                setResizeThemeBackgroundSystem,

                GetNotifFromAPI,
                notifMessage,
                notif,
                GetNotifMessageFromAPI,

                handleTheme,
                localTheme,

                fullScreenImgAnalyse,
                setFullscreenimgAnalyse,
                fullScreenImg,
                setFullScreenImg,
                handleFullScreen,
                handleFullscreenimgAnalyse,

                setHiddenMenuMiniProfil,
                hiddenMenuMiniProfil,
                setHiddenMenu,
                hiddenMenu,

                editeEmail,
                setEditeEmail,
                language,
                setLanguage,
                editePseudo,
                setEditePseudo,

                promiseUsers,
                GetUsersPopularFromAPI,
                promiseAnnouncement,
                GetBestAnnouncementFromAPI,


                // works
                handleRecupererTousLesElements,
                handleClearIndexedDB,
                localTabs,
                menuFile, setMenuFile,

                promise, setPromise,
                total, GetMyFilesFromAPI, PER_PAGE, setNumPage, numPage,

                setPromiseGetMyGroupsFromAPI, promiseGetMyGroupsFromAPI, GetMyGroupsFromAPI,
                numPageGetMyGroupsFromAPI, setNumPageGetMyGroupsFromAPI,

                promiseGetTags, setPromiseGetTags, GetTags, refreshTags, setRefreshTags,

                //file display
                GetMyFileFromLocal

            }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);