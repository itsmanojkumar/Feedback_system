  'use client'
  import { HtmlContext } from 'next/dist/server/route-modules/pages/vendored/contexts/entrypoints';
  import React, { ChangeEvent, FormEvent, useState } from 'react'
  

  interface employee{
    name:string;
    improve:string;
  }



  function page() {
    const [form,setForm]=useState<employee>({
      name:'',
      improve:''
    });

     const handlechange=(e:ChangeEvent<HTMLInputElement>)=>{
      const {name, value}=e.target;
      setForm(prevForm=>({...prevForm,[name]:value,}))  };

    async function getdata(){
      const response=await fetch("");
      const data= await response.json();
    return data;
    }
    
    const handlesubmit=async (e:FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      console.log("data submitted");
      // setForm({
        // name:"",
        // improve:''
      // })
      

    
    try{
    const response= await fetch("http://127.0.0.1:8000/api/data",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(form),
      

     });  
     console.log(JSON.stringify(form))
     const data=await response.json();
     console.log("response from data",data);
    //  getdata();
    }
     catch(error){
          console.log(error);
     }
      

    }
   
    return (
      <>
      <div> 
        <button>Create</button>
      </div>
      <div className='flex gap-10'>
        <form onSubmit={handlesubmit}>
        <label htmlFor='employee-name'>Name:</label>
        <input type='text' id='employee-name' name="name" onChange={handlechange} placeholder='enter employee name' value={form.name}></input> 
        <label htmlFor='improves'>Improve:</label> 
        <input type='text' id='improves' name='improve' onChange={handlechange} placeholder='areas to improve' value={form.improve}></input>
        <span><label htmlFor=''>Overall Sentiment</label>
        {/* <checkbox></checkbox> */}
        <label htmlFor=''>Positive
        <input type="checkbox" /></label>
        <label htmlFor=''>Neutral
        <input type="checkbox" /></label>
        <label htmlFor=''>Negative
        <input type="checkbox" /></label></span>
    
        
        <span><button type='submit'>Submit</button></span>
        </form>
      </div>

      </>
    )
  }

  export default page 

   
