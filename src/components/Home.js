import React,{Component, useEffect} from 'react';
import {useState} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import ReactDOM from 'react-dom';
import axios from 'axios';
import { SimpleDropdown } from 'react-js-dropdavn';
import MuiAlert from "@material-ui/lab/Alert";
// import Pop_Register from './Pop_Register';
function Alert(props) {
  return <MuiAlert elevation={6}
      variant="filled" {...props} />;
}
function Pop_up_register(props){
  const[member1,setMember1]=useState("");
  const[member2,setMember2]=useState("");
  const[member3,setMember3]=useState("");
  const[member4,setMember4]=useState("");
  const[member5,setMember5]=useState("");
  const[teamname,setTeamname]=useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const[fail,setFail]=useState(false);
  const submit_enroll=async()=>{
    await axios.post("http://localhost:5000/studentpreneur/enroll",{mem1:member1,mem2:member2,mem3:member3,mem4:member4,mem5:member5,tname:teamname,pid:props.f_pid}).then(res=>{
      if(res.data!=="Success"){
      setFail(true);  
    }
    if(res.data==="Success"){
      setButtonDisabled(true);
      setFail(false);
      }
      }).catch((error)=>{ });
       
  }
  console.log("Pop_UP_Register")
  console.log(props.f_pid);
  console.log(props.f_organisation);
  console.log(props.f_duedate);

  return(

      <Dialog onClose={props.close} open={props.open}>
            <DialogTitle> Register For The Project</DialogTitle>
           
            {/* <h3 style = {{ marginTop: "-10px", padding: "5px 10px" }}>
                  Are you sure to delete the item? {" "}
            </h3> */}
            <h1>Project Id: {props.f_pid}</h1>
            <h1>Organisation: {props.f_organisation}</h1>
            <h1>Description: {props.f_organisation}</h1>
            <h1>Type: {props.f_type}</h1>
            <h1>Status:{props.f_status}</h1>
            <h1>Amount:{props.f_amount}</h1>
            <h1>Due Date:{props.f_duedate}</h1>
            <h1>Submission:-</h1>
            <h2>Module 1 - DeadLine:{props.f_mod1}</h2>
            <h2>Module 2 - DeadLine:{props.f_mod2}</h2>
            <h2>Module 3 - DeadLine:{props.f_mod3}</h2>
            <label>
             <h1>Team Name:</h1>
             <input type="text" onChange={(e)=>setTeamname(e.target.value)} id="team_name"/>
            </label>
             <h1>Team Members:</h1>
             <label>
              <h1>Team Member-1 Leader ID:</h1>
             <input type="text" onChange={(e)=>setMember1(e.target.value)} id="team_member_1"/>
             </label>
             <label>
              <h1>Team Member-2 Id:</h1>
             <input type="text" onChange={(e)=>setMember2(e.target.value)}  id="team_member_2"/>
             </label>
             <label>
              <h1>Team Member-3 Id:</h1>
             <input type="text" onChange={(e)=>setMember3(e.target.value)} id="team_member_3"/>
             </label>
             <label>
              <h1>Team Member-4 Id:</h1>
             <input type="text" onChange={(e)=>setMember4(e.target.value)} id="team_member_4"/>
             </label>
             <label>
              <h1>Team Member-5 Id:</h1>
             <input type="text" onChange={(e)=>setMember5(e.target.value)} id="team_member_5"/>
             </label>
            <br></br>
            <div >
               <button onClick={props.close}>
                  Cancel
               </button>
               <button  disabled={isButtonDisabled} onClick={submit_enroll}>
                  Register
               </button>
               {
               fail && <Alert severity="error">Enter Valid Details</Alert>
           }
            </div>
      </Dialog>
    );
}
const Home=()=>{
    const [openDialog, handleDisplay] = useState(false);
    const [projectData, setProjectData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [ps, setProjectstatus] = useState("all");
    const [pt, setProjecttype] = useState("all");
    const [amt, setAmount] = useState("all");
    const [isModalOpen, setModalOpen] = useState(false);
    const [isShown,setShown]=useState(false);
    const [pid, setPid]=useState("");
    const [organisation,setOrg]=useState("");
    const [description,setDescription]=useState("");
    const [type, setType]=useState("");
    const [status, setStatus]=useState("");
    const [amount, setAmout]=useState(0);
    const [due,setDuedate]=useState("");
    const [mod1,setModule1]=useState("");
    const [mod2,setModule2]=useState("");
    const [mod3,setModule3]=useState("");

    var min=0;
    var max=0;
    // let pid,organisation,description,type,status,amount,duedate;
    const getFilteredProjectDetails=async()=>{
      await axios.post("http://localhost:5000/studentpreneur/get_filter",{status:ps,type:pt,m:min,ma:max,amo:amt}).then(res=>{
        console.log(res.data);
        setProjectData(res.data);
        setProjectstatus("all");
        setAmount("all");
        setProjecttype("all");
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

    const handle_submit=async(e)=>{
      e.preventDefault();
      console.log("_______PRINT______")
      console.log(ps);
      console.log(pt);
      console.log(amt);
      if(amt==="0-1000")
      {
          min=0
          max=1000
      }
     if(amt==="1000-5000")
      {
        min=1000
          max=5000

      }
     if(amt==="5000-100000"){
      min=5000
      max=10000
      }
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
     }
     const handleClose = () => {
      handleDisplay(false);
    };
     const openDialogBox = (event) => {
      setPid(event.currentTarget.getAttribute('pid'));
      setOrg(event.currentTarget.getAttribute('organisation'));
      setDescription(event.currentTarget.getAttribute('description'));
      setType(event.currentTarget.getAttribute('type'));
      setStatus(event.currentTarget.getAttribute('status'));
      setAmout(parseInt(event.currentTarget.getAttribute('amount')));
      setDuedate(event.currentTarget.getAttribute('duedate'));
      setModule1(event.currentTarget.getAttribute('module1'));
      setModule2(event.currentTarget.getAttribute('module2'));
      setModule3(event.currentTarget.getAttribute('module3'));
      // <Pop_up_register/>
      handleDisplay(true);
      // pid=f_pid;  f_pid,f_organisation,f_description,f_type,f_status,f_amount,f_duedate
      // organisation=f_organisation;
      // f_description=description;
      // type=f_type;
      // status=f_status;
      // amount=f_amount;
      // duedate=f_duedate;
      console.log("handleDisplay");
      console.log(openDialog);
      console.log("__________________________________");
      console.log("f_amount");
      console.log(due);
      console.log()
    };
return(
    <div className="home">
    <button onClick={filter_b}>Filter</button>
    {isOpen && (
    <div>
         <select id="ps" onChange={(e)=>setProjectstatus(e.target.value)}>
          <option value="all">All</option>
          <option value="Open">Open</option>
          <option value="partially_completed">Partially completed</option>
         </select>
         <select id="amount" onChange={(e)=>setAmount(e.target.value)}>
         <option value="all">All</option>
          <option value="0-1000">0-1000</option>
          <option value="1000-5000">1000-5000</option>
          <option value="5000-100000">5000-100000</option>
         </select>
         <select id="pt" onChange={(e)=>setProjecttype(e.target.value)}>
          <option value="all">All</option>
          <option value="Web development">Web Development</option>
          <option value="uidesign">UI/UX Design</option>
          <option value="3danimation">3D-Animation</option>
          <option value="videoediting">Video Editing</option>
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
      <th>Register</th>
    </tr>
    { 
      projectData.map((item)=>{
        return(

          <tr>
          <td>{item.pid}</td>
          <td>{item.organisation}</td>
          <td>{item.description}</td>
          <td>{item.type}</td>
          <td>{item.status}</td>
          <td>{item.amount}</td>
          <td>{item.duedate}</td>
          <td><button pid={item.pid} organisation={item.organisation} description={item.description} type={item.type} status={item.status} amount={item.amount} 
          duedate={item.duedate} module1={item.module_1_date} module2={item.module_2_date} module3={item.module_3_date}
          onClick={openDialogBox}>Enroll Now</button></td>   
        </tr>       
    
    )

      })
      
    }
    </tbody>

    </table>
    {
      openDialog && <Pop_up_register close={handleClose} open={openDialog} f_pid={pid} f_organisation={organisation}
                                     f_description={description} f_type={type} f_status={status}
                                     f_amount={amount} f_duedate={due} f_mod1={mod1} f_mod2={mod2} f_mod3={mod3}
        />
    }

        {/* <Dialog onClose = {handleClose} open = {openDialog}>
            <DialogTitle> Confirm Dialog </DialogTitle>
            item.pid,item.organisation,item.description,item.type,item.status,item.amount,item.duedate
            <h3 style = {{ marginTop: "-10px", padding: "5px 10px" }}>
                  Are you sure to delete the item? {" "}
            </h3>
            openDialogBox(item.pid,item.organisation,item.description,item.type,item.status,item.amount,item.duedate)
            <br></br>
            <div >
               <button onClick = {handleClose}>
                  Confirm
               </button>
               <button onClick = {handleClose}>
                  Cancel
               </button>
            </div>
         </Dialog> */}
    </div>
        
);
}
export default Home