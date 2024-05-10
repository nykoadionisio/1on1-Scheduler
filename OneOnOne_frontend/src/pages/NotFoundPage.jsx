import {Link} from "react-router-dom";
import {FaExclamationTriangle} from "react-icons/fa"

export const NotFoundPage = () => {
    return (
        <>
            <br />
            <div className="container text-center">
                <FaExclamationTriangle className="display-4 py-2"/>
                <h1 className="display-4 py-2">Page Not Found</h1>
                <h3>This page does not exist</h3>
                <Link to='/'>Return to Home</Link>
            </div>
        </>
    );
};
