import { API_URL, SOCKET_URL } from '../../config';
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import { useAppContext } from '../../contexts/UseAppContext';


export const UseUserProfil = () => {

    const socket = io.connect(SOCKET_URL);

    const url = window.location.href;
    const urlCatalogue = url.split("/")[5];

    const { promiseIdentifiedUser, GetMyProfilFromAPI, IdContext } = useAppContext()

    const ref = useRef(null);
    const refRange = useRef(null);
    const hiddenFileInput = useRef(null);


    const [promiseUser, setPromiseUser] = useState('');


    const [imgCover, setImgCover] = useState('');
    const [imgUploadCover, setImgUploadCover] = useState('');
    const [resize, setResize] = useState('0')
    const [img, setImg] = useState('');
    const [imgUpload, setImgUpload] = useState('');
    const [spin, setSpin] = useState(false)
    const [hideCropCover, setHideCropCover] = useState(false)
    const [hideCropMenu, setHideCropMenu] = useState(false)
    const [hideCrop, setHideCrop] = useState(false)
    const [hiddenInfoUser, setHiddenInfoUser] = useState(false)
    const [bookmark, setBookmark] = useState(true)
    const [checkboxAdmin, setChekboxAdmin] = useState(false)
    // err
    const [error, setError] = useState("");



    // API call to retrieve the profile matching the user search
    const GetProfilFromAPI = async (id) => {
        try {
            await axios.get(`${API_URL}api/eventv/user/${id}`,
                { withCredentials: true })
                .then((res) => {
                    setPromiseUser(res.data);
                    setImgCover(res.data.user.imageUrlCover);
                    setImgUploadCover(res.data.user.imageUrlCover);
                    setResize(res.data.user.resizeImageUrlCover);
                    setImg(res.data.user.imageUrl);
                    setImgUpload(res.data.user.imageUrl);
                })
        } catch (error) {
            console.log(error.response.data)
        }
    }


    // Using a custom button to choose an cover image
    const handleClickCover = async () => {
        if (hideCropCover === true) {
            hiddenFileInput.current.click();
        }
    };

    // Loading the image and displaying the cover image
    const handleLoadCover = (event) => {
        const fileUploaded = event.target.files[0]
        setImgUploadCover(fileUploaded);
        setImgCover(URL.createObjectURL(fileUploaded));
    };

    // Delete the displayed and saved cover image
    const removeImageCover = () => {
        setImgCover('')
        setImgUploadCover('')
        setResize(0)
    };

    // corver image rezize
    const handleRange = (e) => {
        setResize(e.target.value);
    }

    // corver image rezize with mouse wheele
    const myFunction = async (event) => {
        const min = 0;
        const max = 100;
        if (hideCropCover === true) {
            let y = event.deltaY
            if (y > 0) {
                let newSize = parseInt(resize) + 10;
                const value = Math.max(min, Math.min(max, Number(newSize)))
                setResize(value)
                document.addEventListener('touchstart', (e) => {
                    let newSize = parseInt(resize) + 10;
                    const value = Math.max(min, Math.min(max, Number(newSize)))
                    setResize(value)
                });
            } else {
                let newSize = parseInt(resize) - 10;
                const value = Math.max(min, Math.min(max, Number(newSize)))
                setResize(value)
                document.addEventListener('touchmove', (e) => {
                    let newSize = parseInt(resize) - 10;
                    const value = Math.max(min, Math.min(max, Number(newSize)))
                    setResize(value)
                });
            }
        }
    }

    // PUT method for updating the cover image
    const updateAccountCover = async () => {
        if (promiseUser?.user.resizeImageUrlCover == resize && promiseUser?.user.imageUrlCover == imgCover) {
            setSpin(false)
            return setHideCropCover(false)
        }
        setSpin(true)
        try {
            const formData = new FormData();
            formData.append("image", imgUploadCover || null);
            formData.append("resizeImageUrlCover", resize || 0);
            formData.append("PrevImage", promiseIdentifiedUser?.user.imageUrlCover);

            await axios.put(`${API_URL}api/eventv/cover/picture`,
                formData,
                { withCredentials: true })
                .then(() => {
                    GetMyProfilFromAPI()
                    GetProfilFromAPI(IdContext)
                    setSpin(false)
                    setHideCropCover(false)
                })
        } catch (error) {
            setSpin(false)
            setError(error.response.data.message)
        }

    };


    // Loading Image & Image Display
    const handleLoad = (event) => {
        setHideCrop(false)
        const fileUploaded = event
        setImgUpload(fileUploaded);
        setImg(URL.createObjectURL(fileUploaded));
    };

    // Deleting the displayed and saved image
    const removeImage = () => {
        setImg('')
        setImgUpload('')
    };

    // PUT method for updating the image
    const updateAccount = async () => {
        setSpin(true)
        try {
            const formData = new FormData();
            formData.append("image", imgUpload || null);
            formData.append("PrevImage", promiseIdentifiedUser?.user.imageUrl);

            await axios.put(`${API_URL}api/eventv/users/update`,
                formData,
                { withCredentials: true })
                .then(() => {
                    GetProfilFromAPI(IdContext)
                    GetMyProfilFromAPI()
                    setHideCropMenu(false)
                    setHideCrop(false)
                    setSpin(false)
                })
        } catch (error) {
            setSpin(false)
            setError(error.response.data.message)
        }
    };


    const handleClick = (lastURLHome) => {
        if (IdContext == promiseIdentifiedUser.user.id) {
            localStorage.setItem("last-URL-home", lastURLHome);
        }
    }

    // POST to follow a user
    const handleAdd = (Id, session) => {
        axios.post(`${API_URL}api/eventv/addfriend`, { userId: [Id] },
            { withCredentials: true })
            .then(() => {
                socket.emit('event-created', { id: Id, session: session });
                GetProfilFromAPI(IdContext)
            })
    }

    // POST to cancel follow a user
    const handleRefuse = (Id) => {
        try {
            axios.post(`${API_URL}api/eventv/cancelfriend`, { userId: [Id] },
                { withCredentials: true })
                .then(() => {
                    GetProfilFromAPI(IdContext)
                })
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    // PUT to pinned a user
    const updateUserPinned = async (Id) => {
        setBookmark(false)
        if (bookmark === true) {
            try {
                await axios.put(`${API_URL}api/eventv/users/update/pinned`,
                    {
                        pinnedUsers: Id
                    },
                    { withCredentials: true })
                    .then(() => {
                        GetProfilFromAPI(IdContext)
                        setBookmark(true)
                    })
            } catch (error) {
            }
        }

    };


    // POST for master to update user to admin
    const UpdateAdmin = async (id, value, session) => {
        setChekboxAdmin(true)
        try {
            await axios.post(`${API_URL}api/admin/new-admin/${id}`,
                {
                    isAdmin: value
                }
                ,
                { withCredentials: true })
                .then(() => {
                    GetProfilFromAPI(IdContext)
                    setChekboxAdmin(false)
                    if (value === true) {
                        socket.emit('NewAdmin', { id: id, session: session });
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        if (IdContext) {
            GetProfilFromAPI(IdContext)
        }
    }, []);

    return {
        promiseIdentifiedUser,
        IdContext,
        urlCatalogue,
        promiseUser,
        imgCover, setImgCover,
        imgUploadCover, setImgUploadCover,
        resize, setResize,
        img, setImg,
        setImgUpload,
        updateUserPinned,
        spin,
        hideCropCover, setHideCropCover,
        handleClickCover,
        handleLoadCover,
        removeImageCover,
        handleRange,
        updateAccountCover,
        hideCropMenu, setHideCropMenu,
        hideCrop, setHideCrop,
        handleLoad,
        removeImage,
        updateAccount,
        myFunction,
        hiddenInfoUser, setHiddenInfoUser,
        handleAdd,
        handleRefuse,
        handleClick,
        hiddenFileInput,
        bookmark, setBookmark,
        ref, refRange,
        UpdateAdmin,
        checkboxAdmin
    }
}