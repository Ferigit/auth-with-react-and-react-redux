import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom"
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import { useSelector, useDispatch } from "react-redux";
import { setStartTime } from '../../redux/actions/actions';

function App() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const state = useSelector((state) => state);
    const localStorageToken = localStorage.getItem("token");
    const localStorageStartTime = localStorage.getItem("start_time");


    useEffect(() => {
        const currentTime = new Date();
        if (localStorageStartTime) {

            let timeDiff = Math.floor(currentTime.getTime() - localStorageStartTime) / 60;
            if ((timeDiff / 60) > 1800) {
                navigate("/login")
            }
        }
        dispatch(setStartTime(localStorageStartTime));
    }, [])

    const isValidDate = (d) => {
        return d instanceof Date && !isNaN(d);
    }

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login")
    }

    const handleLogin = () => {
        localStorage.clear();
        navigate("/login")
    }



    return (

        <div className="container">
            <h1>{localStorageToken ? <p className='header' onClick={() => handleLogout()}>Log out</p> : <p className='header' onClick={() => handleLogin()}>Login</p>}</h1>
            <Routes>
                <Route exact path="/login" element={<Login navigate={navigate} />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
            </Routes>

        </div>


    );
}

export default App;