import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setStartTime, setUserName, setPassword } from "../../redux/actions/actions";

import './Login.css';

const getFakeData = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve({}), 250);
    });



export default function Login({ setToken }) {

    const dispatch = useDispatch();

    const reduxState = useSelector((state) => state);

    const navigate = useNavigate();
    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username: reduxState.username,
            password: reduxState.password,
        });

        setToken(token);
    }
    useEffect(() => {
        localStorage.clear()
    }, [])

    async function loginUser(credentials) {
        return fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(data => {

                const startTime = new Date()

                localStorage.setItem("token", "user_token");
                localStorage.setItem("start_time", startTime.getTime());
                dispatch(setStartTime(startTime));
                navigate("/dashboard");

            })
            .catch(err => {

                const startTime = new Date()
                dispatch(setStartTime(startTime));

                localStorage.setItem("token", "user_token");
                localStorage.setItem("start_time", startTime.getTime());

                navigate("/dashboard");

            })
    }

    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" value={reduxState.username} onChange={e => {
                        dispatch(setUserName(e.target.value))
                    }} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" value={reduxState.password} onChange={e => {
                        dispatch(setPassword(e.target.value))
                    }} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
