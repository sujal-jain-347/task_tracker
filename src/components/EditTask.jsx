import { useState } from 'react';

const EditTask = ({ task, tasklist, settasklist, ind ,comp }) => {
  const [editmodal, setEditModal] = useState(false);
  const [projectName, setProjectName] = useState(task.projectName);
  const [taskdescription, setTaskDescription] = useState(task.taskdescription);

  const handleEdit = (e) => {
    e.preventDefault();

    const updatedTask = { ...task, projectName, taskdescription };
    const updatedTaskList = [...tasklist];
    updatedTaskList[ind] = updatedTask;
    settasklist(updatedTaskList);

    if (comp){localStorage.setItem("completelist" , JSON.stringify(updatedTaskList))}
else{localStorage.setItem("tasklist" , JSON.stringify(updatedTaskList))}
    setEditModal(false);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === 'projectName') setProjectName(value);
    if (name === 'taskdescription') setTaskDescription(value);
  };

  return (
    <>
      <button
        className="bg-gray-400 text-white text-sm uppercase font-semibold py-1.5 px-3 rounded"
        onClick={() => setEditModal(true)}
      >
        EDIT
      </button>

      {editmodal ? (
        <>
          <div className="flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 items-center justify-center">
            <div className="bg-white w-9/12 max-w-lg border-lg shadow-md relative flex flex-col">
              <div className="flex justify-between p-5 border">
                <h3 className="bg-white text-3xl font-semibold text-black">Edit Task</h3>
                <button
                  className="px-1 text-gray-400 float-right text-3xl leading-none font-semibold block"
                  onClick={() => setEditModal(false)}
                >
                  X
                </button>
              </div>
              <form className="py-6" onSubmit={handleEdit}>
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
                    name="taskdescription"
                    value={taskdescription}
                    onChange={handleInput}
                  ></textarea>
                </div>
                <div className="flex justify-end p-6 border-t border-slate-200 rounded-b">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white font-semibold uppercase py-3 px-6 rounded hover:opacity-70"
                  >
                    Edit Task
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

export default EditTask;
