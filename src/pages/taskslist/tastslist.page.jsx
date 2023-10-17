import Task from "../../components/task/task";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useEffect, useState} from "react";
import {tasksData} from "../../data/tasks-data-module";

const TasksList = ({tasks, onDeleteTask, onEditTask}) => {
    const [filteredTasks, setFilteredTasks] = useState(tasksData);
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        setFilteredTasks(tasks);
    }, [tasks]);
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
                    <Task task={task} onDelete={onDeleteTask} onEdit={onEditTask} />
                </Col>
            ))}
        </Row>
    );
};

export default TasksList;
