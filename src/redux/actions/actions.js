import { SET_START_TIME, SET_USERNAME, SET_PASSWORD } from "../actionTypes";

const setStartTime = (startTime) => {

    return {
        type: SET_START_TIME,
        payload: startTime
    };
};
const setUserName = (username) => {
    return {
        type: SET_USERNAME,
        payload: username
    };
};
const setPassword = (password) => {

    return {
        type: SET_PASSWORD,
        payload: password
    };
};

export { setStartTime, setUserName, setPassword };