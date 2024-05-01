import { Link } from "react-router-dom";

const ErrorPage = () => {

    return (
        <div>
            <h1>You are trying to access somewhere you shouldn't.</h1>
           <h3>Please go back to the login page and authenticate first.</h3> 
           <Link to="/"><button>Go Back</button></Link>
        </div>
    );
}

export default ErrorPage;

