import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faExpand, faPen, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { SystemName } from '../../assets/data/data';
import { useAppContext } from "../../contexts/UseAppContext";
import { useTranslation } from "react-i18next";
import { useWorkspaceContext } from "../../contexts/UseWorkspaceContexte";



const ContextMenuCard = (props) => {

    const { localTheme, handleFullScreen, promiseIdentifiedUser } = useAppContext();
    const { GetMyFileFromLocal, setPromiseFileStatistical } = useWorkspaceContext();

    const { t } = useTranslation();


    if (!props.isVisible) return null

    return (
        <>
            <div onClick={() => { props.setIsVisible(null) }} className="contextMenu open-element-page-melted" ref={props.contextMenuRef} style={{ top: props.position.y, left: props.position.x }} data-theme={localTheme}>
                {props.isVisible.fullscreen && <>
                    <div onClick={(e) => {
                        e.preventDefault()
                        handleFullScreen({ img: props.isVisible.miniature })
                    }} className='button_option' style={{ justifyContent: 'start', height: 35 }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10, marginLeft: 10, color: '#ec1c24' }} icon={faExpand} />fullscreen</div>
                </>}
                <Link to={`/file/page_file/page?file_type=${props.isVisible.type}&file=${props.isVisible.id}&index=0`} target="_blank" className='button_option' style={{ justifyContent: 'start', height: 35 }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10, marginLeft: 10, color: '#ec1c24' }} icon={faArrowUpRightFromSquare} />{t('open')} new page</Link>
                {props.isVisible.workspace && <>
                    <Link to={`/works/${SystemName}-Workspace?${SystemName}-file=${props.isVisible.id}`} className='button_option' style={{ justifyContent: 'start', height: 35 }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10, marginLeft: 10, color: '#ec1c24' }} icon={faPen} />{t('open')} {t('workspace')}</Link>
                    <div onClick={props.isVisible ? () => { GetMyFileFromLocal(props.isVisible.id) } : null} className='button_option' style={{ justifyContent: 'start', height: 35 }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10, marginLeft: 10, color: '#ec1c24' }} icon={faPenToSquare} />{t('addTo')} {t('workspace')}</div>
                </>}
                {props.isVisible.shop && <Link to={`/ArtVibes-accessPass/page-accessPass?&file=${props.isVisible.id}`} className='button_optionColoringBlue' style={{ justifyContent: 'start', height: 35 }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10, marginLeft: 10 }} icon={faArrowUpRightFromSquare} />{t('accessPass')}</Link>}
                {promiseIdentifiedUser && <>{promiseIdentifiedUser?.user.isAdmin === true && <div onClick={() => { setPromiseFileStatistical(props.isVisible.id) }} className='button_optionGreen' style={{ justifyContent: 'start', height: 35 }} data-theme={localTheme}><FontAwesomeIcon style={{ marginRight: 10, marginLeft: 10 }} icon={faUserSecret} />{t('admin')}</div>}</>}
            </div>
        </>
    )
}

export default ContextMenuCard