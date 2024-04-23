import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";

const StudentLanding = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <div className="landingBody">
            <div className="landingPage">
                <h1 className="landingHeader">Welcome to the Grade Distribution Viewer</h1>
                    <div>
                        <div className="button_landing">
                            <button><Link to="/coursesearch">Course Search</Link></button>
                        </div>
                        <div className="button_landing">
                            <button><Link to="/instructorsearch">Instructors</Link></button>
                        </div>
                        <div className="button_landing">
                            <button><Link to="/majorsearch">Majors</Link></button>
                        </div>
                        <div className="button_landing">
                            <button><Link to="/minorsearch">Minors</Link></button>
                        </div>
                        <div className="button_landing">
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default StudentLanding;