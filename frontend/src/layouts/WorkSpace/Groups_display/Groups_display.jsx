import { useAppContext } from '../../../contexts/UseAppContext';
import Picture from '../../../assets/icons/disposition-boites-expedition-angle-eleve.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faX, faFilterCircleXmark, faArrowLeft, faArrowRight, faArrowUp19, faArrowDown19, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from "react";
import { API_URL } from '../../../config';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import Card_select from '../../../components/Cards/Card_select';
import ReactPaginate from 'react-paginate';
import imgProfile from '../../../assets/images/logo.png';
import AvatarImageCropper from 'react-avatar-image-cropper';
import Validate from '../../../components/Validate';
import Select from '../../../components/Select/Select';
import { optionsType, optionsCategories } from '../../../assets/data/data';


let myRegex = new RegExp(/^[0-9a-zA-Z-éçàùè]+$/i);

const Groups_display = () => {

    const navigate = useNavigate()

    const locations = useLocation().pathname.split("/")

    const location = locations[3]

    const { localTheme, promiseIdentifiedUser } = useAppContext();


    const [hiddenPagination, setHiddenPagination] = useState(false)

    const [hiddenPaginationSearch, setHiddenPaginationSearch] = useState(false)

    const [hideCrop, setHideCrop] = useState(false);
    const [hideCropName, setHideCropName] = useState(false);
    const [imgUpload, setImgUpload] = useState('');
    const [img, setImg] = useState();

    const [promise, setPromise] = useState()
    const [promiseGroup, setPromiseGroup] = useState()

    // zone de text adaptative
    const handleKeyDown = (e) => {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const [total, setTotal] = useState('')
    const PER_PAGE = 5
    const pageCount = Math.ceil(total / PER_PAGE)
    const handlePage = async ({ selected: selectedPage }) => {
        if (hiddenPagination === false) {

        } else {
            GetSelectFilesFromAPI(selectedPage)

        }

    }

    const [edite, setEdite] = useState({ name: '' });


    const GetMyFilesFromAPI = async () => {
        //setPromise('');
        //setTotal('');
        setNewFilesHidden(true)
        await axios.get(`${API_URL}api/eventv/mygroups/groups/files/${location}`,
            { withCredentials: true })
            .then((res) => {
                setPromise(res.data.rows);
                setTotal(res.data.count);
            })
    }


    const handleChange = (name) => event => {
        setEdite({ ...edite, [name]: event.target.value })
    };
    const [editeType, setEditeType] = useState(null);
    const [created, setCreated] = useState('')

    const [errorFiles, setErrorFiles] = useState("");
    const createFile = async () => {
        setErrorFiles('')
        if (edite.name === '' || editeType === null) {
            return setErrorFiles("please fill in all fields.")
        }
        try {
            await axios.post(`${API_URL}api/eventv/create/file`, {
                name: edite.name,
                type: editeType,
                groupId: location,
            }, { withCredentials: true })
                .then((res) => {
                    setCreated(res.data.message)
                    setErrorFiles('')
                    setEdite({ name: '' })
                    GetMyFilesFromAPI()
                })
        } catch (error) {
            setErrorFiles(error.response.data.message)
        }
    }

    const GetSelectFilesFromAPI = async (selectedPage) => {
        setHiddenPagination(true)
        //setPromise('')
        //setTotal('')
        setNewFilesHidden(false)
        setFilesSelected([])
        //setSelectedFilesHidden(true)
        await axios.get(`${API_URL}api/eventv/myfiles/files/${selectedPage * PER_PAGE || 0}`,
            { withCredentials: true })
            .then((res) => {
                setPromise(res.data.rows);
                setTotal(res.data.count);
            })
    }


    const [editeHidden, setEditeHidden] = useState(false)

    const [newFilesHidden, setNewFilesHidden] = useState(true)

    const [filesSelected, setFilesSelected] = useState([])

    // const filteredUsers = filesSelected.filter((id) => id == fileId);

    const handleFilesSelected = (fileId) => {
        const unique = Array.from(new Set([...filesSelected, fileId]));
        setFilesSelected(unique)
    }
    const handleFilesSelectedRemove = (fileId) => {
        const filteredUsers = filesSelected.filter((id) => id != fileId);
        setFilesSelected(filteredUsers)
    }

    const updateFilesGroup = async (id, tags) => {
        //setPromise('')
        //setTotal('')

        try {
            await axios.put(`${API_URL}api/eventv/update/groups/files`,
                {
                    id: id,
                    tags: tags,
                    array: filesSelected
                },
                { withCredentials: true })
                .then(() => {
                    setNewFilesHidden(false)
                    setEditeType({ type: [] })
                    setHiddenPagination(false)
                    GetMyFilesFromAPI()
                    setFilesSelected([])
                })
        } catch (error) {

        }

    };

    // const [selectedFilesHidden, setSelectedFilesHidden] = useState(true)


    const handleSearch = event => {
        setEditSearch(event.target.value);
    };

    const [editSearch, setEditSearch] = useState('');
    const [errFront, setErrFront] = useState({
        err: ''
    })

    const handleCloseSearch = () => {
        setHiddenPaginationSearch(false)
        if (hiddenPagination === false) {
            GetMyFilesFromAPI()
        } else {
            GetSelectFilesFromAPI()
        }
    }

    const SearchFiles = async () => {
        if (editSearch === "") {
            setErrFront({
                err: ''
            })
        } else if (!myRegex.test(editSearch)) {
            setErrFront({
                err: "Special characters are not supported."
            });

        } else {
            await axios.get(`${API_URL}api/eventv/search/myfiles/files/${editSearch}`,
                { withCredentials: true })
                .then((res) => {
                    setPromise(res.data.rows);
                    setTotal(res.data.count);
                    setErrFront({ err: '' });
                    setHiddenPaginationSearch(true);
                })
        }
    }

    //chargement de l'image & Affichage de l’image
    const handleLoad = (event) => {
        setHideCrop(false)
        const fileUploaded = event
        setImgUpload(fileUploaded);
        setImg(URL.createObjectURL(fileUploaded));
    };

    const handleChangeGroupName = (name) => event => {
        setEditeGroupName({ ...editeGroupName, [name]: event.target.value })
    };
    const [editeGroupName, setEditeGroupName] = useState({
        name: ''
    });

    const GetMyGroupFromAPI = async () => {
        setPromiseGroup('')
        try {
            await axios.get(`${API_URL}api/eventv/mygroup/group/${location}`,
                { withCredentials: true })
                .then((res) => {
                    setPromiseGroup(res.data);
                    setEditeGroupName({
                        name: res.data.name
                    })
                    setImg(res.data.imageUrl)
                    setImgUpload(res.data.imageUrl)
                })
        } catch (error) {
            //setErrorLogin(error.response.data.message);
            navigate('*')
        }
    }

    const UpdateGroupFromAPI = async () => {

        const formData = new FormData();
        formData.append("image", imgUpload || null);
        formData.append("name", editeGroupName.name);
        try {
            await axios.put(`${API_URL}api/eventv/update/mygroup/${location}`,
                formData
                , { withCredentials: true })
                .then(() => {
                    setHideCropName(false)
                    setHideCrop(false)
                    GetMyGroupFromAPI()
                })

        } catch (error) {

        }
    }

    //console.log(promise);

    useEffect(() => {
        GetMyGroupFromAPI()
        GetMyFilesFromAPI()
    }, []);

    // el.groupId !== parseInt(location)

    const [editeTypeAllSelected, setEditeTypeAllSelected] = useState(null);

    const handleAllSelected = async () => {
        setFilesSelected([])
        if (newFilesHidden === true) {
            if (editeTypeAllSelected !== null) {
                await promise?.map(async (el) => {
                    if (el.type === editeTypeAllSelected && el.groupId === parseInt(location)) {
                        return setFilesSelected((filesSelected) => Array.from(new Set([...filesSelected, el.id])))
                    }
                });
            } else {
                await promise?.map(async (el) => {
                    if (el.groupId === parseInt(location)) {
                        setFilesSelected((filesSelected) => Array.from(new Set([...filesSelected, el.id])))
                    }
                });
            }
            //await promise?.map(async (el) => {
            //    setFilesSelected((filesSelected) => Array.from(new Set([...filesSelected, el.id])))
            //});
            setEditeTypeAllSelected(null)
        } else {
            if (editeTypeAllSelected !== null) {
                await promise?.map(async (el) => {
                    if (el.type === editeTypeAllSelected && el.groupId !== parseInt(location)) {
                        return setFilesSelected((filesSelected) => Array.from(new Set([...filesSelected, el.id])))
                    }
                });
            } else {
                await promise?.map(async (el) => {
                    if (el.groupId !== parseInt(location)) {
                        setFilesSelected((filesSelected) => Array.from(new Set([...filesSelected, el.id])))
                    }
                });
            }
            //await promise?.map(async (el) => {
            //    setFilesSelected((filesSelected) => Array.from(new Set([...filesSelected, el.id])))
            //});
            setEditeTypeAllSelected(null)
        }
    }

    const [visibility, setVisibility] = useState()
    const [adult, setAdult] = useState()

    const UpdateGroupFilesFromAPI = async () => {
        if (visibility === undefined && adult === undefined) {
            setVisibility()
            setAdult()
        } else {
            try {
                await axios.put(`${API_URL}api/eventv/update/group-files`,
                    {
                        array: filesSelected,
                        value: {
                            visibility: visibility,
                            adult: adult
                        }
                    }
                    , { withCredentials: true })
                    .then(() => {
                        setHideCropName(false)
                        setHideCrop(false)
                        setFilesSelected([])
                        setVisibility()
                        setAdult()
                        if (!hiddenPaginationSearch) {
                            GetMyFilesFromAPI()
                        } else {
                            SearchFiles()
                        }
                    })

            } catch (error) {

            }
        }
    }


    const [validate, setValidate] = useState({
        value: false,
        text: ''
    })
    const handleValidate = (val) => {
        if (val) {
            updateFilesGroup(null, '')
            setFilesSelected([])
            setValidate({
                value: false,
                text: ''
            })
        } else {
            setValidate({
                value: false,
                text: ''
            })
        }
    }

    if (!promiseGroup) return null

    return (
        <div className='open-elementPage'>
            {validate.value && <Validate text={validate.text} handleValidate={handleValidate} />}

            <div className='cter_sect'>
                <div className='ctent_arti' style={{ overflow: 'visible', marginTop: 50, justifyContent: 'center', maxWidth: 900 }} data-theme={localTheme}>
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: 10, borderRadius: 5 }}>
                        {!hideCrop && <img onClick={hideCropName ? () => { setHideCrop(true) } : null} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='Profile_picture' style={{ width: 250, height: 250, cursor: hideCropName ? 'pointer' : null }} src={img || promiseGroup.imageUrl || Picture} alt="" />}
                    </div>
                    {hideCrop && <div style={{ width: 250, height: 250, marginBottom: 10 }}>
                        <AvatarImageCropper apply={handleLoad} text={'Select an image'} previewBorderRadius={'50%'} isBack={imgProfile} maxsize={1000 * 1000 * 5} />
                    </div>}

                    {!hideCropName && <h2 style={{ margin: 0 }} translate='no'>{promiseGroup.name.charAt(0).toUpperCase() + promiseGroup.name.slice(1)}</h2>}
                    {hideCropName && <>
                        <input className='input_text' onChange={handleChangeGroupName('name')} defaultValue={promiseGroup.name} placeholder='Change the name...' type="text" name="" id="" data-theme={localTheme} /></>}

                    <div className='button_option_container' style={{ width: '100%', maxWidth: 500, marginTop: 10 }} data-theme={localTheme}>

                        {!hideCropName ?
                            <div onClick={() => {
                                setHideCropName(true)
                                setHideCrop(true)
                            }} className='button_option' data-theme={localTheme}>Custom the library</div>
                            :
                            <div onClick={() => {
                                setHideCropName(false)
                                setHideCrop(false)
                                setImg(promiseGroup.imageUrl)
                                setImgUpload(promiseGroup.imageUrl)
                            }} className='button_option' style={{ borderBottom: '1px solid grey' }} data-theme={localTheme}>Cancel custom the library</div>}
                        {hideCropName && <div style={{ color: 'red' }} className='button_option' data-theme={localTheme}>Delete library and files</div>}
                        {hideCropName && <div style={{ color: '#ff7777' }} className='button_option' data-theme={localTheme}>Delete library</div>}

                        {hideCropName && <div onClick={UpdateGroupFromAPI} style={{ color: '#0084ff' }} className='button_option' data-theme={localTheme}>Save</div>}
                    </div>
                </div>
            </div>


            <div className='cter_sect'>
                <div className='ctent_arti' style={{ overflow: 'visible', justifyContent: 'space-around', maxWidth: 1800, flexDirection: 'row', flexWrap:  'wrap' }} data-theme={localTheme}>


                    <div style={{ width: '90%', maxWidth: 300 }}>
                        <h3>Add files</h3>
                        <div className='button_option_container' style={{ width: '100%', maxWidth: 300 }} data-theme={localTheme}>


                            {filesSelected.length === 0 && <>{newFilesHidden && <>{!editeHidden && <div onClick={() => {
                                setEditeHidden(true)
                                setFilesSelected([])
                            }} style={{ borderBottom: '1px solid grey' }} className='button_option' data-theme={localTheme}>Create new file</div>}
                            </>}</>}


                            {!newFilesHidden && <> <div onClick={() => {
                                setNewFilesHidden(false)
                                setEditeType(null)
                                setHiddenPagination(false)
                                GetMyFilesFromAPI()
                                setFilesSelected([])
                                setHiddenPaginationSearch(false)
                            }} className='button_option' data-theme={localTheme}>Cancel</div>
                            </>}

                            {filesSelected.length !== 0 && <>{!newFilesHidden && <div onClick={() => {
                                updateFilesGroup(location, promiseGroup.groupTags)
                                setFilesSelected([])
                            }} className='button_option' style={{ color: '#0084ff' }} data-theme={localTheme}>Add projets</div>}</>}

                            {!editeHidden && <>{newFilesHidden && <div onClick={GetSelectFilesFromAPI} className='button_option' data-theme={localTheme}>Add projets</div>}</>}

                            {editeHidden && <div onClick={() => {
                                setEditeHidden(false)
                                setEditeType(null)
                                setHiddenPagination(false)
                                GetMyFilesFromAPI()
                                setFilesSelected([])
                                setHiddenPaginationSearch(false)
                            }} className='button_option' data-theme={localTheme}>Cancel</div>}
                        </div>
                    </div>

                    {!editeHidden && <>
                        <div style={{ width: '90%', maxWidth: 300 }}>
                            <h3>Selection options</h3>
                            <div className='button_option_container' style={{ width: '100%', maxWidth: 300 }} data-theme={localTheme}>

                                <div onClick={() => {
                                    setFilesSelected([])
                                }} style={{ borderBottom: '1px solid grey' }} className='button_option' data-theme={localTheme}>Cancel selection<FontAwesomeIcon style={{ marginLeft: 10 }} icon={faMinus} /></div>
                                <div onClick={handleAllSelected} style={{ color: '#0084ff' }} className='button_option' data-theme={localTheme}>All selected<FontAwesomeIcon style={{ marginLeft: 10 }} icon={faPlus} /></div>


                            </div>
                            <div style={{ width: '100%', maxWidth: 300, marginTop: 20 }}>Type of file</div>
                            <div style={{ width: '100%', maxWidth: 300, marginTop: 10 }}>
                                <Select setSelectedValue={setEditeTypeAllSelected} selectedValue={editeTypeAllSelected} arrays={optionsType} localTheme={localTheme} />
                            </div>

                        </div>



                        {filesSelected.length !== 0 && <>{newFilesHidden && <>{!editeHidden && <>
                            <div style={{ width: '90%', maxWidth: 500 }}>
                                <h3>Common option</h3>
                                <div>Files visibility:</div>
                                <div style={{ width: '100%', display: 'flex', marginTop: 10, justifyContent: 'space-around' }}>
                                    <div className="checkbox-wrapper-46Radio">
                                        <input className="inp-cbxRadio" onChange={() => { setVisibility() }} defaultChecked={visibility === undefined} type="radio" name="rdo" id="opt35632" />
                                        <label className="cbxRadio" htmlFor="opt35632">
                                            <span></span><span style={{ marginLeft: 5 }}>None</span>
                                        </label>
                                    </div>
                                    <div className="checkbox-wrapper-46Radio">
                                        <input className="inp-cbxRadio" onChange={() => { setVisibility(false) }} defaultChecked={visibility === false} type="radio" name="rdo" id="opt2" />
                                        <label className="cbxRadio" htmlFor="opt2">
                                            <span></span><span style={{ marginLeft: 5 }}>Private</span>
                                        </label>
                                    </div>
                                    <div className="checkbox-wrapper-46Radio">
                                        <input className="inp-cbxRadio" onChange={() => { setVisibility(true) }} defaultChecked={visibility === true} type="radio" name="rdo" id="opt1" />
                                        <label className="cbxRadio" htmlFor="opt1">
                                            <span></span><span style={{ marginLeft: 5 }}>Public</span>
                                        </label>
                                    </div>
                                </div>

                                <div>Files adult:</div>
                                <div style={{ width: '100%', display: 'flex', marginTop: 10, justifyContent: 'space-around' }}>
                                    <div className="checkbox-wrapper-46Radio">
                                        <input className="inp-cbxRadio" onChange={() => { setAdult() }} defaultChecked={adult === undefined} type="radio" name="rdo1" id="opt35564" />
                                        <label className="cbxRadio" htmlFor="opt35564">
                                            <span></span><span style={{ marginLeft: 5 }}>None</span>
                                        </label>
                                    </div>
                                    <div className="checkbox-wrapper-46Radio">
                                        <input className="inp-cbxRadio" onChange={() => { setAdult(0) }} defaultChecked={adult === 0} type="radio" name="rdo1" id="opt3" />
                                        <label className="cbxRadio" htmlFor="opt3">
                                            <span></span><span style={{ marginLeft: 5 }}>Everyone</span>
                                        </label>
                                    </div>
                                    <div className="checkbox-wrapper-46Radio">
                                        <input className="inp-cbxRadio" onChange={() => { setAdult(1) }} defaultChecked={adult === 1} type="radio" name="rdo1" id="opt4" />
                                        <label className="cbxRadio" htmlFor="opt4">
                                            <span></span><div className='adult' style={{ marginLeft: 5 }} translate='no'>18+</div>
                                        </label>
                                    </div>
                                    <div className="checkbox-wrapper-46Radio">
                                        <input className="inp-cbxRadio" onChange={() => { setAdult(2) }} defaultChecked={adult === 2} type="radio" name="rdo1" id="opt5" />
                                        <label className="cbxRadio" htmlFor="opt5">
                                            <span></span><div className='adult' style={{ marginLeft: 5 }} translate='no'>18++</div>
                                        </label>
                                    </div>
                                </div>

                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                    <div className='button_option_container' style={{ width: '100%', maxWidth: 300, marginTop: 10 }} data-theme={localTheme}>
                                        {filesSelected.length !== 0 && <>
                                            {newFilesHidden && <div style={{ paddingTop: 5, paddingBottom: 5, color: 'red' }} className='button_option' data-theme={localTheme}>Permanently delete</div>}</>}
                                        {filesSelected.length !== 0 && <>{newFilesHidden && <div onClick={() => setValidate({ value: true, text: 'Are you sure you want to delete files?' })} style={{ paddingTop: 5, paddingBottom: 5, color: '#ff7777', borderBottom: '1px solid grey' }} className='button_option' data-theme={localTheme}>Remove from group</div>}</>}

                                        <div onClick={UpdateGroupFilesFromAPI} className='button_option' style={{ color: '#0084ff' }} data-theme={localTheme}>Save common option</div>
                                    </div>
                                </div>
                            </div>
                        </>}</>}
                        </>}

                    </>}


                </div >
            </div >



            {editeHidden && <div className='cter_sect'>
                <div className='ctent_arti' style={{ overflow: 'visible', justifyContent: 'center', maxWidth: 900 }} data-theme={localTheme}>

                    <div style={{ width: '90%', maxWidth: 400 }}>
                        <h3>Add files</h3>
                        <div>Create a file in the group</div>
                        <input className='input_text' onChange={handleChange('name')} style={{ width: '100%' }} placeholder='Named' type="text" name="Named" id="Named" value={edite.name} data-theme={localTheme} />
                        <div>Type of file</div>
                        <div style={{ width: '100%', marginTop: 10 }}>
                            <Select setSelectedValue={setEditeType} selectedValue={editeType} arrays={optionsType} localTheme={localTheme} />
                        </div>
                        {created !== '' && <div>{created}</div>}
                        {errorFiles !== '' && <div style={{ color: 'red' }}>{errorFiles}</div>}
                        <div className='button_option_container' style={{ width: '100%', marginTop: 10 }} data-theme={localTheme}>
                            <div onClick={() => {
                                setEditeHidden(false)
                                setEditeType(null)
                                setHiddenPagination(false)
                                GetMyFilesFromAPI()
                                setFilesSelected([])
                                setHiddenPaginationSearch(false)
                            }} style={{ borderBottom: '1px solid grey' }} className='button_option' data-theme={localTheme}>Cancel</div>
                            <div className='button_option' onClick={() => { createFile() }} style={{ width: '100%', color: '#0084ff' }} data-theme={localTheme}>Save</div>
                        </div>
                    </div>
                </div >
            </div >}


            <div className='cter_sect'>
                <div className='ctent_arti animation' data-theme={localTheme}>
                    <div style={{ margin: 20, display: 'flex', width: '90%', alignItems: 'center' }}>
                        <input onChange={handleSearch} className='input_text' placeholder='Search' type="search" name="Search" id="Search" value={editSearch} data-theme={localTheme} />

                        <div className='button_option_container' style={{ width: '100%', maxWidth: 300, marginLeft: 10, display: 'flex' }} data-theme={localTheme}>
                            {editSearch !== "" && <div className='button_optionBlue' onClick={SearchFiles} style={{ width: '100%', maxWidth: 300 }} data-theme={localTheme}><FontAwesomeIcon icon={faMagnifyingGlass} /></div>}
                            {hiddenPaginationSearch && <div className='button_option' onClick={handleCloseSearch} style={{ width: '100%', maxWidth: 300, borderRight: '1px solid grey' }} data-theme={localTheme}><FontAwesomeIcon icon={faX} /></div>}
                            <div className='button_option' style={{ width: '100%', maxWidth: 300 }} data-theme={localTheme}><FontAwesomeIcon icon={faArrowUp19} /></div>
                            <div className='button_option' style={{ width: '100%', maxWidth: 300 }} data-theme={localTheme}><FontAwesomeIcon icon={faArrowDown19} /></div>
                            <div className='button_option' style={{ width: '100%', maxWidth: 300 }} data-theme={localTheme}><FontAwesomeIcon icon={faFilterCircleXmark} /></div>
                        </div>
                        <div style={{ display: 'flex', width: '30%', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', marginLeft: 10, color: '#747474' }}>Documents found:<div>{total}</div></div>
                            {filesSelected.length !== 0 && <div style={{ display: 'flex' }}>Documents selected:<div style={{ marginLeft: 10, fontWeight: 800, color: '#0084ff' }}>{filesSelected.length}</div>/{total}</div>}
                        </div>
                    </div>
                    <div style={{ marginTop: 10, width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>


                        <Card_select checkbox={newFilesHidden} location={location} filesSelected={filesSelected} handleFilesSelected={handleFilesSelected} handleFilesSelectedRemove={handleFilesSelectedRemove} promise={promise} localTheme={localTheme} />



                        {!hiddenPaginationSearch && <>
                            {hiddenPagination && <ReactPaginate
                                breakLabel="..."
                                previousLabel={<FontAwesomeIcon icon={faArrowLeft} />}
                                nextLabel={<FontAwesomeIcon icon={faArrowRight} />}
                                pageCount={pageCount}
                                onPageChange={handlePage}
                                containerClassName={"pagination"}
                                previousLinkClassName={"pagination_link"}
                                nextLinkClassName={"pagination_link"}
                                disabledClassName={"pagination_link--disabled"}
                                activeClassName={"pagination_link--active"}
                            />}
                        </>}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Groups_display