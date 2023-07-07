import React from "react";
import'../Components/Styles/Header.css';
import { GoogleLogin } from '@react-oauth/google';
import Modal from 'react-modal';
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';




const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor:'antiquewhite',
      border:'solid 1px brown'

    },
  };



class Header extends React.Component{
    constructor(){
        super();
        this.state = {
            backgroundColor: '',
            display: 'none',
            loginModalIsOpen: false,
            isLoggedIn: false,
            loggedInUser:undefined
        }
    }

    componentDidMount(){
        const path = this.props.history.location.pathname;
        this.setAttributes(path);
    }

    setAttributes = (path) => {
        let bg , display;
        if(path == '/') {
            bg = '#000000';
            display = 'none';
        }
        else{
            bg = '#ff0000';
            display = 'inline-block'
        }
        this.setState({backgroundColor: bg, display: display});
    }

    handleLogin = () =>{
        this.setState({loginModalIsOpen: true});
    }
    handleCancel = () => {
        this.setState({loginModalIsOpen: false})
    }
    responseGoogle = (response) => {
        this.setState({ isLoggedIn: true, loggedInUser: response.given_name, loginModalIsOpen: false})
        console.log(response);
    }
    handleLogout = () => {
        this.setState({isLoggedIn: false, loggedInUser: undefined})
    }  

    responseFacebook = (response) => {
        this.setState({ isLoggedIn: true, loggedInUser: response.name, loginModalIsOpen: false})
        console.log(response);

    }

    credentialResponse = (credentialResponse) => {
        console.log(credentialResponse.credential);
        var decoded = jwt_decode(credentialResponse.credential);
        console.log(decoded)
        this.responseGoogle(decoded)
    }
    
    render() {
        const { backgroundColor, display, loginModalIsOpen, isLoggedIn,  loggedInUser } = this.state
        return(
            <div className="header" style={{backgroundColor: backgroundColor}}>
                <div className="header-logo" style={{ display: display}}>
                    <Link to='/'>
                    <p className="logoe">e!</p>
                    </Link>
                </div>
                {!isLoggedIn?
                <div className="user-account">
                <button className="login" onClick={this.handleLogin}>Login</button>
                <button className="signup">Create an Account</button>
                </div> 
                : <div className="user-account">
                  <button className="login">{loggedInUser}</button>
                  <button className="signup" onClick={this.handleLogout}>Logout</button>
                  </div> 
                }

                <Modal
                        isOpen={loginModalIsOpen}
                        style={customStyles}
                       
                    >
                       <div>
                        <h2 >Login</h2>
                        <input type="text" placeholder="Email"/>
                        <br/>
                        <br></br>
                        <input type="password" placeholder="Password"/>
                        <br />
                        <br />
                        <div>
                            <button  style={{backgroundColor:'blue',color:'white'}}  >Log in</button>
                        
                
                                <button onClick={this.handleCancel}>Cancel</button>
                        </div>
                        <br/>
                        <br />
                      
                                <GoogleLogin
                                clientId="690191445230-jjlgrddlmhkfd1icf4s0fnoloijm5sc7.apps.googleusercontent.com"
                                buttonText="Continue with Google"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                
                                cookiePolicy={'single_host_origin'}
                                />
                                <br></br>

                                <FacebookLogin
                                    appId="6195741600470116"
                                    textButton="Continue with Facebook"
                                    autoLoad={true}
                                    fields="name,email,picture"
                                    icon="fa-facebook"
                                    callback={this.responseFacebook} />,
                                

                       </div>
                </Modal>
            </div>
        )
    }
}

export default Header;