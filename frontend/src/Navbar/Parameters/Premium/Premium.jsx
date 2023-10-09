import { useAppContext } from '../../../contexts/UseAppContext';
import React, { useState } from "react";
import { API_URL } from '../../../config';
import axios from "axios";
import { spinner } from '../../../utils';

const Premium = (props) => {
  const { localTheme,
    promiseIdentifiedUser,
    GetMyProfilFromAPI,
    editeEmail,
    setEditeEmail,
    language,
    setLanguage,
    editePseudo,
    setEditePseudo } = useAppContext()


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



  if (promiseIdentifiedUser === false) return null

  if (!promiseIdentifiedUser) return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}>
      {spinner()}
    </div>
  )

  return (
    <>

      <div className='cter_sect' style={{ marginTop: 30, marginBottom: 20 }}>
        <div className='ctent_arti' style={{ maxWidth: 600 }} data-theme={localTheme}>

          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
            <div className="ctent_arti" style={{ height: 200, maxWidth: 600 }} data-theme={localTheme}>

              <h2>Premium account</h2>

              <div className="toggle-rect" style={{ marginTop: 10 }}>
                <input type="checkbox" id="premiumAccount" name="premiumAccount" defaultChecked={parseInt(promiseIdentifiedUser.user.premium) === 1} onChange={updatePremium} disabled={checked} />
                <label htmlFor="premiumAccount"></label>
              </div>

              <div style={{ textAlign: 'center' }}>Activate or deactivate to fully enjoy the site (this option is temporary).</div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Premium