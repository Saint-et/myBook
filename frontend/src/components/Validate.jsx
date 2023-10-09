import { RemoveScroll } from 'react-remove-scroll';
import { useAppContext } from '../contexts/UseAppContext';

const Validate = (props) => {
    
  const { localTheme } = useAppContext();

    return (
        <>
        <RemoveScroll className='blanket animation' style={{ zIndex: 11000, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', position: 'fixed', top: 0 }} >
        <div className='menu_navbar animation' style={{ width: '100%', maxWidth: 700, flexDirection: 'column', alignItems: 'center', position: 'fixed' }} data-theme={localTheme}>
          <div className='submenu_navbar_title' style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <h3 className='title_color'> {props.text} </h3>
          </div>
          
          <div className='button_option_container' style={{ width: '100%', maxWidth: 300, background: 'none' }} data-theme={localTheme}>
          <div className='button_option' onClick={() => props.handleValidate(true)} data-theme={localTheme}>yes</div>
          <div className='button_option' onClick={() => props.handleValidate(false)} style={{ color: 'red' }} data-theme={localTheme}>no</div>
          </div>
        </div>
        </RemoveScroll>
        </>
    )
}

export default Validate