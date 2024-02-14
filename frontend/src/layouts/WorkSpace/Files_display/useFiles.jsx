import { useState, useRef, useEffect } from "react";
import { API_URL } from '../../../config';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../contexts/UseAppContext';
import { EditorState, ContentState, convertFromRaw, convertToRaw } from "draft-js";
import { IndexedDB, ajouterElement, chercherElement, mettreAJourElement, supprimerElement } from '../../../assets/data/IndexedDB';

export const UseFiles = () => {

    const { handleRecupererTousLesElements, promiseIdentifiedUser } = useAppContext();


    const navigate = useNavigate()

    const url = window.location.href;
    const Id = url.split("/")[5];

    const [refresh, setRefresh] = useState(false);
    const [notifyCommunity, setNotifyCommunity] = useState(false);
    const [custom, setCustom] = useState(false);
    const [deleteSpin, setDeleteSpin] = useState(true);
    const [message, setMessage] = useState(true);
    const [messageDownloadImg, setMessageDownloadImg] = useState(true);
    const [err, setErr] = useState(true);
    const [checked, setCheckbox] = useState(false);
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
    const [items, setItems] = useState([]);
    const [copyShow, setCopyShow] = useState([]);
    const [img, setImg] = useState([]);
    const [imgUpload, setImgUpload] = useState([]);
    const [test, setTest] = useState([])

    const [promise, setPromise] = useState([]);
    const [errorLogin, setErrorLogin] = useState();
    const [allowUserEditTag, setAllowUserEditTag] = useState(false);
    const [autoLayout, setAutoLayout] = useState(false);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());


    const [edite, setEdite] = useState('');
    const [text, setText] = useState('#');
    const [editeTags, setEditeTags] = useState([]);

    const [resize, setResize] = useState('0');

    const editor = useRef(null);
    const hiddenFileInput = useRef(null);


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
                    setRefresh(false);
                    setPromise(element);
                    setEdite(element.name);
                    setEditeTags(element.tags || []);
                    setEditeAdult(element.adult);
                    setEditeVisibility(element.visibility);
                    setEditeAI(element.ai);
                    setComments(element.comments);
                    setItems(element.images);
                    setResize(element.resize);
                    setAllowUserEditTag(element.allowUserEditTag);
                    setAutoLayout(element.autoLayout);
                    handleAjouterElement(element);
                    if (element.data != null && element.data != "") {
                        setEditorState(() => EditorState.createWithContent(ContentState.createFromText(convertFromRaw(JSON.parse(element.data)).getPlainText())))
                    }
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
        setRefresh(false);
        try {
            await axios.get(`${API_URL}api/eventv/myfile/file/${Id}`,
                { withCredentials: true })
                .then((res) => {
                    setPromise(res.data);
                    setEdite(res.data.name);
                    setEditeTags(res.data.tags || []);
                    setEditeAdult(res.data.adult);
                    setEditeVisibility(res.data.visibility);
                    setEditeAI(res.data.ai);
                    setComments(res.data.comments);
                    setItems(res.data.images);
                    setResize(res.data.resize);
                    // Adding an item to indexedDB
                    handleAjouterElement({ ...res.data, timestamp: Date.now() });

                    if (res.data.data != null && res.data.data != "") {
                        setEditorState(() => EditorState.createWithContent(ContentState.createFromText(convertFromRaw(JSON.parse(res.data.data)).getPlainText())));
                    }
                })
        } catch (error) {
            // Call the delete function with the ID of the item to be deleted if there is a limited access to a page
            setErrorLogin(error.response.data.message);
            const db = await IndexedDB();
            setPromise(false)
            supprimerElement(db, parseInt(Id))
        }

    }


    // function: Adding an item to indexedDB
    const handleAjouterElement = async (el) => {
        try {
            const db = await IndexedDB();
            const nouvelElement = el;
            await ajouterElement(db, nouvelElement)
                .then(() => {
                    handleRecupererTousLesElements()
                    setRefresh(true)
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

    // Creation of tags for the search of the document
    const handleChangeTags = (e) => {
        setText(e.target.value);
        const expressionReguliere = /\s/;
        if (expressionReguliere.test(e.target.value) || e.target.value.length > 30 || e.key === 'Enter') {
            const regexTags = /#[a-zA-Z0-9_]+/g;
            const tagsTrouves = e.target.value.match(regexTags) || [];
            // Vérifie si un élément avec les mêmes valeurs de propriété existe déjà dans le tableau
            const isNewTagUnique = editeTags.filter((el) => el.tag === tagsTrouves[0]);
            if (isNewTagUnique.length > 0 || tagsTrouves.length === 0) {
                setText('#');
            } else {
                setEditeTags(Array.from(new Set([...editeTags, { tag: tagsTrouves[0], userId: promiseIdentifiedUser.user.id }])));
                setText('#');
            }
        };
    }

    // Deleting a tag
    const handleRemoveTag = (el) => {
        const filteredPromise = editeTags?.filter((array) => array != el);
        setEditeTags(filteredPromise);
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

        // Server

        try {
            await axios.put(`${API_URL}api/eventv/update/article/${id}`,
                {
                    name: edite,
                    data: contentStateJSON,
                    tags: editeTags,
                    adult: editeAdult,
                    visibility: editeVisibility,
                    miniature: items[0].imageUrl,
                    comments: comments,
                    ai: editeAI,
                    resize: resize,
                    allowUserEditTag: allowUserEditTag,
                    autoLayout: autoLayout,
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

                    // IndexedDB

                    const db = await IndexedDB();
                    const nouveauContenu = {
                        name: edite,
                        data: contentStateJSON,
                        tags: editeTags,
                        adult: editeAdult,
                        visibility: editeVisibility,
                        miniature: items[0].imageUrl,
                        comments: comments,
                        resize: resize,
                        ai: editeAI,
                        images: items,
                        allowUserEditTag: allowUserEditTag,
                        autoLayout: autoLayout

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
                        handleRecupererTousLesElements()
                        return navigate('/works/file')
                    })
            })
    }




    // Using a custom button to choose an image
    const handleClick = async () => {
        hiddenFileInput.current.click();
    };



    // Upload images, and create blobs
    const handleLoad = (event) => {
        const fileUploaded = event.target.files
        const filesWithNames = Array.from(fileUploaded).map((imgFile, index) => ({
            name: fileUploaded[index]?.name,
            file: URL.createObjectURL(imgFile),
        }));
        setImg((img) => Array.from(new Set([...img, ...filesWithNames])).splice(0, 200 - items?.length))
        setImgUpload(Array.from(new Set([...imgUpload, ...fileUploaded])).splice(0, 200 - items?.length));
    };

    // Delete the displayed and saved image 1 by 1
    const handleRemoveImgUpload = (name, val) => {
        const filteredPromise = img?.filter((array) => array != name)
        setImg(filteredPromise)
        imgUpload.splice(val, 1)
    }

    // Delete the displayed and saved image
    const removeImage = async () => {
        setImg(Array.from(new Set([])))
        setImgUpload(Array.from(new Set([])))
    };


    // Removing images from the server and IndexedDb
    const handleDeleteImageClient = async (key) => {

        key?.map((el) => {
            setItems((prevItems) => {
                const filteredItems = prevItems.filter((item) => item.id !== el);
                const newOrder = filteredItems.map((image, newIndex) => ({
                    ...image,
                    order: newIndex,
                }));
                //console.log(newOrder);
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
                    GetMyFileFromAPI()
                });
        });
    };


    // corver image rezize
    const handleRange = (e) => {
        setResize(e.target.value);
    }

    // Deleting the document
    const onClick = () => {
        if (window.confirm('Are you sure you want to delete this file ?')) {
            handleDelete(promise?.id)
            navigate(`/works/file`)
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

    //console.log(manageSelected);

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
        if (test.length > 0) {
            if (window.confirm(`Voulez-vous vraiment supprimer les images sélectionnées: ${test.length}/${items.length}`)) {
                handleDeleteImageClient(selected)
                setTest([])
            } else {
                return;
            }
        } else {
            if (window.confirm(`Voulez-vous vraiment supprimer les images sélectionnées: ${manageSelected.length}/${items.length}`)) {
                handleDeleteImageClient(selected)
                setManageSelected([])
                setManageBlockSelected([])
            } else {
                return;
            }
        }
    }


    function handleContextMenu(event) {
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

    const contextMenuRef = useRef(null);

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setTest([])
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

    useEffect(() => {
        if (refreshAuto === true || refreshAuto === undefined) {
            GetMyFileFromAPI()
        } else {
            GetMyFileFromLocal()
        }

    }, [refreshAuto])



    return {
        promise, setPromise, GetMyFileFromAPI, GetMyFileFromLocal, items, setItems, editeTags, text, handleRemoveTag,
        handleRange, resize, setResize,
        refreshAuto,
        refresh, handleAutoRefresh,
        setEditorState, editorState,
        img,
        edite, setEdite,
        checked,
        custom, setCustom,
        handleChange, handleChangeTags, handleDelete,
        editeVisibility, setEditeVisibility,
        editeAdult, setEditeAdult,
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
        autoLayout, setAutoLayout,
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

        test, setTest

    }
}