import { useState } from "react";
import { DATA_picv } from "../../../assets/data/data";
import { useAppContext } from "../../../contexts/UseAppContext";
import imgCoverCard1 from '../../../assets/images/2151121007.jpg';
import MyGameComponentBeta from "./pages/MyGameComponentBeta";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faClock, faEye } from "@fortawesome/free-regular-svg-icons";

const GameWerewolf = () => {
    const { localTheme, promiseIdentifiedUser } = useAppContext()
    
    let levelUser = 2;

    const [play, setPlay] = useState(false)

    const onClick = () => {
        setPlay(false)

    }

    return (
        <>

            {!play ? <><div className='cter_sect'>
                <div className='ctent_arti' style={{ maxWidth: 800 }} data-theme={localTheme}>
                    <h1 className='textLoto' style={{ fontSize: 40, textAlign: 'center' }}>{DATA_picv} Game Werewolf Attack!</h1>

                    <div style={{ maxWidth: 600, backgroundImage: `url(${imgCoverCard1})`, backgroundPosition: `50% 50%`, display: 'flex', alignItems: 'center', justifyContent: 'center' }} className='CoverImage FlexEmbed FlexEmbed--2by1'>
                        {promiseIdentifiedUser &&<div onClick={() => { setPlay(!play) }} className='button_option_container textLoto' style={{ fontSize: 25, width: '100%', marginTop: 10, maxWidth: 300 }} data-theme={localTheme}>
                            <div className='btn'>Click to play</div>
                        </div>}
                    </div>

                    <div style={{ color: 'grey', fontSize: 13, marginTop: 10 }}>
                                <FontAwesomeIcon style={{ marginRight: 5 }} icon={faCirclePlay} />
                                453,
                                <FontAwesomeIcon style={{ marginRight: 5, marginLeft: 5 }} icon={faEye} />
                                768,
                                <FontAwesomeIcon style={{ marginRight: 5, marginLeft: 5 }} icon={faClock} />
                                1.5min
                            </div>


                    <div className="textBungeeSpice" style={{ textAlign: 'center' }}>
                        <div style={{ marginTop: 50 }}>
                            🌕 Bienvenue dans "Survie du Loup-Garou" 🐺
                        </div>

                        <div>
                            Plongez dans un monde de mystère et de danger où vous incarnez un redoutable loup-garou. Dans ce jeu d'action et de survie palpitant, votre mission est simple : survivre le plus longtemps possible face à des vagues incessantes de monstres et de créatures surnaturelles.
                        </div>

                        <div style={{ marginTop: 50 }}>
                            🔥 Affrontez des hordes de monstres :
                        </div>

                        <div>
                            Préparez-vous à combattre une variété de monstres vicieux, des gobelins aux vampires en passant par les loup-garous rivaux. Chaque vague est plus intense que la précédente, alors soyez prêt à relever le défi et à défendre votre territoire avec férocité.
                        </div>

                        <div style={{ marginTop: 50 }}>
                            💥 Affrontez des boss redoutables :
                        </div>

                        <div>
                            À intervalles réguliers, des boss redoutables émergeront pour mettre votre courage à l'épreuve. Ces créatures titanesques sont dotées de pouvoirs terrifiants et ne reculeront devant rien pour vous éliminer. Seul un loup-garou intrépide peut espérer les vaincre !
                        </div>
                        <div style={{ marginTop: 50 }}>
                            🌌 Évitez les dangers surnaturels :
                        </div>

                        <div>
                            En plus des monstres et des boss, vous devrez également affronter des phénomènes surnaturels imprévisibles. Des éclairs de foudre, des tempêtes de feu et d'autres manifestations magiques peuvent survenir à tout moment, mettant votre agilité à l'épreuve.
                        </div>
                        <div style={{ marginTop: 50 }}>
                            🏆 Battez-vous pour votre survie :
                        </div>
                        <div>
                            Votre objectif ultime est de survivre aussi longtemps que possible dans ce monde hostile. Gagnez des points en éliminant des ennemis et en restant en vie, et voyez jusqu'où vous pouvez aller sur le tableau des scores mondial. Seuls les loups-garous les plus intrépides peuvent espérer atteindre le sommet !
                        </div>
                        <div style={{ marginTop: 50 }}>
                            🌙 Êtes-vous prêt à relever le défi et à devenir le loup-garou ultime ? Plongez dans "Survie du Loup-Garou" dès maintenant et préparez-vous à une aventure épique dans l'obscurité de la nuit !
                        </div>
                    </div>
                </div>
            </div></>
                :
                <div className='cter_sect'>
                    <div className='ctent_arti' style={{ padding: 0, maxWidth: 'max-content', height: 700 }} data-theme={localTheme}>
                        {play && <MyGameComponentBeta 
                        onClick={onClick}
                        userPseudo={promiseIdentifiedUser?.user.pseudo}
                        userImg={promiseIdentifiedUser?.user.imageUrl}
                        userLevel={levelUser}
                         />}
                    </div>
                </div>}


        </>
    )
}

export default GameWerewolf