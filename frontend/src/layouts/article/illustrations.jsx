import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppContext } from "../../contexts/UseAppContext";
import Card_files from "../../components/Cards/Card_articles";
import Picture from '../../assets/images/logo.png';
import Picture_girl from '../../assets/images/girl.png';
import { API_URL } from '../../config';
import axios from "axios";
import { faBookmark, faClock, faClone, faEye, faHeart, faImages, faPenToSquare, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { RemoveScroll } from "react-remove-scroll";
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from "react";
import { faExclamationTriangle, faPlus, faTriangleExclamation, faDisplay, faDownload, faBagShopping, faArrowUpRightFromSquare, faAngleLeft, faAngleRight, faLayerGroup, faShare, faArrowDown, faCloudArrowUp, faPen, faAngleDoubleDown, faUser, faLock, faXmark, faEllipsis, faUserTag, faUserTie, faUserSecret } from "@fortawesome/free-solid-svg-icons";
import useKeypress from 'react-use-keypress';
import { Editor } from 'draft-js';
import { EditorState, convertFromRaw } from "draft-js";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Card_announcement from "../../components/Cards/Card_announcement";
import Pub from "../../components/Pub/Pub";
import PubImg from "../../assets/images/background.jpg";
import { DATA_picv } from "../../assets/data/data";
import dayjs from "dayjs";
import 'dayjs/locale/fr';
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);


