import { NavLink} from 'react-router-dom';
import './Option.scss';
import { spinner } from '../../utils';
import imgProfile from '../../assets/images/logo.png';
import Invited from '../../components/Invited';
import React, { useEffect } from "react";
import { useAppContext } from '../../contexts/UseAppContext';


const Option = () => {
  const {localTheme, promiseIdentifiedUser } = useAppContext()

  useEffect(() => {document.documentElement.scrollTop = 0;},[])


      if (promiseIdentifiedUser === false) return (
        <Invited localTheme={localTheme} />
      )

      if (!promiseIdentifiedUser) return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 100}}>
          {spinner()}
        </div>
      )

    return (
        <>
        <div className='cter_sect' style={{marginBottom: 20, marginTop: 20}}>
        <div className='ctent_arti' style={{maxWidth: 600}} data-theme={localTheme}>
        <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <h1><span translate='no'>Event-V</span>&nbsp;information</h1>
                    <div style={{display: 'flex', width: '100%',justifyContent: 'space-around', alignItems: 'center', padding: 10, borderRadius: 25}}>
                    <img onMouseDown={(e)=>e.preventDefault()} onContextMenu={(e)=>e.preventDefault()} className='Profile_picture' style={{width: 100, height: 100}} src={promiseIdentifiedUser.user.imageUrl || imgProfile} alt="" />
                    </div>
                    {promiseIdentifiedUser.user.premium == 0&&<div className='free' translate='no'>Free</div>}
                    {promiseIdentifiedUser.user.premium == 1&&<div className='premium' translate='no'>Premium</div>}

                    <ul>
                        <li><span translate='no' style={{color: '#d18800', fontWeight: 800}}>Premium</span>&nbsp;will allow you to take full advantage of the application such as adding cover image, more options in the workspace ...</li>
                    </ul>

                    <h2>Menu</h2>

                    <div className='container_option_parameters'>
                    <NavLink to={'/parameters/premium'} translate='no' className='button_option' data-theme={localTheme}><h4 translate='no' style={{color: '#d18800'}}>Premium</h4></NavLink>
                    <NavLink to={'/parameters/customization'} className='button_option' data-theme={localTheme}>Parameter account</NavLink>
                    <NavLink to={'/parameters/assistance'} className='button_option' style={{color: '#0058aa'}} data-theme={localTheme}>Assistance</NavLink>
                    <NavLink to={'/parameters/delete-account'} className='button_option' style={{color: 'red'}} data-theme={localTheme}>Delete account</NavLink>
                    </div>
                </div>
        </div>
        </div>
        </>
    )
}

export default Option