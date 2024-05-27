import { useTranslation } from "react-i18next";
import { useAppContext } from "../../contexts/UseAppContext";
import logo from '../../assets/images/logo_transparent_banner.png';
import { RemoveScroll } from "react-remove-scroll";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Card_articles from "../../components/Cards/Card_articles";
import { IndexedDB, get_Recently_viewedDB, del_Recently_viewedDB } from "../../assets/data/IndexedDB";
import { useEffect, useState } from "react";
import Select from "../../components/Select/Select";
import { number_recently_views } from "../../assets/data/data";



const Recently_viewed = () => {

    const { localTheme, addErrorMessage } = useAppContext()

    const { t } = useTranslation();

    const navigate = useNavigate()

    const [localTabs, setLocalTabs] = useState([])

    const [editeNumber, setEditeNumber] = useState(null);


    const handleRecupererTousLesElements = async () => {
        // Appelez la fonction pour récupérer tous les éléments
        const db = await IndexedDB();
        get_Recently_viewedDB(db)
            .then((elements) => {
                //console.log(elements);
                setLocalTabs(elements);

                // Utilisez les éléments récupérés comme vous le souhaitez dans votre interface utilisateur
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération de tous les éléments :', error);
            });
    };

    const handleClearIndexedDB = async () => {
        const db = await IndexedDB();
        del_Recently_viewedDB(db)
            .then(() => {
                //console.log('Élément supprimé avec succès');
                handleRecupererTousLesElements()
            })
            .catch((error) => {
                console.error('Erreur lors de la suppression des éléments :', error);
            });
    }

    useEffect(() => {
        handleRecupererTousLesElements()
        return () => {
            setLocalTabs([])
        }
    }, [])

    useEffect(() => {
        if (editeNumber !== null) {
            addErrorMessage(`La capacité de RecentViews est passé à ${editeNumber}`, 3000, '#396afc')
            localStorage.setItem('numRecentViews', editeNumber);
            setEditeNumber(null)
        }
    }, [editeNumber])


    return (
        <>
            <RemoveScroll className="blanket_opacte open-element-page-melted scrollbar" style={{ zIndex: 25000, paddingTop: 0, display: 'flex', justifyContent: 'start', flexDirection: 'column', overflow: 'auto', paddingTop: 50 }} data-theme={localTheme}>
                <div className='nav_bar_scnd' style={{ margin: 0, padding: 0, height: 50, borderRadius: 0, alignItems: 'start', position: 'fixed', top: 0, zIndex: 10000, }} data-theme={localTheme}>
                    <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', marginTop: 5 }}>
                        <div onClick={() => navigate(-1)} className='button_option_container' style={{ maxWidth: 50, marginLeft: 10, display: 'flex', background: 'none' }} data-theme={localTheme}>
                            <div className='button_option' style={{ height: 40, width: 40, borderRadius: 100, marginRight: 5 }} data-theme={localTheme}><FontAwesomeIcon icon={faArrowLeft} /></div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', maxWidth: 200, justifyContent: 'center' }}>
                            <img className='logo_event' style={{ height: 30 }} src={logo} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                        </div>
                    </div>
                </div>

                <h3 style={{ textAlign: 'center' }}>{t('last_view')}: {localTabs.length}/{localStorage.getItem('numRecentViews') || 10}</h3>

                <div className='cter_sect'>
                    <Select setSelectedValue={setEditeNumber} selectedValue={editeNumber} arrays={number_recently_views} localTheme={localTheme} />
                    <div className='button_optionRed' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 100, marginTop: 20 }}
                        onClick={() => {
                            handleClearIndexedDB()
                            addErrorMessage(`RecentViews a été nettoyé`, 3000, '#396afc')
                        }} data-theme={localTheme}>
                        {t('delete')}
                    </div>
                </div>

                <div className='cter_sect'>
                    <div className='ctent_arti' style={{ paddingTop: 10 }} data-theme={localTheme}>
                        <Card_articles type={true} promise={localTabs} />
                    </div>
                </div>
            </RemoveScroll>
        </>
    )
}

export default Recently_viewed