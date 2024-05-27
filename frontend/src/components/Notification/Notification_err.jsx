import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';



const Notification_err = (props) => {

    const { t } = useTranslation();
    const navigate = useNavigate()

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!props.duration) return;

        const interval = setInterval(() => {
            if (progress < 100) {
                setProgress(prevProgress => prevProgress + 1);
            } else {
                clearInterval(interval);
            }
        }, props.duration - 5);
        // Nettoyer l'intervalle lorsque le composant est démonté
        return () => {
            clearInterval(interval)
        };
    }, [progress]);

    return (
        <>
            <div className="open-element-page-side-right"
                style={{
                    width: '90%',
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: 500,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                    background: '#232526',
                    color: 'white',
                    marginBottom: 15,
                    overflow: 'hidden'
                }}>

                <div style={{ marginTop: 5, marginBottom: 5, paddingLeft: 5, paddingRight: 5 }} className='title_color'><FontAwesomeIcon style={{ marginRight: 5 }} icon={faExclamationTriangle} /> {props.message} </div>
                {props.img &&<img src={props.img} alt="" style={{width: 'max-content', maxWidth: '90%', height: 200, borderRadius: 5, objectFit: 'contain'}} />}
                {props.link &&
                    <div style={{ display: 'flex', marginBottom: 5 }}>
                        <div onClick={() => props.onClose(props.id)} className='button_optionRed' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 100, marginRight: 10 }}>
                            {t('close')}
                        </div>
                        <div onClick={() => {
                            navigate(props.link)
                            props.onClose(props.id)
                            }} className='button_optionBlue' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 100 }}>
                            {t('open')}
                        </div>
                    </div>}

                {props.duration &&<div style={{ width: '100%', height: '5px', background: 'transparent' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: props.color, transition: '100ms' }}></div>
                </div>}
            </div>
        </>
    )
}

export default Notification_err