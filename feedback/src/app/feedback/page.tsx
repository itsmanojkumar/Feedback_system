'use client'
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';


interface feedbackform{
  feedback:string;
}

export default function FeedbackPage() {
  const searchParams = useSearchParams();

  const name = searchParams.get('name') ?? '';
  const improve = searchParams.get('improve') ?? '';
  const strengths = searchParams.get('strengths') ?? '';
  const feedback = searchParams.get('feedback') ?? '';

  const [feedbackform,setFeedbackform]=useState<string>("")

  const handlesubmit=async()=>{

    const payload={
      name:name,
      feedbackform:feedbackform
    };
  try{
    const response= await fetch("http://127.0.0.1:8000/feedback",{

      method:"post",
      headers:{
      "content-type":"application/json",
      },
      body: JSON.stringify(payload),
  });
    if(response.ok){
      console.log("data sent successfully")
    }
    else{
      console.log("error posting the data")
    }
  }catch(error){
    console.log(error);
  }
}

  return (
    <div className='flex gap-5 m-5'>
      <form onSubmit={handlesubmit}>
      <h1>Feedback Page</h1>
      <p>Name: {name}</p>
      <p>Strengths: {strengths}</p>
      <p>Areas to Improve: {improve}</p>
      <p>Feedback: {feedback}</p>
      <textarea className="w-150 h-32 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" onChange={(e)=>setFeedbackform(e.target.value)} value={feedbackform} placeholder='Enter feedback'></textarea>
      <button type='submit'>Send</button>
      </form>
    </div>
  );
}
