import { spinner } from '../../utils';
import Picture from '../../assets/images/newspaper.png';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../../contexts/UseAppContext';
import { IndexedDB, recupererTousLesElements } from '../../assets/data/IndexedDB';

const Card = (props) => {
  const { localTheme } = useAppContext();

  const navigate = useNavigate()

  //const HandleSetLocale = (el) => {
  //  // Récupérez les données existantes depuis localStorage (s'il y en a)
  //  const localData = JSON.parse(localStorage.getItem('tab-Work-Place')) || [];
  //    const uniqueData = [el].filter((newItem) => {
  //      // Vérifiez si l'élément existe déjà dans les données existantes
  //      return !localData.some((existingItem) => existingItem.id === newItem.id);
  //    });
  //    // Étape 3 : Ajoutez uniquement les éléments uniques
  //    const updatedData = [...localData, ...uniqueData];
  //    // Étape 4 : Mettez à jour les données du localStorage
  //    localStorage.setItem('tab-Work-Place', JSON.stringify(updatedData));
  //}

  const onClick = (el) => {
    if (props.filesSelected.length != 0) {
      if (window.confirm('Are you sure you want to switch pages and cancel the selection?')) {
        navigate(`/works/file/${el.id}`)
        //props.setTab(JSON.parse(localStorage.getItem('tab-Work-Place')))
      } else {
        alert('Change cancelled.')
      }
    } else {
      //localStorage.setItem('tab-Work-Place', JSON.stringify([{ id: el.id, name: el.name, miniature: el.miniature}]));
      navigate(`/works/file/${el.id}`)
      //props.setTab(JSON.parse(localStorage.getItem('tab-Work-Place')))
      
    }
  }


  // .slice(0).reverse()


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
      {props.promise?.map((doc, index) => (
        <div className='long_card open-elementPage' key={doc.id}>

          {!props.checkbox ? <>{doc.groupId != props.location ?
          // Groups display manages the selection
            <div className="checkbox-wrapper-46" style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
              <input
                onChange={(e) => e.target.checked === true ? props.handleFilesSelected(doc.id) : props.handleFilesSelectedRemove(doc.id)} checked={props.filesSelected?.filter((id) => id == doc.id) == doc.id}
                className="inp-cbx" id={doc.id} name={doc.id} type="checkbox" />
              <label className="cbx" htmlFor={doc.id}><span>
                <svg width="12px" height="10px" viewBox="0 0 12 10">
                  <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </svg></span>
              </label>
            </div>
            :
            <input style={{ width: 20 }} disabled={true} defaultChecked={true} type="checkbox" />}</>
            :
          <div className="checkbox-wrapper-46" style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
            <input
              onChange={(e) => e.target.checked === true ? props.handleFilesSelected(doc.id) : props.handleFilesSelectedRemove(doc.id)} checked={props.filesSelected?.filter((id) => id == doc.id) == doc.id}
              className="inp-cbx" id={doc.id} name={doc.id} type="checkbox" />
            <label className="cbx" htmlFor={doc.id}><span>
              <svg width="12px" height="10px" viewBox="0 0 12 10">
                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
              </svg></span>
            </label>
          </div>}



          <div className='long_cardHover' style={{ width: '100%', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }} onClick={() => { onClick(doc) }} data-theme={localTheme}>
            <div style={{ display: 'flex', alignItems: 'center' }} translate='no'>
              <img loading="lazy" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '50px', height: '50px', borderRadius: '100%', objectPosition: `${50}% ${10}%`, objectFit: 'cover', marginRight: 10 }} src={doc.miniature || Picture} alt="" />
              <div style={{ overflow: 'hidden', width: 100, textAlign: 'center', textOverflow: 'ellipsis' }} title={doc.name.charAt(0).toUpperCase() + doc.name.slice(1)}>{doc.name.charAt(0).toUpperCase() + doc.name.slice(1)}</div>
              {doc.visibility == 1 ? <FontAwesomeIcon style={{ color: 'green' }} icon={faEye} /> : <FontAwesomeIcon style={{ color: 'red' }} icon={faEye} />}
              {props.location && <>{doc.groupId == props.location ? <FontAwesomeIcon style={{ color: '#0069cc', marginLeft: 10 }} icon={faCheck} /> : <> {doc.groupId ? <FontAwesomeIcon style={{ color: 'red', marginLeft: 10 }} icon={faCheck} /> : null} </>}</>}
              {doc.adult == 1 && <div style={{ width: 35 }} className='adult' translate='no'>18+</div>}
              {doc.adult == 2 && <div style={{ width: 35 }} className='adult' translate='no'>18++</div>}
            </div>
            {doc.type && <div style={{ overflow: 'hidden', width: 200, textOverflow: 'ellipsis' }} translate='no'>Type: <span translate='yes' style={{ color: '#0078e9', marginLeft: 5 }}>{doc.type}</span></div>}
            <div style={{ overflow: 'hidden', width: 200, textOverflow: 'ellipsis' }}>Group: {doc.groupsfile ? <span translate='no' style={{ color: '#ec1c24', marginLeft: 5 }}>{doc.groupsfile.name.charAt(0).toUpperCase() + doc.groupsfile.name.slice(1)}</span> : <span style={{ color: '#747474', marginLeft: 5 }}>None</span>}</div>
            <div>Date: <span style={{ color: '#747474', marginLeft: 5 }}>{`${doc.createdAt.split('.')[0].split('T')[0]} ${parseInt(doc.createdAt.split('.')[0].split('T')[1].split(':')[0]) + 2}:${doc.createdAt.split('.')[0].split('T')[1].split(':')[1]}:${doc.createdAt.split('.')[0].split('T')[1].split(':')[2]}` || '00-000-000'}</span></div>
          </div>
        </div>
      ))}
    </>
  )
}

export default Card