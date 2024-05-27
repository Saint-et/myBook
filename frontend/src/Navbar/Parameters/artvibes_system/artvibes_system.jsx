import { useAppContext } from '../../../contexts/UseAppContext';
import React, { useState } from "react";
import { API_URL } from '../../../config';
import axios from "axios";
import { spinner } from '../../../utils';
import { DelIndexedDB } from "../../../assets/data/IndexedDB";
import { useTranslation } from 'react-i18next';
import { SystemName } from '../../../assets/data/data';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Artvibes_system = () => {
  const { localTheme,
    promiseIdentifiedUser,
    GetMyProfilFromAPI } = useAppContext()

  const { t } = useTranslation();

  // l'affichage des error
  const [error, setError] = useState("");
  // l'affichage des error
  const [errorSecurity, setErrorSecurity] = useState("");


  const [checked, setCheckbox] = useState(false)

  const updatePremium = async (e) => {
    setCheckbox(true)
    try {
      await axios.put(`${API_URL}api/eventv/updateUserPremium`,
        {
          premium: e.target.checked
        },
        { withCredentials: true })
        .then(() => {
          GetMyProfilFromAPI()
          setCheckbox(false)
        })
    } catch (error) {
      setErrorSecurity(error.response.data.message)
      setCheckbox(false)
    }
  }

  const updateAccessPass = async (e) => {
    setCheckbox(true)
    try {
      await axios.put(`${API_URL}api/eventv/updateUserAccessPass`,
        {
          accessPass: e.target.checked
        },
        { withCredentials: true })
        .then(() => {
          GetMyProfilFromAPI()
          setCheckbox(false)
        })
    } catch (error) {
      setErrorSecurity(error.response.data.message)
      setCheckbox(false)
    }
  }

  const handleClick = () => {
    if (window.confirm(`Vous souhaitez supprimer la base de donner local.`)) {
      DelIndexedDB()
    } else {
      return;
    }
  }

  if (promiseIdentifiedUser === false) return null

  if (!promiseIdentifiedUser) return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}>
      {spinner()}
    </div>
  )

  return (
    <div className='open-element-page-melted'>

      <div className='cter_sect' style={{ marginTop: 30, marginBottom: 20 }}>

        <div className='ctent_arti' style={{ maxWidth: 1500, overflow: 'visible' }} data-theme={localTheme}>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h4><FontAwesomeIcon style={{ marginRight: 5 }} icon={faScrewdriverWrench} />{SystemName}</h4>
            <ul>
              <li style={{ marginBottom: 10 }}>Change your Profile settings.</li>
            </ul>
          </div>
        </div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
          <h3 className="text" data-theme={localTheme}>Premium account</h3>
        </div>


        <div className='ctent_arti' style={{ maxWidth: 600 }} data-theme={localTheme}>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
            <h4>Premium account</h4>
            <div className="toggle-rect" style={{ marginTop: 10 }}>
              <input type="checkbox" id="premiumAccount" name="premiumAccount" defaultChecked={parseInt(promiseIdentifiedUser?.user.premium) === 1} onChange={updatePremium} disabled={checked} />
              <label htmlFor="premiumAccount"></label>
            </div>
            <div style={{ textAlign: 'center' }}>Activate or deactivate to fully enjoy the site (this option is temporary).</div>
          </div>
        </div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
          <h3 className="text" data-theme={localTheme}>{t('accessPass')}</h3>
        </div>

        <div className='ctent_arti' style={{ maxWidth: 600 }} data-theme={localTheme}>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
            <h4>{t('accessPass')}</h4>
            <div className="toggle-rect" style={{ marginTop: 10 }}>
              <input type="checkbox" id="accessPass" name="accessPass" defaultChecked={promiseIdentifiedUser?.user.accessPass} onChange={updateAccessPass} disabled={checked} />
              <label htmlFor="accessPass"></label>
            </div>
            <div style={{ textAlign: 'center' }}>Activate or deactivate to fully enjoy the site (this option is temporary).</div>
          </div>
        </div>


        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
          <h3 className="text" data-theme={localTheme}>System</h3>
        </div>

        <div style={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: 150 }}>
          <div className="ctent_arti" style={{ height: 200, margin: 4, maxWidth: 600, justifyContent: 'center' }} data-theme={localTheme}>
            <h4 className="text" data-theme={localTheme}>Données local</h4>
            <div>Supprimer la base de données local.</div>
            <div className='button_option_container' style={{ width: '90%', marginTop: 10 }} data-theme={localTheme}>
              <div onClick={handleClick} className='button_optionRed' data-theme={localTheme} >
                Delete
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Artvibes_system