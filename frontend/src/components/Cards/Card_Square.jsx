import { Link } from 'react-router-dom';
import Picture from '../../assets/images/newspaper.png';
import { spinner } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../../contexts/UseAppContext';

const Card_Square = (props) => {
    const { localTheme } = useAppContext();


    if (!props.promise) return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 100}}>
        {spinner()}
        </div>
      )

      if (props.promise.length === 0) return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <h4>No results</h4>
        </div>
      )

    return (
        <>
        <div style={{width: '100%', display: 'flex', flexWrap: 'wrap', paddingBottom: 50, display: 'flex', justifyContent: 'center'}}>

        {props.promise?.map((doc) => (
            <Link to={`/workspace/files/${doc.id}`} className='card_user animation' data-theme={localTheme} key={doc.id}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <img onMouseDown={(e)=>e.preventDefault()} onContextMenu={(e)=>e.preventDefault()} style={{objectPosition: `${50}% ${10}%`, objectFit: 'cover'}} src={doc.imageUrl[0] || Picture} alt='' />
                </div>
                <div style={{display: 'flex', alignItems: 'center',flexDirection: 'column'}}>
                    <div style={{textAlign: 'center'}} translate='no'>{doc.name.charAt(0).toUpperCase() + doc.name.slice(1)} {doc.visibility == 1 ?<FontAwesomeIcon style={{color: 'green'}} icon={faEye} /> : <FontAwesomeIcon style={{color: 'red'}} icon={faEye} />}</div>
                    {doc.type &&<div style={{color: '#0078e9'}}>{doc.type}</div>}
                </div>
            </Link>
            ))}
        
        </div>
        </>
    )
}

export default Card_Square