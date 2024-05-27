import { useState, useRef, useEffect } from "react";
import { useAppContext } from "../contexts/UseAppContext";
import io from "socket.io-client";
import { API_URL, SOCKET_URL } from '../config';
import axios from "axios";
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { spinner } from "../utils";

const socket = io.connect(SOCKET_URL);

const Subscription_management = (props) => {

    const { t } = useTranslation();


    const { promiseIdentifiedUser, localTheme } = useAppContext();

    const [promiseUserParams, setPromiseUserParams] = useState('');
    const [bookmark, setBookmark] = useState(true);

    // API call to retrieve the profile matching the user search
    const GetProfilParamsFromAPI = async (id) => {
        try {
            await axios.get(`${API_URL}api/eventv/user-params/${id}`,
                { withCredentials: true })
                .then((res) => {
                    setPromiseUserParams(res.data);

                })
        } catch (error) {
            //console.log(error.response.data)
        }
    }

    // PUT to pinned a user
    const updateUserPinned = async (Id) => {
        setBookmark(false);
        if (bookmark === true) {
            try {
                await axios.put(`${API_URL}api/eventv/users/update/pinned`,
                    {
                        pinnedUsers: Id
                    },
                    { withCredentials: true })
                    .then(() => {
                        GetProfilParamsFromAPI(props.userId);
                        setBookmark(true);
                    })
            } catch (error) {
            }
        }

    };

    // POST to follow a user
    const handleAdd = (Id, session) => {
        axios.post(`${API_URL}api/eventv/addfriend`, { userId: [Id] },
            { withCredentials: true })
            .then(() => {
                socket.emit('event-created', { id: Id, session: session, data: 'started following you' });
                GetProfilParamsFromAPI(props.userId);
                //if (listUrl) {
                //    GetFollowersFromAPI();
                //}
            })
    }
    // POST to cancel follow a user
    const handleRefuse = (Id) => {
        try {
            axios.post(`${API_URL}api/eventv/cancelfriend`, { userId: [Id] },
                { withCredentials: true })
                .then(() => {
                    GetProfilParamsFromAPI(props.userId);
                    //if (listUrl) {
                    //    GetFollowersFromAPI();
                    //}
                })
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    useEffect(() => {
        if (!props.userId) {
            return;
        }
        if (promiseIdentifiedUser === false) {
            setPromiseUserParams('');
        } else {
            if (promiseIdentifiedUser?.user.id == props.userId) {
                setPromiseUserParams('');
                return;
            }
            GetProfilParamsFromAPI(props.userId);
        }
    }, [promiseIdentifiedUser, props.userId]);

    if (!promiseIdentifiedUser) return null

    if (promiseIdentifiedUser?.user.id == props.userId) return null

    if (!promiseUserParams) return (
        <>
            {spinner()}
        </>
    )

    // className='buttonCircle' style={{ width: 'max-content', height: 25, marginTop: 10, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, padding: '0px 10px 0px 10px' }}

    return (
        <>

            <div className='button_option_container_free shadowbox' style={{ width: '100%', display: 'flex', marginTop: 10, maxWidth: 200 }} data-theme={localTheme}>
                <div className={parseInt(promiseUserParams?.filteredPinnedUsers) === props.userId ? bookmark ? 'button_optionBlue' : 'button_optionDisable' : bookmark ? 'button_option' : 'button_optionDisable'} onClick={() => updateUserPinned(props.userId)} style={{ width: '100%', maxWidth: 300 }} data-theme={localTheme}><FontAwesomeIcon icon={faBookmark} /></div>
            </div>

            <div className='button_option_container shadowbox' style={{ width: '100%', display: 'flex', marginTop: 10, maxWidth: 200 }}>
                {promiseUserParams.userId?.length == 0 && <>
                    <div className='button_optionPic_v' onClick={() => handleAdd(props.userId, promiseIdentifiedUser?.user.id)}>{t('follow')}</div>
                </>}
                {promiseUserParams?.userId == promiseIdentifiedUser?.user.id && <>
                    <div className='button_optionPic_v' onClick={() => handleRefuse(props.userId, promiseIdentifiedUser?.user.id)}>{t('unfollow')}</div>
                </>}
            </div>
        </>
    )
}

export default Subscription_management