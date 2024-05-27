import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/UseAppContext';
import { useEffect, useRef, useState } from 'react';
import Picture from '../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faBookOpen, faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faImages, faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { supprimerElement, IndexedDB } from '../assets/data/IndexedDB';
import { SystemName } from '../assets/data/data';
import { useWorkspaceContext } from '../contexts/UseWorkspaceContexte';
import { useTranslation } from 'react-i18next';
import Card_select from '../components/Cards/Card_select';
import Pagination from './pagination/pagination';
import { RemoveScroll } from 'react-remove-scroll';
import axios from 'axios';
import { API_URL } from '../config';



const WorkSpaceTabs = (props) => {

    let myRegex = new RegExp(/^[0-9a-zA-Z-éçàùè]+$/i);

    const { t } = useTranslation();

    const {
        isNavbarVisible,
        localTheme,
        systemDetectMobile
    } = useAppContext();

    const {
        handleRecupererTousLesElements,
        handleClearIndexedDB,
        localTabs,
        promise,
        otherlocalTabs,
        totalFiles,
        GetMyFilesFromAPI,
        PER_PAGE,
        setNumPage,
        numPage } = useWorkspaceContext();


    const fullUrl = useLocation()
    const navigate = useNavigate()


    const searchParams = new URLSearchParams(fullUrl.search);
    const urlId = parseInt(searchParams.get("update-file"));


    const [editSearch, setEditSearch] = useState('');
    const [errFront, setErrFront] = useState({
        err: ''
    })
    const [searchPromise, setSearchPromise] = useState(null)
    const [hiddenPaginationSearch, setHiddenPaginationSearch] = useState(false)

    const handleDelTab = async (el) => {

        // Étape 1 : Trouvez l'indice de l'élément recherché dans le tableau
        const indexElementSearch = localTabs.findIndex((item) => item.id === el.id);

        if (indexElementSearch !== -1 && indexElementSearch > 0) {
            // Étape 2 : Obtenez l'élément précédent en utilisant l'indice
            if (urlId === el.id) {
                const elementPrevious = localTabs[indexElementSearch - 1];
                navigate(`/works/${SystemName}-Workspace?update-file=${elementPrevious?.id}`)//(`/works/file/${elementPrevious?.id}`)
            }
        } else {
            if (urlId === el.id) {
                const elementPrevious = localTabs[indexElementSearch + 1];
                navigate(`/works/${SystemName}-Workspace?update-file=${elementPrevious?.id}`)//(`/works/file/${elementPrevious?.id}`)
                if (elementPrevious === undefined) {
                    navigate(`/works/file`)
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

    const handleClearAllIndexedDB = async () => {
        handleClearIndexedDB()
        if (urlId) {
            navigate(`/works/file`)
        }
    }

    // gestion pagination
    const pageCount = Math.ceil(totalFiles / PER_PAGE)
    const handlePage = async ({ selected: selectedPage }) => {
        setNumPage(selectedPage)
        GetMyFilesFromAPI()
    }

    // recherche API
    const SearchFiles = async () => {
        if (editSearch === "") {
            setErrFront({
                err: ''
            })
        } else if (!myRegex.test(editSearch)) {
            setErrFront({
                err: "Special characters are not supported."
            });

        } else {
            await axios.get(`${API_URL}api/eventv/search/myfiles/files/${editSearch}`,
                { withCredentials: true })
                .then((res) => {
                    setSearchPromise(res.data);
                    setErrFront({ err: '' });
                    setHiddenPaginationSearch(true);
                })
        }
    }

    // saisie de text pour la recherche
    const handleSearch = event => {
        setEditSearch(event.target.value);
        if (event.target.value.length === 0) {
            setSearchPromise(null)
            setHiddenPaginationSearch(false)
        }
        if (event.key === 'Enter') {
            event.preventDefault()
            SearchFiles()
        }
    };

    // nettoyage à la fermeture de recherche
    const handleCloseSearch = () => {
        setEditSearch('')
        setSearchPromise(null)
        setHiddenPaginationSearch(false)
    }

    if (!props.contextMenuTabs) return null

    return (
        <>
            <RemoveScroll
                removeScrollBar={false}
                style={{
                    width: '98%',
                    maxWidth: props.systemDetectMobile === false ? 1600 : 300,
                    overflow: 'auto',
                    maxHeight: '70vh',
                    position: 'fixed',
                    top: isNavbarVisible ? 95 : 45,
                    left: props.systemDetectMobile === false ? '50%' : '5px',
                    transform: props.systemDetectMobile === false ? 'translate(-50%, 0%)' : 'translate(0%, 0%)',
                    border: '1px solid grey',
                    transition: '700ms',
                    borderRadius: 5
                }}
                className='menu_navbar menu_navbar_nav980 menu_navbar_navPc open-element-page-melted scrollbar' data-theme={localTheme}>
                <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10, borderBottom: '1px solid grey', marginBottom: 10 }}>
                    <h4 style={{ margin: 0 }}>{t('workspace')}</h4>
                    <div onClick={() => { props.setContextMenuTabs(false) }} className='button_option button_option_work' style={{ width: 10, paddingLeft: 10, paddingRight: 10, justifyContent: 'center', whiteSpace: 'nowrap', height: 25, borderRadius: 100, marginLeft: 5, marginBottom: -5 }} data-theme={localTheme}>
                        <FontAwesomeIcon style={{ color: '#ec1c24' }} icon={faClose} />
                    </div>
                </div>

                <div className='rowDoubleposition' style={{ width: '100%', maxWidth: '100%', height: 200 }}>
                    <div className='rowDoublepositionContent scrollbar' style={{ background: 'none', justifyContent: 'start', border: '1px solid grey', overflow: 'auto' }} data-theme={localTheme}>
                        <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', paddingTop: 10, paddingBottom: 10 }}>
                            <h4 style={{ margin: 0 }}>local tabs</h4>
                        </div>
                        {localTabs.length != 0 && <div onClick={handleClearAllIndexedDB} className='button_optionRed' style={{ width: '100%', maxWidth: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 25, borderRadius: 100, marginBottom: 5 }} data-theme={localTheme}>
                            Clear
                        </div>}
                        {localTabs?.length > 0 ? <>
                            {localTabs?.map((promise, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center', width: '90%', marginBottom: 10 }} title={promise.name}>
                                    <Link to={(`/works/${SystemName}-Workspace?${SystemName}-file=${promise.id}`)} className='button_option button_option_work' style={{ justifyContent: 'space-between', height: 30, borderRadius: 100 }} data-theme={localTheme}>
                                        <div style={{ marginLeft: 5, width: 130, paddingRight: 50, display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} translate='no' >
                                            <img src={promise.miniature || Picture} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ height: 25, width: 25, borderRadius: 50, marginRight: 10, objectFit: 'cover', objectPosition: '50% 0%' }} alt='' />
                                            {promise.type === 'Illustrations' && <FontAwesomeIcon className={urlId !== promise.id ? '' : 'boxBounce'} style={{ color: urlId !== promise.id ? '' : '#ec1c24', marginRight: 5 }} icon={faImages} />}
                                            {promise.type === 'Manga' && <FontAwesomeIcon className={urlId !== promise.id ? '' : 'boxBounce'} style={{ color: urlId !== promise.id ? '' : '#ec1c24', marginRight: 5 }} icon={faBookOpen} />}
                                            {promise.name}
                                        </div>
                                        {urlId === promise.id && <div className='ellipsis-animation'></div>}
                                    </Link>
                                    <FontAwesomeIcon onClick={() => { handleDelTab(promise) }} className='faXmark' style={{ marginLeft: 5 }} icon={faXmarkCircle} data-theme={localTheme} />
                                </div>
                            ))}</>
                            :
                            <>
                                <div style={{ color: 'grey', textAlign: 'center' }}>No results</div>
                            </>}


                    </div>
                    <div className='rowDoublepositionContent scrollbar' style={{ background: 'none', justifyContent: 'start', border: '1px solid grey', overflow: 'auto' }} data-theme={localTheme}>




                        <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', paddingTop: 10, paddingBottom: 10 }}>
                            <h4 style={{ margin: 0 }}>Other user</h4>
                        </div>

                        {otherlocalTabs?.length > 0 ? <>
                            {otherlocalTabs?.map((promise, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center', width: '90%', marginBottom: 10 }} title={promise.name}>
                                    <div className='button_option button_option_work' style={{ justifyContent: 'space-between', height: 30, borderRadius: 100 }} data-theme={localTheme}>
                                        <div style={{ marginLeft: 5, width: 130, paddingRight: 50, display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} translate='no' >
                                            <img src={promise.miniature || Picture} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ height: 25, width: 25, borderRadius: 50, marginRight: 10, objectFit: 'cover', objectPosition: '50% 0%' }} alt='' />
                                            {promise.type === 'Illustrations' && <FontAwesomeIcon className={urlId !== promise.id ? '' : 'boxBounce'} style={{ color: urlId !== promise.id ? '' : '#ec1c24', marginRight: 5 }} icon={faImages} />}
                                            {promise.type === 'Manga' && <FontAwesomeIcon className={urlId !== promise.id ? '' : 'boxBounce'} style={{ color: urlId !== promise.id ? '' : '#ec1c24', marginRight: 5 }} icon={faBookOpen} />}
                                            {promise.name}
                                        </div>
                                        {urlId === promise.id && <div className='ellipsis-animation'></div>}
                                    </div>
                                    <FontAwesomeIcon onClick={() => { handleDelTab(promise) }} className='faXmark' style={{ marginLeft: 5 }} icon={faXmarkCircle} data-theme={localTheme} />
                                </div>
                            ))}
                        </>
                            :
                            <>
                                <div style={{ color: 'grey', textAlign: 'center' }}>No results</div>
                            </>}

                    </div>
                </div>

                {systemDetectMobile === false && <>

                    <div style={{ marginTop: 20, display: 'flex', width: '98%', alignItems: 'center', justifyContent: 'center' }}>
                        <input onKeyDown={handleSearch} onChange={handleSearch} className='input_text' placeholder={t('search')} type="text" name="Search" id="Search" value={editSearch} data-theme={localTheme} />
                        {editSearch !== "" && <div className='button_option_container shadowbox' style={{ width: '100%', maxWidth: 80, marginLeft: 10, display: 'flex' }} data-theme={localTheme}>
                            <div className='button_option' onClick={handleCloseSearch} style={{ width: '100%' }} data-theme={localTheme}><FontAwesomeIcon icon={faXmark} /></div>
                            <div className='button_option' onClick={SearchFiles} style={{ width: '100%' }} data-theme={localTheme}><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
                        </div>}
                    </div>

                    <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', paddingTop: 10, paddingBottom: 10 }}>
                        <h4 style={{ margin: 0 }}>Files</h4>
                    </div>
                    <div style={{ marginTop: 10, width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                        <Card_select checkboxDisable={true} promise={searchPromise === null ? promise : searchPromise} localTheme={localTheme} />
                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        {pageCount > 1 && <>
                            {!hiddenPaginationSearch &&
                                <Pagination
                                    pageCount={pageCount}
                                    onPageChange={handlePage}
                                    initialPage={numPage}
                                    localTheme={localTheme}
                                />}</>}

                    </div></>}
            </RemoveScroll>
        </>
    )
}

export default WorkSpaceTabs