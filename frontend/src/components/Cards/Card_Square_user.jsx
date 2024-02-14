import { Link } from 'react-router-dom';
import Picture from '../../assets/images/logo.png';
import { spinner } from '../../utils';
import { useAppContext } from '../../contexts/UseAppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Card_Square_user = (props) => {
    
    const navigate = useNavigate()

    const { localTheme } = useAppContext();

    //____Search

    if (!props.promise) return (
        <>
            <div className='cter_sect' style={{ marginBottom: 30 }}>
                <div className='ctent_arti' style={{ background: 'none', boxShadow: 'none' }} data-theme={localTheme}>
                    {spinner()}
                </div>
            </div>
        </>
    )

    if (props.promise.length === 0) return (
        <>
            <div className='cter_sect' style={{ marginBottom: 30 }}>
                <div className='ctent_arti card_null' style={{ background: 'none' }} data-theme={localTheme}>
                    <FontAwesomeIcon icon={faUsers} />
                    <div>No results</div>
                </div>
            </div>
        </>
    )

    //___________


    return (
        <>
            <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', paddingBottom: 50, display: 'flex', justifyContent: 'center' }}>

                {props.promise?.map((user) => (
                    <div onClick={() => {navigate(`/profile/${user.id}/page?type=Illustrations`)}} className='card_user  animation' style={{ margin: 10, display: 'flex', alignItems: 'center', flexDirection: 'column' }} key={user.id} data-theme={localTheme}>
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

export default Card_Square_user