import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/free-solid-svg-icons';



const Warning = () => {

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <div className='Non-functional'>
                <FontAwesomeIcon style={{ marginRight: 5 }} icon={faWarning} /> .Attention not functional at the moment. <FontAwesomeIcon style={{ marginLeft: 5 }} icon={faWarning} />
            </div>
        </div>
    )
}

export default Warning