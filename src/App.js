import TasksList from "./pages/taskslist/tastslist.page";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container";
import {useState} from "react";
import TaskForm from "./components/add-task/taskform.component";
import {tasksData} from "./data/tasks-data-module";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from "react-toastify";
import Button from "react-bootstrap/Button";
function App() {
    const [tasks, setTasks] = useState(tasksData);
    const [showForm, setShowForm] = useState(false);

    const handleTaskCreate = (newTask) => {
        if (newTask.title.trim() === '' || newTask.description.trim() === '') {
            toast.error('Title and description cannot be empty', {
                position: 'top-center',
            });
        } else {
            const updatedTasks = [...tasks, { id: tasks.length + 1, ...newTask }];
            setTasks(updatedTasks);
            toast.success('Task Created Successfully', {
                position: 'top-center',
            });
            setShowForm(false);
        }
    };

    const handleTaskDelete = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        toast.info(`Task No# ${taskId} Deleted Successfully`, {
            position: 'top-center',
        });
        setTasks(updatedTasks);
    };

    const handleTaskEdit = (taskId, editedTitle, editedDescription, editedStatus) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, title: editedTitle, description: editedDescription, status: editedStatus } : task
        );
        toast.success(`Task No# ${taskId} Updated Successfully`, {
            position: 'top-center',
        });
        setTasks(updatedTasks);
    };

    return (
        <Container>
            <ToastContainer />
            <h1 className={"text-center my-5"}>Task List</h1>
            <Button variant={showForm ? "danger" : "primary"} onClick={() => setShowForm(!showForm)} className={"fs-4 fw-bold"}>
                {showForm ? "Cancel" : "Add  Task"}
            </Button>
            {showForm && <TaskForm onTaskCreate={handleTaskCreate} />}
            {!showForm && (<TasksList tasks={tasks} onDeleteTask={handleTaskDelete} onEditTask={handleTaskEdit} />)}
        </Container>
    );
}

export default App;