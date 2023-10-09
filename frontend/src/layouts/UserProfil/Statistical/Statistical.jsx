import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faEye, faHandshake, faShareNodes, faBoxes } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../../../contexts/UseAppContext';
import Warning from '../../../components/Warning';



const Statistical = (props) => {
  const { localTheme } = useAppContext()

    return (
        <>
        <Warning />

        <div className='cter_sect' style={{marginBottom: 30}}>
        <div className='ctent_arti' data-theme={localTheme}>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <h2>Statistical table</h2>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
        <div className='statistical_content' data-theme={localTheme}>
        <h4>Most visited article</h4>
              <div className='statistical_board'>
                <FontAwesomeIcon style={{fontSize: 20}} icon={faBoxes} />
                <div style={{marginLeft: 10}}>100m</div>
              </div>
        </div>
        <div className='statistical_content' data-theme={localTheme}>
        <h4>Number of visits</h4>
              <div className='statistical_board'>
                <FontAwesomeIcon style={{fontSize: 20}} icon={faEye} />
                <div style={{marginLeft: 10}}>100K</div>
              </div>
        </div>
        <div className='statistical_content' data-theme={localTheme}>
        <h4>Confidence index</h4>
              <div className='statistical_board'>
                <FontAwesomeIcon style={{fontSize: 20}} icon={faHandshake} />
                <div style={{marginLeft: 10}}>100m</div>
              </div>
        </div>
        <div className='statistical_content' data-theme={localTheme}>
        <h4>Number of follewers</h4>
              <div className='statistical_board'>
                <FontAwesomeIcon style={{fontSize: 20}} icon={faChartLine} />
                <div style={{marginLeft: 10}}>100m</div>
              </div>
        </div>
        <div className='statistical_content' data-theme={localTheme}>
        <h4>Number of shares</h4>
              <div className='statistical_board'>
                <FontAwesomeIcon style={{fontSize: 20}} icon={faShareNodes} />
                <div style={{marginLeft: 10}}>100m</div>
              </div>
        </div>
        </div>
        </div>
        </div>
        </>
    )
}

export default Statistical