
import './App.css';
import Products from './Products'
import { Register } from './Register';
import { Login } from './Login';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { getUser, getToken, setUserSession, resetUserSession } from './service/AuthService';
import { useEffect } from 'react';
import axios from 'axios';
import  PrivateRoute  from './routes/PrivateRoute';


const verifyUrl= 'https://4xuh6eqvr6.execute-api.ap-south-1.amazonaws.com/prod/verify'

function App() {

useEffect(()=>{
  const token= getToken();
  if(token==='undefined'  || token === undefined || token === null || !token){
    return
  }
  const requestBody= {
    user: getUser(),
    token: token
  

  }

  axios.post(verifyUrl, requestBody).then(response=>{
    console.log(response)

    setUserSession(response.data.user, response.data.token)
  }).catch(()=>{
    
  
    
  })
},[])

  return (
    
    <div className="">
    
    <Router>
   
       
       <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <PrivateRoute  path='/products' component={Products} />


        </Router>
     
   
    </div>
  
  );
}

export default App;
