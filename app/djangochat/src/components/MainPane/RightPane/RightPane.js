import React, {Component} from 'react';
import './RightPane.css';
import ServerProfile from './ServerProfile/ServerProfile';
import ServerInfos from './ServerInfos/ServerInfos';
import ServerSettings from './ServerSettings/ServerSettings';
import { connect } from 'react-redux';

class RightPane extends Component{
    state = {
        settingsVisible: false,
        oldServerId:0
    }

    openSettings = ()=> {
        this.setState({
            settingsVisible : true,
            oldServerId:this.props.serverId
        })
    }

    closeSettings=()=>{
        this.setState({
            settingsVisible : false,
            oldServerId:0
        })
    }
    
    render(){
        let component;
        if(this.state.settingsVisible && this.state.oldServerId===this.props.serverId){
            component = (<ServerSettings closeSettings={this.closeSettings} />);
        } else {
            component = (<div>
                <div className="serverProfile">
                    <ServerProfile/>
                </div>
                <div className="serverInfos bg-secondary">
                    <ServerInfos openSettings={this.openSettings} closeSettings={this.closeSettings} />
                </div>
            </div>);
        }
        return component;
    }
}

const mapsStateToProps = (state) => {
    return {
        serverId: state.server.activeServerId
    }
}

export default connect(mapsStateToProps)(RightPane); 
