import React, { useState } from 'react';
import './App.css';

function App() {
  const [userInput, setUserInput] = useState('');
  const [chatLog, setChatLog] = useState([]);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (userInput.trim() === '') {
      return;
    }

    // Add the user's message to the chat log
    const newUserMessage = { text: userInput, isUser: true };
    setChatLog((prevChatLog) => [...prevChatLog, newUserMessage]);

    // Clear the user input field
    setUserInput('');

    try {
      const response = await fetch('http://localhost:5000/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();
      const chatbotResponse = data.message;

      // Add the chatbot's response to the chat log
      const newChatbotMessage = { text: chatbotResponse, isUser: false };
      setChatLog((prevChatLog) => [...prevChatLog, newChatbotMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="App">
      <div className="chat-window">
        {chatLog.map((message, index) => (
          <div key={index} className={`message ${message.isUser ? 'user' : 'chatbot'}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="user-input">
        <textarea
          placeholder="Type your message..."
          value={userInput}
          onChange={handleUserInput}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
