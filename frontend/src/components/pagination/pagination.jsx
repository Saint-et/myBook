import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './pagination.scss';
import { faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';



const Pagination = (props) => {


    const nombre = props.pageCount;
    const tableau = Array.from({ length: nombre }, (_, index) => index + 1);

    return (
        <>
            <div className='pagination_container'>

                <div className='pagination_option_container_free' data-theme={props.localTheme}>
                    {/*<div onClick={() => {
                        const newSelected = Math.max(0, props.initialPage - 2);
                        props.onPageChange({ selected: newSelected });
                    }}
                        className='pagination_option' data-position={true} data-theme={props.localTheme}>
                        <FontAwesomeIcon icon={faAngleDoubleLeft} />
                </div>*/}
                    <div onClick={() => {
                        const newSelected = Math.max(0, props.initialPage - 1);
                        props.onPageChange({ selected: newSelected });
                    }}
                        className='pagination_option' data-position={true} data-theme={props.localTheme}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </div>
                </div>

                <div className='pagination_option_container_free scrollbar' style={{ display: 'flex', overflow: 'auto', alignItems: 'center', width: '98%' }} data-theme={props.localTheme}>
                    {tableau.map((page, index) => (
                        <div className={props.initialPage === index ? 'pagination_option active' : 'pagination_option'} onClick={() => { props.onPageChange({ selected: index }) }} style={{ paddingLeft: 5, paddingRight: 5, marginLeft: 5, marginRight: 5 }} key={page} data-theme={props.localTheme}>
                            {page}
                        </div>
                    ))}
                </div>

                <div className='pagination_option_container_free' data-theme={props.localTheme}>
                    <div onClick={() => {
                        const newSelected = Math.min(nombre - 1, props.initialPage + 1);
                        props.onPageChange({ selected: newSelected });
                    }} className='pagination_option' data-position={true} data-theme={props.localTheme}>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </div>
                    {/*<div onClick={() => {
                        const newSelected = Math.min(nombre - 1, props.initialPage + 2);
                        props.onPageChange({ selected: newSelected });
                    }}
                        className='pagination_option' data-position={true} data-theme={props.localTheme}>
                        <FontAwesomeIcon icon={faAngleDoubleRight} />
                </div>*/}
                </div>
            </div>
        </>
    )
}

export default Pagination