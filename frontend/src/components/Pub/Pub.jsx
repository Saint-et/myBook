import imgCover from '../../assets/images/16390010_5736205.jpg';
import imgCover2 from '../../assets/images/13197662_SL-030320-28610-32.jpg';
import imgCover3 from '../../assets/images/8776468_25731.jpg';
import imgCover4 from '../../assets/images/13197662_ad.jpg';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { Link } from 'react-router-dom';
import { DATA_picv } from '../../assets/data/data';

const Pub = () => {
      
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
          href: '/parameters/premium'
        },
        {
          url: imgCover2,
          href:'/workspace/files'
        },
        {
          url: imgCover3,
          href:'/workspace/groups-files'
        },
        {
          url: imgCover4,
          href:'/workspace/files'
        }
      ];

    return (
        <>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{width: '100%', maxWidth: 800}}>
        <Slide>
         {slideImages.map((slideImage, index)=> (
            <div key={index}>
              <Link to={slideImage.href} style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})`, backgroundPosition: '50% 50%'}}></Link>
            </div>
          ))} 
        </Slide>
        </div>
        </div>
        
        </>
    )
}

export default Pub