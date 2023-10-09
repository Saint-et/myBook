import '../sass/components/SideNav.scss';
import Picture from '../assets/images/logo.png';
import { RemoveScroll } from "react-remove-scroll";
import logo from '../assets/images/logo_transparent_banner.png';
import logoBlack from '../assets/images/logo_transparent_banner_black.png';
import logoWorkspace from '../assets/images/workspace_white.png';
import logoBlackWorkspace from '../assets/images/workspace_black.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faBookOpen, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { faImages } from '@fortawesome/free-regular-svg-icons';
import { useAppContext } from "../contexts/UseAppContext";
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { supprimerElement, IndexedDB } from '../assets/data/IndexedDB';
import { useEffect, useRef, useState } from 'react';


const NavbarMenu = () => {

    const {
        activeAnimation, setActiveAnimation,
        localTheme,
        handleRecupererTousLesElements,
        localTabs,
        setHiddenMenuSidebare,
        hiddenMenuSidebare, } = useAppContext()

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

    

    const handleButtonClick = () => {
        // Activez l'animation en mettant à jour l'état local
        setActiveAnimation(false);

        // Vous pouvez également désactiver l'animation après un certain délai si nécessaire
        setTimeout(() => {
            setHiddenMenuSidebare(false)
        }, 300); // Par exemple, désactivez l'animation après 1 seconde
    };



    if (!hiddenMenuSidebare) return null

    return (
        <>
            <div className="blanket animation" style={{ zIndex: 10500 }}>
                <RemoveScroll removeScrollBar={false} ref={wrapperRef} className={activeAnimation ? "sideNav open-elementHeightPageSide" : "sideNav close-elementHeightPageSide"} data-theme={localTheme}>
                    <div onClick={handleButtonClick} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#ec1c24', cursor: 'pointer' }}>
                        <div style={{ width: 45, height: 30, display: 'flex', fontSize: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 200, cursor: 'pointer' }} data-theme={localTheme}>
                            <FontAwesomeIcon icon={faBars} />
                        </div>
                        <div style={{ display: 'flex', width: '100%', alignItems: 'center', maxWidth: 200, justifyContent: 'center' }}>
                            {localTheme === null && <img className='logo_event' src={logoBlack} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />}
                            {localTheme === 'default' && <img className='logo_event' src={logoBlack} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />}
                            {localTheme === 'dark' && <img className='logo_event' src={logo} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />}
                        </div>
                    </div>
                    <h2>See!</h2>
                    <div className='button_option_container' style={{ width: '98%', marginBottom: 20 }} data-theme={localTheme}>
                    <div className='button_option' data-theme={localTheme} >Illustration</div>
                    <div className='button_option' data-theme={localTheme} >Manga</div>
                    </div>
                    <div>
                        {localTheme === null && <img src={logoBlackWorkspace} style={{ height: 30 }} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />}
                        {localTheme === 'default' && <img src={logoBlackWorkspace} style={{ height: 30 }} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />}
                        {localTheme === 'dark' && <img src={logoWorkspace} style={{ height: 30 }} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />}
                    </div>
                    {localTabs?.map((promise, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', width: '90%' }} title={promise.name}>
                            <NavLink to={`/works/file/${promise.id}`} className='button_option button_option_work' style={{ justifyContent: 'space-between', height: 40 }} data-theme={localTheme}>
                                <div style={{ marginLeft: 5, width: 130, paddingRight: 50, display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} translate='no' >
                                    <img src={promise.miniature || Picture} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ height: 30, width: 30, borderRadius: 50, marginRight: 10, objectFit: 'cover', objectPosition: '50% 0%' }} alt='' />
                                    {promise.type === 'Illustrations' && <FontAwesomeIcon className={fullLocation !== `/works/file/${promise.id}` ? '' : 'boxBounce'} style={{ color: fullLocation !== `/works/file/${promise.id}` ? '' : '#ec1c24', marginRight: 5 }} icon={faImages} />}
                                    {promise.type === 'Manga' && <FontAwesomeIcon className={fullLocation !== `/works/file/${promise.id}` ? '' : 'boxBounce'} style={{ color: fullLocation !== `/works/file/${promise.id}` ? '' : '#ec1c24', marginRight: 5 }} icon={faBookOpen} />}
                                    {promise.name}
                                </div>
                                <div className='ellipsis-animation'></div>
                            </NavLink>
                            <div>
                                <FontAwesomeIcon onClick={() => { handleDelTab(promise) }} className='faXmark' icon={faXmark} data-theme={localTheme} />
                            </div>
                        </div>
                    ))}
                </RemoveScroll>
            </div>
        </>
    )
}

export default NavbarMenu