import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import GlobalStyle from './pages/global';
import Routes from './pages/Routes';

function App() {
  return (
    <div className="App" >
      <Header />
      <Routes />
      <Footer />
      <GlobalStyle />
    </div>
  );
}

export default App;