const Illustrations_open = () => {
    const { localTheme, localThemeBackground, promiseIdentifiedUser, handleFullScreen, setHiddenPageBackground, GetMyFileFromLocal, setNavbarVisible, setThemeBackground, setThemeBackgroundSystem, setResizeThemeBackground } = useAppContext()

    const { t } = useTranslation();
    const editor = useRef(null);
    const refScroll = useRef(null);
    const refImage = useRef(null);
    const refMoreByUser = useRef(null);

    const navigate = useNavigate()

    let maxWordReport = 1000;

    const [option, setOption] = useState(false)
    const [optionGroup, setOptionGroup] = useState(false)
    const [optionTags, setOptionTags] = useState(false)
    const [errorLogin, setErrorLogin] = useState();
    const [promise, setPromise] = useState();
    const [promiseParams, setPromiseParams] = useState();
    const [promiseUserFile, setPromiseUserFile] = useState();
    const [promiseGroupFile, setPromiseGroupFile] = useState();
    const [promiseUserFileMin, setPromiseUserFileMin] = useState();
    const [promiseAnnouncement, setPromiseAnnouncement] = useState();
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [promiseSimilar, setPromiseSimilar] = useState();
    const [scrollProgress, setScrollProgress] = useState(0);
    const [promiseText, setPromiseText] = useState();
    const [promiseGroupText, setPromiseGroupText] = useState();
    const [swipAnimation, setSwipAnimation] = useState();
    const [text, setText] = useState('#');
    const [editeTags, setEditeTags] = useState([]);

    let swipAnimationTimer = 200;

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const idUrl = parseInt(searchParams.get("file"));
    const indexUrl = parseInt(searchParams.get("index") || 0);
    const [groupId, setGroupId] = useState();
    const [adminId, setAdminId] = useState();

    // Search on the server second
    const GetFileFromAPI = async (idUrl) => {
        try {
            await axios.get(`${API_URL}api/eventv/illustration/file/${idUrl}`,
                { withCredentials: true })
                .then((res) => {
                    setPromise(res.data);

                    //window.scrollTo({
                    //    top: 0,
                    //    behavior: 'smooth',
                    //})
                    setEditeTags(res.data.tags || [])

                    GetSomeBestAnnouncementFromAPI(res.data.tags)
                    GetSimilarFileFromAPI(res.data.tags)
                    GetFileParamsFromAPI(idUrl)
                    setScrollProgress(0)
                    setOptionGroup(false)

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

                    if (res.data.groupsfile && res.data.groupsfile.data) {
                        const textGroup = convertFromRaw(JSON.parse(res.data.groupsfile.data)).getPlainText()

                        if (textGroup.length > 0) {
                            setPromiseGroupText(textGroup)
                        } else {
                            setPromiseGroupText()
                        }
                    }

                    if (res.data.data) {
                        const text = convertFromRaw(JSON.parse(res.data.data)).getPlainText()

                        if (text.length > 0) {
                            setPromiseText(text)
                        } else {
                            setPromiseText()
                        }
                    }

                })
        } catch (error) {
            // Call the delete function with the ID of the item to be deleted if there is a limited access to a page
            setErrorLogin(error.response.data.message);
        }

    }

    // Search on the server second
    const GetFileParamsFromAPI = async (idUrl) => {
        try {
            await axios.get(`${API_URL}api/eventv/file-params/files/${idUrl}`,
                { withCredentials: true })
                .then((res) => {
                    setPromiseParams(res.data);
                })
        } catch (error) {
            // Call the delete function with the ID of the item to be deleted if there is a limited access to a page
            console.log(error.response.data.message);
        }
    }
    useEffect(() => {
        GetFileFromAPI(idUrl)
        GetFileParamsFromAPI(idUrl)
    }, [idUrl])

    const GetGroupsFileFromAPI = async (groupId) => {
        try {
            await axios.get(`${API_URL}api/eventv/group-illustration/files/${groupId}`,
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
    }, [groupId])

    const GetUserFileFromAPI = async (idUser) => {
        try {
            await axios.get(`${API_URL}api/eventv/illustration-user/files/${idUser}`,
                { withCredentials: true })
                .then((res) => {
                    setPromiseUserFile(res.data)
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
    }, [adminId])

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
            await axios.get(`${API_URL}api/eventv/similar/file/${encodeURIComponent(stringify)}`,
                { withCredentials: true })
                .then((res) => {
                    setPromiseSimilar(res.data);

                })
        } catch (error) {
            // Call the delete function with the ID of the item to be deleted if there is a limited access to a page
            setErrorLogin(error.response.data.message);
        }
    }

    useKeypress('ArrowLeft', () => {
        navigate({ search: `file=${idUrl}&index=${Math.max(indexUrl - 1, 0)}` })
        setNavbarVisible(false)
        if (indexUrl) {
            refImage.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
            setSwipAnimation(true)
            setTimeout(() => {
                setSwipAnimation();
            }, swipAnimationTimer);
        }
    })
    useKeypress('ArrowRight', () => {
        navigate({ search: `file=${idUrl}&index=${Math.min(indexUrl + 1, promise?.images.length - 1)}` })
        setNavbarVisible(false)
        if (indexUrl < promise?.images.length - 1) {
            refImage.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
            setSwipAnimation(true)
            setTimeout(() => {
                setSwipAnimation();
            }, swipAnimationTimer);
        }
    })

    useEffect(() => {
        const handleScroll = () => {
            const totalWidth = refScroll.current.scrollWidth - refScroll.current.clientWidth;
            const currentScroll = refScroll.current.scrollLeft;
            const progress = (currentScroll / totalWidth) * 100;
            setScrollProgress(progress);
        };

        if (refScroll.current) {
            refScroll.current.addEventListener('scroll', handleScroll);
            refScroll.current.addEventListener('touchmove', handleScroll);

            return () => {
                if (refScroll.current) {
                    refScroll.current.removeEventListener('scroll', handleScroll);
                    refScroll.current.removeEventListener('touchmove', handleScroll);
                }
            };
        }
    }, [refScroll])



    const handleDownload = async (e) => {
        setIsVisible(false)
        try {
            // Télécharger les données de l'image depuis l'URL
            const response = await fetch(e);
            const imageBlob = await response.blob();

            // Créer une URL pour le blob
            const imageUrl = window.URL.createObjectURL(imageBlob);


            const filename = e.split('/uploads/')[1];

            // Créer un lien pour télécharger l'image
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = filename; // Nom du fichier à télécharger
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Erreur lors du téléchargement de l\'image:', error);
        }
    };

    //useKeypress(['Control', 's'], (event) => {
    //    // Vérifier si la combinaison de touches est "Ctrl + S"
    //    if (event.ctrlKey && event.key === 's') {
    //        event.preventDefault();
    //        handleDownload(promise?.images[indexUrl].imageUrl)
    //    }
    //});

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

    const copyCurrentUrl = async () => {
        await navigator.clipboard.writeText(window.location.href)
            .then(() => {
                setIsVisible(false)
                alert("L'URL a été copiée !")
            })
            .catch(error => console.error('Erreur lors de la copie de l\'URL :', error));
    }

    const contextMenuRef = useRef(null);

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setIsVisible(false);
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

    const newBookMark = async () => {
        try {
            await axios.put(`${API_URL}api/eventv/new-bookmark`,
                { groupId: idUrl },
                { withCredentials: true })
                .then(() => {
                    GetFileParamsFromAPI(idUrl)
                })
        } catch (error) {
            // Call the delete function with the ID of the item to be deleted if there is a limited access to a page
            setErrorLogin(error.response.data.message);
        }
    }

    // Creation of tags for the search of the document
    const handleChangeTags = (e) => {
        setText(e.target.value);
        const expressionReguliere = /\s/;
        if (expressionReguliere.test(e.target.value) || e.target.value.length > 30 || e.key === 'Enter') {
            const regexTags = /#[a-zA-Z0-9_]+/g;
            const tagsTrouves = e.target.value.match(regexTags) || [];
            // Vérifie si un élément avec les mêmes valeurs de propriété existe déjà dans le tableau
            const isNewTagUnique = editeTags.filter((el) => el.tag === tagsTrouves[0]);
            if (isNewTagUnique.length > 0 || tagsTrouves.length === 0) {
                setText('#');
            } else {
                setEditeTags(Array.from(new Set([...editeTags, { tag: tagsTrouves[0], userId: promiseIdentifiedUser.user.id }])));
                setText('#');
            }
        };
    }


    // Deleting a tag
    const handleRemoveTag = (el) => {
        const filteredPromise = editeTags?.filter((array) => array != el);
        setEditeTags(filteredPromise);
    };

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

    // État pour contrôler si la fonction a été déclenchée
    const [functionTriggered, setFunctionTriggered] = useState(false);

    // Fonction à exécuter après 30 secondes
    useEffect(() => {
        const timer = setTimeout(() => {
            // Mettez ici le code que vous souhaitez exécuter
            console.log("La fonction s'est exécutée après 30 secondes.");
            // Mettre à jour l'état pour indiquer que la fonction a été déclenchée
            setFunctionTriggered(true);
        }, 2000); // 30 000 millisecondes = 30 secondes

        // Nettoyer le timer lors du démontage du composant
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {isVisible &&
                <div className="contextMenu animation" ref={contextMenuRef} style={{ top: position.y, left: position.x }} data-theme={localTheme}>
                    <div onClick={copyCurrentUrl} className='button_option' style={{ justifyContent: 'start', height: 35 }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10, marginLeft: 10, color: '#ec1c24' }} icon={faClone} />{t('copyPageURL')}</div>
                    <div className='button_option' style={{ justifyContent: 'start', height: 35 }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10, marginLeft: 10, color: '#ec1c24' }} icon={faShare} />Share</div>
                    {parseInt(promiseIdentifiedUser?.user.id) === promise?.adminId && <div onClick={() => {
                        GetMyFileFromLocal(promise?.id)
                        setIsVisible(false)
                    }} className='button_option' style={{ justifyContent: 'start', height: 35 }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10, marginLeft: 10, color: '#ec1c24' }} icon={faPenToSquare} />{t('workspace')}</div>}
                    <div onClick={() => {
                        handleDownload(promise?.images[indexUrl].imageUrl)
                    }} className='button_option' style={{ justifyContent: 'start', height: 35 }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10, marginLeft: 10, color: '#ec1c24' }} icon={faDownload} />{t('download')}</div>
                    <div onClick={() => {
                        setOption(!option)
                        setIsVisible(false)
                    }} className='button_option' style={{ justifyContent: 'start', height: 35 }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10, marginLeft: 10, color: '#ec1c24' }} icon={faTriangleExclamation} />{t('problem')}</div>
                    <div onClick={() => {
                        setThemeBackgroundSystem(promise?.images[indexUrl].imageUrl)
                        setHiddenPageBackground(true)
                        setIsVisible(false)
                    }} className='button_optionColoring' style={{ height: 35 }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10 }} icon={faDisplay} />{t('background')}</div>
                    <div className='button_optionColoringBlue' style={{ height: 35 }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10 }} icon={faBagShopping} />{t('shop')}</div>
                </div>}

            {option && <div className='blanket animation' style={{ zIndex: 21000, display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', top: 0 }} >
                <RemoveScroll removeScrollBar={false} className='menu_navbar scrollbar open-elementPage' style={{ width: '100%', height: '100%', flexDirection: 'column', maxWidth: 800, overflowY: 'auto', alignItems: 'center', background: 'none' }} data-theme={localTheme}>
                    <div className='cter_sect'>
                        <div className='ctent_artiMiniProfil' data-theme={localTheme}>

                            <h4>{t('Known_Issue')}<FontAwesomeIcon style={{ marginLeft: 5 }} icon={faExclamationTriangle} /></h4>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: 55 }}>
                                <img loading="lazy" src={promise?.images[indexUrl].imageUrl}
                                    style={{ objectFit: 'cover', objectPosition: `50% ${10}%`, margin: 5, borderRadius: 5, height: 200 }} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                                <div style={{ width: '100%', maxWidth: 500, marginBottom: -55 }}>
                                    <textarea style={{ height: '100%', maxHeight: '300', width: '100%', maxWidth: '98%', resize: 'none' }} className='input_text scrollbar' maxLength={maxWordReport} name="" id="" cols="30" rows="10" data-theme={localTheme} />
                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: 10, marginTop: 10 }}><div>0/{maxWordReport}</div>
                                        <div className='buttonCircle' data-theme={localTheme}>
                                            <FontAwesomeIcon style={{ fontSize: 13 }} icon={faTrashAlt} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='button_option_container' style={{ width: '90%', maxWidth: 800, marginBottom: 30 }} data-theme={localTheme}>
                                {false ? <div className='button_option' data-theme={localTheme}>Signaler un problème à cette image.({promise?.user.pseudo})</div>
                                    :
                                    <div className='button_optionDisable' data-theme={localTheme}>Signaler un problème à cette image.({promise?.user.pseudo})</div>}
                            </div>

                            <div className='button_option_container' style={{ width: '90%', maxWidth: 800, marginBottom: 30 }} data-theme={localTheme}>
                                {false ? <div className='button_option' data-theme={localTheme}>Signaler un problème dans l’ensemble du projet.({promise?.user.pseudo})</div>
                                    :
                                    <div className='button_optionDisable' data-theme={localTheme}>Signaler un problème dans l’ensemble du projet.({promise?.user.pseudo})</div>}
                            </div>

                            <div className='button_option_container' style={{ width: '90%', maxWidth: 800 }} data-theme={localTheme}>
                                <div className='button_optionRed' data-theme={localTheme}>Signaler le projet.({DATA_picv})</div>
                            </div>

                            <div className='button_option_container' style={{ width: '100%', maxWidth: 300, marginTop: 20 }} data-theme={localTheme}>
                                <div className='button_option' onClick={() => {
                                    setOption(!option)
                                }} data-theme={localTheme}>{t("cancel")}</div>
                            </div>
                        </div>
                    </div>
                </RemoveScroll>
            </div>}

            {optionGroup && <div className='blanket animation' style={{ zIndex: 21000, display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', top: 0 }} >
                <RemoveScroll removeScrollBar={false} className='menu_navbar scrollbar open-elementPage' style={{ width: '100%', flexDirection: 'column', maxWidth: 2000, overflowY: 'auto', alignItems: 'center', background: 'none' }} data-theme={localTheme}>
                    <div className='cter_sect'>
                        <div className='ctent_artiMiniProfil' data-theme={localTheme}>
                            <div style={{ marginTop: 20 }}>
                                <img className='Profile_picture shadowbox' src={promise?.groupsfile.imageUrl || Picture} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} alt="" />
                                {parseInt(promiseIdentifiedUser?.user.id) === promise?.adminId && <div className='Profile_picture_button shadowbox' style={{ marginBottom: 60 }}>
                                    <Link to={`/works/library/${promise?.groupId}`} className='button_optionPic_v' style={{ width: 35, height: 35, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, position: 'absolute', borderRadius: '100%' }} data-theme={localTheme}>
                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                    </Link>
                                </div>}
                            </div>
                            <h3>{promise?.groupsfile.name}</h3>
                            {promiseGroupText ? <div style={{ maxWidth: 1000, textAlign: 'center', marginTop: 10, marginBottom: 20 }} data-theme={localTheme}><span style={{ margin: 5 }}>{promiseGroupText}</span></div>
                                :
                                <div style={{ maxWidth: 1000, textAlign: 'center', marginTop: 10, marginBottom: 20, color: 'grey' }} data-theme={localTheme}><span style={{ margin: 5 }}>L’utilisateur n’a laissé aucun commentaire dans ce groupe.</span></div>}

                            <div style={{ width: '95%', display: 'flex', alignItems: 'center' }}>
                                <h3 className="text" data-background={localThemeBackground} data-theme={localTheme}>- {t('library')}</h3>
                            </div>
                            <Card_files profile={promiseIdentifiedUser} promise={promiseGroupFile} />

                            <div className='button_option_container PcHidden' style={{ width: '100%', maxWidth: 300, marginTop: 20 }} data-theme={localTheme}>
                                <div className='button_option' onClick={() => { setOptionGroup(false) }} data-theme={localTheme}>{t("cancel")}</div>
                            </div>
                        </div>
                    </div>
                </RemoveScroll>
            </div>}

            {optionTags && <div className='blanket animation' style={{ zIndex: 21000, display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', top: 0 }} >
                <RemoveScroll removeScrollBar={false} className='menu_navbar scrollbar open-elementPage' style={{ width: '100%', flexDirection: 'column', maxWidth: 1000, overflowY: 'auto', alignItems: 'center', background: 'none' }} data-theme={localTheme}>
                    <div className='cter_sect'>
                        <div className='ctent_artiMiniProfil' data-theme={localTheme}>
                            <h3>Suggest tags to {promise?.user.pseudo}</h3>
                            <div style={{ marginTop: 10, width: '90%', display: 'flex', justifyContent: 'space-between', color: promise?.tags.length > 10 ? 'red' : '#00aa00', borderBottom: `1px solid ${promise?.tags.length > 10 ? 'red' : '#00aa00'}` }}>{t('addTags')} : <span style={{ fontWeight: 800 }} translate='no'><span>{promise?.tags.length || 0}</span>/10</span></div>

                            <div style={{ width: '90%', paddingTop: 20 }}>
                                <div>{t('tagsFound')} :</div>
                            </div>

                            <div style={{ width: '90%', display: 'flex', flexWrap: 'wrap', marginTop: 50 }} data-theme={localTheme}>
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
                                    ))}</>}
                            </div>

                            <div style={{ display: 'flex', width: '98%', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                <input autoFocus={true} maxLength={31} onKeyDown={handleChangeTags} onChange={(e) => { handleChangeTags(e) }} style={{ marginTop: 20, resize: 'none' }} className='input_text' placeholder={`${t('addTags')}: #...`} type="text" name="tag" id="tag" value={text} data-theme={localTheme} />
                            </div>
                            <div className='button_option_container PcHidden' style={{ width: '100%', maxWidth: 500, marginTop: 20 }} data-theme={localTheme}>
                                <div className='button_option' onClick={() => {
                                    setOptionTags(false)
                                    setEditeTags(promise?.tags)
                                }} data-theme={localTheme}>{t("cancel")}</div>
                                {promise?.tags.length !== editeTags.length && <div onClick={updateTags} className='button_optionBlue'><FontAwesomeIcon style={{ marginRight: 5 }} icon={faCloudArrowUp} />{t("save")}</div>}
                            </div>
                        </div>
                    </div>
                </RemoveScroll>
            </div>}

            <div className='cter_sect' style={{ marginTop: 20 }}>
                <div className='ctent_arti' data-theme={localTheme}>
                    <img src={promise?.user.imageUrl}
                        loading="lazy" onClick={() => { navigate(`/profile/${promise?.user.id}`) }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='Profile_picture hovercursor shadowbox' style={{ marginTop: 20, objectFit: 'cover', objectPosition: `50% ${20}%`, width: 80, height: 80, marginBottom: 10, cursor: 'pointer' }} alt="" />
                    <h3 style={{ margin: 0 }}>{promise?.user.pseudo}</h3>


                    <div className='button_option_container' style={{ width: '100%', display: 'flex', marginTop: 10, maxWidth: 200 }} data-theme={localTheme}>
                        <div className='button_optionPic_v' data-theme={localTheme}>{t('follow')}</div>
                    </div>

                    <div style={{ marginTop: 20 }}>
                        <img className="hovercursor" src={PubImg} style={{ height: 100, borderRadius: 5, width: '98%', objectFit: 'cover', marginLeft: 2, marginRight: 2, cursor: 'pointer' }} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                    </div>

                    {promise && <h3>{promise?.name.charAt(0).toUpperCase() + promise?.name.slice(1)}</h3>}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img onContextMenu={handleContextMenu} ref={refImage} className={swipAnimation === true ? 'image-container-animation' : ''}
                            onClick={() => { handleFullScreen({ img: promise?.images[indexUrl].imageUrl }) }} src={promise?.images[indexUrl]?.imageUrl ?? Picture} loading="lazy" style={{ height: '98%', maxHeight: 800, width: '98%', borderRadius: 5, marginBottom: 10, cursor: 'pointer' }} alt="" onMouseDown={(e) => e.preventDefault()} />

                    </div>
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                        <div className='button_option_container' style={{ display: 'flex', width: '100%', maxWidth: 200, marginRight: 40, marginLeft: 10 }} data-theme={localTheme}>
                            <Link onClick={() => {
                                setNavbarVisible(false)
                                if (indexUrl) {
                                    refImage.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
                                    setSwipAnimation(true)
                                    setTimeout(() => {
                                        setSwipAnimation();
                                    }, swipAnimationTimer);
                                }
                            }} className='button_option' to={{ search: `file=${idUrl}&index=${Math.max(indexUrl - 1, 0)}` }} data-theme={localTheme}><FontAwesomeIcon icon={faAngleLeft} /></Link>

                        </div>

                        <div>{indexUrl + 1}/{promise?.imagesCount}</div>

                        <div className='button_option_container' style={{ display: 'flex', width: '100%', maxWidth: 200, marginLeft: 40, marginRight: 10 }} data-theme={localTheme}>
                            <Link onClick={() => {
                                setNavbarVisible(false)
                                if (indexUrl < promise?.images.length - 1) {
                                    refImage.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
                                    setSwipAnimation(true)
                                    setTimeout(() => {
                                        setSwipAnimation();
                                    }, swipAnimationTimer);
                                }
                            }} className='button_option' to={{ search: `file=${idUrl}&index=${Math.min(indexUrl + 1, promise?.images.length - 1)}` }} data-theme={localTheme}><FontAwesomeIcon icon={faAngleRight} /></Link>
                        </div>
                    </div>

                    <div style={{ width: '98%', height: '2px', background: 'transparent', marginBottom: 5 }}>
                        <div style={{ height: '100%', width: `${scrollProgress}%`, background: '#ec1c24' }}></div>
                    </div>
                    <div style={{ display: 'flex', width: '100%' }}>
                        {promise?.groupsfile &&
                            <div className="hovercursor displayPc">
                                <img onClick={() => { setOptionGroup(true) }} style={{ borderRadius: '100%', height: 150, marginRight: 10, marginLeft: 10, cursor: 'pointer' }} title={t('library')} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} src={promise?.groupsfile.imageUrl} alt='' />
                                <div style={{ textAlign: 'center', marginBottom: 5 }}>
                                    <FontAwesomeIcon style={{ marginRight: 5, color: '#ec1c24' }} icon={faLayerGroup} />
                                    {promise?.groupsfile.name}</div>
                            </div>}
                        <div ref={refScroll} className='scrollbar' style={{ display: 'flex', flexDirection: 'row', overflow: 'auto', alignItems: 'center', width: '98%' }}>

                            {promise?.groupsfile &&
                                <div className="hovercursor displayMoblie">
                                    <img onClick={() => { setOptionGroup(true) }} style={{ borderRadius: '100%', height: 150, marginRight: 10, marginLeft: 10, cursor: 'pointer' }} title={t('library')} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} src={promise?.groupsfile.imageUrl} alt='' />
                                    <div style={{ textAlign: 'center', marginBottom: 5 }}>
                                        <FontAwesomeIcon style={{ marginRight: 5, color: '#ec1c24' }} icon={faLayerGroup} />
                                        {promise?.groupsfile.name}</div>
                                </div>}

                            {promise?.images.map((img, index) => (
                                <div onClick={indexUrl !== index ? () => {
                                    navigate({ search: `file=${idUrl}&index=${index}` })
                                } : null} className="hovercursor" key={index}>
                                    <img onClick={() => {
                                        setNavbarVisible(false)
                                        if (indexUrl && indexUrl < promise?.images.length - 1) {
                                            setSwipAnimation(true)
                                            setTimeout(() => {
                                                setSwipAnimation();
                                            }, swipAnimationTimer);
                                        }
                                    }} src={img.imageUrl}
                                        style={{ objectFit: 'cover', objectPosition: `50% 10%`, margin: 5, borderRadius: 5, cursor: 'pointer', height: 180, width: 180, opacity: indexUrl === index ? 0.6 : 1 }} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                                </div>
                            ))}

                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                            <div onClick={newBookMark} style={{ height: 40, width: 40 }} className={promiseParams?.BookmarksId ? 'buttonCircleBlue' : 'buttonCircle'} data-theme={localTheme}>
                                <FontAwesomeIcon icon={faBookmark} />
                            </div>
                            <div onClick={() => { handleDownload(promise?.images[indexUrl].imageUrl) }} style={{ height: 40, width: 40 }} className='buttonCircle' data-theme={localTheme}>
                                <FontAwesomeIcon icon={faDownload} />
                            </div>
                            <div onClick={() => {
                                setThemeBackgroundSystem(promise?.images[indexUrl].imageUrl)
                                setHiddenPageBackground(true)
                            }} style={{ height: 40, width: 40 }} className='buttonCircleColoring' data-theme={localTheme}>
                                <FontAwesomeIcon icon={faDisplay} />
                            </div>
                            <div className='buttonCircleRed' onClick={() => {
                                setOption(!option)
                            }} style={{ height: 40, width: 40 }} data-theme={localTheme}>
                                <FontAwesomeIcon icon={faTriangleExclamation} />
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', marginTop: 5, width: '100%', justifyContent: 'end' }} data-theme={localTheme}>
                        {promiseIdentifiedUser?.user.isAdmin === true && <div className='buttonCircleGreen' style={{ height: 40, width: 40, marginBottom: 5 }} data-theme={localTheme}>
                            <FontAwesomeIcon icon={faUserSecret} />
                        </div>}
                        <div className='buttonCircleColoringBlue' style={{ height: 40, width: 40, marginBottom: 5 }} data-theme={localTheme}>
                            <FontAwesomeIcon icon={faBagShopping} />
                        </div>
                        {parseInt(promiseIdentifiedUser?.user.id) === promise?.adminId &&
                            <div onClick={() => { GetMyFileFromLocal(promise?.id) }} style={{ height: 40, width: 40, marginBottom: 5 }} className='buttonCircle' data-theme={localTheme}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </div>}
                    </div>

                    <div style={{ width: '98%', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap-reverse' }}>

                        <div style={{ width: '100%', maxWidth: 500, display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                            {promise && <h3>{promise?.name.charAt(0).toUpperCase() + promise?.name.slice(1)}</h3>}
                            <div style={{ display: 'flex' }}>
                                <div className="badgeBlue" style={{ marginRight: 5 }}>{promise?.type}</div>
                                <div className='badge' style={{ borderRadius: 5, marginRight: 5, display: 'flex', alignItems: 'center' }} data-theme={localTheme}>{promise?.imagesCount}
                                    <FontAwesomeIcon style={{ fontSize: 12, marginLeft: 5 }} icon={faImages} />
                                </div>
                                {promise?.adult == 1 && <div className='adult' style={{ marginRight: 5 }} translate='no'>18+</div>}
                                {promise?.adult == 2 && <div className='adult' style={{ marginRight: 5 }} translate='no'>18++</div>}
                                {promise?.ai == 1 && <div className='AI' style={{ marginRight: 5 }} translate='no'>AI</div>}
                            </div>

                            {promiseText ? <div style={{ maxWidth: 1000, marginTop: 10, marginBottom: 20 }} data-theme={localTheme}>{promiseText}</div>
                                :
                                <div style={{ maxWidth: 1000, marginTop: 10, marginBottom: 20 }} data-theme={localTheme}>L’utilisateur n’a laissé aucun commentaire sur cette publication.</div>}

                            <div style={{ color: 'grey', fontSize: 13 }}>
                                <FontAwesomeIcon style={{ marginRight: 5, marginLeft: 5 }} icon={faBookmark} />
                                {promiseParams?.file.bookMarks || 0},
                                <FontAwesomeIcon style={{ marginRight: 5, marginLeft: 5 }} icon={faEye} />
                                {promiseParams?.file.view || 0}
                            </div>

                            <div style={{ color: 'grey', fontSize: 13 }}>
                                <FontAwesomeIcon style={{ marginRight: 5 }} icon={faPen} />
                                {dayjs(promiseParams?.file.dateRework).add(0, 'hour').locale('fr').fromNow()},
                                <FontAwesomeIcon style={{ marginRight: 5, marginLeft: 5 }} icon={faCloudArrowUp} />
                                {dayjs(promiseParams?.file.createdAt).format('DD/MM/YYYY')}
                            </div>
                        </div>

                        <div style={{ width: '100%', maxWidth: 400, display: 'flex', justifyContent: 'start', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ width: '100%', maxWidth: 400 }}>- {promise?.type} next:</div>
                            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 10, width: '100%', maxWidth: promiseUserFileMin?.length === 3 ? 350 : 240 }}>
                                {promiseUserFileMin?.map((img, index) => (
                                    <img className="hovercursor" style={{ height: 95, borderRadius: 5, width: 110, objectFit: 'cover', opacity: idUrl == img.id ? 0.5 : 1, marginLeft: 2, marginRight: 2 }} src={img.miniature}
                                        onClick={img.id !== idUrl ? () => { navigate({ search: `file=${img.id}&index=0` }) } : null}
                                        alt="" key={index} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                                ))}
                            </div>
                            <div style={{ width: '100%', maxWidth: 400, display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                                <div onClick={() => {
                                    refMoreByUser.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
                                }} className='buttonCircle' style={{ width: 'max-content', height: 35, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, padding: '0px 10px 0px 10px', background: 'none', color: 'grey' }} data-theme={localTheme}>
                                    {t('seeMore')}<FontAwesomeIcon className="boxBounce" style={{ marginLeft: 5 }} icon={faAngleDoubleDown} />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div style={{ marginTop: 20 }}>
                        <img className="hovercursor" src={PubImg} style={{ height: 100, borderRadius: 5, width: '98%', objectFit: 'cover', marginLeft: 2, marginRight: 2, cursor: 'pointer' }} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                    </div>

                    <div style={{ width: '98%', maxWidth: 1200 }}>{t('tagsFound')} :</div>
                    <div style={{ width: '98%', maxWidth: 1200, display: 'flex', flexWrap: 'wrap', marginTop: 20 }} data-theme={localTheme}>
                        {editeTags?.length ? <>{editeTags?.map((el) => (
                            <Link to={'*'} style={{ color: '#0077ff', marginLeft: 10, marginRight: 10 }} key={el.tag} data-theme={localTheme}>
                                {el.tag}
                            </Link>
                        ))}</>
                            :
                            <>
                                <div style={{ color: 'grey' }}>{t('noTagsFound')}</div>
                            </>}
                        {promise?.allowUserEditTag ? <div onClick={() => { setOptionTags(true) }} className='buttonCircle' style={{ width: 25, height: 25 }} data-theme={localTheme}>
                            <FontAwesomeIcon style={{ fontSize: 13 }} icon={faPlus} />
                        </div>
                            :
                            <>
                                {promiseIdentifiedUser?.user.id === promise?.adminId && <div onClick={() => { setOptionTags(true) }} className='buttonCircle' style={{ width: 25, height: 25 }} data-theme={localTheme}>
                                    <FontAwesomeIcon style={{ fontSize: 13 }} icon={faPlus} />
                                </div>}
                            </>}
                    </div>


                    <h4>Comments</h4>

                    {promise?.comments &&
                        <div style={{ width: '98%', maxWidth: 1000, display: 'flex', alignItems: 'center' }}>
                            <div className="textarea_mess" data-theme={localTheme}>
                                <Editor
                                    ref={editor}
                                    editorState={editorState}
                                    onChange={(newEditorState) => setEditorState(newEditorState)}
                                    placeholder="Écrivez ici..."
                                />
                            </div>
                            <div>
                                <div className='button_option_container' style={{ display: 'flex', width: 100, marginLeft: 10 }} data-theme={localTheme}>
                                    <div className='button_option' data-theme={localTheme}><FontAwesomeIcon icon={faPlus} /></div>
                                    <div className='button_option' data-theme={localTheme}><FontAwesomeIcon icon={faArrowDown} /></div>
                                </div>
                            </div>
                        </div>}

                    <div className="container_comment" style={{ width: '98%', maxWidth: 1000 }} data-theme={localTheme}>
                        {promise?.comments ?
                            <div className="content_mess" style={{ marginLeft: 10 }}>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
                                    <img style={{ width: 40, height: 40, borderRadius: '100%', objectFit: 'cover', objectPosition: `50% ${10}%` }} src={Picture_girl} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                                    <div style={{ marginLeft: 10, fontWeight: 700 }}>{DATA_picv}</div>
                                </div>
                                <div className='message' data-theme={localTheme}>Soyez le premier à commenter cette publication.😊</div>
                                <div style={{ marginLeft: 10, fontSize: 12, color: 'grey', marginTop: 10 }}><FontAwesomeIcon style={{ marginRight: 5 }} icon={faClock} />Date, heure</div>
                            </div>
                            :

                            <div className="content_mess" style={{ marginLeft: 10 }}>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
                                    <img style={{ width: 40, height: 40, borderRadius: '100%', objectFit: 'cover', objectPosition: `50% ${10}%` }} src={Picture_girl} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                                    <div style={{ marginLeft: 10, fontWeight: 700 }}>{DATA_picv}</div>
                                </div>
                                <div className='message' data-theme={localTheme}>L'utilisateur a choisi de désactiver les commentaires pour cette publication.🙁</div>
                                <div style={{ marginLeft: 10, fontSize: 12, color: 'grey', marginTop: 10 }}><FontAwesomeIcon style={{ marginRight: 5 }} icon={faClock} />Date, heure</div>
                            </div>}
                    </div>
                </div>
            </div>

            <div className='cter_sect'>
                <div className='ctent_arti' data-theme={localTheme}>
                    <div style={{ width: '98%', display: 'flex', alignItems: 'center' }}>
                        <h3 data-theme={localTheme}>- Proposé par {promise?.user.pseudo}</h3>
                    </div>
                    <div ref={refMoreByUser} className='scrollbar' style={{ display: 'flex', flexDirection: 'row', overflow: 'auto', alignItems: 'center', width: '98%' }}>
                        {promiseUserFile?.map((img, index) => (
                            <div style={{ margin: 5 }} className="hovercursor" key={index}>
                                <div className='article_card_menu'>
                                    <div onClick={() => { navigate(`/file/${img.type}/${img.id}`) }} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', width: 'max-content', overflow: 'hidden' }}>
                                        <div className='article_card_menu_text'>
                                            <div className='article_card_title' translate='no'>{img.name.charAt(0).toUpperCase() + img.name.slice(1)}</div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', width: 'max-content', alignItems: 'center', justifyContent: 'end' }}>
                                        <div onClick={() => { GetMyFileFromLocal(img.id) }} className='buttonCircle' data-theme={localTheme}>
                                            <FontAwesomeIcon style={{ fontSize: 13 }} icon={faPenToSquare} />
                                        </div>
                                    </div>
                                </div>
                                <img loading="lazy" src={img.miniature}
                                    onClick={() => {
                                        navigate({ search: `file=${img.id}&index=0` })
                                        window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth',
                                        })
                                    }}
                                    style={{ objectFit: 'cover', objectPosition: `50% ${10}%`, borderRadius: 5, cursor: 'pointer', height: 200, width: 180, opacity: idUrl == img.id ? 0.8 : 1, marginTop: 5 }} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />

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
                </div>
            </div>

            <Pub />

            <div className='cter_sect'>
                <div style={{ width: '95%', display: 'flex', alignItems: 'center' }}>
                    <h3 className="text" data-background={localThemeBackground} data-theme={localTheme}>- Publication susceptible de vous intéresser</h3>
                </div>
                <div style={{ width: '95%' }}>
                    <Card_announcement profile={promiseIdentifiedUser} promise={promiseAnnouncement} />
                </div>
            </div>

            <div className='cter_sect'>
                <img className="hovercursor" src={PubImg} style={{ borderRadius: 5, width: '100%', maxWidth: 1000, cursor: 'pointer' }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} alt="" />
            </div>


            <div className='cter_sect'>
                <div className='ctent_arti' data-theme={localTheme}>
                    <div style={{ width: '95%', display: 'flex', alignItems: 'center' }}>
                        <h3 className="text" data-background={localThemeBackground} data-theme={localTheme}>- {promise?.type} Similair</h3>
                    </div>
                    <Card_files profile={promiseIdentifiedUser} promise={promiseSimilar} />
                </div>
            </div>

            {optionGroup && <div className='button_option_container mobileHidden' style={{ width: '100%', marginTop: 10, position: 'fixed', bottom: 0, opacity: 0.5, borderRadius: 0, zIndex: 22000 }} data-theme={localTheme}>
                <div style={{ width: '100%', height: 30 }} onClick={() => {
                    setOptionGroup(false)
                }} className='button_optionRed' data-theme={localTheme}>Close</div>
            </div>}

            {functionTriggered &&<div className="open-elementPage"
                style={{
                    width: '90%',
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: 300,
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
                <h3><FontAwesomeIcon className="boxBounce" style={{ marginRight: 5 }} icon={faBagShopping} />Shop</h3>
                
                <div style={{fontSize: 20, marginBottom: 5}}>{promise?.name}</div>
                    <img loading="lazy" src={promise?.miniature} style={{ objectFit: 'cover', objectPosition: `50% ${10}%`, borderRadius: 5, height: 200, width: 180 }} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />

                    <div style={{ display: 'flex', marginTop: 5 }}>
                    <div className="badgeBlue" style={{ marginRight: 5 }}>{promise?.type}</div>
                        <div className='badge' style={{ borderRadius: 5, marginRight: 5, display: 'flex', alignItems: 'center' }}>{promise?.imagesCount}
                            <FontAwesomeIcon style={{ fontSize: 12, marginLeft: 5 }} icon={faImages} />
                        </div>
                        {promise?.adult == 1 && <div className='adult' style={{ marginRight: 5 }} translate='no'>18+</div>}
                        {promise?.adult == 2 && <div className='adult' style={{ marginRight: 5 }} translate='no'>18++</div>}
                        {promise?.ai == 1 && <div className='AI' style={{ marginRight: 5 }} translate='no'>AI</div>}
                    </div>

                <p style={{ width: '90%', fontSize: 18 }}>Cet article est disponible dans notre boutique en ligne. Si vous souhaitez en savoir plus, n'hésitez pas à y jeter un coup d'œil ! 😊</p>

                <div className='button_option_container' style={{ width: '80%', marginBottom: 10 }}>
                    <div className='button_option' ><FontAwesomeIcon style={{ marginRight: 10 }} icon={faBagShopping} />Shop</div>
                </div>
                <div className='button_option_container' style={{ width: '80%', marginBottom: 10 }}>
                    <div className='button_option' >{t('cancel')}</div>
                </div>
                <div className="checkbox-wrapper-46" style={{ marginBottom: 10, background: 'white', color: 'black', padding: 5, borderRadius: 5 }}>
                        <input
                            className="inp-cbx" id="hj5683465" type="checkbox" />
                        <label className="cbx" htmlFor="hj5683465"><span>
                            <svg width="12px" height="12px" viewBox="0 0 12 10">
                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                            </svg></span><span style={{ marginLeft: 10, width: '80%' }}>
                            Next time you open your browser?</span>
                        </label>
                    </div>
            </div>}
        </>
    )
}

export default Illustrations_open