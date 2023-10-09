import React, { useState } from "react";
import { API_URL } from '../../../config';
import axios from "axios";
import { spinner } from '../../../utils';
import { useAppContext } from '../../../contexts/UseAppContext';
import Warning from "../../../components/Warning";



const Customization = (props) => {
  const { localTheme, customStyles,
    promiseIdentifiedUser,
    GetMyProfilFromAPI,
    editeEmail,
    setEditeEmail,
    language,
    setLanguage,
    editePseudo,
    setEditePseudo } = useAppContext()

  const [spin, setSpin] = useState(false)

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



  const updateUser = async () => {
    setSpin(true)
    try {
      await axios.put(`${API_URL}api/eventv/update/user`,
        {
          interest: null
        },
        { withCredentials: true })
        .then(() => {
          setSpin(false)
          GetMyProfilFromAPI()
        })
    } catch (error) {

    }

  };


  if (promiseIdentifiedUser === false) return null

  if (!promiseIdentifiedUser) return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}>
      {spinner()}
    </div>
  )

  return (
    <>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
        <h1 className="title_color">Profile</h1>
      </div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
        <div className="ctent_arti" style={{ height: 200, maxWidth: 600 }} data-theme={localTheme}>

          <h2 id="Access18+">Access 18+</h2>

          <div className='badge_adult' translate='no'>Access 18+</div>

          <div className="toggle-rect" style={{ marginTop: 10 }}>
            <input type="checkbox" id="AccessAdult" name="AccessAdult" defaultChecked={promiseIdentifiedUser.user.adultAccess} onChange={adultAccess} disabled={checked} />
            <label htmlFor="AccessAdult"></label>
          </div>

          <div><span translate='no' style={{ color: '#ff00dd', fontWeight: 800 }}>Access 18+</span>&nbsp;allows you to view all adult content without going through the verification step. This option will only be visible to you.</div>
        </div>
      </div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
        <Warning />
        <div className="ctent_arti" style={{ height: 200, maxWidth: 600 }} data-theme={localTheme}>

          <h2>Reviews</h2>

          <div className="toggle-rect" style={{ marginTop: 10 }}>
            <input type="checkbox" id="Reviews" name="Reviews" />
            <label htmlFor="Reviews"></label>
          </div>

          <div style={{ textAlign: 'center' }}>Disable or enable comments on your page.</div>
        </div>
      </div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
        <h1 className="title_color">Confidentiality</h1>
      </div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
        <Warning />
        <div className="ctent_arti" style={{ height: 200, maxWidth: 600 }} data-theme={localTheme}>

          <h2>Accepts instant messages</h2>

          <div className="toggle-rect" style={{ marginTop: 10 }}>
            <input type="checkbox" id="instantMessages" name="instantMessages" />
            <label htmlFor="instantMessages"></label>
          </div>

          <div style={{ textAlign: 'center' }}>Swipe your private account so that it does not display the content, but the profile picture, cover, and basic profile elements will still be displayed.</div>
        </div>
      </div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
        <Warning />
        <div className="ctent_arti" style={{ height: 200, maxWidth: 600 }} data-theme={localTheme}>

          <h2>Private account</h2>

          <div className="toggle-rect" style={{ marginTop: 10 }}>
            <input type="checkbox" id="privateAccount" name="privateAccount" defaultChecked={promiseIdentifiedUser.user.private} onChange={updatePrivate} disabled={checked} />
            <label htmlFor="privateAccount"></label>
          </div>

          <div style={{ textAlign: 'center' }}>Swipe your private account so that it does not display the content, but the profile picture, cover, and basic profile elements will still be displayed.</div>
        </div>
      </div>


      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
        <h1 className="title_color">Account</h1>
      </div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
        <div className="ctent_arti" style={{ height: 200, maxWidth: 600 }} data-theme={localTheme}>

          <h2 id="Access18+">Reset interest</h2>

          <div className='menu_historical' style={{ width: '100%', maxWidth: 300, marginTop: 20 }} data-theme={localTheme}>
            {!spin ? <div className='button_option' onClick={updateUser} style={{ width: '100%', maxWidth: 300 }} data-theme={localTheme}>Reset</div> :
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {spinner()}
              </div>}
          </div>
        </div>
      </div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
        <div className="ctent_arti" style={{ height: 300, maxWidth: 600 }} data-theme={localTheme}>

          <h2>Settings account</h2>

          <h3>User name</h3>
          <input className='input_text' onChange={handleChangePseudo('pseudo')} style={{ width: '100%', maxWidth: 300 }} defaultValue={promiseIdentifiedUser.user.pseudo} data-theme={localTheme} />

          <div>{error}</div>

          <div className='menu_historical' style={{ width: '100%', maxWidth: 300, marginTop: 20 }} data-theme={localTheme}>
            {!spin ? <div className='button_option' onClick={updateUsername} style={{ width: '100%', maxWidth: 300 }} data-theme={localTheme}>Save</div> :
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {spinner()}
              </div>}
          </div>

          <p>You can change the username, it must contain a minimum of 5 characters to be accepted.</p>

        </div>
      </div>



      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>

        <div className="ctent_arti" style={{ height: 380, maxWidth: 600 }} data-theme={localTheme}>
          <h2>Change email</h2>

          <h3>Email</h3>
          <input className='input_text' type={'email'} onChange={handleChangeEmail('email')} style={{ width: '100%', maxWidth: 300 }} defaultValue={promiseIdentifiedUser.user.email} data-theme={localTheme} />

          <h3>Password</h3>
          <input className='input_text' type={'password'} autoComplete={"new-password"} onChange={handleChangeEmail('password')} style={{ width: '100%', maxWidth: 300 }} value={editeEmail.password} data-theme={localTheme} />

          <div>This option allows you to change the login email for your account.</div>
          <div>This email is used as a contact email for other users.</div>

          <div style={{ color: 'red' }}>{errorEmail}</div>

          <div className='menu_historical' style={{ width: '100%', maxWidth: 300, marginTop: 20 }} data-theme={localTheme}>
            {!spin ? <div className='button_option' onClick={updateAccountEmail} style={{ width: '100%', maxWidth: 300 }} data-theme={localTheme}>Save</div> :
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {spinner()}
              </div>}
          </div>

        </div>
      </div>




      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20, marginBottom: 100 }}>

        <div className="ctent_arti" style={{ height: 440, maxWidth: 600 }} data-theme={localTheme}>
          <h2>Security</h2>

          <h3>Old password</h3>
          <input className='input_text' autoComplete={"new-password"} onChange={handleChange('oldPassword')} type={'password'} style={{ width: '100%', maxWidth: 300 }} data-theme={localTheme} />

          <h3>New password</h3>
          <input className='input_text' autoComplete={"new-password"} onChange={handleChange('newPassword')} type={'password'} style={{ width: '100%', maxWidth: 300 }} data-theme={localTheme} />

          <h3>New password verification</h3>
          <input className='input_text' autoComplete={"new-password"} onChange={handleChange('newPasswordVerification')} type={'password'} style={{ width: '100%', maxWidth: 300 }} data-theme={localTheme} />

          <div style={{ color: 'red' }}>{errorSecurity}</div>
          <div>{securityUpdate}</div>

          <div className='menu_historical' style={{ width: '100%', maxWidth: 300, marginTop: 20 }} data-theme={localTheme}>
            {!spin ? <div className='button_option' onClick={updateAccountSecurity} style={{ width: '100%', maxWidth: 300 }} data-theme={localTheme}>Save</div> :
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {spinner()}
              </div>}
          </div>

        </div>
      </div>

    </>
  )
}

export default Customization