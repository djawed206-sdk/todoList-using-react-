import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from 'uuid';
import { useContext,useState } from "react";
import { MissionsContext, setMissionsContext } from "./App";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export default function AddMission({inputAdd,setInputAdd}) {

  let [open3,setOpen3]=useState(false)

    let missionsResult=useContext(MissionsContext).missionsResult
    let dispatch=useContext(MissionsContext).dispatch

    function handleAddMission(){

dispatch({
  type:"addMission",
  inputAdd:inputAdd,
})
////////setMissions(missionsWithNewAdd)
setInputAdd("")
setOpen3(true)
    }

    function handleCloseee(){
      setOpen3(false)
    }


  return (
    <div style={{ display: "flex", width: "100%", gap: "5px" }}>
      <TextField
        style={{ width: "70%" }}
        id="outlined-basic"
        label="the title of the mission"
        variant="outlined"
        value={inputAdd}
        onChange={event=>{
            setInputAdd(event.target.value)
        }}
      />
      <Button
       style={{ width: "30%" }}
       variant="contained"
       onClick={handleAddMission}
      
       sx={inputAdd=="" ? {backgroundColor:"lightgrey !important"}:{backgroundColor:"primary.main"}}
        disabled={inputAdd==""}
       >
        Add Mission
      </Button>
        <Snackbar open={open3} autoHideDuration={6000} onClose={handleCloseee}>
        <Alert
          onClose={handleCloseee}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          added succusfully
        </Alert>
      </Snackbar>
    </div>
  );
}
