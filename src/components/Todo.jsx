import { useState, useEffect } from 'react';
import EditTask from './EditTask';
import {useDrag} from 'react-dnd'

const Todo = ({ comp,task, tasklist, settasklist, ind }) => {
  const [Time, setTime] = useState(task.duration);
  const [running, setRunning] = useState(false);

  const [{isDragging} , drag] = useDrag( () =>({
    type :"todo",
    item:{
      id:ind,
      projectName : task.projectName,
      taskdescription : task.taskdescription,
      timeStamps:task.timeStamps,
      duration : task.duration,
      tasklist : tasklist
    },
    collect : (monitor) =>({
        isDragging : !!monitor.isDragging()
    })
  }))

//   const handleDelete = () => {

//     if(comp){
//       const updatedTaskList = tasklist.filter((_, index) => index !== ind);
//       settasklist(updatedTaskList);
//       localStorage.setItem("completelist" , JSON.stringify(updatedTaskList))
//     }
// else{
//     const updatedTaskList = tasklist.filter((_, index) => index !== ind);
//     settasklist(updatedTaskList);
//     localStorage.setItem("tasklist" , JSON.stringify(updatedTaskList))
//   };
// }

const handleDelete = () => {
  const updatedTaskList = tasklist.filter((t) => t.timeStamps !== task.timeStamps);
  settasklist(updatedTaskList);
  localStorage.setItem(comp ? 'completelist' : 'tasklist', JSON.stringify(updatedTaskList));
};


  const handleStop = ()=>{
    setRunning(false)

    let tasksindex = tasklist.indexOf(task)
    tasklist.splice( tasksindex ,1 , {
        taskdescription : task.taskdescription,
        projectName : task.projectName,
        timeStamps : task.timeStamps,
        duration :Time
    })
    if(comp){localStorage.setItem("completelist" , JSON.stringify(tasklist))}
    else{localStorage.setItem("tasklist" , JSON.stringify(tasklist))}
  }

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <>
      <div className="flex flex-col items-enter justify-start bg-slate-800 my-4 ml-6 py-6 mb-4 px-6 w-3/4 max-w-lg text-white"
        ref = {drag}
      >
        <div className="flex flex-row justify-between">
          <p className="font-semibold text-3xl text-center mb-4">{task.projectName}</p>
          <EditTask task={task} tasklist={tasklist} settasklist={settasklist} ind={ind} comp={comp} />
        </div>
        <p className="text-lg py-2 mb-6">{task.taskdescription}</p>
        <div>
          <div className="w-full flex sm:flex-row flex-col items-center justify-evenly">
            <div>
              <span>{("0" + Math.floor((Time / 3600000) % 24)).slice(-2)}:</span>
              <span>{("0" + Math.floor((Time / 60000) % 60)).slice(-2)}:</span>
              <span>{("0" + Math.floor((Time / 1000) % 60)).slice(-2)}:</span>
              <span className="text-sm">{("0" + ((Time / 10) % 100)).slice(-2)}</span>
            </div>
            <div className="w-1/3 max-w-sm flex flex-row gap-2 justify-evenly sm:justify-evenly">
              {running ? (
                <button className="border bg-red-500 rounded-lg p-1" onClick={handleStop}>
                  Stop
                </button>
              ) : (
                <button className="border bg-red-500 rounded-lg p-1  " onClick={() => setRunning(true)}>
                  Start
                </button>
              )}
              <button className="border bg-red-500 rounded-lg p-1 " onClick={() => setTime(0)}>
                Reset
              </button>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button
            className="bg-red-500 mt-6 mb-1 text-white text-sm uppercase font-semibold px-3 rounded-lg"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default Todo;
