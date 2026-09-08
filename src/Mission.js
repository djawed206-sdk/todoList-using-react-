//Missions.js
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

import "./Mission.css";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DoneIcon from "@mui/icons-material/Done";
import { useContext } from "react";
import { MissionsContext } from "./App";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import * as React from 'react';
import { useState } from "react";
import { useMemo } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MissionsReducer from "./Reduces/MissionsReducer";
import { type } from "@testing-library/user-event/dist/type";

const Transition =React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Missions({showEditBox,setShowEditBox,missionEdited,setMissionEdited,alignment,setAlignment}) {
  let [open4,setOpen4]=useState(false) //for snackbar alert of delete
  let [open,setOpen]=useState(false)
let [idForDelete,setIdForDelete]=useState("")
 // let Missions=useContext(MissionsContext).missions
  // let SetMissions=useContext(MissionsContext).setMissions
let missionsResult=useContext(MissionsContext).missionsResult
let dispatch=useContext(MissionsContext).dispatch

  function handleCloseeee(){
    setOpen4(false)
  }

let mission3=[...missionsResult]
/*
let missionsDone=mission3.filter(mission=>{
  console.log("missions Done")
  if(mission.isDone){
    return true
  }
  else{
    return false
  }
}):
*/
 let missionsDone=useMemo(()=>{
return(
  mission3.filter(mission=>{
  console.log("missions Done")
  if(mission.isDone){
    return true
  }
  else{
    return false
  }
}))
 },[missionsResult])


/*
 let missionsNotDone=mission3.filter(mission=>{
  console.log("missions not done")
  if(mission.isDone==false){
    return true
  }
  else{
    return false
  }
})
  */

let missionsNotDone=useMemo(()=>{
return(
  mission3.filter(mission=>{
  console.log("missions Not Done")
  if(mission.isDone==false){
    return true
  }
  else{
    return false
  }
}))
 },[missionsResult])





  function handleDoneChange(Id){



dispatch({
  type:"doneOrNotDone",
  idOfMission:Id,

}
)
 
// SetMissions(MissionsWithNewDoneOrNotDone)
// localStorage.setItem("missionsTodoList",JSON.stringify(MissionsWithNewDoneOrNotDone))


  }

 
 function handleAfficheDeleteMissionBox(Id){
 setOpen(true)
 setIdForDelete(Id)
 }  

 function handleDeleteMission(){

dispatch({
  type:"deleteMission",
  idOfDelete:idForDelete,
  setOpenDeleteBox:setOpen,
  setIdForDelete:setIdForDelete,
  setOpenSnackbarOfDelete:setOpen4,
})

 setOpen(false)
setIdForDelete("")
setOpen4(true)
 }

  function handleShowEditBox(Id){
    setShowEditBox(true)
//find the mission edited
let missions2=[...missionsResult]
let missionSelected=missions2.find(mission=>{
    if(mission.id == Id){
        return true
    }
    else
        return false
})
//console.log("hdi mission selected inside Mission.js",missionSelected)

setMissionEdited(missionSelected)
  }
let missions10
if(alignment=="all"){
   missions10=missionsResult
}
else if(alignment=="done"){
missions10=missionsDone
}
else{
missions10=missionsNotDone
}

  
  let newMissions = missions10.map((mission) => {
    return (
      <Card key={mission.id}
        className="card"
        sx={{
          width: "100%",
          display: "flex",
          paddingRight: "12px",
          justifyContent:"space-between",
          backgroundColor: "#e0f2f1",
          transition: "300ms",
          minHeight:"80px"
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {mission.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {mission.body}
          </Typography>
        </CardContent>

        <div
          id="buttonsInMission"
          style={{ display: "flex", gap: "7px", alignItems: "center"  }}
        >
          <Fab
          className="done"
            onClick={()=>{handleDoneChange(mission.id)}}
            size="small"
            color=""
            aria-label="add"
            sx={mission.isDone==false ?{ color: "primary.main", border: "solid 1px #00897b" }:{color:"white",backgroundColor:"primary.main"}}
          >
            <DoneIcon variant="outlined" />
          </Fab>
          <Fab
          onClick={()=>{
            handleShowEditBox(mission.id)
          }}
            size="small"
            color="edit"
            aria-label="edit"
            sx={{
              color: "rgb(27, 60, 183)",
              border: "1px solid rgb(27, 60, 183)",
            }}
          >
            <EditIcon />
          </Fab>
          <Fab
            size="small"
            aria-label="delete"
            sx={{ color: "error.main", border: "solid 1px red" }}
            onClick={()=>{
              handleAfficheDeleteMissionBox(mission.id)
            }}
          >
            <DeleteOutlinedIcon />
          </Fab>
           
        </div>
      </Card>
    );
  }

 
);





  return(
   <>
   {newMissions}
   <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
       onClose={()=>{
        setOpen(false)
       }}
        aria-describedby="alert-dialog-slide-description"
        role="alertdialog"
      >
        <DialogTitle>{"delete a mission?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           are you sure you want to delete this mission
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{
            handleDeleteMission()
          }} >
            delete
          </Button>
          <Button onClick={()=>{
            setOpen(false)
          }} >cancel</Button>
        </DialogActions>
      </Dialog>
       <Snackbar open={open4} autoHideDuration={6000} onClose={handleCloseeee}>
              <Alert
                onClose={handleCloseeee}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
              >
                deletted succusfully
              </Alert>
            </Snackbar>
   </>
    
  )
}
