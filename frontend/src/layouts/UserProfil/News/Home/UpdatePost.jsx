import { useRef, useState } from "react";
import { ContentState, EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { API_URL } from '../../../../config';
import axios from "axios";
import Posts from "../../../../components/Posts";


export const UpdatePost = (props) => {


    //const editor = useRef(null);

    const [title, setTitle] = useState(props.update.title)
    const [comments, setComments] = useState(null)
    const [img, setImg] = useState(props.update.imageUrl);
    const [imgUpload, setImgUpload] = useState('');
    const [errorFiles, setErrorFiles] = useState("");
    const [editeTags, setEditeTags] = useState(props.update.tags);
    const [text, setText] = useState('');


    //Methode afin de cacher le bouton pour choisir un fichier
    const hiddenFileInput = useRef(null);

    // utilisation d'un bouton personalisé pour choisir une image
    const handleClick = async () => {
        hiddenFileInput.current.click();

    };

    //console.log(props.update.data);


    //chargement de l'image & Affichage de l’image
    const handleLoad = (event) => {
        const fileUploaded = event.target.files[0]
        setImgUpload(fileUploaded);
        setImg(URL.createObjectURL(fileUploaded));
    };


    const [editorState, setEditorState] = useState(() => EditorState.createWithContent(ContentState.createFromText(convertFromRaw(JSON.parse(props.update.data)).getPlainText())));

    const onChange = (newEditorState) => {
        setEditorState(newEditorState);
    };

    const [preImg, setPreImg] = useState(props.update.imageUrl)

    const handleRemoveImg = () => {
        setImgUpload('')
        setImg('')
        setPreImg('')
    }

    const updatePost = async () => {
        setErrorFiles('')
        const contentStateRaw = convertToRaw(editorState.getCurrentContent());
        const contentStateJSON = JSON.stringify(contentStateRaw);
        const tags = JSON.stringify(editeTags);
        const formData = new FormData();
        formData.append("image", imgUpload || null);
        formData.append("imageUrl", preImg);
        formData.append("imageUrlDelete", props.update.imageUrl || null);
        formData.append("title", title);
        formData.append("data", contentStateJSON);
        formData.append("tags", tags);
        //    formData.append("comments", comments);
        try {
            await axios.put(`${API_URL}api/eventv/post/update-post/${props.update.id}`,
                formData
                , { withCredentials: true })
                .then(() => {
                    props.GetMyFilesFromAPIAnnouncement()
                    props.setAnnouncement(false)
                })
        } catch (error) {
            setErrorFiles(error.response.data.message)
        }
    }


    const handleChangeTags = (e) => {
        const expressionReguliere = /\s/;
        const regexTags = /#[a-zA-Z0-9_]+/g;
        const tagsTrouves = e.target.value.match(regexTags) || [];;

        // Utilisez setText pour mettre à jour l'état du texte
        setText(e.target.value);


        if (expressionReguliere.test(e.target.value) || e.target.value.length > 30 || e.key === 'Enter') {
            // Utilisez le setEditeTags pour mettre à jour l'état des tags
            e.preventDefault()
            setEditeTags(Array.from(new Set([...editeTags, ...tagsTrouves])));
            setText('');
        }
    };


    const handleRemoveTag = (el) => {
        const filteredPromise = editeTags?.filter((array) => array != el)
        setEditeTags(filteredPromise)
    }



    return (
        <Posts
            setAnnouncement={props.setAnnouncement}
            GetMyFilesFromAPIAnnouncement={props.GetMyFilesFromAPIAnnouncement}
            // setting
            title={title}
            hiddenFileInput={hiddenFileInput}
            handleLoad={handleLoad}
            setTitle={setTitle}
            onChange={onChange}
            imgUpload={imgUpload}
            handleRemoveImg={handleRemoveImg}
            img={img}
            handleClick={handleClick}
            editorState={editorState}
            editeTags={editeTags}
            handleRemoveTag={handleRemoveTag}
            handleChangeTags={handleChangeTags}
            text={text}
            comments={comments}
            setComments={setComments}
            submit={updatePost}

        />
    );
}

export default UpdatePost