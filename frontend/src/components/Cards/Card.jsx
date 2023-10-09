import { spinner } from '../../utils';
import Picture from '../../assets/images/newspaper.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../../contexts/UseAppContext';

const Card = (props) => {
  const { localTheme } = useAppContext();


  if (!props.promise) return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}>
        {spinner()}
      </div>
    </>
  )

  if (props.promise.length === 0) return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h3>No results</h3>
      </div>
    </>
  )

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', width: '90%' }}>
        {props.promise?.map((doc) => (
          <Link to={`/workspace/files/${doc.id}`} className='long_card animation' data-theme={localTheme} key={doc.id}>
            <div style={{display: 'flex', alignItems: 'center'}} translate='no'>
            <img onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '50px', height: '50px', borderRadius: '100%', objectPosition: `${50}% ${10}%`, objectFit: 'cover', marginRight: 10 }} src={doc.imageUrl[0] || Picture} alt="" />
            <div style={{overflow: 'hidden',width: 100, textAlign: 'center', textOverflow: 'ellipsis'}} title={doc.name}>{doc.name.charAt(0).toUpperCase() + doc.name.slice(1)}</div> {doc.visibility == 1 ?<FontAwesomeIcon style={{color: 'green'}} icon={faEye} /> : <FontAwesomeIcon style={{color: 'red'}} icon={faEye} />}
            </div>
            {doc.type && <div style={{overflow: 'hidden', width: 200, textOverflow: 'ellipsis'}} translate='no'>Type: <span translate='yes' style={{color: '#0078e9'}}>{doc.type}</span></div>}
            <div>Date: <span style={{color: '#747474'}}>{`${doc.createdAt.split('.')[0].split('T')[0]} ${parseInt(doc.createdAt.split('.')[0].split('T')[1].split(':')[0]) + 2}:${doc.createdAt.split('.')[0].split('T')[1].split(':')[1]}:${doc.createdAt.split('.')[0].split('T')[1].split(':')[2]}` || '00-000-000'}</span></div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Card