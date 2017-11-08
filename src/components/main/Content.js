import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom'

// All pages imports are done here
import Home from '../pages/home/Home';
import About from '../pages/about/About';
import Contact from '../pages/contact/Contact';
import MerchantPage from '../pages/merchant/MerchantPage';

class Content extends React.Component {

    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/home' component={Home} />
                    <Route path='/about' component={About} />
                    <Route path='/contact' component={Contact} />
                    <Route path='/MerchantPage' component={MerchantPage} />
                </Switch>
            </HashRouter>
        );
    }
}

export default Content;