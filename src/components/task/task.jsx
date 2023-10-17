import Card from "react-bootstrap/Card";
import "./task.css"
import {BsTrashFill} from "react-icons/bs";
import {BiSolidEditAlt} from "react-icons/bi";
import {useState} from "react";
import Form from "react-bootstrap/Form";
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
    };

    const statusToBorderColor = {
        "not-started": "danger",
        "in-progress": "warning",
        "finished": "success",
    };

    const taskStatusColor = statusToBorderColor[task.status] || "primary";

    return (
            <Card className={"taskCard mb-4"} border={taskStatusColor}>
                <Card.Header>Task No# {task.id}</Card.Header>
                <Card.Body>
                    {editMode ? (
                            <div>
                                <input
                                    type="text"
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                />
                                <textarea
                                    value={editedDescription}
                                    onChange={(e) => setEditedDescription(e.target.value)}
                                />
                                <Form.Select aria-label="Status" name="status" onChange={(e) => setEditedStatus(e.target.value)}>
                                    <option disabled>Task Status</option>
                                    <option value="not-started">Not Started</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="finished">Finished</option>
                                </Form.Select>
                                <button onClick={handleSave}>Save</button>
                                <button onClick={handleCancel}>Cancel</button>
                            </div>
                    ) : (
                        <>
                            <Card.Title className={`text-${taskStatusColor}`}>{task.title}</Card.Title>
                            <Card.Text>
                                {task.description}
                            </Card.Text>
                            <Card.Text className={`text-${taskStatusColor}`}>
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
