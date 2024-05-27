import { useAppContext } from "../../../contexts/UseAppContext";
import { faA, faAlignCenter, faAlignJustify, faAlignLeft, faAlignRight, faBan, faBold, faEraser, faFont, faHighlighter, faItalic, faPalette, faRefresh, faT, faTextHeight, faUnderline } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const Tool_text = (props) => {

    //console.log(props.drawText.underline);


    const {
        localTheme
    } = useAppContext()
// , underline: underline

    const wrapSelectionInSpan = ({ color2nd: color2nd, fontStyle: fontStyle, fontWeight: fontWeight }) => {
        const selection = window.getSelection();

        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const selectedText = range.toString();

            console.log(selection);

            //console.log(selectedText.trim());

            if (selectedText.trim().length > 0) {

                const parentElement = range.commonAncestorContainer.parentNode;
                if (parentElement.nodeName === 'SPAN') {
                    const parentText = parentElement.textContent;

                    if (selectedText === parentText) {
                        // Si tout le texte du parent <span> est sélectionné, mettez à jour les styles du parent
                        applyStylesToSpanAndChildren(parentElement, color2nd, fontStyle, fontWeight);
                    } else {
                        // Si seulement une partie du texte est sélectionnée, créez un nouveau <span>
                        createNewSpanOutsideParent(range, color2nd, fontStyle, fontWeight, selectedText);
                    }
                } else {
                    // Créez un nouveau <span> autour de la sélection
                    const span = document.createElement('span');
                    span.className = 'selection-hover';
                    span.style.color = color2nd; // Style du span
                    //span.style.textDecoration = underline; // Style du span
                    span.style.fontStyle = fontStyle; // Style du span
                    span.style.fontWeight = fontWeight; // Style du span
                    range.deleteContents(); // Supprime le contenu sélectionné
                    range.insertNode(span); // Insère le span autour de la sélection
                    span.appendChild(document.createTextNode(selectedText)); // Ajoute le texte sélectionné dans le span

                }
            }
        }
        props.setDrawText({ ...props.drawText, color2nd, fontStyle, fontWeight });
    };


    const createNewSpanOutsideParent = (range, color2nd, fontStyle, fontWeight, selectedText) => {
        // Supprimez le contenu sélectionné
        range.deleteContents();

        // Créez un nouveau <span> autour de la sélection
        const span = document.createElement('span');
        span.className = 'selection-hover';
        span.style.color = color2nd;
        //span.style.textDecoration = underline;
        span.style.fontStyle = fontStyle;
        span.style.fontWeight = fontWeight;

        // Ajoutez le texte sélectionné dans le nouveau span
        span.appendChild(document.createTextNode(selectedText));

        // Insérez le nouveau span dans la position du texte sélectionné
        range.insertNode(span);

        // Sélectionner le texte après avoir appliqué le style
        const newRange = document.createRange();
        newRange.selectNodeContents(span);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(newRange);
    };

    const applyStylesToSpanAndChildren = (span, color2nd, fontStyle, fontWeight) => {
        // Appliquer les styles au <span> actuel
        span.style.color = color2nd;
        //span.style.textDecoration = underline;
        span.style.fontStyle = fontStyle;
        span.style.fontWeight = fontWeight;

        // Appliquer les styles à tous les enfants <span>
        const childrenSpans = span.getElementsByTagName('span');
        for (let childSpan of childrenSpans) {
            childSpan.style.color = color2nd;
            //childSpan.style.textDecoration = underline;
            childSpan.style.fontStyle = fontStyle;
            childSpan.style.fontWeight = fontWeight;
        }
    };



    function removeSpanAndRestoreText() {
        // Vérifier si la sélection est prise en charge
        if (window.getSelection) {
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const span = range.commonAncestorContainer.parentElement; // Obtenez le parent du nœud commun de la plage de sélection
                if (span.nodeName === 'SPAN') {
                    const parent = span.parentNode; // Obtenez le parent du span
                    const textNode = document.createTextNode(span.textContent); // Créez un nouveau nœud de texte avec le contenu du span
                    parent.insertBefore(textNode, span); // Insérez le nœud de texte avant le span
                    parent.removeChild(span); // Supprimez le span
                }
            }
        }
    }

    if (props.openTools === 4) return (
        <>
            <h4 style={{ margin: 10 }}>Text</h4>
            <div className="open-element-page-melted" style={{ width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: 10, marginTop: 10, flexDirection: 'column' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', maxWidth: 300, marginTop: 10, marginBottom: 5, flexWrap: 'wrap' }}>
                    <div onClick={() => { props.setDrawText({ ...props.drawText, textAlign: 'center' }) }} className={props.drawText.textAlign === 'center' ? 'buttonCircleCreative active' : 'buttonCircleCreative'} style={{ borderRadius: 5, fontSize: 14, height: 25, width: 25, padding: 5, margin: 5, fontSize: 20 }} data-theme={localTheme}>
                        <FontAwesomeIcon icon={faAlignCenter} />
                    </div>
                    <div onClick={() => { props.setDrawText({ ...props.drawText, textAlign: 'justify' }) }} className={props.drawText.textAlign === 'justify' ? 'buttonCircleCreative active' : 'buttonCircleCreative'} style={{ borderRadius: 5, fontSize: 14, height: 25, width: 25, padding: 5, margin: 5, fontSize: 20 }} data-theme={localTheme}>
                        <FontAwesomeIcon icon={faAlignJustify} />
                    </div>
                    <div onClick={() => { props.setDrawText({ ...props.drawText, textAlign: 'left' }) }} className={props.drawText.textAlign === 'left' ? 'buttonCircleCreative active' : 'buttonCircleCreative'} style={{ borderRadius: 5, fontSize: 14, height: 25, width: 25, padding: 5, margin: 5, fontSize: 20 }} data-theme={localTheme}>
                        <FontAwesomeIcon icon={faAlignLeft} />
                    </div>
                    <div onClick={() => { props.setDrawText({ ...props.drawText, textAlign: 'right' }) }} className={props.drawText.textAlign === 'right' ? 'buttonCircleCreative active' : 'buttonCircleCreative'} style={{ borderRadius: 5, fontSize: 14, height: 25, width: 25, padding: 5, margin: 5, fontSize: 20 }} data-theme={localTheme}>
                        <FontAwesomeIcon icon={faAlignRight} />
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', maxWidth: 300, marginTop: 10, marginBottom: 5, marginBottom: 50, flexWrap: 'wrap' }}>
                    <div className={props.textCanvasVisible ? 'buttonCircleCreative active' : 'buttonCircleCreative'} onClick={() => { props.setTextCanvasVisible(props.textCanvasVisible ? props.textCanvasVisible : !props.textCanvasVisible) }} style={{ borderRadius: 5, fontSize: 14, height: 25, width: 25, padding: 5, margin: 5, fontSize: 20 }} data-theme={localTheme}>
                        <FontAwesomeIcon icon={faA} />
                    </div>
                    <div onClick={() => { wrapSelectionInSpan({ ...props.drawText, fontWeight: props.drawText.fontWeight === 'bolder' ? 'normal' : 'bolder' }) }} className={props.drawText.fontWeight === 'bolder' ? 'buttonCircleCreative active' : 'buttonCircleCreative'} style={{ borderRadius: 5, fontSize: 14, height: 25, width: 25, padding: 5, margin: 5, fontSize: 20 }} data-theme={localTheme}>
                        <FontAwesomeIcon icon={faBold} />
                    </div>
                    {/*<div onClick={() => { wrapSelectionInSpan({ ...props.drawText, underline: props.drawText.underline === 'underline' ? 'none' : 'underline' }) }} className={props.drawText.underline === 'underline' ? 'buttonCircleCreative active' : 'buttonCircleCreative'} style={{ borderRadius: 5, fontSize: 14, height: 25, width: 25, padding: 5, margin: 5, fontSize: 20 }} data-theme={localTheme}>
                        <FontAwesomeIcon icon={faUnderline} />
    </div>*/}
                    <div onClick={() => { wrapSelectionInSpan({ ...props.drawText, fontStyle: props.drawText.fontStyle === 'italic' ? 'normal' : 'italic' }) }} className={props.drawText.fontStyle === 'italic' ? 'buttonCircleCreative active' : 'buttonCircleCreative'} style={{ borderRadius: 5, fontSize: 14, height: 25, width: 25, padding: 5, margin: 5, fontSize: 20 }} data-theme={localTheme}>
                        <FontAwesomeIcon icon={faItalic} />
                    </div>
                    <div onClick={() => {
                        props.handleDefaultDrawText()
                        props.setTextCanvasVisible(false)
                    }} className='buttonCircleCreative' style={{ borderRadius: 5, fontSize: 14, height: 25, width: 25, padding: 5, margin: 5, fontSize: 20 }} data-theme={localTheme}>
                        <FontAwesomeIcon icon={faEraser} />
                    </div>
                </div>

                <div style={{ display: 'flex', width: '90%', maxWidth: 300 }}>
                    <div className="range-container" style={{ minWidth: 150 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', maxWidth: 300 }}>
                            <FontAwesomeIcon style={{ marginRight: 5 }} icon={faTextHeight} />
                            Text size {props.drawText.fontSize} px
                            <div onClick={() => { props.setDrawText({ ...props.drawText, fontSize: parseInt(24) }) }} className='buttonCircleCreative' style={{ borderRadius: 5, fontSize: 14, height: 20, paddingLeft: 5, paddingRight: 5, width: 'max-content', marginLeft: 5 }} data-theme={localTheme}>
                                <FontAwesomeIcon icon={faRefresh} />
                            </div>
                        </div>
                        <input
                            type="range"
                            min={8}
                            max={100}
                            value={props.drawText.fontSize}
                            onChange={(e) => { props.setDrawText({ ...props.drawText, fontSize: parseInt(e.target.value) }) }}
                            className="range-input"
                        />
                    </div>
                    <input onChange={(e) => { props.setDrawText({ ...props.drawText, color: e.target.value }) }} value={props.drawText.color} style={{ minWidth: 35, height: 35, marginLeft: 10, appearance: 'none', background: 'none', border: 0, padding: 0, cursor: 'pointer' }} type="color" name="" id="" data-theme={localTheme} />

                    {props.textCanvasVisible &&
                        <input onChange={(e) => { wrapSelectionInSpan({ ...props.drawText, color2nd: e.target.value }) }} value={props.drawText.color2nd} style={{ minWidth: 35, height: 35, marginLeft: 10, appearance: 'none', background: 'none', border: 0, padding: 0, cursor: 'pointer' }} type="color" name="" id="" data-theme={localTheme} />}

                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', maxWidth: 300, marginTop: 10, marginBottom: 5, marginBottom: 50, flexWrap: 'wrap' }}>
                    <div onClick={() => removeSpanAndRestoreText()} className='buttonCircleCreative active' style={{ width: '100%', borderRadius: 5, height: 25, padding: 5, margin: 5, fontSize: 16 }} data-theme={localTheme}>
                        restored to its original color <FontAwesomeIcon style={{ marginLeft: 5 }} icon={faBan} />
                    </div>
                </div>
                {/*<textarea onChange={(e) => { props.setTextCanvas(e.target.value) }} value={props.textCanvas} className='input_text' style={{ width: '90%', maxWidth: 300, marginBottom: 50, resize: 'vertical', minHeight: 50 }} placeholder="Write here ..." maxLength={300} type="text" name="" id="" data-theme={localTheme} />*/}

            </div>
        </>
    )
}

export default Tool_text