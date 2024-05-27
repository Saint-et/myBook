import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faPlus, faArrowLeft, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { faImages } from "@fortawesome/free-regular-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from '../../../contexts/UseAppContext';
import TagsProfilHome from './TagsProfilHome';
import { useTranslation } from 'react-i18next';
import logo from '../../../assets/images/logo_transparent_banner.png';
import Card_articles from '../../../components/Cards/Card_articles';
import Card_files from "../../../components/Cards/Card_articles";
import Card_library from '../../../components/Cards/Card_library';
import Pagination from '../../../components/pagination/pagination';
import { RemoveScroll } from 'react-remove-scroll';
import Editor from '@draft-js-plugins/editor';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import { EditorState, convertFromRaw } from 'draft-js';

const Catalogues = (props) => {

    const editor = useRef();

    const { localTheme, promiseIdentifiedUser } = useAppContext();

    const [promiseText, setPromiseText] = useState(() => EditorState.createEmpty());

    const navigate = useNavigate()

    const { t } = useTranslation();

    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const libraryUrl = parseInt(searchParams.get("library")) || null;
    const typeUrl = searchParams.get("type");


    useEffect(() => {
        if (!libraryUrl) {
            props.setLibraryOpen(); // Mettre à jour l'état pour fermer la bibliothèque
            setPromiseText(() => EditorState.createEmpty()); // Réinitialiser l'état de l'éditeur à vide
        } else {
            const library = props.library.find((el) => el.id === libraryUrl);
            props.setLibraryOpen(library); // Mettre à jour l'état pour ouvrir la bibliothèque sélectionnée

            if (library) {
                try {
                    // Convertir la chaîne JSON en objet JavaScript
                    const jsonData = JSON.parse(library.data);

                    // Convertir les données JSON en ContentState
                    const contentState = convertFromRaw(jsonData);

                    // Créer un EditorState avec le ContentState obtenu
                    const editorState = EditorState.createWithContent(contentState);

                    // Mettre à jour l'état de l'éditeur avec le nouvel EditorState
                    setPromiseText(editorState);
                } catch (error) {
                    console.error('Erreur lors de la conversion des données JSON :', error);
                    // Gérer l'erreur si la conversion échoue
                }
            }
        }
    }, [libraryUrl, props]);

    const linkifyPlugin = createLinkifyPlugin({ target: '_blank' });

    return (
        <>
            {libraryUrl && <RemoveScroll className="blanket_opacte open-elementHeightPage scrollbar" style={{ zIndex: 25000, paddingTop: 0, display: 'flex', justifyContent: 'start', flexDirection: 'column', overflow: 'auto', paddingTop: 50 }} data-theme={localTheme}>
                <div className='nav_bar_scnd' style={{ margin: 0, padding: 0, height: 50, borderRadius: 0, alignItems: 'start', position: 'fixed', top: 0, zIndex: 10000, }} data-theme={localTheme}>
                    <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', marginTop: 5 }}>
                        <div onClick={() => {navigate({ search: `type=${typeUrl}` })}} className='button_option_container' style={{ maxWidth: 50, marginLeft: 10, display: 'flex', background: 'none' }} data-theme={localTheme}>
                            <div className='button_option' style={{ height: 40, width: 40, borderRadius: 100, marginRight: 5 }} data-theme={localTheme}><FontAwesomeIcon icon={faArrowLeft} /></div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', maxWidth: 200, justifyContent: 'center' }}>
                            <img className='logo_event' style={{ height: 30 }} src={logo} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                        </div>
                    </div>
                </div>

                <div className='cter_sect'>
                    <div className='ctent_arti' style={{ paddingTop: 10, marginTop: 30 }} data-theme={localTheme}>
                        <div style={{ width: '95%', display: 'flex', alignItems: 'center' }}>
                            <h4 style={{ margin: 10 }}>{props.libraryOpen?.name}<FontAwesomeIcon style={{ marginLeft: 5 }} icon={faLayerGroup} /></h4>
                        </div>

                        {promiseText && <div style={{ width: '94%', marginTop: 10, marginBottom: 20 }} data-theme={localTheme}>
                            <Editor
                                ref={editor}
                                editorState={promiseText}
                                onChange={(newEditorState) => setPromiseText(newEditorState)}
                                plugins={[linkifyPlugin]}
                                readOnly={true}
                                placeholder={"L’utilisateur n’a laissé aucun commentaire sur cette publication."}
                            />
                        </div>}

                        <Card_files profile={promiseIdentifiedUser} promise={props.libraryOpen?.files} />
                    </div>
                </div>

            </RemoveScroll>}

            <div className='cter_sect' style={{ marginTop: 20 }}>
                <div className='ctent_arti' data-theme={localTheme}>
                    <div className='nav_bar_scnd' style={{ padding: 0, marginBottom: 10 }} data-theme={localTheme}>
                        <div style={{ width: '98%', marginBottom: 10 }}>
                            <h4 style={{ margin: 10 }}>{t('library')}<FontAwesomeIcon style={{ marginLeft: 5 }} icon={faLayerGroup} /></h4>
                        </div>
                    </div>

                    <Card_library promise={props.library} setLibraryOpen={props.setLibraryOpen} libraryOpen={props.libraryOpen} />

                </div>
            </div>


            <div className='cter_sect'>
                <div className='ctent_arti' data-theme={localTheme}>
                    <div className='nav_bar_scnd' style={{ width: '100%', maxWidth: '100%', display: 'flex', flexDirection: 'row', paddingTop: 10 }} data-theme={localTheme}>
                        <div onClick={() => { props.handleClickCatalog('Illustrations') }} className='button_option' style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}>
                            <FontAwesomeIcon style={{ marginRight: 5, color: props.typeUrlCatalog === 'Illustrations' ? '#ec1c24' : '' }} icon={faImages} />Illustrations
                        </div>
                        <div onClick={() => { props.handleClickCatalog('Manga') }} className='button_option' style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}>
                            <FontAwesomeIcon style={{ marginRight: 5, color: props.typeUrlCatalog === 'Manga' ? '#ec1c24' : '' }} icon={faBookOpen} />Manga
                        </div>
                    </div>

                    <TagsProfilHome promiseApp={promiseIdentifiedUser} typeUrl={props.typeUrlCatalog} localTheme={localTheme} />


                    <div style={{ width: '95%', display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h4 data-theme={localTheme} style={{ margin: 0 }}>{t('activities')}</h4>
                            {promiseIdentifiedUser && <>
                                {props.url[4] == promiseIdentifiedUser.user.id && <Link to={'/workspace/files'} className='buttonCircle' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 12, marginBottom: -5 }} data-theme={localTheme}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </Link>}</>}
                        </div>
                        <div data-theme={localTheme} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}><div translate='no' style={{ fontSize: 22, fontWeight: 700 }}>{props.url[6]}</div><div style={{ width: '100%', display: 'flex' }}>Documents found:<div>{props.total}</div></div></div>
                    </div>

                    <Card_articles promise={props.catalog} button={true} />

                    {props.pageCount > 1 && <Pagination onPageChange={props.handlePage} initialPage={props.numPage} pageCount={props.pageCount} localTheme={localTheme} />}

                </div>
            </div>
        </>
    )
}

export default Catalogues