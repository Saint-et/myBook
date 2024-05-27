import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowLeft, faArrowRight, faListCheck, faXmark, faListUl, faGear, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from "react";
import { API_URL } from '../../../config';
import axios from "axios";
import ReactPaginate from 'react-paginate';
import { useAppContext } from '../../../contexts/UseAppContext';
import Card_select from '../../../components/Cards/Card_select';
import Select from '../../../components/Select/Select';
import { optionsType } from '../../../assets/data/data';
import { useTranslation } from 'react-i18next';
import { RemoveScroll } from 'react-remove-scroll';
import Pagination from '../../../components/pagination/pagination';
import { useWorkspaceContext } from '../../../contexts/UseWorkspaceContexte';



const Files = (props) => {

  let myRegex = new RegExp(/^[0-9a-zA-Z-éçàùè]+$/i);

  const { t } = useTranslation();

  const { localTheme, promiseIdentifiedUser } = useAppContext();


  const {
    promise,
    totalFiles,
    GetMyFilesFromAPI,
    PER_PAGE,
    setNumPage,
    numPage,
    menuFile,
    setMenuFile } = useWorkspaceContext();


  const [hiddenPaginationSearch, setHiddenPaginationSearch] = useState(false)
  const [edite, setEdite] = useState({ name: '' });
  const [editeType, setEditeType] = useState(null);
  const [created, setCreated] = useState('')
  const [filesSelected, setFilesSelected] = useState([])
  const [editeTypeAllSelected, setEditeTypeAllSelected] = useState(null);
  const [searchPromise, setSearchPromise] = useState(null)
  const [commonOption, setCommonOption] = useState(false)

  const [editSearch, setEditSearch] = useState('');
  const [errorFiles, setErrorFiles] = useState("");
  const [errFront, setErrFront] = useState({
    err: ''
  })


  // gestion pagination
  const pageCount = Math.ceil(totalFiles / PER_PAGE)
  const handlePage = async ({ selected: selectedPage }) => {
    setNumPage(selectedPage)
    GetMyFilesFromAPI()
  }

  // recherche API
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
          setSearchPromise(res.data);
          setErrFront({ err: '' });
          setHiddenPaginationSearch(true);
        })
    }
  }

  // saisie de text pour la recherche
  const handleSearch = event => {
    setEditSearch(event.target.value);
    if (event.target.value.length === 0) {
      setSearchPromise(null)
      setHiddenPaginationSearch(false)
    }
    if (event.key === 'Enter') {
      event.preventDefault()
      SearchFiles()
    }
  };

  // nettoyage à la fermeture de recherche
  const handleCloseSearch = () => {
    setEditSearch('')
    setSearchPromise(null)
    setHiddenPaginationSearch(false)
  }

  // texte pour le nom lors de la création
  const handleChange = (name) => event => {
    setEdite({ ...edite, [name]: event.target.value })
  };

  // création de nouveau document
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

  ///useKeypress('Enter', () => {
  ///  if (editSearch !== "") {
  ///    SearchFiles()
  ///  }
  ///})





  const handleFilesSelected = (fileId) => {
    const unique = Array.from(new Set([...filesSelected, fileId]));
    setFilesSelected(unique)
  }
  const handleFilesSelectedRemove = (fileId) => {
    const filteredUsers = filesSelected?.filter((id) => id != fileId);
    setFilesSelected(filteredUsers)
  }


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

  if (!promiseIdentifiedUser) return null

  return (
    <div className='open-element-page-melted'>

      {menuFile && <div className='blanket open-element-page-melted' style={{ zIndex: 15000, display: 'flex', alignItems: 'center', justifyContent: 'center', top: 0 }} >
        <div className='ctent_arti' style={{ overflow: 'visible', height: 'max-content', justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', maxWidth: 600 }} data-theme={localTheme}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }} >
            <div style={{ marginBottom: 10, marginTop: 10 }}>{t('create_a_new_project')}</div>
            <input autoFocus={true} className='input_text' onChange={handleChange('name')} style={{ width: '90%' }} placeholder={t('named')} type="text" name="Named" id="Named" value={edite.name} data-theme={localTheme} />
            <div>{t('type_of_file')}</div>
              <Select setSelectedValue={setEditeType} selectedValue={editeType} arrays={optionsType} localTheme={localTheme} styles={{width: '100%', maxWidth: 300, marginTop: 10}} />
            {created !== '' && <div>{created}</div>}
            {errorFiles !== '' && <div style={{ color: 'red' }}>{errorFiles}</div>}
            <div className='button_option_container' style={{ width: '100%', maxWidth: 300, marginTop: 20 }} data-theme={localTheme}>
              <div className='button_optionPic_v' onClick={createFile} style={{ width: '100%', maxWidth: 300 }} data-theme={localTheme}>{t('save')}</div>
              <div className='button_option' onClick={() => { setMenuFile(!menuFile) }} style={{ width: '100%', maxWidth: 300 }} data-theme={localTheme}>{t('cancel')}</div>
            </div>
          </div>
        </div>
      </div>}

      {commonOption && <RemoveScroll className='blanket scrollbar open-element-page-melted' style={{ zIndex: 25000, display: 'flex', alignItems: 'start', justifyContent: 'center', top: 0, overflowY: 'auto' }} >
        <div className='menu_navbar' style={{ width: '100%', flexDirection: 'column', maxWidth: 600, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }} data-theme={localTheme}>

          <h3>{t("options")}</h3>

          <div style={{ width: '94%' }} className="copy-box two">
            <div className="inner">
              <div className="line right"></div>
              <div>{t("libraryWorkSpaceDisplay.optionText2")}</div>
            </div>
          </div>

          <div className='button_option_container' style={{ width: '100%', maxWidth: 300, marginTop: 10 }} data-theme={localTheme}>
            <div className='button_optionPic_v' data-theme={localTheme}>{t("delete")}</div>
          </div>

          <div className='button_option_container' style={{ width: '100%', maxWidth: 300, marginTop: 40 }} data-theme={localTheme}>
            <div onClick={() => { setCommonOption(false) }} className='button_option' data-theme={localTheme}>{t("cancel")}</div>
          </div>
        </div>
      </RemoveScroll>}

      <div className='cter_sect'>
        <div style={{ width: '97%' }}>
          <div className="copy-box two text" data-theme={localTheme}>
            <div className="inner">
              <div className="line right"></div>

              <h4>{t("file.title")}</h4>
              <div>{t("file.text1")}</div>
              <div>{t("file.text2")}</div>
              <div>{t("file.text3")}</div>

              <div className='button_option_container shadowbox' style={{ width: '90%', maxWidth: 300, display: 'flex', marginTop: 20 }} data-theme={localTheme}>
                <div onClick={() => { setMenuFile(!menuFile) }} className='button_optionPic_v' data-theme={localTheme}>{t('create_a_new_project')} ?</div>
              </div>

              <div style={{ marginTop: 20, display: 'flex', width: '98%', alignItems: 'center', justifyContent: 'center' }}>
                <input onKeyDown={handleSearch} onChange={handleSearch} className='input_text' placeholder={t('search')} type="text" name="Search" id="Search" value={editSearch} data-theme={localTheme} />
                {editSearch !== "" && <div className='button_option_container shadowbox' style={{ width: '100%', maxWidth: 80, marginLeft: 10, display: 'flex' }} data-theme={localTheme}>
                  <div className='button_option' onClick={handleCloseSearch} style={{ width: '100%' }} data-theme={localTheme}><FontAwesomeIcon icon={faXmark} /></div>
                  <div className='button_option' onClick={SearchFiles} style={{ width: '100%' }} data-theme={localTheme}><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
                </div>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='cter_sect'>
        <div className='ctent_arti' style={{ paddingTop: 10 }} data-theme={localTheme}>
          <div style={{ display: 'flex', width: '98%', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ width: '100%', maxWidth: 150 }}>
              <div style={{ display: 'flex' }}>{t('select')}:<div style={{ marginLeft: 10 }}>{filesSelected.length}</div></div>
              <div className='button_option_container' style={{ marginTop: 10, display: 'flex' }} data-theme={localTheme}>
                <div onClick={() => {
                  setFilesSelected([])
                }} className='button_option' style={{ color: '#ec1c24' }} data-theme={localTheme}><FontAwesomeIcon icon={faListUl} /></div>
                <div style={{ color: '#0084ff' }} onClick={handleAllSelected} className='button_option' data-theme={localTheme}><span><FontAwesomeIcon icon={faListCheck} /></span></div>
                <div className={filesSelected.length === 0 ? 'button_optionDisable' : 'button_optionBlue'} onClick={filesSelected.length === 0 ? null : () => { setCommonOption(true) }} data-theme={localTheme}><FontAwesomeIcon icon={faEllipsisVertical} /></div>
              </div>
            </div>
            <div style={{ fontSize: 16, fontWeight: 'bold' }}>{numPage + 1}/{pageCount}</div>
            <div style={{ width: '100%', maxWidth: 150 }}>
              <div style={{ marginBottom: 10 }}>{t('type_of_file')}:</div>
              <Select setSelectedValue={setEditeTypeAllSelected} selectedValue={editeTypeAllSelected} arrays={optionsType} localTheme={localTheme} />
            </div>
          </div>
          <div style={{ marginTop: 10, width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <Card_select checkbox={true} filesSelected={filesSelected} handleFilesSelected={handleFilesSelected} handleFilesSelectedRemove={handleFilesSelectedRemove} promise={searchPromise === null ? promise : searchPromise} localTheme={localTheme} />
          </div>

          {pageCount > 1 && <>{!hiddenPaginationSearch &&
            <Pagination
              pageCount={pageCount}
              onPageChange={handlePage}
              initialPage={numPage}
              localTheme={localTheme}
            />}</>}

        </div>
      </div>
    </div>
  )
}

export default Files