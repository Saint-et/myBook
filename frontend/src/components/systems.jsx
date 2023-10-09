
import { RemoveScroll } from "react-remove-scroll";
import { useAppContext } from "../contexts/UseAppContext"
import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import i18n from "../assets/i18n/i18n";


const Languages = () => {

    const { t } = useTranslation();

    const { localTheme, languageSelect, setLanguageSelect } = useAppContext()

    const [editeLanguage, setEditeLanguage] = useState(localStorage.getItem('language'));


    const handleClick = () => {
        localStorage.setItem('language', editeLanguage || 'en');
        i18n.changeLanguage(localStorage.getItem('language') || 'en')
        setLanguageSelect(false)

    };


    if (languageSelect == false) return null

    return (
        <>
            <div className='blanket animation' style={{ zIndex: 18500, display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                <div className='cter_sect' style={{ paddingBottom: 25 }}>
                    <RemoveScroll removeScrollBar={false} className='ctent_arti' style={{ overflow: 'visible', maxWidth: 500 }} data-theme={localTheme}>
                        <h2>{t('titleSelectTranslation')}</h2>
                        <div style={{ marginBottom: 10 }}>{t('selectTranslation')}</div>
                        <div className="copy-box two">
                            <div className="inner">
                                <div className="line right"></div>
                                <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                                    <div className="checkbox-wrapper-46Radio" style={{ marginBottom: 10 }}>
                                        <input className="inp-cbxRadio" onChange={() => { setEditeLanguage('en') }} checked={editeLanguage === 'en'} type="radio" name="languages" id="English" />
                                        <label className="cbxRadio" htmlFor="English">
                                            <span></span><span style={{ marginLeft: 5 }}>English</span>
                                        </label>
                                    </div>
                                    <div className="checkbox-wrapper-46Radio" style={{ marginBottom: 10 }}>
                                        <input className="inp-cbxRadio" onChange={() => { setEditeLanguage('es') }} checked={editeLanguage === 'es'} type="radio" name="languages" id="Español" />
                                        <label className="cbxRadio" htmlFor="Español">
                                            <span></span><span style={{ marginLeft: 5 }}>Español</span>
                                        </label>
                                    </div>
                                    <div className="checkbox-wrapper-46Radio" style={{ marginBottom: 10 }}>
                                        <input className="inp-cbxRadio" onChange={() => { setEditeLanguage('fr') }} checked={editeLanguage === 'fr'} type="radio" name="languages" id="Français" />
                                        <label className="cbxRadio" htmlFor="Français">
                                            <span></span><span style={{ marginLeft: 5 }}>Français</span>
                                        </label>
                                    </div>
                                    <div className="checkbox-wrapper-46Radio" style={{ marginBottom: 10 }}>
                                        <input className="inp-cbxRadio" onChange={() => { setEditeLanguage('ja') }} checked={editeLanguage === 'ja'} type="radio" name="languages" id="日本語" />
                                        <label className="cbxRadio" htmlFor="日本語">
                                            <span></span><span style={{ marginLeft: 5 }}>日本語</span>
                                        </label>
                                    </div>
                                    <div className="checkbox-wrapper-46Radio" style={{ marginBottom: 10 }}>
                                        <input className="inp-cbxRadio" onChange={() => { setEditeLanguage('ch') }} checked={editeLanguage === 'ch'} type="radio" name="languages" id="中文" />
                                        <label className="cbxRadio" htmlFor="中文">
                                            <span></span><span style={{ marginLeft: 5 }}>中文</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='button_option_container' style={{ width: '90%', marginTop: 20 }} data-theme={localTheme}>
                            <div onClick={handleClick} className='button_optionPic_v'>{t('continue')}</div>
                        </div>
                    </RemoveScroll>
                </div>
            </div>
        </>
    )
}

export default Languages