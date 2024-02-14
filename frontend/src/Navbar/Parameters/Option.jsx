import { NavLink } from 'react-router-dom';
import './Option.scss';
import { spinner } from '../../utils';
import imgProfile from '../../assets/images/logo.png';
import Invited from '../../components/Invited';
import React, { useEffect } from "react";
import { useAppContext } from '../../contexts/UseAppContext';
import { DATA_picv } from '../../assets/data/data';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from '@fortawesome/free-solid-svg-icons';


const Option = () => {
  const { localTheme, promiseIdentifiedUser, localThemeBackground } = useAppContext()

  useEffect(() => { document.documentElement.scrollTop = 0; }, [])

  const { t } = useTranslation();

  if (promiseIdentifiedUser === false) return (
    <Invited localTheme={localTheme} />
  )

  if (!promiseIdentifiedUser) return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}>
      {spinner()}
    </div>
  )

  return (
    <>
      <div className='cter_sect' style={{ marginBottom: 20, marginTop: 20 }}>
        <div style={{ width: '97%' }}>
          <div className="copy-box two text" data-background={localThemeBackground} data-theme={localTheme}>
            <div className="inner">
              <div className="line right"></div>

              <h4>{t("parameter")} {DATA_picv}</h4>

              <div>{t("all_parameter.option_message1")}</div>

            </div>
          </div>
        </div>

        <div className='button_option_container' style={{ display: 'flex', zIndex: 100, flexWrap: 'wrap', justifyContent: 'center', background: 'none' }} data-theme={localTheme}>
          <NavLink to={'/parameters/premium'} className='btnPremium' style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 40, borderRadius: 100, margin: 3 }} data-background={localThemeBackground} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10, color: '#cfc09f' }} icon={faCrown} />{t("all_parameter.button2")}</NavLink>
          <NavLink to={'/parameters/customization'} className='button_option' style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 40, borderRadius: 100, margin: 3 }} data-background={localThemeBackground} data-theme={localTheme}>{t("all_parameter.button1")}</NavLink>
          <NavLink to={'/parameters/assistance'} className='button_option' style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 40, borderRadius: 100, margin: 3 }} data-background={localThemeBackground} data-theme={localTheme}>{t("all_parameter.button3")}</NavLink>
          <NavLink to={'/parameters/delete-account'} className='button_option' style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 40, borderRadius: 100, margin: 3 }} data-background={localThemeBackground} data-theme={localTheme}>{t("all_parameter.button4")}</NavLink>
        </div>

      </div>
    </>
  )
}

export default Option