import { useAppContext } from "../../../contexts/UseAppContext";
import { CashBack_data, CashBack_data_premium, SystemLogo } from "../../../assets/data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown, faArrowRight, faArrowRightArrowLeft, faBoxes, faChartLine, faCoins, faExclamationTriangle, faLink, faPiggyBank, faShare, faSortDown, faSortUp, faSquareArrowUpRight, faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faClipboard, faHeart, faImages, faPenToSquare, faUser } from "@fortawesome/free-regular-svg-icons";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useWorkspaceContext } from "../../../contexts/UseWorkspaceContexte";
import { RemoveScroll } from "react-remove-scroll";
import axios from "axios";
import { API_URL } from "../../../config";




const Page_article = (props) => {
    const { t } = useTranslation();

    const { localTheme, promiseIdentifiedUser, handleFullScreen, GetMyProfilFromAPI, GetNotifFromAPI } = useAppContext();

    const { GetMyFileFromLocal, setPromiseFileStatistical } = useWorkspaceContext();


    const [hiddenMenu, setHiddenMenu] = useState(false)

    const [useCash, setUseCash] = useState(false)
    const [coin, setCoin] = useState(0)


    // let coin = useOnlyCashBack ? promiseIdentifiedUser?.user.coinBack : useCashBack ? promiseIdentifiedUser?.user.coinBuy + promiseIdentifiedUser?.user.coinBack : promiseIdentifiedUser?.user.coinBuy;

    let cashBackSession = promiseIdentifiedUser?.user?.coinBack || 0;
    let cashBuy = promiseIdentifiedUser?.user?.coinBuy || 0;


    const BuyArticle = async (id, userId) => {
        try {
            await axios.post(`${API_URL}api/eventv/access-pass/buy/file/${id}`,
                {
                    fileId: id,
                    userId: userId,
                    price: props.realCash,
                    cashBack: props.cashBack,
                    img: props.promiseFile?.images[0]?.imageUrl,
                    name: props.promiseFile?.name,
                    useCash: useCash
                },
                { withCredentials: true })
                .then(() => {
                    GetMyProfilFromAPI()
                    GetNotifFromAPI()
                })
        } catch (error) {

        }
    }

    useEffect(() => {
        if (!promiseIdentifiedUser) {
            return;
        }
        if (useCash) {
            return setCoin(promiseIdentifiedUser?.user.coinBuy + promiseIdentifiedUser?.user.coinBack)
        }
        return setCoin(promiseIdentifiedUser?.user.coinBuy)
    }, [useCash, promiseIdentifiedUser])


    return (
        <>
            {promiseIdentifiedUser && <>
                {promiseIdentifiedUser?.user.id !== props.promiseFile?.adminId && <>
                    {hiddenMenu && <div className='blanket_nav open-element-page-melted' style={{
                        zIndex: 200
                    }} >
                        <RemoveScroll
                            style={{
                                width: '90%',
                                maxWidth: 500,
                                height: 'auto',
                                overflow: 'auto',
                                position: 'fixed',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)'
                            }}
                            removeScrollBar={false} className='menu_navbar menu_navbar_nav980 menu_navbar_navPc scrollbar' data-theme={localTheme}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                                <img style={{ width: 200, height: 200, marginTop: 25, borderRadius: 5, objectFit: 'cover', objectPosition: '50% 20%' }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}
                                    src={props.promiseFile?.miniature || SystemLogo} alt="" />
                                <h4 className='title_color' style={{ textAlign: 'center', fontSize: 18, margin: '5px 3px 5px 3px' }}>{props.promiseFile?.name}</h4>
                                <div style={{ fontSize: 20 }}>Price: <span style={{ fontWeight: 600 }}>{props.realCash}</span><FontAwesomeIcon style={{ marginLeft: 5, color: '#e3b620' }} icon={faCoins} /></div>

                                <div style={{ padding: 10, border: '1px solid grey', marginTop: 20, borderRadius: 5 }}>
                                    <div>Your coins :</div>
                                    <div className='title_color' style={{ textAlign: 'center', fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 20 }}>
                                        <span>{cashBackSession}</span>
                                        <FontAwesomeIcon style={{ color: '#e3b620', marginLeft: 10 }} icon={faPiggyBank} />
                                        <FontAwesomeIcon style={{ marginLeft: 10, marginRight: 10 }} icon={faArrowRightArrowLeft} />
                                        {cashBuy}<FontAwesomeIcon style={{ color: '#e3b620', marginLeft: 10 }} icon={faCoins} />
                                        <FontAwesomeIcon style={{ marginLeft: 10, marginRight: 10 }} icon={faArrowRight} />
                                        {cashBuy + cashBackSession}<FontAwesomeIcon style={{ color: '#e3b620', marginLeft: 10 }} icon={faCoins} />
                                    </div>
                                </div>


                                <div style={{ padding: 10, border: '1px solid grey', marginTop: 20, borderRadius: 5 }}>
                                    <div>Before purchase : {coin}
                                        {useCash === 0 && <><FontAwesomeIcon style={{ marginLeft: 5, marginRight: 5, color: '#e3b620' }} icon={faCoins} /></>}
                                        {useCash === 1 && <>
                                            <FontAwesomeIcon style={{ marginLeft: 5, marginRight: 5, color: '#e3b620' }} icon={faPiggyBank} />
                                            +
                                            <FontAwesomeIcon style={{ marginLeft: 5, color: '#e3b620' }} icon={faCoins} />
                                        </>}
                                    </div>

                                    <div style={{ marginTop: 20 }}>Cash back : <span style={{ marginTop: 20, color: '#00b09b' }}>
                                        {props.cashBack}<FontAwesomeIcon style={{ marginLeft: 5, color: '#e3b620' }} icon={faCoins} /></span>
                                    </div>

                                    <div style={{ marginTop: 20 }}>After purchase : <span style={{ marginTop: 20, color: coin - props.realCash < 0 ? 'red' : '#00b09b' }}>
                                        {coin - props.realCash}<FontAwesomeIcon style={{ marginLeft: 5, color: '#e3b620' }} icon={faCoins} /></span>
                                    </div>
                                </div>

                                <div style={{ padding: 10, border: '1px solid grey', marginTop: 20, borderRadius: 5 }}>

                                    <div className="checkbox-wrapper-46Radio" style={{ marginLeft: 10, width: 'max-content' }}>
                                        <input className="inp-cbxRadio" onChange={() => { setUseCash(false) }} type="radio" name="rdo2" id="opt0" checked={useCash === false} />
                                        <label className="cbxRadio" htmlFor="opt0">
                                            <span></span><span style={{ marginLeft: 10 }}>Coins<FontAwesomeIcon style={{ marginLeft: 5, color: '#e3b620' }} icon={faCoins} /></span>
                                        </label>
                                    </div>

                                    <div className="checkbox-wrapper-46Radio" style={{ marginTop: 10, marginLeft: 10, width: 'max-content' }}>
                                        <input className="inp-cbxRadio" onChange={() => { setUseCash(true) }} type="radio" name="rdo2" id="opt1" checked={useCash === true} />
                                        <label className="cbxRadio" htmlFor="opt1">
                                            <span></span><span style={{ marginLeft: 10 }}>Coins and Cash back
                                                <FontAwesomeIcon style={{ marginLeft: 5, marginRight: 5, color: '#e3b620' }} icon={faPiggyBank} />
                                                +
                                                <FontAwesomeIcon style={{ marginLeft: 5, color: '#e3b620' }} icon={faCoins} /></span>
                                        </label>
                                    </div>

                                </div>


                                <div onClick={() => { BuyArticle(props.promiseFile?.id, props.promiseFile?.adminId) }} className={coin - props.realCash < 0 ? 'button_optionDisable' : 'button_optionBlue'} style={{ width: '90%', maxWidth: 300, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 5, margin: '10px 3px 3px 3px' }} data-theme={localTheme}>
                                    <div>Buy</div>
                                </div>

                                <div onClick={() => { setHiddenMenu(false) }} className='button_option_free' style={{ width: '90%', maxWidth: 300, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 5, margin: '10px 3px 3px 3px' }} data-theme={localTheme}>
                                    <div>{t('cancel')}</div>
                                </div>
                            </div>
                        </RemoveScroll>
                    </div>}
                </>}
            </>}

            <div className='cter_sect open-element-page-melted'>
                <div className='rowDoubleposition'>
                    <div className='rowDoublepositionContent' style={{ background: 'none', justifyContent: 'start' }} data-theme={localTheme}>
                        <div className='ctent_arti' style={{ height: '100%' }} data-theme={localTheme}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10, height: '50vh' }}>
                                <img onClick={() => { handleFullScreen({ img: props.promiseFile?.images[props.indexImg]?.imageUrl }) }} style={{ height: 'max-content', maxHeight: '50vh', width: '98%', borderRadius: 5, cursor: 'pointer' }}
                                    src={props.promiseFile?.images[props.indexImg]?.imageUrl || SystemLogo} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} alt="" />
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                                {props.promiseFile?.images?.map((promise, index) => (
                                    <img onClick={() => { props.setIndexImg(index) }}
                                        className="hovercursor"
                                        style={{
                                            height: 100, width: 100, borderRadius: 5, cursor: 'pointer', padding: 4, margin: 2, objectFit: 'cover',
                                            border: props.indexImg === index ? '4px solid #0077ff' : '4px solid transparent', objectPosition: '50% 20%'
                                        }}
                                        src={promise.imageUrl || SystemLogo} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} alt="" key={promise.id} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='rowDoublepositionContent' style={{ background: 'none', justifyContent: 'start' }} data-theme={localTheme}>
                        <div className='ctent_arti' style={{ height: '100%' }} data-theme={localTheme}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '98%', maxWidth: 500 }}>

                                {/*<div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20, marginTop: 20 }}>
                                    <div style={{ backgroundImage: `url(${props.promiseFile?.user.imageUrlCover || SystemLogo})`, backgroundPosition: `50% ${props.promiseFile?.user.resizeImageUrlCover}%`, borderRadius: 15 }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='CoverImage FlexEmbed FlexEmbed--2by1'></div>
                                    <div style={{ zIndex: 10, textDecoration: 'none' }} to={`/profile/${props.promiseFile?.user.id}/home?type=Illustrations`} data-theme={localTheme}>
                                        <img style={{ width: 100, height: 100, borderRadius: '100%', marginTop: -100 }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='Profile_picture_nav' src={props.promiseFile?.user.imageUrl || SystemLogo} alt="" />
                                        <div className='title_color text' style={{ textAlign: 'center', fontSize: 18, fontWeight: 800 }} data-theme={localTheme}>{props.promiseFile?.user.pseudo}</div>
                                    </div>
                            </div>*/}

                                <img style={{ width: 60, height: 60, marginTop: 10, borderRadius: '100%' }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}
                                    src={props.promiseFile?.user.imageUrl || SystemLogo} alt="" />
                                <div>{props.promiseFile?.user.pseudo}<FontAwesomeIcon style={{ marginLeft: 5 }} icon={faUser} /></div>

                                <div className='title_color' style={{ textAlign: 'center', fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 20 }}>
                                    <span>{props.cashBackSession}</span>
                                    <FontAwesomeIcon style={{ color: '#e3b620', marginLeft: 10 }} icon={faPiggyBank} />
                                    <FontAwesomeIcon style={{ marginLeft: 10, marginRight: 10 }} icon={faArrowRightArrowLeft} />
                                    {props.cashBuy}<FontAwesomeIcon style={{ color: '#e3b620', marginLeft: 10 }} icon={faCoins} />
                                    <FontAwesomeIcon style={{ marginLeft: 10, marginRight: 10 }} icon={faArrowRight} />
                                    {props.cashBuy + props.cashBackSession}<FontAwesomeIcon style={{ color: '#e3b620', marginLeft: 10 }} icon={faCoins} />
                                </div>

                                <img style={{ width: 200, height: 200, marginTop: 25, borderRadius: 5, objectFit: 'cover', objectPosition: '50% 20%' }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}
                                    src={props.promiseFile?.miniature || SystemLogo} alt="" />
                                <h4 className='title_color' style={{ textAlign: 'center', fontSize: 18, margin: '5px 3px 5px 3px' }}>{props.promiseFile?.name}</h4>
                                <div style={{ fontSize: 20 }}><span style={{ fontWeight: 600 }}>{props.realCash}</span><FontAwesomeIcon style={{ marginLeft: 5, color: props.realCash <= cashBuy + cashBackSession ? '#00b09b' : '#f00000' }} icon={props.realCash <= cashBuy + cashBackSession ? faSortUp : faSortDown} /><FontAwesomeIcon style={{ marginLeft: 5, color: '#e3b620' }} icon={faCoins} /></div>

                                <div>total purchase :{props.promiseFile?.purchase}<FontAwesomeIcon style={{ marginLeft: 5 }} icon={faBoxes} /></div>

                                <div style={{ display: 'flex', flexWrap: 'wrap', margin: '30px 0px 0px 0px', justifyContent: 'center' }}>
                                    {promiseIdentifiedUser && <>
                                        {promiseIdentifiedUser?.user.id !== props.promiseFile?.adminId && <>
                                            <div onClick={() => { setHiddenMenu(true) }} className='button_optionBlue' style={{ width: '94%', justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 5, margin: 3 }} data-theme={localTheme}>
                                                <div>Proceed to payment</div>
                                            </div>
                                            <div className='button_optionHeart' style={{ width: '46%', justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 5, margin: 3 }} data-theme={localTheme}>
                                                <div><FontAwesomeIcon style={{ marginRight: 10 }} icon={faHeart} />{t('addTo')} Wishlist</div>
                                            </div></>}
                                    </>}
                                    <div className='button_option_free' style={{ width: '46%', justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 5, margin: 3 }} data-theme={localTheme}>
                                        <div><FontAwesomeIcon style={{ marginRight: 10 }} icon={faLink} />{t('link')}</div>
                                    </div>
                                    <div className='button_option_free' style={{ width: '46%', justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 5, margin: 3 }} data-theme={localTheme}>
                                        <div><FontAwesomeIcon style={{ marginRight: 10 }} icon={faShare} />{t('share')}</div>
                                    </div>
                                    {promiseIdentifiedUser && <>
                                        {parseInt(promiseIdentifiedUser?.user.id) === props.promiseFile?.adminId && <><div onClick={() => { GetMyFileFromLocal(props.promiseFile?.id) }} className='button_option_free' style={{ width: '46%', justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 5, margin: 3 }} data-theme={localTheme}>
                                            <div><FontAwesomeIcon style={{ marginRight: 10 }} icon={faPenToSquare} />{t('workspace')}</div>
                                        </div>
                                        </>}
                                    </>}
                                    <Link to={`/file/page_file/page?file_type=${props.promiseFile?.type}&file=${props.promiseFile?.id}&index=0`} className='button_option_free' style={{ width: '46%', justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 5, margin: 3 }} data-theme={localTheme}>
                                        <div>{t('seeMore')}<FontAwesomeIcon style={{ marginLeft: 10 }} icon={faSquareArrowUpRight} /></div>
                                    </Link>
                                </div>

                                <div className="scrollbar" style={{ height: 200, overflow: 'auto', color: 'grey' }}>
                                    <h4 style={{ color: '#0077ff' }}>Important :</h4>
                                    <p>Nous vous informons que dès que vous achetez un fichier sur notre plateforme, vous pouvez le télécharger instantanément. Une fois que vous avez effectué l'achat avec succès, le fichier est immédiatement disponible en téléchargement dans votre espace personnel.</p>
                                    <p>Il est important de noter que le propriétaire du fichier peut toujours le modifier et que vous aurez un accès continu au fichier tant que le propriétaire du fichier ne le supprime pas de notre plateforme. Cela signifie que vous pouvez le télécharger et le consulter à tout moment, tant qu'il est disponible sur notre site.</p>
                                    <p>Nous vous encourageons à sauvegarder le fichier sur votre appareil ou dans un espace de stockage sécurisé pour un accès facile et rapide à l'avenir. De cette façon, vous pourrez profiter pleinement du contenu que vous avez acheté, même si le propriétaire du fichier décide de le retirer ultérieurement.</p>
                                </div>
                                {promiseIdentifiedUser && <>
                                    {promiseIdentifiedUser?.user.isAdmin === true && <div className='button_optionGreen' onClick={() => { setPromiseFileStatistical(props.promiseFile?.id) }} style={{ width: '90%', justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 5, margin: '30px 3px 3px 3px' }} data-theme={localTheme}>
                                        <div>{t('admin')}<FontAwesomeIcon style={{ marginLeft: 10 }} icon={faUserSecret} /></div>
                                    </div>}
                                </>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='ctent_arti' data-theme={localTheme}>
                    <div className='nav_bar_scnd' style={{ padding: 0, marginBottom: 10 }} data-theme={localTheme}>
                        <div style={{ width: '98%' }}>
                            <h4 style={{ margin: 10 }} data-theme={localTheme}>Similar <FontAwesomeIcon style={{ marginLeft: 5 }} icon={faImages} /></h4>
                        </div>
                    </div>
                    {props.renderCardFilesWithAds()}
                </div>
            </div>
        </>
    )
}

export default Page_article