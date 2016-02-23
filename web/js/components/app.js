import React from 'react';
import Header from './header';
import Content from './content';
import Footer from './footer';

export default ({children}) => (
  <div>
    <Header/>
    <Content>
      {children}
    </Content>
    <Footer/>
  </div>
);
