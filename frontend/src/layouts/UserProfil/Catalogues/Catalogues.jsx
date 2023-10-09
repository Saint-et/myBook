import { useState } from "react";
import CataloguesTags from "./CataloguesTags";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { useAppContext } from '../../../contexts/UseAppContext';
import TagsProfilHome from './TagsProfilHome';

const Catalogues = () => {

    
    const { localTheme, promiseIdentifiedUser } = useAppContext();

    const [total, setTotal] = useState('')

    const url = window.location.href.split("/");



    if (!promiseIdentifiedUser) return null

    return (
        <>
        
        <TagsProfilHome promiseApp={promiseIdentifiedUser} localTheme={localTheme} />

            <div className='cter_sect' style={{ marginBottom: 30 }}>
                <div className='ctent_arti' data-theme={localTheme}>

                    <div style={{ width: '95%', display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h3 className="title_color" style={{ margin: 0 }}>- Catalogues</h3>
                            {url[4] == promiseIdentifiedUser.user.id && <Link to={'/workspace/files'} className='buttonCircle' style={{ width: 30, height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, marginBottom: -5 }} data-theme={localTheme}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Link>}
                        </div>
                        <div className="title_color" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}><div translate='no' style={{ fontSize: 22, fontWeight: 700 }}>{url[6]}</div><div style={{ width: '100%', display: 'flex' }}>Documents found:<div>{total}</div></div></div>
                    </div>
                    <CataloguesTags key={url[6]} setTotal={setTotal} total={total} />

                </div>
            </div>
        </>
    )
}

export default Catalogues