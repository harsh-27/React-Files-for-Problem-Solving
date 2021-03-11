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
    //const [lo, setLogout] = useState(false);
    const [toDoList, setToDoList] = useState(null);


    const left = {
        float: "left",
        width: "50%"
    };
    async function onSubmit(event) {
        event.preventDefault();
        var res = await callData(userName, password, handle);
        sessionStorage.setItem("userD", JSON.stringify(res.userD));
        sessionStorage.setItem("handle", res.handle);
        setUserData(res.userD);
        setHandle(res.handle);
        toogleSet(true);
    }

    function callData(userName, password, handle) {
        let data = {
            userName,
            password,
            handle
        }
        // var res = null;
        var res = axios.post("http://localhost:5000/nrating", data).then(response => {
            res = {
                userD: (response.data),
                handle: handle
            };
        }).then(() => {
            return res;
        })
        return res;
    }

    useEffect(() => {
        let quesData = {
            name: todoQues.name,
            contestId: todoQues.contestId,
            handle: handle
        }
        if (quesData.name !== '') {
            axios.post("http://localhost:5000/list", quesData).then(response => {
                setToDoList(response.data);
            })
        }
    }, [todoQues])

    useEffect(() => {
        if (window.sessionStorage.getItem('userD')) {
            setUserData(JSON.parse(window.sessionStorage.getItem('userD')));
            setHandle(window.sessionStorage.getItem('handle'));
        }
    }, []);

    useEffect(() => {
        if (userData) {
            let quesData = {
                name: "",
                contestId: "",
                handle: handle
            }
            axios.post("http://localhost:5000/list", quesData).then(response => {
                setToDoList(response.data);
            }).then(() => {
                toogleSet(true);
            })
        };
    }, [userData]);

    useEffect(() => {
        let quesData = {
            name: removeQues.name,
            contestId: removeQues.contestId,
            handle: handle
        }
        if (quesData.contestId !== '') {
            axios.post("http://localhost:5000/uwlist", quesData).then(response => {
            })
        }
    }, [removeQues]);

    function onclick(event) {
        event.preventDefault();
        setTodoQues({
            name: document.getElementById(event.target.id).id,
            contestId: document.getElementById(event.target.id).value
        });
        document.getElementById(event.target.id).disabled = true;
        document.getElementById(event.target.value).disabled = true;
    }

    function handleclick(event) {
        event.preventDefault();
        setRemoveQues({
            name: document.getElementById(event.target.id).value,
            contestId: document.getElementById(event.target.id).id
        });
        document.getElementById(event.target.id).disabled = true;
        document.getElementById(event.target.value).disabled = true;
    }

    function show(e, index) {
        return (<div key={index.toString()}><a href={"https://codeforces.com/problemset/problem/" + e.contestId + "/" + e.index}>
            <h2>{e.contestId + e.index} {e.name}</h2>
        </a>
            <button id={e.name} value={e.contestId + e.index} onClick={onclick}>ADD</button>
            <button id={e.contestId + e.index} value={e.name} onClick={handleclick}>REMOVE</button>
        </div>);
    }

    function logout() {
        //setLogout(true);
        sessionStorage.clear();
        setUserData(null);
        setHandle('');
        toogleSet(false);
        //setLogout(false);
    }
    function contest(contestId) {
        //return "hello";
        var n = contestId.length;
        var str1 = '', str2 = '', i;
        for (i = 0; i < n; i++) {
            if (contestId[i] >= 0 && contestId[i] <= 9)
                str1 += contestId[i];
            else
                break;
        }
        for (; i < n; i++)
            str2 += contestId[i];

        return str1 + '/' + str2;

    }

    function showToDoList(event, index) {
        return (<div key={index.toString()}>
            <a href={"https://codeforces.com/problemset/problem/" + contest(event.contestId)}>
                <h2>{event.contestId} {event.name}</h2>
            </a>
        </div>)
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
                                    <div style={left}>
                                        <h1>Questions: </h1>
                                        {userData.ques.map(show)}
                                    </div>
                                    <div style={left}>
                                        <h1>To Do List</h1>
                                        {toDoList != null ? toDoList.map(showToDoList) : null}
                                    </div>
                                </div>


                            }
                            <button onClick={logout} >Logout</button>
                        </div>
                        : <h2>Please Enter Valid Handle</h2>
                    }
                </div>
            }
        </div>
    );
}

export default Rate;