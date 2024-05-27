import imgCover from '../../assets/images/16390010_5736205.jpg';
import imgCover2 from '../../assets/images/13197662_SL-030320-28610-32.jpg';
import imgCover3 from '../../assets/images/8776468_25731.jpg';
import imgCover4 from '../../assets/images/13197662_ad.jpg';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { Link } from 'react-router-dom';
import PubImgDefaut from "../../assets/images/background.jpg";

import imgPubTest from '../../assets/gif/anime-skirt.gif';

import { SystemName } from '../../assets/data/data';
import { useAppContext } from '../../contexts/UseAppContext';
import Card_articles_side from '../Cards/Card_articles_side';

const Pub = (props) => {

  const { localTheme } = useAppContext();

  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: '200px'
  }

  const slideImages = [
    {
      url: imgCover,
      href: '#'
    },
    {
      url: imgCover2,
      href: '#'
    },
    {
      url: imgCover3,
      href: '#'
    },
    {
      url: imgCover4,
      href: '#'
    }
  ];

  if (props.pubType === 'side') return (
    <div className='cter_sect' style={{ padding: 0 }}>
      <div className='ctent_arti' data-theme={localTheme}>
        <h4 style={{ color: 'grey', margin: 0 }}>{SystemName}</h4>
        <div className='scrollbar' style={{ display: 'flex', overflow: 'auto', alignItems: 'center', width: '98%' }}>
          <Card_articles_side promise={undefined} />
        </div>
      </div>
    </div>
  )

  if (props.pubType === 'banner') return (
    <div className='cter_sect' style={{ padding: 0 }}>
      <div style={{ width: '90%', maxWidth: 'max-content' }} className='ctent_arti open-element-page-melted' data-theme={localTheme}>
        <h4 style={{ color: 'grey', margin: 0 }}>{SystemName}-add</h4>
        <img className="hovercursor" src={imgPubTest || PubImgDefaut} style={{ height: 'auto', maxHeight: 200, width: '98%', maxWidth: 800, objectFit: 'contain', cursor: 'pointer' }} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
      </div>
    </div>
  )

  return (
    <>
      <div className='cter_sect' style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 0 }}>
        <div style={{ width: '100%', maxWidth: 800 }}>
          <Slide>
            {slideImages.map((slideImage, index) => (
              <div key={index}>
                <Link to={slideImage.href} style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})`, backgroundPosition: '50% 50%' }}></Link>
              </div>
            ))}
          </Slide>
        </div>
      </div>

    </>
  )
}

export default Pub