import { useDrag, useDrop } from 'react-dnd';
import { useAppContext } from '../../contexts/UseAppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faBook, faRectangleList } from '@fortawesome/free-solid-svg-icons';


// Fonction utilitaire pour réorganiser les éléments dans un tableau
const moveItem = (list, fromIndex, toIndex) => {
    const newList = [...list];
    const [movedItem] = newList.splice(fromIndex, 1);
    newList.splice(toIndex, 0, movedItem);
    return newList;
};

const DraggableItem = ({ item, index, moveItem, manageSelected, handleDeleteImage, handleRestoreImage, arrayLength, type }) => {
    const [{ isDragging }, ref] = useDrag({
        type: 'ITEM',
        item: { index },
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


    const { handleFullScreen, localTheme } = useAppContext();



    const itemStyles = {
        opacity: isDragging ? 0.5 : 1,
        transform: isDragging ? 'scale(0.98)' : 'scale(1)',
        transition: 'opacity 0.3s, transform 0.3s ease-in-out',
    };


    return (

        <div ref={(node) => ref(drop(node))} className='card_picture' style={itemStyles} key={index} data-theme={localTheme}>
            <img loading="lazy" className={manageSelected?.filter((array) => array == item.imageUrl) != item.imageUrl? 'card_picture_img' : 'card_picture_img animationHeart' } onClick={() => handleFullScreen(type === 'Manga'? {img: item, analyse: true} : {img: item.imageUrl, analyse: false})} src={item.imageUrl} alt="" data-sizes={arrayLength <= 10 && 'big' || arrayLength <= 20 && 'medium' || arrayLength > 40 && 'small'} />

            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                {index == 0 && <FontAwesomeIcon style={{ marginRight: 10 }} icon={faImage} title='The first image is used as a thumbnail.' />}
                {type === 'Manga'&&<>
                {index == 1 && <FontAwesomeIcon style={{ marginRight: 10 }} icon={faBook} title='The first image is used as a cover.' />}
                </>}
                {item.caption &&<FontAwesomeIcon style={{ marginRight: 10 }} icon={faRectangleList} title='The first image is used as a cover.' />}
                <div style={{marginRight: 10, fontWeight: 800}}>{index + 1}</div>
                <div className="checkbox-wrapper-46">
                    <input
                        onChange={(e) => e.target.checked === true ? handleDeleteImage(item.imageUrl) : handleRestoreImage(item.imageUrl)}
                        checked={manageSelected?.filter((array) => array == item.imageUrl) == item.imageUrl}
                        className="inp-cbx" id={item.imageUrl} type="checkbox" />
                    <label className="cbx" htmlFor={item.imageUrl}><span>
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
                    key={index}
                    item={item}
                    index={index}
                    type={props.type}
                    manageSelected={props.manageSelected}
                    handleDeleteImage={props.handleDeleteImage}
                    handleRestoreImage={props.handleRestoreImage}
                    moveItem={handleItemMove}
                    arrayLength={props.items.length} />
            ))}
        </div>
    );
};

export default Card_picture;