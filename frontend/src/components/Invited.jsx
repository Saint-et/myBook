import Pub from "./Pub/Pub"
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/UseAppContext';


const Invited = (props) => {
    const { localTheme, setHiddenConnection, hiddenConnection } = useAppContext();

    // <Pub/>

    return (
        <>

            <div className='cter_sect open-element-page-melted' style={{ marginTop: 50 }}>
                <div className='ctent_arti' data-theme={localTheme}>
                    <h4>You are logged in as a guest, To access this part of the site, please create an account.</h4>
                    <div className='button_option_container_free' style={{ width: '100%', maxWidth: 300, marginTop: 20 }} data-theme={localTheme}>
                        <Link to={'/'} className='button_optionPic_v' data-theme={localTheme}>
                            Visit the website ?
                        </Link>
                    </div>
                    <div className='button_option_container_free' style={{ width: '100%', maxWidth: 300, marginTop: 20 }} data-theme={localTheme}>
                        <div onClick={() => { setHiddenConnection(!hiddenConnection) }} className='button_option' data-theme={localTheme}>
                            Login
                        </div>
                    </div>

                    <div className='button_option_container_free' style={{ width: '100%', maxWidth: 300, marginTop: 20 }} data-theme={localTheme}>
                        <Link to={'/signup'} className='button_optionBlue' data-theme={localTheme}>
                            sign'up
                        </Link>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Invited