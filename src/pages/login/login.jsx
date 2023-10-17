import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import './login.css'
import Form from "react-bootstrap/Form";
const Login = () => {
    return (
        <Form className={"w-50 mx-auto rounded-1 shadow-sm bg-white p-5"}>
                <h3>Sign In</h3>
                <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                    />
                </div>
                <div className="mb-3">
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck1"
                        />
                        <label className="custom-control-label" htmlFor="customCheck1">
                            Remember me
                        </label>
                    </div>
                </div>
                <div className="d-grid">
                    <Link to={"/tasks"}>
                    <Button type="submit">
                        Submit
                    </Button>
                    </Link>
                </div>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
        </Form>
    );
};

export default Login;
