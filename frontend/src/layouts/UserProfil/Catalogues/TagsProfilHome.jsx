import React, { useEffect, useState, useRef } from 'react';
import { API_URL } from '../../../config';
import axios from "axios";
import Tags from '../../../components/Cards/Tags';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { useAppContext } from '../../../contexts/UseAppContext';

const TagsProfilHome = (props) => {

    const ref = useRef(null);

    const { localTheme } = useAppContext();

    const url = window.location.href;
    const IdUser = parseInt(url.split("/")[4]);

    const [promise, setPromise] = useState([])

    const GetTags = async () => {
        await axios.get(`${API_URL}api/eventv/get-profil/get-tags/${IdUser}`,
            { withCredentials: true })
            .then((res) => {
                if (!res.data) {
                    return setPromise([])
                }
                setPromise(res.data)
                ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            })
    }

    //<Tags promise={promise} localTheme={localTheme} />

    useEffect(() => {
        GetTags()
    }, [])

    if (promise.length == 0) return null

    return (
        <>
            <div ref={ref} className='cter_sect'>
                <div className='ctent_arti' data-theme={localTheme}>
                    <div style={{ width: '95%', display: 'flex', alignItems: 'center' }}>
                        <h3 className="title_color" translate='no'>Tags</h3>
                        {IdUser === props.promiseApp.user.id && <Link to={'/workspace/tags'} className='buttonCircle' style={{ width: 30, height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, marginBottom: -5 }} data-theme={localTheme}>
                            <FontAwesomeIcon icon={faPlus} />
                        </Link>}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center', width: '98%' }}>
                    <div className='scrollbar' style={{ width: '100%', overflowX: 'scroll' }}>
                    <div className='button_option_container' style={{ display: 'flex', width: 'max-content', marginBottom: 10 }} data-theme={localTheme}>
                    <Link to={`/profile/${IdUser}/catalogues/all`} className='button_optionPic_v' style={{ width: '100%', minWidth: 150, maxWidth: 300, height: 40 }} data-theme={localTheme}>
                        <div>See all</div>
                    </Link>
                            {promise?.map((promise, index) => (
                                <Link to={`/profile/${IdUser}/catalogues/${promise.slice(1)}`} key={index} className='button_option' style={{ width: '100%', minWidth: 150, maxWidth: 300, height: 40 }} data-theme={localTheme}>{promise}</Link>
                            ))}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TagsProfilHome