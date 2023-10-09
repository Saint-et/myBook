import { useAppContext } from "../contexts/UseAppContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes } from '@fortawesome/free-solid-svg-icons';




const Animation = () => {

    const { animationSelect, localTheme, animationNotif } = useAppContext()



    if (animationSelect === 'eco') return (
        <>
        {animationNotif !== null && <div className='button_option_container animation' style={{
                width: 'max-content',
                position: 'fixed',
                top: '50%',
                left: '50%',
                zIndex: 1000,
                padding: 10,
                background: 'black',
                transform: 'translate(-50%, -50%)'
            }} data-theme={localTheme}>
                <div style={{ color: '#00aa00', fontSize: 20, fontWeight: 'bolder' }}><span>Eco active</span><span style={{ marginLeft: 10 }}><FontAwesomeIcon icon={faCubes} /></span></div>
            </div>}
        </>
    )

    return (
        <>
            {animationNotif !== null && <div className='button_option_container open-elementPage animation' style={{
                width: 'max-content',
                position: 'fixed',
                top: '50%',
                left: '50%',
                zIndex: 1000,
                padding: 10,
                background: 'black',
                transform: 'translate(-50%, -50%)'
            }} data-theme={localTheme}>
                <div style={{ color: '#ec1c24', fontSize: 20, fontWeight: 'bolder' }}><span>Normal active</span><span style={{ marginLeft: 10 }}><FontAwesomeIcon icon={faCubes} /></span></div>
            </div>}

            <div className="bubbles">
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
            </div>
        </>
    )
}

export default Animation