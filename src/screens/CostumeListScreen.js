import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import { listCostumes } from "../actions/costumeActions";


function CostumeListScreen (props) {
    // Initialize
    const costumesList = useSelector(state => state.costumesList);
    const { costumes, loading, error } = costumesList;
    const dispatch = useDispatch();

    // Paginate Results
    const lastEntryIndex = costumes.length - 1;
    const lastEntryCostume = costumes[lastEntryIndex];
    const pageCount = lastEntryCostume ? lastEntryCostume.page : 0;
    const [page, setPage] = useState(1);
    const pageHandler = (value) => {
        var selectedPage = value;
        setPage(selectedPage);
    }
    const goPreviousPage = () => {
        page === 1 ? setPage(1) : setPage(page - 1);
    }
    const goNextPage = () => {
        page === pageCount ? setPage(pageCount) : setPage(page + 1)
    }

    // Build Paginator Buttons
    let paginationElements = []
    for( var i = 1; i < pageCount+1; i++){        
        (function(index) {
            let page_button =<button
                className={index === page ? 'page-button active' : 'page-button'} 
                value={index}
                key={'page_button_'+index}
                onClick={() => pageHandler(index)}
            >{index}</button>
            paginationElements.push(page_button)
        })(i);        
    };

    // Keyword Search
    const [searchKeyword, setSearchKeyword] = useState('');
    const searchHandler = (e) =>{
        e.preventDefault();
        setFilterParam('');
        setSortOrder('');
        dispatch(listCostumes(searchKeyword));
        setSearchKeyword('');
    }

    // Sort Results
    const [sortOrder, setSortOrder] = useState('');
    const sortHandler = (e) => {
        var selectedSortOrder = e.target.value;
        setSortOrder(selectedSortOrder);
        dispatch(listCostumes(searchKeyword, filterParam, selectedSortOrder));
    }

    // Filter Results
    const [filterParam, setFilterParam] = useState('');
    const filterHandler = (e) => {
        var selectedFilterParam = e.target.value;
        setFilterParam(e.target.value);
        setPage(1);
        dispatch(listCostumes(searchKeyword, selectedFilterParam, sortOrder));        
    }

    useEffect(() => {
        dispatch(listCostumes());
        return () => {
            //
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Render Results
    const renderedCostumes = costumes.filter((costume) =>{
        return costume.page === page;
    });

    // Build costume list frontend
    const costumeListElements = (renderedCostumesList) =>{
        return renderedCostumesList.map(costume => (
            <li key={costume._id}>
                <div className="costume">
                    <div className="costume-image-border">
                        <Link to={'/costume/' + costume._id}>
                        <img className="costume-image" src={costume.image} alt="costume" />
                        </Link>
                    </div>
                    <div className="costume-name">
                        <Link to={'/costume/' + costume._id}>{costume.name}</Link>
                    </div>
                    <div className="costume-designer">Designer: {costume.designer}</div>
                    <div className="costume-price">EYET {costume.price}</div>
                    <div className="costume-rating">{costume.rating} Stars ({costume.numLikes} Likes)</div>
                </div>
            </li>))
    };

    // Build loading screen
    const loadingSpinners = []
    for(var i=1; i<5; i++) {
        let loadingElement = <li key={'loading_'+i}>
            <div className="costume">
                <div className="costume-image-border">
                    <img className="costume-image" src="https://res.cloudinary.com/doakep7he/image/upload/v1603948838/loading.gif" alt="loading" />
                </div>
            </div>
        </li>;
        loadingSpinners.push(loadingElement);
    };

    return(<div>
        <div className="costumes-list-title">
            <h4>Costumes Directory</h4>
            <div className="costumes-list-search">
                <form onSubmit={searchHandler}>
                    <input type="text"
                        placeholder="Search by Name"
                        value={searchKeyword}
                        onChange={(e) =>setSearchKeyword(e.target.value)}></input>
                    <button type="submit">Go</button>
                </form>
            </div>
            <div className="costumes-list-filter">
                Filter By:{' '}
                <select value={filterParam} onChange={filterHandler}>
                    <option value=''>None</option>
                    <option value='available'>Available</option>
                    <option value='unavailable'>Unavailable</option>
                </select>
            </div>
            <div className="costumes-list-sort">
                Sort By:{' '}
                <select value={sortOrder} onChange={sortHandler}>
                    <option value=''>None</option>
                    <option value='alphabetical'>Alphabetical</option>
                    <option value='high_to_low_price'>Highest Price First</option>
                    <option value='low_to_high_price'>Lowest Price First</option>
                    <option value='rating'>Highest Rated First</option>
                    <option value='likes'>Most Liked</option>
                </select>
            </div>
        </div>
        <ul className="costumes">
            { 
                loading ? loadingSpinners
                : error ? <div>{error}</div> 
                : renderedCostumes.length ? costumeListElements(renderedCostumes)
                : <div className="costumes-no-result">No results found...</div>
            }
        </ul>
        <div className="pagination-container">
            <div className="pagination">
                {
                    costumes.length ? <div>
                        <button className="page-button-handle" onClick={goPreviousPage}>&laquo;</button>
                            {paginationElements}
                        <button className="page-button-handle" onClick={goNextPage}>&raquo;</button>
                    </div> : null
                }
            </div>
        </div>
    </div>
    );
}

export default CostumeListScreen;
