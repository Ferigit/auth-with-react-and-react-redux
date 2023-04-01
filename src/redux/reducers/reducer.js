import { SET_START_TIME, SET_USERNAME, SET_PASSWORD } from "../actionTypes";

const initialState = {
    username: "",
    password: "",
    startTime: null,
};

export const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_START_TIME:

            return {
                ...state,
                startTime: action.payload,
            };
        case SET_USERNAME:

            return {
                ...state,
                username: action.payload,
            };
        case SET_PASSWORD:

            return {
                ...state,
                password: action.payload,
            };
        default:
            return state;
    }
};