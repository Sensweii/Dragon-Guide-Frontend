import { 
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
} from "../constants/costumesConstants";


function costumesListReducer(state={costumes:[]}, action){
    switch (action.type) {
        case COSTUME_LIST_REQUEST:
            return {loading: true, costumes: []};
        case COSTUME_LIST_SUCCESS:
            return {loading: false, costumes: action.payload};
        case  COSTUME_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    };
};

function costumeDetailsReducer(state={costume:{}}, action){
    switch (action.type) {
        case COSTUME_DETAILS_REQUEST:
            return {loading: true};
        case COSTUME_DETAILS_SUCCESS:
            return {loading: false, costume: action.payload};
        case  COSTUME_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    };
};

function costumeSaveReducer(state={costume:{}}, action){
    switch (action.type) {
        case COSTUME_SAVE_REQUEST:
            return {loading: true};
        case COSTUME_SAVE_SUCCESS:
            return {loading: false, success: true, costume: action.payload};
        case  COSTUME_SAVE_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    };
};

function costumeDeleteReducer(state={costume:{}}, action){
    switch (action.type) {
        case COSTUME_DELETE_REQUEST:
            return {loading: true};
        case COSTUME_DELETE_SUCCESS:
            return {loading: false, success: true, costume: action.payload};
        case  COSTUME_DELETE_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    };
}

export {
    costumesListReducer, costumeDetailsReducer, costumeSaveReducer, costumeDeleteReducer
};
