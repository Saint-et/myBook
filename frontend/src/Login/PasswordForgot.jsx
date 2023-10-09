import { Link, useNavigate } from 'react-router-dom';
import React from "react";
import axios from "axios";
import { API_URL } from '../config';
import logo from '../assets/images/logo_transparent_banner.png';
import logoBlack from '../assets/images/logo_transparent_banner_black.png';
import { useAppContext } from '../contexts/UseAppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';


const PasswordForgot = () => {

    const { t } = useTranslation();

    const { localTheme, handleTheme, promiseIdentifiedUser, setLanguageSelect } = useAppContext();

    const navigate = useNavigate()

    const [email, setEmail] = useState({
        to: ''
    });


    const [error, setError] = useState("");
    const [valide, setValide] = useState("");

    const handleChange = (name) => event => {
        setEmail({ ...email, [name]: event.target.value })
    };

    const submit = async () => {
        setError('')
        setValide('')
        try {
            await axios.post(`${API_URL}api/auth/password-forgot`, {
                to: email.to
            }, { withCredentials: true })
                .then((res) => {
                    setValide(res.data.message)
                    setError('')
                })
        } catch (error) {
            setValide('')
            setError(error.response.data.message)
        }

    }

    useEffect(() => {
        if (promiseIdentifiedUser !== false && promiseIdentifiedUser !== undefined) return navigate('/')
    }, [])

    if (promiseIdentifiedUser === undefined) return (null)

    return (
        <>
            <div className='cter_sect' style={{ marginTop: 20 }}>
                <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                    <img style={{ width: '100%', height: 100, objectFit: 'contain' }} src={
                        localTheme === null && logoBlack ||
                        localTheme === 'dark' && logo ||
                        localTheme === 'default' && logoBlack
                    } alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                </div >
            </div>

            <div className='cter_sect'>
                <div className='ctent_arti' style={{ maxWidth: 800, paddingBottom: 50 }} data-theme={localTheme}>
                    <h3>{t('forgot_your_password')}</h3>


                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '90%', maxWidth: 400 }}>
                        <input style={{ width: '90%' }} type='email' placeholder='E-mail' className='input_text' onChange={handleChange('to')} data-theme={localTheme} />
                        {valide != '' && <p>{valide}</p>}
                        {error != '' && <p style={{ color: 'red' }}>{t(error)}</p>}
                        <div className='button_option_container' style={{ marginTop: 20, width: '90%' }} data-theme={localTheme}>
                            <div className='button_optionPic_v' onClick={submit} data-theme={localTheme}>{t('resetPassword')}</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', borderTop: '2px solid #dddddd', paddingTop: 10, width: '90%', alignItems: 'center', justifyContent: 'center', marginTop: 20 }} data-theme={localTheme}>
                        <div><Link to={'/login'} style={{ textDecoration: 'none' }} className='text' data-theme={localTheme}>{t('cancel')}</Link> |</div>
                        <div onClick={handleTheme} className='buttonCircle' data-theme={localTheme}>
                            {localTheme === null && <FontAwesomeIcon icon={faMoon} />}
                            {localTheme === 'default' && <FontAwesomeIcon icon={faMoon} />}
                            {localTheme === 'dark' && <FontAwesomeIcon icon={faSun} />}
                        </div>

                        <div onClick={() => { setLanguageSelect(true) }} className='buttonCircle' data-theme={localTheme}>
                            <FontAwesomeIcon icon={faLanguage} />
                        </div>
                    </div>

                    <div style={{ width: '90%' }}>
                        <h4 style={{ color: '#403eb6' }}>{t('resetPasswordSteps.title')}</h4>
                        <p>{t('resetPasswordSteps.intro')}</p>
                        <ol>
                            <li style={{ marginBottom: 20 }}>{t('resetPasswordSteps.step1')}</li>
                            <li style={{ marginBottom: 20 }}>{t('resetPasswordSteps.step2')}</li>
                            <li style={{ marginBottom: 20 }}>{t('resetPasswordSteps.step3')}</li>
                            <li style={{ marginBottom: 20 }}>{t('resetPasswordSteps.step4')}</li>
                            <li style={{ marginBottom: 20 }}>{t('resetPasswordSteps.step5')}</li>
                            <li style={{ marginBottom: 20 }}>{t('resetPasswordSteps.step6')}</li>
                        </ol>
                        <p>{t('resetPasswordSteps.conclusion')}</p>
                        <p>{t('resetPasswordSteps.contactUs')} <a href="mailto:picturevweb@gmail.com" style={{ color: '#403eb6' }}>picturevweb@gmail.com</a></p>
                        <p>{t('resetPasswordSteps.kindRegards')}</p>
                        <p>{t('resetPasswordSteps.team')}</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default PasswordForgot