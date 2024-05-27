import { RemoveScroll } from "react-remove-scroll";
import { useAppContext } from "../../../../contexts/UseAppContext";
import logo from '../../../../assets/images/logo_transparent_banner.png';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faThumbTack } from "@fortawesome/free-solid-svg-icons";
import Card_articles_pinned from "../../../../components/Cards/Card_articles_pinned";
import { faEyeSlash, faHeart } from "@fortawesome/free-regular-svg-icons";




const Window_pinned_illustrations = (props) => {

    const { localTheme } = useAppContext()

    const navigate = useNavigate()

    return (
        <>
            <RemoveScroll className="blanket_opacte open-element-page-melted scrollbar" style={{ zIndex: 25000, paddingTop: 0, display: 'flex', justifyContent: 'start', flexDirection: 'column', overflow: 'auto', paddingTop: 50 }} data-theme={localTheme}>
                <div className='nav_bar_scnd' style={{ margin: 0, padding: 0, height: 50, borderRadius: 0, alignItems: 'start', position: 'fixed', top: 0, zIndex: 10000, }} data-theme={localTheme}>
                    <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', marginTop: 5 }}>
                        <div onClick={() => navigate(-1)} className='button_option_container' style={{ maxWidth: 50, marginLeft: 10, display: 'flex', background: 'none' }} data-theme={localTheme}>
                            <div className='button_option' style={{ height: 40, width: 40, borderRadius: 100, marginRight: 5 }} data-theme={localTheme}><FontAwesomeIcon icon={faArrowLeft} /></div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', maxWidth: 200, justifyContent: 'center' }}>
                            <img className='logo_event' style={{ height: 30 }} src={logo} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                        </div>
                    </div>
                </div>


                <h3 style={{ textAlign: 'center' }}>Favorite Illustration - {props.promiseUser.user.pseudo} <FontAwesomeIcon style={{ marginLeft: 5 }} icon={faHeart} /></h3>





                <div className='cter_sect'>
                    <div className='ctent_arti' style={{ paddingTop: 10 }} data-theme={localTheme}>
                        {props.promiseIllustration === 'private' ?
                            <h4 style={{ color: 'grey' }}><FontAwesomeIcon icon={faEyeSlash} />Private</h4>
                            :
                            <Card_articles_pinned promise={props.promiseIllustration} />}
                    </div>
                </div>
            </RemoveScroll>
        </>
    )
}

export default Window_pinned_illustrations