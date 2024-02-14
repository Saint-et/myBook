import { Link } from 'react-router-dom';
import React from "react";
import logo from '../assets/images/logo_transparent_banner.png';
import logoBlack from '../assets/images/logo_transparent_banner_black.png';
import { useAppContext } from '../contexts/UseAppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes, faLanguage, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const Log = (props) => {
  const { localTheme, handleTheme, setLanguageSelect, handleModeEco, animationSelect } = useAppContext();

  const { t } = useTranslation();


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
        <div className='ctent_arti' style={{ maxWidth: 800, paddingBottom: 50}} data-theme={localTheme}>
          {props.Login && <h3>{t('login')}</h3>}
          {!props.Login && <h3>{t('signup')}</h3>}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 400 }}>
            {!props.Login && <input className='input_text' style={{ marginBottom: 20, width: '90%' }} onChange={props.handleChange('pseudo')} placeholder='Pseudo' data-theme={localTheme} />}
            <input className='input_text' style={{ marginBottom: 20, width: '90%' }} onChange={props.handleChange('email')} placeholder='E-mail' data-theme={localTheme} />
            {props.Login && <input className='input_text' style={{ marginBottom: 20, width: '90%' }} type="password" placeholder={t('password')} onChange={props.handleChange('password')} data-theme={localTheme} />}
            {!props.Login && <input className='input_text' autoComplete={"new-password"} style={{ marginBottom: 20, width: '90%' }} placeholder={t('password')} type="password" onChange={props.handleChange('password')} data-theme={localTheme} />}
            {!props.Login && <input style={{ marginBottom: 20, width: '90%' }} placeholder={t('password_verification')} autoComplete={"new-password"} type="password" className='input_text' onChange={props.handleChange('password_verification')} data-theme={localTheme} />}
            <p style={{ color: 'red' }}>{t(props.error)}</p>

            <div className='button_option_container' style={{width: '90%'}} data-theme={localTheme}>
              <div className='button_optionPic_v' onClick={props.submit} data-theme={localTheme}>{t('Identify_oneself')}</div>
            </div>

          </div>
          <div style={{ display: 'flex', borderTop: '2px solid #dddddd', paddingTop: 10, width: '90%', alignItems: 'center', justifyContent: 'center', marginTop: 20 }} data-theme={localTheme}>
            <div><Link to={'/password-forgot'} style={{ textDecoration: 'none' }} className='text' data-theme={localTheme}>{t('forgot_your_password')}</Link> | <span>{props.Login && <Link to={'/signup'} className='text' data-theme={localTheme}>{t('signup')}</Link>}{!props.Login && <Link to={'/login'} className='text' data-theme={localTheme}>{t('cancel')}</Link>}</span> |</div>
            <div onClick={handleTheme} className='buttonCircle' data-theme={localTheme}>
              {localTheme === null && <FontAwesomeIcon icon={faMoon} />}
              {localTheme === 'default' && <FontAwesomeIcon icon={faMoon} />}
              {localTheme === 'dark' && <FontAwesomeIcon icon={faSun} />}
            </div>
            <div className='buttonCircle' onClick={handleModeEco} style={{ color: animationSelect === 'eco'? '#00aa00' : '#ec1c24' }} data-theme={localTheme}>
                  <FontAwesomeIcon icon={faCubes} />
                </div>
            <div onClick={() => {setLanguageSelect(true)}} className='buttonCircle' data-theme={localTheme}>
              <FontAwesomeIcon icon={faLanguage} />
            </div>
          </div>
        </div>
      </div>



    </>
  )
}

export default Log