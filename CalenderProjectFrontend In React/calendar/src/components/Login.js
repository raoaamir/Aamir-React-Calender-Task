import React, {useState} from "react"
import { useNavigate } from "react-router-dom"


const Login = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const emailError = document.querySelector('.password.error')
    
    const login = async (e) => {
            e.preventDefault();
            emailError.textContent = ''
        try {
            const result = await fetch('http://localhost:5000/login', {
                method: 'POST',
                body: JSON.stringify({email, password}),
                headers: { 'Content-Type': 'application/json' }

            })

            const data = await result.json()
           
            if (data.errors) {
                emailError.textContent = data.errors
            }
            
            if (data.token) {
                localStorage.setItem('token' , data.token)
                localStorage.setItem('email' , data.user.email)

                navigate('/')
                window.location.reload();
            }else
            {
                console.log(data.errors)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="login">
            <h1>Login</h1>
           <form>
           
            <input type="text" name="email"  onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email"></input>
            <input type="password" name="password"  onChange={(e) => setPassword(e.target.value)}  placeholder="Enter your Password" ></input>
            <div className="password error"></div>
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div  className="button"> <a href="/register">Register</a></div>
           </form>
        </div>
    )
}

export default Login