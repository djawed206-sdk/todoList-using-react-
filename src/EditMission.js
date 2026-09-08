//file of App.js
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useContext } from 'react';
import { MissionsContext } from './App';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function EditMission({open,setOpen,missionEdited,setMissionEdited}) {

    let missionsResult=useContext(MissionsContext).missionsResult
    let dispatch=useContext(MissionsContext).dispatch

let [open2,setOpen2]=React.useState(false)

let [inputEdit,setInputEdit]=React.useState({
    id:"",
    title:"",
    body:"",
})

React.useEffect(()=>{
  setInputEdit({ title: missionEdited.title, body: missionEdited.body });
},[missionEdited])

   
//console.log("hdi hna dakhel EditMission.js",missionEdited)






 

  const handleClose = () => {
    setOpen(false);
  };

   const handleClosee = () => {
    setOpen2(false);
  };


  const handleSubmit = (event) => {


    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const title = formJson.title;
    const details = formJson.details;

    dispatch({
      type:"editMission",
      title:title,
      details:details,
       idOfEdit:missionEdited.id,
    })
//////////setMissions(newMissions2)

    handleClose();
   setOpen2(true)
  };


  return (
    <React.Fragment>
     {/*  <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>*/}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Missions:</DialogTitle>
        <DialogContent>
         
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="title"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
              value={inputEdit.title}
              onChange={event=>{
                setInputEdit({...inputEdit,title:event.target.value})
              }}
            />
             <TextField
              autoFocus
              
              margin="dense"
              id="name"
              name="details"
              label="details"
              type="text"
              fullWidth
              variant="standard"
              value={inputEdit.body}
              onChange={event=>{
                setInputEdit({...inputEdit,body:event.target.value})
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button type="submit" form="subscription-form" disabled={inputEdit.title==""}>
            edit
          </Button>
                    <Button onClick={handleClose}>Cancel</Button>

        </DialogActions>
      </Dialog>
      <Snackbar open={open2} autoHideDuration={6000} onClose={handleClosee}>
  <Alert
    onClose={handleClosee}
    severity="success"
    variant="filled"
    sx={{ width: '100%' }}
  >
    edited succusfully
  </Alert>
</Snackbar>
    </React.Fragment>
  );
}
