import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppContext } from '../../../contexts/UseAppContext';
import { faArrowLeft, faInfoCircle, faWandSparkles } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SystemPicture } from '../../../assets/data/data';
import logo from '../../../assets/images/logo_transparent_banner.png';
import { RemoveScroll } from 'react-remove-scroll';
import { spinner } from '../../../utils';

const Shop_users = (props) => {

    const { localTheme } = useAppContext()
    const { t } = useTranslation();
    const navigate = useNavigate()



    return (
        <>

            <RemoveScroll className="blanket_opacte open-element-page-melted scrollbar" style={{ zIndex: 25000, paddingTop: 0, display: 'flex', justifyContent: 'start', flexDirection: 'column', overflow: 'auto', paddingTop: 50 }} data-theme={localTheme}>
                <div className='nav_bar_scnd' style={{ margin: 0, padding: 0, height: 50, borderRadius: 0, alignItems: 'start', position: 'fixed', top: 0, zIndex: 10000 }} data-theme={localTheme}>
                    <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', marginTop: 5 }}>
                        <div onClick={() => navigate(-1)} className='button_option_container' style={{ maxWidth: 50, marginLeft: 10, display: 'flex', background: 'none' }} data-theme={localTheme}>
                            <div className='button_option' style={{ height: 40, width: 40, borderRadius: 100, marginRight: 5 }} data-theme={localTheme}><FontAwesomeIcon icon={faArrowLeft} /></div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', maxWidth: 200, justifyContent: 'center' }}>
                            <img className='logo_event' style={{ height: 30 }} src={logo} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                        </div>
                    </div>
                </div>
                <div className='cter_sect' style={{ marginTop: 20 }}>
                    <div className='ctent_arti' data-theme={localTheme}>

                        <div className='nav_bar_scnd' style={{ padding: 0, marginBottom: 10, borderRadius: 0, background: 'linear-gradient(to right, #fc00ff, #00dbde)' }} data-theme={localTheme}>
                            <h4 style={{ margin: 10, color: 'white' }} data-theme={localTheme}>{t('accessPass')}<FontAwesomeIcon style={{ marginLeft: 5 }} icon={faWandSparkles} /></h4>
                        </div>

                        <div style={{ width: '90%' }}>

                            <p>L'AccessPass vous offre une opportunité unique de découvrir et de télécharger le contenu créé par une communauté diversifiée de créateurs talentueux. Avec l'AccessPass, vous avez accès à une vaste bibliothèque de fichiers comprenant des images, des vidéos, des documents et bien plus encore, provenant de différents créateurs de contenu.</p>

                            <p>Vous pouvez parcourir et explorer une variété de contenus exclusifs, et soutenir les créateurs en achetant et en téléchargeant leurs fichiers.</p>

                        </div>

                    </div>

                    <div className='rowDoubleposition' style={{ marginBottom: 50 }}>

                        <div className='rowDoublepositionContent' data-theme={localTheme}>
                            {props.sessionUser ? <>
                                <div className='nav_bar_scnd' style={{ borderRadius: 0, margin: 0, padding: 0, marginBottom: 20, background: 'linear-gradient(to right, #fc00ff, #00dbde)', color: 'white' }} data-theme={localTheme}>
                                    <div style={{ width: '98%' }}>
                                        <h4 style={{ margin: 10 }}>{props.sessionUser?.user.pseudo}<FontAwesomeIcon style={{ marginLeft: 5 }} icon={faUser} /></h4>
                                    </div>
                                </div>

                                <div className='ctent_arti' style={{ maxWidth: 400, justifyContent: 'space-between', background: 'none' }} data-theme={localTheme}>
                                    <div style={{ backgroundImage: `url(${props.sessionUser?.user.imageUrlCover || SystemPicture})`, backgroundPosition: `50% ${props.sessionUser?.user.resizeImageUrlCover}%`, display: 'flex', alignItems: 'center', justifyContent: 'center' }} className='CoverImage FlexEmbed FlexEmbed--2by1'>

                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: -50, zIndex: 100 }}>
                                        <img style={{ width: 100, height: 100 }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='Profile_picture' src={props.sessionUser?.user.imageUrl} alt="" />
                                        <h3 style={{ margin: 0 }}>{t('accessPass')}</h3>
                                        <div style={{ fontSize: 14 }}>by: {props.sessionUser?.user.pseudo}</div>
                                        <div className='badgeBlue' style={{ marginTop: 10 }} >{t('accessPass')}</div>
                                    </div>

                                    <div className='button_option_container' style={{ width: '100%', marginTop: 10, maxWidth: 300, fontWeight: 800, fontSize: 18 }} data-theme={localTheme}>
                                        {props.sessionUser ? <>{props.sessionUser?.user.id === props.sessionUser?.user.id ? <div className='button_optionColoringBlue'>{t('start')}</div>
                                            :
                                            <div className='button_optionColoringBlue'>{t('stop')}</div>}</>
                                        : 
                                        <div className='button_optionColoringBlue'>{t('accessPass')}</div>}
                                    </div>
                                </div>

                                {/*<div style={{ width: '98%', display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                            <div className='buttonCircle' style={{ width: 'max-content', height: 35, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, padding: '0px 10px 0px 10px', background: 'none' }} data-theme={localTheme}>
                                {t('seeMore')} <FontAwesomeIcon style={{ marginLeft: 5 }} icon={faArrowUpRightFromSquare} />
                            </div>
                        </div>*/}
                            </> : <>{spinner()}</>}
                        </div>

                        <div className='rowDoublepositionContent' data-theme={localTheme}>

                            <div className='nav_bar_scnd' style={{ borderRadius: 0, margin: 0, padding: 0, background: 'linear-gradient(to right, #fc00ff, #00dbde)', color: 'white' }} data-theme={localTheme}>
                                <div style={{ width: '98%' }}>
                                    <h4 style={{ margin: 10 }}>{t('information')}<FontAwesomeIcon style={{ marginLeft: 5 }} icon={faInfoCircle} /></h4>
                                </div>
                            </div>

                            <div style={{ width: '90%', height: '100%' }}>

                                <div style={{ marginBottom: 15, marginTop: 15 }}><strong>Découvrez les avantages exclusifs de l'abonnement utilisateur :</strong>En vous abonnant, vous aurez accès à du contenu exclusif sélectionné par l'utilisateur lui-même. Profitez d'une expérience unique en accédant à des fichiers spécialement choisis pour vous.</div>

                                <div style={{ marginBottom: 15, marginTop: 15 }}><strong>Découvrez les avantages exclusifs de l'abonnement utilisateur :</strong>En vous abonnant, vous aurez accès à du contenu exclusif sélectionné par l'utilisateur lui-même. Profitez d'une expérience unique en accédant à des fichiers spécialement choisis pour vous.</div>

                            </div>



                            {/*<div style={{ width: '98%', display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                            <div className='buttonCircle' style={{ width: 'max-content', height: 35, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, padding: '0px 10px 0px 10px', background: 'none' }} data-theme={localTheme}>
                                {t('seeMore')} <FontAwesomeIcon style={{ marginLeft: 5 }} icon={faArrowUpRightFromSquare} />
                            </div>
                        </div>*/}
                        </div>
                    </div>
                </div>
            </RemoveScroll>
        </>
    )
}

export default Shop_users