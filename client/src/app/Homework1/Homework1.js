import React, { Component } from "react";
import { connect } from "react-redux";
//import SelectImage from "./SelectImage";
import { intensitySort, colorCodeSort, findDistances } from "./imageSorter";
import { intensityHistogram} from "./output";
import { colorHistogram }from "./output2";

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
            method:1,
        };
    }

    handleImageClick(index, self) {
        this.setState({selectedImage:index});
        //console.log(intensitySort());
        //console.log(colorCodeSort());
        //console.log("result", colorCodeSort());
        //console.log(intensitySort());
        //alert(index);

        // colorCodeSort(function(buckets) {
        //     console.log("done", buckets);
        // });

        if(this.state.method === 1) {
            //console.log("self", self.state.selectedImage);
            const results = [];
            let buckets = intensityHistogram;
            for(let i = 1; i <= 100; i++) {
                findDistances(buckets, index, i, function(distance) {
                    const temp = {};
                    temp.index = i;
                    temp.distance = distance;
                    results.push(JSON.parse(JSON.stringify(temp)));
                })
            }
            results.sort(function(a, b) {
                return a.distance - b.distance;
            });
            //console.log(JSON.stringify(results));
            self.setState({results:results});


            // intensitySort(function(buckets) {
            //     console.log(JSON.stringify(buckets));
            //     const results = [];
            //     for(let i = 1; i <= 100; i++) {
            //         findDistances(buckets, 1, i, function(distance) {
            //             const temp = {};
            //             temp.index = i;
            //             temp.distance = distance;
            //             results.push(JSON.parse(JSON.stringify(temp)));
            //         })
            //     }
            //     results.sort(function(a, b) {
            //         return a.distance - b.distance;
            //     });
            //     //console.log(JSON.stringify(results));
            //     self.setState({results:results});
            // });
        }
        else {
            const results = [];
            let buckets = colorHistogram;
            for(let i = 1; i <= 100; i++) {
                findDistances(buckets, index, i, function(distance) {
                    const temp = {};
                    temp.index = i;
                    temp.distance = distance;
                    results.push(JSON.parse(JSON.stringify(temp)));
                })
            }
            results.sort(function(a, b) {
                return a.distance - b.distance;
            });
            //console.log(JSON.stringify(results));
            self.setState({results:results});

            // colorCodeSort(function(buckets) {
            //     console.log(JSON.stringify(buckets));
            //     const results = [];
            //     for(let i = 1; i <= 100; i++) {
            //         findDistances(buckets, 1, i, function(distance) {
            //             const temp = {};
            //             temp.index = i;
            //             temp.distance = distance;
            //             results.push(JSON.parse(JSON.stringify(temp)));
            //         })
            //     }
            //     results.sort(function(a, b) {
            //         return a.distance - b.distance;
            //     });
            //     //console.log(JSON.stringify(results));
            //     self.setState({results:results});
            // });
        }
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
                <button className="btn red" style={{marginTop:'15px', marginBottom:'15px'}} onClick={() => this.setState({selectedImage:null})}>Back</button>
                <h5>Selected Image</h5>
                <div>
                    {this.renderSelectedImage()}
                </div>
                <div><h5>Results</h5></div>
                {this.renderImageResults()}
                <button className="btn red" style={{marginTop:'15px', marginBottom:'15px'}} onClick={() => this.setState({selectedImage:null})}>Back</button>
            </div>
        );
    }

    renderImageResults() {

        if(!this.state.results) {
            return <div>Insert Results Here...</div>;
        }
        else {
            const resultImages = [];
            for(let i = 0; i < 100; i+=5) {
                resultImages.push(
                    <div key={i}>
                        <div style={inlineStyle} className="card">
                            <div className="card-image">
                                <img style={imageStyle} src={process.env.PUBLIC_URL + '/images/' + (this.state.results[i].index) + '.jpg'} alt={i}/>
                                <span className="card-title">Image {this.state.results[i].index}</span>
                            </div>
                        </div>
                        <span className="mr-2"/>
                        <div style={inlineStyle}  className="card" >
                            <div className="card-image">
                                <img style={imageStyle} src={process.env.PUBLIC_URL + '/images/' + (this.state.results[i + 1].index)  + '.jpg'} alt={i + 1} />
                                <span className="card-title">Image {this.state.results[i + 1].index}</span>
                            </div>
                        </div>

                        <span className="mr-2"/>
                        <div style={inlineStyle}  className="card" >
                            <div className="card-image">
                                <img style={imageStyle} src={process.env.PUBLIC_URL + '/images/' + (this.state.results[i + 2].index)  + '.jpg'} alt={i + 2} />
                                <span className="card-title">Image {this.state.results[i + 2].index}</span>
                            </div>
                        </div>

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
                        </div>
                    </div>
                )
            }
            return resultImages;
        }
    }

    onSelectChange(event) {
        if(event.target.value === 1) {
            alert("Intensity Method Selected");
        }
        else {
            alert("Color Code Method Selected");
        }
        this.setState({method:event.target.value});
    }

    renderSelectImagePage() {
        return (
            <center>
                Retrieval Method
                <select className="browser-default" style={{width:'200px', border:'2px solid #BDBDBD', textAlign:'center'}} onChange={(event) => this.onSelectChange(event)}>
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
