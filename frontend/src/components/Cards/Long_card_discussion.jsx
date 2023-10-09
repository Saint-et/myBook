import { Link } from "react-router-dom"
import Picture from '../../assets/images/logo.png';
import { spinner } from '../../utils';
import { useAppContext } from '../../contexts/UseAppContext';

const Long_card_discussion = (props) => {
    const { localTheme } = useAppContext();

    if (!props.promise) return (
        <div style={{width: '100%',display: 'flex', justifyContent: 'center', marginTop: 100}}>
        {spinner()}
        </div>
      )

    return (
        <>
        {props.promise?.map((promise) => (
        <Link to={`/discussions/message/${promise.id}`} className='long_card_discussion  animation' key={promise.id} data-theme={localTheme}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '90%'}}>
                <img onMouseDown={(e)=>e.preventDefault()} onContextMenu={(e)=>e.preventDefault()} style={{height: 70, width: 70, objectPosition: `${50}% ${10}%`, borderRadius: 50}} src={promise.user.imageUrl || Picture} alt='' />
                <div>{promise.user.pseudo}</div>
            </div>
        </Link>
        ))}
        </>
    )
}

export default Long_card_discussion