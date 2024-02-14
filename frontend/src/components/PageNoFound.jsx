import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/UseAppContext';
import { DATA_picv } from '../assets/data/data';
import imgCoverCard from '../assets/images/scene-tranquille-fleurs-cerisier-au-printemps-generee-par-ia.jpg';

const PageNoFound = () => {
    const { localTheme } = useAppContext();

    const navigate = useNavigate();

    return (
        <>
            <div className='cter_sect' style={{ marginTop: 30, marginBottom: 20 }}>
                <div style={{ backgroundImage: `url(${imgCoverCard})`, backgroundPosition: `50% ${50}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth: 800 }} className='CoverImage FlexEmbed FlexEmbed--2by1'>
                    <div className='shadowbox' style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white' }}>
                        <FontAwesomeIcon style={{ marginTop: 20, fontSize: 80 }} icon={faRobot} />
                        <h1>Error 404: Page no found</h1>
                        <div className="copy-box two">
                            <div className="inner">
                                <div className="line right"></div>
                                <ul>
                                    <li>Please return to previous page</li>
                                    <li>You cannot access this page.</li>
                                    <li>The search page no longer exists.</li>
                                </ul>
                            </div>
                        </div>
                        <div className='button_option_container' style={{ width: '90%', marginBottom: 20, marginTop: 20 }} data-theme={localTheme}>
                            <div onClick={() => navigate(-1)} className='button_option' data-theme={localTheme}>Back to previous page</div>
                        </div>

                        <div className='button_option_container' style={{ width: '90%', marginBottom: 20 }} data-theme={localTheme}>
                            <div onClick={() => navigate('/')} translate='no' className='button_optionPic_v' data-theme={localTheme}>{DATA_picv}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageNoFound