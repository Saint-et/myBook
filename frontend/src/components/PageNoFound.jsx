import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/UseAppContext';
import { DATA_picv } from '../assets/data/data';

const PageNoFound = () => {
    const { localTheme } = useAppContext();

    const navigate = useNavigate();

    return (
        <>
            <div className='cter_sect' style={{ marginTop: 30, marginBottom: 20 }}>
                <div className='ctent_arti' style={{maxWidth: 600}} data-theme={localTheme}>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <FontAwesomeIcon style={{ marginTop: 20, fontSize: 80 }} icon={faRobot} />
                        <h1>Error 404: Page no found</h1>
                        <ul>
                            <li>Please return to previous page</li>
                            <li>You cannot access this page.</li>
                            <li>The search page no longer exists.</li>
                        </ul>
                        <div onClick={() => navigate(-1)}  className='button_option' data-theme={localTheme}>Back to previous page</div>
                        <div onClick={() => navigate('/')} translate='no' className='button_option' data-theme={localTheme}>{DATA_picv}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageNoFound