import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setStartTime } from "../../redux/actions/actions";

export default function Dashboard() {
    const [list, setList] = useState([]);
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    const localStorageToken = localStorage.getItem("token");

    function getList() {
        return fetch('http://localhost:8080/getlist', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                const fakeData = [{ name: "Item 1", date: "1402-01-01" }, { name: "Item 2", date: "1402-01-02" }]
                return fakeData;
            })
            .catch(err => {

                const fakeData = [{ name: "Item 1", date: "1402-01-01" }, { name: "Item 2", date: "1402-01-02" }]
                return fakeData;

            })
    }

    async function getNewToken(credentials) {
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
                getList();

            })
            .catch(err => {

                const startTime = new Date()
                dispatch(setStartTime(startTime));

                localStorage.setItem("token", "user_token");
                localStorage.setItem("start_time", startTime.getTime());
                getList();

            })
    }

    useEffect(() => {

        async function fetchData() {
            const response = await getList();
            setList(response)
        }
        fetchData();

        //get the new oken after 30 mins
        const timer = setTimeout(() => {
            if (localStorageToken || state.startTime) {
                getNewToken();
            }
        }, 3000);

        //clear timer
        return () => clearTimeout(timer);

    }, [])

    return (
        <h2>{
            list.map(listItem => {
                return (
                    <div key={listItem.name}>{listItem.name}</div>
                )
            })}</h2>
    );
}