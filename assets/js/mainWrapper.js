"use strict";

var React = require('react');

var MainWrapper = React.createClass({
    render: function () {
        return (
            <div id="main-wrapper">
                <header id="site-header">
                    <h1>My Homeley Homepage</h1>
                </header>
                <div id="content"></div>
                <footer id="site-footer"></footer>
            </div>
        )
    }
});

module.exports = MainWrapper;
