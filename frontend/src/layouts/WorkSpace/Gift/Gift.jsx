import { useAppContext } from '../../../contexts/UseAppContext';

const Gift = () => {
    const { localTheme } = useAppContext();
   

    return (
        <div className='open-elementPage'>
            <div className='cter_sect'>
                <div className='ctent_arti' style={{ paddingTop: 10, paddingBottom: 30 }} data-theme={localTheme}>
                    <h2>Gifts</h2>

                </div>
            </div>
        </div>
    )
}

export default Gift