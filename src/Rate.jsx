import React, { useState } from 'react'
import axios from 'axios';

function Rate() {

    const [userData, setUserData] = useState(null);
    const [handle, setHandle] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

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
        });
    }

    function show(e) {
        return (<a href={"https://codeforces.com/problemset/problem/" + e.contestId + "/" + e.index}><h2>{e.contestId}  {e.name}</h2></a>);
    }

    return (
        <div>
            {userData === null ?
                <form onSubmit={onSubmit}>
                    <label>User Name</label>
                    <input id="UserName" type="text" name="userName" onChange={(e) => {
                        setUserName(e.target.value);
                    }} />
                    <label>Password</label>
                    <input id="Password" type="text" name="password" onChange={(e) => {
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
                    {userData.ques.length > 0 ?
                        <div>
                            <h1>Questions: </h1>
                            {userData.ques.map(show)}
                        </div>
                        : <h2>Please Enter Valid Handle</h2>
                    }
                </div>
            }
        </div>
    );
}

export default Rate;