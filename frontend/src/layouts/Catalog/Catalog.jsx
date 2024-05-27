import Pub from "../../components/Pub/Pub";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Card_list from '../../components/Cards/Card_Square_user_list_presentation';
import { useAppContext } from '../../contexts/UseAppContext';
import Warning from "../../components/Warning";
import React, { useEffect, useState } from "react";
import Card_announcement from '../../components/Cards/Card_announcement';
import logo from '../../assets/images/background.jpg';
import { SystemName } from "../../assets/data/data";
import { API_URL } from "../../config";
import axios from "axios";
import Card_files from "../../components/Cards/Card_articles";


const Catalog = () => {
    const { localTheme, promiseUsers, GetUsersPopularFromAPI, promiseAnnouncement, GetBestAnnouncementFromAPI, promiseIdentifiedUser } = useAppContext()

    const [promise, setPromise] = useState()


    const GetHomeFileFromAPI = async () => {
        try {
            await axios.get(`${API_URL}api/eventv/Home/files`,
                { withCredentials: true })
                .then((res) => {
                    setPromise(res.data);

                })
        } catch (error) {
            // Call the delete function with the ID of the item to be deleted if there is a limited access to a page
            console.log(error.response.data.message);
        }
    }

    useEffect(() => {
        GetHomeFileFromAPI()
        GetUsersPopularFromAPI()
        //GetBestAnnouncementFromAPI()

    }, [promiseIdentifiedUser])

    const renderCardFilesWithAds = () => {
        const cardFilesWithAds = [];

        for (let i = 0; i < promise?.length; i += 18) {
            const sliceEnd = Math.min(i + 18, promise.length); // Pour éviter de dépasser la taille de promise
            const cardFilesSlice = promise.slice(i, sliceEnd);

            cardFilesWithAds.push(
                <React.Fragment key={i}>
                    <Card_files profile={promiseIdentifiedUser} promise={cardFilesSlice} />
                    {sliceEnd < promise.length && <Pub pubType={'banner'} />}
                </React.Fragment>
            );
        }

        return cardFilesWithAds;
    };

    if (!promiseUsers) return null

    return (
        <div className='main'>
            <Pub />

            <div className='cter_sect' style={{ marginTop: 100 }}>
                <div className='ctent_arti' data-theme={localTheme}>
                    <div style={{ width: '98%', display: 'flex', alignItems: 'center' }}>
                        <h3 className="title_color">- Post.</h3>
                    </div>

                    <Card_announcement promise={promiseAnnouncement} />
                </div>
            </div>

            <div className='cter_sect' style={{ marginTop: 100 }}>
                <div className='ctent_arti' data-theme={localTheme}>
                    <div style={{ width: '98%', display: 'flex', alignItems: 'center' }}>
                        <h3 className="title_color">- Best tags</h3>
                    </div>


                </div>
            </div>

            <Pub pubType={'banner'} />

            <div className='cter_sect' style={{ marginTop: 100 }}>
                <div className='ctent_arti' data-theme={localTheme}>
                    <div style={{ width: '98%' }}>
                        <h3 className="title_color">- Most popular users</h3>
                    </div>
                    <Card_list promise={promiseUsers.promise} button={false} />
                </div>
            </div>


            <div className='cter_sect' style={{ marginTop: 100 }}>
                <div className='ctent_arti' data-theme={localTheme}>
                    <div style={{ width: '98%', display: 'flex', alignItems: 'center' }}>
                        <h3 className="title_color">- Just for you.</h3>
                    </div>
                    {renderCardFilesWithAds()}
                </div>
            </div>


        </div>
    )
}

export default Catalog