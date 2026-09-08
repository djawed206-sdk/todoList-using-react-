import { useReducer } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function MissionsReducer(missionsResult, action) {
 let {type}=action
  if (type == "getFromLocalStorage") {

    let newMissions =
      JSON.parse(localStorage.getItem("missionsTodoList")) || [];
    return newMissions
  } 
  
  
  
  else if (type == "doneOrNotDone") {

    let {idOfMission}=action  
        let missionsWithNewDoneOrNotDone=missionsResult.map(mission=>{
            if(mission.id==idOfMission){
              let newMission={...mission}
              let done=newMission.isDone
              newMission.isDone=!done
              return newMission

            }
            else{
                return mission
            }
        })
   
   // setMissions(missionsWithNewDoneOrNotDone);
    localStorage.setItem("missionsTodoList",JSON.stringify(missionsWithNewDoneOrNotDone),);
    return missionsWithNewDoneOrNotDone
  }


  else if(type=="deleteMission"){
    let {idOfDelete}=action
   

    let missions2=[...missionsResult]
    let newMissionsWithNewDelete=missions2.filter(mission=>{
      if(mission.id==idOfDelete){
        return false
      }
      else{
        return true
      }  
      
    })
    
   
    
localStorage.setItem("missionsTodoList",JSON.stringify(newMissionsWithNewDelete))
return newMissionsWithNewDelete
  }



  else if(type=="addMission"){

    let missions11=[...missionsResult]
let missionsWithNewAdd=missions11.map(mission=>{
  let newMission={...mission}
  return newMission
})
missionsWithNewAdd.unshift({
    id:uuidv4(),
    title:action.inputAdd,
    body:"",
    isDone:false,
})
localStorage.setItem("missionsTodoList",JSON.stringify(missionsWithNewAdd))
    return missionsWithNewAdd
  }



  else if(type=="editMission"){

  let {title,details,idOfEdit}=action
  console.log(title,details,idOfEdit)
  let missions12=[...missionsResult]
  let newMissionsWithNewEdited=missions12.map(mission=>{
    let newMission={...mission}
    if(newMission.id==idOfEdit){
        newMission.title=title
        newMission.body=details
return newMission
    }
    else{
        return newMission
    }
  })

  localStorage.setItem("missionsTodoList",JSON.stringify(newMissionsWithNewEdited))
  return newMissionsWithNewEdited
  }
}
