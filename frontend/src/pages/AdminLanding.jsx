import { useContext } from "react";
import { Link } from "react-router-dom";

const AdminLanding = () => {

    return (
        <div className="landingBody">
            <div className="landingPage">
                <h1 className="landingHeader">Welcome to the Grade Distribution Viewer</h1>
                    <div>
                        <div className="button_landing">
                            <button><Link to="/students">Students</Link></button>
                        </div>
                        <div className="button_landing">
                            <button><Link to="/instructors">Instructors</Link></button>
                        </div>
                        <div className="button_landing">
                            <button><Link to="/departments">Departments</Link></button>
                        </div>
                        <div className="button_landing">
                            <button><Link to="/courses">Courses</Link></button>
                        </div>
                        <div className="button_landing">
                            <button><Link to="/taughtby">Instructors -- Courses</Link></button>
                        </div>
                        <div className="button_landing">
                            <button><Link to="/belongsto">Departments -- Courses</Link></button>
                        </div>
                        <div className="button_landing">
                            <button><Link to="/majors">Majors</Link></button>
                        </div>
                        <div className="button_landing">
                            <button><Link to="/minors">Minors</Link></button>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default AdminLanding;