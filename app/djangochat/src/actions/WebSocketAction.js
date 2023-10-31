import { baseWebsocketUrl } from '../config/config';
import { toastr } from 'react-redux-toastr'

import { requestFriendList } from "./FriendAction";
import { requestServerList } from "./ServerAction";

export function initWebSocket() {
    return (dispatch, getState) => {
        document.cookie = `token=${getState().auth.token}; max-age=1;`;
        let ws = new WebSocket(
            baseWebsocketUrl);

        ws.onopen = () => {
            ws.onmessage = (e) => {
                if (e.data) {
                    let data = JSON.parse(e.data);
                    if (data.hasOwnProperty('message')) {
                        let message = data.message;
                        if (Number(message.channel_id) === Number(getState().channel.activeChannelId)) {
                            ws.dispatchEvent(new CustomEvent("displayMessage", { detail: message }));
                        } else {
                            const messageType = message.direct_type;
                            if (messageType) {
                                toastr.info(message.friend_name, message.text);
                            } else {
                                toastr.info(`${message.server_name} - ${message.channel_name}`, `${message.user.username} : ${message.text}`);
                            }
                        }
                    } else if (data.hasOwnProperty('notification')) {
                        let notification = data.notification;

                        toastr.success(notification.title, notification.text);
                        if (notification.type === 'server')
                            dispatch(requestServerList()).catch(()=>{
                                toastr.error("Error","Impossible to retrieve servers list")
                            });
                        else if (notification.type === 'friend')
                            dispatch(requestFriendList()).catch(()=>{
                                toastr.error("Error","Impossible to retrieve friend list")
                            });
                    } else if (data.hasOwnProperty('action')) {
                        let action=data.action;
                        if(action.type==='user_added')
                            ws.dispatchEvent(new CustomEvent("userAdded",{detail:action}));
                        else if(action.type==='channel_created')
                            ws.dispatchEvent(new CustomEvent("channelCreated",{detail:action}));
                    }
                }
            };
        };

        dispatch(_connectWS(ws));

    };
}

export function connectChannel(channel_id) {
    return (dispatch, getState) => {
        if (getState().ws.ws.readyState === WebSocket.OPEN) {
            getState().ws.ws.send(JSON.stringify({
                connectChannel: {
                    id: channel_id
                }
            }));
        }
    };
}

function _connectWS(data) {
    return {
        type: 'CONNECT_WS',
        payload: data
    }
}