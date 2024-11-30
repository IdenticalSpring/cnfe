import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ChatBubbleOutline, Close, Send, Person, Computer } from '@mui/icons-material';
import { userAPI } from '@/service/user';

const ChatBoxContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  height: 500px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.3s ease;
  transform: ${props => (props.isVisible ? 'scale(1)' : 'scale(0.8)')};
  opacity: ${props => (props.isVisible ? '1' : '0')};
  pointer-events: ${props => (props.isVisible ? 'auto' : 'none')};
`;

const MessageContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 15px;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 15px;
  background-color: white;
  border-top: 1px solid #eaeaea;
`;

const CodeButton = styled.button`
  width: 50%;
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 12px;
  padding: 5px;
  margin: 10px auto;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #c53030;
    transform: scale(1.05);
  }
`;

const ChatHeader = styled.div`
  background-color: #e53e3e;
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
`;


const MessageContent = styled.p`
  margin: 0;
  font-size: 14px;
`;


const MessageInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  margin-right: 10px;
  font-size: 16px;
  outline: none;
  
  &:focus {
    border-color: #e53e3e;
    box-shadow: 0 0 5px rgba(229, 62, 62, 0.3);
  }
`;

const SendButton = styled.button`
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #c53030;
  }

  &:disabled {
    background-color: #fed7d7;
    cursor: not-allowed;
  }
`;

const ToggleChatButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #c53030;
    transform: scale(1.1);
  }
`;

const SenderLabel = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
`;

const SenderIcon = styled.span`
  margin-right: 8px;
  display: flex;
  align-items: center;
  
  svg {
    width: 16px;
    height: 16px;
    ${props => props.type === 'user'
        ? 'color: #e53e3e;'
        : 'color: #2c5282;'}
  }
`;

const SenderName = styled.span`
  font-weight: 500;
  ${props => props.type === 'user'
        ? 'color: #e53e3e;'
        : 'color: #2c5282;'}
`;

const MessageBubble = styled.div`
  max-width: 80%;
  margin-bottom: 15px;
  padding: 12px 15px;
  border-radius: 15px;
  clear: both;
  position: relative;
  
  ${props =>
        props.type === 'user'
            ? `
        align-self: flex-end; 
        background-color: #e53e3e; 
        color: white; 
        border-bottom-right-radius: 5px;
        &::before {
          content: '';
          position: absolute;
          bottom: 0;
          right: -7px;
          width: 0;
          height: 0;
          border-left: 10px solid #e53e3e;
          border-top: 10px solid transparent;
        }
      `
            : `
        align-self: flex-start; 
        background-color: #f0f4f8; 
        color: #2d3748; 
        border-bottom-left-radius: 5px;
        &::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: -7px;
          width: 0;
          height: 0;
          border-right: 10px solid #f0f4f8;
          border-top: 10px solid transparent;
        }
      `
    }
`;
// Thêm nút Lấy đề bài
const DescriptionButton = styled.button`
  width: 50%;
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 12px;
  padding: 5px;
  margin: 10px auto;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2b6cb0;
    transform: scale(1.05);
  }
`;

// Thêm một container để chứa cả 2 nút
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 15px;
`;

// Thay đổi code trong ChatBox để sử dụng ButtonContainer
const ChatBox = ({ code, problemTitle, problemDescription }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const toggleChat = () => setIsVisible((prev) => !prev);

    const handleSendMessage = async (userMessage) => {
        if (userMessage.trim()) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: userMessage, type: 'user' },
            ]);
            setMessage('');  // Reset message input

            const historyMessages = messages.slice(-5);
            const prompt = historyMessages
                .map((msg) => `${msg.type === 'user' ? 'User' : ''} ${msg.text}`)
                .join('\n') + `\nUser ${userMessage}`;

            try {
                console.log('Prompt sent to API:', prompt);
                // Gửi prompt tới API
                const result = await userAPI.generateContent(prompt);
                console.log('API Response:', result);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: result, type: 'gemini' },
                ]);
            } catch (error) {
                console.error('Error while sending message to API:', error);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: 'Sorry, there was an error processing your request.', type: 'gemini' },
                ]);
            }
        }
    };

    const handleCodeSubmit = () => {
        if (code) {
            setMessage(`Đây là code của tôi:${code}`);
        }
    };

    const handleProblemSubmit = () => {
        if (problemTitle && problemDescription) {
            setMessage(`Đề bài của tôi:${problemTitle}: ${problemDescription}`);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage(message);
        }
    };

    return (
        <>
            <ToggleChatButton onClick={toggleChat}>
                {isVisible ? <Close /> : <ChatBubbleOutline />}
            </ToggleChatButton>

            <ChatBoxContainer isVisible={isVisible}>
                <ChatHeader>
                    Support Chat
                    <Close onClick={toggleChat} style={{ cursor: 'pointer' }} />
                </ChatHeader>

                <MessageContainer>
                    {messages.map((msg, idx) => (
                        <MessageBubble key={idx} type={msg.type}>
                            <MessageContent>{msg.text}</MessageContent>
                        </MessageBubble>
                    ))}
                    <div ref={messagesEndRef} />
                </MessageContainer>

                {/* Container chứa 2 nút */}
                <ButtonContainer>
                    {/* Nút Lấy đề bài */}
                    <DescriptionButton onClick={handleProblemSubmit}>Lấy đề bài</DescriptionButton>

                    {/* Nút Lấy code */}
                    <CodeButton onClick={handleCodeSubmit}>Kéo code</CodeButton>
                </ButtonContainer>

                <InputContainer>
                    <MessageInput
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                    />
                    <SendButton onClick={() => handleSendMessage(message)} disabled={!message.trim()}>
                        <Send />
                    </SendButton>
                </InputContainer>
            </ChatBoxContainer>
        </>
    );
};

export default ChatBox;
