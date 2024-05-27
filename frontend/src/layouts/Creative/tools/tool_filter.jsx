import { useAppContext } from "../../../contexts/UseAppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleHalfStroke, faRefresh, faSwatchbook } from "@fortawesome/free-solid-svg-icons";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";




const Tools_filter = (props) => {

    const [active, setActive] = useState(false)

    const {
        localTheme
    } = useAppContext()

    if (props.openTools === 5) return (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h3>Filter</h3>
                <div onClick={props.resetToDefault} className='button_optionRed' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 'max-content', marginLeft: 5 }} data-theme={localTheme}>
                    <FontAwesomeIcon icon={faRefresh} />
                </div>
            </div>

            <div className="open-element-page-melted" style={{ width: '100%', display: 'flex', justifyContent: 'space-around', marginBottom: 10, marginTop: 10, flexDirection: 'column' }}>
                <div className="range-container" style={{ minWidth: 150, marginBottom: 50, marginTop: 20 }}>

                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', maxWidth: 300 }}>
                        <FontAwesomeIcon style={{ marginRight: 5 }} icon={faLightbulb} />
                        Brightness {props.systemSettingFake?.brightness || props.systemSetting?.brightness} %
                        <div onClick={() => { props.setSystemSetting({ ...props.systemSetting, brightness: parseInt(100) }) }} className='button_option' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 'max-content', marginLeft: 5 }} data-theme={localTheme}>
                            <FontAwesomeIcon icon={faRefresh} />
                        </div>
                    </div>

                    <input
                        type="range"
                        min={0}
                        max={200}
                        value={props.systemSettingFake?.brightness || props.systemSetting?.brightness}
                        onInput={(e) => {
                            props.setSystemSetting({ ...props.systemSetting, brightness: parseInt(e.target.value) })   
                        }}
                        className="range-input"
                        onMouseDown={() => {setActive(true)}}
                        onMouseUp={
                            active ? () => {
                                props.draw()
                                setActive(false)
                            }
                                : null}
                    />
                </div>
                <div className="range-container" style={{ minWidth: 150, marginBottom: 50 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', maxWidth: 300 }}>
                        <FontAwesomeIcon style={{ marginRight: 5 }} icon={faCircleHalfStroke} />
                        Contrast {props.systemSetting?.contrast} %
                        <div onClick={() => { props.setSystemSetting({ ...props.systemSetting, contrast: parseInt(100) }) }} className='button_option' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 'max-content', marginLeft: 5 }} data-theme={localTheme}>
                            <FontAwesomeIcon icon={faRefresh} />
                        </div>
                    </div>
                    <input
                        type="range"
                        min={0}
                        max={200}
                        value={props.systemSetting?.contrast}
                        onChange={(e) => {
                            props.setSystemSetting({ ...props.systemSetting, contrast: parseInt(e.target.value) })
                        }}
                        className="range-input"
                        onMouseDown={() => {setActive(true)}}
                        onMouseUp={
                            active ? () => {
                                props.draw()
                                setActive(false)
                            }
                                : null}
                    />
                </div>
                <div className="range-container" style={{ minWidth: 150, marginBottom: 50 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', maxWidth: 300 }}>
                        <FontAwesomeIcon style={{ marginRight: 5 }} icon={faSwatchbook} />
                        Saturation {props.systemSetting?.saturation} %
                        <div onClick={() => { props.setSystemSetting({ ...props.systemSetting, saturation: parseInt(100) }) }} className='button_option' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 'max-content', marginLeft: 5 }} data-theme={localTheme}>
                            <FontAwesomeIcon icon={faRefresh} />
                        </div>
                    </div>
                    <input
                        type="range"
                        min={0}
                        max={200}
                        value={props.systemSetting?.saturation}
                        onChange={(e) => {
                            props.setSystemSetting({ ...props.systemSetting, saturation: parseInt(e.target.value) })
                        }}
                        className="range-input"
                        onMouseDown={() => {setActive(true)}}
                        onMouseUp={
                            active ? () => {
                                props.draw()
                                setActive(false)
                            }
                                : null}
                    />
                </div>
                <div className="range-container" style={{ minWidth: 150, marginBottom: 50 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', maxWidth: 300 }}>
                        <FontAwesomeIcon style={{ marginRight: 5 }} icon={faSwatchbook} />
                        Sepia {props.systemSetting?.sepia} %
                        <div onClick={() => { props.setSystemSetting({ ...props.systemSetting, sepia: parseInt(0) }) }} className='button_option' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 'max-content', marginLeft: 5 }} data-theme={localTheme}>
                            <FontAwesomeIcon icon={faRefresh} />
                        </div>
                    </div>
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={props.systemSetting?.sepia}
                        onChange={(e) => {
                            props.setSystemSetting({ ...props.systemSetting, sepia: parseInt(e.target.value) })
                        }}
                        className="range-input"
                        onMouseDown={() => {setActive(true)}}
                        onMouseUp={
                            active ? () => {
                                props.draw()
                                setActive(false)
                            }
                                : null}
                    />
                </div>
                <div className="range-container" style={{ minWidth: 150, marginBottom: 50 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', maxWidth: 300 }}>
                        <FontAwesomeIcon style={{ marginRight: 5 }} icon={faSwatchbook} />
                        Grayscale {props.systemSetting?.grayscale} %
                        <div onClick={() => { props.setSystemSetting({ ...props.systemSetting, grayscale: parseInt(0) }) }} className='button_option' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 'max-content', marginLeft: 5 }} data-theme={localTheme}>
                            <FontAwesomeIcon icon={faRefresh} />
                        </div>
                    </div>
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={props.systemSetting?.grayscale}
                        onChange={(e) => {
                            props.setSystemSetting({ ...props.systemSetting, grayscale: parseInt(e.target.value) })
                        }}
                        className="range-input"
                        onMouseDown={() => {setActive(true)}}
                        onMouseUp={
                            active ? () => {
                                props.draw()
                                setActive(false)
                            }
                                : null}
                    />
                </div>
                <div className="range-container" style={{ minWidth: 150, marginBottom: 50 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', maxWidth: 300 }}>
                        <FontAwesomeIcon style={{ marginRight: 5 }} icon={faSwatchbook} />
                        Invert {props.systemSetting?.invert} %
                        <div onClick={() => { props.setSystemSetting({ ...props.systemSetting, invert: parseInt(0) }) }} className='button_option' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 'max-content', marginLeft: 5 }} data-theme={localTheme}>
                            <FontAwesomeIcon icon={faRefresh} />
                        </div>
                    </div>
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={props.systemSetting?.invert}
                        onChange={(e) => {
                            props.setSystemSetting({ ...props.systemSetting, invert: parseInt(e.target.value) })
                        }}
                        className="range-input"
                        onMouseDown={() => {setActive(true)}}
                        onMouseUp={
                            active ? () => {
                                props.draw()
                                setActive(false)
                            }
                                : null}
                    />
                </div>
                <div className="range-container" style={{ minWidth: 150, marginBottom: 50 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', maxWidth: 300 }}>
                        <FontAwesomeIcon style={{ marginRight: 5 }} icon={faSwatchbook} />
                        Hue {props.systemSetting?.hue} %
                        <div onClick={() => { props.setSystemSetting({ ...props.systemSetting, hue: parseInt(0) }) }} className='button_option' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 'max-content', marginLeft: 5 }} data-theme={localTheme}>
                            <FontAwesomeIcon icon={faRefresh} />
                        </div>
                    </div>
                    <input
                        type="range"
                        min={0}
                        max={350}
                        value={props.systemSetting?.hue}
                        onChange={(e) => {
                            props.setSystemSetting({ ...props.systemSetting, hue: parseInt(e.target.value) })
                        }}
                        className="range-input"
                        onMouseDown={() => {setActive(true)}}
                        onMouseUp={
                            active ? () => {
                                props.draw()
                                setActive(false)
                            }
                                : null}
                    />
                </div>
                <div className="range-container" style={{ minWidth: 150, marginBottom: 50 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', maxWidth: 300 }}>
                        <FontAwesomeIcon style={{ marginRight: 5 }} icon={faSwatchbook} />
                        Blur {props.systemSetting?.blur} %
                        <div onClick={() => { props.setSystemSetting({ ...props.systemSetting, blur: parseInt(0) }) }} className='button_option' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 'max-content', marginLeft: 5 }} data-theme={localTheme}>
                            <FontAwesomeIcon icon={faRefresh} />
                        </div>
                    </div>
                    <input
                        type="range"
                        min={0}
                        max={10}
                        value={props.systemSetting?.blur}
                        onChange={(e) => {
                            props.setSystemSetting({ ...props.systemSetting, blur: parseInt(e.target.value) })
                        }}
                        className="range-input"
                        onMouseDown={() => {setActive(true)}}
                        onMouseUp={
                            active ? () => {
                                props.draw()
                                setActive(false)
                            }
                                : null}
                    />
                </div>
            </div>
        </>
    )
}

export default Tools_filter