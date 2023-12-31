import Task from "../task/task";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useEffect, useState} from "react";
import Stack from "react-bootstrap/Stack";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import {Pagination} from "react-bootstrap";

const TasksList = ({tasks, onDeleteTask, onEditTask}) => {
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('id');
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 4;

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

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <>
            <Row className={"my-4"}>
                <Col lg={6} className={"ms-auto"}>
                    <Stack direction={"horizontal"} className={"justify-content-end"}>
                        <DropdownButton variant={"warning"} id="dropdown-basic-button" title="Sort By">
                            <Dropdown.Item onClick={() => sortTasks('id')}>ID</Dropdown.Item>
                            <Dropdown.Item onClick={() => sortTasks('title')}>Title</Dropdown.Item>
                        </DropdownButton>
                        <Form.Select className={"ms-3"} aria-label="Status" name="status"
                                     onChange={(e) => filterTasks(e.target.value)}>
                            <option value="all">Show All Tasks</option>
                            <option value="not-started">Not Started</option>
                            <option value="in-progress">In Progress</option>
                            <option value="finished">Finished</option>
                        </Form.Select>
                    </Stack>
                </Col>
            </Row>
            <Row>
                {currentTasks.map((task) => (
                    <Col key={task.id} lg={6}>
                        <Task task={task} onDelete={onDeleteTask} onEdit={onEditTask}/>
                    </Col>
                ))}
            </Row>
            <Pagination className={"mt-3"}>
                <Pagination.First onClick={() => paginate(1)}/>
                {Array(Math.ceil(filteredTasks.length / tasksPerPage))
                    .fill()
                    .map((_, index) => (
                        <Pagination.Item key={index} onClick={() => paginate(index + 1)}>
                            {index + 1}
                        </Pagination.Item>
                    ))}
                <Pagination.Last onClick={() => paginate(Math.ceil(filteredTasks.length / tasksPerPage))}/>
            </Pagination>
        </>
    );
};

export default TasksList;
