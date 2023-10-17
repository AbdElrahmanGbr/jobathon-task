import { useState } from "react";

const TaskForm = ({ onTaskCreate }) => {
    const [newTask, setNewTask] = useState({
        title: "",
        status: "not-started",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTask({
            ...newTask,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onTaskCreate(newTask);
        setNewTask({
            title: "",
            status: "not-started",
            description: "",
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={newTask.title}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Status:</label>
                <select name="status" value={newTask.status} onChange={handleChange}>
                    <option value="not-started">Not Started</option>
                    <option value="in-progress">In Progress</option>
                    <option value="finished">Finished</option>
                </select>
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    name="description"
                    value={newTask.description}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Create Task</button>
        </form>
    );
};

export default TaskForm;
