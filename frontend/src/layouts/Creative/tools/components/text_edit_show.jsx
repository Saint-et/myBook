import { useEffect, useRef } from "react"


const Text_edit_show_Creative = (props) => {


    if (props.saveTextCanvas?.length === 0) return null


    return (
        <>
            {props.saveTextCanvas?.map((promise, index) => (
                <div key={promise.id}
                    style={{
                        zIndex: 100,
                        position: 'absolute',
                        left: promise.positionX,
                        top: promise.positionY,
                        width: `max-content`,
                        height: `max-content`,
                    }}>
                    <div className={props.textCanvasVisible ? "resizable-box-show-off" : props.openTools ? "resizable-box-show" : "resizable-box-show-off"}
                        onMouseDown={(e) => {
                            if (!props.textCanvasVisible) {
                                e.stopPropagation()
                            }
                        }}
                        onClick={(e) => {
                            if (!props.textCanvasVisible && props.openTools) {
                                e.stopPropagation()
                                props.handleRemoveSaveTextCanvas(
                                    promise
                                )
                                props.setTextCanvasVisible(true)
                            }
                        }}
                        style={{
                            width: `${promise.width}px`,
                            height: 'max-content',
                            wordBreak: 'break-word',
                            transform: `translate(${promise.leftOffset}px, ${promise.topOffset}px)`
                        }}
                    >
                        <div style={{
                            fontSize: promise.fontSize, 
                            color: promise.color, 
                            //textDecoration: promise.underline ? 'underline' : 'none', 
                            textAlign: promise.textAlign,
                            //textUnderlineOffset: 10 
                            }}>
                            <div dangerouslySetInnerHTML={{ __html: promise.value }} />
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Text_edit_show_Creative