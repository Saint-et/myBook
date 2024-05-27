import { useState } from "react";
import { useAppContext } from "../../contexts/UseAppContext";


export const Manage_Tags = () => {

    const { promiseIdentifiedUser } = useAppContext();

    const [textTags, setTextTags] = useState('#');
    const [editeTags, setEditeTags] = useState([]);

    // Creation of tags for the search of the document
    const handleChangeTags = (e) => {
        setTextTags(e.target.value);
        const expressionReguliere = /\s/;
        if (expressionReguliere.test(e.target.value) || e.target.value.length > 30 || e.key === 'Enter') {
            const regexTags = /#[a-zA-Z0-9_]+/g;
            const tagsTrouves = e.target.value.match(regexTags) || [];
            // Vérifie si un élément avec les mêmes valeurs de propriété existe déjà dans le tableau
            const isNewTagUnique = editeTags.filter((el) => el.tag === tagsTrouves[0]);
            if (isNewTagUnique.length > 0 || tagsTrouves.length === 0) {
                setTextTags('#');
            } else {
                setEditeTags(Array.from(new Set([...editeTags, { tag: tagsTrouves[0], userId: promiseIdentifiedUser.user.id }])).splice(0, 10));
                setTextTags('#');
            }
        };
    }

    // Deleting a tag
    const handleRemoveTag = (el) => {
        const filteredPromise = editeTags?.filter((array) => array != el);
        setEditeTags(filteredPromise);
    };

    return {
        textTags,
        editeTags,
        setEditeTags,
        handleChangeTags,
        handleRemoveTag
    }
}