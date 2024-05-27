import Picture from '../../assets/images/logo.png';
import { spinner } from '../../utils';
import { useAppContext } from '../../contexts/UseAppContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SystemName } from '../../assets/data/data';
import ContextMenuCard_user from './contextMenuCard_user';
import Function_utils from '../versatile_function/usefunction_utils';


const Card_Square_user_list = (props) => {

    const { t } = useTranslation();
    const navigate = useNavigate()

    const { localTheme, promiseIdentifiedUser } = useAppContext();

    const {
        handleContextMenuProfile,
        isVisible,
        position,
        contextMenuRef,
        setIsVisible
    } = Function_utils()


    if (!props.promise) return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}>
            {spinner()}
        </div>
    )


    return (
        <>
            <ContextMenuCard_user isVisible={isVisible} setIsVisible={setIsVisible} position={position} contextMenuRef={contextMenuRef} />

            <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', paddingBottom: 50, display: 'flex', justifyContent: 'center' }}>

                {props.promise?.map((user) => (
                    <div onContextMenu={(event) => {
                        event.preventDefault()
                        handleContextMenuProfile(event, user)
                    }} style={{ margin: 10, display: 'flex', alignItems: 'center', flexDirection: 'column' }} key={user.id}>
                        <div onClick={() => { navigate(`/profile/${user.id}/home?type=Illustrations`) }} className='card_user' data-theme={localTheme}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <img onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ objectPosition: `${50}% ${10}%` }} src={user.imageUrl || Picture} alt='' />
                            </div>
                            <div style={{ textAlign: 'center' }}>{user.pseudo}</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                                <div style={{ marginRight: 5, marginTop: 5 }} className='badge_System_color'>{SystemName}</div>
                                <div style={{ marginRight: 5, marginTop: 5 }} className='badgeShop'>{t("accessPass")}</div>
                                <div style={{ marginRight: 5, marginTop: 5 }} className='badgeColoring'>{t("subscription")}</div>
                                <div style={{ marginRight: 5, marginTop: 5 }} className='badgeColoring textLoto'>Game</div>
                            </div>
                        </div>

                        {props.IdUserUrl === promiseIdentifiedUser.user.id && <>{props.button && <div className='button_option_container_free' style={{ display: 'flex' }} data-theme={localTheme}>
                            <div onClick={() => props.handleRefuse(user.id, promiseIdentifiedUser.user.id)} className='button_option_free' data-theme={localTheme}>{t('unfollow')}</div>
                        </div>}</>}
                    </div>
                ))}

            </div>
        </>
    )
}

export default Card_Square_user_list