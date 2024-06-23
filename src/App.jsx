import { useState ,useEffect } from 'react'
import Addtask from "./components/AddTasks"
import Todo from './components/Todo';
import {useDrop} from 'react-dnd'



function App() {
  const [tasklist , settasklist] = useState([]);
  const [complete , setcompleted] = useState([]);

  useEffect(() => {
    let array = localStorage.getItem("tasklist")
    let array2 = localStorage.getItem("completelist")


    if (array){
      settasklist(JSON.parse(array))
    }
    if(array2){
      setcompleted(JSON.parse(array2))
    }
  } ,[])

const [ {isOver} , drop] = useDrop(() =>({
  accept :"todo",
  drop :(item)=>addTocompleted(item.id, item.projectName , item.taskdescription ,
    item.timeStamps , item.duration , tasklist),
  collect : (monitor) =>({
    isOver : !!monitor.isOver()
  })
}))

// const addTocompleted = (id, projectName, taskdescription, timeStamps, duration) => {

 
//   let tasklist = JSON.parse(localStorage.getItem("tasklist"))
//   let complete = JSON.parse(localStorage.getItem("completelist"))
//   let movetask = tasklist.splice(id ,1);

  
//   const updatedCompleteList = [
//     ...complete, movetask[0]
//   ];
//   const updatedtaskList = [...tasklist]

//   setcompleted(updatedCompleteList);
//   localStorage.setItem('completelist', JSON.stringify(updatedCompleteList));

//   settasklist(updatedtaskList);
//   localStorage.setItem('tasklist', JSON.stringify(updatedtaskList));

//   console.log(updatedtaskList)
//   console.log(updatedCompleteList)

// };

const addTocompleted = (id, projectName, taskdescription, timeStamps, duration) => {
  let tasklist = JSON.parse(localStorage.getItem('tasklist')) || [];
  let complete = JSON.parse(localStorage.getItem('completelist')) || [];

  console.log(tasklist, complete )

  const taskIndex = tasklist.findIndex(task => task.timeStamps === timeStamps);
  if (taskIndex > -1) {
    const [movetask] = tasklist.splice(taskIndex, 1);

    const updatedCompleteList = [
      movetask, ...complete,
    ];

    setcompleted(updatedCompleteList);
    localStorage.setItem('completelist', JSON.stringify(updatedCompleteList));

    settasklist(tasklist);
    localStorage.setItem('tasklist', JSON.stringify(tasklist));
  }
};




  return (
    <>
    <h1 className="text-2xl font-bold py-4 pl-6"> The Task Tracker</h1>
    <p className="text-xl px-6">hi there!</p>

    <div className="flex flex-row items-center ">
    <p className="text-xl pl-6">Click</p>
        <Addtask tasklist = {tasklist} settasklist = {settasklist} /> 
     <p className="text-xl ml-2"> to add a new task</p>
    </div>
    
    <div className='flex flex-row '>
      <div className='w-full' >
    <h2 className='ml-6 text-xl w-3/4  px-2 max-w-lg my-4 py-2 bg-gray-300'> To Do:</h2>
    {tasklist.map((ele , ind)=>{
     return  <Todo key={ele.timeStamps} task={ele} tasklist = {tasklist} settasklist = {settasklist} comp = {false} ind ={ind}/>
    })}
    </div>

    <div className='w-full' ref={drop} >
      <div className='w-full'></div>
    <h2 className='ml-6 text-xl w-3/4  px-2 max-w-lg my-4 py-2 bg-gray-300'> Completed:
    </h2>
    {complete.map((ele , ind)=>{
     return  <Todo key={ele.timeStamps} task={ele} tasklist = {complete} settasklist = {setcompleted} comp = {true} ind ={ind}/>
    })}
    </div>
    
    </div>
    


    </>
  )
}

export default App