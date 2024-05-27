import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from '../../../config';
import axios from "axios";
import { useAppContext } from '../../../contexts/UseAppContext';



const UseCatalogues = () => {
    const { promiseIdentifiedUser } = useAppContext();

    const location = useLocation()

    const navigate = useNavigate()

    const [total, setTotal] = useState('')

    const url = window.location.href.split("/");

    const searchParams = new URLSearchParams(location.search);
    const typeUrlCatalog = searchParams.get("type");

    const url1 = window.location.href;
    const IdUser = url1.split("/")[4];

    const searchUrl = searchParams.get("search");

    const [catalog, setCatalog] = useState()

    const [library, setLibrary] = useState([])

    const [libraryOpen, setLibraryOpen] = useState()
    
    const [numPage, setNumPage] = useState(0)

    const PER_PAGE = 6
    const pageCount = Math.ceil(total / PER_PAGE)
    const handlePage = async ({ selected: selectedPage }) => {
        setNumPage(selectedPage);
        if (searchUrl) {
            GetCatalogTags(selectedPage)
        } else {
            GetCatalog(selectedPage)
        }
    }

    const GetCatalog = async (selectedPage) => {
        await axios.get(`${API_URL}api/eventv/catalogfiles/get-files/${selectedPage * PER_PAGE || 0}/${typeUrlCatalog}/${IdUser}`,
            { withCredentials: true })
            .then((res) => {
                setCatalog(res.data.rows);
                setTotal(res.data.count);
            })
    }

    const GetCatalogTags = async (selectedPage) => {
        await axios.get(`${API_URL}api/eventv/catalogfilestags/get-files/${selectedPage * PER_PAGE || 0}/${typeUrlCatalog}/${IdUser}/${searchUrl}`,
            { withCredentials: true })
            .then((res) => {
                setCatalog(res.data.promise.rows);
                setTotal(res.data.promise.count);
            })
    }

    useEffect(() => {
        if (searchUrl) {
            GetCatalogTags()
        } else {
            GetCatalog()
        }
    }, [promiseIdentifiedUser, searchUrl, typeUrlCatalog])

    const handleClickCatalog = (url) => {
        if (searchUrl) {
            navigate({ search: `type=${url}&search=${searchUrl}` })
        } else {
            navigate({ search: `type=${url}` })
        }
    }

    const GetLibraryTags = async () => {
        await axios.get(`${API_URL}api/eventv/cataloglibrarys/get-library/${IdUser}`,
            { withCredentials: true })
            .then((res) => {
                setLibrary(res.data);
            })
    }


    useEffect(() => {
        GetLibraryTags()
    }, [promiseIdentifiedUser])

    return {
        catalog,
        library,
        libraryOpen,
        setLibraryOpen,
        pageCount,
        handlePage,
        total,
        typeUrlCatalog,
        searchUrl,
        handleClickCatalog,
        url,
        numPage

    }
}

export default UseCatalogues