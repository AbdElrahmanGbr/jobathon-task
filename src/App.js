import tasks from "../src/data/tasks-data.json";
import TasksList from "./pages/taskslist/tastslist.page";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container";
function App() {
  return (
      <Container>
        <h1 className={"text-center"}>Task List</h1>
        <TasksList tasks={tasks.data} />
      </Container>
  );
}

export default App;