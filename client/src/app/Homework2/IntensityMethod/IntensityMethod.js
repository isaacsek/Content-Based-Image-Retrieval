import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import ImageSelector from "../ImageSelector";

class IntensityMethod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
        };
    }

    render() {
        return (
            <div>
                <div>Intesity Method</div>
                <div><ImageSelector/></div>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        auth : state.auth
    };
}

export default connect(mapStateToProps, actions)(IntensityMethod);
