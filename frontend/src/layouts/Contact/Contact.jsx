import Card_list from '../../components/Cards/Card_Square_user_list';
import {API_URL,SOCKET_URL} from '../../config';
import { spinner } from '../../utils';
import axios from "axios";
import React, {useState, useEffect} from "react";
import io from "socket.io-client";
import imgProfile from '../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faBars } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../../contexts/UseAppContext';


const socket = io.connect(SOCKET_URL);

const Contact = (props) => {
  const { localTheme, promiseIdentifiedUser } = useAppContext();

  const [hidden, setHidden] = useState(true)

    const [promise, setPromise] = useState([]);

    const GetFollowersFromAPI = async () => {
         await axios.get(`${API_URL}api/eventv/getfollewers`,
         {withCredentials: true})
         .then((res) => {
          setPromise(res.data);
         })
 }

     // vérification du login avant d'exécuter les post
  useEffect(() => {
    GetFollowersFromAPI()
  },[]);


  const [hideValidator, setHideValidator] = useState(false)

  const handleRefuse = (Id, session) => {
    setHideValidator(true)
      try {
        axios.post(`${API_URL}api/eventv/cancelfriend`, {userId: [Id]},
        {withCredentials: true})
          .then(() => {
            GetFollowersFromAPI()
            setHideValidator(false)
          })
      } catch (error) {
          console.log(error.response.data.message);
      }
  }

  if (!promiseIdentifiedUser) return (
    <div style={{paddingTop: 120, display: 'flex',justifyContent: 'center'}}>
    {spinner()}
    </div>
  )

    return(
        <div className='animation'>
        <div className='cter_sect'>
        <div className='ctent_arti' style={{maxWidth: 500}} data-theme={localTheme}>
        <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <h1>Follewers</h1>
                    <div style={{display: 'flex', width: '100%',justifyContent: 'space-around', alignItems: 'center', padding: 10, borderRadius: 25}}>
                    <img onMouseDown={(e)=>e.preventDefault()} onContextMenu={(e)=>e.preventDefault()} className='Profile_picture' style={{width: 100, height: 100}} src={promiseIdentifiedUser.user.imageUrl || imgProfile} alt="" />
                    </div>
                    <div translate='no'>{promiseIdentifiedUser.user.pseudo}</div>
                    {promiseIdentifiedUser.user.premium == 0&&<div className='free' translate='no'>Free</div>}
                    {promiseIdentifiedUser.user.premium == 1&&<div className='premium' translate='no'>Premium</div>}

                    <div className='buttonCircle' onClick={() => {setHidden(!hidden)}} style={{width: 45, height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10}} data-theme={localTheme}>
                    {hidden &&<FontAwesomeIcon icon={faBars} />}
                    {!hidden &&<FontAwesomeIcon icon={faSquare} />}
                    </div>
        </div>
        </div>
        </div>


        <div className='cter_sect' style={{marginBottom: 30}}>
        <div className='ctent_arti' style={{width: 'max-content', maxWidth: '95%'}} data-theme={localTheme}>
        <div className='title' style={{ display: 'flex', justifyContent: 'center' }}>
                {hidden && <h2>Follewers list</h2>}
                {!hidden && <h2>My subscriptions</h2>}
            </div>
        {hidden &&<Card_list promise={promise.promise} handleRefuse={handleRefuse} button={false} hidden={hidden} />}
        {!hidden &&<Card_list promise={promise.iFollow} handleRefuse={handleRefuse} button={true} hidden={hidden} />}
        </div>
        </div>
        
        
        </div>
    )
}

export default Contact