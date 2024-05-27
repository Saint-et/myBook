import { useDrag, useDrop } from 'react-dnd';
import { useAppContext } from '../../contexts/UseAppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faBook, faRectangleList, faRoute, faLock, faLockOpen, faThumbTack, faBagShopping, faWandSparkles } from '@fortawesome/free-solid-svg-icons';
import { faClone, faCopy, faGem, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import dayjs from "dayjs";
import 'dayjs/locale/fr';
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);


// Fonction utilitaire pour réorganiser les éléments dans un tableau
const moveItem = (list, fromIndex, toIndex) => {
    const newList = [...list];
    const [movedItem] = newList.splice(fromIndex, 1);
    newList.splice(toIndex, 0, movedItem);
    return newList;
};

const DraggableItem = ({ item, items, index, moveItem, manageSelected, handleDeleteImage, handleRestoreImage, handleCopyShow, arrayLength, type, copyShow, isDraggable, manageBlockSelected }) => {
    const [{ isDragging }, ref] = useDrag({
        type: 'ITEM',
        item: { index },
        canDrag: isDraggable,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: 'ITEM',
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveItem(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });


    const { handleFullScreen, handleFullscreenimgAnalyse, localTheme } = useAppContext();



    const itemStyles = {
        opacity: isDragging ? 0.5 : 1,
        transform: isDragging ? 'scale(0.98)' : 'scale(1)',
        transition: 'opacity 0.3s, transform 0.3s ease-in-out',
    };

    // dayjs(item.updatedAt).add(0, 'hour').locale('fr').fromNow()

    // dayjs(item.updatedAt).format('DD/MM/YYYY HH:mm:ss')

    return (

        <div ref={(node) => ref(drop(node))} className='card_picture'
            title={` Name: ${item.imageUrl.split('/uploads/')[1]}\nlocation: ${index + 1}\nOrder: ${item.order}\nAmended on: ${dayjs(item.updatedAt).format('DD/MM/YYYY HH:mm:ss')}\nCreated on: ${dayjs(item.createdAt).format('DD/MM/YYYY HH:mm:ss')}`} style={itemStyles} key={index} data-theme={localTheme}>
            <img loading="lazy" className={
                copyShow[0] == item.imageUrl.split('/')[4].split('-')[1] ?
                    'card_picture_img card_picture_imgWarning'
                    :
                    'card_picture_img'

            } onClick={() => handleFullscreenimgAnalyse({ element: item })} src={item.imageUrl} alt="" data-sizes={arrayLength <= 10 && 'big' || arrayLength <= 20 && 'medium' || arrayLength > 40 && 'small'} />

            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                {index + 1 !== item.order && '📌'}
                {index == 0 && <FontAwesomeIcon style={{ marginRight: 10 }} icon={faImage} title='The first image is used as a thumbnail.' />}
                {item.limited === 3 && <div className='badge' style={{ marginRight: 10, borderRadius: 5 }} data-theme={localTheme}>🔒</div>}
                {item.limited === 2 && <div className='badgeShop' style={{ marginRight: 10 }}><FontAwesomeIcon icon={faWandSparkles} /></div>}
                {item.limited === 1 && <div className='badgeColoring' style={{ marginRight: 10 }}><FontAwesomeIcon icon={faGem} /></div>}
                {item.caption && <FontAwesomeIcon style={{ marginRight: 10 }} icon={faRectangleList} title='The first image is used as a cover.' />}
                {manageBlockSelected === index && <FontAwesomeIcon style={{ marginRight: 10, color: '#ffbb00' }} icon={faRoute} />}
                {index === arrayLength - 1 && <FontAwesomeIcon style={{ marginRight: 10, color: '#747474' }} icon={faBook} />}

                {items.filter((array) => array.imageUrl.split('-').slice(1).join('-') == item.imageUrl.split('-').slice(1).join('-')).length > 1 &&
                    <FontAwesomeIcon onClick={() => { copyShow.length == 1 ? handleCopyShow(null) : handleCopyShow(items.filter((array) => array.id == item.id)) }} style={{ marginRight: 10, color: 'red', cursor: 'pointer' }} icon={faClone} />}
                <div style={{ marginRight: 10, fontWeight: 800 }}>{index + 1}</div>
                <div className="checkbox-wrapper-46">
                    <input
                        onChange={(e) => e.target.checked === true ? handleDeleteImage(item.id, index) : handleRestoreImage(item.id, index)}
                        //checked={manageSelected?.some((array) => array.id === item.id)}
                        checked={manageSelected?.some((array) => array === item.id)}
                        className="inp-cbx" id={item.id} type="checkbox" />
                    <label className="cbx" htmlFor={item.id}><span>
                        <svg width="12px" height="12px" viewBox="0 0 12 10">
                            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                        </svg></span>
                    </label>
                </div>
            </div>
        </div>
    );
};


const Card_picture = (props) => {


    const handleItemMove = (fromIndex, toIndex) => {
        const updatedItems = moveItem(props.items, fromIndex, toIndex);
        props.setItems(updatedItems);
    };




    return (

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
            {props.items?.map((item, index) => (
                <DraggableItem
                    manageBlockSelected={props.manageBlockSelected}
                    isDraggable={props.isDraggable}
                    key={index}
                    item={item}
                    items={props.items}
                    index={index}
                    type={props.type}
                    manageSelected={props.manageSelected}
                    handleDeleteImage={props.handleDeleteImage}
                    handleRestoreImage={props.handleRestoreImage}
                    handleCopyShow={props.handleCopyShow}
                    moveItem={handleItemMove}
                    copyShow={props.copyShow}
                    arrayLength={props.items.length} />
            ))}
        </div>
    );
};

export default Card_picture;