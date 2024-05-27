import { EditorState, convertFromRaw } from "draft-js";
import Editor from '@draft-js-plugins/editor';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import { useEffect, useRef, useState } from "react";



const Text_manage = (props) => {


    const editor = useRef(null);
    const [promiseText, setPromiseText] = useState(() => EditorState.createEmpty());


    const linkifyPlugin = createLinkifyPlugin({ target: '_blank' });

    const convertData = (data) => {
        // Assuming 'res.data.data' contains the JSON string from the API response
        const jsonData = JSON.parse(data);

        // Convert the JSON data to ContentState
        const contentState = convertFromRaw(jsonData);

        // Create EditorState with the obtained ContentState
        const editorState = EditorState.createWithContent(contentState);

        // Set the EditorState in your component state or variable
        if (props.promiseText) {
            props.setPromiseText(editorState);
        } else {
            setPromiseText(editorState);
        }
    }

    useEffect(() => {
        if (props.data) {
            convertData(props.data)
        } else {
            setPromiseText(() => EditorState.createEmpty())
        }
    }, [props.data])

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <Editor
                ref={editor}
                editorState={props.promiseText ? props.promiseText : promiseText}
                onChange={props.promiseText ? (newEditorState) => props.setPromiseText(newEditorState) :  (newEditorState) => setPromiseText(newEditorState)}
                plugins={[linkifyPlugin]}
                readOnly={!props.readOnly}
                placeholder={"L’utilisateur n’a laissé aucun commentaire."}
            />
        </div>
    )
}

export default Text_manage