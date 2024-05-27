import Picture from '../assets/images/logo.png';
import { RemoveScroll } from 'react-remove-scroll';
import { useAppContext } from '../contexts/UseAppContext';
import LookImage from './lookImage/lookImage';

const Fullscreenimg = () => {
    const { fullScreenImg, setFullScreenImg, systemDetectMobile  } = useAppContext();




    //if (!fullScreenImg) return null

    if (!fullScreenImg) return null

    return (
        <>
            <RemoveScroll removeScrollBar={true} className='blanket open-element-page-melted' style={{ zIndex: 30000, display: 'flex', alignItems: 'center', justifyContent: 'center', top: 0, padding: 0 }} >

                <LookImage fullScreenImg={fullScreenImg.img} fullScreenFilter={fullScreenImg.filter} setFullScreenImg={setFullScreenImg} picture={Picture} mobile={systemDetectMobile} system={true} systemAdvanced={true} />

            </RemoveScroll>
        </>
    )
}

export default Fullscreenimg

//<div className='backgroundImg'>
//                    <img onWheel={myFunction} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ objectFit: 'contain', height: '100%', width: '100%', transform: `scale(${resize})`, objectPosition: '50% 100%' }} src={fullScreenImg.img || Picture} alt="" />
//                </div>


//   <LookImage fullScreenImg={fullScreenImg.img} setFullScreenImg={setFullScreenImg} picture={Picture} />