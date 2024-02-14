import { DATA_picv } from "../../assets/data/data";
import { useAppContext } from "../../contexts/UseAppContext";
import imgCoverCard1 from '../../assets/images/2151121007.jpg';
import { Link } from "react-router-dom";


const GameList = () => {
    const { localTheme } = useAppContext()


    return (
        <>
            <div className='cter_sect'>
                <div className='ctent_arti' style={{ maxWidth: 500, marginBottom: 50, padding: 0 }} data-theme={localTheme}>
                    <h1 className='textLoto' style={{ fontSize: 40, textAlign: 'center' }}>{DATA_picv} Game List</h1>
                </div>
            </div>

            <div className='cter_sect'>
                <div className='ctent_arti' style={{ background: 'none' }} data-theme={localTheme}>
                    <Link to={`/${DATA_picv}-game/werewolf-attack`} className='card_user_presentation hovercursor' data-theme={localTheme}>
                        <div style={{ backgroundImage: `url(${imgCoverCard1})`, backgroundPosition: `50% 50%`, borderRadius: 5 }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='CoverImage FlexEmbed FlexEmbed--2by1'>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} data-theme={localTheme}>
                                <h3 className='textLoto' style={{ fontSize: 30, margin: 0 }}>Werewolf Attack!</h3>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default GameList