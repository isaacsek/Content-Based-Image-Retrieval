import React, { Component } from "react";
import { connect } from "react-redux";
//import image1 from "../../../public/images/1.jpg"

var images = [];
class Landing extends Component {

    renderImages() {
        for(var i = 1; i <= 100; i*=2) {
            var temp =
            <div className="mt-2" key={i}>
                <img className="mr-2" src={process.env.PUBLIC_URL + '/images/' + (i) + '.jpg'} onClick={() => alert("Image = " + i)}/>
                <img src={process.env.PUBLIC_URL + '/images/' + (i + 1) + '.jpg'} onClick={() => alert("Image = " + i)}/>
            </div>
            images.push(temp);
        }
        return images;
    }

    render() {
        return (
            <div style={{textAlign:'center'}}>
                <h1>
                    CSS 490: Project 1
                </h1>
                <h5 className="mb-2">Simple Content-Based Image Retrieval System</h5>
                <div className="mt-2 mb-2">
                    <button className="mr-2 btn" onClick={() => alert("Method selected. Select image.")}>Intensity</button>
                    <button className="btn" onClick={() => alert("Method selected. Select image.")}>Color-Code</button>
                </div>

                {this.renderImages()}
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
