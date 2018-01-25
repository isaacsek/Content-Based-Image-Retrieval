import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";

var images = [];
var imageStyle = {
    height: '300px',
    width: '250px'
}

var inlineStyle={
    display:'inline-block'
}

class ImageSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
        };
    }

    handleImageClick(index, self) {
        this.setState({selectedImage:index});
        //alert(index);
        this.props.selectImage(index);
    }

    renderImages() {
        images = [];
        var start = 0;
        var end = 0;

        switch(this.state.page) {
            case 1:
                start = 1; end = 20; break;
            case 2:
                start = 21; end = 40; break;
            case 3:
                start = 41; end = 60; break;
            case 4:
                start = 61; end = 80; break;
            case 5:
                start = 81; end = 100; break;
            default: start = 1; end = 20;
        }

        for(var i = start; i <= end; i+=5) {
            images.push(
                <div key={i}>
                    <div style={inlineStyle} className="card">
                        <div className="card-image">
                            <img style={imageStyle} src={process.env.PUBLIC_URL + '/images/' + (i) + '.jpg'}  onClick={this.handleImageClick.bind(this, i, this)} alt={i}/>
                            <span className="card-title">Image {i}</span>
                        </div>
                    </div>
                    <span className="mr-2"/>
                    <div style={inlineStyle}  className="card" >
                        <div className="card-image">
                            <img style={imageStyle} src={process.env.PUBLIC_URL + '/images/' + (i + 1) + '.jpg'} onClick={this.handleImageClick.bind(this, i + 1, this)} alt={i + 1} />
                            <span className="card-title">Image {i + 1}</span>
                        </div>
                    </div>

                    <span className="mr-2"/>
                    <div style={inlineStyle}  className="card" >
                        <div className="card-image">
                            <img style={imageStyle} src={process.env.PUBLIC_URL + '/images/' + (i + 2) + '.jpg'} onClick={this.handleImageClick.bind(this, i + 2, this)} alt={i + 2} />
                            <span className="card-title">Image {i + 2}</span>
                        </div>
                    </div>

                    <span className="mr-2"/>
                    <div style={inlineStyle}  className="card" >
                        <div className="card-image">
                            <img style={imageStyle} src={process.env.PUBLIC_URL + '/images/' + (i + 3) + '.jpg'} onClick={this.handleImageClick.bind(this, i + 3, this)} alt={i + 3} />
                            <span className="card-title">Image {i + 3}</span>
                        </div>
                    </div>

                    <span className="mr-2"/>
                    <div style={inlineStyle}  className="card" >
                        <div className="card-image">
                            <img style={imageStyle} src={process.env.PUBLIC_URL + '/images/' + (i + 4) + '.jpg'} onClick={this.handleImageClick.bind(this, i + 4, this)} alt={i + 4} />
                            <span className="card-title">Image {i + 4}</span>
                        </div>
                    </div>
                </div>
            );
        }
        return images;
    }

    changePage(x) {
        if(x < 1) {
            this.setState({page:1});
        }
        else if(x > 5) {
            this.setState({page: 5});
        }
        else {
            this.setState({page: x});
        }
    }

    renderSelectImagePage() {
        return (
            <center>
                <div style={{marginTop:'25px', marginBottom:'15px'}} >
                    <button style={{marginRight: '50px'}} className="waves-effect waves-light btn red" onClick={(evt) => this.changePage(this.state.page - 1)}>Prev</button>
                    <div style={{display:'inline-block'}}><strong>Page: {this.state.page}</strong></div>
                    <button style={{marginLeft: '50px'}} className="waves-effect waves-light btn red" onClick={(evt) => this.changePage(this.state.page + 1)}>Next</button>
                </div>

                {this.renderImages()}

                <div style={{marginBottom:'15px'}} >
                    <button style={{marginRight: '50px'}} className="waves-effect waves-light btn red" onClick={(evt) => this.changePage(this.state.page - 1)}>Prev</button>
                    <div style={{display:'inline-block'}}><strong>Page: {this.state.page}</strong></div>
                    <button style={{marginLeft: '50px'}} className="waves-effect waves-light btn red"  onClick={(evt) => this.changePage(this.state.page + 1)}>Next</button>
                </div>
            </center>
        );
    }

    render() {
        return (
            <div>
                {this.renderSelectImagePage()}
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        auth : state.auth
    };
}

export default connect(mapStateToProps, actions)(ImageSelector);
