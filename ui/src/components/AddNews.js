import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import {
    getNews
} from './../redux/actions/actions'

const mapStateToProps = state => {
    return {
            title: state.title,
            description: state.description,
            createdBy:state.createdBy,
            image: state.image,
            videoUrl:state.videoUrl,
            description2: state.description2,
            newstype:state.newstype,
            loading: state.loading,
            message:state.message
    }
}


class AddNews extends Component {
    constructor(props){
        
        super(props);
        this.state = {
            title: '',
            description: '',
            createdBy:'Chamindra',
            image: '',
            videoUrl:'',
            description2: '',
            newstype:'L',
            loading: false,
            message:''
        }
    }
         
    componentDidMount() {
        let id=0;
        if (this.props.location.pathname.indexOf("addNews/:")>0) {
             id =this.props.location.pathname.substr(this.props.location.pathname.indexOf(":")+1);
        } 
        if (id){
         getNews(id).then(data => {
         if (data) {
            this.setState({title: data[0].title,
                    description: data[0].description,
                    createdBy:data[0].createdBy,
                    image: '',
                    videoUrl:data[0].videoUrl,
                    description2: data[0].description2,
                    newstype:data[0].newstype});    
                 }    
                });
        };
    }

    handleSubmit=(evt)=>{
            evt.preventDefault();
            this.setState({
        loading: true
        })
        console.log(this.state)
        console.log('publishing...')
        const _url ="https://blooming-hamlet-94124.herokuapp.com/api/";
        // const _url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/"
        const formdata = new FormData();
        let id=0;
        if (this.props.location.pathname.indexOf("addNews/:")>0) {
             id =this.props.location.pathname.substr(this.props.location.pathname.indexOf(":")+1);
        }   
        formdata.append('id', id)
        formdata.append('title', this.state.title)
        formdata.append('description', this.state.description)
        formdata.append('createdBy', this.state.createdBy)
        formdata.append('videoUrl', this.state.videoUrl)
        formdata.append('description2', this.state.description2)
        formdata.append('newstype', this.state.newstype)
        formdata.append('image', this.state.image);
        if (id) {
            axios.post(`${_url}news`, /*{
                text: this.state.text,
                title: document.getElementById('editor-title').value,
                claps: 0,
                description: this.state.description,
                feature_img: this.state.imgSrc,
                author_id: this.props.user._id
            }*/formdata).then((res) => {
                console.log(res);
                this.setState({
                    loading: false,
                    message:"News successfully updated."
                })
                console.log(res.data)
            }).catch((err)=>{console.log(err); this.setState({loading: false,message:"Errors occurred."})});
        }
        else {
            axios.post(`${_url}news`, /*{
                text: this.state.text,
                title: document.getElementById('editor-title').value,
                claps: 0,
                description: this.state.description,
                feature_img: this.state.imgSrc,
                author_id: this.props.user._id
            }*/formdata).then((res) => {
                console.log(res);
                this.setState({
                    loading: false,
                    message:"News successfully added."
                })
                console.log(res.data)
                }).catch((err)=>{console.log(err); this.setState({loading: false,message:"Errors occurred."})})
        }       
    }
    controlChange=(evt)=>{
         this.setState({[evt.target.name]:evt.target.value});
        
         if (evt.target.name==="image"){
              console.log(evt.target.value);
              //this.setState({[evt.target.name]:document.getElementById("my_file").});
         }
    }
       
    render() {
         return (<div className="ui equal width form">
                <div className="ui raised segment">
                    <label className="ui large blue ribbon label">Add News</label>
                   <form onSubmit={this.handleSubmit}> 
                    <div className="fields">
                        <div className="field">
                            <label>Title</label>
                            <input max="100" name="title" onChange={this.controlChange} value={this.state.title} required type="text" placeholder="Title" />
                        </div>
                     </div>
                      <div className="fields">
                        <div className="field">
                            <label>Description</label>
                            <textarea name="description" required onChange={this.controlChange} value={this.state.description}></textarea>
                        </div>
                     </div>
                      <div className="fields">
                        <div className="field">
                            <label>Description2</label>
                            <textarea name="description2" onChange={this.controlChange} max="500" rows="2" value={this.state.description2}></textarea>
                        </div>
                     </div>
                        <div className="fields">
                            <div className="field">
                                <label>Created By</label>
                                <select required value={this.state.createBy} onChange={this.controlChange} name="createdBy">
                                      <option default value="Chamindra">Chamindra</option>
                                      <option value="Vidhura">Vidhura</option>
                                </select>
                            </div>
                            <div className="field">
                                <label>Image</label>
                                <input name="image" onChange={this.controlChange}  type="text" placeholder="Image" value={this.state.image}/>
                                {/*<button className="ui button" onClick={this.browseClicked}>Browse</button>
                                <input name="image" type="file" id="my_file" onChange={this.controlChange} value={this.state.image}/>*/}
                            </div>
                          </div>
                          <div className="fields">  
                            <div className="field">
                                <label>Video URL</label>
                                <input name="videoUrl" onChange={this.controlChange} value={this.state.videoUrl} max="500" type="url" placeholder="Video URL"/>
                            </div>
                            <div className="field">
                                <label>News Type</label>
                                <select required value={this.state.newstype} onChange={this.controlChange} name="newstype">
                                      <option default value="L">Local</option>
                                      <option value="F">Foreign</option>
                                      <option value="B">Local/Foreign</option>
                                </select>
                            </div>
                        </div>
                        <button className="ui button" type="submit">Submit</button>
                        
                        </form>
                              {(this.state.loading)?<div className="ui active dimmer" >
                                    <div className="ui text loader">Saving</div>
                            </div>
                             :''}
                             {(this.state.message)?<div className="ui info message">{this.state.message}</div>
                                                       :''}
                             
                          </div>
                    </div>);
    }
}




//export default AddNews;

export default connect(mapStateToProps, {})(AddNews);