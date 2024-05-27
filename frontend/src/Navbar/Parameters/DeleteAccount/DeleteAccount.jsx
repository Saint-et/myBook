import Warning from '../../../components/Warning';
import { useAppContext } from '../../../contexts/UseAppContext';



const DeleteAccount = (props) => {
    const { localTheme, promiseIdentifiedUser } = useAppContext()


    if (!promiseIdentifiedUser) return null

    if (props.promise === false) return null

    return (
        <div className='open-element-page-melted'>
            <Warning />

            <div className='cter_sect' style={{ marginTop: 30, marginBottom: 20 }}>
                <div className='ctent_arti' style={{ maxWidth: 600 }} data-theme={localTheme}>

                </div>
            </div>
        </div>
    )
}

export default DeleteAccount