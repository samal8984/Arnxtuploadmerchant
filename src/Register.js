import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import { Metadata } from './layout/Metadata';



const registerUrl= 'https://4xuh6eqvr6.execute-api.ap-south-1.amazonaws.com/production/register'
const sendotpurl= 'https://4xuh6eqvr6.execute-api.ap-south-1.amazonaws.com/production/sendotp'
const verifyotpurl= 'https://4xuh6eqvr6.execute-api.ap-south-1.amazonaws.com/prodnew/verifyotp'


export const Register = ({history}) => {
    const [res, setRes]= useState('')
    const[phoneNo, setNumber]= useState('')
    const [verifyotp, setVerifyOtp]= useState(false)
    const [otp, setOtp]= useState('')
    const [otpshow, setOtpShow]= useState(false)

    const [name, setName]= useState('');
    const [email, setEmail]= useState('');
    const [location, setLocation]= useState('');
    const [password, setPassword]= useState('');  
    const [message, setMessage]= useState(null);
    const [otpmessage,setOtpMessage]= useState(null);
    const [otpverifymessage, setOtpVerifyMessage]= useState(null);
    const [resend, setResend]= useState(false)

    useEffect(()=>{
      if(res === 200){
        history.push('/login')
      }
      
    },[history,res])

const submitHandler=  (event)=>{

    event.preventDefault();
    if(name==='' || email==='' || location==='' || password==='' || phoneNo === ''){
        setMessage('All fields are required')
        return
    }
    
  
    

      const requestBody={
         phoneNo : phoneNo,
        name : name,
        email: email,
        location :location,
        password : password,
       
    }
      
    axios.post(registerUrl, requestBody).then(response=>{
    
        swal({
            title: "Registration Successful!",
            text: response.data.message,
            icon:"success",
            button:'OK!'

        })
        setRes(response.status)
        
       
    }).catch(error=>{
        if(error.response.status===401){
            setMessage(error.response.data.message)
            setTimeout(()=>{
                setMessage('')
              },3000)
          
        }else{
            setMessage('server down! Please try after some time')
        }
    })
   



    




}


const otpHandler=(event)=>{
  event.preventDefault();
  if(phoneNo === ''){
    setOtpMessage('Please Enter Your MobileNo')
    setTimeout(()=>{
      setOtpMessage('')

    },3000)
  }
  const requestBody={
    phoneNo: phoneNo
  }

  axios.post(sendotpurl, requestBody).then(response=>{
    if(response.request.status === 200){
      setOtpShow(true)
      setResend(true)
    }
   
  
  
    setMessage()
    
 
    
   
}).catch(error=>{
 
    if(error.response.request.status=== 401){
      
        setOtpMessage(error.response.data.Message)
        setTimeout(()=>{
            setOtpMessage('')
          },3000)
      
    }else{
        setMessage('server down! Please try after some time')
    }
})


}

const verifyOtpHandler=(event)=>{
  event.preventDefault();
  const requestBody={
    phoneNo: phoneNo,
    otp: otp
  
  }

  axios.post(verifyotpurl, requestBody).then(response=>{
    console.log(response.request.status === 200)
    setVerifyOtp(true);
    setOtpShow(false)
  
  
    
 
    
   
}).catch(error=>{
 
    if(error.response.request.status=== 401){
      
        setOtpVerifyMessage(error.response.data.Message)
        setTimeout(()=>{
            setOtpVerifyMessage('')
          },3000)
      
    }else{
        setMessage('server down! Please try after some time')
    }
})


}


  return (
   
    <div className="container">
      <Metadata title={'Register'}/>

    <div className="row">
      <div className="col-lg-10 col-xl-9 mx-auto" style={{ width:'110%'}} >
     
        <form onSubmit={submitHandler}>
        <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
          <div className="card-img-left d-none d-md-flex">
           
          </div>
         
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-bold fs-5"  style={{}}>Register</h5>
                      
        <div className="form-floating mb-3">
                
                <input type="tel" disabled={verifyotp ? 'disabled': ''}   className="form-control" maxLength='10'
                 onChange={event=> setNumber(event.target.value)}
                 id="floatingInputUsername" placeholder="" required autofocus/>
                <label htmlFor="floatingInputUsername">PhoneNo</label>
              </div>

              <div className="d-grid mb-2">
               {resend ? (
                  <button className="btn btn-lg btn-success btn-login fw-bold text-uppercase" 
                style={  otpshow ? {  width:'120px',height:'40px', padding:'0px'}: {width:'90px',height:'40px', padding:'0px'}}  onClick={otpHandler} 
                type="submit">Resend Otp</button>) :
                ( <button className="btn btn-lg btn-success btn-login fw-bold text-uppercase" 
                style={  otpshow ? {  width:'120px',height:'40px', padding:'0px'}: {width:'90px',height:'40px', padding:'0px'}}  onClick={otpHandler} 
                type="submit">Verify</button>)}
              </div>
              {otpmessage && <p style={{color:'red'}} > {otpmessage}</p>}


       
        
        <div  style={ otpshow ? {} : {display:'none'}} >
        <div className="form-floating mb-3">
                
                <input type="tel" className="form-control" maxLength='10'
                 onChange={event=> setOtp(event.target.value)}
                 id="floatingInputUsername" placeholder="" required autofocus/>
                <label htmlFor="floatingInputUsername">Otp</label>
              </div>

              <div className="d-grid mb-2">
                <button className="btn btn-lg btn-success btn-login fw-bold text-uppercase" 
                style={{width:'90px',height:'40px', padding:'0px'}} 
                 onClick={verifyOtpHandler} type="submit">Verify Otp</button>
              </div>
              </div>
              {otpverifymessage && <p style={{color:'red'}}> {otpverifymessage}</p>}


        

              <div className="form-floating mb-3">
                
                <input type="text" className="form-control"
                 onChange={event=> setName(event.target.value)}
                 id="floatingInputUsername" placeholder="myname" required autofocus/>
                <label htmlFor="floatingInputUsername">Name</label>
              </div>

              <div className="form-floating mb-3">
                <input type="email" className="form-control"
                 onChange={event=> setEmail(event.target.value)}
                  id="floatingInputEmail" placeholder="name@example.com"/>
                <label htmlFor="floatingInputEmail">Email address</label>
              </div>

              <div className="form-floating mb-3">
              
                <input type="text" className="form-control"
                 onChange={event=> setLocation(event.target.value)} id="" placeholder="location"/>
                <label htmlFor="floatingInputEmail">Location</label>
              </div>

              <hr/>

              <div className="form-floating mb-3">
                <input type="password" className="form-control"
                 onChange={event=> setPassword(event.target.value)} id="floatingPassword" placeholder="Password"/>
                <label htmlFor="floatingPassword">Password</label>
              </div>

           

              <div className="d-grid mb-2" >
                <button   style={verifyotp ? {}: {display:'none'}}  className="btn btn-lg btn-success btn-login fw-bold text-uppercase" type="submit">Register</button>
              </div>

              <Link className="d-block text-center mt-2 small"  to="/Login">Have an account? Sign In</Link>

              <hr className="my-4"/>

          

          
         {message && <p style={{color:' red'}} >{message}</p>}
            
          </div>
        
        </div>
        </form>

    

      </div>
    </div>
  </div>
  )
}
