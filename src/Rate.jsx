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

    async function onSubmit(event) {
        event.preventDefault();
        var res = await callData(userName, password, handle);
        // console.log(res);

        // sessionStorage.setItem("userD", JSON.stringify(res.userD));
        // sessionStorage.setItem("handle", res.handle);
        // setUserData(res.userD);
        // setHandle(res.handle);
        // toogleSet(true);
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
            sessionStorage.setItem("userD", JSON.stringify(res.userD));
            sessionStorage.setItem("handle", res.handle);
            setUserData(res.userD);
            setHandle(res.handle);
            toogleSet(true);
        })
        // console.log(res);
        return res;
    }

    useEffect(async () => {
        let quesData = {
            name: todoQues.name,
            contestId: todoQues.contestId,
            handle: handle
        }
        if (quesData.name !== '') {
            var response;
            axios.post("http://localhost:5000/list", quesData).then(async (res) => {
                // response = res;
                // console.log(res);
                await callData(userName, password, handle);
                setToDoList(res.data);
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
            axios.post("http://localhost:5000/uwlist", quesData).then(async response => {
                await callData(userName, password, handle);
                setToDoList(response.data);
            })
        }
    }, [removeQues]);
    function abc(event) {
        setTodoQues({
            name: document.getElementById(event.target.id).id,
            contestId: document.getElementById(event.target.id).value
        });
        return null;
    }

    async function onclick(event) {
        event.preventDefault();
        setTodoQues({
            name: document.getElementById(event.target.id).id,
            contestId: document.getElementById(event.target.id).value
        });
        // var temp = await abc(event);
        // console.log(toDoList);
        // var res = await callData(userName, password, handle);

        // document.getElementById(event.target.id).disabled = true;
        // document.getElementById(event.target.value).disabled = true;
    }

    function handleclick(event) {
        event.preventDefault();
        if (document.getElementById(event.target.id) === null)
            return;
        setRemoveQues({
            name: document.getElementById(event.target.id).value,
            contestId: document.getElementById(event.target.id).id
        });
        // if (document.getElementById(event.target.id) !== null) {
        //     document.getElementById(event.target.id).disabled = true
        // }

        // if (document.getElementById(event.target.value) !== null) {
        //     document.getElementById(event.target.value).disabled = true
        // }
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
            <button id={event.contestId} value={event.name} onClick={handleclick}>REMOVE</button>
        </div>)
    }

    return (
        <div>
            {!dataSet ?
                <form onSubmit={onSubmit} className="container">
                    <label>User Name</label>
                    <input id="UserName" type="text" name="userName" spellCheck="false" onChange={(e) => {
                        setUserName(e.target.value);
                    }} />
                    <label>Password</label>
                    <input id="Password" type="password" name="password" onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                    <label>User Handle</label>
                    <input id="Handle" type="text" name="userHandle" spellCheck="false" onChange={(e) => {
                        setHandle(e.target.value);
                    }} />
                    <button type="submit" className="submit">Go</button>
                </form> :
                <div>
                    <h1>User Rating: {userData.rating}</h1>

                    {userData.rating >= 0 ?
                        <div className="row">
                            {userData.ques == 0 ?
                                <h1>You Have not solved any question Yet</h1>
                                : <div>
                                    <div className="column">
                                        <h1>Questions: </h1>
                                        {userData.ques.map(show)}
                                    </div>
                                    <div className="column">
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