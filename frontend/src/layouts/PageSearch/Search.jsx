import Card_list from '../../components/Cards/Card_Square_user';
import Card_files from "../../components/Cards/Card_articles";
import { API_URL } from '../../config';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';


const Search = (props) => {

    const locations = useLocation().pathname.split("/")

    const location = locations[2]

    const location1 = locations[1]



    const [promise, setPromise] = useState()

    const SearchUser = async () => {
        await axios.get(`${API_URL}api/eventv/search/users/name/${location}`,
            { withCredentials: true })
            .then((res) => {
                setPromise(res.data.promise)
            })
    }

    const SearchArticles = async () => {
        await axios.get(`${API_URL}api/eventv/search/articles/name/${location}`,
            { withCredentials: true })
            .then((res) => {
                setPromise(res.data.promise)
            })
    }

    useEffect(() => {
        if (location1 === 'search-articles') {
            SearchArticles()
        } else {
            SearchUser()
        }

    }, [])


    if (!promise) return null

    return (
        <>

            {location1 === 'search-users' && <>
                <Card_list
                    setHiddenMenu={props.setHiddenMenu}
                    promise={promise}
                    sessionId={props.promise.user.id}
                    button={false}
                    localTheme={props.localTheme} />
            </>}

            {location1 === 'search-articles' && <>
                <Card_files
                    setHiddenMenu={props.setHiddenMenu}
                    profile={props.promise}
                    promise={promise}
                    localTheme={props.localTheme}
                    handleFullScreen={props.handleFullScreen}
                    style={{ width: '23%' }} />
            </>}

        </>
    )
}

export default Search