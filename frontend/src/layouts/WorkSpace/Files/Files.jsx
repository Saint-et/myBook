import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faX, faBars, faSquare, faArrowLeft, faArrowRight, faArrowUpAZ, faArrowUp19, faFilterCircleXmark, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from "react";
import { API_URL } from '../../../config';
import axios from "axios";
import useKeypress from 'react-use-keypress';
import ReactPaginate from 'react-paginate';
import { useAppContext } from '../../../contexts/UseAppContext';
import Card_select from '../../../components/Cards/Card_select';
import Select from '../../../components/Select/Select';
import { optionsType } from '../../../assets/data/data';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';




let myRegex = new RegExp(/^[0-9a-zA-Z-éçàùè]+$/i);

const Files = (props) => {

  const { t } = useTranslation();

  const { localTheme,
    promise, setPromise,
    total, GetMyFilesFromAPI,PER_PAGE,setNumPage, numPage } = useAppContext();


  //const [promise, setPromise] = useState([])

  const [hiddenPaginationSearch, setHiddenPaginationSearch] = useState(false)

  const [editSearch, setEditSearch] = useState('');
  const [errFront, setErrFront] = useState({
    err: ''
  })

  const handleSearch = event => {
    setEditSearch(event.target.value);
  };

  const pageCount = Math.ceil(total / PER_PAGE || 1)

  const handlePage = async ({ selected: selectedPage }) => {
    setNumPage(selectedPage)
    GetMyFilesFromAPI()

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
          setErrFront({ err: '' });
          setHiddenPaginationSearch(true);
        })
    }
  }

  const handleCloseSearch = () => {
    setHiddenPaginationSearch(false)
    GetMyFilesFromAPI()
  }

  const [edite, setEdite] = useState({ name: '' });

  const [editeType, setEditeType] = useState(null);
  const [editeTypeCategorie, setEditeTypeCategorie] = useState(null);

  //const GetMyFilesFromAPI = async (selectedPage) => {
  //  //setTotal('');
  //  await axios.get(`${API_URL}api/eventv/myfiles/files/${selectedPage * PER_PAGE || 0}`,
  //    { withCredentials: true })
  //    .then((res) => {
  //      setPromise(res.data.rows);
  //      setTotal(res.data.count);
  //    })
  //}
  //useEffect(() => {
  //  GetMyFilesFromAPI()
  //}, []);

  const [created, setCreated] = useState('')

  const handleChange = (name) => event => {
    setEdite({ ...edite, [name]: event.target.value })
  };

  const [errorFiles, setErrorFiles] = useState("");
  const createFile = async () => {
    setErrorFiles('')
    try {
      await axios.post(`${API_URL}api/eventv/create/file`, {
        name: edite.name,
        type: editeType

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

  useKeypress('Enter', () => {
    if (editSearch !== "") {
      SearchFiles()
    }
  })



  const [filesSelected, setFilesSelected] = useState([])


  // const filteredUsers = filesSelected.filter((id) => id == fileId);

  const handleFilesSelected = (fileId) => {
    const unique = Array.from(new Set([...filesSelected, fileId]));
    setFilesSelected(unique)
  }
  const handleFilesSelectedRemove = (fileId) => {
    const filteredUsers = filesSelected?.filter((id) => id != fileId);
    setFilesSelected(filteredUsers)
  }

  const [editeTypeAllSelected, setEditeTypeAllSelected] = useState(null);

  const handleAllSelected = async () => {
    if (editeTypeAllSelected !== null) {
      promise?.map(async (el) => {
        if (el.type === editeTypeAllSelected) {
          return setFilesSelected((filesSelected) => Array.from(new Set([...filesSelected, el.id])))
        }
      });
    } else {
      promise?.map(async (el) => {
        setFilesSelected((filesSelected) => Array.from(new Set([...filesSelected, el.id])))
      });
    }
    setEditeTypeAllSelected(null)
  }



  //const handleOpen = () => {
  //  // Récupérez les données existantes depuis localStorage (s'il y en a)
  //  const localData = JSON.parse(localStorage.getItem('tab-Work-Place')) || [];
  //  // création de la nouvelle data
  //  const filteredItems = promise
  //    .filter((el) => filesSelected.includes(el.id))
  //    .map((el) => ({ id: el.id, name: el.name, miniature: el.miniature }));
  //  const uniqueData = filteredItems.filter((newItem) => {
  //    // Vérifiez si l'élément existe déjà dans les données existantes
  //    return !localData.some((existingItem) => existingItem.id === newItem.id);
  //  });
  //  // Étape 3 : Ajoutez uniquement les éléments uniques
  //  const updatedData = [...localData, ...uniqueData];
  //  // Étape 4 : Mettez à jour les données du localStorage
  //  localStorage.setItem('tab-Work-Place', JSON.stringify(updatedData));
  //  navigate(`/works/file/${filteredItems[0]?.id}`)
  //};

  return (
    <div className='open-elementPage'>
      <div className='cter_sect'>
        <div className='ctent_arti animation' style={{ overflow: 'visible', height: '100%', minHeight: 250, justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }} data-theme={localTheme}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 500 }} >
            <div style={{ marginBottom: 10 }}>{t('create_a_new_project')}</div>
            <input className='input_text' onChange={handleChange('name')} style={{ width: '90%' }} placeholder={t('named')} type="text" name="Named" id="Named" value={edite.name} data-theme={localTheme} />
            <div>{t('type_of_file')}</div>
            <div style={{ width: '100%', maxWidth: 300, marginTop: 10 }}>
              <Select setSelectedValue={setEditeType} selectedValue={editeType} arrays={optionsType} localTheme={localTheme} />
            </div>
            {created !== '' && <div>{created}</div>}
            {errorFiles !== '' && <div style={{ color: 'red' }}>{errorFiles}</div>}
            <div className='button_option_container' style={{ width: '100%', maxWidth: 300, marginTop: 20 }} data-theme={localTheme}>
              <div className='button_option' onClick={createFile} style={{ width: '100%', maxWidth: 300 }} data-theme={localTheme}>{t('save')}</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 500 }} >
            {filesSelected.length !== 0 && <>
              <div style={{ marginBottom: 10 }}>{t('options')}</div>
              <div className='button_option_container' style={{ width: '100%', maxWidth: 300 }} data-theme={localTheme}>
                <div style={{ paddingTop: 5, paddingBottom: 5, color: 'red' }} className='button_option' data-theme={localTheme}>{t('permanentlyDelete')}</div>
              </div>
            </>}
            <div className='button_option_container' style={{ width: '100%', maxWidth: 300, marginTop: 10 }} data-theme={localTheme}>


              <div onClick={() => {
                setFilesSelected([])
              }} style={{ paddingTop: 5, paddingBottom: 5 }} className='button_option' data-theme={localTheme}><span>{t('cancelSelection')}</span><FontAwesomeIcon style={{ marginLeft: 10 }} icon={faMinus} /></div>
              <div style={{ paddingTop: 5, paddingBottom: 5, color: '#0084ff' }} onClick={handleAllSelected} className='button_option' data-theme={localTheme}><span>{t('allSelected')}</span><FontAwesomeIcon style={{ marginLeft: 10 }} icon={faPlus} /></div>


            </div>
            <div style={{ width: '100%', maxWidth: 300, marginTop: 20, marginBottom: 10 }}>{t('type_of_file')}</div>
            <div style={{ width: '100%', maxWidth: 300 }}>
              <Select setSelectedValue={setEditeTypeAllSelected} selectedValue={editeTypeAllSelected} arrays={optionsType} localTheme={localTheme} />
            </div>
          </div>
        </div>
      </div>



      <div className='cter_sect'>
        <div className='ctent_arti animation' data-theme={localTheme}>
          <div style={{ margin: 20, display: 'flex', width: '98%', alignItems: 'center' }}>

            <input onChange={handleSearch} className='input_text' placeholder={t('search')} type="search" name="Search" id="Search" value={editSearch} data-theme={localTheme} />

            {editSearch !== "" && <div className='button_option_container' style={{ width: '100%', maxWidth: 80, marginLeft: 10, display: 'flex' }} data-theme={localTheme}>
              <div className='button_option' onClick={SearchFiles} style={{ width: '100%' }} data-theme={localTheme}><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
              {hiddenPaginationSearch && <div className='button_option' onClick={handleCloseSearch} style={{ width: '100%' }} data-theme={localTheme}><FontAwesomeIcon icon={faX} /></div>}
            </div>}

            <div style={{ display: 'flex', width: 'max-content', alignItems: 'center', justifyContent: 'space-between', marginLeft: 10, }}>
              <div style={{ display: 'flex' }}>{t('select')}:<div style={{ fontWeight: 800, color: '#0084ff' }}>{filesSelected.length}</div></div>
            </div>
          </div>
          <div style={{ marginTop: 10, width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <Card_select setTab={props.setTab} checkbox={true} filesSelected={filesSelected} handleFilesSelected={handleFilesSelected} handleFilesSelectedRemove={handleFilesSelectedRemove} promise={promise} localTheme={localTheme} />


            {!hiddenPaginationSearch && <>
              <ReactPaginate
                breakLabel="..."
                previousLabel={<FontAwesomeIcon icon={faArrowLeft} />}
                nextLabel={<FontAwesomeIcon icon={faArrowRight} />}
                pageCount={pageCount}
                onPageChange={handlePage}
                initialPage={numPage}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination_link"}
                nextLinkClassName={"pagination_link"}
                disabledClassName={"pagination_link--disabled"}
                activeClassName={"pagination_link--active"}
              /></>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Files