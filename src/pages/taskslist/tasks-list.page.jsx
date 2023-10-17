import {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import TaskForm from "../../components/add-task/taskform.component";
import TasksList from "../../components/tasks-list/tastslist.component";
import {toast} from "react-toastify";

const AllTasksList = () => {
    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            const parsedTasks = JSON.parse(storedTasks);
            setTasks(parsedTasks);
        }
    }, []);

    const handleTaskCreate = (newTask) => {
        if (newTask.title.trim() === '' || newTask.description.trim() === '') {
            toast.error('Title and description cannot be empty', {
                position: 'top-center',
            });
        } else {
            const largestId = Math.max(...tasks.map(task => task.id));
            const newTaskWithId = {
                id: largestId + 1,
                ...newTask
            };
            const updatedTasks = [...tasks, newTaskWithId];
            setTasks(updatedTasks);
            toast.success('Task Created Successfully', {
                position: 'top-center',
            });
            setShowForm(false);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        }
    };

    const handleTaskDelete = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        toast.info(`Task No# ${taskId} Deleted Successfully`, {
            position: 'top-center',
        });
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const handleTaskEdit = (taskId, editedTitle, editedDescription) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, title: editedTitle, description: editedDescription } : task
        );
        toast.success(`Task No# ${taskId} Updated Successfully`, {
            position: 'top-center',
        });
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    return (
        <div>
            <Button variant={showForm ? "danger" : "primary"} onClick={() => setShowForm(!showForm)} className={"fs-4 fw-bold"}>
                {showForm ? "Cancel" : "Add Task"}
            </Button>
            {showForm && <TaskForm onTaskCreate={handleTaskCreate} />}
            {!showForm && (<TasksList tasks={tasks} onDeleteTask={handleTaskDelete} onEditTask={handleTaskEdit} />)}
        </div>
    );
};

export default AllTasksList;
