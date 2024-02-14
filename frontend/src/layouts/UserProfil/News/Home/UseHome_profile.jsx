import { useState, useEffect } from "react";
import { API_URL } from '../../../../config';
import axios from "axios";
import { useLocation } from "react-router-dom";


export const UseHome_profile = () => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const typeUrl = searchParams.get("type");

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


    const GetMyFilesFromAPI = async (typeUrl) => {
        setPromise()
        try {
            await axios.get(`${API_URL}api/eventv/newsfiles/get-files/${IdUser}/${typeUrl}`,
            { withCredentials: true })
            .then((res) => {
                setPromise(res.data);
            })
        } catch (error) {
            setPromise([])
        }
    }


    useEffect(() => {
        GetMyFilesFromAPIAnnouncement()
    }, []);

    useEffect(() => {
        GetMyFilesFromAPI(typeUrl)
    }, [typeUrl]);

    return {
        IdUser,
        promise,
        promiseAnnouncement,
        GetMyFilesFromAPIAnnouncement
    };
}
