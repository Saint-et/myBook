import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppContext } from "../../contexts/UseAppContext";
import logo from '../../assets/images/logo_transparent_banner.png';
import Card_files from "../../components/Cards/Card_articles";
import { API_URL, APP_URL } from '../../config';
import axios from "axios";
import { faClock, faClone, faEye, faEyeSlash, faGem, faHeart, faImage, faImages, faPenToSquare, faUser } from "@fortawesome/free-regular-svg-icons";
import { RemoveScroll } from "react-remove-scroll";
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect, useRef } from "react";
import { faExclamationTriangle, faPlus, faTriangleExclamation, faDownload, faAngleLeft, faAngleRight, faShare, faArrowDown, faCloudArrowUp, faPen, faLock, faUserTag, faUserSecret, faWandSparkles, faArrowLeft, faMinimize, faLink, faPanorama, faBook, faRefresh, faCoins, faAngleDoubleUp, faLeftRight, faUpDown, faPlay, faStop, faPencil } from "@fortawesome/free-solid-svg-icons";
import useKeypress from 'react-use-keypress';
import { EditorState } from "draft-js";
import { Link, useNavigate, useLocation, useHistory } from 'react-router-dom';
import Card_announcement from "../../components/Cards/Card_announcement";
import Pub from "../../components/Pub/Pub";
import { NSFW, SystemLogo, SystemName } from "../../assets/data/data";
import dayjs from "dayjs";
import 'dayjs/locale/fr';
import { Manage_Tags } from "../../components/versatile_function/manage_Tags";
import { Manage_Img } from "../../components/versatile_function/manage_Img";
import Card_articles_side from "../../components/Cards/Card_articles_side";
import PageNoFound from "../../components/page_err";
import Function_utils from "../../components/versatile_function/usefunction_utils";
import Subscription from "../UserProfil/subscription/Subscription";
import { useWorkspaceContext } from "../../contexts/UseWorkspaceContexte";
import { IndexedDB, add_Recently_viewedDB, add_BookMark_DB, get_BookMark_DB, del_BookMark_DB } from '../../assets/data/IndexedDB';
import Text_manage from "../../components/versatile_function/Text_manage";
import Subscription_management from "../../components/Subscription_management";
import Color from "color-thief-react";
import { spinner } from "../../utils";
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);


