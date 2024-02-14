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
  const { localTheme, promiseIdentifiedUser, localThemeBackground } = useAppContext();

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
        <div style={{ width: '97%' }}>
          <div className="copy-box two text" data-background={localThemeBackground} data-theme={localTheme}>
            <div className="inner">
              <div className="line right"></div>

              
              {hidden && <h4>Follewers list.</h4>}
                {!hidden && <h4>My subscriptions.</h4>}

                <div>Retrouvez votre liste d’abonnés et d’abonnements.</div>

              <div className='button_option_container shadowbox' style={{ width: '90%', maxWidth: 300, display: 'flex', marginTop: 20 }} data-theme={localTheme}>
              {!hidden &&<div onClick={() => {setHidden(!hidden)}} className='button_optionPic_v' data-theme={localTheme}>Follewers list</div>}
              {hidden &&<div onClick={() => {setHidden(!hidden)}} className='button_optionPic_v' data-theme={localTheme}>My subscriptions</div>}
              </div>

              
            </div>
          </div>
        </div>
        </div>


        <div className='cter_sect' style={{marginBottom: 30}}>
        <div className='ctent_arti' style={{minHeight: 500}} data-theme={localTheme}>
        {hidden &&<Card_list promise={promise.promise} handleRefuse={handleRefuse} button={false} hidden={hidden} />}
        {!hidden &&<Card_list promise={promise.iFollow} handleRefuse={handleRefuse} button={true} hidden={hidden} />}
        </div>
        </div>
        
        
        </div>
    )
}

export default Contact