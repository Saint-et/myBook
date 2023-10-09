import Card_files from "../../../components/Cards/Card_articles";
import Card_announcement from "../../../components/Cards/Card_announcement";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { UseHome_profile } from "./UseHome_profile.jsx";
import { useAppContext } from '../../../contexts/UseAppContext';
import { useState } from "react";
import { NewPost } from "./NewPost";



const Home_profile = () => {
  const { localTheme, promiseIdentifiedUser } = useAppContext()

  const {
    IdUser,
    promise,
    promiseAnnouncement,
    GetMyFilesFromAPIAnnouncement } = UseHome_profile()

  const [announcement, setAnnouncement] = useState(false)


  //if (!promiseIdentifiedUser) return null


  return (
    <>
      {announcement && <NewPost GetMyFilesFromAPIAnnouncement={GetMyFilesFromAPIAnnouncement} setAnnouncement={setAnnouncement} />}

      <div className='cter_sect'>
        <div className='ctent_arti' data-theme={localTheme}>
          <div style={{ width: '98%', display: 'flex', alignItems: 'center' }}>
            <h3 className="title_color">- Last publications</h3>
            {IdUser === promiseIdentifiedUser?.user.id && <div onClick={() => { setAnnouncement(!announcement) }} className='buttonCircle' style={{ width: 30, height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, marginBottom: -5 }} data-theme={localTheme}>
              <FontAwesomeIcon icon={faPlus} />
            </div>}
          </div>
          <Card_announcement profile={promiseIdentifiedUser} promise={promiseAnnouncement} GetMyFilesFromAPIAnnouncement={GetMyFilesFromAPIAnnouncement} style={{ width: '32%' }} />
          <div style={{ width: '98%', display: 'flex', alignItems: 'center', justifyContent: 'end', marginTop: 10 }}>
            <div className='buttonCircle' style={{ width: 'max-content', height: 35, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, padding: '0px 10px 0px 10px', background: 'none' }} data-theme={localTheme}>
              See all publications ...
            </div>
          </div>
        </div>
      </div>

      <div className='cter_sect'>
        <div className='ctent_arti' data-theme={localTheme}>
          <div style={{ width: '98%', display: 'flex', alignItems: 'center' }}>
            <h3 className="title_color">- Last adds</h3>
            {IdUser === promiseIdentifiedUser?.user.id && <Link to={'/workspace/files'} className='buttonCircle' style={{ width: 30, height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, marginBottom: -5 }} data-theme={localTheme}>
              <FontAwesomeIcon icon={faPlus} />
            </Link>}
          </div>
          <Card_files profile={promiseIdentifiedUser} promise={promise} />
          <div style={{ width: '98%', display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
            <Link to={`/profile/${IdUser}/catalogues/all/#Tags`} className='buttonCircle' style={{ width: 'max-content', height: 35, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, padding: '0px 10px 0px 10px', background: 'none' }} data-theme={localTheme}>
              See all works ...
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home_profile