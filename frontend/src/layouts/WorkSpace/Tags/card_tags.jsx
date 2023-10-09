import { useDrag, useDrop } from 'react-dnd';
import { useAppContext } from '../../../contexts/UseAppContext';



// Fonction utilitaire pour réorganiser les éléments dans un tableau
const moveItem = (list, fromIndex, toIndex) => {
    const newList = [...list];
    const [movedItem] = newList.splice(fromIndex, 1);
    newList.splice(toIndex, 0, movedItem);
    return newList;
};

const DraggableItem = ({ item, index, moveItem, update, handleClick }) => {
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

    // animationHeart

    const { localTheme } = useAppContext();



    const itemStyles = {
        opacity: isDragging ? 0.5 : 1,
        transform: isDragging ? 'scale(0.9)' : 'scale(1)',
        transition: 'opacity 0.3s, transform 0.3s ease-in-out',
    };


    return (

        <div ref={(node) => ref(drop(node))} onClick={() => { handleClick(item) }} translate='no' key={index} className={update ? 'button_option' : 'button_optionRed'} style={{ width: '25%', minWidth: 187, ...itemStyles }} data-theme={localTheme}>
            {item}
        </div>
    );
};


const CardTagsMove = (props) => {


    const handleItemMove = (fromIndex, toIndex) => {
        const updatedItems = moveItem(props.items, fromIndex, toIndex);
        props.setItems(updatedItems);
    };


    return (

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
            {props.items?.map((item, index) => (
                <DraggableItem
                    key={item}
                    item={item}
                    index={index}
                    moveItem={handleItemMove}
                    arrayLength={props.items.length}
                    update={props.update}
                    handleClick={props.handleClick} />
            ))}
        </div>
    );
};

export default CardTagsMove;