import React, { useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar';
import styles from './Form.module.css';
import Fields from '../../Components/Fields /Fields';
import Settings from '../../Components/Settings/Settings';
import Button from '@mui/material/Button';

const Form = () => {

    const[fields,setFields]=useState([generateRandomString()]);








    
    
    
    function generateRandomString() {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      
        for (let i = 0; i < 4; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters.charAt(randomIndex);
        }
      
        return result;
    }
    


    const handleRemoveField=(x)=>{
      let insertIndex = fields.indexOf(x);
      fields.splice(insertIndex,1);
      setFields(fields);
    }
    
    const handleAddField=(x)=>{
      let insertIndex = fields.indexOf(x);
      fields.splice(insertIndex +1, 0, generateRandomString());
      setFields(fields);

    }
    

    let props={
      id:fields[0],
      PropName:"",                                          
      Value:"",       
      Options:[],      
      type:"",   
      Properties:{
        type:'',
        required: false,
        unique: false,
      },
      
    }





    const [data,setData]=useState({
        Name:"",
        Description:"",
        Properties:[],
        BackLink:""
      })




    const handle=(e)=>{
      const newdata = { ...data };
      newdata[e.target.id] = e.target.value;
      setData(newdata);
    }




  return (
    <div>
    <Navbar/>
    <div className=" flex min-h-screen">
        <Fields/>
        <div className={styles.main}>
            <form className='flex flex-col items-center w-full '>
              <div className="border-2 border-red-800 w-[80%] rounded-2xl mt-5 flex flex-col items-center h-[100vh]">

                <input
                  type="text"
                  id="Name"
                  value={data.Name}
                  name="Name"
                  placeholder='Form Name'
                  className='px-4 py-2 my-5 border-black border-2'
                  required={true}
                  onChange={(e)=>handle(e)}
                />

                <textarea
                  type="text"
                  id="Description"
                  value={data.Description}
                  name="Description"
                  className='px-4 py-2 border-2 border-black w-[90%] resize-none'
                  placeholder='Form Description'
                  required={true}
                  onChange={(e)=>handle(e)}
                />



                {fields.map((el)=>{

                })}
                <div className="mt-20 ">
                  <Button variant="contained" className='w-[300px]'>
                    SUBMIT
                  </Button>
                </div>
                </div>
            </form>
        </div>
        <Settings/>
    </div>
  </div>
  )
}

export default Form
