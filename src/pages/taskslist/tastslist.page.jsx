import Task from "../../components/task";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useState} from "react";

const TasksList = ({tasks}) => {
    const [filteredTasks, setFilteredTasks] = useState(tasks);
    const [statusFilter, setStatusFilter] = useState('all');
    const filterTasks = (status) => {
        if (status === 'all') {
            setFilteredTasks(tasks);
        } else {
            const filtered = tasks.filter((task) => task.status === status);
            setFilteredTasks(filtered)
        }
        setStatusFilter(status)
    }
    return (
        <Row>
            <select onChange={(e) => filterTasks(e.target.value)}>
                <option value="all">Show All Tasks</option>
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="finished">Finished</option>
            </select>
            {filteredTasks.map((task) => (
                <Col key={task.id} lg={6}>
                    <Task task={task}/>
                </Col>
            ))}
        </Row>
    );
};

export default TasksList;
