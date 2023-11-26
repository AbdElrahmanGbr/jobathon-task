import Card from "react-bootstrap/Card";
import "./task.css"
import {BsTrashFill} from "react-icons/bs";
import {BiSolidEditAlt} from "react-icons/bi";
import {useState} from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
const Task = ({task, onDelete, onEdit}) => {

    const [editMode, setEditMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDescription, setEditedDescription] = useState(task.description);
    const [editedStatus, setEditedStatus] = useState(task.status)
    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = () => {
        onEdit(task.id, editedTitle, editedDescription, editedStatus);
        setEditMode(false);
    };

    const handleCancel = () => {
        setEditMode(false);
        setEditedTitle(task.title);
        setEditedDescription(task.description);
        setEditedStatus(task.status);
    };

    const statusToBorderColor = {
        "not-started": "danger",
        "in-progress": "primary",
        "finished": "success",
    };

    const taskStatusColor = statusToBorderColor[task.status] || "primary";

    return (
            <Card className={`taskCard mb-4 text-${taskStatusColor}`} border={taskStatusColor} >
                <Card.Header>Task No# {task.id}</Card.Header>
                <Card.Body>
                    {editMode ? (
                        <>
                            <Row>
                                <Col md={6}>
                                    <InputGroup>
                                        <InputGroup.Text>Title:</InputGroup.Text>
                                        <Form.Control aria-label="Task Title"
                                                      name="description"
                                                      value={editedTitle}
                                                      onChange={(e) => setEditedTitle(e.target.value)}
                                        />
                                    </InputGroup>
                                </Col>
                                <Col md={6}>
                                    <Form.Select aria-label="Status" name="status" onChange={(e) => setEditedStatus(e.target.value)}>
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
                                <Form.Control as="textarea" aria-label="Task Description"
                                              value={editedDescription}
                                              onChange={(e) => setEditedDescription(e.target.value)}
                                />
                            </InputGroup>
                        </Row>
                           <Stack direction={"horizontal"} className={"justify-content-start"}>
                            <Button variant={"success"} className={"me-2"} onClick={handleSave}>Save</Button>
                            <Button variant={"danger"} onClick={handleCancel}>Cancel</Button>
                        </Stack>
                        </>

                    ) : (
                        <>
                            <Card.Title>{task.title}</Card.Title>
                            <Card.Text>
                                {task.description}
                            </Card.Text>
                            <Card.Text>
                                {task.status}
                            </Card.Text>
                            <Card.Footer>
                                <BsTrashFill role={"button"} size={30} className={"text-white bg-danger rounded-1 p-1"} onClick={() => onDelete(task.id)} />
                                {editMode ? null : <BiSolidEditAlt role={"button"} size={30} className={"text-white bg-warning rounded-1 p-1 mx-2"} onClick={handleEdit} />}
                            </Card.Footer>
                        </>
                    )}

                </Card.Body>
            </Card>
    );
};

export default Task;
