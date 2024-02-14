import { useTranslation } from "react-i18next";
import { useAppContext } from "../../../contexts/UseAppContext";
import Warning from "../../../components/Warning";

const Problem_works = () => {
    const { localTheme, localThemeBackground } = useAppContext();
    const { t } = useTranslation();

    return (
        <div className='open-elementPage'>
            <Warning />
            <div className='cter_sect'>
                <div style={{ width: '97%' }}>
                    <div className="copy-box two text" data-theme={localTheme} data-background={localThemeBackground}>
                        <div className="inner">
                            <div className="line right"></div>

                            <h4>{t('Known_Issue')}!</h4>
                            <div>Retrouvé tous les probleme signalé sur vos projets.</div>

                        </div>
                    </div>
                </div>
            </div>

            <div className='cter_sect'>
                <div className='ctent_arti animation' data-theme={localTheme}>

                </div>
            </div>
        </div>
    )
}

export default Problem_works