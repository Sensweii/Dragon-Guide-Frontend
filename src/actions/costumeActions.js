import axios from 'axios';
import Axios from 'axios';

const { 
    COSTUME_LIST_REQUEST,
    COSTUME_LIST_SUCCESS,
    COSTUME_LIST_FAIL,
    COSTUME_DETAILS_REQUEST,
    COSTUME_DETAILS_SUCCESS,
    COSTUME_DETAILS_FAIL,
    COSTUME_SAVE_REQUEST,
    COSTUME_SAVE_SUCCESS,
    COSTUME_SAVE_FAIL,
    COSTUME_DELETE_REQUEST,
    COSTUME_DELETE_SUCCESS,
    COSTUME_DELETE_FAIL,
} = require("../constants/costumesConstants");


const baseURL = 'https://sea-dragon-backend.herokuapp.com/api';
const listCostumes = (searchKeyword='', filterQuery='', sortOrder='') => async (dispatch) => {
    try {
        dispatch({type: COSTUME_LIST_REQUEST});
        const {data} = await axios.get(baseURL + '/costumes/list' +
            '?searchParam=' + searchKeyword +
            '&filterParam=' + filterQuery +
            '&sortOrder=' + sortOrder
        );
        dispatch({type: COSTUME_LIST_SUCCESS, payload: data});
    }
    catch (error) {
        dispatch({type: COSTUME_LIST_FAIL, payload: error.message});
    }
};

const getCostumeDetails = (costumeID) => async (dispatch) => {
    try {
        dispatch({type: COSTUME_DETAILS_REQUEST, payload:costumeID});
        const {data} = await axios.get(baseURL + '/costumes/retrieve/' + costumeID);
        dispatch({type: COSTUME_DETAILS_SUCCESS, payload:data});
    }
    catch (error) {
        dispatch({type: COSTUME_DETAILS_FAIL, payload: error.message});
    }
};

const saveCostume = (costume) => async (dispatch, getState) => {
    try {
        dispatch({type: COSTUME_SAVE_REQUEST, payload: costume});
        const { userSignin: { userInfo } } = getState();
        if(!costume._id){
            const {data} = await Axios.post(baseURL + '/costumes/create', costume, {
                headers: { 'Authorization': 'Bearer ' + userInfo.token }
            });
            dispatch({type: COSTUME_SAVE_SUCCESS, payload: data});
        } else {
            const {data} = await Axios.put(baseURL + '/costumes/update/' + costume._id, costume, {
                headers: { 'Authorization': 'Bearer ' + userInfo.token }
            });
            dispatch({type: COSTUME_SAVE_SUCCESS, payload: data});
        }
    }
    catch (error) {
        dispatch({type: COSTUME_SAVE_FAIL, payload: error.message});
    }
}

const deleteCostume = (costumeID) => async (dispatch, getState) => {
    try {
        dispatch({type: COSTUME_DELETE_REQUEST, payload:costumeID});
        const { userSignin: { userInfo } } = getState();
        const {data} = await axios.delete(baseURL + '/costumes/delete/' + costumeID,{
            headers: { 'Authorization': 'Bearer ' + userInfo.token }
        });
        dispatch({type: COSTUME_DELETE_SUCCESS, payload:data, success: true});
    }
    catch (error) {
        dispatch({type: COSTUME_DELETE_FAIL, payload: error.message});
    }
};

export { listCostumes, getCostumeDetails, saveCostume, deleteCostume };
