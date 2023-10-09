import Warning from '../../../components/Warning';
import { useAppContext } from '../../../contexts/UseAppContext';



const DeleteAccount = (props) => {
    const {localTheme } = useAppContext()

    if (props.promise === false) return null

    return (
        <>
        <Warning />

<div className='cter_sect' style={{marginTop: 30, marginBottom: 20}}>
<div className='ctent_arti' style={{maxWidth: 600}} data-theme={localTheme}>
    
</div>
</div>
        </>
    )
}

export default DeleteAccount