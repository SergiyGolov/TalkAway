import React, {
    Component
} from 'react';
import MessageComponent from './Message/Message';
import ChatInputComponent from './ChatInput/ChatInput';

class MiddlePane extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageList: props.messageList
        };

    }

    render() {

        let messageList = [];

        Object.keys(this.state.messageList).forEach(key => {
            messageList.push(React.createElement(MessageComponent, {
                'messageObject': this.state.messageList[key],
                'key': key
            }));
        });

        return (
            <div>
                {messageList}
                <ChatInputComponent/>
            </div>
        );
    }
}

export default MiddlePane;