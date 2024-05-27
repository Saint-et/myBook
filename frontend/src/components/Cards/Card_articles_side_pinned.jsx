import Picture from '../../assets/images/logo.png';
import { useAppContext } from '../../contexts/UseAppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faBagShopping, faBookOpen, faBoxes, faEllipsis, faExpand, faImages, faPen, faWandSparkles } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { spinner } from '../../utils';
import { faEyeSlash, faGem, faImage, faPenToSquare, faPlusSquare, faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import { NSFW, SystemName } from '../../assets/data/data';
import { useTranslation } from 'react-i18next';
import { useWorkspaceContext } from '../../contexts/UseWorkspaceContexte';
import Function_utils from '../versatile_function/usefunction_utils';
import ContextMenuCard from './contextMenuCard';


const Card_articles_side_pinned = (props) => {

    const navigate = useNavigate()
    const { t } = useTranslation();

    const { localTheme, handleFullScreen, promiseIdentifiedUser } = useAppContext();
    const { GetMyFileFromLocal } = useWorkspaceContext();

    const {
        handleContextMenu,
        isVisible,
        position,
        contextMenuRef,
        setIsVisible
    } = Function_utils()


    if (!props.promise) return (
        <>
            {[1, 2, 3, 4, 5, 6, 7]?.map((num) => (
                <div className='card_post loarder_article_in animation' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 80, color: '#8080804d' }} data-theme={localTheme} key={num}>
                    <FontAwesomeIcon icon={faImage} />
                </div>
            ))}
        </>
    )

    if (props.promise === 'private') return (
        <>
            <div className='cter_sect' style={{ paddingTop: 30 }}>
                <h4 style={{ color: 'grey' }}><FontAwesomeIcon icon={faEyeSlash} />Private</h4>
            </div>
        </>
    )

    if (props.promise?.length === 0) return (
        <>
            <div className='cter_sect' style={{ paddingTop: 30 }}>
                <h4 style={{ color: 'grey' }}>No results</h4>
            </div>
        </>
    )

    return (
        <>
            <ContextMenuCard isVisible={isVisible} setIsVisible={setIsVisible} position={position} contextMenuRef={contextMenuRef} />

            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                {props.promise?.map((promise, index) => (
                    <div style={{ margin: 5 }} key={index}>
                        <div className='article_card_menu'>
                            <div onClick={() => { navigate(`/profile/${promise.file.user.id}/home?type=Illustrations`) }} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', width: 'max-content', overflow: 'hidden' }}>
                                {promiseIdentifiedUser ? <>
                                    {promiseIdentifiedUser.user.id == promise.file.user.id && <img loading="lazy" className='article_card_menu_img' onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} src={promiseIdentifiedUser.user.imageUrl || Picture} alt='' />}
                                    {promiseIdentifiedUser.user.id != promise.file.user.id && <img loading="lazy" className='article_card_menu_img' onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} src={promise.file.user.imageUrl || Picture} alt='' />}
                                </> : <img loading="lazy" className='article_card_menu_img' onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} src={promise.file.user.imageUrl || Picture} alt='' />}
                                <div className='article_card_menu_text'>
                                    <div className='article_card_title'>{promise.file.name.charAt(0).toUpperCase() + promise.file.name.slice(1)}</div>
                                    <div style={{ fontSize: 12 }}>{promise.file.user.pseudo}</div>
                                </div>
                            </div>
                            {promiseIdentifiedUser && <div style={{ display: 'flex', width: 'max-content', alignItems: 'center', justifyContent: 'end' }}>
                                <div onClick={(event) => { handleContextMenu(event, promise.file, promiseIdentifiedUser?.user.adultAccess === true || promise.file.adult === false, promiseIdentifiedUser.user.id == promise.file.user.id) }} className='buttonCircle' style={{ marginRight: 0 }} data-theme={localTheme}>
                                    <FontAwesomeIcon style={{ fontSize: 13 }} icon={faEllipsis} />
                                </div>
                            </div>}
                        </div>
                        {/*<img onContextMenu={(event) => {
                            event.preventDefault()
                            handleContextMenu(event, promise.file, promiseIdentifiedUser?.user.adultAccess === true || promise.file.adult === false, promiseIdentifiedUser.user.id == promise.file.user.id)
                        }} className='hovercursor' onClick={() => { navigate(`/file/page_file/page?file_type=${promise.file.type}&file=${promise.file.id}&index=0`) }} loading="lazy" src={promise.file.miniature} style={{ objectFit: 'cover', objectPosition: `50% ${10}%`, borderRadius: 5, cursor: 'pointer', height: 200, width: 180, marginTop: 5 }} alt="" onMouseDown={(e) => e.preventDefault()} />

                        <div style={{ display: 'flex', marginBottom: 5, height: 23 }}>
                            <div className='badge' style={{ borderRadius: 5, marginRight: 5, display: 'flex', alignItems: 'center' }} data-theme={localTheme}>{promise.file.imagesCount}
                                <FontAwesomeIcon style={{ fontSize: 12, marginLeft: 5 }} icon={faImages} />
                            </div>

                            {promise.file.adult === true && <div className='adult' style={{ marginRight: 5 }} translate='no'>{NSFW}</div>}
                            {promise.file.shop == 1 && <div className='badgeShop' style={{ marginRight: 5 }}>{<FontAwesomeIcon icon={faWandSparkles} />}</div>}
                            {promise.file.diamond === true && <div className='badgeColoring' style={{ marginRight: 5 }}>{<FontAwesomeIcon icon={faGem} />}</div>}
                    </div>*/}

                        <div onContextMenu={(event) => {
                            event.preventDefault()
                            handleContextMenu(event, promise.file, promiseIdentifiedUser?.user.adultAccess === true || promise.file.adult === false, promiseIdentifiedUser.user.id == promise.file.user.id)
                        }} className="container_interest hovercursor" style={{ width: 180, borderRadius: 5 }} onClick={() => { navigate(`/file/page_file/page?file_type=${promise.file.type}&file=${promise.file.id}&index=1`) }}>
                            <img loading="lazy" src={promise.file.miniature} alt="" style={{ objectPosition: `50% 20%`, borderRadius: 5, objectFit: 'cover', width: '100%', height: 200 }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />

                            <div className="overlay_interest">
                                <div style={{ paddingTop: 5, display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                        {props.type && <div className='badge' style={{ marginLeft: 5 }} data-theme={localTheme}>{promise.file.type}</div>}
                                        {promise.file.imagesCount && <div className='badge' style={{ borderRadius: 5, marginLeft: 5, display: 'flex', alignItems: 'center' }} data-theme={localTheme}>{promise.file.imagesCount}
                                            <FontAwesomeIcon style={{ fontSize: 12, marginLeft: 5 }} icon={faImages} />
                                        </div>}
                                        {promise.file.adult === true && <div className='adult' style={{ marginLeft: 5 }} translate='no'>{NSFW}</div>}
                                        {promise.file.shop === true && <div className='badgeShop' style={{ marginLeft: 5 }}>{<FontAwesomeIcon icon={faWandSparkles} />}</div>}
                                        {promise.file.diamond === true && <div className='badgeColoring' style={{ marginLeft: 5 }}>{<FontAwesomeIcon icon={faGem} />}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
export default Card_articles_side_pinned