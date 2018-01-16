import React, { Component } from "react";
import { connect } from "react-redux";

var images = [];
var imageStyle = {
    height: '300px',
    width: '300px'
}

var inlineStyle={
    display:'inline-block'
}

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            selectedImage: null,
            results: null,
        };
    }

    handleImageClick(index) {
        this.setState({selectedImage:index});
        //alert(index);
    }

    renderImages() {
        images = [];
        var start = 0;
        var end = 0;

        switch(this.state.page) {
            case 1:
                start = 1;
                end = 20;
                break;
            case 2:
                start = 21;
                end = 40;
                break;
            case 3:
                start = 41;
                end = 60
                break;
            case 4:
                start = 61;
                end = 80;
                break;
            case 5:
                start = 81;
                end = 100;
                break;
            default:
                start = 1;
                end = 20;
        }

        for(var i = start; i <= end; i+=5) {
            images.push(
                <div key={i}>
                    <div style={inlineStyle} className="card">
                        <div className="card-image">
                            <img style={imageStyle} src={process.env.PUBLIC_URL + '/images/' + (i) + '.jpg'}  onClick={this.handleImageClick.bind(this, i)} alt={i}/>
                            <span className="card-title">Image {i}</span>
                        </div>
                    </div>
                    <span className="mr-2"/>
                    <div style={inlineStyle}  className="card" >
                        <div className="card-image">
                            <img style={imageStyle} src={process.env.PUBLIC_URL + '/images/' + (i + 1) + '.jpg'} onClick={this.handleImageClick.bind(this, i + 1)} alt={i + 1} />
                            <span className="card-title">Image {i + 1}</span>
                        </div>
                    </div>

                    <span className="mr-2"/>
                    <div style={inlineStyle}  className="card" >
                        <div className="card-image">
                            <img style={imageStyle} src={process.env.PUBLIC_URL + '/images/' + (i + 2) + '.jpg'} onClick={this.handleImageClick.bind(this, i + 2)} alt={i + 2} />
                            <span className="card-title">Image {i + 2}</span>
                        </div>
                    </div>

                    <span className="mr-2"/>
                    <div style={inlineStyle}  className="card" >
                        <div className="card-image">
                            <img style={imageStyle} src={process.env.PUBLIC_URL + '/images/' + (i + 3) + '.jpg'} onClick={this.handleImageClick.bind(this, i + 3)} alt={i + 3} />
                            <span className="card-title">Image {i + 3}</span>
                        </div>
                    </div>

                    <span className="mr-2"/>
                    <div style={inlineStyle}  className="card" >
                        <div className="card-image">
                            <img style={imageStyle} src={process.env.PUBLIC_URL + '/images/' + (i + 4) + '.jpg'} onClick={this.handleImageClick.bind(this, i + 4)} alt={i + 4} />
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

    renderSelectedImage() {
        return (

            <div style={inlineStyle}  className="card" >
                <div className="card-image">
                    <img style={imageStyle} src={process.env.PUBLIC_URL + '/images/' + (this.state.selectedImage) + '.jpg'} alt={1} />
                    <span className="card-title">Image {this.state.selectedImage}</span>
                </div>
            </div>
        );
    }

    renderResults() {
        return (
            <div style={{marginTop: '25px', textAlign:'center'}}>
                <h5>Selected Image</h5>
                <div>
                    {this.renderSelectedImage()}
                </div>
                <div><h5>Results</h5></div>
                <div>Insert Results Here...</div>

                <button className="btn red" style={{marginTop:'30px'}} onClick={() => this.setState({selectedImage:null})}>Back</button>
            </div>
        );
    }

    renderSelectImagePage() {
        return (
            <center>
                Retrieval Method
                <select className="browser-default" style={{width:'200px', border:'2px solid #BDBDBD', textAlign:'center'}}>
                  <option value={1}>Intensity Method</option>
                  <option value={2}>Color Code Method</option>
                </select>

                <div style={{marginTop:'25px', marginBottom:'15px'}} >
                    <button style={{marginRight: '50px'}} className="waves-effect waves-light btn green" onClick={(evt) => this.changePage(this.state.page - 1)}>Prev</button>
                    <div style={{display:'inline-block'}}><strong>Page: {this.state.page}</strong></div>
                    <button style={{marginLeft: '50px'}} className="waves-effect waves-light btn green" onClick={(evt) => this.changePage(this.state.page + 1)}>Next</button>
                </div>

                {this.renderImages()}

                <div style={{marginBottom:'15px'}} >
                    <button style={{marginRight: '50px'}} className="waves-effect waves-light btn green" onClick={(evt) => this.changePage(this.state.page - 1)}>Prev</button>
                    <div style={{display:'inline-block'}}><strong>Page: {this.state.page}</strong></div>
                    <button style={{marginLeft: '50px'}} className="waves-effect waves-light btn green"  onClick={(evt) => this.changePage(this.state.page + 1)}>Next</button>
                </div>
            </center>
        );
    }

    renderPage() {
        if(!this.state.selectedImage) {
            return this.renderSelectImagePage();
        }
        else {
            return this.renderResults();
        }
    }

    render() {
        return (
            <div style={{textAlign:'center'}}>
                <h3 className="mt-2 mb-2">Simple Content-Based Image Retrieval System</h3>
                {this.renderPage()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth : state.auth
    };
}

export default connect(mapStateToProps)(Landing);
