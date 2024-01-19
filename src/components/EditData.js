/* eslint-disable no-useless-computed-key */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react'
import axios from "axios"

const EditData = ({edit,setEdit,user,setToggle, toggle}) => {

  const [daily, setDaily] = useState(false);
  const [weekly, setWeekly] = useState(false);
  const [repeat, setRepeat] = useState([]);
  const [monthly, setMonthly] = useState(false);
  const [formData, setFormData] = useState({
    Title: user.Title,
    Description: user.Description,
    Subject:user.Subject,
    Frequency:user.Frequency,
    Repeat:user.Repeat,
    Time:user.Time
  })


  const handleSelectFrequency = (e)=>{
    const { id, value } = e.target;
    console.log(id,value)
    setFormData({
      ...formData,
        [id]: value,["Repeat"]:[]
      
    });
    if(e.target.value==='Weekly')
    {
      setDaily(false)
      setMonthly(false);
      setWeekly(true);
      setRepeat([]);
      
    }
    else if(e.target.value==='Daily'){
      setDaily(true)
      setMonthly(false);
      setWeekly(false);
      setRepeat([])
      
    }
    else if(e.target.value==='Monthly'){
      setDaily(false)
      setMonthly(true);
      setWeekly(false);
      setRepeat([])
      
    }
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleRepeatChange = (e) => {
    const value = e.target.value || e.target.dataset.value; 
    
    
    if(e?.target?.value && e.target.id==='Monthly'){
      setRepeat([value]);
      setFormData({
        ...formData,
        ["Repeat"]: [value]
      });
    }
    else{
    if (repeat.includes(value)) {
      
      setRepeat(repeat.filter(item => item !== value));
      setFormData({
        ...formData,
        ["Repeat"]: [repeat.filter(item => item !== value)]
      });
    } else {
      
      setRepeat([...repeat, value]);
      setFormData({
        ...formData,
        ["Repeat"]: [...repeat,value]
      });
    }

  }
  
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      const res = await axios.patch(`https://dataplant-assessment.onrender.com/schedule/${user._id}`,formData, {
        headers: {
          'Content-Type': 'application/json'
        }});
  
        console.log(res, res)
        setEdit(false);
        setToggle(!toggle);
      }
      catch(err){
        console.log(err)
      }
    
  }
  


  return (
    <div className='flex flex-col z-2 absolute right-24 bg-white p-3 border-3 border-gray-300 shadow-2xl w-3/8'>
    <h1 className='mb-4 text-2xl '>Add Schedule</h1>
    <form className='flex flex-col' onSubmit={handleSubmit}>
        <div className='flex justify-between p-3 gap-2' >
        <label className='w-1/3'>Title</label>
        <input type='text' id='Title' placeholder='Title' onChange={handleInputChange} className='border-2 border-gray-400 p-1 w-2/3'/>
        </div>
        <div className='flex justify-between p-3 gap-2'>
        <label className='w-1/3'>Description</label>
        <textarea type='text-area' id='Description' placeholder='Description' onChange={handleInputChange} className='border-2 w-2/3 border-gray-400 p-1'/>
        </div>
        <div className='flex justify-between p-3 gap-2'>
          <label className='w-1/3'>Subject</label>
          <input type='text' id='Subject' placeholder='Subject' onChange={handleInputChange} className='border-2 w-2/3 border-gray-400 p-1'/>
        </div>
        <div className='flex justify-between p-3 gap-2'>
          <label className='w-1/3'>Frequency</label>
          <select id='Frequency' onChange={(e)=>handleSelectFrequency(e)} className='border-2 border-gray-400 p-1 w-2/3'>
            <option default id='Daily' name='daily' value='daily'>Daily</option>
            <option id='Weekly' name='weekly' value='weekly'>Weekly</option>
            <option id='Monthly' name='monthly' value='monthly'>Monthly</option>
          </select>
        </div>
        {
          monthly &&
          (<div className='flex justify-between p-3 gap-2'>
          <label className='w-1/3'>Repeat</label>
          <select id='Repeat' className='border-2 border-gray-400 p-1 w-2/3' onChange={(e)=>handleRepeatChange(e)}>
            <option  default>Select the one</option>
            <option  id='monday' value='first-monday'>First Monday</option>
            <option id='tuesday' value='first-tuesday'>First Tuesday</option>
            <option id='wednesday' value='first-wednesday'>First Wednesday</option>
          </select>
          </div>)
        }
        {
          weekly &&
          (
            <div className='flex justify-between p-3 gap-2'>
              <label className='w-1/3'>Repeat</label>
              <div className='flex w-2/3'>
              <div id='sunday' data-value='sunday' onClick={(e)=>handleRepeatChange(e)} className='border-2 w-7 h-7 text-center text-sm border-gray-500 rounded-full mx-1 '>S</div>
              <div id='monday' data-value='monday' onClick={(e)=>handleRepeatChange(e)} className='border-2 w-6 h-6 text-center text-sm border-gray-500 rounded-full mx-1'>M</div>
              <div id='tuesday' data-value='tuesday' onClick={(e)=>handleRepeatChange(e)} className='border-2 w-6 h-6 text-center text-sm border-gray-500 rounded-full mx-1'>T</div>
              <div id='wednesday' data-value='wednesday' onClick={(e)=>handleRepeatChange(e)} className='border-2 w-6 h-6 text-center text-sm border-gray-500 rounded-full mx-1'>W</div>
              <div id='thursday' data-value='thursday' onClick={(e)=>handleRepeatChange(e)} className='border-2 w-6 h-6 text-center text-sm border-gray-500 rounded-full mx-1'>T</div>
              <div id='friday' data-value='friday' onClick={(e)=>handleRepeatChange(e)} className='border-2 w-6 h-6 text-center text-sm border-gray-500 rounded-full mx-1'>F</div>
              <div id='saturday' data-value='saturday' onClick={(e)=>handleRepeatChange(e)} className='border-2 w-6 h-6 text-center text-sm border-gray-500 rounded-full mx-1'>S</div>
              </div>
            </div>
          )
        }
        <div className='flex justify-between p-3 gap-2'>
          <label className='w-1/3'>Time</label>
          <input type='time' id='Time' className='border-2 border-gray-400 p-1 w-2/3' onChange={handleInputChange} default='10:00 AM'/>
        </div>
        <div className='flex justify-end p-3'>
        <button type='button' className='p-2 gap-2 border-2 border-blue-950 mx-2 rounded-md bg-purple-900 text-white text-sm' onClick={()=>setEdit(!edit)}>Cancel</button>
        <button className='p-2 gap-2 border-2 border-blue-950 mx-2 rounded-md bg-purple-900 text-sm text-white' >Done</button>

        </div>

    </form>         
    </div>
  )
}

export default EditData