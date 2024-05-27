import React, { useState, useEffect } from "react";
import { API_URL, SOCKET_URL } from '../../config';
import axios from "axios";
import imgProfile from '../../assets/images/logo.png';
import { spinner } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';
import Card from '../../components/Cards/Card_Square_user_select';
import Long_card_discussion from "../../components/Cards/Long_card_discussion";
import io from "socket.io-client";
import { useAppContext } from '../../contexts/UseAppContext';

const socket = io.connect(SOCKET_URL);

const Message = () => {
  const { localTheme, promiseIdentifiedUser } = useAppContext()

  const [promiseUserProfil, setPromiseUserProfil] = useState({ promise: [] })
  const GetProfilFromAPI = async () => {
    try {
      await axios.get(`${API_URL}api/eventv/getfollewers`,
        { withCredentials: true })
        .then((res) => {
          setPromiseUserProfil(res.data);
        })
    } catch (error) {
      setPromiseUserProfil({ followers: [] });
    }
  }

  const [promiseDiscussion, setPromiseDiscussion] = useState([])

  const GetDiscussion = async () => {
    try {
      await axios.get(`${API_URL}api/eventv/discussion/get`,
        { withCredentials: true })
        .then((res) => {
          setPromiseDiscussion(res.data);
        })
    } catch (error) {
      setPromiseDiscussion({ promise: [] });
    }
  }

  // vérification du login avant d'exécuter les post
  useEffect(() => {
    GetProfilFromAPI()
    GetDiscussion()

  }, []);



  const [userId, setUserId] = useState(undefined)

  const createDiscussion = async () => {
    if (userId !== undefined) {
      try {
        await axios.post(`${API_URL}api/eventv/create/discussion`, {
          userId: userId
        }, { withCredentials: true })
          .then(() => {
            GetDiscussion()
            setUserId(undefined)
            setHideMenu(false)
            socket.emit('discussion-created', (`${userId}-discussion-refresh`));
          })
      } catch (error) {
        setUserId(undefined)
        setHideMenu(false)
      }
    }
  }

  const [hideMenu, setHideMenu] = useState(false)

  if (!promiseIdentifiedUser) return (
    <div className='cter_sect' style={{ marginTop: 30, marginBottom: 20 }}>
      <div className='ctent_arti' data-theme={localTheme}>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}>
          {spinner()}
        </div>
      </div>
    </div>
  )

  socket.on(`${promiseIdentifiedUser.user.id}-discussion-refresh`, () => {
    GetDiscussion()
  })

  return (
    <div className='main'>
    <div className="open-element-page-melted">

      <div className='cter_sect' style={{ marginTop: 30, marginBottom: 20 }}>
        <div className='ctent_arti' style={{ maxWidth: 500 }} data-theme={localTheme}>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1><span translate="no">Envent-V</span>&nbsp;discussions</h1>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', alignItems: 'center', padding: 10, borderRadius: 25 }}>
              <img onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='Profile_picture' style={{ width: 100, height: 100 }} src={promiseIdentifiedUser.user.imageUrl || imgProfile} alt="" />
            </div>
            <div>{promiseIdentifiedUser.user.pseudo}</div>
            {promiseIdentifiedUser.user.premium == 0 && <div className='free' translate='no'>Free</div>}
            {promiseIdentifiedUser.user.premium == 1 && <div className='premium' translate='no'>Premium</div>}
            <p>Create&nbsp;discussions&nbsp;group.</p>
            <div onClick={() => {
              setHideMenu(!hideMenu)
              setUserId(undefined)
            }} className='buttonCircle' style={{ width: 45, height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center' }} data-theme={localTheme}>
              {hideMenu && <FontAwesomeIcon icon={faXmark} />}
              {!hideMenu && <FontAwesomeIcon icon={faPlus} />}
            </div>
          </div>
        </div>
      </div>

      <div className='cter_sect' style={{ marginBottom: 20 }}>
        <div className='ctent_arti' style={{ paddingTop: 50, maxWidth: 1000 }} data-theme={localTheme}>
          {hideMenu && <div style={{ width: '90%', display: 'flex', justifyContent: 'space-between' }}>
            <div onClick={createDiscussion} className={userId ? 'buttonCircleBlue' : 'buttonCircleDisable'} style={{ width: 150, height: 35, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, marginTop: 10, textDecoration: 'none' }} data-theme={localTheme}>
              Create discussion
            </div>
            <div className='buttonCircle' onClick={() => {
              setHideMenu(!hideMenu)
              setUserId(undefined)
            }} style={{ width: 30, height: 30, fontSize: 15, display: 'flex', justifyContent: 'center', alignItems: 'center' }} data-theme={localTheme}>
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>}
          {!hideMenu && <Long_card_discussion promise={promiseDiscussion.promise} />}
          {hideMenu && <Card promise={promiseUserProfil.followers} setUserId={setUserId} userId={userId} />}
        </div>
      </div>
    </div>
    </div>
  )
}

export default Message