import React from "react";
import apiconfig from "../../../configs/api.config.json"


class listDashboard extends React.Component {
    constructor(props) {
        let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
        this.state = {
            userdata : {
                username : userdata.username,
                m_role_id : userdata.m_role_id,
                employee_id : userdata.m_employee_id
            },
            alertData : {
                status : 0,
                message : "",
                code : ""
            }
        }
    }

    render() {
        return (
            <div>
                <h1>Welcome To Web</h1>
                <h6>ID Role{this.state.userdata.m_role_id}</h6>
             </div>
        );
    }
}



export default listDashboard;
