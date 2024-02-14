import Card_files from "../../../../components/Cards/Card_articles";
import Card_Post from "../../../../components/Cards/Card_announcement.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown, faAngleDoubleUp, faArrowUpRightFromSquare, faBagShopping, faBookOpen, faPlus, faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink, useLocation } from "react-router-dom";
import { UseHome_profile } from "./UseHome_profile.jsx";
import { useAppContext } from '../../../../contexts/UseAppContext';
import { useRef, useState } from "react";
import { NewPost } from "./NewPost";
import { useTranslation } from 'react-i18next';
import { faImages } from "@fortawesome/free-regular-svg-icons";
import { DATA_picv } from "../../../../assets/data/data.js";



const Home_profile = () => {
  const { localTheme, localThemeBackground, promiseIdentifiedUser, IdContext } = useAppContext()

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

  const handleClick = (lastURLHome) => {
    if (IdContext == promiseIdentifiedUser.user.id) {
      localStorage.setItem("last-URL-home", lastURLHome);
    }
  }

  return (
    <>
      {announcement && <NewPost GetMyFilesFromAPIAnnouncement={GetMyFilesFromAPIAnnouncement} setAnnouncement={setAnnouncement} />}

      <div className='cter_sect'>
        <div style={{ width: '98%', display: 'flex', alignItems: 'center', maxWidth: 1800 }}>
          <h3 ref={refScroll} className='text' data-background={localThemeBackground} data-theme={localTheme}>- {t('lastPublications')}</h3>
          {IdUser === promiseIdentifiedUser?.user.id && <div onClick={() => { setAnnouncement(!announcement) }} className='buttonCircle' style={{ width: 20, height: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 14, marginBottom: -5 }} data-theme={localTheme}>
            <FontAwesomeIcon icon={faPlus} />
          </div>}
        </div>
        <div style={{ width: '98%', maxWidth: 1800 }}>
          <Card_Post profile={promiseIdentifiedUser} GetMyFilesFromAPIAnnouncement={GetMyFilesFromAPIAnnouncement} promise={promiseAnnouncement} />
        </div>
      </div>


      <div className='cter_sect'>
        <div className='ctent_arti' data-theme={localTheme}>
          <div style={{ width: '98%', display: 'flex', alignItems: 'center' }}>
            <h3 className='text' data-background={localThemeBackground} data-theme={localTheme}>- {t('lastAdds')}</h3>
            {IdUser === promiseIdentifiedUser?.user.id && <Link to={'/workspace/files'} className='buttonCircle' style={{ width: 20, height: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 14, marginBottom: -5 }} data-theme={localTheme}>
              <FontAwesomeIcon icon={faPlus} />
            </Link>}
          </div>

          <div style={{ width: '98%', display: 'flex', alignItems: 'center' }}>
            <Link onClick={() => { handleClick(`/profile/${promiseIdentifiedUser?.user.id}/page?type=Illustrations`) }} to={{ search: `type=Illustrations` }} className={typeUrl === 'Illustrations' ? 'button_option active' : 'button_option'} style={{ width: 150, justifyContent: 'center', whiteSpace: 'nowrap', height: 40, borderRadius: 100, margin: 3 }} data-background={localThemeBackground} data-theme={localTheme}>
              <div><FontAwesomeIcon className={typeUrl === 'Illustrations' ? 'boxBounce' : ''} style={{ marginRight: 5 }} icon={faImages} />Illustrations</div>
            </Link>
            <Link onClick={() => { handleClick(`/profile/${promiseIdentifiedUser?.user.id}/page?type=Manga`) }} to={{ search: `type=Manga` }} className={typeUrl === 'Manga' ? 'button_option active' : 'button_option'} style={{ width: 150, justifyContent: 'center', whiteSpace: 'nowrap', height: 40, borderRadius: 100, margin: 3 }} data-background={localThemeBackground} data-theme={localTheme}>
              <div><FontAwesomeIcon className={typeUrl === 'Manga' ? 'boxBounce' : ''} style={{ marginRight: 5 }} icon={faBookOpen} />Manga</div>
            </Link>
          <div to={`/${DATA_picv}-shop`} className='button_optionColoringBlue hovercursor' style={{ width: 150, justifyContent: 'center', whiteSpace: 'nowrap', height: 40, borderRadius: 100, margin: 3 }} data-theme={localTheme}>
            <div><FontAwesomeIcon style={{ marginRight: 5 }} icon={faBagShopping} />Shop</div>
          </div>
          <div to={`/${DATA_picv}-game`} className='btn' style={{ width: 150, justifyContent: 'center', whiteSpace: 'nowrap', height: 40, borderRadius: 100, margin: 3 }} data-theme={localTheme}>
            <div className='textLoto' style={{ fontSize: 22 }}>Game</div>
          </div>
          </div>

          <Card_files button={true} profile={promiseIdentifiedUser} promise={promise} />

          <div className='button_option_container' style={{ width: '90%', display: 'flex', marginTop: 10, maxWidth: 500 }} data-theme={localTheme}>
            <Link to={`/profile/${IdUser}/catalogues/all/#Tags`} className='button_option' data-theme={localTheme}>
              {t('seeMore')}
              <FontAwesomeIcon style={{ marginLeft: 5 }} icon={faArrowUpRightFromSquare} />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home_profile