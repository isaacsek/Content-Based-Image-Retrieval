import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import IntensityMethod from "./IntensityMethod/IntensityMethod";

class Homework2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            selectedImage: null,
            results: null,
            cibr_method:"Intensity",
        };
    }

    selectCIBRMethod(method) {
        //alert(method);
        this.setState({cibr_method: method});
        this.props.fetchMethod();
    }

    renderCIBRMethod() {
        if(this.state.cibr_method === "Intensity") {
            return <IntensityMethod/>;
        }
        else if(this.state.cibr_method === "ColorCoded") {
            return (
                <div style={{marginTop:'25px'}}>
                    <div><h4>Method: ColorCoded</h4></div>
                </div>
            );
        }
        else if(this.state.cibr_method === "Both") {
            return (
                <div style={{marginTop:'25px'}}>
                    <div><h4>Method: Intensity + ColorCoded</h4></div>
                </div>
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
                    <button className="waves-effect waves-light btn green"  style={{width:'250px'}} onClick={() => this.selectCIBRMethod("Intensity")}>Intesity</button>
                    <button className="waves-effect waves-light btn blue ml-2" style={{width:'250px'}}  onClick={() => this.selectCIBRMethod("Both")}>Intesity + Color Coded</button>
                    <button className="waves-effect waves-light btn yellow darken-2 ml-2" style={{width:'250px'}}  onClick={() => this.selectCIBRMethod("ColorCoded")}>Color Coded</button>
                </div>
                <div>
                    {this.renderCIBRMethod()}
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
