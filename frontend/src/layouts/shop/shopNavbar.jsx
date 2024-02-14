import { useAppContext } from '../../contexts/UseAppContext';
import logo from '../../assets/images/shop.png';
import { faBagShopping, faBasketShopping, faBookOpen, faEllipsisVertical, faShirt } from '@fortawesome/free-solid-svg-icons';
import { faImages } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const ShopNavbar = () => {

    const { localTheme, isNavbarVisible } = useAppContext();

    return (
        <>
            <div className={!isNavbarVisible ? 'button_option_container nav_workspace' : 'button_option_container nav_workspace active'} style={{ width: '100%', display: 'flex', borderRadius: 0, position: 'sticky', zIndex: 100, flexDirection: 'column', overflow: 'hidden' }} data-theme={localTheme}>


                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '95%', maxWidth: 1800 }}>
                    <div>
                        <img src={logo} style={{ height: 30, margin: 5 }} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                    </div>

                    <div className='button_option_container hovercursor' style={{ width: 100 }} data-theme={localTheme}>
                        <div className='button_optionBlue' data-theme={localTheme}>
                        <div><FontAwesomeIcon style={{ marginRight: 10 }} icon={faEllipsisVertical} />Menu</div>
                        </div>
                    </div>
                </div>

            </div>

            <div className='cter_sect' style={{ marginTop: 20 }}>
                <div className='button_option_container' style={{ display: 'flex', zIndex: 100, flexWrap: 'wrap', justifyContent: 'center', background: 'none' }} data-theme={localTheme}>
                    <div className='button_optionColoringPurple hovercursor' style={{ width: 170, justifyContent: 'center', whiteSpace: 'nowrap', height: 40, borderRadius: 100, margin: 3 }} data-theme={localTheme}>
                        <div><FontAwesomeIcon style={{ marginRight: 10 }} icon={faImages} />Illustrations</div>
                    </div>
                    <div className='button_optionColoring hovercursor' style={{ width: 150, justifyContent: 'center', whiteSpace: 'nowrap', height: 40, borderRadius: 100, margin: 3 }} data-theme={localTheme}>
                        <div><FontAwesomeIcon style={{ marginRight: 10 }} icon={faBookOpen} />Manga</div>
                    </div>
                    <div className='button_optionColoringBlue hovercursor' style={{ width: 150, justifyContent: 'center', whiteSpace: 'nowrap', height: 40, borderRadius: 100, margin: 3 }} data-theme={localTheme}>
                        <div><FontAwesomeIcon style={{ marginRight: 10 }} icon={faBagShopping} />Shop</div>
                    </div>
                    <div className='button_optionGreen hovercursor' style={{ width: 150, justifyContent: 'center', whiteSpace: 'nowrap', height: 40, borderRadius: 100, margin: 3 }} data-theme={localTheme}>
                        <div><FontAwesomeIcon style={{ marginRight: 10 }} icon={faBasketShopping} />Basket</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopNavbar