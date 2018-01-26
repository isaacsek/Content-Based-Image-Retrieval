import React, { Component } from "react";
import { connect } from "react-redux";

class Landing extends Component {


    render() {
        return (
            <div style={{textAlign:'center'}}>
                <div className="mt-2"><h2>CSS 490:</h2></div>
                <div><h2>Multimedia Data Processing</h2></div>
                {/* <h1>
                    CSS 490: Multimedia Data Processing
                </h1> */}
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
