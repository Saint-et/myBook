import { useTranslation } from "react-i18next";
import { useAppContext } from "../../../contexts/UseAppContext";
import Warning from "../../../components/Warning";

const Problem_works = () => {
    const { localTheme} = useAppContext();
    const { t } = useTranslation();

    return (
        <div className='open-element-page-melted'>
            <Warning />
            <div className='cter_sect'>
                <div style={{ width: '97%' }}>
                    <div className="copy-box two" data-theme={localTheme}>
                        <div className="inner">
                            <div className="line right"></div>

                            <h4>{t('Known_Issue')}!</h4>
                            <div>Retrouvé tous les probleme signalé sur vos projets.</div>

                        </div>
                    </div>
                </div>
            </div>

            <div className='cter_sect'>
                <div className='ctent_arti' data-theme={localTheme}>

                </div>
            </div>
        </div>
    )
}

export default Problem_works