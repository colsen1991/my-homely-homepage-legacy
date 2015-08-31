'use strict';

var React = require('react');
var $ = require('jquery');

var MainWrapper = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        $.ajax({
            url: '/messages',
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        return (
            <div id="main-wrapper">
                <header id="site-header">
                    <h1>My Homeley Homepage</h1>
                </header>
                <div id="content">
                    <span>Messages from the server:</span>
                    <br/>
                    <var>{this.state.data}</var>
                </div>
                <footer id="site-footer"></footer>
            </div>
        )
    }
});

module.exports = MainWrapper;
