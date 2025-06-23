'use client' 
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function Login() {
    const router=useRouter();
    const [username,setUsername]=useState<string>("")
    const [password,setPassword]=useState<any>("")
    const handlesubmit=async (e: React.FormEvent)=>{
      e.preventDefault();
        try{
        const response=await fetch("http://localhost:8000/login",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({username,password}),
        });
        const text = await response.text();  // <- read as raw text
  console.log("Raw response text:", text);

  const data = JSON.parse(text);  // Try to parse
  console.log("Parsed JSON:", data);
        if (response.ok) {
        router.push('/');
      } else {
        alert('Login failed: ' + data.message);
      }
        }
        catch(error){
            console.log(error)
        }
        setUsername("");
        setPassword("");
    }
  return (
    <div>login
        <form onSubmit={handlesubmit}>
        <label htmlFor='username'>Login</label>
        <input type='text' id='username' name='' value={username} placeholder='' onChange={(e)=>setUsername(e.target.value)}></input>
        <label htmlFor='password'>Password</label>
        <input type='password' id="password" name='' value={password} placeholder='' onChange={(e)=>setPassword(e.target.value)}></input>
        <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Login