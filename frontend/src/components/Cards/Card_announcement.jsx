import Picture from '../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxes, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../../contexts/UseAppContext';
import dayjs from "dayjs";
import { spinner } from '../../utils';
import { useState } from 'react';
import UpdatePost from '../../layouts/UserProfil/Home/UpdatePost';
require("dayjs/locale/fr");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);


const Card_announcement = (props) => {
    const { localTheme,
        setHiddenMenuMiniProfil,
        setHiddenMenu,
        promiseIdentifiedUser } = useAppContext();

        const [update, setUpdate] = useState(false)

    //<Linkify>
    //    <div translate='no'>
    //        {parse(stateToHTML(convertFromRaw(JSON.parse(promise.data))))}
    //    </div>
    //</Linkify>



    if (!promiseIdentifiedUser || !props.promise) return (
        <>
            <div className='cter_sect' style={{ fontSize: 20, paddingTop: 30 }}>
                    {spinner()}
            </div>
        </>
    )

    if (props.promise.length === 0) return (
        <>
            <div className='cter_sect' style={{ marginBottom: 30 }}>
                <div className='ctent_arti card_null' data-theme={localTheme}>
                    <FontAwesomeIcon icon={faBoxes} />
                    <div>No results</div>
                </div>
            </div>
        </>
    )


    return (
        <>
        {update &&<UpdatePost update={update} setAnnouncement={setUpdate} GetMyFilesFromAPIAnnouncement={props.GetMyFilesFromAPIAnnouncement} />}
            <div className='scrollbar' style={{ display: 'flex', flexDirection: 'row', overflow: 'auto', width: '100%' }}>
                {props.promise?.map((promise) => (
                    <div className='card_post hovershadow animation' style={{ margin: 10 }} key={promise.id} data-theme={localTheme}>
                        <div className='article_card_menu'>
                            <div onClick={() => {
                                setHiddenMenu(true)
                                setHiddenMenuMiniProfil(promise.user)
                            }} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', width: 'max-content', overflow: 'hidden', marginLeft: 5 }}>
                                {promiseIdentifiedUser.user.id == promise.user.id && <img className='article_card_menu_img' onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} src={promiseIdentifiedUser.user.imageUrl || Picture} alt='' />}
                                {promiseIdentifiedUser.user.id != promise.user.id && <img className='article_card_menu_img' onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} src={promise.user.imageUrl || Picture} alt='' />}
                                <div className='article_card_menu_text'>
                                    {promise.user.pseudo}
                                </div>
                            </div>

                            {!props.button && <>{parseInt(promiseIdentifiedUser.user.id) === parseInt(promise.user.id) && <div style={{ display: 'flex', width: 'max-content', alignItems: 'center', justifyContent: 'end' }}>
                                <div className='buttonCircle' onClick={() => {setUpdate(promise)}} data-theme={localTheme}>
                                    <FontAwesomeIcon style={{ fontSize: 13 }} icon={faPenToSquare} />
                                </div>
                            </div>}</>}
                        </div>


                        <img loading="lazy" src={promise.imageUrl || Picture} style={{ width: '100%', maxWidth: 'max-content', objectFit: 'contain', height: '100%', maxHeight: 200, borderRadius: 5, cursor: 'pointer', marginTop: 10 }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} alt="" />
                        <div className='article_card_title' translate='no'>{promise.title.charAt(0).toUpperCase() + promise.title.slice(1)}</div>
                        {promise.createdAt && <div style={{ color: '#0078e9', fontSize: 12 }}>{dayjs(`${promise.createdAt.split('.')[0].split('T')[0]} ${parseInt(promise.createdAt.split('.')[0].split('T')[1].split(':')[0]) + 2}:${promise.createdAt.split('.')[0].split('T')[1].split(':')[1]}:${promise.createdAt.split('.')[0].split('T')[1].split(':')[2]}`).locale("fr").fromNow()}</div>}
                    </div>
                ))}
            </div>
        </>
    )
}

export default Card_announcement