import Card_list from '../../../components/Cards/Card_Square_user_list';
import { API_URL, SOCKET_URL } from '../../../config';
import { spinner } from '../../../utils';
import axios from "axios";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useAppContext } from '../../../contexts/UseAppContext';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import Invited from '../../../components/Invited';


const socket = io.connect(SOCKET_URL);

const Contact = (props) => {
  const { localTheme, promiseIdentifiedUser } = useAppContext();

  const fullLocation = useLocation()
  const location = fullLocation.pathname.split("/")
  const IdUser = parseInt(location[2]);

  const searchParams = new URLSearchParams(fullLocation.search);
  const listUrl = searchParams.get("list");

  //const [promise, setPromise] = useState([]);

  //const GetFollowersFromAPI = async (IdUser, listUrl) => {
  //  await axios.get(`${API_URL}api/eventv/get/user/follewers/${IdUser}/${listUrl}`,
  //    { withCredentials: true })
  //    .then((res) => {
  //      setPromise(res.data);
  //    })
  //}

  // vérification du login avant d'exécuter les post
  useEffect(() => {
    if (IdUser && listUrl) {
      props.GetFollowersFromAPI(IdUser, listUrl)
    }
  }, [IdUser, listUrl]);

  useEffect(() => {
    if (promiseIdentifiedUser) {
      props.GetFollowersFromAPI(IdUser, listUrl)
    }
  }, [promiseIdentifiedUser]);


  const handleRefuse = (Id) => {
    try {
      axios.post(`${API_URL}api/eventv/cancelfriend`, { userId: [Id] },
        { withCredentials: true })
        .then(() => {
          props.GetFollowersFromAPI()
        })
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  if (promiseIdentifiedUser === false) return (<Invited localTheme={localTheme} />)

  return (
    <div className='animation'>

      {/*<div className='cter_sect' style={{ padding: 0 }}>
        <div className='ctent_arti' style={{ width: '100%', maxWidth: '100%', borderRadius: 0 }} data-theme={localTheme}>
          <div style={{ width: '98%', display: 'flex', alignItems: 'center', marginTop: 10 }}>
            <Link to={`/profile/${IdUser}/contact?list=followers`} className='button_option' style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}>
              <FontAwesomeIcon style={{ marginRight: 5, color: listUrl === `followers` ? '#ec1c24' : '' }} icon={faList} />Follewers list
            </Link>
            <Link to={`/profile/${IdUser}/contact?list=subscriptions`} className='button_option' style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}>
              <FontAwesomeIcon style={{ marginRight: 5, color: listUrl === `subscriptions` ? '#ec1c24' : '' }} icon={faList} />Subscriptions list
            </Link>
          </div>
        </div>
      </div>*/}


      <div className='cter_sect' style={{ marginTop: 30 }}>
        <div className='ctent_arti' style={{ minHeight: 500 }} data-theme={localTheme}>
          <div className='nav_bar_scnd' style={{ width: '100%',display: 'flex', alignItems: 'center', justifyItems: 'start', flexDirection: 'row', paddingTop: 10 }} data-theme={localTheme}>
            <Link to={`/profile/${IdUser}/contact?list=followers`} className='button_option' style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}>
              <FontAwesomeIcon style={{ marginRight: 5, color: listUrl === `followers` ? '#ec1c24' : '' }} icon={faList} />Follewers list
            </Link>
            <Link to={`/profile/${IdUser}/contact?list=subscriptions`} className='button_option' style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}>
              <FontAwesomeIcon style={{ marginRight: 5, color: listUrl === `subscriptions` ? '#ec1c24' : '' }} icon={faList} />Subscriptions list
            </Link>
          </div>
          {listUrl === `followers` && <Card_list promise={props.promiseContact} handleRefuse={handleRefuse} button={false} hidden={false} IdUserUrl={IdUser} />}
          {listUrl === `subscriptions` && <Card_list promise={props.promiseContact} handleRefuse={handleRefuse} button={true} hidden={true} IdUserUrl={IdUser} />}
        </div>
      </div>


    </div>
  )
}

export default Contact