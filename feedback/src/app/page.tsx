  'use client'
  import { HtmlContext } from 'next/dist/server/route-modules/pages/vendored/contexts/entrypoints';
import { useRouter } from 'next/navigation';
  import React, { ChangeEvent, FormEvent, useState } from 'react'
  import { useEffect } from 'react';
  import login from './login/page';
  

  interface employee{
    name:string;
    improve:string;
    strengths:string;
    feedback:string;
  }

  interface feedbackdata{
    id:number;
    name:string;
    improve:string;
    strengths:string;
    feedback:string;

  }



  function page() {
    const [form,setForm]=useState<employee>({
      name:'',
      improve:'',
      strengths:'',
      feedback:'',
    });

    const [alldata,setAlldata]=useState<feedbackdata[]>([]);
    const [overallSentiment, setOverallSentiment] = useState('');


     const handlechange=(e:ChangeEvent<HTMLInputElement>)=>{
      const {name, value}=e.target;
      setForm(prevForm=>({...prevForm,[name]:value,}))  };

  const handleSentimentChange = (e: ChangeEvent<HTMLInputElement>) => {
  setOverallSentiment(e.target.value);
};


    useEffect(()=>{
      async function getdata(){
      const response=await fetch("http://127.0.0.1:8000/api/data");
      const data= await response.json();
      console.log("useeefffectdata",data)
      setAlldata(data.data);
      console.log("alldatadebug",alldata);
    }
    getdata();
  },[form])
    
    const handlesubmit=async (e:FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      console.log("data submitted");
     
      

    
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
     setForm({
        name:"",
        strengths:'',
        improve:'',
        feedback:''
      })
      

    }
    const router=useRouter();
    const feedbacksystem=(item:feedbackdata)=>{
      const queryParams = new URLSearchParams({
    name: item.name,
    improve: item.improve,
    strengths: item.strengths,
    feedback: item.feedback,
  }).toString();

  router.push(`/feedback?${queryParams}`);
  };

  const handledelete=async(id:number)=>{
  try{
    const response=await fetch(`http://127.0.0.1:8000/api/data/${id}/`,{
      method:'DELETE',
    });
    if(response.ok){
      setAlldata(prev=>prev.filter(item=>item.id!==id));
      console.log("data deleted successfully")
    } else{
      console.error("failed to delete data");
    }
  } catch(error){
    console.error("error deleting data",error);
  }
};
  
  const handleEdit = (item: feedbackdata) => {
  setForm({
    name: item.name,
    improve: item.improve,
    strengths: item.strengths,
    feedback: item.feedback,
  });}

    return (
      <>
      <div> 
        <button>Create</button>
    
      </div>
      <div className='flex gap-5'>
        <form onSubmit={handlesubmit}>
        <label htmlFor='employee-name'>Name:</label>
        <input type='text' id='employee-name' name="name" onChange={handlechange} placeholder='enter employee name' value={form.name}></input> 
        <label htmlFor='strenghths'>Strengths:</label>
        <input type='text' id='strenghts' name='strengths' onChange={handlechange} placeholder='Strengths' value={form.strengths}></input>
        <label htmlFor='improves'>Improve:</label> 
        <input type='text' id='improves' name='improve' onChange={handlechange} placeholder='areas to improve' value={form.improve}></input>
        <label htmlFor=''>Overall Sentiment</label>
        {['Positive','Neutral','Negative'].map((Option)=>(
          <label key={Option}>
        <input type="radio" name="overallSentiment"  value={Option}checked={overallSentiment === Option}  onChange={handleSentimentChange} required />
        {Option}
        </label>))}
       {/* </span> */}
        {/* <label className=" flex gap-2" htmlFor='feedback'>Feedback:</label> */}
        {/* <input type='text' id='feedback' name='feedback' onChange={handlechange} placeholder='Enter feedback' value={form.feedback}></input> */}

    
        
        <span><button type='submit'>Submit</button></span>
        </form>
         </div>
      <div className=''>
      {alldata?.map((item,index)=>{
        return (
          <div  className='flex flex-row gap-5 m-2' key={index}>
            <p>{item.name}</p>
            <p>{item.improve}</p>
            <p>{item.strengths}</p>
            <p>{item.feedback}</p>
            <button onClick={()=>handleEdit(item.id)} className='px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition cursor-pointer'>Edit</button>
            <button onClick={()=>handledelete(index)} className='px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition cursor-pointer'>Delete</button>
            <button onClick={()=>feedbacksystem(item)} className='px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer'>Send Feedback</button>

          </div>


        )
        
      })}
      </div>

      
   

      </>
    )
  }

  export default page 
 

