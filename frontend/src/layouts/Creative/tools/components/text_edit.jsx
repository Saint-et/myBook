import Rich_text from "../../rich_text/rich_text";


const Text_edit_Creative = (props) => {

    //console.log(props.drawText);

    if (!props.textCanvasVisible) return null;

    return (
        <>
            <div ref={props.containerTextRef}
                style={{
                    zIndex: 1000,
                    position: 'absolute',
                    left: props.drawText.positionX,
                    top: props.drawText.positionY,
                    width: 'auto',
                    height: 'auto',
                }}>
                <div className="resizable-box"
                    style={{
                        width: `${props.drawText.width}px`,
                        height: `${props.drawText.height}px`,
                        transform: `translate(${props.drawText.leftOffset}px, ${props.drawText.topOffset}px)`
                    }}
                    onDoubleClick={(e) => {
                        e.stopPropagation()
                    }}
                    data-theme={props.localTheme}>
                    <div
                        className="drag-handle-side drag-handle-side-top"
                        onMouseDown={(e) => props.handleMouseDownResizing(e, 'top')}
                    />
                    <div
                        className="drag-handle-side drag-handle-side-bottom"
                        onMouseDown={(e) => props.handleMouseDownResizing(e, 'bottom')}
                    />
                    <div
                        className="drag-handle-side drag-handle-side-left"
                        onMouseDown={(e) => props.handleMouseDownResizing(e, 'left')}
                    />
                    <div
                        className="drag-handle-side drag-handle-side-right"
                        onMouseDown={(e) => props.handleMouseDownResizing(e, 'right')}
                    />


                    <div
                        className="drag-handle drag-handle-top-left"
                        onMouseDown={(e) => props.handleMouseDownResizing(e, 'left-top')}
                    />
                    <div
                        className="drag-handle drag-handle-top-right"
                        onMouseDown={(e) => props.handleMouseDownResizing(e, 'right-top')}
                    />
                    <div
                        className="drag-handle drag-handle-bottom-left"
                        onMouseDown={(e) => props.handleMouseDownResizing(e, 'left-bottom')}
                    />
                    <div
                        className="drag-handle drag-handle-bottom-right"
                        onMouseDown={(e) => props.handleMouseDownResizing(e, 'right-bottom')}
                    />
                    <div
                        className="drag-handle-content drag-handle-content-right"
                        onMouseDown={(e) => props.handleMouseDownResizing(e, 'top-move')}
                    />
                    <div
                        className="drag-handle-content drag-handle-content-bottom"
                        onMouseDown={(e) => props.handleMouseDownResizing(e, 'top-move')}
                    />
                    <div
                        className="drag-handle-content drag-handle-content-left"
                        onMouseDown={(e) => props.handleMouseDownResizing(e, 'top-move')}
                    />
                    <div
                        className="drag-handle-content drag-handle-content-top"
                        onMouseDown={(e) => props.handleMouseDownResizing(e, 'top-move')}
                    />

                    <Rich_text text_canvasRef={props.text_canvasRef} drawText={props.drawText} setDrawText={props.setDrawText} />

                    {/*<textarea onChange={(e) => { props.setDrawText({...props.drawText, value: e.target.value}) }}
                        value={props.drawText.value}
                        className='input_textareaCreative'
                        autoFocus={true}
                        placeholder="Write here ..."
                        style={{
                            fontSize: props.drawText.fontSize,
                            color: props.drawText.color,
                            textDecoration: props.drawText.underline? 'underline' : 'none',
                            textUnderlineOffset: 10 
                        }}
                        type="text"
                        name=""
                        id=""
                        data-theme={props.localTheme}
                    />*/}
                </div>
            </div>
        </>
    )
}

export default Text_edit_Creative