import { useState } from 'react';
import './Select.scss';
import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Select = (props) => {
    
  const { t } = useTranslation();

    const [select, setSelect] = useState(false)

    const Ref = useRef(null);

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setSelect(false)
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    useOutsideAlerter(Ref);



    
    //const arrays = [
    //    'Sports',
    //    'Arts',
    //    'Cinema',
    //    'Manga',
    //    'Jeux',
    //    'Handicraft',
    //    'Education',
    //    'Code',
    //    'Nature',
    //    'Space',
    //    'Car'
    //]

    return (
        <>
            <div ref={Ref} className="container">
                <button onClick={() => { setSelect(true) }} className="select" name="select" value="options" data-theme={props.localTheme}>{props.selectedValue || t('select')}</button>
                <div className={select ? "options options-element  active" : "options"} data-theme={props.localTheme}>
                    <div onClick={() => {
                        props.setSelectedValue(null)
                        setSelect(false)
                    }} style={{ fontStyle: 'italic' }} className={props.selectedValue === null ? "item active" : "item"} data-theme={props.localTheme}>{t('none')}</div>
                    {props.arrays?.map((array, index) => (
                        <div onClick={() => {
                            props.setSelectedValue(array)
                            setSelect(false)
                        }} className={props.selectedValue === array ? "item active" : "item"} data-theme={props.localTheme} key={index}>{array}<img/></div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Select