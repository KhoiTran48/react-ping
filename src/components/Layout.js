import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import cookie from 'js-cookie';

function Layout(props) {
    const handleLogout = (e)=>{
        e.preventDefault();
        cookie.remove("token");
        props.logout();
    }
    return (
        <div>
            <nav className="flex">
                <h1 className="w-3/4 py-4 mx-10">Pingpong Authentication </h1>
                <div className="w-1/4 flex justify-end">
                    {
                        !props.loggedIn ? 
                            <div>
                                <Link
                                    className="m-3 py-1 px-2 bg-purple-700 text-white rounded inline-block"
                                    to="/login"
                                >
                                    Login
                                </Link>
                                <Link
                                    className="m-3 py-1 px-2 bg-purple-700 text-white rounded inline-block"
                                    to="/register"
                                >
                                    Register
                                </Link>
                            </div>
                        :
                            <Link
                                className="m-3 py-1 px-2 bg-purple-700 text-white rounded inline-block"
                                to="/logout"
                                onClick={handleLogout}
                            >
                                Logout
                            </Link>
                    }
                </div>
            </nav>
            {props.children}
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        logout: ()=>dispatch({type: "SET_LOGOUT"})
    }
}

const mapStateToProps = state =>{
    return {
        loggedIn: state.auth.loggedIn
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
