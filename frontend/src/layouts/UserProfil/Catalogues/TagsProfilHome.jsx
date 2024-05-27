import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../config';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { useAppContext } from '../../../contexts/UseAppContext';
import { RemoveScroll } from "react-remove-scroll";
import { useTranslation } from 'react-i18next';

const TagsProfilHome = (props) => {

    const { t } = useTranslation();

    const [errorFiles, setErrorFiles] = useState('');

    const { localTheme } = useAppContext();
    const [open, setOpen] = useState(false);

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
            })
    }

    //<Tags promise={promise} localTheme={localTheme} />


    const UpdateTags = async () => {
        await axios.put(`${API_URL}api/eventv/update/update-tags`, { tags: promise },
            { withCredentials: true })
            .then(() => {
                //GetTags()
                setOpen(false)
                setErrorFiles("")
            })
    }




    const [text, setText] = useState('#');

    // Creation of tags for the search of the document
    const handleChangeTags = (e) => {
        const expressionReguliere = /\s/;
        const regexTags = /#[a-zA-Z0-9_]+/g;
        const tagsTrouves = e.target.value.match(regexTags) || [];
        setText(e.target.value);

        if (expressionReguliere.test(e.target.value) || e.target.value.length > 30 || e.key === 'Enter') {
            e.preventDefault()
            setPromise(Array.from(new Set([...promise, ...tagsTrouves])));
            setText('#');
        }
    };

    // Deleting a tag
    const handleRemoveTag = (el) => {
        const filteredPromise = promise?.filter((array) => array != el);
        setPromise(filteredPromise);
    };

    useEffect(() => {
        GetTags()
    }, [])

    //if (promise.length == 0) return null


    return (
        <>

            {open && <div className='blanket animation open-element-page-melted' style={{ zIndex: 15000, display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', top: 0 }} >
                <RemoveScroll className='menu_navbar scrollbar' style={{ width: '100%', flexDirection: 'column', maxWidth: 1200, overflowY: 'auto', alignItems: 'center', background: 'none' }} data-theme={localTheme}>

                    <div className='ctent_arti' data-theme={localTheme}>
                        <div style={{ marginTop: 10, width: '90%', display: 'flex', justifyContent: 'space-between', color: promise?.length > 10 ? 'red' : '#00aa00', borderBottom: `1px solid ${promise?.length > 10 ? 'red' : '#00aa00'}` }}>{t('addTags')} : <span style={{ fontWeight: 800 }} translate='no'><span>{promise?.length || 0}</span>/10</span></div>

                        <div style={{ width: '90%', paddingTop: 20 }}>
                            <div>{t('tagsFound')} :</div>
                        </div>
                        <div style={{ width: '90%', display: 'flex', flexWrap: 'wrap', marginTop: 50 }} data-theme={localTheme}>
                            {promise.length ? <>{promise?.map((el) => (
                                <div onClick={() => { handleRemoveTag(el) }} className='tagsManage' translate='no' key={el} data-theme={localTheme}>
                                    {el}
                                </div>
                            ))}</>
                                :
                                <>
                                    <div style={{ color: 'grey' }}>{t('noTagsFound')}</div>
                                </>}
                        </div>
                        <input maxLength={31} onKeyDown={handleChangeTags} onChange={(e) => { handleChangeTags(e) }} style={{ marginTop: 20, resize: 'none' }} className='input_text' placeholder={`${t('addTags')}: #...`} type="text" name="tag" id="tag" value={text} data-theme={localTheme} />
                        <div><span>{text.length}</span>/30</div>

                        <div className='button_option_container' style={{ width: '100%', maxWidth: 500, display: 'flex', marginTop: 20 }} data-theme={localTheme}>
                            <div onClick={() => {
                                GetTags()
                                setOpen(false)
                            }} className='button_option' style={{ width: '100%' }} data-theme={localTheme}>
                                {t('cancel')}
                            </div>
                            <div onClick={UpdateTags} className='button_optionPic_v' style={{ width: '100%' }} data-theme={localTheme}>
                                <div>{t('save')}</div>
                            </div>
                        </div>
                    </div>

                </RemoveScroll>
            </div >}

            <div className='cter_sect'>
                <div style={{ width: '95%', display: 'flex', alignItems: 'center' }}>
                    <h4 data-theme={localTheme}>Tags</h4>
                    {props.promiseApp && <>
                        {IdUser === props.promiseApp?.user.id && <div onClick={() => { setOpen(true) }} className='buttonCircle' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 12, marginBottom: -5 }} data-theme={localTheme}>
                            <FontAwesomeIcon icon={faPlus} />
                        </div>}
                    </>}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center', width: '95%' }}>
                    <div className='scrollbar' style={{ width: '100%', overflowX: 'scroll' }}>
                        <div className='button_option_container_free' style={{ display: 'flex', width: 'max-content', marginBottom: 10 }} data-theme={localTheme}>
                            <Link to={`/profile/${IdUser}/activities?type=${props.typeUrl}`} className='button_optionPic_v' style={{ width: '100%', minWidth: 150, maxWidth: 300, height: 40 }} data-theme={localTheme}>
                                <div>See all</div>
                            </Link>
                            {promise?.map((promise, index) => (
                                <Link to={`/profile/${IdUser}/activities?type=${props.typeUrl}&search=${promise.slice(1)}`} key={index} className='button_option' style={{ width: '100%', minWidth: 150, maxWidth: 300, height: 40 }} data-theme={localTheme}>{promise}</Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TagsProfilHome