const Illustrations_open = () => {
    const { localTheme, promiseIdentifiedUser, handleFullScreen, setNavbarVisible, systemDetectMobile, setHiddenConnection, addErrorMessage, animationSelect } = useAppContext()

    const { GetMyFileFromLocal, setPromiseFileStatistical } = useWorkspaceContext()

    const { addSearchToUrl } = Function_utils()

    const {
        textTags,
        editeTags,
        setEditeTags,
        handleChangeTags,
        handleRemoveTag } = Manage_Tags()

    const {
        handleConversionCoins,
        realCash
    } = Function_utils()

    const { handleDownload } = Manage_Img()

    const { t } = useTranslation();
    const editorRender = useRef(null);
    const editor = useRef(null);
    const refScroll = useRef(null);
    const refImage = useRef(null);
    const refMoreByUser = useRef(null);
    const itemRefs = useRef([]);
    const fileRefs = useRef([]);

    const navigate = useNavigate()

    let maxWordReport = 1000;

    const [option, setOption] = useState(false)
    const [optionGroup, setOptionGroup] = useState(false)
    const [optionTags, setOptionTags] = useState(false)
    const [errorLogin, setErrorLogin] = useState();
    const [promise, setPromise] = useState();
    const [promiseReader, setPromiseReader] = useState(false);
    //const [promiseText, setPromiseText] = useState(() => EditorState.createEmpty());
    const [promiseParams, setPromiseParams] = useState();
    const [promiseUserFile, setPromiseUserFile] = useState();
    const [promiseGroupFile, setPromiseGroupFile] = useState();
    const [promiseUserFileMin, setPromiseUserFileMin] = useState();
    const [promiseAnnouncement, setPromiseAnnouncement] = useState();
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [promiseSimilar, setPromiseSimilar] = useState();
    //const [scrollProgress, setScrollProgress] = useState(0);
    const [swipAnimation, setSwipAnimation] = useState();
    const [startReader, setStartReader] = useState(null);
    const [showPages, setShowPages] = useState(false);
    const [running, setRunning] = useState(false);

    let swipAnimationTimer = 200;

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const file_typeUrl = searchParams.get("file_type");
    const idUrl = parseInt(searchParams.get("file"));
    const indexUrl = parseInt(searchParams.get("index"));
    // const indexUrl2nd = parseInt(searchParams.get("index")) - 1;
    const [groupId, setGroupId] = useState();
    const [adminId, setAdminId] = useState();


    const [indexUrlState, setIndexUrlState] = useState(0)

    //console.log(indexUrlState);

    // Search on the server second
    const GetFileFromAPI = async (idUrl) => {
        if (file_typeUrl === 'Manga') {
            setStartReader(true)
            setShowPages(true)
        }
        try {
            await axios.get(`${API_URL}api/eventv/illustration/file/${file_typeUrl}/${idUrl}`,
                { withCredentials: true })
                .then((res) => {
                    setErrorLogin()
                    if (indexUrl !== indexUrlState + 1) {
                        handleSeePic()
                    }
                    handleSeeFile()
                    if (res.data.images.length !== 0) {
                        setPromise(res.data);
                    } else {
                        delete res.data.images;
                        res.data.images = [{ id: 1, imageUrl: res.data.miniature, order: 1, real: false }]
                        setPromise(res.data);
                    }
                    if (promiseIdentifiedUser) {
                        const element = {
                            id: res.data.id,
                            name: res.data.name,
                            miniature: res.data.miniature,
                            type: res.data.type,
                            adult: res.data.adult,
                            shop: res.data.shop,
                            diamond: res.data.diamond,
                            user: {
                                id: res.data.user.id,
                                pseudo: res.data.user.pseudo,
                                imageUrl: res.data.user.imageUrl
                            }
                        }

                        handleAjouterElement({ ...element, timestamp: Date.now() })
                    }

                    if (res.data.price) {
                        handleConversionCoins(res.data.price)
                        setShopWindow(true)
                    } else {
                        setShopWindow(false)
                    }

                    setEditeTags(res.data.tags)
                    GetSomeBestAnnouncementFromAPI(res.data.tags)
                    GetSimilarFileFromAPI(res.data.tags)
                    GetFileParamsFromAPI(idUrl)
                    setOptionGroup(false)

                    // itemRefs.current[indexUrl]?.scrollIntoView({ block: 'center' })
                    document.title = `${res.data.name}-${res.data.type}`;

                    if (res.data.groupId) {
                        setGroupId(res.data.groupId)
                    } else {
                        setGroupId()
                    }
                    if (res.data.adminId) {
                        setAdminId(res.data.adminId)
                    } else {
                        setAdminId()
                    }

                })

        } catch (error) {
            // Extract the error message from the response data
            const errorMessage = error.response.data;

            // Set the error message in state or handle it as needed
            setErrorLogin(errorMessage);
        }

    }

    // console.log(indexUrlState);

    // function: Adding an item to indexedDB
    const handleAjouterElement = async (el) => {
        try {
            const db = await IndexedDB();
            const nouvelElement = el;
            await add_Recently_viewedDB(db, nouvelElement)
                .then(() => {
                    //console.log('élément ajouté');
                })
        } catch (error) {
            //console.error('Erreur lors de l ajout de l élément :', error);
        }
    };

    // Search on the server second
    const GetFileParamsFromAPI = async (idUrl) => {
        try {
            await axios.get(`${API_URL}api/eventv/file-params/files/${file_typeUrl}/${idUrl}`,
                { withCredentials: true })
                .then((res) => {
                    setPromiseParams(res.data);
                })
        } catch (error) {
            //console.log(error.response.data.message);
        }
    }
    useEffect(() => {
        if (indexUrl) {
            setIndexUrlState(indexUrl - 1)
            // const urlWithoutIndex = location.pathname + location.search.replace(/&?index=1/, '');
            // // Remplacer l'URL dans l'historique sans ajouter une nouvelle entrée
            // history.replace(urlWithoutIndex);
        } else {
            setIndexUrlState(0)
        }
        setRunning(false)
        GetFileFromAPI(idUrl)
        GetFileParamsFromAPI(idUrl)
    }, [idUrl, promiseIdentifiedUser, indexUrl])



    const GetGroupsFileFromAPI = async (groupId) => {
        try {
            await axios.get(`${API_URL}api/eventv/group-illustration/files/${file_typeUrl}/${groupId}`,
                { withCredentials: true })
                .then((res) => {
                    setPromiseGroupFile(res.data)
                })
        } catch (error) {
            // Call the delete function with the ID of the item to be deleted if there is a limited access to a page
            setErrorLogin(error.response.data.message);
        }
    }


    useEffect(() => {
        if (groupId) {
            GetGroupsFileFromAPI(groupId)
        } else {
            setPromiseGroupFile([])
        }
    }, [groupId, promiseIdentifiedUser])


    const GetUserFileFromAPI = async (idUser) => {
        try {
            await axios.get(`${API_URL}api/eventv/illustration-user/files/${file_typeUrl}/${idUser}`,
                { withCredentials: true })
                .then((res) => {
                    setPromiseUserFile(res.data)
                    handleSeeFile()
                })
        } catch (error) {
            // Call the delete function with the ID of the item to be deleted if there is a limited access to a page
            setErrorLogin(error.response.data.message);
        }
    }

    useEffect(() => {
        if (adminId) {
            GetUserFileFromAPI(adminId)
        }
    }, [adminId, promiseIdentifiedUser])

    useEffect(() => {
        if (promiseUserFile) {
            const indexObjet = promiseUserFile.findIndex(objet => objet.id === idUrl);
            if (indexObjet !== -1) {
                const objetTrouve = promiseUserFile[indexObjet];
                const objetsAdjacent = [];
                // Récupérer les objets précédents
                for (let i = indexObjet - 1; i >= 0 && i >= indexObjet - 1; i--) {
                    objetsAdjacent.unshift(promiseUserFile[i]);
                }
                // Ajouter l'objet actuel
                objetsAdjacent.push(objetTrouve);
                // Récupérer les objets suivants
                for (let i = indexObjet + 1; i < promiseUserFile.length && i <= indexObjet + 1; i++) {
                    objetsAdjacent.push(promiseUserFile[i]);
                }
                setPromiseUserFileMin(objetsAdjacent);
            }
        }
    }, [promiseUserFile, idUrl])


    //console.log(promiseUserFileMin);
    const GetSomeBestAnnouncementFromAPI = async (tag) => {
        let stringify = JSON.stringify(tag)
        try {
            await axios.get(`${API_URL}api/eventv/announcement-similar/best-announcement/${encodeURIComponent(stringify)}`,
                { withCredentials: true })
                .then((res) => {
                    setPromiseAnnouncement(res.data);

                })
        } catch (error) {
            // Call the delete function with the ID of the item to be deleted if there is a limited access to a page
            setErrorLogin(error.response.data.message);
        }
    }

    const GetSimilarFileFromAPI = async (tag) => {
        let stringify = JSON.stringify(tag)
        try {
            await axios.get(`${API_URL}api/eventv/similar/file/${file_typeUrl}/${encodeURIComponent(stringify)}`,
                { withCredentials: true })
                .then((res) => {
                    setPromiseSimilar(res.data);

                })
        } catch (error) {
            // Call the delete function with the ID of the item to be deleted if there is a limited access to a page
            setErrorLogin(error.response.data.message);
        }
    }

    useKeypress('ArrowLeft', (e) => {
        e.preventDefault()
        //navigate({ search: `file_type=${file_typeUrl}&file=${idUrl}&index=${Math.max(indexUrl - 1, 1)}` })
        setIndexUrlState(Math.max(indexUrlState - 1, 0))
        setNavbarVisible(false)
        if (indexUrlState > 0) {
            refImage.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
            //itemRefs.current[indexUrlState - 1]?.scrollIntoView({ block: 'center' })
            setSwipAnimation(true)
            setTimeout(() => {
                setSwipAnimation();
            }, swipAnimationTimer);
        }
    })
    useKeypress('ArrowRight', (e) => {
        e.preventDefault()
        //navigate({ search: `file_type=${file_typeUrl}&file=${idUrl}&index=${Math.min(indexUrl + 1, promise?.images.length)}` })
        setIndexUrlState(Math.min(indexUrlState + 1, promise?.images.length - 1))
        setNavbarVisible(false)
        if (indexUrlState < promise?.images.length - 1) {
            refImage.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
            //itemRefs.current[indexUrlState + 1]?.scrollIntoView({ block: 'center' })
            setSwipAnimation(true)
            setTimeout(() => {
                setSwipAnimation();
            }, swipAnimationTimer);
        }
    })

    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    function handleContextMenu(event) {
        event.preventDefault(); // Empêche le menu contextuel par défaut du navigateur
        setIsVisible(true);
        const posX = event.clientX;
        const posY = event.clientY;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const menuWidth = 280; // Largeur du menu contextuel (à ajuster selon votre conception)
        const menuHeight = 260; // Hauteur du menu contextuel (à ajuster selon votre conception)
        const adjustedX = Math.min(posX, screenWidth - menuWidth); // Ajuste la position X pour rester dans l'écran
        const adjustedY = Math.min(posY, screenHeight - menuHeight); // Ajuste la position Y pour rester dans l'écran
        setPosition({ x: adjustedX, y: adjustedY });
    }

    const handleScrollDetect = () => {
        window.addEventListener('scroll', () => {
            setIsVisible(false);
        });
    }

    useEffect(() => {
        handleScrollDetect()
    }, [])

    //const copyCurrentUrl = async () => {
    //    await navigator.clipboard.writeText(`${APP_URL}/file/page_file/page?file_type=${file_typeUrl}&file=${idUrl}&index=${indexUrlState}`)
    //        .then(() => {
    //            setIsVisible(false)
    //            alert("L'URL a été copiée !")
    //        })
    //        .catch(error => console.error('Erreur lors de la copie de l\'URL :', error));
    //}

    function copyCurrentUrl() {
        setIsVisible(false)
        // Créer un élément textarea temporaire
        const textarea = document.createElement('textarea');
        textarea.value = `${APP_URL}file/page_file/page?file_type=${file_typeUrl}&file=${idUrl}&index=${indexUrlState + 1}`;

        // Ajouter l'élément textarea au DOM
        document.body.appendChild(textarea);

        // Sélectionner le texte dans l'élément textarea
        textarea.select();

        // Copier le texte dans le presse-papiers
        document.execCommand('copy');

        // Supprimer l'élément textarea du DOM
        document.body.removeChild(textarea);

        addErrorMessage(`Url copié dans le presse-papiers`, 5000, '#396afc', null, promise?.images[indexUrlState].imageUrl)

    }

    const [shopWindow, setShopWindow] = useState(false);

    const contextMenuRef = useRef(null);

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setIsVisible(false);
                    setShopWindow(false);
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

    useOutsideAlerter(contextMenuRef);

    const newBookMark = async (value) => {
        if (!promiseIdentifiedUser) {
            return setHiddenConnection(true)
        }
        if (!value) {
            handleFavorite()
        }
        try {
            await axios.put(`${API_URL}api/eventv/new-bookmark/${idUrl}`,
                { groupId: idUrl },
                { withCredentials: true })
                .then(() => {
                    GetFileParamsFromAPI(idUrl)
                })
        } catch (error) {
            // Call the delete function with the ID of the item to be deleted if there is a limited access to a page
            console.log(error.response.data.message);
        }
    }

    const updateTags = async () => {
        setOptionTags(false)
        const contentStateJSON = JSON.stringify(editeTags);

        try {
            await axios.put(`${API_URL}api/eventv/file-params/update-tags/${idUrl}`,
                { tags: contentStateJSON },
                { withCredentials: true })
                .then(() => {
                    GetSomeBestAnnouncementFromAPI(editeTags)
                    GetSimilarFileFromAPI(editeTags)
                })
        } catch (error) {
            // Call the delete function with the ID of the item to be deleted if there is a limited access to a page
            setErrorLogin(error.response.data.message);
            setEditeTags(promise?.tags)
        }
    }


    useEffect(() => {
        if (running) {
            const timer = setInterval(() => {
                if (indexUrlState < promise?.images.length - 1) {
                    setIndexUrlState(prevIndexUrlState => prevIndexUrlState + 1);
                    setSwipAnimation(true)
                    setTimeout(() => {
                        setSwipAnimation();
                    }, swipAnimationTimer);
                    addErrorMessage(`5sec`, 5000, '#0077ff')
                } else {
                    //setCount(indexUrlState);
                    addErrorMessage(`Finish  panorama stop`, 5000, '#0077ff')
                    setIndexUrlState(indexUrlState)
                    setRunning(false);
                }
            }, 5000);

            return () => clearInterval(timer);
        }
    }, [indexUrlState, running, promise]);


    const stopCountdown = () => {
        addErrorMessage(running ? `Stop panorama` : `Start panorama all 5s`, 5000, '#0077ff')
        setIndexUrlState(indexUrlState);
        setRunning(!running);
    };


    const touchStartX = useRef(null);
    const touchStartY = useRef(null);
    const swipeTolerance = 8; // Tolérance de swipe

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
        if (!touchStartX.current || !touchStartY.current) {
            return;
        }

        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;
        const deltaX = touchStartX.current - touchEndX;
        const deltaY = touchStartY.current - touchEndY;

        // Vérifier si la différence de position X dépasse la tolérance de swipe
        if (Math.abs(deltaX) > swipeTolerance && Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 0) {
                // Swipe vers la gauche détecté
                //navigate({ search: `file_type=${file_typeUrl}&file=${idUrl}&index=${Math.min(indexUrl + 1, promise?.images.length)}` })
                setIndexUrlState(Math.min(indexUrlState + 1, promise?.images.length - 1))
                if (indexUrlState < promise?.images.length - 1) {
                    refImage.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
                    setSwipAnimation(true)
                    setTimeout(() => {
                        setSwipAnimation();
                    }, swipAnimationTimer);
                }
            } else {
                // Swipe vers la droite détecté
                navigate({ search: `file_type=${file_typeUrl}&file=${idUrl}&index=${Math.max(indexUrl - 1, 1)}` })
                setIndexUrlState(Math.max(indexUrlState - 1, 0))
                if (indexUrlState > 0) {
                    refImage.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
                    setSwipAnimation(true)
                    setTimeout(() => {
                        setSwipAnimation();
                    }, swipAnimationTimer);
                }
            }
        }

        touchStartX.current = null;
        touchStartY.current = null;
    };

    // Définir l'état local pour stocker les dimensions de l'image
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

    // Fonction pour récupérer les dimensions réelles de l'image
    const getImageSize = () => {
        const img = refImage.current;
        if (img) {
            const width = img.naturalWidth;
            const height = img.naturalHeight;
            setImageSize({ width, height });
        }
    };

    //useEffect(() => {
    //    if (promise) {
    //        getImageSize()
    //    }
    //}, [indexUrlState, idUrl, promise]);


    // function: Adding an item to indexedDB
    const handleAjouterElementBookMarkDB = async (el) => {
        try {
            const db = await IndexedDB();
            const nouvelElement = el;
            await add_BookMark_DB(db, nouvelElement)
                .then(() => {
                    // console.log('élément ajouté');
                })
        } catch (error) {
            console.error('Erreur lors de l ajout de l\'élément :', error);
        }
    };

    // Search for local documentation first.
    const Get_BookMark_DB = async () => {
        const db = await IndexedDB();
        get_BookMark_DB(db, parseInt(idUrl))
            .then(async (element) => {
                if (element) {
                    setPromiseReader(element)
                } else {
                    setPromiseReader()
                }
            })
            .catch((error) => {
                console.error('Erreur lors de la recherche de l\'élément :', error);
            });
    }

    // Search for local documentation first.
    const Del_BookMark_DB = async (id) => {
        const db = await IndexedDB();
        del_BookMark_DB(db, id)
            .then(async (element) => {
                if (element) {
                    setPromiseReader(element)
                } else {
                    setPromiseReader()
                }
            })
            .catch((error) => {
                console.error('Erreur lors de la recherche de l\'élément :', error);
            });
    }

    useEffect(() => {

        if (file_typeUrl !== 'Manga') {
            return;
        }
        if (idUrl) {
            Get_BookMark_DB()
        }
        if (startReader === false) {
            if (indexUrl > 0 && indexUrl + 1 < promise?.images.length) {
                const element = {
                    id: idUrl,
                    index: indexUrl
                }
                handleAjouterElementBookMarkDB(element)
            }



            if (indexUrl + 1 === promise?.images.length) {
                Del_BookMark_DB(idUrl)
            }
        }

    }, [promise, idUrl, indexUrl, startReader])


    const renderCardFilesWithAds = () => {
        const cardFilesWithAds = [];

        for (let i = 0; i < promiseSimilar?.length; i += 18) {
            const sliceEnd = Math.min(i + 18, promiseSimilar.length); // Pour éviter de dépasser la taille de promiseSimilar
            const cardFilesSlice = promiseSimilar.slice(i, sliceEnd);

            cardFilesWithAds.push(
                <React.Fragment key={i}>
                    <Card_files profile={promiseIdentifiedUser} promise={cardFilesSlice} />
                    {sliceEnd < promiseSimilar.length && <Pub pubType={'slide'} />}
                </React.Fragment>
            );
        }

        return cardFilesWithAds;
    };


    // const [resize, setResize] = useState(0);

    // corver image rezize with mouse wheele
    // const myFunction = (event) => {
    //     //event.preventDefault();
    //
    //     //const min = 0;
    //     //const max = 100;
    //     //let newSize;
    //
    //     if (event.deltaY > 0) {
    //         // newSize = parseInt(resize) + 1;
    //         //navigate({ search: `file_type=${file_typeUrl}&file=${idUrl}&index=${Math.min(indexUrl + 1, promise?.images.length)}` })
    //         setIndexUrlState(Math.min(indexUrlState + 1, promise?.images.length - 1))
    //     } else {
    //         // newSize = parseInt(resize) - 1;
    //         //navigate({ search: `file_type=${file_typeUrl}&file=${idUrl}&index=${Math.max(indexUrl - 1, 1)}` })
    //         setIndexUrlState(Math.max(indexUrlState - 1, 0))
    //     }
    //     
    //     //const value = Math.max(min, Math.min(max, Number(newSize)));
    //     setSwipAnimation(true)
    //     setTimeout(() => {
    //         setSwipAnimation();
    //     }, swipAnimationTimer);
    //     //setResize(value);
    // };
    const [isFunctionAllowed, setIsFunctionAllowed] = useState(true);

    const myFunction = (event) => {
        if (!isFunctionAllowed) {
            return; // Ne rien faire si la fonction n'est pas autorisée à s'exécuter
        }

        if (event.deltaY > 0) {
            // newSize = parseInt(resize) + 1;
            //navigate({ search: `file_type=${file_typeUrl}&file=${idUrl}&index=${Math.min(indexUrl + 1, promise?.images.length)}` })
            setIndexUrlState(Math.min(indexUrlState + 1, promise?.images.length - 1))
        } else {
            // newSize = parseInt(resize) - 1;
            //navigate({ search: `file_type=${file_typeUrl}&file=${idUrl}&index=${Math.max(indexUrl - 1, 1)}` })
            setIndexUrlState(Math.max(indexUrlState - 1, 0))
        }

        //const value = Math.max(min, Math.min(max, Number(newSize)));
        setSwipAnimation(true)
        setTimeout(() => {
            setSwipAnimation();
        }, swipAnimationTimer);

        // Désactive la fonction temporairement
        setIsFunctionAllowed(false);

        // Réactive la fonction après un délai de 1000 millisecondes (1 seconde)
        setTimeout(() => {
            setIsFunctionAllowed(true);
        }, 380);
    };

    const [isHovered, setIsHovered] = useState(false);
    const [seePic, setSeePic] = useState(false);
    const [seeFile, setSeeFile] = useState(false);
    const [addFavorite, setAddFavorite] = useState(null);

    const handleSeePic = () => {
        if (seePic) {
            return;
        }
        setSeePic(true)

        const timer = setTimeout(() => {
            // Actions à effectuer après le délai
            setSeePic(false)
        }, 3000); // Délai en millisecondes (ici 2 secondes)

        return () => clearTimeout(timer); // Nettoyage du timer lors du démontage du composant
    }
    const handleSeeFile = () => {
        if (seePic) {
            return;
        }
        setSeeFile(true)

        const timer = setTimeout(() => {
            // Actions à effectuer après le délai
            setSeeFile(false)
        }, 3000); // Délai en millisecondes (ici 2 secondes)

        return () => clearTimeout(timer); // Nettoyage du timer lors du démontage du composant
    }

    const handleFavorite = () => {
        if (addFavorite) {
            return;
        }
        setAddFavorite('#ea384d')

        const timer = setTimeout(() => {
            // Actions à effectuer après le délai
            setAddFavorite(null)
        }, 5000); // Délai en millisecondes (ici 2 secondes)

        return () => clearTimeout(timer); // Nettoyage du timer lors du démontage du composant
    }

    // setSeePic(!seePic)

    const handleMouseEnter = () => {
        setIsHovered(true)
    };

    const handleMouseLeave = () => {
        setIsHovered(false)
    };

    useEffect(() => {

        // Modification du titre de la page
        return () => {
            document.title = SystemName;
        }
    }, []);

    if (errorLogin) return (
        <>
            <PageNoFound err={403} error_message={errorLogin} />
        </>
    )

    return (
        <div className='main'>
            {location.hash === `#${promise?.user.pseudo}-accessDiamond` && <Subscription userId={promise?.user.id} sessionUser={promiseIdentifiedUser} />}
            {/*running && <RemoveScroll className='blanket open-element-page-melted' style={{ zIndex: 25000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img onClick={stopCountdown} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ height: '100%', width: 'max-content' }} src={promise?.images[count].imageUrl} alt="" />
    </RemoveScroll>*/}

            {isVisible &&
                <div className="contextMenu open-element-page-melted" ref={contextMenuRef} style={{ top: position.y, left: position.x }} data-theme={localTheme}>
                    <div onClick={copyCurrentUrl} className='button_option' style={{ justifyContent: 'start', height: 35 }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10, marginLeft: 10, color: '#ec1c24' }} icon={faClone} />{t('copyPageURL')}</div>
                    <div className='button_option' style={{ justifyContent: 'start', height: 35 }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10, marginLeft: 10, color: '#ec1c24' }} icon={faShare} />Share</div>
                    {promiseIdentifiedUser && <>
                        {parseInt(promiseIdentifiedUser?.user.id) === promise?.adminId && <div onClick={() => {
                            GetMyFileFromLocal(promise?.id)
                            setIsVisible(false)
                        }} className='button_option' style={{ justifyContent: 'start', height: 35 }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10, marginLeft: 10, color: '#ec1c24' }} icon={faPenToSquare} />{t('workspace')}</div>}
                    </>}
                    <Link onClick={() => {
                        setIsVisible(false)
                    }} target="_blank" to={`/${SystemName}-creative/page?${SystemName}-img=${promise?.images[indexUrlState].imageUrl}`} className='button_option' style={{ justifyContent: 'start', height: 35 }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10, marginLeft: 10, color: '#ec1c24' }} icon={faPencil} />Creative</Link>
                    <div onClick={() => {
                        handleDownload(promise?.images[indexUrlState].imageUrl)
                        setIsVisible(false)
                    }} className='button_option' style={{ justifyContent: 'start', height: 35 }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10, marginLeft: 10, color: '#ec1c24' }} icon={faDownload} />{t('download')}</div>
                    <div onClick={() => {
                        setOption(!option)
                        setIsVisible(false)
                    }} className='button_option' style={{ justifyContent: 'start', height: 35 }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10, marginLeft: 10, color: '#ec1c24' }} icon={faTriangleExclamation} />{t('problem')}</div>
                </div>}

            {option && <RemoveScroll className='blanket scrollbar' style={{ zIndex: 25000, display: 'flex', alignItems: 'start', justifyContent: 'center', top: 0, overflowY: 'auto' }} >
                <div className='menu_navbar open-element-page-melted' style={{ width: '100%', flexDirection: 'column', maxWidth: 900, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }} data-theme={localTheme}>


                    <h4>{t('Known_Issue')}<FontAwesomeIcon style={{ marginLeft: 5 }} icon={faExclamationTriangle} /></h4>
                    <div style={{ width: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img loading="lazy" src={promise?.images[indexUrlState].imageUrl}
                            style={{ objectFit: 'contain', margin: 5, borderRadius: 5, width: '90%', maxWidth: 500, height: 500 }} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                        <div className="input_text" style={{ width: '100%', height: 'auto' }} data-theme={localTheme}>
                            <Text_manage readOnly={true} />
                        </div>
                        <div style={{ marginBottom: 10, marginTop: 10 }}><div>0/{maxWordReport}</div></div>
                    </div>

                    <h4>Report a problem with this image : ({promise?.user.pseudo})</h4>
                    <div className='button_option_container' style={{ width: '90%', maxWidth: 800, marginBottom: 30 }} data-theme={localTheme}>
                        {false ? <div className='button_option' data-theme={localTheme}>Report a problem</div>
                            :
                            <div className='button_optionDisable' data-theme={localTheme}>Report a problem</div>}
                    </div>

                    <h4>Report a project-wide issue : ({promise?.user.pseudo})</h4>
                    <div className='button_option_container' style={{ width: '90%', maxWidth: 800, marginBottom: 30 }} data-theme={localTheme}>
                        {false ? <div className='button_option' data-theme={localTheme}>Report a problem</div>
                            :
                            <div className='button_optionDisable' data-theme={localTheme}>Report a problem</div>}
                    </div>

                    <h4>Report the project : ({SystemName})</h4>
                    <div className='button_option_container' style={{ width: '90%', maxWidth: 800 }} data-theme={localTheme}>
                        {false ? <div className='button_optionPic_v' data-theme={localTheme}>Report a problem</div>
                            :
                            <div className='button_optionDisable' data-theme={localTheme}>Report a problem</div>}
                    </div>

                    <div className='button_option_container' style={{ width: '100%', maxWidth: 300, marginTop: 20 }} data-theme={localTheme}>
                        <div className='button_option' onClick={() => {
                            setOption(!option)
                        }} data-theme={localTheme}>{t("cancel")}</div>
                    </div>
                </div>
            </RemoveScroll>}

            {location.hash === `#${promise?.groupsfile?.name}-library` &&
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

                    <div className='cter_sect'>
                        <div className='ctent_arti' style={{ paddingTop: 10, marginTop: 30 }} data-theme={localTheme}>
                            <img style={{ borderRadius: '100%', height: 150, marginRight: 10, marginLeft: 10 }} title={t('library')} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} src={promise?.groupsfile.imageUrl} alt='' />
                            <h3>{promise?.groupsfile.name}</h3>

                            <div style={{ width: '90%', maxWidth: 1000, textAlign: 'center', marginTop: 10, marginBottom: 20 }} data-theme={localTheme}>
                                <Text_manage data={promise?.groupsfile.data} />
                            </div>


                            <div style={{ width: '95%', display: 'flex', alignItems: 'center' }}>
                                <h3 data-theme={localTheme}>- {t('library')}</h3>
                            </div>
                            <Card_files profile={promiseIdentifiedUser} promise={promiseGroupFile} />
                        </div>
                    </div>
                </RemoveScroll>}

            {location.hash === `#${promise?.user.pseudo}-files` &&
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

                    <div className='cter_sect'>
                        <div className='ctent_arti' style={{ paddingTop: 10, marginTop: 30 }} data-theme={localTheme}>
                            <div style={{ width: '98%', display: 'flex', alignItems: 'center' }}>
                                <h3 data-theme={localTheme}>- Proposé par {promise?.user.pseudo}</h3>
                            </div>

                            <Card_files profile={promiseIdentifiedUser} promise={promiseUserFile} />
                        </div>
                    </div>
                </RemoveScroll >}

            {optionTags && <div className='blanket open-element-page-melted' style={{ zIndex: 21000, display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', top: 0 }} >
                <RemoveScroll removeScrollBar={false} className='menu_navbar scrollbar open-element-page-melted' style={{ width: '100%', flexDirection: 'column', maxWidth: 1000, overflowY: 'auto', alignItems: 'center', background: 'none' }} data-theme={localTheme}>
                    <div className='cter_sect'>
                        <div className='ctent_artiMiniProfil' data-theme={localTheme}>
                            <h3>Suggest tags to {promise?.user.pseudo}</h3>
                            <div style={{ marginTop: 10, width: '90%', display: 'flex', justifyContent: 'space-between', color: promise?.tags.length > 10 ? 'red' : '#00aa00', borderBottom: `1px solid ${promise?.tags.length > 10 ? 'red' : '#00aa00'}` }}>{t('addTags')} : <span style={{ fontWeight: 800 }} translate='no'><span>{promise?.tags.length || 0}</span>/10</span></div>

                            <div style={{ width: '90%', paddingTop: 20 }}>
                                <div>{t('tagsFound')} :</div>
                            </div>

                            <div style={{ width: '90%', display: 'flex', flexWrap: 'wrap', marginTop: 50 }} data-theme={localTheme}>
                                {promiseIdentifiedUser && <>
                                    {promiseIdentifiedUser?.user.id !== promise?.adminId ? <>{editeTags?.map((el, index) => (
                                        <div onClick={el.userId !== adminId ? () => { handleRemoveTag(el) } : null}
                                            style={{
                                                color: el.userId === adminId ? 'grey' : '',
                                                textDecoration: el.userId === adminId ? 'none' : '',
                                                cursor: el.userId === adminId ? 'default' : ''
                                            }} className='tagsManage' key={index} data-theme={localTheme}>
                                            {el.tag}<FontAwesomeIcon style={{ marginLeft: 5, color: el.userId !== promiseIdentifiedUser?.user.id ? 'grey' : '#00aa00' }} icon={el.userId === adminId ? faLock : faUserTag} />
                                        </div>
                                    ))}</>
                                        :
                                        <>{editeTags?.map((el, index) => (
                                            <div onClick={() => { handleRemoveTag(el) }}
                                                className='tagsManage' key={index} data-theme={localTheme}>
                                                {el.tag}<FontAwesomeIcon style={{ marginLeft: 5, color: el.userId !== promiseIdentifiedUser?.user.id ? 'grey' : '#00aa00' }} icon={el.userId === adminId ? faUser : faUserTag} />
                                            </div>
                                        ))}</>}</>}
                            </div>

                            <div style={{ display: 'flex', width: '98%', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                <input autoFocus={true} maxLength={31} onKeyDown={handleChangeTags} onChange={(e) => { handleChangeTags(e) }} style={{ marginTop: 20, resize: 'none' }} className='input_text' placeholder={`${t('addTags')}: #...`} type="text" name="tag" id="tag" value={textTags} data-theme={localTheme} />
                            </div>
                            <div className='button_option_container' style={{ width: '100%', maxWidth: 500, marginTop: 20 }} data-theme={localTheme}>
                                <div className='button_option' onClick={() => {
                                    setOptionTags(false)
                                    setEditeTags(promise?.tags)
                                }} data-theme={localTheme}>{t("cancel")}</div>
                                {promise?.tags.length !== editeTags?.length && <div onClick={updateTags} className='button_optionBlue'><FontAwesomeIcon style={{ marginRight: 5 }} icon={faCloudArrowUp} />{t("save")}</div>}
                            </div>
                        </div>
                    </div>
                </RemoveScroll>
            </div>}

            {systemDetectMobile && <div className='cter_sect' style={{ marginTop: 20 }}>
                <div className='ctent_arti' data-theme={localTheme}>
                    <img src={promise?.user.imageUrl}
                        loading="lazy" onClick={() => { navigate(`/profile/${promise?.user.id}/home?type=Illustrations`) }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='Profile_picture hovercursor shadowbox' style={{ marginTop: 20, objectFit: 'cover', objectPosition: `50% ${20}%`, width: 120, height: 120, marginBottom: 10, cursor: 'pointer' }} alt="" />
                    <h3 style={{ margin: 0 }}>{promise?.user.pseudo}</h3>

                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%', maxWidth: 200 }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <div style={{ marginRight: 5, marginTop: 5 }} className='badge_System_color'>{SystemName}</div>
                            <div style={{ marginRight: 5, marginTop: 5 }} className='badgeShop'>{t("accessPass")}</div>
                            <div style={{ marginRight: 5, marginTop: 5 }} className='badgeColoring textLoto'>Game</div>
                        </div>
                    </div>

                    <Subscription_management userId={promise?.user.id} />

                    <Pub pubType={'banner'} />
                </div>
            </div>}

            <div className='cter_sect' style={{ marginTop: 20 }}>
                <div className='ctent_arti' style={{ overflow: 'visible', background: 'none' }} data-theme={localTheme}>
                    <div className='rowDoubleposition' style={{ width: '98%', display: 'flex', justifyContent: 'space-between' }}>
                        {!systemDetectMobile &&
                            <div className='rowDoublepositionContent' style={{ width: '10%', minWidth: 155, background: 'none', justifyContent: 'center', alignItems: 'center', height: '80vh', maxHeight: 850, zIndex: 100 }} data-theme={localTheme}>
                                {parseInt(indexUrlState + 1)}/{promise?.images.length}
                                <div className="scrollbar" style={{ overflow: 'hidden', overflowY: 'scroll', scrollSnapType: !running ? seePic ? 'y mandatory' : 'y' : 'y mandatory' }}>
                                    {promise?.images.map((img, index) => (
                                        <div ref={el => itemRefs.current[index] = el} onClick={indexUrlState !== index ? () => {
                                            setIndexUrlState(index)
                                        } : null} className="hovercursor" key={index} style={{ scrollSnapAlign: !running ? isHovered ? index === indexUrlState ? 'center' : 'none' : seePic ? index === indexUrlState ? 'center' : 'none' : 'none' : index === indexUrlState ? 'center' : 'none' }}>
                                            <img onClick={() => {
                                                setNavbarVisible(false)
                                                if (indexUrlState && indexUrlState < promise?.images.length) {
                                                    setSwipAnimation(true)
                                                    setTimeout(() => {
                                                        setSwipAnimation();
                                                    }, swipAnimationTimer);
                                                }
                                            }}
                                                onContextMenu={(e) => {
                                                    e.preventDefault()
                                                    handleFullScreen({ img: promise?.images[index].imageUrl })
                                                }} src={img.imageUrl}
                                                style={{ objectFit: 'cover', objectPosition: `50% 10%`, margin: '10px 20px 10px 10px', borderRadius: 5, cursor: 'pointer', height: 110, width: 110, border: indexUrlState === index ? '1px solid #0077ff' : '1px solid transparent', padding: 3, borderRadius: 10 }} alt="" onMouseDown={(e) => e.preventDefault()} />
                                            <div style={{ display: 'flex' }}>
                                                <div className='badge' style={{ marginRight: 10, borderRadius: 5 }} data-theme={localTheme}><FontAwesomeIcon icon={faImage} /></div>
                                                {img.limited === 2 && <div className='badgeShop' style={{ marginRight: 10 }} translate='no'><FontAwesomeIcon icon={faWandSparkles} /></div>}
                                                {img.limited === 1 && <div className='badgeColoring' style={{ marginRight: 10 }} translate='no'><FontAwesomeIcon icon={faGem} /></div>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ width: '100%', display: 'flex', alignItems: 'end', justifyContent: 'center', flexDirection: 'column' }}>
                                    <div onClick={() => {
                                        handleSeePic()
                                    }} className='buttonCircle' style={{ width: 'max-content', height: 25, marginTop: 10, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, padding: '0px 10px 0px 10px' }} data-theme={localTheme}>
                                        see picture<FontAwesomeIcon style={{ marginLeft: 5 }} className={seePic ? 'rotate' : 'boxBounce'} icon={seePic ? faRefresh : faAngleDoubleUp} />
                                    </div>
                                    {promise?.groupsfile && <div onClick={() => {
                                        addSearchToUrl(`#${promise?.groupsfile.name}-library`)
                                    }} className='buttonCircle' style={{ width: 'max-content', height: 25, marginTop: 10, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, padding: '0px 10px 0px 10px' }} data-theme={localTheme}>
                                        {t('library')}<FontAwesomeIcon style={{ marginLeft: 5 }} icon={faBook} />
                                    </div>}
                                </div>
                            </div>}
                        <div className='rowDoublepositionContentFile' style={{ padding: 0, borderRadius: 0, background: 'none', justifyContent: 'space-between', alignItems: 'center', height: 'max-content', overflow: 'visible' }} data-theme={localTheme}>
                            {startReader ? <>
                                <img style={{ height: 380, borderRadius: 10, marginTop: 10 }} src={promise?.images[0]?.imageUrl ?? SystemLogo} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} alt="" />
                                <div className='button_option_container_free' style={{ display: 'flex', width: '100%', maxWidth: 300, marginTop: 10, flexDirection: 'column' }} data-theme={localTheme}>
                                    {!promiseReader ? <>
                                        <div onClick={() => { setStartReader(false) }} className='button_optionPurple' data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 5 }} icon={faBook} /> Commencer à lire</div>
                                    </> : <>
                                        <div onClick={() => {
                                            Del_BookMark_DB(idUrl)
                                            navigate({ search: `file_type=${file_typeUrl}&file=${idUrl}&index=0` })
                                            setStartReader(false)
                                        }} className='button_optionPurple' data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 5 }} icon={faRefresh} /> Recommencer la lecture</div>
                                        <div onClick={() => {
                                            navigate({ search: `file_type=${file_typeUrl}&file=${promiseReader?.id}&index=${promiseReader?.index}` })
                                            setStartReader(false)
                                        }} className='button_option' data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 5 }} icon={faClock} /> Continuer la lecture à {promiseReader?.index + 1}/{promise?.images.length}</div>
                                    </>}
                                </div>
                                {promiseParams && <h3>{promiseParams?.file.name.charAt(0).toUpperCase() + promiseParams?.file.name.slice(1)}</h3>}
                                <div className='scrollbar' style={{ width: '90%', maxHeight: 150, overflow: 'auto' }}>
                                    <Text_manage data={promiseParams?.file.dataDescription} />
                                </div>
                            </> :
                                <>
                                    {/*<Palette src={promise?.images[indexUrlState].imageUrl} crossOrigin="anonymous" format="hex" colorCount={4}>
                                        {({ data, loading }) => {
                                            if (loading) return spinner();
                                            return (
                                                <div>
                                                    Palette:
                                                    <ul>
                                                        {data?.map((color, index) => (
                                                            <li key={index} style={{ color: color }}>
                                                                <strong>{color}</strong>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            );
                                        }}
                                    </Palette>*/}
                                    <Color src={promise?.images[indexUrlState].imageUrl} crossOrigin="anonymous" format="hex">
                                        {({ data }) => {
                                            return (
                                                <>
                                                    <RemoveScroll enabled={isHovered} removeScrollBar={false} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10, height: '80vh', overflow: 'visible' }}>
                                                        <img onClick={() => { handleFullScreen({ img: promise?.images[indexUrlState].imageUrl }) }}
                                                            onTouchStart={handleTouchStart}
                                                            onTouchMove={handleTouchMove}
                                                            onContextMenu={handleContextMenu}
                                                            onWheel={myFunction}
                                                            onMouseEnter={handleMouseEnter}
                                                            onMouseLeave={handleMouseLeave}
                                                            onLoad={getImageSize}
                                                            ref={refImage} className={swipAnimation === true ? 'image-container-animation' : ''}
                                                            src={promise?.images[indexUrlState]?.imageUrl ?? SystemLogo} style={{ boxShadow: animationSelect !== 'eco' ? isHovered ? `${addFavorite ? addFavorite : data} 0px 100px 300px 200px` : `${addFavorite ? addFavorite : data} 0px 100px 300px 150px` : 'none', height: 'max-content', maxHeight: '80vh', width: '98%', borderRadius: 5, cursor: 'pointer', transition: '1s' }} alt="" onMouseDown={(e) => e.preventDefault()} />
                                                    </RemoveScroll>
                                                </>
                                            );
                                        }}
                                    </Color>
                                    <div style={{ background: 'rgba(0, 0, 0, 0.8)', padding: 3, color: 'white', borderRadius: 3, zIndex: 100 }}>{imageSize.width}<FontAwesomeIcon style={{ marginLeft: 5 }} icon={faLeftRight} /> | {imageSize.height}<FontAwesomeIcon style={{ marginLeft: 5 }} icon={faUpDown} /></div>

                                    <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginTop: 10, zIndex: 100 }}>
                                        {!running && <>{promise?.images.length > 1 && <div className='button_option_container' style={{ display: 'flex', width: '100%', maxWidth: 200, marginRight: 40, marginLeft: 10 }} data-theme={localTheme}>
                                            <div onClick={() => {
                                                setNavbarVisible(false)
                                                setIndexUrlState(Math.max(indexUrlState - 1, 0))
                                                if (indexUrlState) {
                                                    //refImage.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
                                                    //itemRefs.current[indexUrlState - 1]?.scrollIntoView({ block: 'center' })
                                                    setSwipAnimation(true)
                                                    //itemRefs.current[indexUrl2nd]?.scrollIntoView({ block: 'center', inline: 'nearest' });
                                                    setTimeout(() => {
                                                        setSwipAnimation();
                                                    }, swipAnimationTimer);
                                                }
                                            }} className={indexUrlState ? 'button_option' : 'button_optionDisable'} data-theme={localTheme}><FontAwesomeIcon icon={faAngleLeft} /></div>

                                        </div>}</>}

                                        <div style={{ background: 'rgba(0, 0, 0, 0.8)', padding: 3, color: 'white', borderRadius: 3 }}>
                                            {parseInt(indexUrlState + 1)}/{promise?.images.length || 1}
                                        </div>

                                        {!running && <>{promise?.images.length > 1 && <div className='button_option_container' style={{ display: 'flex', width: '100%', maxWidth: 200, marginLeft: 40, marginRight: 10 }} data-theme={localTheme}>
                                            <div onClick={() => {
                                                setNavbarVisible(false)
                                                setIndexUrlState(Math.min(indexUrlState + 1, promise?.images.length - 1))
                                                if (indexUrlState < promise?.images.length - 1) {
                                                    //refImage.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
                                                    //itemRefs.current[indexUrlState + 1]?.scrollIntoView({ block: 'center' })
                                                    //itemRefs.current[indexUrl2nd]?.scrollIntoView({ block: 'start', inline: 'nearest' });
                                                    setSwipAnimation(true)
                                                    setTimeout(() => {
                                                        setSwipAnimation();
                                                    }, swipAnimationTimer);
                                                }
                                            }} className={indexUrlState < promise?.images.length - 1 ? 'button_option' : 'button_optionDisable'} data-theme={localTheme}><FontAwesomeIcon icon={faAngleRight} /></div>
                                        </div>}</>}
                                    </div>
                                </>}
                        </div>

                        {!systemDetectMobile && <div className='rowDoublepositionContent' style={{ padding: 0, borderRadius: 0, width: '20%', background: 'none', minWidth: 342, height: 'max-content' }} data-theme={localTheme}>

                            {/*<img src={promise?.user.imageUrl}
                                loading="lazy" onClick={() => { navigate(`/profile/${promise?.user.id}/home?type=Illustrations`) }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='Profile_picture hovercursor shadowbox' style={{ marginTop: 20, objectFit: 'cover', objectPosition: `50% ${20}%`, width: 120, height: 120, marginBottom: 10, cursor: 'pointer' }} alt="" />*/}

                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', zIndex: 100, marginBottom: 10 }}>
                                <img style={{ width: 100, height: 100, cursor: 'pointer' }} className='Profile_picture' onClick={() => { navigate(`/profile/${promise?.user.id}/home?type=Illustrations`) }} src={promise?.user.imageUrl} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />


                                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
                                    <h3 style={{ margin: 0 }}>{promise?.user.pseudo}</h3>
                                    {promiseIdentifiedUser && promise?.user.id !== promiseIdentifiedUser?.user.id ? <Subscription_management userId={promise?.user.id} />
                                        :
                                        <>
                                            <div className='button_option_container_free shadowbox' style={{ width: '100%', display: 'flex', marginTop: 10, maxWidth: 200 }} data-theme={localTheme}>
                                                <Link target="_blank" to={`/${SystemName}-creative/page?${SystemName}-file=${promise?.id}`} className='button_option' data-theme={localTheme}>Creative<FontAwesomeIcon style={{ marginLeft: 5 }} icon={faPencil} /></Link>
                                            </div>
                                            <div className='button_option_container_free shadowbox' style={{ width: '100%', display: 'flex', marginTop: 10, maxWidth: 200 }} data-theme={localTheme}>
                                                <div onClick={() => { GetMyFileFromLocal(promise?.id) }} className='button_option' data-theme={localTheme}>{t('workspace')}<FontAwesomeIcon style={{ marginLeft: 5 }} icon={faPenToSquare} /></div>
                                            </div>
                                        </>}
                                </div>
                            </div>

                            <div style={{ width: '100%', maxWidth: 400, display: 'flex', justifyContent: 'start', flexDirection: 'column', alignItems: 'center', zIndex: 100 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 10, width: '100%', maxWidth: promiseUserFileMin?.length === 3 ? 350 : 240 }}>
                                    {promiseUserFileMin?.map((img, index) => (
                                        <img className="hovercursor" style={{ height: 95, borderRadius: 5, width: 110, objectFit: 'cover', opacity: idUrl == img.id ? 0.5 : 1, marginLeft: 2, marginRight: 2 }} src={img.miniature}
                                            onClick={img.id !== idUrl ? () => { navigate({ search: `file_type=${file_typeUrl}&file=${img.id}&index=1` }) } : null}
                                            alt="" key={index} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                                    ))}
                                </div>
                                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                                    <div /*onClick={() => {
                                    refMoreByUser.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
                                }}*/ onClick={() => { addSearchToUrl(`#${promise?.user.pseudo}-files`) }} className='buttonCircle' style={{ width: 'max-content', height: 25, marginTop: 10, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, padding: '0px 10px 0px 10px' }} data-theme={localTheme}>
                                        {t('seeMore')} ...
                                    </div>
                                </div>
                            </div>

                            <Pub pubType={'banner'} />
                            <Pub />

                        </div>}
                    </div>

                    <div className='nav_bar_scnd scrollbar' style={{ borderRadius: 0, flexDirection: 'row', width: '100%', overflow: 'auto', paddingTop: 10, background: 'none', zIndex: 100 }} data-theme={localTheme}>
                        <div onClick={() => { newBookMark(promiseParams?.BookmarksId) }} className={promiseParams?.BookmarksId ? 'button_optionHeart' : 'button_option'} style={{ width: 50, minWidth: 50, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}>
                            <FontAwesomeIcon icon={faHeart} />
                        </div>
                        {promise?.groupsfile && <img onClick={() => { addSearchToUrl(`#${promise?.groupsfile.name}-library`) }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='Profile_picture_nav hovercursor' title={t('library')} style={{ marginLeft: 5 }} src={promise?.groupsfile.imageUrl} alt="" />}
                        <div onClick={() => { handleDownload(promise?.images[indexUrl].imageUrl) }} className='button_option' style={{ width: 50, minWidth: 50, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}><FontAwesomeIcon icon={faDownload} /></div>
                        <div className='button_option' style={{ width: 50, minWidth: 50, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}><FontAwesomeIcon icon={faShare} /></div>
                        <div className='button_option' style={{ width: 50, minWidth: 50, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}><FontAwesomeIcon icon={faLink} /></div>
                        {file_typeUrl !== 'Manga' && <>{!systemDetectMobile && <div onClick={stopCountdown} className='button_option' style={{ width: 50, minWidth: 50, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}><FontAwesomeIcon style={{ color: !running ? '' : 'red' }} icon={!running ? faPlay : faStop} /></div>}</>}
                        {promise?.type === 'Manga' && <>{!showPages && <div onClick={() => { setShowPages(true) }} className='button_option' style={{ width: 50, minWidth: 50, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5, color: 'red' }} data-theme={localTheme}><FontAwesomeIcon icon={faEyeSlash} /></div>}</>}
                        {!systemDetectMobile && <div className='button_option' style={{ width: 50, minWidth: 50, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}><FontAwesomeIcon icon={faMinimize} /></div>}
                        {promiseIdentifiedUser && <>{parseInt(promiseIdentifiedUser?.user.id) === promise?.adminId && <div onClick={() => { GetMyFileFromLocal(promise?.id) }} className='button_option' style={{ width: 50, minWidth: 50, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}><FontAwesomeIcon icon={faPenToSquare} /></div>}</>}
                        {promise?.diamond && <div onClick={() => { addSearchToUrl(`#${promise?.user.pseudo}-accessDiamond`) }} className='button_optionColoring' style={{ width: 200, minWidth: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 5 }} icon={faGem} />{t('subscription')}</div>}
                        {promise?.shop && <div onClick={() => {
                            setShopWindow(true)
                        }} className='button_optionColoringBlue' style={{ width: 200, minWidth: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 5 }} icon={faWandSparkles} />{t('accessPass')}</div>}
                        <div onClick={() => {
                            setOption(!option)
                        }} className='button_optionRed' style={{ width: 200, minWidth: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 5 }} icon={faExclamationTriangle} />{t('problem')}</div>
                        {promiseIdentifiedUser && <>{promiseIdentifiedUser?.user.isAdmin === true && <div onClick={() => { setPromiseFileStatistical(promise?.id) }} className='button_optionGreen' style={{ width: 200, minWidth: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 5 }} icon={faUserSecret} />{t('admin')}</div>}</>}
                    </div>

                    {showPages ? <>
                        <div className='button_option_container_free' style={{ width: 300, marginTop: 10, zIndex: 100 }} data-theme={localTheme}>
                            <div onClick={startReader ? null : () => { setShowPages(false) }} style={{ transition: '0ms' }} className={startReader ? 'button_optionDisable' : 'button_optionBlue'} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 5 }} icon={faEye} /> Afficher les pages</div>
                        </div>
                    </> :
                        <>
                            {/*<div style={{ width: '98%', height: '2px', background: 'transparent', marginBottom: 5 }}>
                                <div style={{ height: '100%', width: `${scrollProgress}%`, background: '#ec1c24' }}></div>
                    </div>*/}
                            <div style={{ display: 'flex', width: '100%', zIndex: 100 }}>
                                {/*promise?.groupsfile &&
                                <div className="hovercursor displayPc">
                                    <img onClick={() => { addSearchToUrl(`#${promise?.groupsfile.name}-library`) }} style={{ borderRadius: '100%', height: 150, marginRight: 10, marginLeft: 10, cursor: 'pointer' }} title={t('library')} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} src={promise?.groupsfile.imageUrl} alt='' />
                                    <div style={{ textAlign: 'center', marginBottom: 5 }}>
                                        <FontAwesomeIcon style={{ marginRight: 5, color: '#ec1c24' }} icon={faLayerGroup} />
                                        {t('library')}</div>
                    </div>*/}
                                <div ref={refScroll} className='scrollbar' style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', overflowY: 'hidden', alignItems: 'center', width: '98%', paddingBottom: 5 }}>

                                    {/*promise?.groupsfile &&
                                    <div className="hovercursor displayMoblie">
                                        <img onClick={() => { addSearchToUrl(`#${promise?.groupsfile.name}-library`) }} style={{ borderRadius: '100%', height: 150, marginRight: 10, marginLeft: 10, cursor: 'pointer' }} title={t('library')} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} src={promise?.groupsfile.imageUrl} alt='' />
                                        <div style={{ textAlign: 'center', marginBottom: 5 }}>
                                            <FontAwesomeIcon style={{ marginRight: 5, color: '#ec1c24' }} icon={faLayerGroup} />
                                            {t('library')}</div>
                </div>*/}

                                    {/*promise?.images.map((img, index) => (
                                        <div onClick={indexUrl2nd !== index ? () => {
                                            navigate({ search: `file_type=${file_typeUrl}&file=${idUrl}&index=${index + 1}` })
                                        } : null} className="hovercursor" key={index}>
                                            <img onClick={() => {
                                                setNavbarVisible(false)
                                                if (indexUrl2nd && indexUrl2nd < promise?.images.length) {
                                                    setSwipAnimation(true)
                                                    setTimeout(() => {
                                                        setSwipAnimation();
                                                    }, swipAnimationTimer);
                                                }
                                            }}
                                                onContextMenu={(e) => {
                                                    e.preventDefault()
                                                    handleFullScreen({ img: promise?.images[index + 1].imageUrl })
                                                }} src={img.imageUrl}
                                                style={{ objectFit: 'cover', objectPosition: `50% 10%`, margin: 5, borderRadius: 5, cursor: 'pointer', height: 180, width: 180, opacity: indexUrl2nd === index ? 0.6 : 1 }} alt="" onMouseDown={(e) => e.preventDefault()} />
                                            <div style={{ display: 'flex' }}>
                                                <div className='badge' style={{ marginRight: 10, borderRadius: 5 }} data-theme={localTheme}><FontAwesomeIcon icon={faImage} /></div>
                                                {img.limited === 2 && <div className='badgeShop' style={{ marginRight: 10 }} translate='no'><FontAwesomeIcon icon={faWandSparkles} /></div>}
                                                {img.limited === 1 && <div className='badgeColoring' style={{ marginRight: 10 }} translate='no'><FontAwesomeIcon icon={faGem} /></div>}
                                            </div>
                                        </div>
                                    ))*/}
                                </div>

                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                    <div className='scrollbar' style={{ display: 'flex', overflowX: 'scroll', alignItems: 'center', width: '98%', scrollSnapType: seeFile ? 'x mandatory' : 'x' }}>
                                        <Card_articles_side promise={promiseUserFile} promiseRefs={idUrl} seeFile={seeFile} />
                                    </div>
                                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                                        <div onClick={() => { handleSeeFile() }} className='buttonCircle' style={{ width: 'max-content', height: 25, marginTop: 10, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, padding: '0px 10px 0px 10px' }} data-theme={localTheme}>
                                            see file<FontAwesomeIcon style={{ marginLeft: 5 }} className={seeFile ? 'rotate' : 'boxBounce'} icon={seeFile ? faRefresh : faAngleDoubleUp} />
                                        </div>
                                        <div onClick={() => { addSearchToUrl(`#${promise?.user.pseudo}-files`) }} className='buttonCircle' style={{ width: 'max-content', height: 25, marginTop: 10, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, padding: '0px 10px 0px 10px' }} data-theme={localTheme}>
                                            {t('seeMore')} ...
                                        </div>
                                    </div>
                                </div>
                                {/*systemDetectMobile && <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                            <div onClick={newBookMark} style={{ height: 40, width: 40 }} className={promiseParams?.BookmarksId ? 'buttonCircleBlue' : 'buttonCircle'} data-theme={localTheme}>
                                <FontAwesomeIcon icon={faBookmark} />
                            </div>
                            <div onClick={() => { handleDownload(promise?.images[indexUrl].imageUrl) }} style={{ height: 40, width: 40 }} className='buttonCircle' data-theme={localTheme}>
                                <FontAwesomeIcon icon={faDownload} />
                            </div>
                            <div onClick={stopCountdown} className='buttonCircle' style={{ height: 40, width: 40, marginBottom: 5 }} data-theme={localTheme}>
                                {running ? <FontAwesomeIcon icon={faPauseCircle} /> : <FontAwesomeIcon icon={faPlayCircle} />}
                            </div>
                            <div className='buttonCircleRed' onClick={() => {
                                setOption(!option)
                            }} style={{ height: 40, width: 40 }} data-theme={localTheme}>
                                <FontAwesomeIcon icon={faTriangleExclamation} />
                            </div>
                        </div>*/}
                            </div>
                        </>}


                    {/*systemDetectMobile && <div style={{ display: 'flex', marginTop: 5, width: '100%', justifyContent: 'end', alignItems: 'center' }} data-theme={localTheme}>
                        {promiseIdentifiedUser && <>{promiseIdentifiedUser?.user.isAdmin === true && <div className='buttonCircleGreen' style={{ height: 40, width: 40, marginBottom: 5 }} data-theme={localTheme}>
                            <FontAwesomeIcon icon={faUserSecret} />
                        </div>}</>}
                        {promise?.shop && <div onClick={() => {
                            setShopWindow(true)
                        }} className='buttonCircleColoringBlue' style={{ height: 40, width: 40, marginBottom: 5 }} data-theme={localTheme}>
                            <FontAwesomeIcon icon={faWandSparkles} />
                        </div>}
                        {promise?.diamond && <div onClick={() => { addSearchToUrl(`#${promise?.user.pseudo}-accessDiamond`) }} className='buttonCircleColoring' style={{ height: 40, width: 40, marginBottom: 5 }} data-theme={localTheme}>
                            <FontAwesomeIcon icon={faGem} />
                        </div>}
                        {promiseIdentifiedUser && <>{parseInt(promiseIdentifiedUser?.user.id) === promise?.adminId &&
                            <div onClick={() => { GetMyFileFromLocal(promise?.id) }} style={{ height: 40, width: 40, marginBottom: 5 }} className='buttonCircle' data-theme={localTheme}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </div>}</>}
                        </div>*/}

                    <div style={{ width: '98%', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap-reverse' }}>

                        <div style={{ width: '100%', maxWidth: systemDetectMobile ? 500 : '50%', display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                            {promiseParams && <h3>{promiseParams?.file.name.charAt(0).toUpperCase() + promiseParams?.file.name.slice(1)}</h3>}
                            <div style={{ display: 'flex', height: 22 }}>
                                <div className="badgeBlue" style={{ marginRight: 5 }}>{promise?.type}</div>
                                <div className='badge' style={{ borderRadius: 5, marginRight: 5, display: 'flex', alignItems: 'center' }} data-theme={localTheme}>{promise?.images.length}
                                    <FontAwesomeIcon style={{ fontSize: 12, marginLeft: 5 }} icon={faImages} />
                                </div>
                                {promise?.adult == 1 && <div className='adult' style={{ marginRight: 5 }} translate='no'>{NSFW}</div>}
                                {promise?.ai == 1 && <div className='AI' style={{ marginRight: 5 }} translate='no'>AI</div>}

                                {promise?.shop == 1 && <div className='badgeShop' style={{ marginRight: 5 }}>{<FontAwesomeIcon icon={faWandSparkles} />}</div>}
                                {promise?.diamond === true && <div className='badgeColoring' style={{ marginRight: 5 }}>{<FontAwesomeIcon icon={faGem} />}</div>}
                            </div>

                            <div className='scrollbar' style={{ width: '100%', height: '100%', maxHeight: 200, overflow: 'auto', marginTop: 10, marginBottom: 20 }} data-theme={localTheme}>
                                <Text_manage data={promiseParams?.file.data} />
                            </div>

                            <div style={{ color: 'grey', fontSize: 13 }}>
                                <FontAwesomeIcon style={{ marginRight: 5, marginLeft: 5, color: '#ea384d' }} icon={faHeart} />
                                {promiseParams?.file.bookMarks},
                                <FontAwesomeIcon style={{ marginRight: 5, marginLeft: 5, color: '#396afc' }} icon={faEye} />
                                {promiseParams?.file.view}
                            </div>

                            <div style={{ color: 'grey', fontSize: 13 }}>
                                <FontAwesomeIcon style={{ marginRight: 5 }} icon={faPen} />
                                {dayjs(promiseParams?.file.dateRework).add(0, 'hour').locale('fr').fromNow()},
                                <FontAwesomeIcon style={{ marginRight: 5, marginLeft: 5 }} icon={faCloudArrowUp} />
                                {dayjs(promiseParams?.file.createdAt).format('DD/MM/YYYY')}
                            </div>
                        </div>

                        {systemDetectMobile ? <div style={{ width: '100%', maxWidth: 400, display: 'flex', justifyContent: 'start', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ width: '100%' }}>- {promise?.type} next:</div>
                            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 10, width: '100%', maxWidth: promiseUserFileMin?.length === 3 ? 350 : 240 }}>
                                {promiseUserFileMin?.map((img, index) => (
                                    <img className="hovercursor" style={{ height: 95, borderRadius: 5, width: 110, objectFit: 'cover', opacity: idUrl == img.id ? 0.5 : 1, marginLeft: 2, marginRight: 2 }} src={img.miniature}
                                        onClick={img.id !== idUrl ? () => { navigate({ search: `file_type=${file_typeUrl}&file=${img.id}&index=0` }) } : null}
                                        alt="" key={index} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                                ))}
                            </div>
                            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                                <div onClick={() => { addSearchToUrl(`#${promise?.user.pseudo}-files`) }} className='buttonCircle' style={{ width: 'max-content', height: 25, marginTop: 10, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, padding: '0px 10px 0px 10px' }} data-theme={localTheme}>
                                    {t('seeMore')} ...
                                </div>
                            </div>
                        </div>
                            :
                            <div style={{ width: '100%', maxWidth: systemDetectMobile ? 500 : '50%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ width: '98%', maxWidth: 1200 }}>{t('tagsFound')} :</div>
                                <div style={{ width: '98%', maxWidth: 1200, display: 'flex', flexWrap: 'wrap', marginTop: 20 }} data-theme={localTheme}>
                                    {editeTags?.length ? <>{editeTags?.map((el) => (
                                        <Link to={'*'} style={{ color: '#396afc', marginLeft: 10, marginRight: 10 }} key={el.tag} data-theme={localTheme}>
                                            {el.tag}
                                        </Link>
                                    ))}</>
                                        :
                                        <>
                                            <div style={{ color: 'grey' }}>{t('noTagsFound')}</div>
                                        </>}
                                    {promiseIdentifiedUser && <>
                                        {promise?.allowUserEditTag ? <div onClick={() => { setOptionTags(true) }} className='buttonCircle' style={{ width: 25, height: 25 }} data-theme={localTheme}>
                                            <FontAwesomeIcon style={{ fontSize: 13 }} icon={faPlus} />
                                        </div>
                                            :
                                            <>
                                                {promiseIdentifiedUser && <>{promiseIdentifiedUser?.user.id === promise?.adminId && <div onClick={() => { setOptionTags(true) }} className='buttonCircle' style={{ width: 25, height: 25 }} data-theme={localTheme}>
                                                    <FontAwesomeIcon style={{ fontSize: 13 }} icon={faPlus} />
                                                </div>}</>}
                                            </>}
                                    </>}
                                </div>
                            </div>}

                    </div>



                    {systemDetectMobile && <>
                        <div style={{ width: '98%', maxWidth: 1200 }}>{t('tagsFound')} :</div>
                        <div style={{ width: '98%', maxWidth: 1200, display: 'flex', flexWrap: 'wrap', marginTop: 20 }} data-theme={localTheme}>
                            {editeTags?.length ? <>{editeTags?.map((el) => (
                                <Link to={'*'} style={{ color: '#396afc', marginLeft: 10, marginRight: 10 }} key={el.tag} data-theme={localTheme}>
                                    {el.tag}
                                </Link>
                            ))}</>
                                :
                                <>
                                    <div style={{ color: 'grey' }}>{t('noTagsFound')}</div>
                                </>}
                            {promiseIdentifiedUser && <>
                                {promise?.allowUserEditTag ? <div onClick={() => { setOptionTags(true) }} className='buttonCircle' style={{ width: 25, height: 25 }} data-theme={localTheme}>
                                    <FontAwesomeIcon style={{ fontSize: 13 }} icon={faPlus} />
                                </div>
                                    :
                                    <>
                                        {promiseIdentifiedUser && <>{promiseIdentifiedUser?.user.id === promise?.adminId && <div onClick={() => { setOptionTags(true) }} className='buttonCircle' style={{ width: 25, height: 25 }} data-theme={localTheme}>
                                            <FontAwesomeIcon style={{ fontSize: 13 }} icon={faPlus} />
                                        </div>}</>}
                                    </>}
                            </>}
                        </div>
                    </>}


                    <h4>Comments</h4>

                    {promise?.comments &&
                        <div style={{ width: '98%', maxWidth: 1000, display: 'flex', alignItems: 'end' }}>
                            <div style={{ height: 'auto' }} className="input_text" data-theme={localTheme}>
                                <Text_manage readOnly={true} />
                            </div>
                            <div className='button_option_container_free' style={{ display: 'flex', width: 100, marginLeft: 10 }} data-theme={localTheme}>
                                <div className='button_option' data-theme={localTheme}><FontAwesomeIcon icon={faPlus} /></div>
                                <div className='button_option' data-theme={localTheme}><FontAwesomeIcon icon={faArrowDown} /></div>
                            </div>
                        </div>}

                    <div className="container_comment" style={{ width: '98%', maxWidth: 1000 }} data-theme={localTheme}>
                        {promise?.comments ?
                            <div className="content_mess" style={{ marginLeft: 10 }}>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
                                    <img style={{ width: 40, height: 40, borderRadius: '100%', objectFit: 'cover', objectPosition: `50% ${10}%` }} src={SystemLogo} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                                    <div style={{ marginLeft: 10, fontWeight: 700 }}>{SystemName}</div>
                                </div>
                                <div className='message' data-theme={localTheme}>Soyez le premier à commenter cette publication.😊</div>
                                <div style={{ marginLeft: 10, fontSize: 12, color: 'grey', marginTop: 10 }}><FontAwesomeIcon style={{ marginRight: 5 }} icon={faClock} />Date, heure</div>
                            </div>
                            :
                            <div className="content_mess" style={{ marginLeft: 10 }}>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
                                    <img style={{ width: 40, height: 40, borderRadius: '100%', objectFit: 'cover', objectPosition: `50% ${10}%` }} src={SystemLogo} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                                    <div style={{ marginLeft: 10, fontWeight: 700 }}>{SystemName}</div>
                                </div>
                                <div className='message' data-theme={localTheme}>L'utilisateur a choisi de désactiver les commentaires pour cette publication.🙁</div>
                                <div style={{ marginLeft: 10, fontSize: 12, color: 'grey', marginTop: 10 }}><FontAwesomeIcon style={{ marginRight: 5 }} icon={faClock} />Date, heure</div>
                            </div>}
                    </div>
                </div>
            </div>



            <Pub />
            {/*<div style={{ width: '100%', display: 'flex', justifyContent: 'start', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '98%', display: 'flex', alignItems: 'center' }}>
                    <h4 data-theme={localTheme}>- Proposé par {promise?.user.pseudo}</h4>
                </div>
                <div className='scrollbar' style={{ display: 'flex', overflow: 'auto', alignItems: 'center', width: '98%' }}>
                    <Card_articles_side promise={promiseUserFile} />
                </div>
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                    <div onClick={() => { addSearchToUrl(`#${promise?.user.pseudo}-files`) }} className='buttonCircle' style={{ width: 'max-content', height: 25, marginTop: 10, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, padding: '0px 10px 0px 10px' }} data-theme={localTheme}>
                        {t('seeMore')} ...
                    </div>
                </div>
            </div>}


            {/*<div className='cter_sect'>
                <div style={{ width: '95%', display: 'flex', alignItems: 'center' }}>
                    <h3 data-theme={localTheme}>- Publication susceptible de vous intéresser</h3>
                </div>
                <div style={{ width: '95%' }}>
                    <Card_announcement profile={promiseIdentifiedUser} promise={promiseAnnouncement} />
                </div>
                        </div>*/}


            <div className='cter_sect' style={{ marginTop: 50 }}>
                <div className='ctent_arti' style={{ background: 'none' }} data-theme={localTheme}>
                    <div style={{ width: '95%', display: 'flex', alignItems: 'center' }}>
                        <h3 data-theme={localTheme}>- {promise?.type} Similair</h3>
                    </div>

                    {renderCardFilesWithAds()}

                    {/*<Card_files profile={promiseIdentifiedUser} promise={promiseSimilar?.slice(0, 18)} />
                    <Pub pubType={'banner'} />

                    <Card_files profile={promiseIdentifiedUser} promise={promiseSimilar?.slice(18, 36)} />
                    <Pub pubType={'banner'} />

                        <Card_files profile={promiseIdentifiedUser} promise={promiseSimilar?.slice(36)} />*/}
                </div>
            </div>

            {
                optionGroup && <div className='button_option_container mobileHidden' style={{ width: '100%', marginTop: 10, position: 'fixed', bottom: 0, opacity: 0.5, borderRadius: 0, zIndex: 22000 }} data-theme={localTheme}>
                    <div style={{ width: '100%', height: 30 }} onClick={() => {
                        setOptionGroup(false)
                    }} className='button_optionRed' data-theme={localTheme}>Close</div>
                </div>
            }

            {
                shopWindow && <div className="open-element-page-melted"
                    ref={contextMenuRef}
                    style={{
                        width: '90%',
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: 260,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'fixed',
                        zIndex: 10000,
                        borderRadius: 5,
                        top: '98%',
                        left: '98%',
                        transform: 'translate(-98%, -98%)',
                        background: 'linear-gradient(to right, #fc00ff, #00dbde)',
                        color: 'white'
                    }}>
                    <h4 style={{ margin: 5 }}><FontAwesomeIcon style={{ marginRight: 5 }} icon={faWandSparkles} />{t('accessPass')}</h4>

                    <img style={{ width: 200, height: 200, objectFit: 'cover', objectPosition: '50% 10%', borderRadius: 5 }} src={promise?.miniature} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} alt="" />

                    <div style={{ display: 'flex', marginTop: 5 }}>
                        <div className="badgeBlue" style={{ marginRight: 5 }}>{promise?.type}</div>
                        <div className='badge' style={{ borderRadius: 5, marginRight: 5, display: 'flex', alignItems: 'center' }} data-theme={localTheme}>
                            {promise?.imagesCount}
                            <FontAwesomeIcon style={{ fontSize: 12, marginLeft: 5 }} icon={faImages} />
                        </div>
                        {promise?.adult === true && <div className='adult' style={{ marginRight: 5 }}>{NSFW}</div>}
                        {promise?.ai == 1 && <div className='AI' style={{ marginRight: 5 }}>AI</div>}
                    </div>

                    <div style={{ marginTop: 5 }}>{promise?.name}</div>

                    <div style={{ width: '90%', marginBottom: 5 }}>{promise?.user.pseudo} propose un "Access Pass" à se contenu exclusif.{promise.adult ? '🥵' : '😊'}</div>

                    <div className='button_option_container_free' style={{ width: '80%', marginBottom: 5 }} data-theme={localTheme}>
                        <Link to={`/ArtVibes-accessPass/page-accessPass?file=${promise?.id}`} className='button_option' data-theme={localTheme} ><FontAwesomeIcon className="boxBounce" style={{ marginRight: 10 }} icon={faWandSparkles} />{realCash || NaN}<FontAwesomeIcon style={{ color: '#e3b620', marginLeft: 10 }} icon={faCoins} /></Link>
                    </div>

                    <div className='button_option_container_free' style={{ width: '80%', marginBottom: 5 }} data-theme={localTheme}>
                        <div onClick={() => { setShopWindow(false) }} className='button_option' data-theme={localTheme}>{t('cancel')}</div>
                    </div>
                </div>
            }


            {isHovered && <div className='open-element-info-left'
                style={{
                    width: 'max-content',
                    borderRadius: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'fixed',
                    zIndex: 20000,
                    top: '98%',
                    left: '2%',
                    transform: 'translate(2%, -98%)',
                    background: '#232526',
                    color: 'white',
                    opacity: 0.8,
                    paddingLeft: 5,
                    paddingRight: 5
                }}>
                <h4 style={{ margin: 5 }}>Developer</h4>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 5
                }}>
                    <div>
                        Scroll area: {isHovered ? '🔵' : '🔴'}
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 5
                }}>
                    <div>
                        index img: {indexUrlState}
                    </div>
                </div>
            </div>}

        </div>
    )
}


export default Illustrations_open