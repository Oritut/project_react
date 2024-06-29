import './App.css'
import Customer from './allComponnet/customer'
import Manager from './allComponnet/manager'
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './allComponnet/loginForm';

function App() { 

  return (
    <> 
      <Routes>
        <Route path={'/'} element={<Customer />} />
        <Route path={'/admin'} element={<Manager />} />
        <Route path={'/login'} element={<LoginForm />} />
      </Routes> 
    </>
  )
}

export default App