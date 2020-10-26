import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getCostumeDetails } from "../actions/costumeActions";


function CostumeScreen (props) {
    const [qty, setQty] = useState(1);
    const costumeDetails = useSelector(state => state.costumeDetails);
    const {costume, loading, error} = costumeDetails;
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getCostumeDetails(props.match.params.id));
        return () => {
            //
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAddToCart = () => {
        props.history.push('/cart/' + props.match.params.id + '?qty=' + qty)
    };

    return(<div>
        <div className="back-to-results">
            <Link to="/">Back to results</Link>
        </div>
        { loading ? <div>Loading...</div> : error ? <div>{error}</div> :
            (
                <div className="costume-details">
                    <div className="costume-details-image">
                        <img src={costume.image} alt="costume"></img>
                    </div>
                    <div className="costume-details-info">
                        <ul>
                            <li>
                                <h4>{costume.name}</h4>
                            </li>
                            <li>
                                {costume.rating} Stars ({costume.numLikes} Likes)
                            </li>
                            <li>
                                Price: <b>EYET {costume.price}</b>
                            </li>
                            <li>
                                Description:
                                <div>
                                    {costume.description}
                                </div>
                            </li>
                        </ul>
                        <ul className="costume-stats">
                            <div>
                            <li>
                                <h4>Stats</h4>
                            </li>
                            {/* {
                                costume.stats.map(stat =>
                                    <li>

                                    </li>
                                )
                            } */}
                            </div>
                        </ul>
                    </div>
                    <div className="costume-details-action">
                        <ul>
                            <li>
                                Price: {costume.price}
                            </li>
                            <li>
                                Status: {costume.countInStock > 0 ? 'In Stock' : 'Unavailable'}
                            </li>
                            <li>
                                Qty: <select value={qty} onChange={(e) => {setQty(e.target.value)}}>
                                    {[...Array(costume.countInStock).keys()].map(x =>
                                        <option key={x+1} value={x+1}>{x+1}</option>
                                    )}
                                </select>
                            </li>
                            <li>
                                {
                                    costume.countInStock > 0 && 
                                    <button onClick={handleAddToCart} className="button primary">Add to Cart</button>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            )
        }
    </div>
    );
}

export default CostumeScreen;
