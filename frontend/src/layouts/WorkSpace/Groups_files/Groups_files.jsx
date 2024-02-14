import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from "../../../contexts/UseAppContext";
import { API_URL } from '../../../config';
import axios from "axios";
import CardGroup from '../../../components/Cards/CardGroup';
import ReactPaginate from 'react-paginate';
import { useTranslation } from 'react-i18next';

let myRegex = new RegExp(/^[0-9a-zA-Z-éçàùè]+$/i);

const Groups_files = () => {

    const { t } = useTranslation();

    const { localTheme, localThemeBackground,
        setPromiseGetMyGroupsFromAPI: setPromise,
        promiseGetMyGroupsFromAPI: promise,
        GetMyGroupsFromAPI,
        numPageGetMyGroupsFromAPI: numPage,
        setNumPageGetMyGroupsFromAPI: setNumPage,
        PER_PAGE,
        menuFile, setMenuFile } = useAppContext();

    const [edite, setEdite] = useState({ name: '' });
    const [created, setCreated] = useState('');
    const [errorFiles, setErrorFiles] = useState("");
    const [errFront, setErrFront] = useState({
        err: ''
    })
    const [hiddenfaX, setHiddenfaX] = useState(false)

    const [editSearch, setEditSearch] = useState('');


    const [total, setTotal] = useState('')
    const pageCount = Math.ceil(total / PER_PAGE || 1)


    const handleChange = (name) => event => {
        setEdite({ ...edite, [name]: event.target.value })
    };

    const handleSearch = event => {
        setEditSearch(event.target.value);
        if (event.key === 'Enter') {
            event.preventDefault()
            SearchGroups()
        }
    };


    const handlePage = async ({ selected: selectedPage }) => {
        setNumPage(selectedPage)
        GetMyGroupsFromAPI()

    }


    const createGroup = async () => {
        setErrorFiles('')
        if (edite.name === '') {
            return setErrorFiles("please fill in all fields.")
        }
        try {
            await axios.post(`${API_URL}api/eventv/create/group`, {
                name: edite.name
            }, { withCredentials: true })
                .then((res) => {
                    setCreated(res.data.message)
                    setErrorFiles('')
                    setEdite({ name: '' })
                    setMenuFile(!menuFile)
                    GetMyGroupsFromAPI()
                })
        } catch (error) {
            setErrorFiles(error.response.data.message)
        }
    }

    const handleCloseSearch = () => {
        GetMyGroupsFromAPI()
        setEditSearch('')
        setHiddenfaX(false)
    }

    const SearchGroups = async (selectedPage) => {
        if (editSearch === "") {
            setErrFront({
                err: ''
            })
        } else if (!myRegex.test(editSearch)) {
            setErrFront({
                err: "Special characters are not supported."
            });

        } else {
            setHiddenfaX(true)
            setPromise('')
            setTotal('')
            await axios.get(`${API_URL}api/eventv/search/mygroups/groups/${editSearch}/${selectedPage * PER_PAGE || 0}`,
                { withCredentials: true })
                .then((res) => {
                    setPromise(res.data.rows);
                    setTotal(res.data.count);
                    setErrFront({ err: '' })
                })
        }
    }


    return (
        <div className='open-elementPage'>

            {menuFile && <div className='blanket' style={{ zIndex: 15000, display: 'flex', alignItems: 'center', justifyContent: 'center', top: 0 }} >
                <div className='ctent_arti animation' style={{ paddingTop: 15, paddingBottom: 10, maxWidth: 600 }} data-theme={localTheme}>
                    <div>{t('create_a_library')}</div>
                    <input autoFocus={true} className='input_text' onChange={handleChange('name')} style={{ width: '100%' }} placeholder={t('named')} type="text" name="Named" id="Named" value={edite.name} data-theme={localTheme} />
                    {created !== '' && <div>{created}</div>}
                    {errorFiles !== '' && <div style={{ color: 'red' }}>{errorFiles}</div>}
                    <div className='button_option_container' style={{ width: '100%', maxWidth: 300, marginTop: 20 }} data-theme={localTheme}>
                        <div onClick={createGroup} className='button_optionPic_v' style={{ width: '100%', maxWidth: 300 }} data-theme={localTheme}>{t('save')}</div>
                        <div className='button_option' onClick={() => { setMenuFile(!menuFile) }} style={{ width: '100%', maxWidth: 300 }} data-theme={localTheme}>{t('cancel')}</div>
                    </div>
                </div>
            </div>}

            <div className='cter_sect'>
                <div style={{ width: '97%' }}>
                    <div className="copy-box two text" data-theme={localTheme} data-background={localThemeBackground}>
                        <div className="inner">
                            <div className="line right"></div>

                            <h4>{t("libraryWorkSpace.title")}</h4>
                            <div>{t("libraryWorkSpace.text1")}</div>
                            <div>{t("libraryWorkSpace.text2")}</div>
                            <div>{t("libraryWorkSpace.text3")}</div>

                            <div className='button_option_container shadowbox' style={{ width: '90%', maxWidth: 300, display: 'flex', marginTop: 20 }} data-theme={localTheme}>
                                <div onClick={() => { setMenuFile(!menuFile) }} className='button_optionPic_v' data-theme={localTheme}>{t('create_a_new_library')} ?</div>
                            </div>

                            <div style={{ marginTop: 20, display: 'flex', width: '98%', alignItems: 'center', justifyContent: 'center' }}>
                                <input onKeyDown={handleSearch} onChange={handleSearch} className='input_text' placeholder={t('search')} type="text" name="Search" id="Search" value={editSearch} data-theme={localTheme} data-background={localThemeBackground} />
                                {editSearch !== "" && <div className='button_option_container shadowbox' style={{ width: '100%', maxWidth: 80, marginLeft: 10, display: 'flex' }} data-theme={localTheme}>
                                    <div className='button_option' onClick={handleCloseSearch} style={{ width: '100%' }} data-theme={localTheme}><FontAwesomeIcon icon={faXmark} /></div>
                                    <div className='button_option' onClick={SearchGroups} style={{ width: '100%' }} data-theme={localTheme}><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='cter_sect'>
                <div className='ctent_arti animation' style={{paddingTop: 10}} data-theme={localTheme}>
                    <div style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 30 }}>{numPage + 1}/{pageCount}</div>
                    <div style={{ marginTop: 10, width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                        <CardGroup promise={promise} />
                    </div>
                    <ReactPaginate
                        breakLabel="..."
                        previousLabel={<FontAwesomeIcon icon={faArrowLeft} />}
                        nextLabel={<FontAwesomeIcon icon={faArrowRight} />}
                        pageCount={pageCount}
                        onPageChange={handlePage}
                        initialPage={numPage}
                        containerClassName={"pagination"}
                        previousLinkClassName={"pagination_link"}
                        nextLinkClassName={"pagination_link"}
                        disabledClassName={"pagination_link--disabled"}
                        activeClassName={"pagination_link--active"}
                    />
                </div>
            </div>
        </div>
    )
}

export default Groups_files