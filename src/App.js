import logo from "./logo.svg";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import { red } from "@mui/material/colors";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import UpButtons from "./UpButtons";
import Mission from "./Mission";
import  {createContext, useEffect, useState}  from "react";
import AddMission from "./AddMission";
import EditMission from "./EditMission";
import Container from '@mui/material/Container';
import { v4 as uuidv4 } from 'uuid';
import { useReducer } from "react";
import MissionsReducer from "./Reduces/MissionsReducer";
import { type } from "@testing-library/user-event/dist/type";


export const MissionsContext=createContext([])

function App() {
  let [missionsResult,dispatch]=useReducer(MissionsReducer,[])

const [alignment, setAlignment] = useState('all');



const theme = createTheme({
  palette: {
    primary: {
      main: "#00897b",
    },
    error: {
      main: "#e53935",
    },
    edit:{
      main:"rgb(27, 60, 183)"
    }
  },
  typography: {
    fontFamily: ['myNewFont']
}});  
// let [missions,setMissions]=useState([])


useEffect(()=>{
//let newMissions = JSON.parse(localStorage.getItem("missionsTodoList")) || []
dispatch({
  type:"getFromLocalStorage",
})
},[])



   
let [missionEdited,setMissionEdited]=useState({
  id:"",
  title:"",
  body:"",
})
    let [inputAdd,setInputAdd]=useState("")
    let [showEditBox,setShowEditBox]=useState(false)
 
  return (
  
    <MissionsContext.Provider value={{missionsResult,dispatch}}>
     
 <ThemeProvider theme={theme}>
      <Container maxWidth="sm" >
      <div
        className="App"
        style={{
         display: "flex",
       minHeight:"100vh",
          justifyContent: "center",
          alignItems: "center"
        
         
        }}
      >
        
        <div
          id="MainBox"
          style={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            borderRadius: "15px",
          width:"100%",
           maxHeight: "90vh",     // give MainBox a real limit
        overflowY:"hidden"
          
         

            
          }}
        >

          <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
            My Missions
          </h1>
          <hr style={{ marginBottom: "16px" }} />
          
<div id="UPBUTTONS" style={{textAlign:"center",marginBottom:"30px"}}>
<UpButtons alignment={alignment} setAlignment={setAlignment}/>
   </div>      
         
         
         
       <div id="Missions" style={{display:"flex",flexDirection:"column",gap:"15px",paddingRight:"12px",maxHeight:"300px",overflowY:"auto", overflowX: "hidden",  }}>
       <Mission  showEditBox={showEditBox} setShowEditBox={setShowEditBox} missionEdited={missionEdited} setMissionEdited={setMissionEdited} alignment={alignment} setAlignment={setAlignment}/>
      

       

       

      

       </div>


       {/*add mission */}

       <div style={{marginTop:"20px",}}>
        <AddMission inputAdd={inputAdd} setInputAdd={setInputAdd} />
       </div>
       
       {/*edit mission */}



        </div>
    <div>
 <EditMission open={showEditBox} setOpen={setShowEditBox} missionEdited={missionEdited} setMissionEdited={setMissionEdited}/>
      </div></div>
    </Container>
    </ThemeProvider>
    </MissionsContext.Provider>
   
   
  );
}

export default App;
