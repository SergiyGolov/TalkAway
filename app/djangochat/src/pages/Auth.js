import React, { useState } from 'react';

import Register from '../components/Auth/Register/Register';
import Login from '../components/Auth/Login/Login';
import "./Auth.css";

const AuthPage = props => {

    const [isLogin, setIsLogin] = useState(true);

    const switchModeHandler = () => {
        setIsLogin(!isLogin);
    }

    let authComponent;

    if (isLogin) {
        authComponent = <Login/>;
    } else {
        authComponent = <Register />;
    }

    return (
        <div className="text-center">
            <form className="form-signin">
                <img className="mb-4" src={require('./images/TalkAway.png')} alt="" width="150" height="150"/>
                
                {authComponent}
                
                <button type="button" onClick={switchModeHandler} className="btn btn-link mt-2">{isLogin ? 'No account ? Register here' : 'Already have an account ? Log in here'}</button>
                <p className="mt-5 mb-3 text-muted">&copy; 2019</p>
            </form>
        </div>
    );
}

export default AuthPage;