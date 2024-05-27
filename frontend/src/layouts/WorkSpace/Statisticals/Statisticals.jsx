import { useState } from 'react';
import { useAppContext } from '../../../contexts/UseAppContext';
import imgProfile from '../../../assets/images/logo.png';
import mostViews from '../../../assets/icons/2632393_8479.jpg';
import bookmark from '../../../assets/icons/893415_57778-O967CY-373.jpg';
import coins from '../../../assets/icons/3421689_508478-PIHX1T-604.jpg';
import calendar from '../../../assets/icons/90435757_Gradient_Red_Calendar.jpg';
import diamond from '../../../assets/icons/1144969_695.jpg';
import { useTranslation } from 'react-i18next';
import Warning from '../../../components/Warning';

const Statisticals = () => {
    const { localTheme, promiseIdentifiedUser } = useAppContext();

    const { t } = useTranslation();



    /*<div className="checkbox-wrapper-46" style={{ marginBottom: 10, marginTop: 20 }}>
        <input className="inp-cbx" id="hj54" type="checkbox" />
        <label className="cbx" htmlFor="hj54"><span>
            <svg width="12px" height="12px" viewBox="0 0 12 10">
                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
            </svg></span><span style={{ marginLeft: 10 }}>{t("select")} : Donation</span>
        </label>
    </div>*/

    return (
        <div className='open-element-page-melted'>
            <Warning />
            <div className='cter_sect'>
                <div style={{ width: '97%' }}>
                    <div className="copy-box two" data-theme={localTheme}>
                        <div className="inner">
                            <div className="line right"></div>

                            <h4>{t("subscriptions.title1")}</h4>
                            <div>{t("subscriptions.text1")}</div>
                            <div style={{ marginTop: 10 }}>
                                <span style={{ fontWeight: 900 }}>{t("subscriptions.title2")}</span><br />
                                <div>{t("subscriptions.text2")}</div>
                                {t("subscriptions.text3")}<br />
                                {t("subscriptions.text4")}<br />
                                {t("subscriptions.text5")}</div>

                        </div>
                    </div>
                </div>
            </div>
            <div className='cter_sect' style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, flexWrap: 'wrap' }}>

                <div className='ctent_arti hovercursor' style={{ maxWidth: 400, height: 450, justifyContent: 'space-between', margin: 10 }} data-theme={localTheme}>
                    <div style={{ backgroundImage: `url(${mostViews})`, backgroundPosition: `50% ${50}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 0, height: 250 }} className='CoverImage FlexEmbed FlexEmbed--2by1'></div>

                    <div>Plus vues</div>

                    <div className='button_option_container' style={{ width: '100%', marginTop: 10, maxWidth: 300 }} data-theme={localTheme}>
                        <div className='button_option' data-theme={localTheme}>{t("seeMore")}...</div>
                    </div>
                </div>

                <div className='ctent_arti hovercursor' style={{ maxWidth: 400, height: 450, justifyContent: 'space-between', margin: 10 }} data-theme={localTheme}>
                    <div style={{ backgroundImage: `url(${bookmark})`, backgroundPosition: `50% ${50}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 0, height: 250 }} className='CoverImage FlexEmbed FlexEmbed--2by1'></div>

                    <div></div>

                    <div className='button_option_container' style={{ width: '100%', marginTop: 10, maxWidth: 300 }} data-theme={localTheme}>
                        <div className='button_option' data-theme={localTheme}>{t("seeMore")}...</div>
                    </div>
                </div>

                <div className='ctent_arti hovercursor' style={{ maxWidth: 400, height: 450, justifyContent: 'space-between', margin: 10 }} data-theme={localTheme}>
                    <div style={{ backgroundImage: `url(${calendar})`, backgroundPosition: `50% ${50}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 0, height: 250 }} className='CoverImage FlexEmbed FlexEmbed--2by1'></div>

                    <div></div>

                    <div className='button_option_container' style={{ width: '100%', marginTop: 10, maxWidth: 300 }} data-theme={localTheme}>
                        <div className='button_option' data-theme={localTheme}>{t("seeMore")}...</div>
                    </div>
                </div>

                <div className='ctent_arti hovercursor' style={{ maxWidth: 400, height: 450, justifyContent: 'space-between', margin: 10 }} data-theme={localTheme}>
                    <div style={{ backgroundImage: `url(${coins})`, backgroundPosition: `50% ${50}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 0, height: 250 }} className='CoverImage FlexEmbed FlexEmbed--2by1'></div>

                    <div></div>

                    <div className='button_option_container' style={{ width: '100%', marginTop: 10, maxWidth: 300 }} data-theme={localTheme}>
                        <div className='button_option' data-theme={localTheme}>{t("seeMore")}...</div>
                    </div>
                </div>

                <div className='ctent_arti hovercursor' style={{ maxWidth: 400, height: 450, justifyContent: 'space-between', margin: 10 }} data-theme={localTheme}>
                    <div style={{ backgroundImage: `url(${diamond})`, backgroundPosition: `50% ${50}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 0, height: 250 }} className='CoverImage FlexEmbed FlexEmbed--2by1'></div>

                    <div></div>

                    <div className='button_option_container' style={{ width: '100%', marginTop: 10, maxWidth: 300 }} data-theme={localTheme}>
                        <div className='button_option' data-theme={localTheme}>{t("seeMore")}...</div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Statisticals