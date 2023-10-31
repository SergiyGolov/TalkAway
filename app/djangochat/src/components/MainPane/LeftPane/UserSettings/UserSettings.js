import React, { Component } from 'react';
import {connect} from 'react-redux';
import './UserSettings.css';

import {
    toastr
} from 'react-redux-toastr'

import {logout, requestEditUser} from "../../../../actions/AuthAction";
import ImageEditor from "../../../Global/ImageEditor";

class UserSettings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mail: '',
            oldPassword: '',
            newPassword: '',
            newPassword2: '',
            errors:{}
        };

        this.refEditor=React.createRef();
    }
    
    save = () => {
        let errors = {};
        if(this.state.newPassword !== this.state.newPassword2){
            errors['password_repeat'] = 'Password not identical';
        }
        // if(this.state.oldPassword === ''){
        //     errors['password'] = 'Please provide your password'
        // }

        if(Object.keys(errors).length > 0){
            this.setState({
                ...this.state,
                errors: errors
            })
            return;
        }

        // if(this.state.newPassword===this.state.newPassword2 && this.state.oldPassword!==''){
            if(this.state.newPassword===this.state.newPassword2){
            const image = this.refEditor.current.getData();
            this.props.requestEditUser(this.state.mail,this.state.newPassword,this.state.oldPassword,image)
            .then(()=>{
                this.setState({
                    mail: '',
                    oldPassword: '',
                    newPassword: '',
                    newPassword2: '',
                });

                toastr.success("Settings", "Saved successfuly");
                this.props.switchSettings();
            }).catch((e)=>{
                toastr.error("Settings", "Error invalid password");
            });
        }else{

        }
    }

    render() {
        // Return the component
        return (
            <div className="container-fluid">
                <button className="close-settings close" type="button" onClick={this.props.switchSettings}>
                    &times;
                </button>
                
                <div className="mx-auto text-center titleName">
                    <h3 className="form-elem">
                        {this.props.auth.username}
                    </h3>
                </div>

                <hr className="settings-separator text-white border-white"/>

                <div className="row">
                    <ImageEditor ref={this.refEditor} id={this.props.auth.id} image={this.props.auth.image}></ImageEditor>
                </div>

                <hr className="settings-separator text-white border-white"/>

                <div className="row">
                    <label className="form-elem" htmlFor="email" >Email</label>
                    <input type="email" value={this.state.mail} className="form-elem" onChange={(evt) => { this.setState({mail:evt.target.value}); }} required></input>

                    <span style={{
                        color: "red"
                    }}>{this.state.errors["password"]}</span>
                    <label className="form-elem" htmlFor="old-password" >Old password</label>
                    <input type="password" value={this.state.oldPassword} className="form-elem" onChange={(evt) => { this.setState({oldPassword:evt.target.value}); }}  name="old-password" required></input>

                    <label className="form-elem" htmlFor="new-password" >New password</label>
                    <input type="password" value={this.state.newPassword} className="form-elem" onChange={(evt) => { this.setState({newPassword:evt.target.value}); }} name="new-password" required></input>

                    <span style={{
                        color: "red"
                    }}>{this.state.errors["password_repeat"]}</span>
                    <label className="form-elem" htmlFor="repeat-password" >Repeat your password</label>
                    <input type="password" className="form-elem" value={this.state.newPassword2} onChange={(evt) => { this.setState({newPassword2:evt.target.value}); }} name="repeat-password" required></input>

                    <input className="saveButton" type="button" value="Save" onClick={this.save}/>
                    <input className="disconnectButton" type="button" value="Disconnect" onClick={this.props.logout}/>
                </div>
            </div>
        );
    }
}

const mapsStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapsStateToProps, {logout, requestEditUser})(UserSettings); 
