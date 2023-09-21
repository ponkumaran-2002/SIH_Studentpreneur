import React,{Component, useEffect} from 'react';
import {useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { SimpleDropdown } from 'react-js-dropdavn'
const Home=()=>{
    const [projectData, setProjectData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [ps, setProjectstatus] = useState("");
    const [pt, setProjecttype] = useState("");
    const [amt, setAmount] = useState("");
    const getFilteredProjectDetails=async()=>{
      await axios.post("http://localhost:5000/studentpreneur/get_filter",{status:ps,type:pt}).then(res=>{
        console.log(res.data);
        setProjectData(res.data);
        
        }).catch((error)=>{ });
    }
    const getProjectDetails=async()=>{
      await axios.post("http://localhost:5000/studentpreneur/getfilter",{}).then(res=>{
        console.log(res.data);
        setProjectData(res.data);
        }).catch((error)=>{ });
    }
    useEffect(()=>{
      window.addEventListener("load",getProjectDetails);
      console.log(projectData);
      return ()=>{
        window.addEventListener("load",getProjectDetails);
      };
    },[projectData]);

    const handle_submit=(e)=>{
      e.preventDefault();
      var projectstatus=document.getElementById("ps").value;
      var projecttype=document.getElementById("pt").value;
      var amoun=document.getElementById("amount").value;
      setProjectstatus(projectstatus);
      setProjecttype(projecttype);
      setAmount(amoun);
      // console.log(document.getElementById("amount").value);
      console.log("_______PRINT______")
      console.log(ps);
      console.log(pt);
      console.log(amt);
      getFilteredProjectDetails();
      setIsOpen(false);
    }
    const filter_b=(e)=>{
        e.preventDefault();
        console.log("outside_filter_b");
        console.log(isOpen);
        if(isOpen){
          console.log("inside_filter_b");
          console.log(isOpen);
          setIsOpen(false);
        }
        else{
          console.log("outside_filter_b");
          console.log(isOpen);
          setIsOpen(true);
        }
        // setIsOpen(true)
        // console.log(OTP)
        // console.log("verify OTP");
        // if(OTP.length===6){
        //    console.log(OTP)
        // window.confirmationResult.confirm(OTP).then(()=>{
        //       console.log("You are Correct");
        //       console.log("AccountNO");
        //       console.log(AccountNo);
        //       console.log("Name"+Name)
        //       console.log("DOB"+Dob)
        //       console.log("voterid"+voterid)
        //       console.log("Address"+Address)
        //       console.log("Phno"+Number)
        //       axios.post("http://localhost:5000/voterid/insert",{id:voterid,acno:AccountNo,name:Name,dob:Dob,addr:Address,phno:Number}).then(res=>{
        //                          console.log("Inside Verify OTP")
        //                          window.location.replace("http://localhost:3000")
        //    })
        //   }).catch((error)=>{
        //   });
        // }


     }
return(
    <div className="home">
    <button onClick={filter_b}>Filter</button>
    {isOpen && (
    <div>
         <select id="ps" onChange={(e)=>setProjectstatus(e.target.value)}>
         <option value="none">Select an Option</option>
          <option value="all">ALL</option>
          <option value="partially_completed">Partially completed</option>
         </select>
         <select id="amount" onChange={(e)=>setAmount(e.target.value)}>
         <option value="none">Select an Option</option>
         <option value="all">All</option>
          <option value="0-1000">0-1000</option>
          <option value="1000-5000">1000-5000</option>
          <option value="5000-100000">5000-100000</option>
         </select>
         <select id="pt" onChange={(e)=>setProjecttype(e.target.value)}>
         <option value="none">Select an Option</option>
          <option value="all">All</option>
          <option value="frontend">Front End</option>
          <option value="uidesign">UI/UX Design</option>
          <option value="3danimation">3D-Animation</option>
         </select>
         <button onClick={handle_submit}>Submit</button>

    </div>
    )}
    <table border="1px" >
      <tbody>
    <tr>
      <th>Project ID</th>
      <th>organisation</th>
      <th>Description</th>
      <th>Project Type</th>
      <th>Project Status</th>
      <th>Amount</th>
      <th>Due Date</th>
    </tr>
    { 
      projectData.map((item)=>{
        return(
          <tr>
          <td>{item.p_id}</td>
          <td>{item.organisation}</td>
          <td>{item.desc}</td>
          <td>{item.type}</td>
          <td>{item.status}</td>
          <td>{item.amount}</td>
          <td>{item.duedate}</td>
        </tr>
        )

      })
      
    }
    </tbody>
    </table>
    
    </div>
        
);
}
export default Home