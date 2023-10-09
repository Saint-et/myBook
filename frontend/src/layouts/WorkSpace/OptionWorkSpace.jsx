import './WorkSpace.scss';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../contexts/UseAppContext';
import { useEffect, useRef, useState } from 'react';
import gifts from '../../assets/icons/boite-cadeau.png';
import Picture from '../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faClose, faLayerGroup, faPhotoFilm, faTags, faXmark, faBookOpen, faGift } from '@fortawesome/free-solid-svg-icons';
import { faImages, faQuestionCircle  } from '@fortawesome/free-regular-svg-icons';
import { supprimerElement, IndexedDB, clearTableWorkSpace } from '../../assets/data/IndexedDB';
import logo from '../../assets/images/workspace_white.png';
import logoBlack from '../../assets/images/workspace_black.png';
import { useTranslation } from 'react-i18next';

const OptionWorkSpace = () => {

  const { t } = useTranslation();

  const { localTheme, promiseIdentifiedUser, handleRecupererTousLesElements, localTabs } = useAppContext();

  const handleClick = (lastURLworkplace) => {
    localStorage.setItem("last-URL-workplace", lastURLworkplace);
  }


  const ref = useRef(null);

  useEffect(() => { ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }, [])

  const fullLocation = useLocation().pathname
  const location = fullLocation.split("/")
  const Id = location[2];


  const navigate = useNavigate()


  //const [tab, setTab] = useState(JSON.parse(localStorage.getItem('tab-Work-Place')) || [])


  const handleDelTab = async (el) => {
    // Étape 1 : Trouvez l'indice de l'élément recherché dans le tableau
    const indexElementSearch = localTabs.findIndex((item) => item.id === el.id);


    //if (indexElementSearch === -1 && indexElementSearch < 0) {
    //  // Étape 2 : Obtenez l'élément précédent en utilisant l'indice
    //  const elementPrevious = localTabs[indexElementSearch - 1];
    //  navigate(`/works/file/${elementPrevious?.id}`)
    //}


    if (Id === 'file') {
      if (indexElementSearch !== -1 && indexElementSearch > 0) {
        // Étape 2 : Obtenez l'élément précédent en utilisant l'indice
        if ( `${Id}/${location[3]}` === `file/${el.id}`) {
        const elementPrevious = localTabs[indexElementSearch - 1];
        navigate(`/works/file/${elementPrevious?.id}`)
        }
      } else {
        if ( `${Id}/${location[3]}` === `file/${el.id}`) {
        const elementPrevious = localTabs[indexElementSearch + 1];
        navigate(`/works/file/${elementPrevious?.id}`)
        if (elementPrevious === undefined) {
          navigate(`/works/files`)
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


  const handleClearIndexedDB = async () => {
    const db = await IndexedDB();
    clearTableWorkSpace(db)
    .then(() => {
      //console.log('Élément supprimé avec succès');
    handleRecupererTousLesElements()
    navigate(`/works/files`)
    })
    .catch((error) => {
      console.error('Erreur lors de la suppression des éléments :', error);
    });
  }

  useEffect(() => {
    handleRecupererTousLesElements()
  }, [])



  if (promiseIdentifiedUser === false) return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}>
        <h4>You are logged in as a guest, create an account to join us.</h4>
      </div>
    </>
  )


  //<div style={{ width: '100%', position: 'absolute', display: 'flex', justifyContent: 'center', zIndex: 200 }}>
  //      <div style={{ width: '100%', maxWidth: 1800, display: 'flex', justifyContent: 'end' }}>
  //        <div className='button_option_container_free' style={{ width: '100%', maxWidth: 500 }} data-theme={localTheme}>
  //          <div className='button_option' style={{ width: '100%', color: 'red' }} data-theme={localTheme}>Delete</div>
  //        </div>
  //      </div>
  //    </div>

  //

  return (
    <>
      <div className='button_option_container' style={{ width: '100%', display: 'flex', borderRadius: 0, position: 'sticky', top: 0, zIndex: 100, flexDirection: 'column', overflow: 'hidden' }} data-theme={localTheme}>
        <div style={{ display: 'flex' }}>
          <NavLink onClick={() => { handleClick(`/works/files`) }} to={`/works/files`} className='button_option button_option_work' style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 40 }} data-theme={localTheme}>
            <span className='input_text_navMobile' style={{ marginRight: 10 }}>{t('projects')}</span>
            <FontAwesomeIcon className={fullLocation !== `/works/files` ? '' : 'boxBounce' } style={{ color: '#ec1c24' }} icon={faPhotoFilm} />
          </NavLink>
          <NavLink onClick={() => { handleClick(`/works/library`) }} to={`/works/library`} className='button_option button_option_work' style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 40 }} data-theme={localTheme}>
            <span className='input_text_navMobile' style={{ marginRight: 10 }}>{t('library')}</span>
            <FontAwesomeIcon className={fullLocation !== `/works/library` ? '' : 'boxBounce' } style={{ color: '#ec1c24' }} icon={faLayerGroup} />
          </NavLink>
          <NavLink onClick={() => { handleClick(`/works/tags`) }} to={`/works/tags`} className='button_option button_option_work' style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 40 }} data-theme={localTheme}>
            <span className='input_text_navMobile' style={{ marginRight: 10 }}>{t('tags')}</span>
            <FontAwesomeIcon className={fullLocation !== `/works/tags` ? '' : 'boxBounce' } style={{ color: '#ec1c24' }} icon={faTags} />
          </NavLink>
          <NavLink onClick={() => { handleClick(`/works/gifts`) }} to={`/works/gifts`} className='button_option button_option_work' style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 40 }} data-theme={localTheme}>
          <span className='input_text_navMobile' style={{ marginRight: 10 }}>{t('gifts')}</span>
          <FontAwesomeIcon className={fullLocation !== `/works/gifts` ? '' : 'boxBounce' } style={{ color: '#ec1c24' }} icon={faGift} />
          </NavLink>
          <NavLink to={'/works/help'} className='button_option button_option_work' style={{ width: 20, paddingLeft: 10, paddingRight: 10, justifyContent: 'center', whiteSpace: 'nowrap', height: 40 }} title="Information about the workSpace" data-theme={localTheme}>
            <FontAwesomeIcon style={{ color: '#ec1c24' }} icon={faQuestionCircle} />
          </NavLink>
        </div>
        {localTabs?.length > 0 && <div className='scrollbar open-elementTopPage' style={{ display: 'flex', overflow: 'auto' }}>
          <div onClick={handleClearIndexedDB} className='button_option button_option_work' style={{ width: 20, paddingLeft: 10, paddingRight: 10, justifyContent: 'center', whiteSpace: 'nowrap', height: 40 }} title="Closed all tabs" data-theme={localTheme}>
            <FontAwesomeIcon style={{ color: '#ec1c24' }} icon={faClose} />
          </div>
          {localTabs?.map((promise, index) => (
            <div className='open-elementTopPage' key={index} style={{ display: 'flex', alignItems: 'center' }} title={promise.name}>
              <NavLink to={`/works/file/${promise.id}`} className='button_option button_option_work' style={{ justifyContent: 'space-between', height: 40 }} data-theme={localTheme}>
                <div style={{ marginLeft: 5, width: 130, paddingRight: 50, display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} translate='no' >
                  <img src={promise.miniature || Picture} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ height: 30, width: 30, borderRadius: 50, marginRight: 10, objectFit: 'cover', objectPosition: '50% 0%' }} alt='' />
                  {promise.type === 'Illustrations' &&<FontAwesomeIcon className={fullLocation !== `/works/file/${promise.id}` ? '' : 'boxBounce' } style={{color: fullLocation !== `/works/file/${promise.id}` ? '' : '#ec1c24' , marginRight: 5}} icon={faImages} />}
                  {promise.type === 'Manga' &&<FontAwesomeIcon className={fullLocation !== `/works/file/${promise.id}` ? '' : 'boxBounce' } style={{color: fullLocation !== `/works/file/${promise.id}` ? '' : '#ec1c24', marginRight: 5}} icon={faBookOpen} />}
                  {promise.name}
                </div>
                <div className='ellipsis-animation'></div>
              </NavLink>
              <div style={{margin: 10}}>
                <FontAwesomeIcon onClick={() => { handleDelTab(promise) }} className='faXmark' icon={faXmark} data-theme={localTheme} />
              </div>
            </div>
          ))}
        </div>}
      </div>
      <div>
        <div className='article_nav' data-theme={localTheme}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '95%', maxWidth: 1800 }}>
            <div>
              {localTheme === null && <img src={logoBlack} style={{ height: 30 }} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />}
              {localTheme === 'default' && <img src={logoBlack} style={{ height: 30 }} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />}
              {localTheme === 'dark' && <img src={logo} style={{ height: 30 }} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />}
            </div>

            <div className='button_option_container' style={{ width: 50 }} data-theme={localTheme}>
              <div onClick={() => { navigate(-1) }} className='button_option' data-theme={localTheme}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default OptionWorkSpace