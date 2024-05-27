import '../sass/components/SideNav.scss';
import Picture from '../assets/images/logo.png';
import { RemoveScroll } from "react-remove-scroll";
import logo from '../assets/images/logo_transparent_banner.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faBookOpen, faCube, faArrowLeft, faChartLine, faList, faDisplay, faClose, faCrown, faBriefcase, faArrowRight, faUserTie, faGamepad, faBagShopping, faDownLong, faUserSecret, faTrophy, faMedal, faFingerprint, faWandSparkles, faPhotoFilm, faLayerGroup, faTriangleExclamation, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faFile, faFileLines, faImages, faKeyboard, faNewspaper, faQuestionCircle, faWindowRestore, faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { useAppContext } from "../contexts/UseAppContext";
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { supprimerElement, IndexedDB } from '../assets/data/IndexedDB';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useKeypress from 'react-use-keypress';
import { SystemName } from '../assets/data/data';
import Function_utils from '../components/versatile_function/usefunction_utils';
import { useWorkspaceContext } from '../contexts/UseWorkspaceContexte';
import WorkSpaceTabs from '../components/workSpaceTabs';


const NavbarMenu = () => {

    const { t } = useTranslation();
    const { addSearchToUrl } = Function_utils()

    const {
        activeAnimation, setActiveAnimation,
        localTheme,
        setHiddenMenuSidebare,
        promiseIdentifiedUser,
        hiddenMenuSidebare,
        systemDetectMobile
    } = useAppContext()

    const {
        handleRecupererTousLesElements,
        localTabs,
        otherlocalTabs,
        handleClearIndexedDB } = useWorkspaceContext()

    const navigate = useNavigate()


    const fullUrl = useLocation()

    const fullLocation = fullUrl.pathname
    const location = fullLocation.split("/")
    const url = location[2];

    const searchParams = new URLSearchParams(fullUrl.search);
    const urlId = parseInt(searchParams.get("update-file"));

    const [contextMenuTabs, setContextMenuTabs] = useState(false)

    const wrapperRef = useRef(null);



    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    handleButtonClick()
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

    const handleDelTab = async (el) => {
        // Étape 1 : Trouvez l'indice de l'élément recherché dans le tableau
        const indexElementSearch = localTabs.findIndex((item) => item.id === el.id);

        if (url === 'file') {
            if (indexElementSearch !== -1 && indexElementSearch > 0) {
                // Étape 2 : Obtenez l'élément précédent en utilisant l'indice
                if (urlId === el.id) {
                    const elementPrevious = localTabs[indexElementSearch - 1];
                    navigate(`/works/file/${SystemName}-Workspace?update-file=${elementPrevious?.id}`)//(`/works/file/${elementPrevious?.id}`)
                }
            } else {
                if (urlId === el.id) {
                    const elementPrevious = localTabs[indexElementSearch + 1];
                    navigate(`/works/file/${SystemName}-Workspace?update-file=${elementPrevious?.id}`)//(`/works/file/${elementPrevious?.id}`)
                    if (elementPrevious === undefined) {
                        navigate(`/works/file`)
                    }
                }
            }
        }

        const db = await IndexedDB();
        // Appelez la fonction de suppression avec l'ID de l'élément à supprimer
        supprimerElement(db, el.id)
            .then(() => {
                //console.log('Élément supprimé avec succès');
                handleRecupererTousLesElements()
                // Mettez à jour votre interface utilisateur pour refléter la suppression, si nécessaire
            })
            .catch((error) => {
                console.error('Erreur lors de la suppression de l élément :', error);
            });
    }

    //useEffect(() => {
    //    handleRecupererTousLesElements(promiseIdentifiedUser?.user.id)
    //}, [])

    const handleClearAllIndexedDB = async () => {
        if (url === 'file') {
            navigate(`/works/file`)
        }
        handleClearIndexedDB()
    }

    const handleButtonClick = () => {
        // Activez l'animation en mettant à jour l'état local
        setActiveAnimation(false);
        setContextMenuTabs(false)

        // Vous pouvez également désactiver l'animation après un certain délai si nécessaire
        setTimeout(() => {
            setHiddenMenuSidebare(false)
        }, 300); // Par exemple, désactivez l'animation après 1 seconde
    };

    useKeypress(['Escape'], (event) => {
        if (!hiddenMenuSidebare) {
            return;
        }
        event.preventDefault();
        handleButtonClick()
    });

    const touchStartX = useRef(null);
    const touchStartY = useRef(null);
    const swipeTolerance = 10; // Tolérance de swipe

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
                handleButtonClick()
            } else {
                // Swipe vers la droite détecté
            }
        }

        touchStartX.current = null;
        touchStartY.current = null;
    };



    if (!hiddenMenuSidebare) return null

    return (
        <>
            <div className="blanket open-element-page-melted" style={{ zIndex: 25000, paddingTop: 0 }}>
                <RemoveScroll
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    removeScrollBar={false} ref={wrapperRef} className={activeAnimation ? "sideNav open-element-page-side-left scrollbar" : "sideNav close-element-page-side-left scrollbar"} data-theme={localTheme}>
                    <div className='sideNavContent'>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginTop: 5 }}>
                            <div className='button_option_container' style={{ width: '100%', maxWidth: 50, marginLeft: 10, display: 'flex', background: 'none' }} data-theme={localTheme}>
                                <div className='button_option' onClick={handleButtonClick} style={{ height: 40, width: 40, borderRadius: 100, marginRight: 5 }} data-theme={localTheme}><FontAwesomeIcon icon={faArrowLeft} /></div>
                            </div>
                            <div style={{ display: 'flex', width: '100%', alignItems: 'center', maxWidth: 200, justifyContent: 'center' }}>
                                <img className='logo_event' style={{ height: 30 }} src={logo} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                            </div>
                        </div>
                        <h4>{SystemName}</h4>
                        <div className='button_option_container' style={{ width: '98%', marginBottom: 5 }} data-theme={localTheme}>
                            <Link to={'/new-posts'} className='button_option' data-theme={localTheme} >
                                <div className='button_option-content'><FontAwesomeIcon style={{ marginRight: 10 }} icon={faNewspaper} />
                                    <div className='button_option-content-text'>
                                        New posts
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className='button_option_container' style={{ width: '98%', marginBottom: 5 }} data-theme={localTheme}>
                            <div className='button_option' data-theme={localTheme} >
                                <div className='button_option-content'>
                                    <FontAwesomeIcon style={{ marginRight: 10 }} icon={faFile} />
                                    <div className='button_option-content-text'>
                                        {t('little_known')}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='button_option_container' style={{ width: '98%', marginBottom: 20 }} data-theme={localTheme}>
                            <div className='button_option' data-theme={localTheme} >
                                <div className='button_option-content'>
                                    <FontAwesomeIcon style={{ marginRight: 10 }} icon={faTrophy} />
                                    <div className='button_option-content-text'>
                                        Rankings
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*<div className='button_option_container' style={{ width: '98%', marginBottom: 10 }} data-theme={localTheme}>
                            <Link to={'/parameters/premium'} className='btnPremium' data-theme={localTheme} ><FontAwesomeIcon style={{ marginRight: 10, color: '#cfc09f' }} icon={faCrown} />{t("all_parameter.button2")}</Link>
                        </div>
                        {<Link to={`/${SystemName}-shop`} onClick={handleButtonClick} className='button_option_container' style={{ width: '98%', marginBottom: 10, textDecoration: 'none' }}>
                            <div className='button_optionColoringBlue' ><FontAwesomeIcon style={{ marginRight: 10 }} icon={faWandSparkles} />{t('accessPass')}</div>
                        </Link>}
                        <div className='button_option_container' style={{ width: '98%', marginBottom: 10 }} data-theme={localTheme}>
                            <div className='button_optionColoringPurple' data-theme={localTheme} ><FontAwesomeIcon style={{ marginRight: 10 }} icon={faMedal} />{SystemName} Masterpiece</div>
                        </div>
                        <Link to={`/${SystemName}-game`} onClick={handleButtonClick} className='button_option_container' style={{ width: '98%', marginBottom: 10, textDecoration: 'none' }}>
                            <div className='btn textLoto' style={{ fontSize: 20 }} >{SystemName} Game</div>
    </Link>*/}
                        <h4 style={{ paddingTop: 20, borderTop: '1px solid #3a3a3a', width: '98%', textAlign: 'center' }}>{t('type_of_file')}</h4>
                        <div className='button_option_container' style={{ width: '98%', marginBottom: 20 }} data-theme={localTheme}>
                            <div className='button_option' data-theme={localTheme} >
                                <div className='button_option-content'>
                                    <FontAwesomeIcon style={{ marginRight: 10 }} icon={faList} />
                                    <div className='button_option-content-text'>
                                        All
                                    </div>
                                </div>
                            </div>
                            <div className='button_option' data-theme={localTheme} >
                                <div className='button_option-content'>
                                    <FontAwesomeIcon style={{ marginRight: 10 }} icon={faImages} />
                                    <div className='button_option-content-text'>
                                        Illustration
                                    </div>
                                </div>
                            </div>
                            <div className='button_option' data-theme={localTheme} >
                                <div className='button_option-content'>
                                    <FontAwesomeIcon style={{ marginRight: 10 }} icon={faBookOpen} />
                                    <div className='button_option-content-text'>
                                        Manga
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div style={{ display: 'flex', width: '98%', alignItems: 'center', justifyContent: 'center', marginBottom: 10, paddingTop: 20, borderTop: '1px solid #3a3a3a' }}>
                            <h4 style={{ margin: 0 }}>{t('workspace')}</h4>
                            <div onClick={() => { setContextMenuTabs(!contextMenuTabs) }} className='button_option button_option_work' style={{ width: 20, paddingLeft: 10, paddingRight: 10, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}>
                                <FontAwesomeIcon className={!contextMenuTabs ? '' : 'boxBounce'} style={{ color: localTabs?.length > 0 ? '#ec1c24' : '' }} icon={faWindowRestore} />
                            </div>
                        </div>

                        <div onClick={handleButtonClick} className='button_option_container' style={{ width: '98%', marginBottom: 10 }} data-theme={localTheme}>
                            <Link to={'/works/file'} className='button_option' data-theme={localTheme} >
                                <div className='button_option-content'>
                                    <FontAwesomeIcon style={{ marginRight: 10 }} icon={faPhotoFilm} />
                                    <div className='button_option-content-text'>
                                        {t('projects')}
                                    </div>
                                </div>
                            </Link>
                            <Link to={`/works/library`} className='button_option' data-theme={localTheme} >
                                <div className='button_option-content'>
                                    <FontAwesomeIcon style={{ marginRight: 10 }} icon={faLayerGroup} />
                                    <div className='button_option-content-text'>
                                        {t('library')}
                                    </div>
                                </div>
                            </Link>
                            <Link to={`/works/statisticals`} className='button_option' data-theme={localTheme} >
                                <div className='button_option-content'>
                                    <FontAwesomeIcon style={{ marginRight: 10 }} icon={faChartLine} />
                                    <div className='button_option-content-text'>
                                        {t('statistical')}
                                    </div>
                                </div>
                            </Link>
                            <Link to={'/works/problem'} className='button_option' data-theme={localTheme} >
                                <div className='button_option-content'>
                                    <FontAwesomeIcon style={{ marginRight: 10 }} icon={faTriangleExclamation} />
                                    <div className='button_option-content-text'>
                                        {t('Known_Issue')}
                                    </div>
                                </div>
                            </Link>
                        </div>
                        {/*localTabs.length != 0 && <>{localTabs?.map((promise, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', width: '90%', marginBottom: 10 }} title={promise.name}>
                                <NavLink onClick={handleButtonClick} to={(`/works/${SystemName}-Workspace?update-file=${promise.id}`)} className='button_option button_option_work' style={{ justifyContent: 'space-between', height: 30, borderRadius: 100 }} data-theme={localTheme}>
                                    <div style={{ marginLeft: 5, width: 130, paddingRight: 50, display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} translate='no' >
                                        <img src={promise.miniature || Picture} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ height: 25, width: 25, borderRadius: 50, marginRight: 10, objectFit: 'cover', objectPosition: '50% 0%' }} alt='' />
                                        {promise.type === 'Illustrations' && <FontAwesomeIcon className={urlId !== promise.id ? '' : 'boxBounce'} style={{ color: urlId !== promise.id ? '' : '#ec1c24', marginRight: 5 }} icon={faImages} />}
                                        {promise.type === 'Manga' && <FontAwesomeIcon className={urlId !== promise.id ? '' : 'boxBounce'} style={{ color: urlId !== promise.id ? '' : '#ec1c24', marginRight: 5 }} icon={faBookOpen} />}
                                        {promise.name}
                                    </div>
                                    {urlId === promise.id && <div className='ellipsis-animation'></div>}
                                </NavLink>
                                <FontAwesomeIcon onClick={() => { handleDelTab(promise) }} className='faXmark' style={{ marginLeft: 5 }} icon={faXmark} data-theme={localTheme} />
                            </div>
                        ))}
                    </>*/}
                        <h4 style={{ paddingTop: 20, borderTop: '1px solid #3a3a3a', width: '98%', textAlign: 'center' }}>{t('options')}</h4>
                        <div className='button_option_container' style={{ width: '98%', marginBottom: 20 }} data-theme={localTheme}>
                            <Link to={`/parameters/assistance`} className='button_option' data-theme={localTheme} >
                                <div className='button_option-content'>
                                    <FontAwesomeIcon style={{ marginRight: 10 }} icon={faQuestionCircle} />
                                    <div className='button_option-content-text'>
                                        {t('assistance')}
                                    </div>
                                </div>
                            </Link>
                            <div className='button_option' data-theme={localTheme} >
                                <div className='button_option-content'>
                                    <FontAwesomeIcon style={{ marginRight: 10 }} icon={faInfoCircle} />
                                    <div className='button_option-content-text'>
                                        {t('information')}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='button_option_container' style={{ width: '98%', marginBottom: 20 }} data-theme={localTheme}>
                            {/*<Link className='button_option' to={'/parameters/assistance'} data-theme={localTheme}>{t('assistance')}</Link>*/}
                            <div onClick={() => {
                                addSearchToUrl(`#${SystemName}-conditions`)
                                handleButtonClick()
                            }} className='button_option' data-theme={localTheme} >
                                <div className='button_option-content'>
                                    <FontAwesomeIcon style={{ marginRight: 10 }} icon={faFileLines} />
                                    <div className='button_option-content-text'>
                                        {t('terms_of_use')}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h4 style={{ paddingTop: 20, borderTop: '1px solid #3a3a3a', width: '98%', textAlign: 'center' }}>Update</h4>
                        <div className='button_option_container' style={{ width: '98%', marginBottom: 20 }} data-theme={localTheme}>
                            <div className='button_option' data-theme={localTheme} >
                                <div className='button_option-content'>
                                    <FontAwesomeIcon style={{ marginRight: 10 }} icon={faDownLong} />
                                    <div className='button_option-content-text'>
                                        Update [{SystemName}]
                                    </div>
                                </div>
                            </div>
                        </div>

                        {promiseIdentifiedUser?.user.isAdmin === true && <>
                            <h4 style={{ paddingTop: 20, borderTop: '1px solid #3a3a3a', width: '98%', textAlign: 'center' }}>{t('admin')}</h4>
                            <div className='button_option_container' style={{ width: '98%', marginBottom: 20 }} data-theme={localTheme}>
                                <div className='button_optionGreen' data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10 }} icon={faUserSecret} />{t('admin')}</div>
                            </div></>}
                        {promiseIdentifiedUser?.user.isMaster === true && <>
                            <div className='button_option_container' style={{ width: '98%', marginBottom: 20 }} data-theme={localTheme}>
                                <div className='buttonCirclePurple' data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10 }} icon={faUserTie} />Master</div>
                            </div></>}
                        {!systemDetectMobile ?
                            <>
                                <h4 style={{ paddingTop: 20, borderTop: '1px solid #3a3a3a', width: '98%', textAlign: 'center' }}>Shortcut keyboard:</h4>
                                <div>Can be used under certain conditions.</div>

                                <div><FontAwesomeIcon icon={faKeyboard} /> Enter</div>
                                <div><FontAwesomeIcon icon={faKeyboard} /> Escape</div>
                                <div><FontAwesomeIcon icon={faKeyboard} /> Ctrl + S</div>
                                <div><FontAwesomeIcon icon={faKeyboard} /><FontAwesomeIcon style={{ marginLeft: 5 }} icon={faArrowLeft} />  <FontAwesomeIcon icon={faArrowRight} /></div>
                            </>
                            :
                            <>
                                <h4 style={{ paddingTop: 20, borderTop: '1px solid #3a3a3a', width: '98%', textAlign: 'center' }}>Touch Screen:</h4>
                                <div>Movement can be used under certain conditions.</div>

                                <div><FontAwesomeIcon icon={faFingerprint} /> swipe <FontAwesomeIcon style={{ marginLeft: 5 }} icon={faArrowLeft} />  <FontAwesomeIcon icon={faArrowRight} /></div>

                                <div style={{ marginTop: 10 }}>Image Viewer:</div>
                                <div><FontAwesomeIcon icon={faFingerprint} /> Zoom = Touch 2 fingers at the same time</div>
                                <div><FontAwesomeIcon icon={faFingerprint} /> ZoomOut = Double-tap</div>
                                <div><FontAwesomeIcon icon={faFingerprint} /> Close = Double-tap</div>
                                <div><FontAwesomeIcon icon={faFingerprint} /> Move = Tap & Move</div>
                            </>}
                    </div>

                    <WorkSpaceTabs contextMenuTabs={contextMenuTabs} setContextMenuTabs={setContextMenuTabs} navigateOff={true} systemDetectMobile={systemDetectMobile} />

                </RemoveScroll >
            </div >
        </>
    )
}

export default NavbarMenu