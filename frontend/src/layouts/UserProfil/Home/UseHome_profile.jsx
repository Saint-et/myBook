import { useState, useEffect } from "react";
import { API_URL } from '../../../config';
import axios from "axios";


export const UseHome_profile = () => {


    const url = window.location.href;
    const IdUser = parseInt(url.split("/")[4]);


    const [promise, setPromise] = useState()
    const [promiseAnnouncement, setPromiseAnnouncement] = useState()


    const GetMyFilesFromAPIAnnouncement = async () => {
        try {
            await axios.get(`${API_URL}api/eventv/post/get-post/${IdUser}`,
            { withCredentials: true })
            .then((res) => {
                setPromiseAnnouncement(res.data);
            })
        } catch (error) {
            
        }
    }


    const GetMyFilesFromAPI = async () => {
        try {
            await axios.get(`${API_URL}api/eventv/newsfiles/get-files/${IdUser}`,
            { withCredentials: true })
            .then((res) => {
                setPromise(res.data);
            })
        } catch (error) {
            
        }
    }


    useEffect(() => {
        GetMyFilesFromAPI()
        GetMyFilesFromAPIAnnouncement()
    }, []);

    return {
        IdUser,
        promise,
        promiseAnnouncement,
        GetMyFilesFromAPIAnnouncement
    };
}
