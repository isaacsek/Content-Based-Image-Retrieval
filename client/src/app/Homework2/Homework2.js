import React, { Component } from "react";
import { connect } from "react-redux";
//import SelectImage from "./SelectImage";
import { intensitySort, colorCodeSort, findDistances } from "./imageSorter";
import { intensityHistogram} from "./output";
import { colorHistogram }from "./output2";
import IntensityMethod from "./IntensityMethod/IntensityMethod";
import ImageSelector from "./ImageSelector";

var images = [];
var imageStyle = {
    height: '300px',
    width: '250px'
}

var inlineStyle={
    display:'inline-block'
}

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
        alert(method);
        this.setState({cibr_method: method});
    }

    renderCIBRMethod() {
        if(this.state.cibr_method === "Intensity") {
            return <IntensityMethod/>;
        }
        else if(this.state.cibr_method === "ColorCoded") {
            return <div>ColorCoded Method</div>;
        }
        else if(this.state.cibr_method === "Both") {
            return <div>Intensity + ColorCoded Method + RF</div>;
        }
        else {
            return <div>error</div>;
        }
    }

    render() {
        return (
            <div style={{textAlign:'center'}}>
                <h3 className="mt-2 mb-2">Simple Content-Based Image Retrieval System</h3>
                <div className="mt-2 mb-2">
                    <button className="waves-effect waves-light btn green" onClick={() => this.selectCIBRMethod("Intensity")}>Intesity</button>
                    <button className="waves-effect waves-light btn blue ml-2" onClick={() => this.selectCIBRMethod("Both")}>Intesity + Color Coded</button>
                    <button className="waves-effect waves-light btn red ml-2" onClick={() => this.selectCIBRMethod("ColorCoded")}>Color Coded</button>
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

export default connect(mapStateToProps)(Homework2);
