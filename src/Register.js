import React, { Component } from 'react'
import axios from 'axios'
import cookie from 'js-cookie'
import {connect} from 'react-redux'
import Error from './components/Error'

class Register extends Component {

    constructor(props){
        super(props);
        this.state = {name: "", email: "", password: "", password_confirmation: "", errors: ""}
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        const data = {name: this.state.name, email: this.state.email, password: this.state.password, password_confirmation: this.state.password_confirmation};
        axios
        .post("http://localhost:8000/api/auth/register", data)
        .then(res => {
            cookie.set("token", res.data.access_token)
            this.props.setLogin(res.data.user);
            this.props.history.push("/profile")
        })
        .catch(e => this.setState({errors: e.response.data.errors}))
        // .catch(e => console.log(e.response))

    }

    handleInput = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }

    render() {
        return (
            <div className="flex justify-center">
                <div className="w-1/3 p-4 bg-white mt-10">
                    <form className="border border-gray-500" onSubmit={this.handleSubmit}>
                        <div className="p-4">
                            <h1 className="text-lg border-b border-gray-500">Pong here</h1>
                            <div className="mt-4">
                                <label>Name</label>
                                <input onChange={this.handleInput} type="text" name="name" placeholder="Lovely Name" className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"></input>
                            </div>
                            <Error
                                error = {this.state.errors["name"] ? this.state.errors["name"] : null}
                            >
                            </Error>
                            <div className="mt-4">
                                <label>Email</label>
                                <input onChange={this.handleInput} type="email" name="email" placeholder="Lovely Email" className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"></input>
                            </div>
                            <Error
                                error = {this.state.errors["email"] ? this.state.errors["email"] : null}
                            >
                            </Error>
                            <div className="mt-4">
                                <label>Password</label>
                                <input onChange={this.handleInput} type="password" name="password" placeholder="Super Duper Password" className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"></input>
                            </div>
                            <Error
                                error = {this.state.errors["password"] ? this.state.errors["password"] : null}
                            >
                            </Error>
                            <div className="mt-4">
                                <label>Confirm Password</label>
                                <input onChange={this.handleInput} type="password" name="password_confirmation" placeholder="Confirm Password" className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"></input>
                            </div>
                            <div className="mt-4">
                                <input type="submit" className="mt-1 p-2 border border-gray-400 rounded cursor-pointer bg-purple-600 text-white"></input>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLogin: (user) => dispatch({type: "SET_LOGIN", payload: user})
    }
}

export default connect(null, mapDispatchToProps)(Register)