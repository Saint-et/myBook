import Picture from '../../assets/images/logo.png';
import { useAppContext } from '../../contexts/UseAppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxes, faPenToSquare, faImages } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { spinner } from '../../utils';
import dayjs from "dayjs";
require("dayjs/locale/fr");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);


const Card_articles = (props) => {

    const navigate = useNavigate()

    const { localTheme,
        setHiddenMenuMiniProfil,
        setHiddenMenu,
        promiseIdentifiedUser } = useAppContext();



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


    if (!promiseIdentifiedUser || !props.promise) return (
        <>
            <div className='cter_sect' style={{ fontSize: 20, paddingTop: 30 }}>
                    {spinner()}
            </div>
        </>
    )

    if (props.promise.length === 0) return (
        <>
            <div className='cter_sect' style={{ fontSize: 20, paddingTop: 30 }}>
                    <FontAwesomeIcon icon={faBoxes} />
                    <div>No results</div>
            </div>
        </>
    )

    return (
        <>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                {props.promise?.map((promise) => (
                    <div className='article_card hovershadow animation' data-theme={localTheme} key={promise.id}>


                        <div className='article_card_title' translate='no'>{promise.name.charAt(0).toUpperCase() + promise.name.slice(1)}</div>

                        <div style={{ maxWidth: '100%', borderRadius: 5 }} className="container_interest" title='Click to learn more'>
                            <img loading="lazy" src={promise.miniature || Picture} alt="" style={{objectPosition: `50% 50%`, borderRadius: 5, objectFit: 'cover', width: '100%', height: 200}} />
                            
                            <div className="overlay_interest">
                                <div style={{ paddingTop: 5, display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex' }}>
                                        {promise.adult == 1 && <Link to={'/parameters/customization'} className='adult' style={{ marginLeft: 5 }} translate='no'>18+</Link>}
                                        {promise.adult == 2 && <Link to={'/parameters/customization'} className='adult' style={{ marginLeft: 5 }} translate='no'>18++</Link>}
                                        {promise.ai == 1 && <div className='AI' style={{ marginLeft: 5 }} translate='no'>AI</div>}
                                    </div>
                                    <div>
                                        <div className='badge' style={{ borderRadius: 50, marginRight: 5, display: 'flex', alignItems: 'center' }} data-theme={localTheme}>{promise.imagesCount}<FontAwesomeIcon style={{ fontSize: 12, marginLeft: 5 }} icon={faImages} /></div>
                                    </div>
                                </div>
                                <div className='badge' data-theme={localTheme}>{promise.type}</div>
                            </div>
                        </div>

                        {!props.button && <>
                            <div className='article_card_menu'>
                                <div onClick={() => {
                                    setHiddenMenu(true)
                                    setHiddenMenuMiniProfil(promise.user)
                                }} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', width: 'max-content', overflow: 'hidden' }}>
                                    {promiseIdentifiedUser.user.id == promise.user.id && <img className='article_card_menu_img' style={{marginLeft: 5}} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} src={promiseIdentifiedUser.user.imageUrl || Picture} alt='' />}
                                    {promiseIdentifiedUser.user.id != promise.user.id && <img className='article_card_menu_img' style={{marginLeft: 5}} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} src={promise.user.imageUrl || Picture} alt='' />}
                                    <div className='article_card_menu_text'>
                                        {promise.user.pseudo}
                                        {promise.createdAt && <div style={{ color: '#0078e9', fontSize: 12 }}>{dayjs(`${promise.createdAt.split('.')[0].split('T')[0]} ${parseInt(promise.createdAt.split('.')[0].split('T')[1].split(':')[0]) + 2}:${promise.createdAt.split('.')[0].split('T')[1].split(':')[1]}:${promise.createdAt.split('.')[0].split('T')[1].split(':')[2]}`).locale("fr").fromNow()}</div>}
                                    </div>
                                </div>

                                {parseInt(promiseIdentifiedUser.user.id) === parseInt(promise.user.id) && <div style={{ display: 'flex', width: 'max-content', alignItems: 'center', justifyContent: 'end' }}>
                                    <div onClick={() => {navigate(`/works/file/${promise.id}`)}} className='buttonCircle' data-theme={localTheme}>
                                    <FontAwesomeIcon style={{ fontSize: 13 }} icon={faPenToSquare} />
                                    </div>
                                </div>}
                            </div></>}


                    </div>
                ))}
            </div >
        </>
    )
}
export default Card_articles

// <div style={{ backgroundImage: `url(${promise.miniature || Picture})`, backgroundPosition: `50% ${promise.resize}%`, borderRadius: 5 }} className='CoverImage FlexEmbed FlexEmbed--2by1_card' />