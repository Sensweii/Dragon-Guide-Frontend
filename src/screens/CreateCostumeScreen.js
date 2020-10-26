import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteCostume, listCostumes, saveCostume } from "../actions/costumeActions";


function CreateCostumeScreen (props) {

    const [modalVisible, setModalVisible] = useState(false);
    const [id, setID] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [designer, setDesigner] = useState('');
    const [rarity, setRarity] = useState('');
    const [price, setPrice] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');

    const costumesList = useSelector(state => state.costumesList);
    const { loading, costumes, error } = costumesList;

    const costumeSave = useSelector(state => state.costumeSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = costumeSave;
    const costumeDelete = useSelector(state => state.costumeDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = costumeDelete;

    const dispatch = useDispatch();
    
    useEffect(() => {
        if(successSave){
            setModalVisible(false);
        }
        dispatch(listCostumes());
        return () => {
            //
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [successSave, successDelete]);

    const openModal = (costume) =>{
        setModalVisible(true);
        setID(costume._id);
        setName(costume.name);
        setImage(costume.image);
        setDesigner(costume.designer);
        setRarity(costume.rarity);
        setPrice(costume.price);
        setCountInStock(costume.countInStock);
        setDescription(costume.description);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(saveCostume({
            _id: id,
            name, image, designer, rarity, price, countInStock, description
        }));
    }
    const deleteHandler = (costume) => {
        dispatch(deleteCostume(costume._id));
    }

    return(<div className='content content-margined'>
        <div className='costume-header'>
            <h3>Costumes</h3>
            <button className='button primary' onClick={() => openModal({})}>Create Costume</button>
        </div>

    { modalVisible ?
        <div className='form'>
            <form onSubmit={onSubmitHandler}>
                <ul className='form-container'>
                    <li>
                        <h2>Create Costume</h2>
                    </li>
                    <li>
                        { loadingSave && <div>Loading...</div>}
                        { errorSave && <div>{errorSave}</div> }
                        { loadingDelete && <div>Loading...</div>}
                        { errorDelete && <div>{errorDelete}</div> }
                    </li>
                    <li>
                        <label htmlFor='name'>
                            Name
                        </label>
                        <input type='text' name='name' value={name || ''} id='name'
                            onChange={(e) => {setName(e.target.value)}}>    
                        </input>
                    </li>
                    <li>
                        <label htmlFor='image'>
                            Image
                        </label>
                        <input type='text' name='image' value={image || ''} id='image'
                            onChange={(e) => {setImage(e.target.value)}}>    
                        </input>
                    </li>
                    <li>
                        <label htmlFor='designer'>
                            Designer
                        </label>
                        <input type='text' name='designer' value={designer || ''} id='designer'
                            onChange={(e) => {setDesigner(e.target.value)}}>    
                        </input>
                    </li>
                    <li>
                        <label htmlFor='rarity'>
                            Rarity
                        </label>
                        <input type='text' name='rarity' value={rarity || ''} id='rarity'
                            onChange={(e) => {setRarity(e.target.value)}}>    
                        </input>
                    </li>
                    <li>
                        <label htmlFor='price'>
                            Price
                        </label>
                        <input type='text' name='price' value={price || ''} id='price'
                            onChange={(e) => {setPrice(e.target.value)}}>    
                        </input>
                    </li>
                    <li>
                        <label htmlFor='countInStock'>
                            Count in Stock
                        </label>
                        <input type='text' name='countInStock' value={countInStock || ''} id='countInStock'
                            onChange={(e) => {setCountInStock(e.target.value)}}>    
                        </input>
                    </li>
                    <li>
                        <label htmlFor='description'>
                            Description
                        </label>
                        <textarea name='description' value={description || ''} id='description'
                            onChange={(e) => {setDescription(e.target.value)}}>    
                        </textarea>
                    </li>
                    <li>
                        <button type='submit' className='button primary'>
                            { id ? 'Update Costume Data' : 'Save Creation' }
                        </button>
                    </li>
                    <li>
                        <button type='button' className='button secondary'
                            onClick={() => setModalVisible(false)}>Cancel Save</button>
                    </li>
                </ul>
            </form>
        </div>
    :
        <div className='product-list'>
            { loading && <div>Loading...</div> }
            { error && <div>{error}</div> }

            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Designer</th>
                        <th>Rarity</th>
                        <th>Price</th>
                        <th>In Stock</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { costumes.map(costume => (<tr key={costume._id}>
                        <td>{costume._id}</td>
                        <td>{costume.name}</td>
                        <td>{costume.designer}</td>
                        <td>{costume.rarity}</td>
                        <td>{costume.price}</td>
                        <td>{costume.countInStock}</td>
                        <td>
                            <button className="button" onClick={() => openModal(costume)}>Edit</button>
                            {' '}
                            <button className="button" onClick={() => deleteHandler(costume)}>Delete</button>
                        </td>
                    </tr>))
                    }
                </tbody>
            </table>
        </div>
        }
    </div>
    );
}

export default CreateCostumeScreen;
