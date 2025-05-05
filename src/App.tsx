import { type ReactElement } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from '@pages/Home/Home';
import SignUpForm from '@pages/SignUpForm/SignUpForm';
import Login from '@pages/LogIn/Login';

const App = (): ReactElement => {

  return (
    <div className="App">
    <Routes>
      <Route path='/home' element={<Home />}/>
      <Route path='/signup' element={<SignUpForm />} />
      <Route path='/login' element={<Login />} />
    </Routes>
</div>
  );
}

export default App;
