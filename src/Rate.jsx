import React, { Component } from 'react'
import axios from 'axios';
export default class Rate extends Component {
    constructor() {
        super();
        this.state = {
            userData: null,
            handle: ''
        };
    }

    onSubmit = (e) => {
        e.preventDefault();
        let data = {
            handle: this.state.handle
        }
        axios.post("http://localhost:5000/nrating", data).then(response => {
            console.log(response.data);
            this.setState({
                userData: response.data
            });
        });
    }

    render() {
        return (
            <div>
                {this.state.userData === null ?
                    <form onSubmit={this.onSubmit}>
                        <label>User Handle</label>
                        <input id="Handle" type="text" name="userHandle" onChange={(e) => {
                            this.setState({
                                handle: e.target.value
                            })
                        }} />
                        <button type="submit">Go</button>
                    </form> :
                    <div>
                        <h1>User Rating: {this.state.userData.rating}</h1>
                        {this.state.userData.ques.length > 0 ?
                            <div>
                                <h1>Questions: </h1>
                                <h2>{this.state.userData.ques[0].contestId}  {this.state.userData.ques[0].name}</h2>
                                <h2>{this.state.userData.ques[1].contestId}  {this.state.userData.ques[1].name}</h2>
                                <h2>{this.state.userData.ques[2].contestId}  {this.state.userData.ques[2].name}</h2>
                                <h2>{this.state.userData.ques[3].contestId}  {this.state.userData.ques[3].name}</h2>
                                <h2>{this.state.userData.ques[4].contestId}  {this.state.userData.ques[4].name}</h2>
                                <h2>{this.state.userData.ques[5].contestId}  {this.state.userData.ques[5].name}</h2>
                                <h2>{this.state.userData.ques[6].contestId}  {this.state.userData.ques[6].name}</h2>
                                <h2>{this.state.userData.ques[7].contestId}  {this.state.userData.ques[7].name}</h2>
                                <h2>{this.state.userData.ques[8].contestId}  {this.state.userData.ques[8].name}</h2>
                                <h2>{this.state.userData.ques[9].contestId}  {this.state.userData.ques[9].name}</h2>
                            </div>
                            : <h2>Please Enter Valid Handle</h2>
                        }
                    </div>
                }
            </div>
        );
    }
}

