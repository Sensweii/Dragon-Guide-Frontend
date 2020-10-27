import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import { listCostumes } from "../actions/costumeActions";


function CostumeListScreen (props) {

    const costumesList = useSelector(state => state.costumesList);
    const { costumes, loading, error } = costumesList;
    const dispatch = useDispatch();

    const [filterParam, setFilterParam] = useState('');
    const filterHandler = (e) => {
        var selectedFilterParam = e.target.value;
        setFilterParam(e.target.value);
        dispatch(listCostumes(selectedFilterParam, sortOrder));
    }

    const [sortOrder, setSortOrder] = useState('');
    const sortHandler = (e) => {
        var selectedSortOrder = e.target.value;
        setSortOrder(selectedSortOrder);
        dispatch(listCostumes(filterParam, selectedSortOrder));
    }

    useEffect(() => {
        dispatch(listCostumes());
        return () => {
            //
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return( loading ? <div>Loading...</div> : error ? <div>{error}</div> : costumes ?
    <div>
        <div className="costumes-list-title">
            <h4>Costumes Directory</h4>
            <div className="costumes-list-search">

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
                costumes.map(costume => (
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
            }
        </ul>
    </div>
    : <div>Empty...</div>
    );
}

export default CostumeListScreen;
