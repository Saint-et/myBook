import Picture from '../../assets/images/logo.png';
import PictureCover from '../../assets/images/bel-arbre-au-milieu-champ-couvert-herbe-limite-arbres-arriere-plan.jpg';
import { spinner } from '../../utils';
import { useAppContext } from '../../contexts/UseAppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faAngleDown, faExpand, faBoxes, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

const Card_Square_user_list_presentation = (props) => {
    const { localTheme, setHiddenMenu, setHiddenMenuMiniProfil } = useAppContext();


    if (!props.promise) return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}>
            {spinner()}
        </div>
    )

    if (props.promise.length === 0) return (
        <>
            <div className='cter_sect' style={{ marginBottom: 30 }}>
                <div className='ctent_arti card_null' style={{ background: 'none' }} data-theme={localTheme}>
                    <FontAwesomeIcon icon={faBoxes} />
                    <div>No results</div>
                </div>
            </div>
        </>
    )


    return (
        <>

            <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', display: 'flex', justifyContent: 'center' }}>

                {props.promise?.map((user) => (
                    <div key={user.id} onClick={() => {
                        setHiddenMenu(true)
                        setHiddenMenuMiniProfil(user)
                    }} className='card_user_presentation hovershadow' data-theme={localTheme}>
                        <div style={{ backgroundImage: `url(${user.imageUrlCover || PictureCover})`, backgroundPosition: `50% ${user.resizeImageUrlCover}%`, borderRadius: 5 }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='CoverImage FlexEmbed FlexEmbed--2by1'>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} data-theme={localTheme}>
                                <img style={{ borderRadius: '100%' }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} src={user.imageUrl || Picture} alt='' />
                                <div translate='no' style={{ marginRight: 10 }}>{user.pseudo}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Card_Square_user_list_presentation