import '../sass/components/SideNav.scss';
import Picture from '../assets/images/logo.png';
import { RemoveScroll } from "react-remove-scroll";
import logo from '../assets/images/logo_transparent_banner.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faBookOpen, faCube, faArrowLeft, faChartLine, faInfoCircle, faList, faDisplay, faClose, faCrown, faBriefcase, faArrowRight, faUserTie, faGamepad, faBagShopping, faDownLong, faUserSecret, faTrophy, faMedal } from '@fortawesome/free-solid-svg-icons';
import { faImages, faKeyboard, faNewspaper } from '@fortawesome/free-regular-svg-icons';
import { useAppContext } from "../contexts/UseAppContext";
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { supprimerElement, IndexedDB } from '../assets/data/IndexedDB';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import useKeypress from 'react-use-keypress';
import { DATA_picv } from '../assets/data/data';


const NavbarMenu = () => {

    const { t } = useTranslation();

    const {
        activeAnimation, setActiveAnimation,
        localTheme,
        handleRecupererTousLesElements,
        localTabs,
        setHiddenMenuSidebare,
        promiseIdentifiedUser,
        hiddenMenuSidebare,
        themeBackground,
        resizeThemeBackground,
        setResizeThemeBackground,
        GetMyProfilFromAPI,
        setHiddenPageBackground,
        handleClearIndexedDB } = useAppContext()

    const navigate = useNavigate()

    const fullLocation = useLocation().pathname
    const location = fullLocation.split("/")
    const Id = location[2];

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

        if (Id === 'file') {
            if (indexElementSearch !== -1 && indexElementSearch > 0) {
                // Étape 2 : Obtenez l'élément précédent en utilisant l'indice
                if (`${Id}/${location[3]}` === `file/${el.id}`) {
                    const elementPrevious = localTabs[indexElementSearch - 1];
                    navigate(`/works/file/${elementPrevious?.id}`)
                }
            } else {
                const elementPrevious = localTabs[indexElementSearch + 1];
                navigate(`/works/file/${elementPrevious?.id}`)
                if (elementPrevious === undefined) {
                    navigate(`/works/files`)
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

    useEffect(() => {
        handleRecupererTousLesElements()
    }, [])

    const handleClearAllIndexedDB = async () => {
        handleClearIndexedDB()
    }

    const handleButtonClick = () => {
        // Activez l'animation en mettant à jour l'état local
        setActiveAnimation(false);

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

    if (!hiddenMenuSidebare) return null

    return (
        <>
            <div className="blanket animation" style={{ zIndex: 25000, paddingTop: 0 }}>
                <RemoveScroll removeScrollBar={false} ref={wrapperRef} className={activeAnimation ? "sideNav open-elementHeightPageSide scrollbar" : "sideNav close-elementHeightPageSide scrollbar"} data-theme={localTheme}>
                    <div className='sideNavContent'>
                        <div onClick={handleButtonClick} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                            <div style={{ width: 45, height: 30, display: 'flex', fontSize: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 200, cursor: 'pointer' }} data-theme={localTheme}>
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </div>
                            <div style={{ display: 'flex', width: '100%', alignItems: 'center', maxWidth: 200, justifyContent: 'center' }}>
                                <img className='logo_event' style={{ height: 25 }} src={logo} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                            </div>
                        </div>
                        <h4>{DATA_picv}</h4>
                        <div className='button_option_container' style={{ width: '98%', marginBottom: 5 }} data-theme={localTheme}>
                            <Link to={'/new-posts'} className='button_option' data-theme={localTheme} ><FontAwesomeIcon style={{ marginRight: 10 }} icon={faNewspaper} />New posts</Link>
                        </div>
                        <div className='button_option_container' style={{ width: '98%', marginBottom: 20 }} data-theme={localTheme}>
                            <div className='button_option' data-theme={localTheme} ><FontAwesomeIcon style={{ marginRight: 10 }} icon={faTrophy} />Rankings</div>
                        </div>
                        <div className='button_option_container' style={{ width: '98%', marginBottom: 10 }} data-theme={localTheme}>
                            <Link to={'/parameters/premium'} className='btnPremium' data-theme={localTheme} ><FontAwesomeIcon style={{ marginRight: 10, color: '#cfc09f' }} icon={faCrown} />{t("all_parameter.button2")}</Link>
                        </div>
                        <Link to={`/${DATA_picv}-shop`} className='button_option_container' style={{ width: '98%', marginBottom: 10, textDecoration: 'none' }}>
                            <div className='button_optionColoringBlue' ><FontAwesomeIcon style={{ marginRight: 10 }} icon={faBagShopping} />Shop</div>
                        </Link>
                        <div className='button_option_container' style={{ width: '98%', marginBottom: 10 }} data-theme={localTheme}>
                            <div className='button_optionColoringPurple' data-theme={localTheme} ><FontAwesomeIcon style={{ marginRight: 10 }} icon={faMedal} />{DATA_picv} Masterpiece</div>
                        </div>
                        <Link to={`/${DATA_picv}-game`} onClick={handleButtonClick} className='button_option_container' style={{ width: '98%', marginBottom: 10, textDecoration: 'none' }}>
                            <div className='btn textLoto' style={{ fontSize: 20 }} >{DATA_picv} Game</div>
                        </Link>
                        <h4>{t('type_of_file')}</h4>
                        <div className='button_option_container' style={{ width: '98%', marginBottom: 20 }} data-theme={localTheme}>
                            <div className='button_option' data-theme={localTheme} ><FontAwesomeIcon style={{ marginRight: 10 }} icon={faList} />All</div>
                            <div className='button_option' data-theme={localTheme} ><FontAwesomeIcon style={{ marginRight: 10 }} icon={faImages} />Illustration</div>
                            <div className='button_option' data-theme={localTheme} ><FontAwesomeIcon style={{ marginRight: 10 }} icon={faBookOpen} />Manga</div>
                        </div>

                        <div style={{ display: 'flex', width: '98%', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                            <h4 style={{ margin: 0 }}>{t('workspace')}</h4>

                            {localTabs.length != 0 && <div onClick={handleClearAllIndexedDB} className='button_option button_option_work' style={{ width: 20, paddingLeft: 10, paddingRight: 10, justifyContent: 'center', whiteSpace: 'nowrap', height: 25, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}>
                                <FontAwesomeIcon style={{ color: '#ec1c24' }} icon={faClose} />
                            </div>}
                        </div>

                        <div className='button_option_container' style={{ width: '98%', marginBottom: 10 }} data-theme={localTheme}>
                            <Link to={'/works/file'} className='button_option' data-theme={localTheme} ><FontAwesomeIcon style={{ marginRight: 10 }} icon={faBriefcase} />{t('workspace')}</Link>
                        </div>
                        {localTabs.length != 0 && <>{localTabs?.map((promise, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', width: '90%' }} title={promise.name}>
                                <NavLink onClick={handleButtonClick} to={`/works/file/${promise.id}`} className='button_option button_option_work' style={{ justifyContent: 'space-between', height: 30, borderRadius: 100 }} data-theme={localTheme}>
                                    <div style={{ marginLeft: 5, width: 130, paddingRight: 50, display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} translate='no' >
                                        <img src={promise.miniature || Picture} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ height: 25, width: 25, borderRadius: 50, marginRight: 10, objectFit: 'cover', objectPosition: '50% 0%' }} alt='' />
                                        {promise.type === 'Illustrations' && <FontAwesomeIcon className={fullLocation !== `/works/file/${promise.id}` ? '' : 'boxBounce'} style={{ color: fullLocation !== `/works/file/${promise.id}` ? '' : '#ec1c24', marginRight: 5 }} icon={faImages} />}
                                        {promise.type === 'Manga' && <FontAwesomeIcon className={fullLocation !== `/works/file/${promise.id}` ? '' : 'boxBounce'} style={{ color: fullLocation !== `/works/file/${promise.id}` ? '' : '#ec1c24', marginRight: 5 }} icon={faBookOpen} />}
                                        {promise.type === '3D' && <FontAwesomeIcon className={fullLocation !== `/works/file/${promise.id}` ? '' : 'boxBounce'} style={{ color: fullLocation !== `/works/file/${promise.id}` ? '' : '#ec1c24', marginRight: 5 }} icon={faCube} />}
                                        {promise.name}
                                    </div>
                                    {fullLocation === `/works/file/${promise.id}` && <div className='ellipsis-animation'></div>}
                                </NavLink>
                                <FontAwesomeIcon onClick={() => { handleDelTab(promise) }} className='faXmark' style={{ marginLeft: 5 }} icon={faXmark} data-theme={localTheme} />
                            </div>
                        ))}
                        </>}
                        <h4>{t('options')}</h4>
                        <div className='button_option_container' style={{ width: '98%', marginBottom: 20 }} data-theme={localTheme}>
                            <div onClick={() => {
                                handleButtonClick()
                                setHiddenPageBackground(true)
                            }} className='button_optionColoring' data-theme={localTheme} ><FontAwesomeIcon style={{ marginRight: 10 }} icon={faDisplay} />Background cropping</div>
                        </div>
                        <div className='button_option_container' style={{ width: '98%', marginBottom: 20 }} data-theme={localTheme}>
                            <Link to={`/statistical`} className='button_option' data-theme={localTheme} ><FontAwesomeIcon style={{ marginRight: 10 }} icon={faChartLine} />{t('statistical')}</Link>
                            <div className='button_option' data-theme={localTheme} ><FontAwesomeIcon style={{ marginRight: 10 }} icon={faInfoCircle} />{t('information')}</div>
                        </div>

                        <div className='button_option_container' style={{ width: '98%', marginBottom: 20 }} data-theme={localTheme}>
                            <Link className='button_option' to={'/parameters/assistance'} data-theme={localTheme}>{t('assistance')}</Link>
                            <Link to={'/condition'} className='button_option' data-theme={localTheme} >{t('terms_of_use')}</Link>
                        </div>

                        <h4>Update</h4>
                        <div className='button_option_container' style={{ width: '98%', marginBottom: 20 }} data-theme={localTheme}>
                            <div className='button_option' data-theme={localTheme} ><FontAwesomeIcon style={{ marginRight: 10 }} icon={faDownLong} />Update [{DATA_picv}]</div>
                        </div>

                        {promiseIdentifiedUser?.user.isAdmin === true && <>
                            <h4>{t('admin')}</h4>
                            <div className='button_option_container' style={{ width: '98%', marginBottom: 20 }} data-theme={localTheme}>
                                <div className='button_optionGreen' data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10 }} icon={faUserSecret} />{t('admin')}</div>
                            </div></>}
                            {promiseIdentifiedUser?.user.isMaster === true && <>
                            <h4>Master</h4>
                            <div className='button_option_container' style={{ width: '98%', marginBottom: 20 }} data-theme={localTheme}>
                                <div className='buttonCirclePurple' data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10 }} icon={faUserTie} />Master</div>
                            </div></>}
                        <div className="keyborad">
                            <h4>Shortcut keyboard:</h4>
                            <div>Can be used under certain conditions.</div>

                            <div><FontAwesomeIcon icon={faKeyboard} /> Enter</div>
                            <div><FontAwesomeIcon icon={faKeyboard} /> Escape</div>
                            <div><FontAwesomeIcon icon={faKeyboard} /> Ctrl + S</div>
                            <div><FontAwesomeIcon icon={faKeyboard} /><FontAwesomeIcon style={{ marginLeft: 5 }} icon={faArrowLeft} />  <FontAwesomeIcon icon={faArrowRight} /></div>
                        </div>
                    </div>
                </RemoveScroll>
            </div>
        </>
    )
}

export default NavbarMenu