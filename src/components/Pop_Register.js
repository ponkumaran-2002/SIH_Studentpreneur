// Modal.js
import React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {useState} from 'react';
// import '../css/Pop_register.css'
const Pop_Register = (props) => {
  // if (!isOpen) return null;
  const [openDialog, handleDisplay] = useState(false);
  const handleClose = () => {
    handleDisplay(false);
 };

  return (
<div>
<Dialog onClose = {handleClose} open = {openDialog}>
            <DialogTitle> Confirm Dialog </DialogTitle>
            <h3 style = {{ marginTop: "-10px", padding: "5px 10px" }}>
                  Are you sure to delete the item? {" "}
            </h3>
            <br></br>
            <div >
               <button onClick = {handleClose}>
                  Confirm
               </button>
               <button onClick = {handleClose}>
                  Cancel
               </button>
            </div>
         </Dialog>
</div>
  );
};

export default Pop_Register;
