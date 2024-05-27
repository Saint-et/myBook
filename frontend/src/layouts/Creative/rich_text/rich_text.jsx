import { useEffect, useState } from "react";
import { useAppContext } from "../../../contexts/UseAppContext";




const Rich_text = (props) => {


    const {
        localTheme
    } = useAppContext()


    function getColorAtCursor() {
        let color = null;
        //let underline = null;
        let fontStyle = null;
        let fontWeight = null;

        // Vérifier si la sélection est prise en charge
        if (window.getSelection) {
            const selection = window.getSelection();

            // Vérifier si la sélection contient du texte
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);

                // console.log(range);

                // Vérifier si le parent de la sélection est un <span>
                const parentSpan = range.commonAncestorContainer.parentNode;

                if (parentSpan.nodeName === 'SPAN') {
                    color = parentSpan.style.color; // Récupérer la couleur du span
                    //underline = parentSpan.style.textDecoration;
                    fontStyle = parentSpan.style.fontStyle;
                    fontWeight = parentSpan.style.fontWeight;
                }
            }
        }

        //console.log(color);

        if (!color) {
            //console.log(1);
            //return;
            return props.setDrawText({ ...props.drawText, color2nd: props.drawText.color2nd, fontStyle: 'normal', fontWeight: 'normal' });
        }

        // Séparer les composantes RGB
        const [r, g, b] = color.match(/\d+/g);

        // Convertir les composantes en hexadécimal
        const hexR = parseInt(r).toString(16).padStart(2, '0');
        const hexG = parseInt(g).toString(16).padStart(2, '0');
        const hexB = parseInt(b).toString(16).padStart(2, '0');

        // Concaténer les composantes pour obtenir le code hexadécimal complet
        const hexColor = `#${hexR}${hexG}${hexB}`;

        return props.setDrawText({ ...props.drawText, color2nd: hexColor, fontStyle: fontStyle, fontWeight: fontWeight });
    }


    const preventDrag = (e) => {
        e.preventDefault();
    };
    return (
        <>
            <div ref={props.text_canvasRef}
                className='input_textareaCreative'
                style={{
                    userSelect: 'none',
                    fontSize: props.drawText.fontSize,
                    color: props.drawText.color,
                    textAlign: props.drawText.textAlign
                }}
                onMouseDown={(e) => {
                    e.stopPropagation()
                    getColorAtCursor()
                }}
                onMouseMove={(e) => {
                    e.stopPropagation()
                    getColorAtCursor()
                }}
                onDragStart={preventDrag}
                dangerouslySetInnerHTML={{ __html: props.drawText.value }}
                contentEditable={true}
                data-theme={localTheme} />
        </>
    )
}

export default Rich_text