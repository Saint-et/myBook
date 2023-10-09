import Picture from '../../assets/images/logo.png';
import { spinner } from '../../utils';
import { useAppContext } from '../../contexts/UseAppContext';

const Card_Square_user_select = (props) => {
    const { localTheme } = useAppContext();


    if (!props.promise) return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}>
            {spinner()}
        </div>
    )

    return (
        <>
            <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', paddingBottom: 50, display: 'flex', justifyContent: 'center' }}>

                {props.promise?.map((user) => (
                    <div className={props.userId == user.id ? 'card_user active' : 'card_user'} onClick={() => { props.setUserId(user.id) }} style={{ margin: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }} key={user.id} data-theme={localTheme}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ objectPosition: `${50}% ${10}%` }} src={user.imageUrl || Picture} alt='' />
                            {user.premium == 1 && <div style={{ display: 'flex', flexDirection: 'row-reverse', marginTop: 100 }}>
                                <div className='badge_premium' style={{ width: 30, height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, position: 'absolute', marginRight: 15 }}>
                                    <h4 translate='no'>PRE</h4>
                                </div>
                            </div>}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div translate='no'>{user.pseudo}</div>
                        </div>
                    </div>
                ))}

            </div>
        </>
    )
}

export default Card_Square_user_select