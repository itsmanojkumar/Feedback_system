import React, { useState } from 'react'

function login() {
    const [username,setUsername]=useState<string>("")
    const [password,setPassword]=useState<any>("")
    const handlesubmit=async ()=>{
        try{
        const response=await fetch("login",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({username,password}),
        });
        return await response.json()
        }
        catch(error){
            console.log(error)
        }
    }
  return (
    <div>login
        <form onSubmit={handlesubmit}>
        <label htmlFor='username'>Login</label>
        <input type='text' id='username' name='' value={username} placeholder='' onChange={(e)=>setUsername(e.target.value)}></input>
        <label htmlFor='password'>Password</label>
        <input type='password' id="password" name='' value={password} placeholder='' onChange={(e)=>setPassword(e.target.value)}></input>
        </form>
    </div>
  )
}

export default login