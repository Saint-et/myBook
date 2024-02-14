import './WorkSpace.scss';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../contexts/UseAppContext';
import { useEffect, useRef, useState } from 'react';
import Picture from '../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faClose, faLayerGroup, faPhotoFilm, faXmark, faBookOpen, faCodeFork, faFileZipper, faCoins, faTriangleExclamation, faGifts, faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { faImages, faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { supprimerElement, IndexedDB, clearTableWorkSpace } from '../../assets/data/IndexedDB';
import logo from '../../assets/images/workspace_white.png';
import { useTranslation } from 'react-i18next';

const OptionWorkSpace = () => {

  const { t } = useTranslation();

  const { isNavbarVisible, setNavbarVisible, localTheme, promiseIdentifiedUser, handleRecupererTousLesElements, handleClearIndexedDB, localTabs } = useAppContext();

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
        if (`${Id}/${location[3]}` === `file/${el.id}`) {
          const elementPrevious = localTabs[indexElementSearch - 1];
          navigate(`/works/file/${elementPrevious?.id}`)
        }
      } else {
        if (`${Id}/${location[3]}` === `file/${el.id}`) {
          const elementPrevious = localTabs[indexElementSearch + 1];
          navigate(`/works/file/${elementPrevious?.id}`)
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


  const handleClearAllIndexedDB = async () => {
    handleClearIndexedDB()
    navigate(`/works/file`)
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


  return (
    <>
      <div className={!isNavbarVisible ? 'button_option_container nav_workspace' : 'button_option_container nav_workspace active'} style={{ width: '100%', display: 'flex', borderRadius: 0, position: 'sticky', zIndex: 100, flexDirection: 'column', overflow: 'hidden' }} data-theme={localTheme}>
        <div style={{ display: 'flex', marginBottom: 5, marginTop: 5 }}>
          <NavLink onClick={() => { handleClick(`/works/file`) }} to={`/works/file`} className='button_option button_option_work' style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}>
            <FontAwesomeIcon className={fullLocation !== `/works/file` ? '' : 'boxBounce'} style={{ color: '#ec1c24' }} icon={faPhotoFilm} />
            <span className='input_text_navMobile' style={{ marginLeft: 10 }}>{t('projects')}</span>
          </NavLink>
          <NavLink onClick={() => { handleClick(`/works/library`) }} to={`/works/library`} className='button_option button_option_work' style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}>
            <FontAwesomeIcon className={fullLocation !== `/works/library` ? '' : 'boxBounce'} style={{ color: '#ec1c24' }} icon={faLayerGroup} />
            <span className='input_text_navMobile' style={{ marginLeft: 10 }}>{t('library')}</span>
          </NavLink>

          <NavLink onClick={() => { handleClick(`/works/subscriptions`) }} to={`/works/subscriptions`} className='button_option button_option_work' style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}>
            <FontAwesomeIcon className={fullLocation !== `/works/subscriptions` ? '' : 'boxBounce'} style={{ color: '#ec1c24' }} icon={faGifts} />
            <span className='input_text_navMobile' style={{ marginLeft: 10, overflow: 'hidden', textOverflow: 'ellipsis' }}>{t("donationsButton")}</span>
          </NavLink>
          <NavLink to={'/works/problem'} className='button_option button_option_work' style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}>
            <FontAwesomeIcon className={fullLocation !== `/works/problem` ? '' : 'boxBounce'} style={{ color: '#ec1c24' }} icon={faTriangleExclamation} />
            <span className='input_text_navMobile' style={{ marginLeft: 10 }}>{t('Known_Issue')}</span>
          </NavLink>
          <div onClick={() => { navigate(-1) }} className='button_option button_option_work' style={{ width: 20, paddingLeft: 10, paddingRight: 10, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} title="Information about the workSpace" data-theme={localTheme}>
            <FontAwesomeIcon style={{ color: '#ec1c24' }} icon={faArrowLeft} />
          </div>
        </div>
        {localTabs?.length > 0 && <div className='scrollbar open-elementTopPage' style={{ display: 'flex', overflow: 'auto' }}>
          <div onClick={handleClearAllIndexedDB} className='button_option button_option_work' style={{ width: 20, paddingLeft: 10, paddingRight: 10, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, marginRight: 5, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}>
            <FontAwesomeIcon style={{ color: '#ec1c24' }} icon={faClose} />
          </div>
          {localTabs?.map((promise, index) => (
            <div className='open-elementTopPage' key={index} style={{ display: 'flex', alignItems: 'center' }} title={promise.name}>
              <NavLink to={`/works/file/${promise.id}`} className='button_option button_option_work' style={{ justifyContent: 'space-between', height: 30, borderRadius: 100 }} data-theme={localTheme}>
                <div style={{ marginLeft: 5, width: 130, paddingRight: 50, display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} translate='no' >
                  <img src={promise.miniature || Picture} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ height: 25, width: 25, borderRadius: 50, marginRight: 10, objectFit: 'cover', objectPosition: '50% 0%' }} alt='' />
                  {promise.type === 'Illustrations' && <FontAwesomeIcon className={fullLocation !== `/works/file/${promise.id}` ? '' : 'boxBounce'} style={{ color: fullLocation !== `/works/file/${promise.id}` ? '' : '#ec1c24', marginRight: 5 }} icon={faImages} />}
                  {promise.type === 'Manga' && <FontAwesomeIcon className={fullLocation !== `/works/file/${promise.id}` ? '' : 'boxBounce'} style={{ color: fullLocation !== `/works/file/${promise.id}` ? '' : '#ec1c24', marginRight: 5 }} icon={faBookOpen} />}
                  {promise.type === 'Zip' && <FontAwesomeIcon className={fullLocation !== `/works/file/${promise.id}` ? '' : 'boxBounce'} style={{ color: fullLocation !== `/works/file/${promise.id}` ? '' : '#ec1c24', marginRight: 5 }} icon={faFileZipper} />}
                  {promise.name}
                </div>
                {promise.id == location[3] && <div className='ellipsis-animation'></div>}
              </NavLink>
              <FontAwesomeIcon style={{ margin: 8 }} onClick={() => { handleDelTab(promise) }} className='faXmark' icon={faXmark} data-theme={localTheme} />
            </div>
          ))}
        </div>}
      </div>
      <div>
        <div className='article_nav' data-theme={localTheme}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '95%', maxWidth: 1800 }}>
            <div>
              <img src={logo} style={{ height: 30 }} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
            </div>

            <div className='button_option_container' style={{ width: 50 }} data-theme={localTheme}>
              <NavLink to={'/works/help'} className='button_option' data-theme={localTheme}>
                <FontAwesomeIcon icon={faQuestionCircle} />
              </NavLink>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default OptionWorkSpace