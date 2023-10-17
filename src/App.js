import TasksList from "./pages/taskslist/tastslist.page";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container";
import {useState} from "react";
import TaskForm from "./components/add-task/taskform.component";
import {tasksData} from "./data/tasks-data-module"
function App() {
    const [tasks, setTasks] = useState(tasksData);
    const [showForm, setShowForm] = useState(false);

    const handleTaskCreate = (newTask) => {
        const updatedTasks = [...tasks, { id: tasks.length + 1, ...newTask }];
        setTasks(updatedTasks);
        setShowForm(false);
        console.log(tasks)
    };

    const handleTaskDelete = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
    };

    const handleTaskEdit = (taskId, editedTitle, editedDescription) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, title: editedTitle, description: editedDescription } : task
        );
        setTasks(updatedTasks);
    };

    return (
        <Container>
            <h1 className={"text-center"}>Task List</h1>
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? "Hide Form" : "Create Task"}
            </button>
            {showForm && <TaskForm onTaskCreate={handleTaskCreate} />}
            <TasksList tasks={tasks} onDeleteTask={handleTaskDelete} onEditTask={handleTaskEdit} />
        </Container>
    );
}

export default App;