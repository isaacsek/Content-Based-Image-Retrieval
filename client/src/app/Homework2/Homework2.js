import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import IntensityMethod from "./IntensityMethod/IntensityMethod";
import ColorCodedMethod from "./ColorCodedMethod/ColorCodedMethod";
import FeedbackMethod from "./FeedbackMethod/FeedbackMethod";
import axios from "axios";

class Homework2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            selectedImage: null,
            results: null,
            cibr_method:"intensity",
        };
    }

    selectCIBRMethod(method) {
        this.setState({cibr_method: method});
    }

    renderCIBRMethod() {
        if(this.state.cibr_method === "intensity") {
            return <IntensityMethod/>;
        }
        else if(this.state.cibr_method === "colorcoded") {
            return (
                <ColorCodedMethod />
            );
        }
        else if(this.state.cibr_method === "Both") {
            return (
                <FeedbackMethod />
            );
        }
        else {
            return <div>error</div>;
        }
    }

    render() {
        return (
            <div style={{textAlign:'center'}}>
                <h3 className="mt-2 mb-2">Simple Content-Based Image Retrieval System</h3>
                <div className="mt-2 mb-2" style={{marginTop:'25px'}}>
                    <button className="waves-effect waves-light btn green"  style={{width:'250px'}} onClick={() => this.selectCIBRMethod("intensity")}>Intesity</button>
                    <button className="waves-effect waves-light btn blue ml-2" style={{width:'250px'}}  onClick={() => this.selectCIBRMethod("Both")}>Intesity + Color Coded</button>
                    <button className="waves-effect waves-light btn yellow darken-2 ml-2" style={{width:'250px'}}  onClick={() => this.selectCIBRMethod("colorcoded")}>Color Coded</button>
                </div>
                <div>
                    {this.renderCIBRMethod()}
                </div>

                <div className="fixed-action-btn" onClick={() => alert("Select method by clicking top row buttons. Select images to get results.")}>
                    <a className="btn-floating btn-large red">
                      <i className="large material-icons">help_outline</i>
                    </a>
                  </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth : state.auth
    };
}

export default connect(mapStateToProps, actions)(Homework2);
