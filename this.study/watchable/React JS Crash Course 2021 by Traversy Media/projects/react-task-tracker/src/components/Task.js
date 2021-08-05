import { FaTimes } from "react-icons/fa";

const Task = ({ task, onDelete, onToggleReminder }) =>
{
  return (
    <div className={`task ${task.reminder ? "reminder" : ""}`} onDoubleClick={onToggleReminder}>
      <h3>
        {task.text}
        <FaTimes
          style={{color: "red", cursor: "pointer"}}
          onClick={() => onDelete(task.id)}
        />
      </h3>
      <p>{task.day}</p>
    </div>
  );
};

export default Task;