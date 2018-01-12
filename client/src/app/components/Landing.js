import React, { Component } from "react";
import { connect } from "react-redux";

class Landing extends Component {


    render() {
        return (
            <div style={{textAlign:'center'}}>
                <h1>
                    CSS 490: Multimedia Data Processing
                </h1>
                {/* <h5 className="mb-2">Simple Content-Based Image Retrieval System</h5> */}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        // look at combined reducers, we called this piece of state - auth
        auth : state.auth
    };
}

export default connect(mapStateToProps)(Landing);
