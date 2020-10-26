import React, { useEffect } from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import { listCostumes } from "../actions/costumeActions";


function CostumeListScreen (props) {

    const costumesList = useSelector(state => state.costumesList);
    const { costumes, loading, error } = costumesList;
    const dispatch = useDispatch();

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
