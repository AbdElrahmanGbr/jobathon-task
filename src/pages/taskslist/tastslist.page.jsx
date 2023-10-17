import Task from "../../components/task/task";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useEffect, useState} from "react";
import {tasksData} from "../../data/tasks-data-module";

const TasksList = ({tasks, onDeleteTask, onEditTask}) => {
    const [filteredTasks, setFilteredTasks] = useState(tasksData);
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('id');
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 5;

    useEffect(() => {
        setFilteredTasks(tasks);
    }, [tasks]);

    const sortTasks = (field) => {
        const sortedTasks = [...filteredTasks].sort((a, b) => {
            if (field === 'id') {
                return a.id - b.id;
            } else if (field === 'title') {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });
        setSortBy(field);
        setFilteredTasks(sortedTasks);
    };

    const filterTasks = (status) => {
        let filtered;
        if (status === 'all') {
            filtered = tasks;
        } else {
            filtered = tasks.filter((task) => task.status === status);
        }
        setStatusFilter(status);
        setFilteredTasks(filtered);
        setCurrentPage(1);
    };

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <Row>
            <div>
                <button onClick={() => sortTasks('id')}>Sort by ID</button>
                <button onClick={() => sortTasks('title')}>Sort by Title</button>
                <select onChange={(e) => filterTasks(e.target.value)}>
                    <option value="all">Show All</option>
                    <option value="not-started">Not Started</option>
                    <option value="in-progress">In Progress</option>
                    <option value="finished">Finished</option>
                </select>
            </div>
            {currentTasks.map((task) => (
                <Col key={task.id} lg={6}>
                    <Task task={task} onDelete={onDeleteTask} onEdit={onEditTask} />
                </Col>
            ))}
            <div>
                {Array(Math.ceil(filteredTasks.length / tasksPerPage))
                    .fill()
                    .map((_, index) => (
                        <button key={index} onClick={() => paginate(index + 1)}>
                            {index + 1}
                        </button>
                    ))}
            </div>
        </Row>
    );
};

export default TasksList;
