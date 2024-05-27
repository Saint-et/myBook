
import { RemoveScroll } from "react-remove-scroll";
import { useAppContext } from "../contexts/UseAppContext"
import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import i18n from "../assets/i18n/i18n";
import { useLocation, useNavigate } from "react-router-dom";
import { NSFW, SystemName } from "../assets/data/data";


const Languages = () => {

    const { t } = useTranslation();

    const { localTheme, languageSelect, setLanguageSelect, addErrorMessage } = useAppContext()

    const [editeLanguage, setEditeLanguage] = useState(localStorage.getItem('language'));

    const test = sessionStorage.getItem('adult_temporary') || localStorage.getItem('adult_temporary') === 'true';

    const [adult_temporary, setAdult_temporary] = useState(test);

    const [adult_check, setAdult_check] = useState(test);


    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.setItem('language', editeLanguage || 'en');
        i18n.changeLanguage(localStorage.getItem('language') || 'en')
        addErrorMessage(`Language ( ${editeLanguage} )`, 3000, '#396afc')
        setLanguageSelect(false)

    };

    const handleClick_adult = () => {
        if (adult_check) {
            localStorage.setItem('adult_temporary', true);
            setAdult_temporary(localStorage.getItem('adult_temporary'))
            addErrorMessage(`🔞 Avertissement ( Ne sera plus afficher )`, 5000, '#396afc')
        } else {
            sessionStorage.setItem('adult_temporary', true);
            setAdult_temporary(sessionStorage.getItem('adult_temporary'))
            addErrorMessage(`🔞 Avertissement ( jusqu'à la fermeture de l'onglet )`, 5000, '#396afc')
        }
    };

    const location = useLocation()

    if (location.pathname === `/${SystemName}-creative/${location.pathname.split("/")[2]}`) return null

    if (!adult_temporary) return (
        <>
            <div className='blanket open-element-page-melted' style={{ zIndex: 50000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                <div className='cter_sect' style={{ paddingBottom: 25 }}>
                    <RemoveScroll removeScrollBar={false} className='ctent_arti' style={{ overflow: 'visible', maxWidth: 1000 }} data-theme={localTheme}>
                        <h2 style={{ display: 'flex' }}>🔞 Avertissement : Contenu NSFW possible.</h2>
                        <div style={{ width: '90%' }}>
                            <div>Bienvenue sur notre site.</div>

                            <div style={{ display: 'flex' }}>Nous tenons à vous informer que notre plateforme peut contenir des fichiers NSFW,</div>

                            <div style={{ display: 'flex' }}>mais il y a une option pour masquer le contenu NSFW.</div>

                            <div style={{ marginTop: 10 }}>Veuiller noter que les utilisateurs ont la possibilité de gérer les réglages concernant ce type de contenu, l'option ne sert qu'à masquer le contenu marquer par les utilisateurs.</div>

                            <div style={{ display: 'flex', marginTop: 20 }}><div className='adult' style={{ marginRight: 5, height: 19 }} translate='no'>{NSFW}</div>:
                                NSFW signifie "Not Safe For Work", ce qui se traduit littéralement par "Pas sûr pour le travail". Il est utilisé pour avertir que le contenu auquel il est associé peut ne pas être approprié pour être visionné ou consommé dans un environnement professionnel ou public.</div>

                            <div className="checkbox-wrapper-46" style={{ padding: 5, borderRadius: 5, marginTop: 20 }}>
                                <input onChange={(e) => { setAdult_check(e.target.checked) }} className="inp-cbx" id="hj5654587856" type="checkbox" />
                                <label className="cbx" htmlFor="hj5654587856"><span>
                                    <svg width="12px" height="12px" viewBox="0 0 12 10">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                    </svg></span><span style={{ marginLeft: 5, width: '80%' }}>
                                        Ne plus afficher ?</span>
                                </label>
                            </div>
                        </div>



                        <div className='button_option_container_free' style={{ width: '90%', marginTop: 20, maxWidth: 300 }} data-theme={localTheme}>
                            <div onClick={handleClick_adult} className='button_optionPic_v'>{t('continue')}</div>
                        </div>

                        <div className='button_option_container_free' style={{ width: '90%', marginTop: 20, maxWidth: 300 }} data-theme={localTheme}>
                            <div onClick={() => navigate(-1)} className='button_option' data-theme={localTheme}>{t('Back_to_previous_page')}</div>
                        </div>
                    </RemoveScroll>
                </div>
            </div>
        </>
    )

    if (languageSelect == false) return null

    return (
        <>
            <div className='blanket open-element-page-melted' style={{ zIndex: 55000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
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