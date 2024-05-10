import {Link} from "react-router-dom";

export const IndexFeatures = () => {
    return (
        <div className="page-container">
            <div className="content-wrap">
                <section className="hero py-5">
                    <div className="container text-center">
                        <h1 className="hero-title py-2">Welcome to 1on1 Scheduler</h1>
                        <p className="hero-subtitle py-2">Schedule your 1:1 meetings effortlessly with 1on1 Scheduler. Connect, collaborate, and make the most out of your time.</p>
                        <Link to="/signup" className="btn-hero btn-lg">Get Started</Link>
                    </div>
                </section>

                <section className="features">
                    <div className="container py-5">
                        <div className="row feature-items">
                            <div className="col-md-4 feature py-2">
                                <h2>Easy Scheduling</h2>
                                <p>Schedule your meetings with just a few clicks. Set your availability, invite contacts, and let 1on1 Scheduler handle the rest.</p>
                            </div>
                            <div className="col-md-4 feature py-2">
                                <h2>Privacy First</h2>
                                <p>Your data is secure with us. We prioritize your privacy and ensure that your personal information is protected.</p>
                            </div>
                            <div className="col-md-4 feature py-2">
                                <h2>Collaborate Efficiently</h2>
                                <p>Enhance collaboration by finding the perfect meeting times for you and your contacts. Increase productivity and reduce scheduling hassles.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
          
        </div>
    );
};