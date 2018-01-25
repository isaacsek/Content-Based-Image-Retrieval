import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import ImageSelector from "../Components/ImageSelector";

class IntensityMethod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            selectedImage: null,
            // Selected Image
            // Histogram
        };
    }

    selectImage(img) {
        console.log(img);
        this.setState({selectedImage: img});
    }

    render() {
        return (
            <div style={{marginTop:'25px'}}>
                <div><h4>Method: Intensity</h4></div>
                <div><ImageSelector selectImage={(img) => this.selectImage(img)} /></div>
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
