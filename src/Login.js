import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const loginUrl= 'https://4xuh6eqvr6.execute-api.ap-south-1.amazonaws.com/prod/login'

import { setUserSession } from './service/AuthService';
import { Metadata } from './layout/Metadata';




export const Login = ({history}) => {
    const [res, setRes]= useState('');

    useEffect(()=>{
        if(res === 200){
            history.push('/products')
        }
    },[history,res])
 

    const [email, setEmail]= useState('');  
    const [password, setPassword]= useState('');  
    const [message, setMessage] = useState(null);
    

    const submitHandler=(event)=>{
        event.preventDefault();
        if( email==='' || password===''){
            setMessage('Email and Password are required')
            setTimeout(()=>{
              setMessage('')
            },3000)
            return
        }
        

        const requestBody={
            email: email,
            password: password
        }
        axios.post(loginUrl, requestBody).then(response=>{
            
            setUserSession(response.data.user, response.data.token)
            setRes(response.status)
            

        }).catch(error=>{
            if(error.response.status ===401 || error.response.status === 403){
                setMessage(error.response.data.message)
                setTimeout(()=>{
                    setMessage('')
                  },3000)
            }else{
                setMessage('sorry server busy please try after some time')
            }
        })
    }


  return (
    <div className="container">
      <Metadata title={'Login'}/>

    <div className="row">
      <div className="col-lg-10 col-xl-9 mx-auto">
        <form onSubmit={submitHandler} >
        <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
          <div className="card-img-left d-none d-md-flex">
           
          </div>
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-bold fs-5"  style={{}}>Login</h5>
          

             

              <div className="form-floating mb-3">
                <input type="email" className="form-control"
                onChange={event=> setEmail(event.target.value)} id="floatingInputEmail" placeholder="name@example.com"/>
                <label for="floatingInputEmail">Email address</label>
              </div>

              <div className="form-floating mb-3">
                <input type="password" className="form-control"
                onChange={event=> setPassword(event.target.value)} id="floatingPassword" placeholder="Password"/>
                <label for="floatingPassword">Password</label>
              </div>

            

              <hr/>

            

           

              <div className="d-grid mb-2">
                <button className="btn btn-lg btn-success btn-login fw-bold text-uppercase" type="submit">Login</button>
              </div>

              <Link className="d-block text-center mt-2 small" to="/Register" >Dont have an account? Register</Link>

              <hr className="my-4"/>

          

            {message && <p  style={{color:'red'}} >{message}</p>}

            
          </div>
        </div>
        </form>
      </div>
    </div>
  </div>
  )
}
