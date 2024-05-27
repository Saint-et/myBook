import './WorkSpace.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../contexts/UseAppContext';
import { useEffect, useRef, useState } from 'react';
import Picture from '../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faClose, faLayerGroup, faPhotoFilm, faXmark, faBookOpen, faCodeFork, faFileZipper, faCoins, faTriangleExclamation, faGifts, faBagShopping, faChartLine, faAngleDown, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import { faImages, faQuestionCircle, faWindowRestore, faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { supprimerElement, IndexedDB } from '../../assets/data/IndexedDB';
import logo from '../../assets/images/workspace_white.png';
import { useTranslation } from 'react-i18next';
import Invited from '../../components/Invited';
import { SystemName } from '../../assets/data/data';
import Files from './Files/Files';
import Groups_files from './Groups_files/Groups_files';
import Subscription from './Statisticals/Statisticals';
import Problem_works from './Problem/problem_works';
import axios from 'axios';
import { API_URL } from '../../config';
import FilesUpdate from './Files_display/filesUpdate';
import Groups_display from './Groups_display/Groups_display';
import { useWorkspaceContext } from '../../contexts/UseWorkspaceContexte';
import HelpWorkSpace from './HelpWorkSpace';
import { RemoveScroll } from 'react-remove-scroll';
import WorkSpaceTabs from '../../components/workSpaceTabs';


const OptionWorkSpace = () => {

  const { t } = useTranslation();

  const {
    isNavbarVisible,
    localTheme,
    promiseIdentifiedUser,
    systemDetectMobile
  } = useAppContext();

  const {
    localTabs,
    GetMyGroupsFromAPI,
    GetMyFilesFromAPI,
    setPromise,
    setTotalFiles,
    setTotalGroup,
    setPromiseGetMyGroupsFromAPI } = useWorkspaceContext();

  const ref = useRef(null);

  const [contextMenuTabs, setContextMenuTabs] = useState(false)

  useEffect(() => { ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }, [])

  const fullUrl = useLocation()

  const fullLocation = fullUrl.pathname;


  const linkUrl = fullUrl.search.split("=")[0]

  const navigate = useNavigate()



  useEffect(() => {
    if (promiseIdentifiedUser === false) {
      setPromise([]);
      setTotalFiles(0);
      setTotalGroup(0);
      setPromiseGetMyGroupsFromAPI([]);
    } else {
      if (systemDetectMobile === true) {
        GetMyFilesFromAPI();
      }
      GetMyGroupsFromAPI();
      //handleRecupererTousLesElements();
    }

    return () => {
      if (systemDetectMobile === true) {
        setPromise([]);
        setTotalFiles(0);
        setTotalGroup(0);
        setPromiseGetMyGroupsFromAPI([]);
      }
    }

  }, [promiseIdentifiedUser, systemDetectMobile]);



  if (promiseIdentifiedUser === false) return (<Invited localTheme={localTheme} />)


  return (
    <div className='main'>
      <div className={!isNavbarVisible ? 'button_works_container nav_fixed' : 'button_works_container nav_fixed active'} style={{ width: '100%', display: 'flex', borderRadius: 0, position: 'sticky', zIndex: 1000, flexDirection: 'column', overflow: 'hidden' }} data-theme={localTheme}>
        <div style={{ display: 'flex', marginBottom: 5, marginTop: 5 }}>
          <div onClick={() => { setContextMenuTabs(!contextMenuTabs) }} className='button_option button_option_work' style={{ width: 20, paddingLeft: 10, paddingRight: 10, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}>
            <FontAwesomeIcon className={!contextMenuTabs ? '' : 'boxBounce'} style={{ color: localTabs?.length > 0 ? '#ec1c24' : '' }} icon={faWindowRestore} />
          </div>
          <Link to={`/works/file`} className='button_option button_option_work' style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}>
            <FontAwesomeIcon className={fullLocation !== `/works/file` ? '' : 'boxBounce'} style={{ color: fullLocation !== `/works/file` ? '' : '#ec1c24' }} icon={faPhotoFilm} />
            <span className='hidden980' style={{ marginLeft: 10 }}>{t('projects')}</span>
          </Link>
          <Link to={`/works/library`} className='button_option button_option_work' style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}>
            <FontAwesomeIcon className={fullLocation !== `/works/library` ? '' : 'boxBounce'} style={{ color: fullLocation !== `/works/library` ? '' : '#ec1c24' }} icon={faLayerGroup} />
            <span className='hidden980' style={{ marginLeft: 10 }}>{t('library')}</span>
          </Link>
          <Link to={`/works/statisticals`} className='button_option button_option_work' style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}>
            <FontAwesomeIcon className={fullLocation !== `/works/statisticals` ? '' : 'boxBounce'} style={{ color: fullLocation !== `/works/statisticals` ? '' : '#ec1c24' }} icon={faChartLine} />
            <span className='hidden980' style={{ marginLeft: 10, overflow: 'hidden', textOverflow: 'ellipsis' }}>{t("statistical")}</span>
          </Link>
          <Link to={'/works/problem'} className='button_option button_option_work' style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}>
            <FontAwesomeIcon className={fullLocation !== `/works/problem` ? '' : 'boxBounce'} style={{ color: fullLocation !== `/works/problem` ? '' : '#ec1c24' }} icon={faTriangleExclamation} />
            <span className='hidden980' style={{ marginLeft: 10 }}>{t('Known_Issue')}</span>
          </Link>
          <div onClick={() => { navigate(-1) }} className='button_option button_option_work' style={{ width: 20, paddingLeft: 10, paddingRight: 10, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} title="Information about the workSpace" data-theme={localTheme}>
            <FontAwesomeIcon style={{ color: '#ec1c24' }} icon={faArrowLeft} />
          </div>
        </div>
      </div>
      <div className='article_nav' data-theme={localTheme}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '95%', maxWidth: 1800 }}>
          <div>
            <img src={logo} style={{ height: 30 }} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
          </div>

          <div className='button_option_container' style={{ width: 50 }} data-theme={localTheme}>
            <Link to={'/works/help'} className='button_option' data-theme={localTheme}>
              <FontAwesomeIcon icon={faQuestionCircle} />
            </Link>
          </div>
        </div>
      </div>

      <WorkSpaceTabs contextMenuTabs={contextMenuTabs} setContextMenuTabs={setContextMenuTabs} systemDetectMobile={systemDetectMobile} />


      {fullLocation === `/works/file` && <Files />}
      {fullLocation === `/works/library` && <Groups_files />}
      {fullLocation === `/works/statisticals` && <Subscription />}
      {fullLocation === `/works/problem` && <Problem_works />}
      {fullLocation === `/works/help` && <HelpWorkSpace />}

      {linkUrl === `?${SystemName}-file` && <FilesUpdate />}
      {linkUrl === "?update-group-file" && <Groups_display />}


    </div>
  )
}
//`/works/file/${promise.id}`
export default OptionWorkSpace