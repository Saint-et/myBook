import { createContext, useContext, useEffect, useState } from "react";
import { API_URL, SOCKET_URL } from '../config';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import io from "socket.io-client";
import { IndexedDB, recupererTousLesElements } from '../assets/data/IndexedDB';
import i18n from "../assets/i18n/i18n";
import { useRef } from "react";


export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {


    const [languageSelect, setLanguageSelect] = useState(localStorage.getItem('language') == null || false);
    const [animationSelect, setAnimationSelect] = useState('');
    const [animationNotif, setAnimationNotif] = useState(null);

    

    const socket = io.connect(SOCKET_URL);
    let root = document.querySelector(":root");
    const IdContext = useLocation().pathname.split("/")[2];


    const [localTheme, setLocalTheme] = useState('');
    const [hiddenMenuSidebare, setHiddenMenuSidebare] = useState(false)
    const [activeAnimation, setActiveAnimation] = useState(false);
    const [hiddenMenuMiniProfil, setHiddenMenuMiniProfil] = useState({});
    const [hiddenMenu, setHiddenMenu] = useState(false);
    const [notif, setNotif] = useState([]);
    const [promiseIdentifiedUser, setPromiseIdentifiedUser] = useState();
    const [fullScreenImg, setFullScreenImg] = useState(null);
    const [editeEmail, setEditeEmail] = useState({
        email: "",
        password: ""
    });
    const [language, setLanguage] = useState([{ value: 'null', label: 'null' }]);
    const [editePseudo, setEditePseudo] = useState({
        pseudo: ""
    });


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
    // Theme
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
            //setTimeout(setAnimationNotif(null), 2000)
            // Utilisez setTimeout pour ajouter un délai de 3 secondes (3000 millisecondes)
            const delaiEnMillisecondes = 5000;


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
                    socket.on(res.data.user.id, () => {
                        GetNotifFromAPI();
                        GetNotifMessageFromAPI();
                    });
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
                    if (res.data.user.interest != null) {
                        GetBestAnnouncementFromAPI();
                    }
                } else {
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


    const handleFullScreen = (img, analyse) => {
        setFullScreenImg(img, analyse);
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
    const [itemsGetTags, setItemsGetTags] = useState([]);

    const GetTags = async () => {
        await axios.get(`${API_URL}api/eventv/get/get-tags`,
            { withCredentials: true })
            .then((res) => {
                setPromiseGetTags(res.data || [])
                setItemsGetTags(res.data || [])
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

    useEffect(() => {
        i18n.changeLanguage(localStorage.getItem('language'))
        GetMyProfilFromAPI();
        GetUsersPopularFromAPI()
        GetBestAnnouncementFromAPI();
        if (promiseIdentifiedUser !== false && promiseIdentifiedUser !== undefined) {
            handleNext()
        }
        setLocalTheme(localStorage.getItem('theme'));
        root.setAttribute('data-theme', localStorage.getItem('theme'));
        setAnimationSelect(localStorage.getItem('animation'));
    }, [])

    const handleNext = () => {
        GetUsersPopularFromAPI();
        GetBestAnnouncementFromAPI();
        GetMyFilesFromAPI()
        GetMyGroupsFromAPI()
        GetTags()
    }


    //console.log(localTabs);

    return (
        <AppContext.Provider
            value={{
                languageSelect, handleModeEco, animationNotif,
                activeAnimation, setActiveAnimation,
                animationSelect, setLanguageSelect,
                setHiddenMenuSidebare,
                hiddenMenuSidebare,
                promiseIdentifiedUser,
                GetMyProfilFromAPI,
                setPromiseIdentifiedUser,
                IdContext,
                customStyles,

                GetNotifFromAPI,
                notifMessage,
                notif,
                GetNotifMessageFromAPI,

                handleTheme,
                localTheme,

                fullScreenImg,
                setFullScreenImg,
                handleFullScreen,

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
                localTabs,

                promise, setPromise,
                total, GetMyFilesFromAPI, PER_PAGE, setNumPage, numPage,

                setPromiseGetMyGroupsFromAPI, promiseGetMyGroupsFromAPI, GetMyGroupsFromAPI,
                numPageGetMyGroupsFromAPI, setNumPageGetMyGroupsFromAPI,

                promiseGetTags, itemsGetTags, setItemsGetTags, setPromiseGetTags, GetTags

            }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);