import React from 'react';
import InitialComponent from "./components/InitialComponent";
import {Provider} from "react-redux"
import store from "./store/Store";
import './App.css';

function App() {
    return (
        <Provider store={store}><InitialComponent/></Provider>
    );
}

export default App;
