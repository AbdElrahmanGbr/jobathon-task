import Card from "react-bootstrap/Card";
import "./task.css"
const Task = ({task}) => {
    const statusToBorderColor = {
        "not-started": "danger",
        "in-progress": "warning",
        "finished": "success",
    };

    // Get the border color based on the task's status
    const taskStatusColor = statusToBorderColor[task.status] || "primary";

    return (
            <Card className={"taskCard"} border={taskStatusColor} style={{ width: '18rem' }}>
                <Card.Header className={`text-${taskStatusColor}`}>Header</Card.Header>
                <Card.Body>
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text>
                        {task.description}
                    </Card.Text>
                    <Card.Text className={`text-${taskStatusColor}`}>
                        {task.status}
                    </Card.Text>
                </Card.Body>
            </Card>
    );
};

export default Task;
