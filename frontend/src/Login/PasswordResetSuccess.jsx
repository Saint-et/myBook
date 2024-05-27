import { Link } from 'react-router-dom';
import React from "react";
import logo from '../assets/images/logo_transparent_banner.png';
import logoBlack from '../assets/images/logo_transparent_banner_black.png';
import { useAppContext } from '../contexts/UseAppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes, faLanguage, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';



const PasswordResetSuccess = () => {

    const { t } = useTranslation();


    const { localTheme, handleTheme, promiseIdentifiedUser, setLanguageSelect, handleModeEco, animationSelect } = useAppContext();

    const navigate = useNavigate()


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
                    <div className='ctent_arti' style={{ maxWidth: 800, paddingBottom: 50 }} data-theme={localTheme}>

                        <div style={{ maxWidth: 600 }} data-theme={localTheme}>

                            <div>
                                <p>{t('passwordChangeConfirmation.intro')}</p>
                                <p>{t('passwordChangeConfirmation.successMessage')}</p>
                                <p>{t('passwordChangeConfirmation.actionRequired')}</p>
                                <p>{t('passwordChangeConfirmation.notMadeChange')}</p>
                                <p>{t('passwordChangeConfirmation.contactUs')}</p>
                                <p>{t('passwordChangeConfirmation.kindRegards')}</p>
                                <p>{t('passwordChangeConfirmation.team')}</p>
                            </div>


                            <div className='button_option_container' style={{ marginTop: 20, width: '90%' }} data-theme={localTheme}>
                                <Link to={'/login'} className='button_optionPic_v' data-theme={localTheme}>{t('Identify_oneself')}</Link>
                            </div>

                        </div>

                        <div style={{ display: 'flex', borderTop: '2px solid #dddddd', paddingTop: 10, width: '90%', alignItems: 'center', justifyContent: 'center', marginTop: 20 }} data-theme={localTheme}>
                            <div><Link style={{ textDecoration: 'none' }} to={'/login'} className='text' data-theme={localTheme}>{t('cancel')}</Link> |</div>
                            <div onClick={handleTheme} className='buttonCircle' data-theme={localTheme}>
                                {localTheme === null && <FontAwesomeIcon icon={faMoon} />}
                                {localTheme === 'default' && <FontAwesomeIcon icon={faMoon} />}
                                {localTheme === 'dark' && <FontAwesomeIcon icon={faSun} />}
                            </div>
                            <div className='buttonCircle' onClick={handleModeEco} style={{ color: animationSelect === 'eco' ? '#00aa00' : '#ec1c24' }} data-theme={localTheme}>
                                <FontAwesomeIcon icon={faCubes} />
                            </div>
                            <div onClick={() => { setLanguageSelect(true) }} className='buttonCircle' data-theme={localTheme}>
                                <FontAwesomeIcon icon={faLanguage} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PasswordResetSuccess