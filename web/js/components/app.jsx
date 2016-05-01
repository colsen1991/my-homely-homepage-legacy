import React from 'react';
import Header from './header/header.jsx';
import Content from './content/content.jsx';
import Footer from './footer/footer.jsx';

const App = ({ children }) => (
  <div>
    <Header/>
    <Content>
      {children}
    </Content>
    <Footer/>
  </div>
);

export default App;
