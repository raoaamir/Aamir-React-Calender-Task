import React, { useState } from "react"
import { useNavigate} from "react-router-dom"
import PasswordChecklist from "react-password-checklist"




const Register = () => {
  

    const navigate = useNavigate()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword ,setReEnterPassword] = useState('')
    const emailError = document.querySelector('.password.error')
  

    const register = async (e)=>{
        e.preventDefault()

        emailError.textContent = ''

        try {
            const result = await fetch('http://localhost:5000/register', {
                method: 'POST',
                body: JSON.stringify({name, email, password, reEnterPassword}),
                headers: { 'Content-Type': 'application/json' }

            })

           
            // window.location.reload();
            const data = await result.json()
            if (data.errors) {
                emailError.textContent = data.errors
            }else{
                 navigate ('/Login')
            }

          
           
        //  console.log (data)
          
        } catch (error) {
            console.log(error)
        }
        
    }
    
   
   


    return (
        
        <form onSubmit={register}>
        <div className="register">
          
            <h1>Register</h1>
            <input type="text" name="name"  placeholder="Your Name" onChange={(e) => setName(e.target.value)} required></input>
            <input type="text" name="email"  placeholder="Your Email" onChange={(e) => setEmail(e.target.value)}required></input>
            <input type="password" name="password" placeholder="Your Password" onChange={(e) => setPassword(e.target.value)}></input>
            <input type="password" name="reEnterPassword" placeholder="Re-enter Password" onChange={(e) => setReEnterPassword(e.target.value)}></input>
            <div className="password error"></div>
            <button className="btn" disabled>Register</button>
            {/* <div className="button" id="reg" onClick={register} >Register</div> */}
            {/* <div>or</div>
            <div  className="button"> <a href="/Login"> Login </a></div> */}
            
            <PasswordChecklist
				rules={["minLength","specialChar","number","capital","match"]}
				minLength={5}
				value={password}
				valueAgain={reEnterPassword}
				onChange={(isValid) => {
                    var bt = document.querySelector('.btn')
                   if(isValid){
                    console.log(bt)
                    bt.disabled = false
                   }else{
                    bt.disabled = true
                   }
                }}
			/>


        
        </div>
        </form>
    )
}

export default Register