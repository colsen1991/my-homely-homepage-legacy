import React, {Component} from 'react';
import Link from 'react-router/lib/Link';
import Header from './header';
import Footer from './footer';

export default class MainWrapper extends Component {
  render() {
    return (
      <div id='site-wrapper'>
        <Header/>

        <div id='site-content' className='adjust-size'>
          {this.props.children}
        </div>

        <Footer/>
      </div>
    )
  }
}
