import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import React from 'react';
import Home from './pages/Home.tsx';
import FavoritesPage from './pages/FavoritesPage.tsx';
import NavBar from './components/NavBar.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import { Flip, ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className='bg-gray-300 min-h-screen'>
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/favorites' element={<FavoritesPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
      <ToastContainer transition={Flip}   />
    </div>
  );
}

export default App;
