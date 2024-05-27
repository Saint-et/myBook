import { useAppContext } from '../../../contexts/UseAppContext';
import { useState, useEffect, useRef } from "react";
import { API_URL } from '../../../config';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import { EditorState, ContentState, convertFromRaw, convertToRaw } from "draft-js";
import { IndexedDB, supprimerDesElements } from '../../../assets/data/IndexedDB';
import { useWorkspaceContext } from '../../../contexts/UseWorkspaceContexte';

let myRegex = new RegExp(/^[0-9a-zA-Z-éçàùè]+$/i);

export const UseGroups_display = () => {

    const navigate = useNavigate()

    const fullUrl = useLocation()
    const searchParams = new URLSearchParams(fullUrl.search);
    const location = parseInt(searchParams.get("update-group-file"));

    //const location = locations[3]

    const { localTheme, promiseIdentifiedUser } = useAppContext();

    const {
        promise: SelectFilesFromAPI,
        handleRecupererTousLesElements,
        total, GetMyFilesFromAPI: GetSelectFilesFromAPI, PER_PAGE, setNumPage, numPage } = useWorkspaceContext();


    const [hiddenSearch, setHiddenSearch] = useState(false)
    const [hiddenButton, setHiddenButton] = useState(false)
    const [hideCrop, setHideCrop] = useState(false);
    const [hideCropName, setHideCropName] = useState(false);
    const [editeType, setEditeType] = useState(null);
    const [created, setCreated] = useState('')
    const [imgUpload, setImgUpload] = useState('');
    const [img, setImg] = useState();
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const editor = useRef(null);
    const [editeHidden, setEditeHidden] = useState(false)
    const [errorFiles, setErrorFiles] = useState("");
    const [editSearch, setEditSearch] = useState('');
    const [errFront, setErrFront] = useState({
        err: ''
    })
    const [editeGroupName, setEditeGroupName] = useState({
        name: ''
    });
    const [filesSelected, setFilesSelected] = useState([])
    const [promise, setPromise] = useState()
    const [promiseGroup, setPromiseGroup] = useState()
    const [edite, setEdite] = useState({ name: '' });
    const [editeTypeAllSelected, setEditeTypeAllSelected] = useState(null);
    const [visibility, setVisibility] = useState()
    const [adult, setAdult] = useState()
    const [securityDel, setSecurityDel] = useState()


    // gestion pagination
    const pageCount = Math.ceil(total / PER_PAGE || 1)
    const handlePage = async ({ selected: selectedPage }) => {
        setNumPage(selectedPage)
        GetSelectFilesFromAPI()
    }


    const GetMyFilesFromAPI = async () => {
        await axios.get(`${API_URL}api/eventv/mygroups/groups/files/${location}`,
            { withCredentials: true })
            .then((res) => {
                setPromise(res.data);

            })
    }

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
                    if (res.data.data != null && res.data.data != "") {
                        setEditorState(() => EditorState.createWithContent(ContentState.createFromText(convertFromRaw(JSON.parse(res.data.data)).getPlainText())));
                    }
                })
        } catch (error) {
            setPromiseGroup(false)
            //navigate('*')
        }
    }

    const updateFilesGroup = async (id) => {
        if (filesSelected.length === 0) {
            return;
        }
        try {
            await axios.put(`${API_URL}api/eventv/update/groups/files`,
                {
                    id: id,
                    array: filesSelected
                },
                { withCredentials: true })
                .then(() => {
                    setEditeType({ type: [] })
                    setHiddenSearch(false)
                    GetMyFilesFromAPI()
                    if (addProjets === true) {
                        GetSelectFilesFromAPI()
                    }
                    setFilesSelected([])
                })
        } catch (error) {

        }

    };

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
            setAddProjets(false)
            setHiddenButton(true)
            await axios.get(`${API_URL}api/eventv/search/myfiles/files/${editSearch}`,
                { withCredentials: true })
                .then((res) => {
                    setPromise(res.data);
                    setErrFront({ err: '' });
                    setHiddenSearch(true);
                })
        }
    }

    const UpdateGroupFromAPI = async () => {
        const contentStateRaw = convertToRaw(editorState.getCurrentContent());
        const contentStateJSON = JSON.stringify(contentStateRaw);

        const formData = new FormData();
        formData.append("image", imgUpload || null);
        formData.append("name", editeGroupName.name);
        formData.append("data", contentStateJSON);
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
                        setCommonOption(false)
                        setFilesSelected([])
                        GetMyFilesFromAPI()
                        setVisibility()
                        setAdult()
                    })

            } catch (error) {

            }
        }
    }

    const handleChange = (name) => event => {
        setEdite({ ...edite, [name]: event.target.value })
    };

    const handleFilesSelected = (fileId) => {
        const unique = Array.from(new Set([...filesSelected, fileId]));
        setFilesSelected(unique)
    }
    const handleFilesSelectedRemove = (fileId) => {
        const filteredUsers = filesSelected.filter((id) => id != fileId);
        setFilesSelected(filteredUsers)
    }

    const handleSearch = event => {
        setEditSearch(event.target.value);
    };


    const handleCloseSearch = () => {
        setHiddenSearch(false)
        setFilesSelected([])
        setHiddenButton(false)
        setEditSearch('')
        GetMyFilesFromAPI()

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


    useEffect(() => {
        GetMyGroupFromAPI()
        GetMyFilesFromAPI()
    }, [promiseIdentifiedUser]);


    const handleAllSelected = async () => {
        setFilesSelected([])
        if (addProjets !== true) {
            if (hiddenSearch === false) {
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
            } else {
                if (editeTypeAllSelected !== null) {
                    await promise?.map(async (el) => {
                        if (el.type !== editeTypeAllSelected && el.groupId === parseInt(location)) {
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
            }

        } else {
            if (editeTypeAllSelected !== null) {
                await SelectFilesFromAPI?.map(async (el) => {
                    if (el.type === editeTypeAllSelected && el.groupId !== parseInt(location)) {
                        return setFilesSelected((filesSelected) => Array.from(new Set([...filesSelected, el.id])))
                    }
                });
            } else {
                await SelectFilesFromAPI?.map(async (el) => {
                    if (el.groupId !== parseInt(location)) {
                        setFilesSelected((filesSelected) => Array.from(new Set([...filesSelected, el.id])))
                    }
                });
            }
        }
        setEditeTypeAllSelected(null)
    }


    const handleValidate = () => {
        if (window.confirm(`Voulez-vous vraiment supprimer les images sélectionnées`)) {
            updateFilesGroup(null)
            setFilesSelected([])
            setCommonOption(false)
        } else {
            return;
        }
    }

    const [commonOption, setCommonOption] = useState(false)
    const [addProjets, setAddProjets] = useState(false)

    const handleValidateDeleteGroup = () => {
        if (window.confirm(`Voulez-vous vraiment supprimer le groupe`)) {
            DeleteGroup()
        } else {
            return;
        }
    }

    const DeleteGroup = () => {
        axios.delete(`${API_URL}api/eventv/delete/group/${location}`,
            { withCredentials: true })
            .then(() => {
                navigate('/works/library')
            });
    }


    const handleValidateSecurityDeleteGroup = () => {
        if (securityDel === promiseGroup?.name) {
            if (window.confirm(`Voulez-vous vraiment supprimer le groupe et les doc`)) {
                SecurityDeleteGroup()
            } else {
                return;
            }
        }
    }

    const SecurityDeleteGroup = () => {
        handleSupprimerDesElements()
        axios.delete(`${API_URL}api/eventv/delete-all/group-and-files/${location}`,
            { withCredentials: true })
            .then(() => {
                handleSupprimerDesElements()
                navigate('/works/library')
            });
    }

    // function: Adding an item to indexedDB
    const handleSupprimerDesElements = async () => {
        const supprimerElementsArray = promise?.map((id) => {
            return id.id
        })

        try {
            const db = await IndexedDB();
            supprimerDesElements(db, supprimerElementsArray)
                .then(() => {
                    handleRecupererTousLesElements()
                })
        } catch (error) {
            console.error('Erreur lors de l ajout de l élément :', error);
        }
    };

    //console.log(promise);

    return {
        localTheme, promiseIdentifiedUser,
        SelectFilesFromAPI, numPage, location,
        hiddenSearch,
        hiddenButton, setHiddenButton,
        hideCrop, setHideCrop,
        hideCropName, setHideCropName, setImgUpload,
        visibility, setVisibility,
        commonOption, setCommonOption,
        addProjets, setAddProjets,
        adult, setAdult,
        img, setImg,
        editorState, setEditorState,
        editeHidden, setEditeHidden,
        filesSelected, setFilesSelected,
        editeTypeAllSelected, setEditeTypeAllSelected,
        editSearch,
        editor,
        promise,
        promiseGroup,
        pageCount, handlePage,
        edite,
        handleChange,
        editeType, setEditeType,
        created,
        errorFiles,
        createFile,
        handleFilesSelected,
        handleFilesSelectedRemove,
        updateFilesGroup,
        handleSearch,
        handleCloseSearch,
        SearchFiles,
        handleLoad,
        handleChangeGroupName,
        UpdateGroupFromAPI,
        handleAllSelected,
        UpdateGroupFilesFromAPI,
        handleValidate,
        handleValidateDeleteGroup,
        handleValidateSecurityDeleteGroup,
        setSecurityDel,
        securityDel
    }
}