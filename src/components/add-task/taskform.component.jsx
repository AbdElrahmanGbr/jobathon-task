import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
const TaskForm = ({ onTaskCreate }) => {
    const [newTask, setNewTask] = useState({
        title: "",
        status: "not-started",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTask({
            ...newTask,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onTaskCreate(newTask);
        setNewTask({
            title: "",
            status: "not-started",
            description: "",
        });
    };

    return (
        <Form onSubmit={handleSubmit} className={"mx-auto"}>
            <Row className={"my-3"}>
                <Col md={6}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Title:</InputGroup.Text>
                        <Form.Control
                            onChange={handleChange}
                            name={"title"}
                            placeholder="Task title..."
                            aria-label="title"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </Col>
                <Col md={6}>
                    <Form.Select aria-label="Status" name="status" onChange={handleChange}>
                        <option disabled>Task Status</option>
                        <option value="not-started">Not Started</option>
                        <option value="in-progress">In Progress</option>
                        <option value="finished">Finished</option>
                    </Form.Select>
                </Col>
            </Row>
            <Row className={"my-3"}>
                <InputGroup>
                    <InputGroup.Text>Description:</InputGroup.Text>
                    <Form.Control as="textarea" aria-label="With textarea"
                                  name="description"
                                  placeholder={"Task Description.."}
                                  onChange={handleChange}
                                  style={{ height: '100px' }}
                    />
                </InputGroup>
            </Row>
            <Button type="submit">Create Task</Button>
        </Form>
    );
};

export default TaskForm;
