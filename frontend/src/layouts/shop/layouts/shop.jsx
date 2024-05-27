import { useAppContext } from '../../../contexts/UseAppContext';
import imgProfile from '../../../assets/images/logo.png';
import imgRemplace from '../../../assets/images/vaisseau-spatial-futuriste-orbite-autour-mysterieuse-planete-dans-galaxie-profonde-generee-par-intelligence-artificielle.jpg';
import { faArrowRight, faArrowRightArrowLeft, faBasketShopping, faBookOpen, faCoins, faFilter, faHome, faMagnifyingGlass, faPepperHot, faPiggyBank, faTerminal, faTicket, faTrophy, faWandSparkles, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card_articles_side from '../../../components/Cards/Card_articles_side';
import Card_files from "../../../components/Cards/Card_articles";
import { faCalendar, faClipboard, faFaceSurprise, faHeart, faImages, faUser } from '@fortawesome/free-regular-svg-icons';
import Pub from '../../../components/Pub/Pub';
import { SystemName } from '../../../assets/data/data';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import Card_Square_user_list_presentation from '../../../components/Cards/Card_Square_user_list_presentation';
import React from 'react';
import Function_utils from '../../../components/versatile_function/usefunction_utils';
import Invited from '../../../components/Invited';


const Shop = (props) => {

    const { localTheme, promiseIdentifiedUser, promiseUsers } = useAppContext();

    const { t } = useTranslation();
    const navigate = useNavigate()

    const { addSearchToUrl } = Function_utils()

    let cashBack = promiseIdentifiedUser?.user?.coinBack || 0;
    let cashBuy = promiseIdentifiedUser?.user?.coinBuy || 0;

    

    return (
        <>
            <div className='cter_sect' style={{ flexDirection: 'row', marginTop: 20 }}>
                <div className='nav_bar_scnd' style={{ padding: 0, borderRadius: 0, width: '80%', background: 'none', minWidth: 342 }} data-theme={localTheme}>

                    <Pub pubType={'banner'} />

                    <div className='ctent_arti' style={{ marginTop: 50 }} data-theme={localTheme}>
                        <div className='nav_bar_scnd' style={{ padding: 0, marginBottom: 10 }} data-theme={localTheme}>
                            <div style={{ width: '98%' }}>
                                <h4 style={{ margin: 10 }} data-theme={localTheme}>Users <FontAwesomeIcon style={{ marginLeft: 5 }} icon={faUser} /></h4>
                            </div>
                        </div>
                        <div className='scrollbar' style={{ display: 'flex', overflow: 'auto', alignItems: 'center', width: '98%' }}>
                            <Card_Square_user_list_presentation promise={promiseUsers.promise} />
                        </div>
                    </div>
                </div>

                <div className='nav_bar_scnd' style={{ padding: 0, borderRadius: 0, width: '20%', background: 'none', minWidth: 342, height: '100%' }} data-theme={localTheme}>
                    <div className='ctent_arti' style={{ marginBottom: 20 }} data-theme={localTheme}>
                        {promiseIdentifiedUser ? <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '98%' }}>
                            <img style={{ width: 100, height: 100, borderRadius: '100%', marginTop: 20 }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='Profile_picture_nav' src={promiseIdentifiedUser?.user.imageUrl || imgProfile} alt="" />
                            <div className='title_color' style={{ textAlign: 'center', fontSize: 18, fontWeight: 800 }}>{promiseIdentifiedUser?.user.pseudo || 'none'}</div>
                            <div className='title_color' style={{ textAlign: 'center', fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 20 }}>
                                <span>{cashBack}</span>
                                <FontAwesomeIcon style={{ color: '#e3b620', marginLeft: 10 }} icon={faPiggyBank} />
                                <FontAwesomeIcon style={{ marginLeft: 10, marginRight: 10 }} icon={faArrowRightArrowLeft} />
                                {cashBuy}<FontAwesomeIcon style={{ color: '#e3b620', marginLeft: 10 }} icon={faCoins} />
                                <FontAwesomeIcon style={{ marginLeft: 10, marginRight: 10 }} icon={faArrowRight} />
                                {cashBuy + cashBack}<FontAwesomeIcon style={{ color: '#e3b620', marginLeft: 10 }} icon={faCoins} />
                            </div>

                            <div className='button_option_free' style={{ width: '90%', justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 5, margin: 3 }} data-theme={localTheme}>
                                <div><FontAwesomeIcon style={{ marginRight: 10, color: '#e3b620' }} icon={faCoins} />Buy coins</div>
                            </div>
                            <div className='button_option_free' style={{ width: '90%', justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 5, margin: 3 }} data-theme={localTheme}>
                                <div><FontAwesomeIcon style={{ marginRight: 10 }} icon={faTerminal} />Use a code</div>
                            </div>
                            <div className='button_optionHeart' style={{ width: '90%', justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 5, margin: 3 }} data-theme={localTheme}>
                                <div><FontAwesomeIcon style={{ marginRight: 10 }} icon={faHeart} />Wishlist</div>
                            </div>
                            <div onClick={() => { addSearchToUrl(`#${promiseIdentifiedUser?.user.pseudo}-accessPass`) }} className='button_optionColoringBlue' style={{ width: '90%', justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 5, margin: 3 }} >
                                <div><FontAwesomeIcon style={{ marginRight: 10 }} icon={faWandSparkles} />{!promiseIdentifiedUser?.user.accessPass && 'Start '}{t('accessPass')}</div>
                            </div>
                        </div>
                            :
                            <Invited />}

                    </div>
                    <div className='ctent_arti' style={{ marginBottom: 20 }} data-theme={localTheme}>
                        <div className='nav_bar_scnd' style={{ padding: 0, marginBottom: 10 }} data-theme={localTheme}>
                            <div style={{ width: '98%' }}>
                                <h4 style={{ margin: 10 }} data-theme={localTheme}>Filter <FontAwesomeIcon style={{ marginLeft: 5 }} icon={faFilter} /></h4>
                            </div>
                        </div>
                        <div>
                            <div style={{ marginBottom: 20, width: 'max-content' }} className="checkbox-wrapper-46Radio">
                                <input defaultChecked={true} className="inp-cbxRadio" type="radio" name="rdo2" id="opt61" />
                                <label className="cbxRadio" htmlFor="opt61">
                                    <span></span><span style={{ marginLeft: 5 }}><FontAwesomeIcon style={{ marginRight: 10 }} icon={faWandSparkles} />{t('accessPass')}</span>
                                </label>
                            </div>

                            <div style={{ marginBottom: 20, width: 'max-content' }} className="checkbox-wrapper-46Radio">
                                <input className="inp-cbxRadio" type="radio" name="rdo2" id="opt62" />
                                <label className="cbxRadio" htmlFor="opt62">
                                    <span></span><span style={{ marginLeft: 5 }}><FontAwesomeIcon style={{ marginRight: 10 }} icon={faImages} />Illustrations</span>
                                </label>
                            </div>

                            <div style={{ marginBottom: 20, width: 'max-content' }} className="checkbox-wrapper-46Radio">
                                <input className="inp-cbxRadio" type="radio" name="rdo2" id="opt63" />
                                <label className="cbxRadio" htmlFor="opt63">
                                    <span></span><span style={{ marginLeft: 5 }}><FontAwesomeIcon style={{ marginRight: 10 }} icon={faBookOpen} />Manga</span>
                                </label>
                            </div>
                        </div>

                        <input style={{ marginBottom: 20 }} className='input_text' placeholder={t('search')} type="text" name="" id="" data-theme={localTheme} />

                        <div className='button_option_free' style={{ width: '90%', justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 5, margin: 3 }} data-theme={localTheme}>
                            <div><FontAwesomeIcon style={{ marginRight: 10 }} icon={faMagnifyingGlass} />{t('search')}</div>
                        </div>

                    </div>
                </div>
            </div>

            <div className='cter_sect open-element-page-melted'>

                <div className='ctent_arti' style={{ marginBottom: 50 }} data-theme={localTheme}>
                    <div className='nav_bar_scnd' style={{ padding: 0, marginBottom: 10 }} data-theme={localTheme}>
                        <div style={{ width: '98%' }}>
                            <h4 style={{ margin: 10 }} data-theme={localTheme}>Most popular with the public <FontAwesomeIcon style={{ marginLeft: 5 }} icon={faTrophy} /></h4>
                        </div>
                    </div>
                    <div className='scrollbar' style={{ display: 'flex', overflow: 'auto', alignItems: 'center', width: '98%' }}>
                        <Card_articles_side promise={[]} />
                    </div>
                </div>

                <div className='ctent_arti' data-theme={localTheme}>
                    <div className='nav_bar_scnd' style={{ padding: 0, marginBottom: 10 }} data-theme={localTheme}>
                        <div style={{ width: '98%' }}>
                            <h4 style={{ margin: 10 }} data-theme={localTheme}>New Add it's last month <FontAwesomeIcon style={{ marginLeft: 5 }} icon={faCalendar} /></h4>
                        </div>
                    </div>
                    {props.renderCardFilesWithAds()}
                </div>
            </div>
        </>
    )
}

export default Shop