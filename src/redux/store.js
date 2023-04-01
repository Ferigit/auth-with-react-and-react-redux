import { createStore } from "redux";
import { Reducer } from "./reducers/reducer";

const store = createStore(Reducer);

export default store;