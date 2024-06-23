import { useState } from "react";

const Addtask = ( {tasklist , settasklist } ) => {
  const [addModal, setAddModal] = useState(false);
  const [projectName , setProjectName]=useState("")
  const [taskdescription , setTaskDescription] = useState("")
  const [ errmsg , seterrmsg] = useState("")

  
  const handleAdd = (e) => {
    e.preventDefault();
  
    if (!projectName) {
      seterrmsg("Enter the project name to continue");
    } else {
      let timeStamps = new Date().getTime();
  
      let newTask = {
        projectName,
        taskdescription,
        timeStamps,
        duration: 0,
        id: timeStamps, // Ensure each task has a unique ID
      };
  
      // Create a new array with the new task
      let templist = [...tasklist, newTask];
  
      // Update localStorage and state
      localStorage.setItem("tasklist", JSON.stringify(templist));
      settasklist(templist);
      
      // Reset the form and close the modal
      setAddModal(false);
      setProjectName("");
      setTaskDescription("");
    }
  };

  const handleInput = (e)=>{
    const name = e.target.name
    const value = e.target.value

    if(name === "projectName") {setProjectName(value)
        seterrmsg("")
    }
    if(name === "projectName" && value === "")  seterrmsg("Enter the project name to continue")
    if(name === "taskdescription") setTaskDescription(value)
  }

  return (
    <>
      <button
        className="bg-blue-600 text-white uppercase text-sm font-semibold py-1 mx-1.5 pl-2 pr-2.5 rounded hover:opacity-70"
        type="button"
        onClick={() => {
          setAddModal(true);
        }}
      >
        +New
      </button>
      {addModal ? (
        <>
          <div className="flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 items-center justify-center">
      <div className="bg-white w-9/12 max-w-lg border-lg shadow-md relative flex flex-col">
        <div className="flex justify-between p-5 border">
          <h3 className="bg-white text-3xl font-semibold">Add New Task</h3>
          <button
            className="px-1 text-gray-400 float-right text-3xl leading-none font-semibold block"
            onClick={() => setAddModal(false)}
          >
            X
          </button>
        </div>
        <form className="py-6">
          <div>
            <label className="track-wide uppercase text-gray-700 text-xs font-semibold mb-2 block">
              Project Name
            </label>
            <input
              id="project-name"
              type="text"
              placeholder="Project Name"
              className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white"
              name="projectName"
              value={projectName}
              onChange={handleInput}
            />
            <p className="text-red-500 text-center mt-2 mb-5">
                {errmsg}
            </p>
          </div>
          <div>
            <label className="track-wide uppercase text-gray-700 text-xs font-semibold mb-2 block">
              Task Description
            </label>
            <textarea
              id="task-description"
              rows="5"
              placeholder="Task Description"
              className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white"
              name = "taskdescription"
              value={taskdescription}
              onChange={handleInput}

            ></textarea>
          </div>
          <div className="flex justify-end p-6 border-t border-slate-200 rounded-b">
            <button className="bg-blue-500 text-white font-semibold uppercase py-3 px-6 rounded hover:opacity-70"
            onClick={handleAdd}
            
            >
              Add New Task
            </button>
          </div>
        </form>
      </div>
    </div>

        </>
      ) : null}
    </>
  );
};

export default Addtask;
