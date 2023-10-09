import { useAppContext } from '../../../contexts/UseAppContext';
import { API_URL } from '../../../config';
import axios from "axios";
import { useState, useEffect } from "react";
import Card_list from '../../../components/Cards/Card_Square_user_list_presentation';

const News = () => {
    const { localTheme, promiseIdentifiedUser } = useAppContext()

    const [promiseUsers, setPromiseUsers] = useState('');
    const [error, setError] = useState("");


    const GetUsersPopularFromAPI = async () => {
        try {
            await axios.get(`${API_URL}api/eventv/user/get/pinned`,
                { withCredentials: true })
                .then((res) => {
                    setPromiseUsers(res.data);

                })
        } catch (error) {
            //setError(error.response.data);
        }
    }

    useEffect(() => {
        GetUsersPopularFromAPI()
    }, []);

    if (!promiseIdentifiedUser || !promiseUsers) return null

    return (
        <>
            <div className='cter_sect'>
                <div className='ctent_arti' style={{ background: 'none' }} data-theme={localTheme}>
                    <div style={{ width: '98%' }}>
                        <h2 style={{ margin: 0 }}>- News</h2>
                    </div>
                </div>
            </div>

            <div className='cter_sect'>
                <div className='ctent_arti' style={{ background: 'none' }} data-theme={localTheme}>
                    <div style={{ width: '98%' }}>
                        <h2 style={{ margin: 0 }}>- Pinned users</h2>
                    </div>
                    <Card_list promise={promiseUsers.promise} button={false} />
                </div>
            </div>
        </>
    )
}

export default News