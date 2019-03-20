import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    loadNews,deleteNews
} from './../redux/actions/actions'

const mapStateToProps = state => {
    return {
        news: state.news
    }
}

class ModifyNews extends Component{
    constructor(props){
        super(props);
        this.state={
            news:[]
        }
    }

    componentDidMount(){
         loadNews().then(data => {
              let newsDataNew= data.map((news)=>{
              return Object.assign({},news)
          });
            this.setState({news:newsDataNew});    
        });
        const id=this.props.location.pathname.substr(this.props.location.pathname.indexOf(":")+1);
        console.log(this.props);
        if (id){
            deleteNews(id).then(data => {
                 const nextNews =this.state.news.map((newsData)=>{
                        if (newsData.id===id){
                            return {};
                        }
                        else{
                            return newsData;
                        }
                })   
                this.setState({news:nextNews});  
               });
            };
        }
      

    render(){
        const newsComponents=this.state.news.map((newsData)=>{
              return <NewsRow
              id={newsData.id}
              key={newsData.id}
              title={newsData.title}
              description2={newsData.description2}
              />    
           
        });

        return(<div>
            <table class="ui fixed single line celled table">
                <thead>
                <tr>
                <th>Title</th>
                <th>Description</th>
                <th>         </th>
                    </tr></thead>
                <tbody>
                    {newsComponents}
                </tbody>
                </table>
                </div>);
    }

}

class NewsRow extends Component{

    

    render(){
       return(<tr>
            <input type="hidden" value={this.props.id}/>
            <td>{this.props.title}</td>
            <td>{this.props.description2}</td>
            <td><a href={"/addNews/:"+this.props.id}>Modify</a> <a href={"/modifyNews/:"+this.props.id} >Delete</a></td>
        </tr>);
    }
}

//export default ModifyNews;
export default connect(mapStateToProps, {})(ModifyNews);

