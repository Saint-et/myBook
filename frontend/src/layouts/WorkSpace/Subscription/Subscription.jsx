import { useState } from 'react';
import { useAppContext } from '../../../contexts/UseAppContext';
import imgProfile from '../../../assets/images/logo.png';
import { useTranslation } from 'react-i18next';
import Warning from '../../../components/Warning';

const Subscription = () => {
    const { localTheme, localThemeBackground, promiseIdentifiedUser } = useAppContext();

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
        <div className='open-elementPage'>
            <Warning />
            <div className='cter_sect'>
                <div style={{ width: '97%' }}>
                    <div className="copy-box two text" data-theme={localTheme} data-background={localThemeBackground}>
                        <div className="inner">
                            <div className="line right"></div>

                            <h4>{t("subscriptions.title1")}</h4>
                            <div>{t("subscriptions.text1")}</div>
                            <div>{t("subscriptions.text2")}</div>
                            <div style={{ marginTop: 10 }}>
                                <span style={{ fontWeight: 900 }}>{t("subscriptions.title2")}</span><br />
                                {t("subscriptions.text3")}<br />
                                {t("subscriptions.text4")}<br />
                                {t("subscriptions.text5")}</div>

                        </div>
                    </div>
                </div>
            </div>
            <div className='cter_sect' style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                <div className='ctent_arti' style={{ maxWidth: 400, height: 450, justifyContent: 'space-between', margin: 10 }} data-theme={localTheme}>
                    <div style={{ backgroundImage: `url(${imgProfile})`, backgroundPosition: `50% ${50}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 0 }} className='CoverImage FlexEmbed FlexEmbed--2by1'>
                        <div className='shadowbox' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white' }}>
                            <img style={{ width: 80, height: 80 }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='Profile_picture' src={promiseIdentifiedUser?.user.imageUrl || imgProfile} alt="" />
                            <h3 style={{ margin: 0 }}>Donation</h3>
                            <div style={{ fontSize: 14 }}>by: {promiseIdentifiedUser?.user.pseudo}</div>
                            <div className='badgeBlue' style={{ marginTop: 10 }} >Donation</div>
                        </div>
                    </div>
                    <div className="copy-box two">
                        <div className="inner">
                            <div className="line right"></div>
                            <ul style={{ width: '90%' }}>
                                <li style={{ marginBottom: 15, marginTop: 15 }}><strong>Donation :</strong> Si vous aimez le contenu de {promiseIdentifiedUser?.user.pseudo} et que vous souhaitez l’aider à évoluer, vous pouvez lui faire un don si vous souhaitez le soutenir dans son évolution.</li>
                            </ul>
                        </div>
                    </div>
                    <div className='button_option_container' style={{ width: '100%', marginTop: 10, maxWidth: 300 }} data-theme={localTheme}>
                        <div className='button_optionBlue'>{t("select")}</div>
                    </div>
                </div>

                {/*<div className='ctent_arti' style={{ maxWidth: 400, height: 450, justifyContent: 'space-between', margin: 10 }} data-theme={localTheme}>
                    <div style={{ backgroundImage: `url(${imgCoverCard2})`, backgroundPosition: `50% ${50}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 0 }} className='CoverImage FlexEmbed FlexEmbed--2by1'>
                        <div className='shadowbox' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white' }}>
                            <img style={{ width: 80, height: 80 }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='Profile_picture' src={promiseIdentifiedUser?.user.imageUrl || imgProfile} alt="" />
                            <h3 style={{ margin: 0 }}>Subscription</h3>
                            <div style={{ fontSize: 14 }}>by: {promiseIdentifiedUser?.user.pseudo}</div>
                            <div className='badgeBlue' style={{ marginTop: 10 }} >Advanced</div>
                        </div>
                    </div>
                    <div className="copy-box two">
                        <div className="inner">
                            <div className="line right"></div>
                            <ul style={{ width: '90%' }}>
                                <li style={{ marginBottom: 15, marginTop: 15 }}><strong>Niveau Advanced :</strong> Profitez d'un accès étendu du contenu advanced, pour une expérience plus approfondie.</li>
                            </ul>
                        </div>
                    </div>

                    <div className='button_option_container' style={{ width: '100%', marginTop: 10, maxWidth: 300 }} data-theme={localTheme}>
                        <div className='button_optionBlue'>{t("select")}</div>
                    </div>
                </div>


                <div className='ctent_arti' style={{ maxWidth: 400, height: 450, justifyContent: 'space-between', margin: 10 }} data-theme={localTheme}>
                    <div style={{ backgroundImage: `url(${imgCoverCard3})`, backgroundPosition: `50% ${50}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 0 }} className='CoverImage FlexEmbed FlexEmbed--2by1'>
                        <div className='shadowbox' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white' }}>
                            <img style={{ width: 80, height: 80 }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='Profile_picture' src={promiseIdentifiedUser?.user.imageUrl || imgProfile} alt="" />
                            <h3 style={{ margin: 0 }}>Subscription</h3>
                            <div style={{ fontSize: 14 }}>by: {promiseIdentifiedUser?.user.pseudo}</div>
                            <div className='badgeBlue' style={{ marginTop: 10 }} >Advanced +</div>
                        </div>
                    </div>
                    <div className="copy-box two">
                        <div className="inner">
                            <div className="line right"></div>
                            <ul style={{ width: '90%' }}>
                                <li style={{ marginBottom: 15, marginTop: 15 }}><strong>Niveau Advanced :</strong> Profitez d'un accès étendu du contenu advanced, pour une expérience plus approfondie.</li>
                                <li style={{ marginBottom: 15, marginTop: 15 }}><strong>Niveau Advanced + :</strong> Le plus exclusif avec un accès illimité à tous nos contenus advanced, des avantages spéciaux.</li>
                            </ul>
                        </div>
                    </div>
                    <div className='button_option_container' style={{ width: '100%', marginTop: 10, maxWidth: 300 }} data-theme={localTheme}>
                        <div className='button_optionBlue'>{t("select")}</div>
                    </div>
                </div>*/}

            </div>

        </div>
    )
}

export default Subscription