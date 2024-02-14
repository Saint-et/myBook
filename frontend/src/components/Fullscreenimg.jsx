import Picture from '../assets/images/logo.png';
import { RemoveScroll } from 'react-remove-scroll';
import { useAppContext } from '../contexts/UseAppContext';
import LookImage from './lookImage/lookImage';

const Fullscreenimg = () => {
    const { fullScreenImg, setFullScreenImg, localTheme } = useAppContext();




    if (!fullScreenImg) return null

    return (
        <>
            <RemoveScroll removeScrollBar={false} className='blanket scrollbar' style={{ zIndex: 30000, display: 'flex', alignItems: 'center', justifyContent: 'center', top: 0, overflowY: 'auto', padding: 0 }} >

                <LookImage fullScreenImg={fullScreenImg.img} setFullScreenImg={setFullScreenImg} picture={Picture} />

            </RemoveScroll>
        </>
    )
}

export default Fullscreenimg

//<div className='backgroundImg'>
//                    <img onWheel={myFunction} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ objectFit: 'contain', height: '100%', width: '100%', transform: `scale(${resize})`, objectPosition: '50% 100%' }} src={fullScreenImg.img || Picture} alt="" />
//                </div>


//   <LookImage fullScreenImg={fullScreenImg.img} setFullScreenImg={setFullScreenImg} picture={Picture} />