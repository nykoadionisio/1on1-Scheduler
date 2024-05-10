export const DashSummary = () => {
    return (
        <div className="dashboard-summary">
            <h2 className="dashboard-title">Welcome to Your Dashboard</h2>
            <p className="dashboard-intro">Here, you can manage your upcoming meetings, view notifications, and more.</p>

            <div className="dashboard-card">
                <div className="card-body">
                    <h3 className="card-title">Meeting Conflicts</h3>
                    <p className="card-text">There are conflicts in your upcoming meetings. Please review and resolve them on the calendar tab.</p>
                </div>
            </div>
            <div className="dashboard-card">
                <div className="card-body">
                    <h3 className="card-title">Unfinalised Meetings</h3>
                    <p className="card-text">There are upcoming unfinalised meetings. Please review and resolve them on the calendar tab.</p>
                </div>
            </div>
        </div>
    );
};
