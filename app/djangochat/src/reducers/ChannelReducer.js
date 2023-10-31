const channelReducer = (state = {
    channels: [],
    activeChannelId: 0,
    newMessageChannelId: []
}, action) => {
    switch (action.type) {
        case "SELECT_CHANNEL":
            state = {
                ...state,
                activeChannelId: action.payload.channelId
            }
            break;
        case "SEND_MESSAGE":
            //state = state + action.value;
            break;
        case "CREATE_CHANNEL":
            state = {
                ...state,
                channels: [...state.channels, action.payload]
            }
            break;
        case "LIST_CHANNEL":
            const oldChannels = state.channels.filter(c => c.serverId === action.payload.serverId);
            let newChannels = [...action.payload.channels,oldChannels];
            let jsonObject = newChannels.map(JSON.stringify);
            let uniqueSet = new Set(jsonObject);
            const uniqueArray = Array.from(uniqueSet).map(JSON.parse);
            state = {
                ...state,
                channels: [...uniqueArray]
            }
            break;
        case "LOGOUT":
            state = {
                channels:[],
                activeChannelId: 0,
                newMessageChannelId: []
            }
            break;
        default:
    }
    return state;
};

export default channelReducer;
