import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { API_URL } from '../config';
import axios from "axios";
import Card_files from "../components/Cards/Card_articles";
import Card_announcement from "../components/Cards/Card_announcement";
import { useAppContext } from '../contexts/UseAppContext';



const MiniProfilCards = (props) => {

    const { localTheme } = useAppContext();

    const [promise, setPromise] = useState()
    const [promiseAnnouncement, setPromiseAnnouncement] = useState()

    const GetMyFilesFromAPIAnnouncement = async () => {
        await axios.get(`${API_URL}api/eventv/post/get-post/${props.hiddenMenuMiniProfil.id}`,
            { withCredentials: true })
            .then((res) => {
                setPromiseAnnouncement(res.data);
            })
    }

    const GetMyFilesFromAPI = async () => {
        await axios.get(`${API_URL}api/eventv/newsfiles/get-files/${props.hiddenMenuMiniProfil.id}`,
            { withCredentials: true })
            .then((res) => {
                setPromise(res.data);
            })
    }


    const [width, setWidth] = useState('45%')


    useEffect(() => {
        GetMyFilesFromAPI()
        GetMyFilesFromAPIAnnouncement()

        if (window.matchMedia("(min-width: 769px)").matches) {
            setWidth('47%')
        } else {
            setWidth('100%')
        }
    }, []);

    return (
        <>

            <div className='ctent_arti' style={{ marginTop: 20, borderRadius: 0 }} data-theme={localTheme}>
                <div style={{ width: '95%', display: 'flex', alignItems: 'center', marginTop: 50 }}>
                    <h3 className="title_color" style={{ margin: 0 }}>- Publications</h3>
                </div>
                <Card_announcement hiddenMenuMiniProfil={props.hiddenMenuMiniProfil} promise={promiseAnnouncement} style={{ width: width }} ShowOption={true} button={true} />
                </div>
                <div className='ctent_arti' style={{ marginTop: 20, borderRadius: 0 }} data-theme={localTheme}>
                <div style={{ width: '95%', display: 'flex', alignItems: 'center' }}>
                    <h3 className="title_color" style={{ margin: 0 }}>- Last adds</h3>
                </div>
                <Card_files hiddenMenuMiniProfil={props.hiddenMenuMiniProfil} promise={promise} style={{ width: width }} ShowOption={true} button={true} />

            </div>

        </>
    )
}
export default MiniProfilCards