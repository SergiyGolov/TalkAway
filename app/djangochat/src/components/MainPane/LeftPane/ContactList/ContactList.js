import React, { Component } from 'react';
import { connect } from 'react-redux';

import Server from './Contact/Server';
import Friend from './Contact/Friend';
import './ContactList.css';

import { requestMessageList } from "../../../../actions/MessageAction";
import { requestChannelList, selectChannelAuto } from "../../../../actions/ChannelAction";
import { requestServerList, selectServer } from "../../../../actions/ServerAction";
import { requestFriendList, selectFriend } from "../../../../actions/FriendAction";
import { showFriends, showServers, getAllUsers } from "../../../../actions/ContactAction";

class ContactList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            serverDisplayed: true,
            addingFriend: false
        }

        console.log(this.props.allUsers)
        this.props.getAllUsers();
        this.props.requestFriendList();
        this.props.requestServerList();
        window.addEventListener("resize", this.updateDimensions);
    }

    updateDimensions = () => {
        this.forceUpdate();
    }

    displayFriends = () => {
        this.setState({
            serverDisplayed: false
        })
        this.props.showFriends();
    }

    displayServers = () => {
        this.setState({
            serverDisplayed: true
        })
        this.props.showServers();
    }

    friendSelected = (id) => {
        this.props.selectFriend(id);
        const channelId = this.props.friends.filter(f => f.friend.id === id)[0].channelId;
        this.props.requestMessageList(channelId);
    }

    serverSelected = (id) => {
        let serverId = Number(id);
        this.props.selectServer(serverId);
        this.props.requestChannelList(serverId).then(() => {
            this.props.selectChannelAuto(serverId);
        });
    }

    addingFriend = () => {
        this.setState({
            addingFriend: true
        });
    }

    render() {
        // Update the displayed list
        const white = '#FFFFFF';
        const blue = '#0D6CB8';
        let contactRows = [];
        const classesSelected = ["row", "contact", "selected"];
        const classesSelectable = ["row", "contact", "selectable"];

        const [styleServers, styleFriends] = this.state.serverDisplayed ? [blue, white] : [white, blue];
        if (this.state.serverDisplayed) {
            contactRows = this.props.servers.map((server) => {
                const serverId = Number(server.id);
                let classes = (serverId === this.props.activeServerId) ? classesSelected : classesSelectable;
                return (<div key={serverId} className={classes.join(' ')}>
                    <Server contact={{}} server={server} serverSelected={this.serverSelected} />
                </div>);
            });
        } else {
            contactRows = this.props.friends.map((friend) => {
                const friendId = Number(friend.friend.id);
                let classes = (friendId === this.props.activeFriendId) ? classesSelected : classesSelectable;
                return (<div key={friend.friend.id + this.props.servers.length} className={classes.join(' ')}>
                    <Friend friend={friend} friendSelected={this.friendSelected} />
                </div>);
            });
        }

        let selectorServersDescription = "S";
        let selectorfriendsDescription = "F";
        if (window.innerWidth > 767) {
            selectorServersDescription = "Servers";
            selectorfriendsDescription = "Friends";
        }

        // Return the component
        return (
            <div style={{ paddingTop: '10px', height: '100%', width: '100%' }}>
                <div className="contactSelector unselectable">
                    <div id="selectorServers" className="cursor" onClick={this.displayServers} style={{ color: styleServers }}>
                        {selectorServersDescription}
                    </div>
                    <div id="selectorSeparator">/</div>
                    <div id="selectorFriends" className="cursor" onClick={this.displayFriends} style={{ color: styleFriends }}>
                        {selectorfriendsDescription}
                    </div>
                </div>
                <div id="contactList" className="container scrollable unselectable">
                    {
                        !this.state.serverDisplayed ?
                            this.state.addingFriend ?
                                <div>ADD</div>
                                :
                                <div>
                                    <button onClick={this.addingFriend}>Add friend</button>
                                </div>
                            :
                            <div>

                            </div>
                    }
                    {contactRows}
                </div>
            </div>
        );
    }
}

const mapsStateToProps = (state) => {
    return {
        servers: state.server.servers,
        activeServerId: state.server.activeServerId,
        friends: state.friend.friends,
        activeFriendId: state.friend.activeFriendId,
        allUsers: state.contact.allUsers.users.filter(
            u => {
                return u.friends.length === u.friends.filter(
                    f => {
                        return Number(f.id) !== Number(state.auth.id);
                    }
                ).length && Number(u.id) !== Number(state.auth.id);
            }
        )
    }
}

const mapDispatchToProps = {
    requestServerList,
    requestFriendList,
    requestMessageList,
    requestChannelList,
    selectChannelAuto,
    selectServer,
    selectFriend,
    showFriends,
    showServers,
    getAllUsers
}

export default connect(mapsStateToProps, mapDispatchToProps)(ContactList); 
