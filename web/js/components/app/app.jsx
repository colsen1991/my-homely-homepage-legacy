import React from 'react';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import styles from './app.styl';

const App = ({ children }) => (
  <div>
    <Header/>
    <main className={styles.content}>
      {children}
    </main>
    <Footer/>
  </div>
);

export default App;
