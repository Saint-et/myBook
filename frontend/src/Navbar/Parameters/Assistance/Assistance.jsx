import Warning from '../../../components/Warning';
import { useAppContext } from '../../../contexts/UseAppContext';


const Assistance = (props) => {
    const {localTheme } = useAppContext()

    if (props.promise === false) return null

    return (
        <>
        <Warning />

        <div className='cter_sect' style={{marginTop: 30, marginBottom: 20}}>
        <div className='ctent_arti' style={{maxWidth: 600}} data-theme={localTheme}>
        <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <h1>Assistance</h1>
                    <ul>
                        <li>Do you have a question ?</li>
                        <li>Need help ?</li>
                        <li>Do you have any suggestions to improve the experience ?</li>
                        <li>Have you detected a bug in the app ?</li>
                        
                    </ul>
                    </div>
                    <p>Contact an administrator directly to help answer your questions.</p>
        </div>
        </div>
        </>
    )
}

export default Assistance