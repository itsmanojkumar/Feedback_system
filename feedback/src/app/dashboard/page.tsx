'use client'
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';

interface employee {
  name: string;
  improve: string;
  strengths: string;
  feedback: string;
}

interface feedbackdata {
  id: number;
  name: string;
  improve: string;
  strengths: string;
  feedback: string;
}

function page() {
  const [form, setForm] = useState<employee>({
    name: '',
    strengths: '',
    improve: '',
    feedback: '',
  });

  const [alldata, setAlldata] = useState<feedbackdata[]>([]);
  const [overallSentiment, setOverallSentiment] = useState('');

  const handlechange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleSentimentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOverallSentiment(e.target.value);
  };

  useEffect(() => {
    async function getdata() {
      const response = await fetch("http://127.0.0.1:8000/api/data");
      const data = await response.json();
      console.log("useeefffectdata", data);
      setAlldata(data.data);
    }
    getdata();
  }, [form]);

  const handlesubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("data submitted");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/data", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form),
      });
      console.log(JSON.stringify(form));
      const data = await response.json();
      console.log("response from data", data);
    } catch (error) {
      console.log(error);
    }
    setForm({
      name: "",
      strengths: '',
      improve: '',
      feedback: ''
    });
  };

  const router = useRouter();
  const feedbacksystem = (item: feedbackdata) => {
    const queryParams = new URLSearchParams({
      name: item.name,
      improve: item.improve,
      strengths: item.strengths,
      feedback: item.feedback,
    }).toString();

    router.push(`/feedback?${queryParams}`);
  };

  const handledelete = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/data/${id}/`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setAlldata(prev => prev.filter(item => item.id !== id));
        console.log("data deleted successfully");
      } else {
        console.error("failed to delete data");
      }
    } catch (error) {
      console.error("error deleting data", error);
    }
  };

  const handleEdit = (item: feedbackdata) => {
    setForm({
      name: item.name,
      improve: item.improve,
      strengths: item.strengths,
      feedback: item.feedback,
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">Create</button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
        <form onSubmit={handlesubmit} className="space-y-4">
          <div>
            <label htmlFor='employee-name' className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type='text'
              id='employee-name'
              name="name"
              onChange={handlechange}
              placeholder='Enter employee name'
              value={form.name}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor='strengths' className="block text-sm font-medium text-gray-700">Strengths:</label>
            <input
              type='text'
              id='strengths'
              name='strengths'
              onChange={handlechange}
              placeholder='Strengths'
              value={form.strengths}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor='improves' className="block text-sm font-medium text-gray-700">Improve:</label>
            <input
              type='text'
              id='improves'
              name='improve'
              onChange={handlechange}
              placeholder='Areas to improve'
              value={form.improve}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <p className="block text-sm font-medium text-gray-700 mb-1">Overall Sentiment:</p>
            <div className="flex gap-4">
              {['Positive', 'Neutral', 'Negative'].map((Option) => (
                <label key={Option} className="flex items-center gap-1 text-sm text-gray-600">
                  <input
                    type="radio"
                    name="overallSentiment"
                    value={Option}
                    checked={overallSentiment === Option}
                    onChange={handleSentimentChange}
                    required
                  />
                  {Option}
                </label>
              ))}
            </div>
          </div>

          <div>
            <button
              type='submit'
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8 space-y-4">
        {alldata?.map((item, index) => (
          <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded shadow-md gap-2 sm:gap-5">
            <div className="space-y-1 text-sm text-gray-700">
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Strengths:</strong> {item.strengths}</p>
              <p><strong>Improve:</strong> {item.improve}</p>
              <p><strong>Feedback:</strong> {item.feedback}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handledelete(item.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
              <button
                onClick={() => feedbacksystem(item)}
                className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
              >
                Send Feedback
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
