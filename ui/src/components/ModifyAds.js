import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    loadAds,deleteAds
} from './../redux/actions/actions'


const mapStateToProps = state => {
    return {
        ads: state.ads
    }
}

class ModifyAds extends Component{
    constructor(props){
        super(props);
        this.state={
            ads:[]
        }
    }

    componentDidMount(){
         loadAds().then(data => {
              let adsDataNew= data.map((ads)=>{
              return Object.assign({},ads)
          });
            this.setState({ads:adsDataNew});    
        });
        let id=0;
        if (this.props.location.pathname.indexOf("modifyAds/:")>0) {
            id=this.props.location.pathname.substr(this.props.location.pathname.indexOf(":")+1);
        }
        console.log(this.props);
        if (id!==0){
            deleteAds(id).then(data => {
             const nextads =this.state.ads.map((adsData)=>{
                        if (adsData.id===id){
                            return {};
                        }
                        else{
                            return adsData;
                        }
                })   
                this.setState({ads:nextads});  
               });
            };
        }
      

    render(){
        const adsComponents=this.state.ads.map((adsData)=>{
              return <AdsRow
              id={adsData.id}
              key={adsData.id}
              description={adsData.description}
              url={adsData.url}
              />    
           
        });

        return(<div>
            <table className="ui fixed single line celled table">
                <thead>
                <tr>
                
                <th>Description</th>
                <th>Url</th>
                <th>         </th>
                    </tr></thead>
                <tbody>
                    {adsComponents}
                </tbody>
                </table>
                </div>);
    }

}

class AdsRow extends Component{

    

    render(){
       return(<tr>
            <input type="hidden" value={this.props.id}/>
            <td>{this.props.description}</td>
            <td>{this.props.url}</td>
            <td><a href={"/addAds/:"+this.props.id}>Modify</a> <a href={"/modifyAds/:"+this.props.id} >Delete</a></td>
        </tr>);
    }
}

//export default ModifyNews;
export default connect(mapStateToProps, {})(ModifyAds);

