import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import {
    getAds
} from './../redux/actions/actions'

const mapStateToProps = state => {
    return {
            description: state.description,
            createdBy:state.createdBy,
            image: state.image,
            url:state.url,
            loading: state.loading,
            message:state.message
    }
}

class AddAds extends Component {
    constructor(props){
        
        super(props);
        this.state = {
            description: '',
            createdBy:'Chamindra',
            image: '',
            url:'',
            loading: false,
            message:''
        }
    }
          
    componentDidMount() {
        let id=0;
        if (this.props.location.pathname.indexOf("addAds/:")>0) {
            id=this.props.location.pathname.substr(this.props.location.pathname.indexOf(":")+1);
        }
         
        if (id!==0){
         getAds(id).then(data => {
             if (data) {

             
                this.setState({
                description: data[0].description,
                createdBy:data[0].createdBy,
                image: '',
                url:data[0].url
               }); 
            }   
            
            });
        };
    }

    handleSubmit=(evt)=>{
            evt.preventDefault();
            this.setState({
        loading: true
        })
       
        console.log('publishing...')
        const _url = process.env.NODE_ENV === 'production' ? "/api/" : "https://blooming-hamlet-94124.herokuapp.com/api/"
        // const _url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/"
        const formdata = new FormData();
       let id=0;
        if (this.props.location.pathname.indexOf("addAds/:")>0) {
            id=this.props.location.pathname.substr(this.props.location.pathname.indexOf(":")+1);
        }
        
        console.log(id);
         formdata.append('id', id)
        formdata.append('description', this.state.description)
        formdata.append('createdBy', this.state.createdBy)
        formdata.append('url', this.state.url)
        formdata.append('image', this.state.image);
        if (id!==0) {
            axios.post(`${_url}ad`, /*{
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
                    message:"Advertisement successfully updated."
                })
                console.log(res.data)
            }).catch((err)=>{console.log(err); this.setState({loading: false,message:"Errors occurred."})});
        }
        else {
            axios.post(`${_url}ad`, /*{
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
                    message:"Advertisement successfully added."
                })
                console.log(res.data)
                }).catch((err)=>{console.log(err); this.setState({loading: false,message:"Errors occurred."})})
        }       
    }
    controlChange=(evt)=>{
         this.setState({[evt.target.name]:evt.target.value});
        
    }
       
    render() {
         return (<div className="ui equal width form">
                <div className="ui raised segment">
                    <label className="ui large blue ribbon label">Add News</label>
                   <form onSubmit={this.handleSubmit}> 
                      <div className="fields">
                        <div className="field">
                            <label>Description</label>
                            <textarea rows="2" name="description" required onChange={this.controlChange} value={this.state.description}></textarea>
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
                                <input name="url" onChange={this.controlChange} value={this.state.url} max="500" type="url" placeholder="URL"/>
                            </div>
                            {/*<div className="field">
                                <label>News Type</label>
                                <select required value={this.state.newstype} onChange={this.controlChange} name="newstype">
                                      <option default value="L">Local</option>
                                      <option value="F">Foreign</option>
                                      <option value="B">Local/Foreign</option>
                                </select>
                            </div>*/}
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



export default connect(mapStateToProps, {})(AddAds);