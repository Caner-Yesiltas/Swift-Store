import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import React from 'react';
import Home from './pages/Home.tsx';
import FavoritesPage from './pages/FavoritesPage.tsx';
import NavBar from './components/NavBar.tsx';


function App() {
  return (
    <div className="bg-slate-300 min-h-screen text-center"
>
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/favorites' element={<FavoritesPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
