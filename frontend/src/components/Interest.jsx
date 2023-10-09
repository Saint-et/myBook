import { RemoveScroll } from 'react-remove-scroll';
import { useAppContext } from '../contexts/UseAppContext';
import sports from '../assets/Interest/sports.jpg';
import arts from '../assets/Interest/arts.jpg';
import manga from '../assets/Interest/manga.jpg';
import handicraft from '../assets/Interest/artisanat.jpg';
import cinema from '../assets/Interest/cinema.jpg';
import education from '../assets/Interest/education.jpg';
import code from '../assets/Interest/code.jpg';
import nature from '../assets/Interest/nature.jpg';
import space from '../assets/Interest/space.jpg';
import automobile from '../assets/Interest/automobile.jpg';
import games from '../assets/Interest/games.jpg';
import pastry from '../assets/Interest/Pastry.jpg';
import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import Condition from './condition';
import { spinner } from '../utils';

const Interest = () => {

  const { localTheme, promiseIdentifiedUser, GetMyProfilFromAPI } = useAppContext();
  const [deleteSpin, setDeleteSpin] = useState(true)


  const updateUser = async () => {
    setDeleteSpin(false)
    try {
      await axios.put(`${API_URL}api/eventv/update/user`,
        {
          condition: null
        },
        { withCredentials: true })
        .then(() => {
          setDeleteSpin(true)
          GetMyProfilFromAPI()
        })
    } catch (error) {

    }

  };


  if (!promiseIdentifiedUser) return null


  if (!promiseIdentifiedUser.user.interest) return (
    <>
      <div className='blanket animation' style={{ zIndex: 10500, display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
        <RemoveScroll className='menu_navbar scrollbar' style={{ width: '100%', flexDirection: 'column', maxWidth: 1100, height: '98%', overflowY: 'auto', background: 'none' }} data-theme={localTheme}>
          <Condition/>
          <div className='cter_sect' style={{ paddingBottom: 25 }}>
                    <div className='ctent_arti' data-theme={localTheme}>
                        <h3 style={{ marginTop: 10, width: '90%' }}>Do you accept our rules and terms of use?</h3>
                        <div style={{ width: '100%', maxWidth: 200, display: 'flex', marginTop: 10, justifyContent: 'space-between' }}>
                            <label htmlFor="opt8">
                                <input type="radio" name="rdo3" id="opt8" className="hidden" />
                                <span className="label">No</span>
                            </label>
                            <label htmlFor="opt9">
                                <input type="radio" name="rdo3" id="opt9" className="hidden" />
                                <span className="label">Yes</span>
                            </label>
                        </div>
                        <div className='button_option_container' style={{ width: '100%', maxWidth: 500, marginTop: 10 }} data-theme={localTheme}>
                        {deleteSpin ? <div className='button_optionBlue' onClick={updateUser} data-theme={localTheme}>Save</div>
                            :
                            <div className='button_optionDisable' style={{ background: 'none' }}>
                                {spinner()}
                            </div>}
                    </div>
                    </div>
                </div>
        </RemoveScroll>
      </div>
    </>
  )
}

export default Interest