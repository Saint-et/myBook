import React, { useState, useRef, useEffect } from "react";
import { API_URL } from '../../../config';
import axios from "axios";
import { stateToHTML } from 'draft-js-export-html';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../contexts/UseAppContext';
import { EditorState, convertFromHTML, ContentState } from "draft-js";
import { IndexedDB, ajouterElement, chercherElement, mettreAJourElement,supprimerElement } from '../../../assets/data/IndexedDB';


export const UseFiles = () => {

    const { handleFullScreen: handleFullScreenContext, handleRecupererTousLesElements } = useAppContext();


    //const transaction = db.transaction(['maCollection'], 'readwrite');

    //const [tab, setTab] = useState(JSON.parse(localStorage.getItem('tab-Work-Place')) || [])

    const navigate = useNavigate()

    const url = window.location.href;
    const Id = url.split("/")[5];

    const [promise, setPromise] = useState();
    const [items, setItems] = useState([]);
    const [errorLogin, setErrorLogin] = useState();
    const [editorState, setEditorState] = useState();
    const [refresh, setRefresh] = useState(false)
    const [resize, setResize] = useState('0')




    const [refreshAuto, setRefreshAuto] = useState(localStorage.getItem('autoRefresh-Work-Place') === 'true')

    const handleAutoRefresh = () => {
        if (refreshAuto === false) {
            GetMyFileFromAPI()
        }
        setRefreshAuto(!refreshAuto)
    }


      useEffect(() => {
        localStorage.setItem('autoRefresh-Work-Place', refreshAuto); // Stocke l'état dans le localStorage
      }, [refreshAuto]);

    const [addImg, setAddImg] = useState(false);

    const GetMyFileFromLocal = async () => {
        const db = await IndexedDB();
        chercherElement(db, parseInt(Id))
            .then(async (element) => {
                if (element) {
                    setPromise(element);
                    // création du body du post
                    setEdite(element.name)
                    setEditeTags(element.tags || [])
                    setEditeAdult(element.adult)
                    setEditeVisibility(element.visibility)
                    setEditeAI(element.ai)
                    setComments(element.comments)
                    setItems(element.images)
                    setResize(element.resize)
                    //handleUpdateLocal({ id: res.data.id, name: res.data.name, miniature: res.data.miniature })
                    handleAjouterElement(element)
                    if (element.data !== null) {
                        setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(element.data))))
                    } else {
                        setEditorState(() => EditorState.createEmpty())
                    }
                } else {
                    GetMyFileFromAPI()
                }
            })
            .catch((error) => {
                console.error('Erreur lors de la recherche de l\'élément :', error);
            });

    }

    const GetMyFileFromAPI = async () => {
        //const db = await IndexedDB();
        setRefresh(false)
        try {
            await axios.get(`${API_URL}api/eventv/myfile/file/${Id}`,
                { withCredentials: true })
                .then((res) => {
                    setPromise(res.data);
                    // création du body du post
                    setEdite(res.data.name)
                    setEditeTags(res.data.tags || [])
                    setEditeAdult(res.data.adult)
                    setEditeVisibility(res.data.visibility)
                    setEditeAI(res.data.ai)
                    setComments(res.data.comments)
                    setItems(res.data.images)
                    setResize(res.data.resize)
                    //handleUpdateLocal({ id: res.data.id, name: res.data.name, miniature: res.data.miniature })
                    handleAjouterElement({ ...res.data, timestamp: Date.now() })
                    
                    //mettreAJourElement(db, res.data.id, res.data)
                    //    .then(() => {
                    //        console.log('Élément mis à jour avec succès.');
                    //        handleRecupererTousLesElements()
                    //    })
                    //    .catch((error) => {
                    //        console.error('Erreur lors de la mise à jour de l\'élément :', error);
                    //    });
                    if (res.data.data !== null) {
                        setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(res.data.data))))
                    } else {
                        setEditorState(() => EditorState.createEmpty())
                    }
                })
        } catch (error) {
            setErrorLogin(error.response.data.message);
            const db = await IndexedDB();
            // Appelez la fonction de suppression avec l'ID de l'élément à supprimer
            setPromise(false)
            supprimerElement(db, parseInt(Id))
        }

        //try {
        //    await axios.get(`${API_URL}api/eventv/myfile/file/${Id}`,
        //        { withCredentials: true })
        //        .then((res) => {
        //            setPromise(res.data);
        //            setResize(res.data.resize)
        //            // création du body du post
        //            setEdite(res.data.name)
        //            setEditeTags(res.data.tags || [])
        //            setEditeAdult(res.data.adult)
        //            setEditeVisibility(res.data.visibility)
        //            setEditeAI(res.data.ai)
        //            setComments(res.data.comments)
        //            //handleUpdateLocal({ id: res.data.id, name: res.data.name, miniature: res.data.miniature })
        //            handleAjouterElement(res.data)
        //            if (res.data.data !== null) {
        //                setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(res.data.data))))
        //            } else {
        //                setEditorState(() => EditorState.createEmpty())
        //            }
        //        })
        //} catch (error) {
        //    setErrorLogin(error.response.data.message);
        //    navigate('*')
        //}
    }



    // Dans votre composant React...

    const handleAjouterElement = async (el) => {
        try {
            const db = await IndexedDB();
            const nouvelElement = el;
            await ajouterElement(db, nouvelElement)
            .then(() => {
                handleRecupererTousLesElements()
                setRefresh(true)
            })
            //console.log('Élément ajouté avec succès');
        } catch (error) {
            //console.error('Erreur lors de l ajout de l élément :', error);
        }
    };

    //const handleUpdateLocal = (el) => {
    //    const localData = JSON.parse(localStorage.getItem('tab-Work-Place')) || [];
    //
    //    // Étape 1 : Trouvez l'indice de l'élément que vous souhaitez mettre à jour
    //    const indiceel = localData.findIndex((item) => item.id === el.id);
    //
    //    if (indiceel !== -1) {
    //        // Étape 2 : Remplacez l'ancien élément par le nouvel élément à l'indice trouvé
    //        localData[indiceel] = el;
    //
    //        localData[indiceel] = el
    //        localStorage.setItem('tab-Work-Place', JSON.stringify(localData));
    //
    //        setTab(JSON.parse(localStorage.getItem('tab-Work-Place')))
    //    } else {
    //        //console.log("L'élément à mettre à jour n'a pas été trouvé.");
    //    }
    //}

    //const GetMyFileImagesFromAPI = async () => {
    //    //try {
    //    //    await axios.get(`${API_URL}api/eventv/myfile-image/file-image/${Id}`,
    //    //        { withCredentials: true })
    //    //        .then((res) => {
    //    //            setItems(res.data)
    //    //            //handleUpdateLocal({ id: promise?.id, name: promise?.name, miniature: res.data[0]?.imageUrl })
    //    //        })
    //    //} catch (error) {
    //    //    setErrorLogin(error.response.data.message);
    //    //    navigate('*')
    //    //}
    //}


    const [custom, setCustom] = useState(false);
    const editor = useRef(null);

    // création du body du post
    const [edite, setEdite] = useState('');
    const [editeTags, setEditeTags] = useState([]);
    const [text, setText] = useState('');

    const [editeAdult, setEditeAdult] = useState(false);
    const [editeVisibility, setEditeVisibility] = useState(false);
    const [editeAI, setEditeAI] = useState(false);
    const [comments, setComments] = useState(false)





    const handleChangeTags = (e) => {
        const expressionReguliere = /\s/;
        const regexTags = /#[a-zA-Z0-9_]+/g;
        const tagsTrouves = e.target.value.match(regexTags) || [];;

        // Utilisez setText pour mettre à jour l'état du texte
        setText(e.target.value);


        if (expressionReguliere.test(e.target.value) || e.target.value.length > 30 || e.key === 'Enter') {
            // Utilisez le setEditeTags pour mettre à jour l'état des tags
            e.preventDefault()
            setEditeTags(Array.from(new Set([...editeTags, ...tagsTrouves])));
            setText('');
        }
    };


    const handleRemoveTag = (el) => {
        const filteredPromise = editeTags?.filter((array) => array != el)
        setEditeTags(filteredPromise)
    }


    // récupération des champs de text
    const handleChange = (event) => {
        setEdite(event.target.value)
    };



    const [deleteSpin, setDeleteSpin] = useState(true)
    const [message, setMessage] = useState(true)
    const [messageDownloadImg, setMessageDownloadImg] = useState(true)
    const [err, setErr] = useState(true)

    const downloadImg = async (id) => {
        setCustom(false)
        setDeleteSpin(false)
        const formData = new FormData();
        imgUpload.forEach(file => {
            formData.append("uploads", file);
        });
        { items[0] && formData.append("miniature", items[0].imageUrl || null) }
        formData.append("itemsCount", items.length)
        //items.forEach(file => {
        //    formData.append("imageUrl", file);
        //});
        try {
            await axios.post(`${API_URL}api/eventv/download/imgs/${id}`,
                formData
                ,
                { withCredentials: true })
                .then((res) => {
                    removeImage()
                    setDeleteSpin(true)
                    setMessageDownloadImg(res.data.message)
                    //GetMyFileImagesFromAPI()
                    GetMyFileFromAPI()
                })
        } catch (error) {
            GetMyFileFromAPI()
            setDeleteSpin(true)
        }
    }

    //console.log(items)


    const Update = async (id) => {
        if (edite == '') {
            return setErr('Name cannot be empty');
        }
        if (editeAdult == null || editeVisibility == null || editeAI == null || comments == null) {
            return setErr('please fill in all fields require');
        }

        setCheckbox(true)
        setCustom(false)
        setDeleteSpin(false)

        const db = await IndexedDB();
        const nouveauContenu = {
            name: edite,
            data: stateToHTML(editorState.getCurrentContent()).split(/&nbsp;/).join(""),
            tags: editeTags,
            adult: editeAdult,
            visibility: editeVisibility,
            miniature: items[0].imageUrl,
            comments: comments,
            resize: resize,
            ai: editeAI,
            images: items

        }; // Remplacez par le nouveau contenu


        mettreAJourElement(db, id, nouveauContenu)
            .then(() => {
                console.log('Élément mis à jour avec succès.');
                handleRecupererTousLesElements()
            })
            .catch((error) => {
                console.error('Erreur lors de la mise à jour de l\'élément :', error);
            });

        try {
            await axios.put(`${API_URL}api/eventv/update/article/${id}`,
                {
                    name: edite,
                    data: stateToHTML(editorState.getCurrentContent()).split(/&nbsp;/).join(""),
                    tags: editeTags,
                    adult: editeAdult,
                    visibility: editeVisibility,
                    miniature: items[0].imageUrl,
                    comments: comments,
                    ai: editeAI,
                    resize: resize,
                    imagesCount: items.length,
                    items: items

                }
                ,
                { withCredentials: true })
                .then((res) => {
                    removeImage()
                    setDeleteSpin(true)
                    setMessage(res.data.message)
                    setCheckbox(false)
                    GetMyFileFromAPI()
                })

        } catch (error) {
            setCheckbox(false)
            setDeleteSpin(true)
            setErr(error.response.data.message)
        }
    }


    const handleDelete = async (id) => {
        await axios.delete(`${API_URL}api/eventv/delete/file/${id}`,
            { withCredentials: true })
            .then(async () => {
                const db = await IndexedDB();
                supprimerElement(db, parseInt(id))
                .then(() => {
                    handleRecupererTousLesElements()
                    return navigate('/works/files')
                })
            })
    }

    const [img, setImg] = useState([]);
    const [imgUpload, setImgUpload] = useState([]);

    //Methode afin de cacher le bouton pour choisir un fichier
    const hiddenFileInput = useRef(null);

    // utilisation d'un bouton personalisé pour choisir une image
    const handleClick = async () => {
        hiddenFileInput.current.click();

    };


    const handleLoad = (event) => {
        const fileUploaded = event.target.files
        Array.from(new Set([...fileUploaded])).map((imgFile) => {
            let file = URL.createObjectURL(imgFile)
            setImg((img) => Array.from(new Set([...img, file])).splice(0, 200 - items?.length))
        })
        setImgUpload(Array.from(new Set([...imgUpload, ...fileUploaded])).splice(0, 200 - items?.length));
    };


    const handleRemoveImgUpload = (name, val) => {
        const filteredPromise = img?.filter((array) => array != name)
        setImg(filteredPromise)
        imgUpload.splice(val, 1)
    }

    //supression de l'image affiché et enregistré
    const removeImage = async () => {
        setAddImg(false)
        setImg(Array.from(new Set([])))
        setImgUpload(Array.from(new Set([])))
    };

    const handleDeleteImageClient = async (key) => {

        key?.map((el) => {
            setItems((prevItems) => {
                // Filtrer les éléments dont l'imageUrl ne correspond pas à 'el'
                const filteredItems = prevItems.filter((item) => item.imageUrl !== el);
                // Réindexer les éléments restants pour mettre à jour l'ordre
                const newOrder = filteredItems.map((image, newIndex) => ({
                    ...image,
                    order: newIndex,
                }));
                // Mettre à jour l'état 'items' avec le nouveau tableau
                return newOrder;
            });
        });

        // Utiliser le callback de setState pour garantir que l'état est mis à jour
        setItems((newItems) => {
            let json = JSON.stringify(key);
            axios.post(`${API_URL}api/eventv/delete/image/${Id}`,
                {
                    data: json,
                    newData: newItems, // Utiliser le nouveau tableau
                    miniature: newItems[0] || null
                },
                { withCredentials: true })
                .then(() => {
                    setItems(newItems)
                    //GetMyFileImagesFromAPI()
                    //if (newItems.length === 0) {
                    GetMyFileFromAPI()
                    //}
                });
        });
    };

    const handleFullScreen = (img) => {
        handleFullScreenContext(img)

    }



    const [checked, setCheckbox] = useState(false)


       // corver image rezize
   const handleRange = (e) => {
    setResize(e.target.value);
}



    useEffect(() => {
        //GetMyFileImagesFromAPI()
        if (refreshAuto === true || refreshAuto === undefined) {
            GetMyFileFromAPI()
        } else {
            GetMyFileFromLocal()
        }
    }, [])


    return {
        promise, setPromise, GetMyFileFromAPI, items, setItems, editeTags, text, handleRemoveTag,
        handleRange,resize, setResize,
        refreshAuto,
        refresh,handleAutoRefresh,
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
        handleFullScreen,
        navigate,
        handleDeleteImageClient,
        message,
        handleRemoveImgUpload,
        editeAI, setEditeAI,
        comments, setComments,
        downloadImg,
        err,
        messageDownloadImg,
        setAddImg,
        addImg

    }
}