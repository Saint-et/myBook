import Picture from '../../assets/images/logo.png';
import { useAppContext } from '../../contexts/UseAppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { SystemName } from '../../assets/data/data';
import Function_utils from '../versatile_function/usefunction_utils';



const Card_library = (props) => {

    const navigate = useNavigate()

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const typeUrl = searchParams.get("type");

    const { localTheme,
        promiseIdentifiedUser } = useAppContext();

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
            <div className='scrollbar' style={{ display: 'flex', overflow: 'auto', alignItems: 'center', width: '98%', paddingBottom: 10, marginBottom: 10 }}>
                {props.promise?.map((promise, index) => (
                    <div className='hovercursor' key={index} style={{ marginRight: 40 }}>
                        <img onClick={() => {navigate({ search: `type=${typeUrl}&library=${promise.id}` })}} className='Profile_picture shadowbox' src={promise?.imageUrl || Picture} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} alt="" />
                        {promiseIdentifiedUser && (
                            <>
                                {parseInt(promiseIdentifiedUser?.user.id) === promise?.adminId &&
                                    <div className='Profile_picture_button shadowbox' style={{ marginBottom: 60 }}>
                                        <Link to={`/works/${SystemName}-Workspace?update-group-file=${promise?.id}`} className='button_optionPic_v' style={{ width: 35, height: 35, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, position: 'absolute', borderRadius: '100%' }} data-theme={localTheme}>
                                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                        </Link>
                                    </div>
                                }
                            </>
                        )}
                        <div style={{ textAlign: 'center' }}>{promise?.name}</div>
                    </div>
                ))}
            </div>
        </>
    )
}
export default Card_library
