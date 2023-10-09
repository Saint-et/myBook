import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../config';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { spinner } from '../../../utils';
import { useAppContext } from '../../../contexts/UseAppContext';
import CardTagsMove from './card_tags';
import { CirclePicker } from 'react-color';


const Tags = () => {
    const { localTheme, promiseIdentifiedUser, promiseGetTags: promise, itemsGetTags: items, GetTags, setItemsGetTags: setItems, setPromiseGetTags: setPromise } = useAppContext();


    const [nameTag, setNameTag] = useState('')
    const [errorFiles, setErrorFiles] = useState('');
    const [update, setUpdate] = useState(true);
    const [spin, setSpin] = useState(false);



    //const GetTags = async () => {
    //    await axios.get(`${API_URL}api/eventv/get/get-tags`,
    //        { withCredentials: true })
    //        .then((res) => {
    //            setPromise(res.data || [])
    //            setItems(res.data || [])
    //        })
    //}

    const UpdateTags = async () => {
        if (update === false) {
            if (promise !== items) {
                setSpin(true)
                await axios.put(`${API_URL}api/eventv/update/update-tags`, { tags: items },
                    { withCredentials: true })
                    .then(() => {
                        GetTags()
                        setSpin(false)
                        setErrorFiles("")
                        setNameTag('')
                    })
            } else {
                setUpdate(true)
                setErrorFiles("")
                setNameTag('')
            }
        }
        setUpdate(!update)
    }


    const handleClick = (name) => {
        if (update === false) {
            const filteredPromise = items.filter((array) => array != name)
            setItems(filteredPromise)
        }
    }


    const [text, setText] = useState('');

    const handleChangeTags = (e) => {
        const expressionReguliere = /\s/;
        const regexTags = /#[a-zA-Z0-9_]+/g;
        const tagsTrouves = e.target.value.match(regexTags) || [];;

        // Utilisez setText pour mettre à jour l'état du texte
        setText(e.target.value);


        if (expressionReguliere.test(e.target.value) || e.target.value.length > 30) {
            // Utilisez le setItems pour mettre à jour l'état des tags
            setItems(Array.from(new Set([...items, ...tagsTrouves])));
            setText('');
        }
    };


    useEffect(() => { GetTags() }, [])

    const [colorWorkManga, setColorWorkManga] = useState('');

    const customColors = [
        // red
        '#ff353d',
        '#ff000a',
        // oorange
        '#ff9b70',
        '#ff4d00',
        // yellow
        '#ffef77',
        '#ffe100',
        // pink
        '#ffa9c5',
        '#ff6294',
        // purple
        '#feadff',
        '#fd66ff',
        // blue
        '#afa6ff',
        '#6655ff',
        // cyan
        '#bee9ff',
        '#6ecfff',
        // green emeraude
        '#6affc8',
        '#00ffa2',
        // green
        '#86ff80',
        '#0dff00',
      ];


    if (!promiseIdentifiedUser) return null

    //if (nameTag.trim().split(/ +/).join(" ") === '') {
    //    //        return setErrorFiles("please fill in all fields.")
    //    //    }
    //}
    return (
        <div className='open-elementPage'>

            <div className='cter_sect' style={{ paddingBottom: 20, marginTop: 25 }}>
                <div className='ctent_arti' style={{ maxWidth: 900 }} data-theme={localTheme}>
                    <div style={{ width: '90%' }}>Atmosphere :</div>
                    <CirclePicker colors={customColors} onChange={(color) => { setColorWorkManga(color.hex) }} />
                </div>
            </div>

            <div className='cter_sect'>
                <div className='ctent_arti animation' data-theme={localTheme}>
                    {!update && <>
                        <div>Add new tags</div>
                        <input className='input_text' onChange={handleChangeTags} value={text} style={{ width: '100%' }} placeholder='Create tag' type="text" name="Named" id="Named" data-theme={localTheme} />
                    </>}
                    <div className='button_option_container' style={{ width: '100%', maxWidth: 500, display: 'flex', marginTop: 20 }} data-theme={localTheme}>
                        {!update && <><div className='button_option' onClick={() => {
                            setUpdate(true)
                            setItems(promise)
                            setErrorFiles("")
                            setNameTag('')
                        }} style={{ width: '100%' }} data-theme={localTheme}>
                            <div>{'Cancel'}</div>
                        </div></>}
                        <div onClick={UpdateTags} className='button_optionBlue' style={{ width: '100%' }} data-theme={localTheme}>
                            {update && <div>{'Tags edit'}</div>}
                            {!update && <div>{'Save'}</div>}
                        </div>
                    </div>

                    {errorFiles !== '' && <div style={{ color: 'red' }}>{errorFiles}</div>}

                    {spin && spinner()}
                    {!spin && <div className='button_option_container' style={{ width: '100%', maxWidth: 1500, display: 'flex', flexWrap: 'wrap', marginTop: 50 }} data-theme={localTheme}>

                        {!update ?
                            <CardTagsMove
                                promise={promise}
                                localTheme={localTheme}
                                setPromise={setPromise}
                                items={items}
                                setItems={setItems}
                                handleClick={handleClick}
                                update={update} />
                            : <>
                                {promise?.map((promise) => (
                                    <div onClick={() => { handleClick(promise) }} translate='no' key={promise} className={update ? 'button_option' : 'button_optionRed animationHeart'} style={{ width: '25%', minWidth: 187 }} data-theme={localTheme}>
                                        {promise}
                                    </div>
                                ))}
                            </>}
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Tags