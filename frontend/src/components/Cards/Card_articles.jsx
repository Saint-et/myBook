import Picture from '../../assets/images/logo.png';
import Picture_adult from '../../assets/images/adult.jpg';
import { useAppContext } from '../../contexts/UseAppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faBookOpen, faBoxes, faEllipsis, faImages, faPen, faWandSparkles } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { spinner } from '../../utils';
import { faGem, faHeart, faImage, faPenToSquare, faPlusSquare, faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import { NSFW, SystemName } from '../../assets/data/data';
import { useTranslation } from 'react-i18next';
import { useWorkspaceContext } from '../../contexts/UseWorkspaceContexte';
import { useEffect, useRef, useState } from 'react';
import Function_utils from '../versatile_function/usefunction_utils';
import ContextMenuCard from './contextMenuCard';


const Card_articles = (props) => {

    const navigate = useNavigate()
    const { t } = useTranslation();

    const { localTheme,
        handleFullScreen,
        promiseIdentifiedUser } = useAppContext();

    const { GetMyFileFromLocal  } = useWorkspaceContext();

    const {
        handleContextMenu,
        isVisible,
        position,
        contextMenuRef,
        setIsVisible
    } = Function_utils()

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Ajoute un effet de défilement doux
        });
    }

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const idUrl = parseInt(searchParams.get("file"));

    const handleLink = (promise) => {
        if (props.accessPass) {
            return `/ArtVibes-accessPass/page-accessPass?file=${promise.id}`
        }
        return `/file/page_file/page?file_type=${promise.type}&file=${promise.id}&index=1`
    }

    if (!props.promise) return (
        <>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]?.map((num) => (
                    <div className='article_card animation' data-theme={localTheme} key={num}>
                        <div className='loarder_article_in' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 80, color: '#8080804d' }}>
                            <FontAwesomeIcon icon={faImage} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )

    if (props.promise?.length === 0) return (
        <>
            <div className='cter_sect' style={{ fontSize: 20, paddingTop: 30 }}>
                <h4 style={{ color: 'grey' }}>No results</h4>
            </div>
        </>
    )

    return (
        <>
            <ContextMenuCard isVisible={isVisible} setIsVisible={setIsVisible} position={position} contextMenuRef={contextMenuRef} />

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                {props.promise?.map((promise, index) => (
                    <div className='article_card animation' style={{ border: idUrl === promise.id ? `1px solid #0077ff` : `1px solid transparent`, padding: 3, borderRadius: 10}} data-theme={localTheme} key={promise.id}>
                        <Link onContextMenu={(event) => {
                            if (promiseIdentifiedUser) {
                                if (promiseIdentifiedUser?.user.adultAccess === true || promise.adult === false) {
                                    handleContextMenu(event, promise, promiseIdentifiedUser?.user.adultAccess === true || promise.adult === false, promiseIdentifiedUser.user.id == promise.user.id)
                                }
                            } else {
                                handleContextMenu(event, promise, true, false)
                            }
                            event.preventDefault()
                        }} to={handleLink(promise)} className="container_interest hovercursor" onClick={scrollTop} style={{ maxWidth: '100%', borderRadius: 10 }}>
                            <img loading="lazy" src={promiseIdentifiedUser && promiseIdentifiedUser?.user.adultAccess === false && promise.adult && Picture_adult || promise.miniature || Picture} alt="" style={{ objectPosition: `50% 20%`, borderRadius: 5, objectFit: 'cover', width: '100%', height: 200 }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />

                            <div className="overlay_interest">
                                <div style={{ paddingTop: 5, display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                        {props.type && <div className='badge' style={{ marginLeft: 5 }} data-theme={localTheme}>{promise.type}</div>}
                                        {promise.imagesCount && <div className='badge' style={{ borderRadius: 5, marginLeft: 5, display: 'flex', alignItems: 'center' }} data-theme={localTheme}>{promise.imagesCount}
                                            <FontAwesomeIcon style={{ fontSize: 12, marginLeft: 5 }} icon={faImages} />
                                        </div>}
                                        {promise.adult === true && <div className='adult' style={{ marginLeft: 5 }} translate='no'>{NSFW}</div>}
                                        {promise.shop === true && <div className='badgeShop' style={{ marginLeft: 5 }}>{<FontAwesomeIcon icon={faWandSparkles} />}</div>}
                                        {promise.diamond === true && <div className='badgeColoring' style={{ marginLeft: 5 }}>{<FontAwesomeIcon icon={faGem} />}</div>}
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {promise.user && <>
                            {!props.button ? <>
                                <div className='article_card_menu'>
                                    <div onClick={() => { navigate(`/profile/${promise.user.id}/home?type=Illustrations`) }} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', width: 'max-content', overflow: 'hidden' }}>
                                        {promiseIdentifiedUser ? <>
                                            {promiseIdentifiedUser.user.id == promise.user.id && <img loading="lazy" className='article_card_menu_img' onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} src={promiseIdentifiedUser.user.imageUrl || Picture} alt='' />}
                                            {promiseIdentifiedUser.user.id != promise.user.id && <img loading="lazy" className='article_card_menu_img' onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} src={promise.user.imageUrl || Picture} alt='' />}
                                        </> : <img loading="lazy" className='article_card_menu_img' onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} src={promise.user.imageUrl || Picture} alt='' />}
                                        <div className='article_card_menu_text'>
                                            <div className='article_card_title'>{promise.name.charAt(0).toUpperCase() + promise.name.slice(1)}</div>
                                            {promise.user.pseudo}
                                        </div>
                                    </div>

                                    {promiseIdentifiedUser && <>
                                        <div style={{ display: 'flex', width: 'max-content', alignItems: 'center', justifyContent: 'end' }}>
                                            <div onClick={(event) => { handleContextMenu(event, promise, promiseIdentifiedUser?.user.adultAccess === true || promise.adult === false, promiseIdentifiedUser.user.id == promise.user.id) }} style={{ marginRight: 0 }} className='buttonCircle' data-theme={localTheme}>
                                                <FontAwesomeIcon style={{ fontSize: 13 }} icon={faEllipsis} />
                                            </div>
                                        </div>
                                    </>}
                                </div></>
                                :
                                <><div className='article_card_menu'>
                                    <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', width: 'max-content', overflow: 'hidden' }}>
                                        <div className='article_card_menu_text'>
                                            <div className='article_card_title'>{promise.name.charAt(0).toUpperCase() + promise.name.slice(1)}</div>
                                        </div>
                                    </div>
                                    {promiseIdentifiedUser && <>
                                        <div style={{ display: 'flex', width: 'max-content', alignItems: 'center', justifyContent: 'end' }}>
                                            <div onClick={(event) => { handleContextMenu(event, promise, promiseIdentifiedUser?.user.adultAccess === true || promise.adult === false, promiseIdentifiedUser.user.id == promise.user.id) }} className='buttonCircle' data-theme={localTheme}>
                                                <FontAwesomeIcon style={{ fontSize: 13 }} icon={faEllipsis} />
                                            </div>
                                        </div>
                                    </>}
                                </div></>}
                        </>}


                    </div>
                ))}
            </div >
        </>
    )
}
export default Card_articles

// <div style={{ backgroundImage: `url(${promise.miniature || Picture})`, backgroundPosition: `50% ${promise.resize}%`, borderRadius: 5 }} className='CoverImage FlexEmbed FlexEmbed--2by1_card' />