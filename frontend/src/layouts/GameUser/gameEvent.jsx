import { useAppContext } from "../../contexts/UseAppContext";
import imgProfile from '../../assets/images/logo.png';
import imgCoverCard1 from '../../assets/images/2151121007.jpg';
import imgReward from '../../assets/images/2151013704.jpg';
import { useTranslation } from 'react-i18next';
import { DATA_picv } from "../../assets/data/data";
import { Link } from "react-router-dom";


const GameEvent = () => {

    const { localTheme, promiseIdentifiedUser } = useAppContext()

    const { t } = useTranslation();


    return (
        <>


            <div className='cter_sect'>
                <div className='ctent_arti' style={{ maxWidth: 500, marginBottom: 50, padding: 0 }} data-theme={localTheme}>
                    <h1 className='textLoto' style={{ fontSize: 40, textAlign: 'center' }}>{DATA_picv} Game Events</h1>
                </div>
            </div>

            <div className='cter_sect'>
                <div className='ctent_arti' style={{ maxWidth: 500, height: 600, justifyContent: 'space-between', marginBottom: 100 }} data-theme={localTheme}>
                    <div style={{ backgroundImage: `url(${imgCoverCard1})`, backgroundPosition: `50% ${50}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 0 }} className='CoverImage FlexEmbed FlexEmbed--2by1'>
                        <div className='shadowbox' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white' }}>
                            <img style={{ width: 100, height: 100 }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='Profile_picture hovercursor' src={promiseIdentifiedUser?.user.imageUrl || imgProfile} alt="" />
                            <div style={{ fontSize: 14 }}>by: {promiseIdentifiedUser?.user.pseudo}</div>
                            <h3 className='textLoto' style={{ fontSize: 40, margin: 0 }}>Werewolf Attack!</h3>
                        </div>
                    </div>
                    <div className="textBungeeSpice" style={{ fontSize: 20 }}>RewardName</div>
                    <img style={{ width: 140, height: 150, borderRadius: 10 }} src={imgReward} className="hovercursor" alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                    <div className="textBungeeSpice" style={{ fontSize: 20 }}>Lvl: 0</div>
                    <div className="textBungeeSpice" style={{ fontSize: 30 }}>20:10:03</div>
                    <Link to={`werewolf-attack`} className='button_option_container' style={{ width: '100%', marginTop: 10, maxWidth: 300 }} data-theme={localTheme}>
                        <div className='button_optionColoring'>{t('knowMore') + '...'}</div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default GameEvent