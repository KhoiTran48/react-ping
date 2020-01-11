import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Error extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <div className="text-red-500">
                {this.props.error}
            </div>
        )
    }
}
