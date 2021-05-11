//function that takes in state that has to do with alerts and action
import {SET_ALERT,REMOVE_ALERT} from '../actions/types';
const initialState = [];

export default function(state = initialState,action){

    const{type,payload} = action;

    switch (type){
        case SET_ALERT:
            return [...state, payload];
        //remove specific alert using id
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }
}

