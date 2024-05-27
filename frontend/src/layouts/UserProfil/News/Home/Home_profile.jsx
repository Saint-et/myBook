import Card_files from "../../../../components/Cards/Card_articles";
import Card_Post from "../../../../components/Cards/Card_announcement.jsx";
import Picture from '../../../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown, faAngleDoubleUp, faArrowDown, faArrowUpRightFromSquare, faBagShopping, faBookOpen, faPlus, faSquareArrowUpRight, faThumbTack } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Card_list from '../../../../components/Cards/Card_Square_user_list_presentation';
import { UseHome_profile } from "./UseHome_profile.jsx";
import { useAppContext } from '../../../../contexts/UseAppContext';
import { useRef, useState } from "react";
import { NewPost } from "./NewPost";
import { useTranslation } from 'react-i18next';
import { faClock, faComment, faHeart, faImages, faPenToSquare, faShareSquare } from "@fortawesome/free-regular-svg-icons";
import { Editor } from 'draft-js';
import { EditorState, convertFromRaw } from "draft-js";
import UseCatalogues from "../../Catalogues/useCatalogues.jsx";



const Home_profile = (props) => {
  const { localTheme, promiseIdentifiedUser, IdContext, handleFullScreen } = useAppContext()

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const typeUrl = searchParams.get("type");


  const { t } = useTranslation();
  const refScroll = useRef(null);


  const {
    IdUser,
    promise,
    promiseAnnouncement,
    GetMyFilesFromAPIAnnouncement } = UseHome_profile()

  const [announcement, setAnnouncement] = useState(false)


  //const handleClick = (lastURLHome) => {
  //  if (IdContext == promiseIdentifiedUser.user.id) {
  //    localStorage.setItem("last-URL-home", lastURLHome);
  //  }
  //}


  const {
    typeUrlCatalog,
    handleClickCatalog
  } = UseCatalogues()



  return (
    <>
      {announcement && <NewPost GetMyFilesFromAPIAnnouncement={GetMyFilesFromAPIAnnouncement} setAnnouncement={setAnnouncement} />}



      <div className='cter_sect'>
          <div className='rowDoublepositionContent' style={{ width: '100%', marginTop: 30 }} data-theme={localTheme}>

            <div className='nav_bar_scnd' style={{ margin: 0, padding: 0 }} data-theme={localTheme}>
              <div style={{ width: '98%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h4 style={{margin: 10}} ref={refScroll} data-theme={localTheme}>{t('lastPublications')}<FontAwesomeIcon style={{ marginLeft: 5 }} icon={faClock} /></h4>
                {promiseIdentifiedUser && <>
                  {IdUser === promiseIdentifiedUser?.user.id && <div onClick={() => { setAnnouncement(!announcement) }} className='buttonCircle' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 13, marginBottom: -5 }} data-theme={localTheme}>
                    <FontAwesomeIcon icon={faPlus} />
                  </div>}
                </>}
              </div>
            </div>

            <Card_Post profile={promiseIdentifiedUser} GetMyFilesFromAPIAnnouncement={GetMyFilesFromAPIAnnouncement} promise={promiseAnnouncement} />
          </div>
      </div>

      <div className='cter_sect'>
        <div className='ctent_arti' data-theme={localTheme}>
          <div className='nav_bar_scnd' style={{ width: '100%', maxWidth: '100%', display: 'flex', flexDirection: 'row', paddingTop: 10 }} data-theme={localTheme}>
            <div onClick={() => { handleClickCatalog('Illustrations') }} className='button_option' style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}>
              <FontAwesomeIcon style={{ marginRight: 5, color: typeUrlCatalog === 'Illustrations' ? '#ec1c24' : '' }} icon={faImages} />Illustrations
            </div>
            <div onClick={() => { handleClickCatalog('Manga') }} className='button_option' style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}>
              <FontAwesomeIcon style={{ marginRight: 5, color: typeUrlCatalog === 'Manga' ? '#ec1c24' : '' }} icon={faBookOpen} />Manga
            </div>
          </div>
          <div style={{ width: '98%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h4 data-theme={localTheme}>{t('lastAdds')}<FontAwesomeIcon style={{ marginLeft: 5 }} icon={faClock} /></h4>
            {promiseIdentifiedUser && <>
              {IdUser === promiseIdentifiedUser?.user.id && <Link to={'/works/file'} className='buttonCircle' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: -5, fontSize: 13 }} data-theme={localTheme}>
                <FontAwesomeIcon icon={faPlus} />
              </Link>}
            </>}
          </div>

          <Card_files button={true} profile={promiseIdentifiedUser} promise={promise} />

          {promise?.length > 0 && <div style={{ width: '98%', display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
            <Link to={`/profile/${IdUser}/activities?type=${typeUrl}`} className='buttonCircle' style={{ width: 'max-content', height: 25, marginTop: 10, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, padding: '0px 10px 0px 10px', background: 'none' }} data-theme={localTheme}>
              {t('seeMore')} <FontAwesomeIcon style={{ marginLeft: 5 }} icon={faArrowUpRightFromSquare} />
            </Link>
          </div>}
        </div>
      </div>
    </>
  )
}

export default Home_profile