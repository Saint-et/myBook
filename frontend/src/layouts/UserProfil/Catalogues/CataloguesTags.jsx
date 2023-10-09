import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../../../config';
import axios from "axios";
import Card_articles from '../../../components/Cards/Card_articles';
import ReactPaginate from 'react-paginate';
import { spinner } from '../../../utils';
import { useAppContext } from '../../../contexts/UseAppContext';


const CataloguesTags = (props) => {
    const { localTheme } = useAppContext();


    const url = window.location.href;
    const Tag = url.split("/")[6];
    const IdUser = url.split("/")[4];


    const [catalog, setCatalog] = useState()

    const PER_PAGE = 6
    const pageCount = Math.ceil(props.total / PER_PAGE)
    const handlePage = async ({ selected: selectedPage }) => {
        GetCatalogTags(selectedPage)
    }

    const GetCatalogTags = async (selectedPage) => {
        if (Tag === 'all') {
            await axios.get(`${API_URL}api/eventv/catalogfiles/get-files/${selectedPage * PER_PAGE || 0}/${IdUser}`,
                { withCredentials: true })
                .then((res) => {
                    setCatalog(res.data.rows);
                    props.setTotal(res.data.count);
                })
        } else {
            await axios.get(`${API_URL}api/eventv/catalogfilestags/get-files/${selectedPage * PER_PAGE || 0}/${IdUser}/${Tag}`,
                { withCredentials: true })
                .then((res) => {
                    setCatalog(res.data.promise.rows);
                    props.setTotal(res.data.promise.count);
                })
        }
    }


    useEffect(() => {
        GetCatalogTags()
    }, [])



    if (!catalog) return (
        <>
            <div className='cter_sect' style={{ marginBottom: 30 }}>
                <div className='ctent_arti' style={{ background: 'none' }} data-theme={localTheme}>
                    {spinner()}
                </div>
            </div>
        </>
    )

    return (
        <>
            <Card_articles promise={catalog} style={{ width: '30%' }} />
            {pageCount > 1 && <ReactPaginate
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
        </>
    )
}

export default CataloguesTags