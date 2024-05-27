import Picture from '../../assets/images/logo.png';
import { useAppContext } from '../../contexts/UseAppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faImages, faPen, faWandSparkles } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { faGem, faImage, faPenToSquare, faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import { NSFW, SystemName } from '../../assets/data/data';
import { useTranslation } from 'react-i18next';
import { useWorkspaceContext } from '../../contexts/UseWorkspaceContexte';
import Function_utils from '../versatile_function/usefunction_utils';
import ContextMenuCard from './contextMenuCard';


const Card_articles_side = (props) => {

    const navigate = useNavigate()
    const { t } = useTranslation();

    const { localTheme,
        handleFullScreen,
        promiseIdentifiedUser } = useAppContext();

    const {
        handleContextMenu,
        isVisible,
        position,
        contextMenuRef,
        setIsVisible
    } = Function_utils();

    const { GetMyFileFromLocal } = useWorkspaceContext();


    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const idUrl = parseInt(searchParams.get("file"));

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Ajoute un effet de défilement doux
        });
    }

    //const HandleSetLocale = (el) => {
    //    // Récupérez les données existantes depuis localStorage (s'il y en a)
    //    const localData = JSON.parse(localStorage.getItem('tab-Work-Place')) || [];
    //      const uniqueData = [el].filter((newItem) => {
    //        // Vérifiez si l'élément existe déjà dans les données existantes
    //        return !localData.some((existingItem) => existingItem.id === newItem.id);
    //      });
    //      // Étape 3 : Ajoutez uniquement les éléments uniques
    //      const updatedData = [...localData, ...uniqueData];
    //      // Étape 4 : Mettez à jour les données du localStorage
    //      localStorage.setItem('tab-Work-Place', JSON.stringify(updatedData));
    //      navigate(`/works/file/${el.id}`)
    //  }

    // {promise.createdAt && <div style={{ color: '#0078e9' }}>{dayjs(`${promise.createdAt.split('.')[0].split('T')[0]} ${parseInt(promise.createdAt.split('.')[0].split('T')[1].split(':')[0]) + 2}:${promise.createdAt.split('.')[0].split('T')[1].split(':')[1]}:${promise.createdAt.split('.')[0].split('T')[1].split(':')[2]}`).locale("fr").fromNow()}</div>}
    // data-background={localThemeBackground}


    if (!props.promise) return (
        <>
            {[1, 2, 3, 4, 5, 6, 7]?.map((num) => (
                <div className='card_post loarder_article_in animation' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 80, color: '#8080804d' }} data-theme={localTheme} key={num}>
                    <FontAwesomeIcon icon={faImage} />
                </div>
            ))}
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

            {props.promise?.map((promise, index) => (
                <div style={{ margin: 5, scrollSnapAlign: props.seeFile? promise.id == props.promiseRefs ? 'center' : 'none' : 'none', border: idUrl === promise.id ? `1px solid #0077ff` : `1px solid transparent`, padding: 3, borderRadius: 10 }} key={index}>
                    <div className='article_card_menu'>
                        <div onClick={() => { navigate(`/profile/${promise.user.id}/home?type=Illustrations`) }} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', width: 'max-content', overflow: 'hidden' }}>
                            {promiseIdentifiedUser ? <>
                                {promiseIdentifiedUser.user.id == promise.user.id && <img loading="lazy" className='article_card_menu_img' onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} src={promiseIdentifiedUser.user.imageUrl || Picture} alt='' />}
                                {promiseIdentifiedUser.user.id != promise.user.id && <img loading="lazy" className='article_card_menu_img' onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} src={promise.user.imageUrl || Picture} alt='' />}
                            </> : <img loading="lazy" className='article_card_menu_img' onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} src={promise.user.imageUrl || Picture} alt='' />}
                            <div className='article_card_menu_text'>
                                {promise.user.pseudo}
                            </div>
                        </div>
                        {promiseIdentifiedUser && <>
                            <div style={{ display: 'flex', width: 'max-content', alignItems: 'center', justifyContent: 'end' }}>
                                <div onClick={(event) => { handleContextMenu(event, promise, promiseIdentifiedUser?.user.adultAccess === true || promise.adult === false, promiseIdentifiedUser.user.id == promise.user.id) }} className='buttonCircle' style={{ marginRight: 0 }} data-theme={localTheme}>
                                    <FontAwesomeIcon style={{ fontSize: 13 }} icon={faEllipsis} />
                                </div>
                            </div>
                        </>}
                    </div>
                    <div onContextMenu={(event) => {
                        event.preventDefault()
                        handleContextMenu(event, promise, promiseIdentifiedUser?.user.adultAccess === true || promise.adult === false, promiseIdentifiedUser.user.id == promise.user.id)
                    }} className="container_interest hovercursor" style={{ width: 180, borderRadius: 5 }} onClick={() => { navigate(`/file/page_file/page?file_type=${promise.type}&file=${promise.id}&index=1`) }}>
                        <img loading="lazy" src={promise.miniature} alt="" style={{ objectPosition: `50% 20%`, borderRadius: 5, objectFit: 'cover', width: '100%', height: 200 }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />

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
                    </div>
                </div>
            ))}
        </>
    )
}
export default Card_articles_side

// <div style={{ backgroundImage: `url(${promise.miniature || Picture})`, backgroundPosition: `50% ${promise.resize}%`, borderRadius: 5 }} className='CoverImage FlexEmbed FlexEmbed--2by1_card' />