import Pub from "./Pub/Pub"
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/UseAppContext';


const Invited = (props) => {
    const { localTheme } = useAppContext();

    return(
        <>
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: 100, marginBottom: 100}}>
              <h4>You are logged in as a guest, create an account to join us.</h4>
              <Link to={'/'} className='buttonCircleBlue' style={{width: 150, height: 35, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize:  15, marginTop: 10, textDecoration: 'none'}} data-theme={localTheme}>
              Visit the website ?
              </Link>
        </div>
      
        <Pub/>
        </>
    )
}

export default Invited