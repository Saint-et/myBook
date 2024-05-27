import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faLanguage, faCubes, faPanorama } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from "react";
import { RemoveScroll } from 'react-remove-scroll';
import { useAppContext } from '../contexts/UseAppContext';
import { useTranslation } from 'react-i18next';
import { API_URL } from '../config';
import axios from "axios";
import { Link } from 'react-router-dom';
import { SystemName } from '../assets/data/data';


const Reconnection = () => {




    const [edite, setEdite] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    const {
        localTheme,
        handleModeEco,
        animationSelect,
        setLanguageSelect,
        handleTheme,
        promiseIdentifiedUser,
        addErrorMessage,
        GetMyProfilFromAPI,
        hiddenConnection,
        setHiddenConnection } = useAppContext()

    const { t } = useTranslation();

    const handleChange = (name) => event => {
        setEdite({ ...edite, [name]: event.target.value })
    };

    const submit = async () => {
        setError('')
        try {
            await axios.post(`${API_URL}api/auth/login`, {
                email: edite.email,
                password: edite.password
            }, { withCredentials: true })
                .then((res) => {
                    if (res.data.message == 'log') {
                        addErrorMessage(`Bienvenu sur ${SystemName} 🙂.`, 5000, '#396afc')
                        setEdite({
                            email: "",
                            password: ""
                        })
                        return GetMyProfilFromAPI()
                    }
                })
        } catch (error) {
            setError(error.response.data.message)
        }

    }

    //useKeypress('Enter', () => {
    //  if (promiseIdentifiedUser === false) {
    //    return submit()
    //  }
    //})

    if (promiseIdentifiedUser) return null

    return (
        <>
            {hiddenConnection && <div className='blanket open-element-page-melted' style={{ zIndex: 25000, display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', top: 0 }} >
                <RemoveScroll removeScrollBar={false} className='menu_navbar scrollbar open-element-page-melted' style={{ width: '98%', maxWidth: 800, flexDirection: 'column', overflowY: 'auto', alignItems: 'center', background: 'none' }} data-theme={localTheme}>
                    <div className='cter_sect'>
                        <div className='ctent_artiMiniProfil' data-theme={localTheme}>
                            <h4 style={{ display: 'flex', justifyContent: 'center' }}>System</h4>
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10, marginBottom: 20 }}>
                                <div onClick={handleTheme} className='buttonCircle' style={{ width: 23, height: 23, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, marginRight: 10 }} data-theme={localTheme}>
                                    {localTheme === null && <FontAwesomeIcon icon={faMoon} />}
                                    {localTheme === 'default' && <FontAwesomeIcon icon={faMoon} />}
                                    {localTheme === 'dark' && <FontAwesomeIcon icon={faSun} />}
                                </div>
                                
                                <div className='buttonCircle' onClick={handleModeEco} style={{ color: animationSelect === 'eco' ? '#00aa00' : '#ec1c24', width: 23, height: 23, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, marginRight: 10 }} data-theme={localTheme}>
                                    <FontAwesomeIcon icon={faCubes} />
                                </div>
                                <div onClick={() => {
                                    setHiddenConnection(false)
                                    setLanguageSelect(null)
                                }} className='buttonCircle' style={{ width: 23, height: 23, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, marginRight: 10 }} data-theme={localTheme}>
                                    <FontAwesomeIcon icon={faLanguage} />
                                </div>
                            </div>
                            <h4 style={{ display: 'flex', justifyContent: 'center' }}>Connection</h4>
                            <input className='input_text' style={{ marginBottom: 20 }} type='email' onChange={handleChange('email')} placeholder='E-mail' data-theme={localTheme} />
                            <input className='input_text' style={{ marginBottom: 20 }} type="password" onChange={handleChange('password')} placeholder={t('password')} data-theme={localTheme} />
                            <p style={{ color: 'red' }}>{t(error)}</p>
                            <div className='button_option_container' style={{ marginBottom: 5, width: '90%', maxWidth: 300 }} data-theme={localTheme}>
                                <div className='button_optionBlue' onClick={submit} data-theme={localTheme}>Login</div>
                            </div>
                            <div className='button_option_container' style={{ width: '90%', maxWidth: 300, marginBottom: 20 }} data-theme={localTheme}>
                                <div className='button_optionRed' onClick={() => {
                                    setHiddenConnection(false)
                                    setError('')
                                }} data-theme={localTheme}>{t('cancel')}</div>
                            </div>

                            <div style={{ textAlign: 'center' }}>{t('message_reconnection')}</div>
                        </div>
                    </div>
                </RemoveScroll>
            </div>}
        </>
    )
}

export default Reconnection