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
                        <h1>User Rating: {this.state.userData.ques[0].name}</h1>
                    </div>
                }
            </div>
        );
    }
}
// export default class Rate extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { name: '' };
//     }

//     handleChange = (event) => {
//         this.setState({ [event.target.name]: event.target.value });
//     }

//     handleSubmit = (event) => {
//         alert('A form was submitted: ' + this.state);

//         fetch('http://localhost:5000/rating', {
//             method: 'POST',
//             // We convert the React state to JSON and send it as the POST body
//             body: JSON.stringify(this.state)
//         }).then(function (response) {
//             console.log(response)
//             return response.json();
//         });

//         event.preventDefault();
//     }

//     render() {
//         return (
//             <form onSubmit={this.handleSubmit}>
//                 <label>
//                     Name:
//           <input type="text" value={this.state.value} name="name" onChange={this.handleChange} />
//                 </label>
//                 <input type="submit" value="Submit" />
//             </form>
//         );
//     }
// }

