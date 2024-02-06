import React, { useState } from 'react'

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
        <form>

            <input
              type="text"
              id="Name"
              value={data.Name}
              name="Name"
              placeholder='Form Name'
              required={true}
              onChange={(e)=>handle(e)}
            />

            <input
              type="text"
              id="Description"
              value={data.Description}
              name="Description"
              placeholder='Form Description'
              required={true}
              onChange={(e)=>handle(e)}
            />



            {fields.map((el)=>{
                
            })}

        </form>
    </div>
  )
}

export default Form
