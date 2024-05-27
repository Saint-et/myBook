import { createContext, useContext, useEffect, useState } from "react";
import { API_URL, SOCKET_URL } from '../config';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import io from "socket.io-client";
import { IndexedDB, recupererTousLesElements, supprimerElement, ajouterElement, chercherElement, clearTableWorkSpaceById, del_Recently_viewedDB } from '../assets/data/IndexedDB';
import i18n from "../assets/i18n/i18n";
import { useNavigate } from 'react-router-dom';
import { SystemName, SystemPicture } from "../assets/data/data";
import { useAppContext } from "./UseAppContext";


export const AppContext = createContext(null);

export const WorkspaceProvider = ({ children }) => {


    const navigate = useNavigate()

    const { promiseIdentifiedUser, addErrorMessage, systemDetectMobile } = useAppContext()


    // WORKSPACE

    const [menuFile, setMenuFile] = useState(false)

    const [promise, setPromise] = useState([])
    const [totalFiles, setTotalFiles] = useState(0)
    const [totalGroup, setTotalGroup] = useState(0)

    const [promiseFileStatistical, setPromiseFileStatistical] = useState(null)

    const PER_PAGE = 5
    const [numPage, setNumPage] = useState(0)


    const GetMyFilesFromAPI = async () => {
        //setTotal('');
        setNumPage((prevNumPage) => {
            // Utilisez prevNumPage directement ici ou effectuez des opérations avec lui
            axios.get(`${API_URL}api/eventv/myfiles/files/${prevNumPage * PER_PAGE || 0}`,
                { withCredentials: true })
                .then((res) => {
                    setPromise(res.data.rows);
                    setTotalFiles(res.data.count);
                    setMenuFile(false)
                })
            // Effectuez d'autres opérations ici
            return prevNumPage; // N'oubliez pas de retourner la nouvelle valeur
        });
    }

    const [promiseGetMyGroupsFromAPI, setPromiseGetMyGroupsFromAPI] = useState()
    const [numPageGetMyGroupsFromAPI, setNumPageGetMyGroupsFromAPI] = useState(0)

    const GetMyGroupsFromAPI = async () => {
        //setTotal('');
        setNumPageGetMyGroupsFromAPI((prevNumPage) => {
            axios.get(`${API_URL}api/eventv/mygroups/groups/${prevNumPage * PER_PAGE || 0}`,
                { withCredentials: true })
                .then((res) => {
                    setPromiseGetMyGroupsFromAPI(res.data.rows);
                    setTotalGroup(res.data.count);
                })
            return prevNumPage;
        })
    }

    // IndexedDB

    const [localTabs, setLocalTabs] = useState([])
    const [otherlocalTabs, setOtherLocalTabs] = useState([])

    const handleRecupererTousLesElements = async () => {
        // Appelez la fonction pour récupérer tous les éléments
        if (!promiseIdentifiedUser?.user.id) return;

        const db = await IndexedDB();
        recupererTousLesElements(db, promiseIdentifiedUser?.user.id)
            .then((e) => {
                setLocalTabs(e.elements);
                setOtherLocalTabs(e.other_elements);

                // Utilisez les éléments récupérés comme vous le souhaitez dans votre interface utilisateur
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération de tous les éléments :', error);
            });
    };

    const handleClearIndexedDB = async () => {
        const db = await IndexedDB();
        clearTableWorkSpaceById(db, localTabs)
            .then(() => {
                //console.log('Élément supprimé avec succès');
                handleRecupererTousLesElements()
            })
            .catch((error) => {
                console.error('Erreur lors de la suppression des éléments :', error);
            });
    }

    // Search for local documentation first.
    const GetMyFileFromLocal = async (Id) => {
        const db = await IndexedDB();
        chercherElement(db, parseInt(Id))
            .then(async (element) => {
                if (element) {
                    addErrorMessage(`Le projet ${element.name} a été téléchargé avec succès, vous souhaitez accéder à ${element.name} ?`, 9000, '#396afc', `/works/${SystemName}-Workspace?${SystemName}-file=${element.id}`)
                    //if (window.confirm(`Le projet ${element.name} a été téléchargé avec succès, vous souhaitez accéder à ${element.name} ?`)) {
                    //    navigate(`/works/${SystemName}-Workspace?${SystemName}-file=${element.id}`)//(`/works/file/${element.id}`)
                    //} else {
                    //    return;
                    //}
                } else {
                    GetMyFileFromAPI(Id)
                }
            })
            .catch((error) => {
                console.error('Erreur lors de la recherche de l\'élément :', error);
            });
    }
    // Search on the server second
    const GetMyFileFromAPI = async (Id) => {
        try {
            await axios.get(`${API_URL}api/eventv/myfile/file/${Id}`,
                { withCredentials: true })
                .then((res) => {
                    // Adding an item to indexedDB
                    addErrorMessage(`Le projet ${res.data.name} a été téléchargé avec succès, vous souhaitez accéder à ${res.data.name} ?`, 9000, '#396afc', `/works/${SystemName}-Workspace?${SystemName}-file=${res.data.id}`)
                    handleAjouterElement({ ...res.data, timestamp: Date.now() });

                })
        } catch (error) {
            // Call the delete function with the ID of the item to be deleted if there is a limited access to a page
            //setErrorLogin(error.response.data.message);
            const db = await IndexedDB();
            supprimerElement(db, parseInt(Id))
        }

    }
    // function: Adding an item to indexedDB
    const handleAjouterElement = async (el) => {
        if (!promiseIdentifiedUser) return;

        try {
            const db = await IndexedDB();
            const nouvelElement = el;
            await ajouterElement(db, nouvelElement)
                .then(() => {
                    handleRecupererTousLesElements()
                    //if (window.confirm(`Le projet ${el.name} a été téléchargé avec succès, vous souhaitez accéder à ${el.name} ?`)) {
                    //    navigate(`/works/${SystemName}-Workspace?${SystemName}-file=${el.id}`)//(`/works/file/${el.id}`)
                    //} else {
                    //    return;
                    //}
                })
        } catch (error) {
            console.error('Erreur lors de l ajout de l élément :', error);
            navigate(`/works/${SystemName}-Workspace?${SystemName}-file=${el.id}`)//(`/works/file/${el.id}`)
        }
    };


    const handleClearRecently_viewedDB = async () => {
        const db = await IndexedDB();
        del_Recently_viewedDB(db)
            .then(() => {
                console.log('Object store cleared successfully');
            })
            .catch((error) => {
                console.error('Erreur lors de la suppression des éléments :', error);
            });
    }

    useEffect(() => {
        if (promiseIdentifiedUser === false) {
            setPromise([]);
            setTotalFiles(0);
            setTotalGroup(0);
            setPromiseGetMyGroupsFromAPI([]);
            setTotalFiles(0);
            setTotalGroup(0);
            //handleClearIndexedDB();
            handleClearRecently_viewedDB();
        } else {
            handleRecupererTousLesElements();
        }
    }, [promiseIdentifiedUser])

    useEffect(() => {
        if (systemDetectMobile === false) {
            GetMyFilesFromAPI()
        }
    }, [systemDetectMobile, promiseIdentifiedUser])


    return (
        <AppContext.Provider
            value={{
                // works
                handleRecupererTousLesElements,
                handleClearIndexedDB,
                localTabs,
                otherlocalTabs,
                menuFile, setMenuFile,
                setTotalFiles,
                setTotalGroup,

                promise, setPromise,
                totalFiles, totalGroup, GetMyFilesFromAPI, PER_PAGE, setNumPage, numPage,

                setPromiseGetMyGroupsFromAPI, promiseGetMyGroupsFromAPI, GetMyGroupsFromAPI,
                numPageGetMyGroupsFromAPI, setNumPageGetMyGroupsFromAPI,
                GetMyFileFromLocal,
                promiseFileStatistical, setPromiseFileStatistical
            }}>
            {children}
        </AppContext.Provider>
    )
}


export const useWorkspaceContext = () => useContext(AppContext);