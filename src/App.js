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

    return (
        <Container>
            <h1 className={"text-center"}>Task List</h1>
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? "Hide Form" : "Create Task"}
            </button>
            {showForm && <TaskForm onTaskCreate={handleTaskCreate} />}
            <TasksList tasks={tasks} />
        </Container>
    );
}

export default App;