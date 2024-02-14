import { useState } from "react";
import CataloguesTags from "./CataloguesTags";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { useAppContext } from '../../../contexts/UseAppContext';
import TagsProfilHome from './TagsProfilHome';
import { useTranslation } from 'react-i18next';

const Catalogues = () => {

    const { t } = useTranslation();

    const { localTheme, localThemeBackground, promiseIdentifiedUser } = useAppContext();

    const [total, setTotal] = useState('')

    const url = window.location.href.split("/");



    if (!promiseIdentifiedUser) return null

    return (
        <>
            <TagsProfilHome promiseApp={promiseIdentifiedUser} localTheme={localTheme} />

            
      <div className='cter_sect'>
        <div className='ctent_arti' data-theme={localTheme}>

                <div style={{ width: '95%', display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h3 className='text' data-background={localThemeBackground} data-theme={localTheme} style={{ margin: 0 }}>- {t('activities')}</h3>
                        {url[4] == promiseIdentifiedUser.user.id && <Link to={'/workspace/files'} className='buttonCircle' style={{ width: 20, height: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 12, marginBottom: -5 }} data-theme={localTheme}>
                            <FontAwesomeIcon icon={faPlus} />
                        </Link>}
                    </div>
                    <div data-theme={localTheme} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}><div translate='no' style={{ fontSize: 22, fontWeight: 700 }}>{url[6]}</div><div style={{ width: '100%', display: 'flex' }}>Documents found:<div>{total}</div></div></div>
                </div>
                <CataloguesTags key={url[6]} setTotal={setTotal} total={total} />
            </div>
            </div>
        </>
    )
}

export default Catalogues