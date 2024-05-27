import React, { useState } from "react";
import { API_URL } from '../../../config';
import axios from "axios";
import { spinner } from '../../../utils';
import { useAppContext } from '../../../contexts/UseAppContext';
import Warning from "../../../components/Warning";
import { useTranslation } from 'react-i18next';
import { NSFW } from "../../../assets/data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";



const Customization = () => {
  const { localTheme,
    promiseIdentifiedUser,
    GetMyProfilFromAPI,
    localThemeBackground } = useAppContext()
    
  // l'affichage des error
  const [errorSecurity, setErrorSecurity] = useState("");

  const { t } = useTranslation();


  const [checked, setCheckbox] = useState(false)

  const adultAccess = async (e) => {
    setCheckbox(true)
    try {
      await axios.put(`${API_URL}api/eventv/updateUserAdultAccess`,
        {
          adultAccess: e.target.checked
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

  };



  const updatePrivate = async (e) => {
    setCheckbox(true)
    try {
      await axios.put(`${API_URL}api/eventv/updateUserPrivate`,
        {
          private: e.target.checked
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
            <h4><FontAwesomeIcon style={{ marginRight: 5 }} icon={faUser} />{t("all_parameter.button0")}</h4>
            <ul>
              <li style={{ marginBottom: 10 }}>Change your Profile settings.</li>
            </ul>
          </div>
        </div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
          <h3 className="text" data-background={localThemeBackground} data-theme={localTheme}>{t("all_parameter.title1")}</h3>
        </div>

        <div className="ctent_arti" style={{ marginBottom: 20, maxWidth: 1000 }} data-theme={localTheme}>
          <h4 className='adult'>{NSFW}</h4>
          <div className="toggle-rect" style={{ marginTop: 10 }}>
            <input type="checkbox" id="AccessAdult" name="AccessAdult" defaultChecked={promiseIdentifiedUser.user.adultAccess} onChange={adultAccess} disabled={checked} />
            <label htmlFor="AccessAdult"></label>
          </div>
          <div style={{ textAlign: 'center', width: '95%' }}>{t("all_parameter.adult")}</div>
        </div>


        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
          <h3 className="text" data-background={localThemeBackground} data-theme={localTheme}>{t("all_parameter.title2")}</h3>
        </div>

        <div className="ctent_arti" style={{ marginBottom: 20, maxWidth: 1000 }} data-theme={localTheme}>
          <Warning />
          <h4>{t("all_parameter.message_title")}</h4>
          <div className="toggle-rect" style={{ marginTop: 10 }}>
            <input type="checkbox" id="instantMessages" name="instantMessages" />
            <label htmlFor="instantMessages"></label>
          </div>
          <div style={{ textAlign: 'center', width: '95%' }}>{t("all_parameter.message_text")}</div>
        </div>


        <div className="ctent_arti" style={{ marginBottom: 20, maxWidth: 1000 }} data-theme={localTheme}>
          <Warning />
          <h4>{t("all_parameter.private_title")}</h4>
          <div className="toggle-rect" style={{ marginTop: 10 }}>
            <input type="checkbox" id="privateAccount" name="privateAccount" defaultChecked={promiseIdentifiedUser.user.private} onChange={updatePrivate} disabled={checked} />
            <label htmlFor="privateAccount"></label>
          </div>
          <div style={{ textAlign: 'center', width: '95%' }}>{t("all_parameter.private_text")}</div>
        </div>

      </div>
    </div>
  )
}

export default Customization