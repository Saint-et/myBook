import Picture from '../../assets/images/logo.png';
import PictureCover from '../../assets/images/bel-arbre-au-milieu-champ-couvert-herbe-limite-arbres-arriere-plan.jpg';
import { spinner } from '../../utils';
import { useAppContext } from '../../contexts/UseAppContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faImage } from '@fortawesome/free-regular-svg-icons';
import { SystemName } from '../../assets/data/data';
import ContextMenuCard_user from './contextMenuCard_user';
import Function_utils from '../versatile_function/usefunction_utils';

const Card_Square_user_list_presentation = (props) => {

    const navigate = useNavigate()
    const { t } = useTranslation();

    const {
        promiseIdentifiedUser,
        localTheme } = useAppContext();


    const {
        handleContextMenuProfile,
        isVisible,
        position,
        contextMenuRef,
        setIsVisible
    } = Function_utils()



    if (!props.promise) return (
        <div className='scrollbar' style={{ display: 'flex', flexDirection: 'row', overflow: 'auto', width: '100%' }}>
            {[1, 2, 3, 4, 5, 6, 7]?.map((num) => (
                <div className='card_post loarder_article_in animation' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 80, color: '#8080804d' }} data-theme={localTheme} key={num}>
                    <FontAwesomeIcon icon={faImage} />
                </div>
            ))}
        </div>
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
            <ContextMenuCard_user isVisible={isVisible} setIsVisible={setIsVisible} position={position} contextMenuRef={contextMenuRef} />

            <div className='scrollbar' style={{ width: '100%', overflow: 'auto', display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                {props.promise?.map((user) => (
                    <div onContextMenu={(event) => {
                        event.preventDefault()
                        handleContextMenuProfile(event, user)
                    }} style={{ margin: 10, display: 'flex', alignItems: 'center', flexDirection: 'column' }} key={user.id}>
                        <div onClick={() => { navigate(`/profile/${user.id}/home?type=Illustrations`) }} className='card_user' data-theme={localTheme}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <img onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => { e.preventDefault() }} style={{ objectPosition: `${50}% ${10}%` }} src={user.imageUrl || Picture} alt='' />
                            </div>
                            <div style={{ textAlign: 'center' }}>{user.pseudo}</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                                <div style={{ marginRight: 5, marginTop: 5 }} className='badge_System_color'>{SystemName}</div>
                                {user.accessPass &&<div style={{ marginRight: 5, marginTop: 5 }} className='badgeShop'>{t("accessPass")}</div>}
                                {user.diamondPass &&<div style={{ marginRight: 5, marginTop: 5 }} className='badgeColoring'>{t("subscription")}</div>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Card_Square_user_list_presentation