import React, { useState, useEffect } from 'react'
import axios from 'axios';

function Rate() {

    const [userData, setUserData] = useState(null);
    const [handle, setHandle] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [dataSet, toogleSet] = useState(false);
    const [todoQues, setTodoQues] = useState({
        name: '',
        contestId: ''
    });
    const [removeQues, setRemoveQues] = useState({
        name: '',
        contestId: ''
    });
    const [lo, setLogout] = useState(false);

    function onSubmit(event) {
        event.preventDefault();
        let data = {
            userName: userName,
            password: password,
            handle: handle
        }
        axios.post("http://localhost:5000/nrating", data).then(response => {
            console.log(response.data);
            setUserData(response.data);
            sessionStorage.setItem("userD", JSON.stringify(response.data));
            sessionStorage.setItem("handle", handle);
            return true;
        }).then((z) => {
            if (z)
                toogleSet(true);
        })
    }

    useEffect(() => {
        console.log("re-render because todoQues changed:", todoQues)
        let quesData = {
            name: todoQues.name,
            contestId: todoQues.contestId,
            handle: handle
        }
        if (quesData.todoQues != '') {
            axios.post("http://localhost:5000/list", quesData).then(response => {
                console.log(response.quesData);
            })
        }
    }, [todoQues])

    useEffect(() => {
        if (window.sessionStorage.getItem('userD')) {
            setUserData(JSON.parse(window.sessionStorage.getItem('userD')));
            setHandle(window.sessionStorage.getItem("handle"));
            toogleSet(true);
        }

    }, userData);

    useEffect(() => {
        if (lo) {
            console.log("in useefect");
            sessionStorage.clear();
            setUserData(null);
            setHandle('');
            toogleSet(false);
            setLogout(false);
        }
    });

    useEffect(() => {
        console.log("re-render because removeQues changed:", removeQues)
        let quesData = {
            name: removeQues.name,
            contestId: removeQues.contestId,
            handle: handle
        }
        if (quesData.removeQues != '') {
            axios.post("http://localhost:5000/uwlist", quesData).then(response => {
                console.log(response.quesData);
            })
        }
    }, [removeQues]);

    function onclick(event) {
        event.preventDefault();
        setTodoQues({
            name: document.getElementById(event.target.id).id,
            contestId: document.getElementById(event.target.id).value
        });
        console.log(document.getElementById(event.target.id).id);
        document.getElementById(event.target.id).disabled = true;
        document.getElementById(event.target.value).disabled = true;
    }

    function handleclick(event) {
        event.preventDefault();
        setRemoveQues({
            name: document.getElementById(event.target.id).value,
            contestId: document.getElementById(event.target.id).id
        });
        console.log(document.getElementById(event.target.id).value);
        document.getElementById(event.target.id).disabled = true;
        document.getElementById(event.target.value).disabled = true;
    }

    function show(e) {
        return (<div><a href={"https://codeforces.com/problemset/problem/" + e.contestId + "/" + e.index}>
            <h2>{e.contestId}</h2>
            <h2 >{e.name}</h2></a>
            <button id={e.name} value={e.contestId + e.index} onClick={onclick}>ADD</button>
            <button id={e.contestId + e.index} value={e.name} onClick={handleclick}>REMOVE</button>
        </div>);
    }

    function logout() {
        console.log("logout button pressed!");
        setLogout(true);
    }


    return (
        <div>
            {!dataSet ?
                <form onSubmit={onSubmit}>
                    <label>User Name</label>
                    <input id="UserName" type="text" name="userName" onChange={(e) => {
                        setUserName(e.target.value);
                    }} />
                    <label>Password</label>
                    <input id="Password" type="password" name="password" onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                    <label>User Handle</label>
                    <input id="Handle" type="text" name="userHandle" onChange={(e) => {
                        setHandle(e.target.value);
                    }} />
                    <button type="submit">Go</button>
                </form> :
                <div>
                    <h1>User Rating: {userData.rating}</h1>
                    {userData.rating >= 0 ?
                        <div>
                            {userData.ques == 0 ?
                                <h1>You Have not solved any question Yet</h1>
                                : <div>
                                    <h1>Questions: </h1>
                                    {userData.ques.map(show)}
                                </div>
                            }
                            <button onClick={logout}>Logout</button>
                        </div>
                        : <h2>Please Enter Valid Handle</h2>
                    }
                </div>
            }
        </div>
    );
}

export default Rate;