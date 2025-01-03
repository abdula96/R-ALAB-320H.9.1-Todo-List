import { useState, useReducer } from "react";
import { Link } from "react-router-dom"; // Updated import

export default function ModifyList() {
  const initialState = [
    {
      task: "Walk the dog",
      completed: false,
    },
    {
      task: "Go grocery shopping",
      completed: false,
    },
    {
      task: "Complete workouts",
      completed: false,
    },
  ];

  const reducer = (todoList, action) => {
    switch (action.type) {
      case "update": {
        if (!action.payload.oldTask) {
          return todoList.map((task) => {
            if (task.task === action.payload.task) {
              return { ...task, completed: action.payload.completed };
            }
            return task;
          });
        } else {
          return todoList.map((task) => {
            if (task.task === action.payload.oldTask) {
              return { task: action.payload.task, completed: false };
            }
            return task;
          });
        }
      }
      case "add": {
        const newTask = {
          task: action.payload.task,
          completed: action.payload.completed,
        };
        return [newTask, ...todoList];
      }
      case "delete": {
        return todoList.filter((task) => task.task !== action.payload.task);
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  };

  const [todoList, dispatch] = useReducer(reducer, initialState);

  const [modifiedText, setModifiedText] = useState(initialState[0].task || "");
  const [modifiedCompleted, setModifiedCompleted] = useState(false);
  const [taskDescription, setTaskDescription] = useState(
    initialState[0].task || ""
  );
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newText, setNewText] = useState("");
  const [newCompleted, setNewCompleted] = useState(false);

  function handleUpdateCompletion(event) {
    event.preventDefault();
    dispatch({
      type: "update",
      payload: { task: modifiedText, completed: modifiedCompleted },
    });
    setModifiedText(initialState[0].task || "");
    setModifiedCompleted(false);
  }

  function handleUpdateDescription(event) {
    event.preventDefault();
    dispatch({
      type: "update",
      payload: { task: newTaskDescription, oldTask: taskDescription },
    });
    setTaskDescription(initialState[0].task || "");
    setNewTaskDescription("");
  }

  function handleAdd(event) {
    event.preventDefault();
    dispatch({
      type: "add",
      payload: { task: newText, completed: newCompleted },
    });
    setNewText("");
    setNewCompleted(false);
  }

  function handleDelete(incomingTask, incomingCompleted) {
    dispatch({
      type: "delete",
      payload: { task: incomingTask, completed: incomingCompleted },
    });
  }

  return (
    <div>
      <h2>Current Todo List</h2>
      {todoList && todoList.length > 0 ? (
        <ol aria-live="polite">
          {todoList.map((item, index) => {
            if (item.completed === true) {
              return (
                <li key={index}>
                  {item.task}: <span style={{ color: "green" }}>&#9745;</span>{" "}
                  <button
                    onClick={() => handleDelete(item.task, item.completed)}
                  >
                    DELETE
                  </button>
                </li>
              );
            } else {
              return (
                <li key={index}>
                  {item.task}: <span style={{ color: "red" }}>X</span>{" "}
                  <button disabled>DELETE</button>
                </li>
              );
            }
          })}
        </ol>
      ) : (
        <p>There don't seem to be any tasks here... Let's change that!</p>
      )}
      <Link to="/">Click here to go back home</Link>
      <br />
      <hr />
      <h2>Modify Todo List</h2>
      {todoList && todoList.length > 0 && (
        <>
          <form onSubmit={handleUpdateCompletion}>
            <h3>Change Task Completion</h3>
            <label htmlFor="oldTask">Select task to modify</label>{" "}
            <select
              name="oldTask"
              id="oldTask"
              value={modifiedText}
              onChange={(event) => setModifiedText(event.target.value)}
            >
              {todoList.map((item, index) => (
                <option key={index} value={item.task}>
                  {item.task}
                </option>
              ))}
            </select>
            <br />
            <label htmlFor="oldCompleted">Completed?</label>{" "}
            <input
              type="checkbox"
              name="oldCompleted"
              checked={modifiedCompleted}
              onChange={(event) => setModifiedCompleted(event.target.checked)}
            />
            <br />
            <button
              type="submit"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              Change task
            </button>
          </form>
          <br />
          <form onSubmit={handleUpdateDescription}>
            <h3>Change Task Description</h3>
            <label htmlFor="oldTaskRevision">Select task to modify</label>{" "}
            <select
              name="oldTaskRevision"
              id="oldTaskRevision"
              value={taskDescription}
              onChange={(event) => setTaskDescription(event.target.value)}
            >
              {todoList.map((item, index) => (
                <option key={index} value={item.task}>
                  {item.task}
                </option>
              ))}
            </select>
            <br />
            <label htmlFor="newTask">New task description</label>{" "}
            <input
              type="text"
              name="newTask"
              value={newTaskDescription}
              onChange={(event) => setNewTaskDescription(event.target.value)}
            />
            <br />
            <button type="submit">Change task description</button>
          </form>
          <br />
        </>
      )}
      <hr />
      <h2>Add New Task</h2>
      <form onSubmit={handleAdd}>
        <label htmlFor="newTask">New task description</label>{" "}
        <input
          type="text"
          name="newTask"
          value={newText}
          onChange={(event) => setNewText(event.target.value)}
        />
        <br />
        <label htmlFor="completed">Completed?</label>{" "}
        <input
          type="checkbox"
          name="completed"
          checked={newCompleted}
          onChange={(event) => setNewCompleted(event.target.checked)}
        />
        <br />
        <button type="submit">Add new task</button>
      </form>
    </div>
  );
}
.