import React, {Component} from 'react';
import Link from 'react-router/lib/Link';
import Header from './header';
import Content from './content';
import Footer from './footer';

// TODO Wrap in/Make into(?) container. Get JWT from local storage if any. Validate/logout?
export default class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Content>
          {this.props.children}
        </Content>
        <Footer/>
      </div>
    )
  }
}
