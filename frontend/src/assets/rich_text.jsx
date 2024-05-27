import { useEffect, useState } from "react";
import { useAppContext } from "../../../contexts/UseAppContext";




const Rich_text = (props) => {


    const {
        localTheme
    } = useAppContext()

    useEffect(() => {
        if (window.getSelection) {
            wrapSelectionInSpan(props.drawText.color2nd, props.drawText.underline, props.drawText.fontStyle, props.drawText.fontWeight)
        }
    }, [props.drawText.color2nd, props.drawText.underline, props.drawText.fontStyle, props.drawText.fontWeight])

    //console.log(props.drawText.underline);

    // Fonction pour envelopper la sélection de l'utilisateur dans un <span>
    const wrapSelectionInSpan = (color2nd, underline, fontStyle, fontWeight) => {
        //console.log(underline);
        // Vérifiez si la sélection est supportée par le navigateur
        const selection = window.getSelection();

        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const selectedText = range.toString();

            // console.log(selectedText);
            // console.log(range.commonAncestorContainer.data);

            //if (!range.commonAncestorContainer.data) {
            //    return;
            //}


            // Vérifiez si le parent de la sélection est déjà un <span>
            const parentElement = range.commonAncestorContainer.parentNode;
            // console.log(parentElement.nodeName);
            if (parentElement.nodeName === 'SPAN') {
                parentElement.style.color = color2nd; // Modifiez directement les styles du parent
                parentElement.style.textDecoration = underline; // Style du span
                parentElement.style.fontStyle = fontStyle; // Style du span
                parentElement.style.fontWeight = fontWeight; // Style du span
                //console.log(1);
            } else {
                // Créez un nouveau <span> autour de la sélection
                const span = document.createElement('span');
                span.className = 'selection-hover';
                span.style.color = color2nd; // Style du span
                span.style.textDecoration = underline; // Style du span
                span.style.fontStyle = fontStyle; // Style du span
                span.style.fontWeight = fontWeight; // Style du span
                range.deleteContents(); // Supprime le contenu sélectionné
                range.insertNode(span); // Insère le span autour de la sélection
                span.appendChild(document.createTextNode(selectedText)); // Ajoute le texte sélectionné dans le span
                //console.log(2);
            }
        }
        // 
        return props.setDrawText({ ...props.drawText, underline: underline, fontStyle: fontStyle, fontWeight: fontWeight });
    };

    //console.log(props.drawText);

    function getColorAtCursor() {
        let color = null;
        let underline = null;
        let fontStyle = null;
        let fontWeight = null;

        // Vérifier si la sélection est prise en charge
        if (window.getSelection) {
            const selection = window.getSelection();

            // Vérifier si la sélection contient du texte
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);

                console.log(range);

                // Vérifier si le parent de la sélection est un <span>
                const parentSpan = range.commonAncestorContainer.parentNode;

                if (parentSpan.nodeName === 'DIV') {
                    props.setDrawText({
                        ...props.drawText,
                        color2nd: props.drawText.color,
                        underline: 'none',
                        fontStyle: 'normal',
                        fontWeight: 'normal'
                    })
                }
                if (parentSpan.nodeName === 'SPAN') {
                    color = parentSpan.style.color; // Récupérer la couleur du span
                    underline = parentSpan.style.textDecoration;
                    fontStyle = parentSpan.style.fontStyle;
                    fontWeight = parentSpan.style.fontWeight;
                }
            }
        }

        //console.log(color);, color2nd: '#ffffff'

        return color ? rgbToHex(color, underline, fontStyle, fontWeight) : null //props.setDrawText({ ...props.drawText, color2nd: props.drawText.color, underline: underline, fontStyle: fontStyle, fontWeight: fontWeight });
    }

    function rgbToHex(rgb, underline, fontStyle, fontWeight) {
        // Séparer les composantes RGB
        const [r, g, b] = rgb.match(/\d+/g);

        // Convertir les composantes en hexadécimal
        const hexR = parseInt(r).toString(16).padStart(2, '0');
        const hexG = parseInt(g).toString(16).padStart(2, '0');
        const hexB = parseInt(b).toString(16).padStart(2, '0');

        // Concaténer les composantes pour obtenir le code hexadécimal complet
        const hexColor = `#${hexR}${hexG}${hexB}`;

       // console.log(hexColor)

        //return props.setDrawText({
        //    ...props.drawText,
        //    color2nd: hexColor,
        //    underline: underline,
        //    fontStyle: fontStyle,
        //    fontWeight: fontWeight
        //})
        // hexColor;
    }

    return (
        <>
            <div ref={props.text_canvasRef}
                className='input_textareaCreative'
                style={{
                    fontSize: props.drawText.fontSize,
                    color: props.drawText.color,
                    textAlign: props.drawText.textAlign
                }}
                onClick={(e) => {
                    e.stopPropagation()
                    getColorAtCursor()
                }}
                dangerouslySetInnerHTML={{ __html: props.drawText.value }}
                contentEditable={true}
                data-theme={localTheme} />
        </>
    )
}

export default Rich_text