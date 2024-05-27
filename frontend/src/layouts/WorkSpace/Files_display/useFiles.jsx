import { useState, useRef, useEffect } from "react";
import { API_URL } from '../../../config';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../contexts/UseAppContext';
import { EditorState, ContentState, convertFromRaw, convertToRaw } from "draft-js";
import { IndexedDB, ajouterElement, chercherElement, mettreAJourElement, supprimerElement } from '../../../assets/data/IndexedDB';
import { Manage_Img } from "../../../components/versatile_function/manage_Img";
import { Manage_Tags } from "../../../components/versatile_function/manage_Tags";
import { useWorkspaceContext } from "../../../contexts/UseWorkspaceContexte";
import Function_utils from "../../../components/versatile_function/usefunction_utils";
import { SystemName } from "../../../assets/data/data";



export const UseFiles = () => {

    const { promiseIdentifiedUser, addErrorMessage } = useAppContext();

    const { handleRecupererTousLesElements, GetMyFilesFromAPI } = useWorkspaceContext();

    const {
        hiddenFileInput,

        img,
        imgUpload,
        items,
        setItems,

        handleClick,
        handleLoad,
        handleRemoveImgUpload,
        removeImage } = Manage_Img()

    const {
        handleConversionCoins,
        realCash,
        cashBack
    } = Function_utils()

    const {
        textTags,
        editeTags,
        setEditeTags,
        handleChangeTags,
        handleRemoveTag
    } = Manage_Tags()

    const navigate = useNavigate()

    //const url = window.location.href;
    //const Id = url.split("/")[5];

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const Id = parseInt(searchParams.get(`${SystemName}-file`));


    const [refresh, setRefresh] = useState(false);
    const [notifyCommunity, setNotifyCommunity] = useState(false);
    const [custom, setCustom] = useState(false);
    const [deleteSpin, setDeleteSpin] = useState(true);
    const [message, setMessage] = useState(true);
    const [messageDownloadImg, setMessageDownloadImg] = useState(true);
    const [err, setErr] = useState(true);
    const [checked, setCheckbox] = useState(false);
    const [accessPassAut, setAccessPassAut] = useState(false);
    const [manage, setManage] = useState(false)
    const [manageBlockSelectedActive, setManageBlockSelectedActive] = useState(false)
    const [refreshAuto, setRefreshAuto] = useState(localStorage.getItem('autoRefresh-Work-Place') === 'true');

    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const [editeAdult, setEditeAdult] = useState(false);
    const [editeVisibility, setEditeVisibility] = useState(false);
    const [editeAI, setEditeAI] = useState(false);
    const [comments, setComments] = useState(false);
    const [commonOption, setCommonOption] = useState(false)

    const [manageSelected, setManageSelected] = useState([])
    const [manageBlockSelected, setManageBlockSelected] = useState([])
    const [copyShow, setCopyShow] = useState([]);

    const [promise, setPromise] = useState([]);
    const [promiseAccessPass, setPromiseAccessPass] = useState([]);
    const [errorLogin, setErrorLogin] = useState();
    const [allowUserEditTag, setAllowUserEditTag] = useState(false);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [editorState1, setEditorState1] = useState(() => EditorState.createEmpty());

    const [subscription, setSubscription] = useState();
    const [limited, setLimited] = useState();

    const [edite, setEdite] = useState('');

    const editor = useRef(null);
    const contextMenuRef = useRef(null);


    // active auto refresh.
    const handleAutoRefresh = () => {
        if (refreshAuto === false) {
            GetMyFileFromAPI();
        };
        setRefreshAuto(!refreshAuto);
    };

    useEffect(() => {
        // Stores the state of the auto refresh in the localStorage.
        localStorage.setItem('autoRefresh-Work-Place', refreshAuto);
    }, [refreshAuto]);

    // Search for local documentation first.
    const GetMyFileFromLocal = async () => {
        const db = await IndexedDB();
        chercherElement(db, parseInt(Id))
            .then(async (element) => {
                if (element) {
                    if (element.adminId !== promiseIdentifiedUser?.user.id) {
                        return setPromise(false)
                    }
                    setRefresh(false);
                    setPromise(element);
                    setEdite(element.name);
                    setEditeTags(element.tags || []);
                    setEditeAdult(element.adult);
                    setEditeVisibility(element.visibility);
                    setEditeAI(element.ai);
                    setComments(element.comments);
                    setItems(element.images);
                    setAllowUserEditTag(element.allowUserEditTag);
                    handleAjouterElement(element);
                    //if (element.data != null && element.data != "") {
                    //    setEditorState(() => EditorState.createWithContent(ContentState.createFromText(convertFromRaw(JSON.parse(element.data)).getPlainText())))
                    //}
                } else {
                    // If nothing has been found search on the server
                    GetMyFileFromAPI()
                }
            })
            .catch((error) => {
                console.error('Erreur lors de la recherche de l\'élément :', error);
            });
    }

    // Search on the server second
    const GetMyFileFromAPI = async () => {
        //setRefresh(false);
        try {
            await axios.get(`${API_URL}api/eventv/myfile/file/${Id}`,
                { withCredentials: true })
                .then((res) => {
                    setPromise(res.data);
                    setRefresh(false);
                    setEdite(res.data.name);
                    setEditeTags(res.data.tags || []);
                    setEditeAdult(res.data.adult);
                    setEditeVisibility(res.data.visibility);
                    setAllowUserEditTag(res.data.allowUserEditTag);
                    setEditeAI(res.data.ai);
                    setComments(res.data.comments);
                    setItems(res.data.images);
                    // Adding an item to indexedDB
                    handleAjouterElement({ ...res.data, timestamp: Date.now() });

                    //if (res.data.data != null && res.data.data != "") {
                    //    setEditorState(() => EditorState.createWithContent(ContentState.createFromText(convertFromRaw(JSON.parse(res.data.data)).getPlainText())));
                    //}
                })
        } catch (error) {
            // Call the delete function with the ID of the item to be deleted if there is a limited access to a page
            setErrorLogin(error.response.data.message);
            const db = await IndexedDB();
            setPromise(false)
            supprimerElement(db, parseInt(Id))
        }

    }

    const GetAccessPassFromAPI = async () => {
        //setRefresh(false);
        try {
            await axios.get(`${API_URL}api/eventv/get/work-space/access-pass/${Id}`,
                { withCredentials: true })
                .then((res) => {
                    setPromiseAccessPass(res.data)
                    setPrice(res.data.price || 0)
                    handleConversionCoins(res.data.price || 0)
                })
        } catch (error) {

        }
    }

    // function: Adding an item to indexedDB
    const handleAjouterElement = async (el, refreshLocal) => {
        if (!promiseIdentifiedUser?.user.id) return;
        try {
            const db = await IndexedDB();
            const nouvelElement = el;
            await ajouterElement(db, nouvelElement)
                .then(() => {
                    handleRecupererTousLesElements(promiseIdentifiedUser?.user.id)
                    setRefresh(true)
                    if (refreshLocal?.refreshLocal) {
                        GetMyFileFromLocal()
                    }

                })
        } catch (error) {
            console.error('Erreur lors de l ajout de l élément :', error);
        }
    };

    // Image upload with new image management, thumbnail in case of Visp document, total number of images
    const downloadImg = async (id) => {
        setCustom(false)
        setDeleteSpin(false)
        const formData = new FormData();
        imgUpload.forEach(file => {
            formData.append("uploads", file);
        });
        { items[0] && formData.append("miniature", items[0].imageUrl || null) }
        formData.append("itemsCount", items.length)
        try {
            await axios.post(`${API_URL}api/eventv/download/imgs/${id}`,
                formData
                ,
                { withCredentials: true })
                .then((res) => {
                    removeImage()
                    setDeleteSpin(true)
                    setMessageDownloadImg(res.data.message)
                    GetMyFileFromAPI()
                    addErrorMessage(`🔒 Added images are locked by default 🔒`, 7000, '#00b09b')
                    //props.GetMyFilesFromAPI()
                })
        } catch (error) {
            GetMyFileFromAPI()
            setDeleteSpin(true)
        }
    }




    // Retrieving the text field for the document name
    const handleChange = (event) => {
        setEdite(event.target.value)
    };


    // updating the document to indexedDB and server
    const Update = async (id) => {
        if (edite == '') {
            return setErr('Name cannot be empty');
        }
        setCheckbox(true)
        setCustom(false)
        setDeleteSpin(false)

        const contentStateRaw = convertToRaw(editorState.getCurrentContent());
        const contentStateJSON = JSON.stringify(contentStateRaw);

        const contentStateRaw1 = convertToRaw(editorState1.getCurrentContent());
        const contentStateJSON1 = JSON.stringify(contentStateRaw1);

        // Server

        try {
            await axios.put(`${API_URL}api/eventv/update/article/${id}`,
                {
                    name: edite,
                    data: contentStateJSON,
                    dataDescription: contentStateJSON1,
                    tags: editeTags,
                    adult: editeAdult,
                    visibility: editeVisibility,
                    miniature: items[0].imageUrl,
                    comments: comments,
                    ai: editeAI,
                    allowUserEditTag: allowUserEditTag,
                    imagesCount: items.length,
                    items: items

                }
                ,
                { withCredentials: true })
                .then(async (res) => {
                    removeImage()
                    setDeleteSpin(true)
                    setMessage(res.data.message)
                    setCheckbox(false)
                    GetMyFileFromAPI()
                    //props.GetMyFilesFromAPI()

                    // IndexedDB

                    const db = await IndexedDB();
                    const nouveauContenu = {
                        name: edite,
                        data: contentStateJSON,
                        dataDescription: contentStateJSON1,
                        tags: editeTags,
                        adult: editeAdult,
                        visibility: editeVisibility,
                        miniature: items[0].imageUrl,
                        comments: comments,
                        ai: editeAI,
                        images: items,
                        allowUserEditTag: allowUserEditTag,

                    };


                    mettreAJourElement(db, id, nouveauContenu)
                        .then(() => {
                            console.log('Élément mis à jour avec succès.');
                            handleRecupererTousLesElements()
                        })
                        .catch((error) => {
                            console.error('Erreur lors de la mise à jour de l\'élément :', error);
                        });
                })

        } catch (error) {
            setCheckbox(false)
            setDeleteSpin(true)
            setErr(error.response.data.message)
        }
    }

    // Permanently deleting a document from the server and indexedDB
    const handleDelete = async (id) => {
        await axios.delete(`${API_URL}api/eventv/delete/file/${id}`,
            { withCredentials: true })
            .then(async () => {
                const db = await IndexedDB();
                supprimerElement(db, parseInt(id))
                    .then(() => {
                        GetMyFilesFromAPI()
                        handleRecupererTousLesElements()
                        return navigate('/works/file')
                    })
            })
            .catch((error) => {
                setErr(error.response.data.message)
            })
    }


    // Removing images from the server and IndexedDb
    const handleDeleteImageClient = async (key) => {

        key?.map((el) => {
            setItems((prevItems) => {
                const filteredItems = prevItems.filter((item) => item.id !== el);
                const newOrder = filteredItems.map((image, newIndex) => ({
                    ...image,
                    order: newIndex,
                }));
                return newOrder;
            });
        });

        setItems((newItems) => {
            let json = JSON.stringify(key);
            axios.post(`${API_URL}api/eventv/delete/image/${Id}`,
                {
                    data: json,
                    newData: newItems,
                    miniature: newItems[0] || null
                },
                { withCredentials: true })
                .then(() => {
                    setItems(newItems)
                    setCopyShow([])
                    GetMyFileFromAPI()
                });
        });
    };

    // Deleting the document
    const onClick = () => {
        if (window.confirm('Are you sure you want to delete this file ?')) {
            handleDelete(promise?.id)
            //navigate(`/works/file`)
        } else {
            return;
        }
    }

    // Adding images to the selection
    const handleDeleteImage = (el, index) => {
        if (!manageBlockSelectedActive) {
            setManageSelected((manageSelected) => Array.from(new Set([el, ...manageSelected])))
        } else {
            setManageSelected((manageSelected) => Array.from(new Set([el, ...manageSelected])))
            setManageBlockSelected((manageBlockSelected) => Array.from(new Set([...manageBlockSelected, index])))
        }


    }

    // Remove image from selection
    const handleRestoreImage = (el, index) => {
        if (!manageBlockSelectedActive) {
            //const filteredPromise = manageSelected?.filter((array) => array.id != el.id)
            const filteredPromise = manageSelected?.filter((array) => array != el)
            setManageSelected(filteredPromise)
        } else {
            //const filteredPromise = manageSelected?.filter((array) => array.id != el.id)
            const filteredPromise = manageSelected?.filter((array) => array != el)
            setManageSelected(filteredPromise)
            const filteredPromiseBlockSelected = manageBlockSelected?.filter((array) => array != index)
            setManageBlockSelected(filteredPromiseBlockSelected)
        }
    }

    // Select all images
    const handleSelectedAllImage = (arr) => {
        arr?.map((el) => {
            //setManageSelected((manageSelected) => Array.from(new Set([...manageSelected, el])))
            setManageSelected((manageSelected) => Array.from(new Set([...manageSelected, el.id])))
        })
    }

    // Duplicate image detection
    const handleCopyShow = (arr) => {
        if (arr === null) return setCopyShow([])
        setCopyShow([])
        arr?.map((el) => {
            setCopyShow((copyShow) => Array.from(new Set([...copyShow, el.imageUrl.split('/')[4].split('-')[1]])))
        })
    }

    // Delete image selection
    const handleDeleteImg = (selected) => {
        if (window.confirm(`Voulez-vous vraiment supprimer les images sélectionnées: ${manageSelected.length}/${items.length}`)) {
            handleDeleteImageClient(selected)
            setManageSelected([])
            setManageBlockSelected([])
        } else {
            return;
        }

    }


    const handleContextMenu = (event) => {
        event.preventDefault(); // Empêche le menu contextuel par défaut du navigateur
        setIsVisible(true);
        const posX = event.clientX;
        const posY = event.clientY;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const menuWidth = 300; // Largeur du menu contextuel (à ajuster selon votre conception)
        const menuHeight = 260; // Hauteur du menu contextuel (à ajuster selon votre conception)
        const adjustedX = Math.min(posX, screenWidth - menuWidth); // Ajuste la position X pour rester dans l'écran
        const adjustedY = Math.min(posY, screenHeight - menuHeight); // Ajuste la position Y pour rester dans l'écran
        setPosition({ x: adjustedX, y: adjustedY });
    }


    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setIsVisible(false);
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    useOutsideAlerter(contextMenuRef);

    const [shopWindow, setShopWindow] = useState(false);
    const [SubscriptionWindow, setSubscriptionWindow] = useState(false);
    const hiddenFileInputShop = useRef(null);


    const ParamsImgs = async () => {
        if (limited === undefined) {
            return;
        }

        setRefresh(true);
        setCommonOption(false)
        try {
            await axios.post(`${API_URL}api/eventv/update/lock-img/unlock-img/${Id}`,
                {
                    limited: limited,
                    imgsListId: manageSelected
                },
                { withCredentials: true })
                .then(() => {
                    setLimited()
                    setSubscription()
                    GetMyFileFromAPI()
                    setManageSelected([])
                    setManageBlockSelected([])
                })
        } catch (error) {
        }
    }

    const [price, setPrice] = useState(0)

    const NewShop = async (id) => {
        //if (price < 0) {
        //    return;
        //}
        // Vérifier si req.body.price est un nombre
        if (isNaN(price)) {
            console.log(1);
            return;
        }

        // Convertir req.body.price en nombre à virgule flottante
        const price1 = parseFloat(price);

        // Vérifier si le prix est valide
        if (isNaN(price1) || price1 < 0) {
            return;
        }
        //setShopWindow(false)
        try {
            await axios.put(`${API_URL}api/eventv/update/add-to/access-pass/${id}`,
                {
                    price: price
                },
                { withCredentials: true })
                .then(async () => {
                    handleAjouterElement({ ...promise, shop: true, timestamp: Date.now() }, { refreshLocal: true });
                    GetAccessPassFromAPI()
                })
        } catch (error) {
        }
    }

    const RemoveShop = async (id) => {
        //setShopWindow(false)
        try {
            await axios.put(`${API_URL}api/eventv/update/remove-to/access-pass/${id}`,
                { withCredentials: true })
                .then(() => {
                    handleAjouterElement({ ...promise, shop: false, timestamp: Date.now() }, { refreshLocal: true });
                    GetAccessPassFromAPI()
                })
        } catch (error) {
        }
    }


    // Deleting the displayed and saved image
    const closeShop = () => {
        setShopWindow(false)
    };

    useEffect(() => {
        // block selection
        if (manageBlockSelected?.length === 2) {
            const startIndex = manageBlockSelected[0] > manageBlockSelected[1] ? manageBlockSelected[1] : manageBlockSelected[0] + 1;
            const endIndex = manageBlockSelected[0] < manageBlockSelected[1] ? manageBlockSelected[1] : manageBlockSelected[0];
            //setManageSelected(Array.from(new Set([...items.slice(startIndex, endIndex), ...manageSelected])))
            setManageSelected(Array.from(new Set([...items?.slice(startIndex, endIndex).map(item => item.id), ...manageSelected])))
            setManageBlockSelected([])
        }
    }, [manageBlockSelected])

    //useEffect(() => {
    //    if (!promiseIdentifiedUser) {
    //        return;
    //    }
    //    if (refreshAuto === true || refreshAuto === undefined) {
    //        GetMyFileFromAPI()
    //    } else {
    //        GetMyFileFromLocal()
    //    }
    //}, [refreshAuto, promiseIdentifiedUser, Id])
//
//
    //useEffect(() => {
    //    if (shopWindow) {
    //        GetAccessPassFromAPI()
    //    }
    //}, [shopWindow])


    useEffect(() => {
        if (items?.length > 0) {
            const foundItem = items?.find(el => el.limited === 2);
            if (foundItem) {
                setAccessPassAut(true)
            } else {
                setAccessPassAut(false)
            }
        }
    }, [items])

    return {
        Id,
        promise, setPromise, GetMyFileFromAPI, GetMyFileFromLocal, items, setItems, editeTags, textTags, handleRemoveTag,
        refreshAuto,
        refresh, handleAutoRefresh,
        setEditorState, editorState,
        img,
        edite, setEdite,
        accessPassAut,
        checked,
        custom, setCustom,
        editorState1, setEditorState1,
        handleChange, handleChangeTags, handleDelete,
        editeVisibility, setEditeVisibility,
        editeAdult, setEditeAdult,
        limited, setLimited,
        subscription, setSubscription,
        Update,
        handleClick,
        hiddenFileInput,
        editor,
        handleLoad,
        removeImage,
        deleteSpin,
        navigate,
        handleDeleteImageClient,
        message,
        imgUpload,
        handleRemoveImgUpload,
        editeAI, setEditeAI,
        comments, setComments,
        downloadImg,
        err,
        messageDownloadImg,
        copyShow,
        notifyCommunity, allowUserEditTag,
        setNotifyCommunity, setAllowUserEditTag,
        commonOption, setCommonOption,
        isVisible, position,
        setIsVisible,
        contextMenuRef,
        handleContextMenu,

        handleRestoreImage,
        handleDeleteImage,
        handleSelectedAllImage,
        handleCopyShow,
        handleDeleteImg,
        onClick,
        manage, setManage,
        manageSelected, setManageSelected,
        manageBlockSelectedActive, setManageBlockSelectedActive,
        manageBlockSelected, setManageBlockSelected,

        closeShop,
        hiddenFileInputShop,
        shopWindow,
        setShopWindow,
        ParamsImgs,
        NewShop, RemoveShop,
        setPrice, price, promiseAccessPass,
        realCash,
        cashBack,
        handleConversionCoins,
        GetAccessPassFromAPI,

        SubscriptionWindow, setSubscriptionWindow

    }
}