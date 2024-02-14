import Picture from '../../assets/images/logo.png';
import { spinner } from '../../utils';
import { useAppContext } from '../../contexts/UseAppContext';
import { useNavigate } from 'react-router-dom';


const Card_Square_user_list = (props) => {
    
    const navigate = useNavigate()

    const { localTheme, promiseIdentifiedUser } = useAppContext();


    if (!props.promise) return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}>
            {spinner()}
        </div>
    )


    return (
        <>

            <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', paddingBottom: 50, display: 'flex', justifyContent: 'center' }}>

                {props.promise?.map((user) => (
                    <div style={{ margin: 10, display: 'flex', alignItems: 'center', flexDirection: 'column' }} key={user.id}>
                        <div onClick={() => {navigate(`/profile/${user.id}/page?type=Illustrations`)}} className='card_user' data-theme={localTheme}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <img onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ objectPosition: `${50}% ${10}%` }} src={user.imageUrl || Picture} alt='' />
                                {user.premium == 1 && <div style={{ display: 'flex', flexDirection: 'row-reverse', marginTop: 100 }}>
                                    <div className='badge_premium' style={{ width: 30, height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, position: 'absolute', marginRight: 15 }}>
                                        <h4 translate='no'>PRE</h4>
                                    </div>
                                </div>}
                            </div>
                            <div style={{textAlign: 'center'}}>{user.pseudo}</div>
                        </div>
                        {props.button && <button style={{ marginTop: 15, width: '100%', maxWidth: 300 }} className='button_submit' onClick={() => props.handleRefuse(user.id, promiseIdentifiedUser.user.id)}>Unfollow</button>}
                    </div>
                ))}

            </div>
        </>
    )
}

export default Card_Square_user_list