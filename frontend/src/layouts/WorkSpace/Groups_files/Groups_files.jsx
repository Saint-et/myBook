import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowUpAZ, faArrowUp19, faFilterCircleXmark, faX, faBars, faSquare, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from "../../../contexts/UseAppContext";
import { API_URL } from '../../../config';
import axios from "axios";
import CardGroup from '../../../components/Cards/CardGroup';
import Card_SquareGroups from "../../../components/Cards/Card_SquareGroups";
import ReactPaginate from 'react-paginate';
import { useTranslation } from 'react-i18next';

let myRegex = new RegExp(/^[0-9a-zA-Z-éçàùè]+$/i);

const Groups_files = () => {

  const { t } = useTranslation();

    const { localTheme,
        setPromiseGetMyGroupsFromAPI: setPromise,
        promiseGetMyGroupsFromAPI: promise,
        GetMyGroupsFromAPI,
        numPageGetMyGroupsFromAPI: numPage,
        setNumPageGetMyGroupsFromAPI: setNumPage,
        PER_PAGE } = useAppContext();

    let listSession = localStorage.getItem("list-group");
    const [list, setList] = useState(listSession || 1)

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
    };

    const handleList = () => {
        if (listSession == 0) {
            localStorage.setItem("list-group", 1);
            setList(localStorage.getItem("list-group"))
        } else {
            localStorage.setItem("list-group", 0);
            setList(localStorage.getItem("list-group"))
        }

    }

    const handlePage = async ({ selected: selectedPage }) => {
        setNumPage(selectedPage)
        GetMyGroupsFromAPI()
    
      }

    const createGroup = async () => {
        setErrorFiles('')
        if (edite.name === '' || edite.type.length === 0) {
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
                    GetMyGroupsFromAPI()
                })
        } catch (error) {
            setErrorFiles(error.response.data.message)
        }
    }

    const handleCloseSearch = () => {
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
            <div className='cter_sect'>
                <div className='ctent_arti animation' style={{ paddingTop: 15, paddingBottom: 10 }} data-theme={localTheme}>
                    <div>{t('create_a_library')}</div>
                    <input className='input_text' onChange={handleChange('name')} style={{ width: '100%' }} placeholder={t('named')} type="text" name="Named" id="Named" value={edite.name} data-theme={localTheme} />
                    {created !== '' && <div>{created}</div>}
                    {errorFiles !== '' && <div style={{ color: 'red' }}>{errorFiles}</div>}
                    <div className='button_option_container' style={{ width: '100%', maxWidth: 300, marginTop: 20 }} data-theme={localTheme}>
                        <div onClick={createGroup} className='button_option' style={{ width: '100%', maxWidth: 300 }} data-theme={localTheme}>{t('save')}</div>
                    </div>
                </div>
            </div>

            <div className='cter_sect'>
                <div className='ctent_arti animation' data-theme={localTheme}>
                    <div style={{ margin: 20, display: 'flex', width: '90%', alignItems: 'center' }}>
                        <input onChange={handleSearch} className='input_text' placeholder={t('search')} type="search" name="Search" id="Search" value={editSearch} data-theme={localTheme} />
                        <div className='button_option_container' style={{ width: '100%', maxWidth: 200, marginLeft: 10, display: 'flex' }} data-theme={localTheme}>
                            {editSearch !== "" && <div className='button_option' onClick={SearchGroups} style={{ width: '100%' }} data-theme={localTheme}><FontAwesomeIcon icon={faMagnifyingGlass} /></div>}
                            {hiddenfaX && <div className='button_option' onClick={handleCloseSearch} style={{ width: '100%', borderRight: '1px solid grey' }} data-theme={localTheme}><FontAwesomeIcon icon={faX} /></div>}
                            <div className='button_option' onClick={handleList} style={{ width: '100%' }} data-theme={localTheme}>{list == 1 ? <FontAwesomeIcon icon={faBars} /> : <FontAwesomeIcon icon={faSquare} />}</div>
                        </div>
                    </div>
                    <div style={{ marginTop: 10, width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                        {list == 1 && <CardGroup promise={promise} />}
                        {list == 0 && <Card_SquareGroups promise={promise} />}

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
        </div>
    )
}

export default Groups_files