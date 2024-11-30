import React,{useContext, useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import "./Login.css"
import { MyContext } from '../../store';
import axios from 'axios';

const Login = () => {
  const { admin,setAdmin } = useContext(MyContext);
  console.log(admin)

  const navigate = useNavigate()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error, setError] = useState("")

  // const adminUser = localStorage.getItem('admin')
  // console.log(adminUser)

  // useEffect(() => {
  //   if(adminUser){
  //     navigate("/dashboard")
  //   }
  // },[adminUser])

  const submitHandler = async() => {
    if(!email && !password){
      setError("Please Fill All the Fields")
    }else if(!email){
      setError("Email is required")
    }else if(!password){
      setError("Password is required")
    }else{
      try {
        const { data } = await axios.post("https://kwizdom2-0-backend.onrender.com/admin/signin", {
          email,
          password,
        });
        setAdmin(data);
        
        if(admin){
          navigate("/dashboard")
          // localStorage.setItem('admin',JSON.stringify(data[0]))
        }else{
          setError("Login Failed")
        }
      } catch (error) {}
      
    } 
  }
  return (
    <>
     <main className='login-box'>
     <div>
          <img src="/logo1.png" alt="" />
        </div>


      <div className='login'>
        <h1>Sign In</h1>
        <div>
            <label>Email</label>
            <input 
            type="email" 
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            />
        </div>

        <div>
            <label htmlFor="">Password</label>
            <input 
            type="password" 
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>

        <button onClick={submitHandler}>Sign In</button>

        { error && <p className='error'>{error}</p>}
        </div>
    </main>
    </>
  )
}

export default Login