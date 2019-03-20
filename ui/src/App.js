import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import AddNews from './components/AddNews'
import ModifyNews from './components/ModifyNews'
import AddAds from './components/AddAds'
import ModifyAds from './components/ModifyAds'



class App extends Component {
    render() {
        return ( 
            <div>
            {/*{ !pathname.includes('editor') ? <Header /> : '' }*/}
            {/*<SignInWith />*/}
                <Switch>
                    <Route path="/addNews" component={AddNews} />
                    <Route path="/addNews/:id" component={AddNews} />
                    <Route path="/modifyNews" component={ModifyNews} />
                    <Route path="/modifyNews/:id" component={ModifyNews} />*/}
                    <Route path="/addAds" component={AddAds} />
                    <Route path="/addAds/:id" component={AddAds} />
                    <Route path="/modifyAds" component={ModifyAds} />
                    <Route path="/modifyAds/:id" component={ModifyAds} />
                </Switch>
            </div>
        );
    }
}

export default App;