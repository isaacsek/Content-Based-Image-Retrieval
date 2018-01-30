import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import ImageSelector from "../Components/ImageSelector";
import axios from "axios";

var imageStyle = {
    height: '300px',
    width: '250px'
}

var inlineStyle={
    display:'inline-block'
}

class IntensityMethod extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            selectedImage: null,
            selectedImages: [],
        };
    }

    componentWillMount() {
        this.loadHistogram();


    }

    async loadHistogram() {
        const histogram = await axios.get("/api/histogram?method=" + "both");
        this.setState({buckets:histogram.data});

        let temp = [];
        for(let i = 0; i < 89; i++) {
            temp.push(1/89);
        }
        this.setState({weights: JSON.parse(JSON.stringify(temp))});
    }

    async getResults() {
        if(!this.state.buckets) {
            this.loadHistogram();
        }
        else {
            const normalizedWeights = await axios.post("/api/findWeightsRF", { images: this.state.selectedImages });
            const results = await axios.post("/api/findDistancesRF", { image: this.state.selectedImage, weights:this.state.weights });
            this.setState({results: results.data});
        }
    }

    selectImage(img) {
        if(this.state.selectedImages && this.state.selectedImages.includes(img)) {
            alert("Cannot re-select images to query!");
        }
        else {
            this.setState({selectedImage: img});
            let temp = this.state.selectedImages;
            temp.push(img);

            this.setState({selectedImages: temp});

            if(temp.length === 1) {
                this.getResults(img);
            }
            //this.getResults(img);
        }
    }

    renderSelectImages() {
        if(!this.state.buckets)
            return <div>Loading...</div>;
        return (
            <div><ImageSelector selectImage={(img) => this.selectImage(img)} /></div>
        );
    }

    renderContent() {
        if(this.state.selectedImages.length !== 0) {
            return (
                <div>
                    {this.renderResults()}
                </div>
            )
        }
        else {
            return this.renderSelectImages();
        }
    }

    renderResults() {
        return (
            <div style={{marginTop: '25px', textAlign:'center'}}>
                <div>
                    <div className="btn red" style={inlineStyle} onClick={() => this.setState({selectedImages: []})}>Go Back</div>
                    {/* <div className="btn"  style={inlineStyle} onClick={() => this.setState({results:null})}>Results: Image {JSON.stringify(this.state.selectedImages)}</div> */}
                    <div className="ml-2 btn magenta" style={inlineStyle} onClick={() => alert("Click images from the right side, once done selecting images, click 'Query Images' to see results")}>Help</div>
                    <div className="ml-2 btn purple" style={inlineStyle} onClick={() => this.getResults()}>Query Images</div>
                </div>

                <div className="row">
                    <div className="col s6">
                        <div className="btn orange">Relevant Images: {JSON.stringify(this.state.selectedImages)}</div>
                        {this.renderSelectedImages()}
                    </div>
                    <div className="col s6">
                        <div className="btn red lighten-2">Results</div>
                        {this.renderImageResults()}
                    </div>
                </div>
                <button className="btn red" style={{marginTop:'15px', marginBottom:'15px'}} onClick={() => this.setState({selectedImages: []})}>Back</button>
            </div>
        );
    }



    renderSelectedImages() {
        const resultImages1 = [];

        for(let i = 0; i < this.state.selectedImages.length; i+=3) {
            resultImages1.push(
                <div key={i} style={inlineStyle}>
                    <div style={inlineStyle} className="card">
                        <div className="card-image">
                            <img style={imageStyle} src={process.env.PUBLIC_URL + '/images/' + (this.state.selectedImages[i]) + '.jpg'} alt={i}/>
                            <span className="card-title">Image {this.state.selectedImages[i]}</span>
                        </div>
                    </div>
                </div>
            )

            if(i + 1 < this.state.selectedImages.length) {
                resultImages1.push(
                    <div key={i + 1} style={inlineStyle} className="ml-2">
                        <div style={inlineStyle} className="card">
                            <div className="card-image">
                                <img style={imageStyle} src={process.env.PUBLIC_URL + '/images/' + (this.state.selectedImages[i + 1]) + '.jpg'} alt={i}/>
                                <span className="card-title">Image {this.state.selectedImages[i + 1]}</span>
                            </div>
                        </div>
                    </div>
                )
            }

            if(i + 2 < this.state.selectedImages.length) {
                resultImages1.push(
                    <div key={i + 1} style={inlineStyle} className="ml-2">
                        <div style={inlineStyle} className="card">
                            <div className="card-image">
                                <img style={imageStyle} src={process.env.PUBLIC_URL + '/images/' + (this.state.selectedImages[i + 2]) + '.jpg'} alt={i}/>
                                <span className="card-title">Image {this.state.selectedImages[i + 2]}</span>
                            </div>
                        </div>
                    </div>
                )
            }
        }
        return <div>{resultImages1}</div>;
    }

    handleImageClick(index, self) {
        this.setState({selectedImage:index});
        //alert(index);
        this.selectImage(index);
    }

    renderImageResults() {
        if(!this.state.results) {
            return (<div>Click Query Images to see  results!</div>);
        }
        const resultImages = [];
        for(let i = 0; i < 100; i+=5) {
            resultImages.push(
                <div key={i}>
                    <div style={inlineStyle} className="card">
                        <div className="card-image">
                            <img style={imageStyle} src={process.env.PUBLIC_URL + '/images/' + (this.state.results[i].index) + '.jpg'} onClick={this.handleImageClick.bind(this, (this.state.results[i].index), this)} />
                            <span className="card-title">Image {this.state.results[i].index}</span>
                        </div>
                    </div>
                    <span className="mr-2"/>
                    <div style={inlineStyle}  className="card" >
                        <div className="card-image">
                            <img style={imageStyle} src={process.env.PUBLIC_URL + '/images/' + (this.state.results[i + 1].index)  + '.jpg'} alt={i + 1}  onClick={this.handleImageClick.bind(this, (this.state.results[i + 1].index), this)}/>
                            <span className="card-title">Image {this.state.results[i + 1].index}</span>
                        </div>
                    </div>

                    <span className="mr-2"/>
                    <div style={inlineStyle}  className="card" >
                        <div className="card-image">
                            <img style={imageStyle} src={process.env.PUBLIC_URL + '/images/' + (this.state.results[i + 2].index)  + '.jpg'} alt={i + 2} onClick={this.handleImageClick.bind(this, (this.state.results[i + 2].index), this)} />
                            <span className="card-title">Image {this.state.results[i + 2].index}</span>
                        </div>
                    </div>
                    {/*
                    <span className="mr-2"/>
                    <div style={inlineStyle}  className="card" >
                        <div className="card-image">
                            <img style={imageStyle} src={process.env.PUBLIC_URL + '/images/' + (this.state.results[i + 3].index)  + '.jpg'}  alt={i + 3} />
                            <span className="card-title">Image {this.state.results[i + 3].index}</span>
                        </div>
                    </div>

                    <span className="mr-2"/>
                    <div style={inlineStyle}  className="card" >
                        <div className="card-image">
                            <img style={imageStyle} src={process.env.PUBLIC_URL + '/images/' + (this.state.results[i + 4].index)  + '.jpg'}  alt={i + 4} />
                            <span className="card-title">Image {this.state.results[i + 4].index}</span>
                        </div>
                    </div> */}
                </div>
            )
        }
        return resultImages;
    }

    renderHelpMessage() {
        if(this.state.selectedImage < 1) {
            return <div>Select an image to get started!</div>;
        }
    }

    render() {
        return (
            <div style={{marginTop:'25px'}}>
                <div><h4>Method: Intensity + Color Coded</h4></div>
                {this.renderHelpMessage()}
                {this.state.selectedImages}
                {this.renderContent()}
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
