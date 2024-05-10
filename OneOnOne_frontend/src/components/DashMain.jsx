import {DashSummary} from "./DashSummary";
import {DashUpcoming} from "./DashUpcoming"

export const DashMain = () => {
    return <>
        <div className="container">
            <div className="row">
                <DashSummary />
                <DashUpcoming />
            </div>
        </div>
    </>
};