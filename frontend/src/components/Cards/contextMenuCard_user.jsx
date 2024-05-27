import { SystemName } from '../../assets/data/data';
import imgProfile from '../../assets/images/logo.png';
import imgRemplace from '../../assets/images/vaisseau-spatial-futuriste-orbite-autour-mysterieuse-planete-dans-galaxie-profonde-generee-par-intelligence-artificielle.jpg';
import { useAppContext } from "../../contexts/UseAppContext";
import { useTranslation } from "react-i18next";
import Subscription_management from '../Subscription_management';
import { useNavigate } from 'react-router-dom';
import { RemoveScroll } from 'react-remove-scroll';



const ContextMenuCard_user = (props) => {

    const { localTheme } = useAppContext();

    const { t } = useTranslation();
    const navigate = useNavigate()


    if (!props.isVisible) return null

    return (
        <>
            <RemoveScroll removeScrollBar={false} className="contextMenu open-element-page-melted" ref={props.contextMenuRef} style={{ top: props.position.y, left: props.position.x, paddingBottom: 10 }} data-theme={localTheme}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ backgroundImage: `url(${props.isVisible.profile.imageUrlCover || imgRemplace})`, backgroundPosition: `50% ${props.isVisible.profile.resizeImageUrlCover}%`, borderRadius: 0 }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='CoverImage FlexEmbed FlexEmbed--2by1'></div>
                    <div className='text' style={{ zIndex: 10, textDecoration: 'none' }} data-theme={localTheme}>
                        <img onClick={() => {navigate(`/profile/${props.isVisible.profile.id}/home?type=Illustrations`)}} style={{ width: 90, height: 90, borderRadius: '100%', marginTop: -60, cursor: 'pointer' }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='Profile_picture_nav hovercursor' src={props.isVisible.profile.imageUrl || imgProfile} alt="" />
                        <div className='title_color' style={{ textAlign: 'center', fontSize: 18, fontWeight: 800 }} translate='no'>{props.isVisible.profile.pseudo}</div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <div style={{ marginRight: 5, marginTop: 5 }} className='badge_System_color'>{SystemName}</div>
                        {props.isVisible.profile.accessPass && <div style={{ marginRight: 5, marginTop: 5 }} className='badgeShop'>{t("accessPass")}</div>}
                        {props.isVisible.profile.diamondPass && <div style={{ marginRight: 5, marginTop: 5 }} className='badgeColoring'>{t("subscription")}</div>}
                    </div>
                    <Subscription_management userId={props.isVisible.profile.id} />
                </div>
            </RemoveScroll>
        </>
    )
}

export default ContextMenuCard_user