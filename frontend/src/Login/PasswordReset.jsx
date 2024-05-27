import { Link } from 'react-router-dom';
import React from "react";
import axios from "axios";
import { API_URL } from '../config';
import logo from '../assets/images/logo_transparent_banner.png';
import logoBlack from '../assets/images/logo_transparent_banner_black.png';
import { useAppContext } from '../contexts/UseAppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';



const PasswordReset = () => {

    const { t } = useTranslation();

    const { localTheme, handleTheme, promiseIdentifiedUser, handleModeEco, animationSelect } = useAppContext();

    const navigate = useNavigate()

    const url = window.location.href;
    const Id = url.split("/")[4];


    const [password, setPassword] = useState({
        password: '',
        password_verification: ''
    });

    const handleChange = (name) => event => {
        setPassword({ ...password, [name]: event.target.value })
    };


    const [error, setError] = useState("");

    const [valide, setValide] = useState("");

    const submit = async () => {
        setError('')
        setValide('')
        try {
            await axios.post(`${API_URL}api/auth/password-reset/${Id}`, {
                password: password.password,
                password_verification: password.password_verification
            }, { withCredentials: true })
                .then((res) => {
                    setValide(res.data.message)
                    setError('')
                    return navigate(`/password-forgot/${Id}/password-binding`)
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
        <div className='main'>
            <div className='open-element-page-melted'>
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
                    <div className='ctent_arti' style={{ maxWidth: 800, paddingBottom: 50, paddingTop: 40 }} data-theme={localTheme}>
                        <h3>{t('resetPassword')}.</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '90%', maxWidth: 400 }}>
                            <input onChange={handleChange('password')} placeholder={t('password')} style={{ width: '90%', marginBottom: 20 }} className='input_text' type="password" name="tyrtdfy" id="hgkhj" data-theme={localTheme} />
                            <input onChange={handleChange('password_verification')} placeholder={t('password_verification')} style={{ width: '90%', marginBottom: 20 }} className='input_text' type="password" name="styhtr" id="gyfjk" data-theme={localTheme} />
                            {valide != '' && <p>{valide}</p>}
                            {error != '' && <p style={{ color: 'red' }}>{t(error)}</p>}
                            <div className='button_option_container' style={{ marginTop: 20, width: '90%' }} data-theme={localTheme}>
                                <div className='button_optionPic_v' onClick={submit} data-theme={localTheme}>{t('send')}</div>
                            </div>
                        </div>
                        <div className='buttonCircle' onClick={handleModeEco} style={{ color: animationSelect === 'eco' ? '#00aa00' : '#ec1c24' }} data-theme={localTheme}>
                            <FontAwesomeIcon icon={faCubes} />
                        </div>
                        <div style={{ display: 'flex', borderTop: '2px solid #dddddd', paddingTop: 10, width: '90%', alignItems: 'center', justifyContent: 'center', marginTop: 20 }} data-theme={localTheme}>
                            <div><Link style={{ textDecoration: 'none' }} to={'/login'} className='text' data-theme={localTheme}>{t('cancel')}</Link> |</div>
                            <div onClick={handleTheme} className='buttonCircle' data-theme={localTheme}>
                                {localTheme === null && <FontAwesomeIcon icon={faMoon} />}
                                {localTheme === 'default' && <FontAwesomeIcon icon={faMoon} />}
                                {localTheme === 'dark' && <FontAwesomeIcon icon={faSun} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PasswordReset