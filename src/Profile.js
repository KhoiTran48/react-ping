import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import axios from 'axios';

class Profile extends Component {

    constructor(props){
        super(props);
        this.state = {name: props.user.name, email: props.user.email}
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios
        .patch("http://localhost:8000/api/auth/update", this.state)
        .then(res=>{
            this.props.updateUser(this.state);
        })
        .catch(res=>{
            console.log(res)
        })
    }

    handleInput = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }

    render() {
        return (
            <div className="flex w-full">
                <ul className="w-1/6 bg-black h-screen text-white p-4">
                    <Link to="/profile">
                        <li className="bg-gray-900 py-1 px-3 rounded">Profile</li>
                    </Link>
                </ul>
                <div className="m-2 bg-white w-full justify-center">
                    <form className="border border-gray-500 w-1/2 m-4" onSubmit={this.handleSubmit}>
                        <div className="p-4">
                            <h1 className="text-lg border-b border-gray-500">Pong here</h1>
                            <div className="mt-4">
                                <label>Name</label>
                                <input onChange={this.handleInput} value={this.state.name} required type="text" name="name" placeholder="Lovely Name" className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"></input>
                            </div>
                            <div className="mt-4">
                                <label>Email</label>
                                <input onChange={this.handleInput} value={this.state.email} required type="email" name="email" placeholder="Lovely Email" className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"></input>
                            </div>
                            <div className="mt-4">
                                <input type="submit" value="Update" className="mt-1 p-2 border border-gray-400 rounded cursor-pointer bg-purple-600 text-white"></input>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateUser: (user) => dispatch({type: "SET_LOGIN", payload: user})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)