import './Select.scss';
import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Select = (props) => {

    const { t } = useTranslation();

    const [select, setSelect] = useState(false)
    const [selectIndex, setSelectIndex] = useState(null)
    const [selectTranslate, setSelectTranslate] = useState([])

    const Ref = useRef(null);

    const useOutsideAlerter = (ref) => {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            const handleClickOutside = (event) => {
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

    useEffect(() => {
        if (props.assistanceTranslation) {
            setSelectTranslate(props.assistanceTranslation);
        }
    }, [props.assistanceTranslation])

    return (
        <>
            <div ref={Ref} className="container"
                style={{
                    width: props.styles?.width,
                    maxWidth: props.styles?.maxWidth,
                    marginTop: props.styles?.marginTop,
                    marginLeft: props.styles?.marginLeft,
                    marginBottom: props.styles?.marginBottom,
                    marginRight: props.styles?.marginRight,
                }}>
                <button onClick={() => { setSelect(true) }} className="select" name="select" value="options" data-theme={props.localTheme}>{selectTranslate[selectIndex] ? selectTranslate[selectIndex] : props.selectedValue || props.defaultValue || t('select')}</button>
                <div className={select ? "options options-element  active" : "options"} data-theme={props.localTheme}>
                    <div onClick={() => {
                        props.setSelectedValue(null)
                        setSelectIndex(null)
                        setSelect(false)
                    }} style={{ fontStyle: 'italic' }} className={props.selectedValue === null ? "item active" : "item"} data-theme={props.localTheme}>{t('none')}</div>
                    {props.arrays?.map((array, index) => (
                        <div onClick={() => {
                            props.setSelectedValue(array)
                            setSelectIndex(index)
                            setSelect(false)
                        }} className={props.selectedValue === array ? "item active" : "item"} data-theme={props.localTheme} key={index}>{selectTranslate[index] ? selectTranslate[index] : array}</div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Select