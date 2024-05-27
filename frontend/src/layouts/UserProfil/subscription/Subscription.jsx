import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowUpRightFromSquare, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays, faGem, faPlusSquare, faUser } from '@fortawesome/free-regular-svg-icons';
import { useAppContext } from '../../../contexts/UseAppContext';
import { useTranslation } from 'react-i18next';
import { SystemPicture } from '../../../assets/data/data';
import logo from '../../../assets/images/logo_transparent_banner.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { RemoveScroll } from 'react-remove-scroll';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../config';
import { spinner } from '../../../utils';


const Subscription = (props) => {

    const { localTheme, promiseIdentifiedUser } = useAppContext()
    const { t } = useTranslation();
    const navigate = useNavigate()

    const [promiseUser, setPromiseUser] = useState('');

    // API call to retrieve the profile matching the user search
    const GetProfilFromAPI = async () => {
        try {
            await axios.get(`${API_URL}api/eventv/get/user-diamond/${props.userId}`,
                { withCredentials: true })
                .then((res) => {
                    setPromiseUser(res.data);
                });
        } catch (error) {
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        GetProfilFromAPI()

        return (() => { setPromiseUser('') })
    }, [])

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
                <div className='cter_sect'>

                    {promiseUser && <>
                        <div className='ctent_arti' style={{ marginTop: 30 }} data-theme={localTheme}>
                            <div className='nav_bar_scnd' style={{ borderRadius: 0, margin: 0, padding: 0, background: 'linear-gradient(to right, #ee0979, #ff6a00)', color: 'white' }} data-theme={localTheme}>
                                <h4 style={{ margin: 10 }} data-theme={localTheme}>{t('subscription')}<FontAwesomeIcon style={{ marginLeft: 5 }} icon={faGem} /></h4>
                            </div>

                            <div style={{ width: '90%' }}>

                                <p>Nous sommes ravis de vous présenter notre toute nouvelle fonctionnalité : l'Access Diamond ! 💎</p>

                                <p>L'Access Diamond est un abonnement mensuel exclusif qui offre aux utilisateurs des avantages uniques. En souscrivant à l'Access Diamond d'un utilisateur, vous bénéficiez d'un accès privilégié à du contenu exclusif de cet utilisateur.</p>

                                <p>Il est important de noter que l'Access Diamond est un abonnement individuel et spécifique à chaque utilisateur. Il ne doit pas être confondu avec l'abonnement premium de notre site. L'Access Diamond vous donne la possibilité de développer une relation plus étroite avec votre audience en partageant du contenu exclusif qui leur est destiné personnellement.</p>

                                <p>Préparez-vous à plonger dans un monde de contenu exclusif et de relations authentiques avec vos abonnés. Rejoignez dès maintenant l'Access Diamond et commencez à créer des expériences uniques pour votre audience !</p>

                                <p>Nous sommes impatients de voir ce que vous allez créer et de vous accompagner dans cette aventure unique.</p>

                                <p>Bienvenue dans l'univers de l'Access Diamond ! 💎</p>

                            </div>

                            <p>Les fichiers seront marqués de cette manière pour faciliter leur identification. :</p>
                            <div className='badgeColoring'>{<FontAwesomeIcon icon={faGem} />}</div>
                        </div>
                    </>}

                    <div className='rowDoubleposition' style={{ marginBottom: 50 }}>

                        <div className='rowDoublepositionContent' data-theme={localTheme}>
                            {promiseUser ? <>
                                <div className='nav_bar_scnd' style={{ borderRadius: 0, margin: 0, padding: 0, marginBottom: 20, background: 'linear-gradient(to right, #ee0979, #ff6a00)', color: 'white' }} data-theme={localTheme}>
                                    <div style={{ width: '98%' }}>
                                        <h4 style={{ margin: 10 }}>{promiseUser?.user.pseudo}<FontAwesomeIcon style={{ marginLeft: 5 }} icon={faUser} /></h4>
                                    </div>
                                </div>

                                <div className='ctent_arti' style={{ maxWidth: 400, justifyContent: 'space-between', background: 'none' }} data-theme={localTheme}>
                                    <div style={{ backgroundImage: `url(${promiseUser?.user.imageUrlCover || SystemPicture})`, backgroundPosition: `50% ${promiseUser?.user.resizeImageUrlCover}%`, display: 'flex', alignItems: 'center', justifyContent: 'center' }} className='CoverImage FlexEmbed FlexEmbed--2by1'>

                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: -50, zIndex: 100 }}>
                                        <img style={{ width: 100, height: 100 }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='Profile_picture' src={promiseUser?.user.imageUrl} alt="" />
                                        <h3 style={{ margin: 0 }}>{t('subscription')}</h3>
                                        <div style={{ fontSize: 14 }}>by: {promiseUser?.user.pseudo}</div>
                                        <div className='badgeBlue' style={{ marginTop: 10 }} >{t('subscription')}</div>
                                    </div>

                                    <div className='button_option_container' style={{ width: '100%', marginTop: 10, maxWidth: 300, fontWeight: 800, fontSize: 18 }} data-theme={localTheme}>
                                        {props.sessionUser && <>{props.sessionUser?.user.id === promiseUser?.user.id ? <div className='button_optionColoring'>{t('start')}</div>
                                            :
                                            <div className='button_optionColoring'>0 €</div>}</>}

                                        {!props.sessionUser &&<div className='button_optionColoring'>0 €</div>}
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

                            <div className='nav_bar_scnd' style={{ borderRadius: 0, margin: 0, padding: 0, background: 'linear-gradient(to right, #ee0979, #ff6a00)', color: 'white' }} data-theme={localTheme}>
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

export default Subscription