import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {Route, Routes} from "react-router-dom";
import AllTasksList from "./pages/taskslist/tasks-list.page";
import Login from "./pages/login/login";
function App() {
    return (
            <Container>
                <ToastContainer />
                <div className={"text-center my-5 fs-1"}>Task List</div>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/tasks" element={<AllTasksList />} />
                </Routes>
            </Container>
    );
}

export default App;