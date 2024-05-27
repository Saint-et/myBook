import React, { useState } from "react";
import { API_URL } from '../../../config';
import axios from "axios";
import { spinner } from '../../../utils';
import { useAppContext } from '../../../contexts/UseAppContext';
import { useTranslation } from "react-i18next";
import { faIdBadge } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Account_parameter = () => {
  const { localTheme,
    promiseIdentifiedUser,
    GetMyProfilFromAPI,
    editeEmail,
    setEditeEmail,
    editePseudo,
    setEditePseudo } = useAppContext()

  const [spin, setSpin] = useState(false)

  const { t } = useTranslation();

  // l'affichage des error
  const [error, setError] = useState("");
  // l'affichage des error
  const [errorSecurity, setErrorSecurity] = useState("");
  // l'affichage des error
  const [errorEmail, setErrorEmail] = useState("");

  const [edite, setEdite] = useState({
    pseudo: "",
    oldPassword: "",
    newPassword: "",
    newPasswordVerification: ""
  });

  // récupération des champs de text
  const handleChange = (name) => event => {
    setEdite({ ...edite, [name]: event.target.value })

  };
  // récupération des champs de text
  const handleChangeEmail = (name) => event => {
    setEditeEmail({ ...editeEmail, [name]: event.target.value })
  };
  // récupération des champs de text
  const handleChangePseudo = (name) => event => {
    setEditePseudo({ ...editePseudo, [name]: event.target.value })
  };


  const updateUsername = async () => {
    setSpin(true)
    try {
      await axios.put(`${API_URL}api/eventv/update/username`,
        {
          pseudo: editePseudo.pseudo
        },
        { withCredentials: true })
        .then(() => {
          GetMyProfilFromAPI()
          setSpin(false)
        })
    } catch (error) {
      setErrorEmail(error.response.data.message)
      setSpin(false)
    }
  };

  const updateAccountEmail = async () => {
    setSpin(true)
    try {
      await axios.put(`${API_URL}api/eventv/users/update/email`,
        {
          email: editeEmail.email,
          password: editeEmail.password
        },
        { withCredentials: true })
        .then(() => {
          setSpin(false)
          GetMyProfilFromAPI()
          setEditeEmail({
            email: promiseIdentifiedUser.user.email,
            password: ""
          })
        })
    } catch (error) {
      setErrorEmail(error.response.data.message)
      setSpin(false)
    }
  };

  const [securityUpdate, setSecurityUpdate] = useState('')

  const updateAccountSecurity = async () => {
    setSpin(true)
    try {
      await axios.put(`${API_URL}api/eventv/users/update/security`,
        {
          oldPassword: edite.oldPassword,
          newPassword: edite.newPassword,
          newPasswordVerification: edite.newPasswordVerification
        },
        { withCredentials: true })
        .then((res) => {
          setErrorSecurity('')
          setSpin(false)
          setSecurityUpdate(res.data.message)
        })
    } catch (error) {
      setSpin(false)
      setErrorSecurity(error.response.data.message)
    }
  };

  if (!promiseIdentifiedUser) return null

  return (
    <div className='open-element-page-melted'>
      <div className='cter_sect' style={{ marginTop: 30, marginBottom: 20 }}>
        <div className='ctent_arti' style={{ maxWidth: 1500, overflow: 'visible' }} data-theme={localTheme}>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h4><FontAwesomeIcon style={{ marginRight: 5 }} icon={faIdBadge} />{t("all_parameter.button1")}</h4>

            <ul>
              <li style={{ marginBottom: 10 }}>Change your account settings.</li>
            </ul>

          </div>
        </div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
          <h3 className="text" data-theme={localTheme}>{t("all_parameter.title3")}</h3>
        </div>

        <div className="ctent_arti" style={{ marginBottom: 20, maxWidth: 1000 }} data-theme={localTheme}>
          <h4>{t("all_parameter.user_title")}</h4>
          <input className='input_text' onChange={handleChangePseudo('pseudo')} style={{ width: '100%', maxWidth: 300 }} defaultValue={promiseIdentifiedUser?.user.pseudo} data-theme={localTheme} />

          <div>{error}</div>
          <div className='button_option_container' style={{ width: '100%', maxWidth: 300, marginTop: 10 }} data-theme={localTheme}>
            {!spin ? <div className='button_optionPic_v' onClick={updateUsername} data-theme={localTheme}>{t("save")}</div> :
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {spinner()}
              </div>}
          </div>
          <p style={{ textAlign: 'center' }}>{t("all_parameter.user_text")}</p>
        </div>

        <div className="ctent_arti" style={{ marginBottom: 20, maxWidth: 1000 }} data-theme={localTheme}>
          <h4>{t("all_parameter.email_title")}</h4>

          <h4>{t("all_parameter.email_sub_title1")}</h4>
          <input className='input_text' type={'email'} onChange={handleChangeEmail('email')} style={{ width: '100%', maxWidth: 300 }} defaultValue={promiseIdentifiedUser?.user.email} data-theme={localTheme} />

          <h4>{t("all_parameter.email_sub_title2")}</h4>
          <input className='input_text' type={'password'} autoComplete={"new-password"} placeholder="●●●●●●●" onChange={handleChangeEmail('password')} style={{ width: '100%', maxWidth: 300 }} value={editeEmail?.password} data-theme={localTheme} />

          <div style={{ textAlign: 'center' }}>{t("all_parameter.email_text")}</div>

          <div style={{ color: 'red' }}>{errorEmail}</div>

          <div className='button_option_container' style={{ width: '100%', maxWidth: 300, marginTop: 10 }} data-theme={localTheme}>
            {!spin ? <div className='button_optionPic_v' onClick={updateAccountEmail} data-theme={localTheme}>{t("save")}</div> :
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {spinner()}
              </div>}
          </div>
        </div>

        <div className="ctent_arti" style={{ marginBottom: 20, maxWidth: 1000 }} data-theme={localTheme}>
          <h4>{t("all_parameter.security_sub_title")}</h4>

          <h4>{t("all_parameter.security_sub_title1")}</h4>
          <input className='input_text' autoComplete={"new-password"} placeholder="●●●●●●●" onChange={handleChange('oldPassword')} type={'password'} style={{ width: '100%', maxWidth: 300 }} data-theme={localTheme} />

          <h4>{t("all_parameter.security_sub_title2")}</h4>
          <input className='input_text' autoComplete={"new-password"} placeholder="●●●●●●●" onChange={handleChange('newPassword')} type={'password'} style={{ width: '100%', maxWidth: 300 }} data-theme={localTheme} />

          <h4>{t("all_parameter.security_sub_title3")}</h4>
          <input className='input_text' autoComplete={"new-password"} placeholder="●●●●●●●" onChange={handleChange('newPasswordVerification')} type={'password'} style={{ width: '100%', maxWidth: 300 }} data-theme={localTheme} />

          <div style={{ color: 'red' }}>{errorSecurity}</div>
          <div>{securityUpdate}</div>

          <div className='button_option_container' style={{ width: '100%', maxWidth: 300, marginTop: 10 }} data-theme={localTheme}>
            {!spin ? <div className='button_optionPic_v' onClick={updateAccountSecurity} data-theme={localTheme}>{t("save")}</div> :
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {spinner()}
              </div>}
          </div>

        </div>

      </div>
    </div>
  )
}

export default Account_parameter