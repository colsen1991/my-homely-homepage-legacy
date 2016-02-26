import React from 'react';
import Header from './header/header';
import Content from './content/content';
import Footer from './footer/footer';

export default ({ children }) => (
  <div>
    <Header/>
    <Content>
      {children}
    </Content>
    <Footer/>
  </div>
);
