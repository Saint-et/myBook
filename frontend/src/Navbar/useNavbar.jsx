import { useRef, useState } from 'react';
import { API_URL, SOCKET_URL } from '../config';
import axios from "axios";
import { EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { stateToHTML } from 'draft-js-export-html'
import io from "socket.io-client";
import { useAppContext } from '../contexts/UseAppContext';
import { useLocation, useNavigate } from 'react-router-dom';


const socket = io.connect(SOCKET_URL);

const UseNavbar = () => {

    let localHistoricalJSON = JSON.parse(localStorage.getItem('Historical'))

    const location = useLocation()
    const navigate = useNavigate()

    const locationUrl = location.pathname.split("/")[1]

    const { setActiveAnimation,
        setHiddenMenuSidebareRight,
        setPromiseIdentifiedUser,
        promiseIdentifiedUser,
        GetNotifFromAPI,
        GetNotifMessageFromAPI,
        addErrorMessage } = useAppContext()


    const [hiddenMenu, setHiddenMenu] = useState(false)
    const [notifcation, setNotification] = useState(false)
    const [hiddenMessage, setHiddenMessage] = useState(false)
    const [hiddenMenuAdd, setHiddenMenuAdd] = useState(false)

    const handleButtonClick = () => {
        // Activez l'animation en mettant à jour l'état local
        setActiveAnimation(false);

        // Vous pouvez également désactiver l'animation après un certain délai si nécessaire
        setTimeout(() => {
            setHiddenMenuSidebareRight(false)
        }, 300); // Par exemple, désactivez l'animation après 1 seconde
    };

    const handleLogout = async () => {
        handleButtonClick()
        setNotification(false)
        setHiddenMenu(false)
        setHiddenMessage(false)
        await axios.get(`${API_URL}api/auth/logout`,
            { withCredentials: true })
            .then(() => {
                addErrorMessage(`L'utilisateur à bien été déconnecté.`, 5000, '#396afc')
                setPromiseIdentifiedUser(false)
                return;
            })
    }

    const handleDelete = async (id) => {
        await axios.delete(`${API_URL}api/eventv/delete/notif/${id}`,
            { withCredentials: true })
            .then(() => {
                return GetNotifFromAPI()
            })

    }
    const handleDeleteAllNotif = async () => {
        await axios.delete(`${API_URL}api/eventv/delete/notifs`,
            { withCredentials: true })
            .then(() => {
                addErrorMessage(`Toute les notification ont été supprimé.`, 3000, '#396afc')
                return GetNotifFromAPI()
            })

    }


    const [hiddenAnswer, setHiddenAnswer] = useState(false)
    const [errorAnswer, setErrorAnswer] = useState(false)

    const handleDeleteAllMessage = async () => {
        await axios.delete(`${API_URL}api/eventv/delete/messages`,
            { withCredentials: true })
            .then(() => {
                addErrorMessage(`Tous les messages ont été supprimé.`, 3000, '#396afc')
                return GetNotifMessageFromAPI()
            })

    }


    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    const editor = useRef(null);

    const submitMessage = async (uuid, id, userId) => {
        if (editorState.getCurrentContent().getPlainText() !== "") {
            try {
                await axios.post(`${API_URL}api/eventv/post/message`, {
                    id: null,
                    text: stateToHTML(editorState.getCurrentContent()),
                    uuId: uuid,
                    userId: id
                }, { withCredentials: true })
                    .then(() => {
                        setEditorState(() => EditorState.createEmpty())
                        handleDeleteNotifMessage(uuid)
                        socket.emit('message-created', { uuId: uuid });
                        socket.emit('notify-message', { uuId: uuid, text: stateToHTML(editorState.getCurrentContent()), userId: userId, sessionUserId: promiseIdentifiedUser.user.id, status: true });
                    })
            } catch (error) {
                setErrorAnswer(error.response.data.message)
            }
        }
    }
    const handleDeleteNotifMessage = async (uuId) => {
        try {
            await axios.delete(`${API_URL}api/eventv/delete/notifMessage/${uuId}`,
                { withCredentials: true })
                .then(() => {
                    GetNotifMessageFromAPI();
                })
        } catch (error) {

        }
    }

    // SEARCH


    const [editSearch, setEditSearch] = useState('');
    const [historical, setHistorical] = useState(false);

    // lecture des changement effectué
    const handleChangeSearch = (event) => {
        setEditSearch(event.target.value);
        SearchTags(event.target.value)

        if (event.key === 'Enter') {
            setHistorical(false)
            SearchUserName()
        }
    };

    const handleClick = (promise) => {
        SearchUserName()
        setHistorical(false)
        setEditSearch(promise)
    }


    const SearchUserName = async () => {
        if (!editSearch.trim().split(/ +/).join(" ")) {
            return null
        }
        if (localHistoricalJSON == null) {
            localStorage.setItem('Historical', JSON.stringify([editSearch.trim().split(/ +/).join(" ")]))
            navigate(`/${locationUrl == 'search-articles' ? 'search-articles' : null || locationUrl == 'search-users' ? 'search-users' : null || 'search-articles'}/${editSearch}`, { replace: true })
            NewSearchTags()
        } else {
            const filteredEditSearch = localHistoricalJSON.filter((id) => id == editSearch)
            if (filteredEditSearch[0] !== editSearch) {
                localStorage.setItem('Historical', JSON.stringify([editSearch.trim().split(/ +/).join(" "), ...localHistoricalJSON]))
            }
            navigate(`/${locationUrl == 'search-articles' ? 'search-articles' : null || locationUrl == 'search-users' ? 'search-users' : null || 'search-articles'}/${editSearch}`, { replace: true })
            NewSearchTags()
        }
    }

    const SearchUserNameAPI = async (tag) => {
        if (!tag) {
            return null
        }
        if (localHistoricalJSON == null) {
            localStorage.setItem('Historical', JSON.stringify([tag]))
            navigate(`/${locationUrl == 'search-articles' ? 'search-articles' : null || locationUrl == 'search-users' ? 'search-users' : null || 'search-articles'}/${tag}`, { replace: true })
        } else {
            const filteredEditSearch = localHistoricalJSON.filter((id) => id == tag)
            if (filteredEditSearch[0] !== tag) {
                localStorage.setItem('Historical', JSON.stringify([tag, ...localHistoricalJSON]))
            }
            navigate(`/${locationUrl == 'search-articles' ? 'search-articles' : null || locationUrl == 'search-users' ? 'search-users' : null || 'search-articles'}/${tag}`, { replace: true })
        }
    }

    const NewSearchTags = async () => {
        if (editSearch.trim().split(/ +/).join(" ").length > 3) {
            await axios.post(`${API_URL}api/eventv/search/new-tags`, {
                tag: editSearch.trim().split(/ +/).join(" ")
            },
                { withCredentials: true })
                .then(() => { })
        }
    }


    const [promiseSearchTags, setPromiseSearchTags] = useState([])

    const SearchTags = async (e) => {
        if (e) {
            await axios.get(`${API_URL}api/eventv/search/tags/${e}`,
                { withCredentials: true })
                .then((res) => {
                    setPromiseSearchTags(res.data.promise)
                })
        }
    }


    return {
        handleButtonClick,
        handleLogout,
        handleDelete,
        handleDeleteAllNotif,
        hiddenAnswer, setHiddenAnswer,
        errorAnswer, setErrorAnswer,
        editorState, setEditorState,
        handleDeleteAllMessage,
        editor,
        submitMessage,
        handleDeleteNotifMessage,
        hiddenMenu, setHiddenMenu,
        hiddenMenuAdd, setHiddenMenuAdd,
        notifcation, setNotification,
        hiddenMessage, setHiddenMessage,

        // SEARCH

        editSearch, setEditSearch,
        historical, setHistorical,
        handleChangeSearch, handleClick,
        SearchUserNameAPI, SearchUserName,
        promiseSearchTags, setPromiseSearchTags,
        SearchTags, localHistoricalJSON



    }
}

export default UseNavbar