import './App.css';
import React, { useState, useEffect } from 'react'
import { FormControl, InputLabel, Input } from '@material-ui/core'
import Message from './Message';
import {db} from './firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import {IconButton} from '@material-ui/core';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  useEffect(()=> {
    //run code here
    //code will run onily once if the [] is empty
    setUsername(prompt('Enter your user name'));
  }, [])

  useEffect(()=>{
    db.collection('messages')
    .orderBy('timestamp','desc')
    .onSnapshot(snapshot => {
     setMessages(snapshot.docs.map(doc => ({id:doc.id, message:doc.data()}))) 
    });
  },[])

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
  /*const sendMessage = (e) => {
    e.preventDefault();
    setMessages([...messages, {username: username, message: input}]);
  }*/
  setInput('');
  }
  return (
    <div className="App">
      <h1>Facebook Messanger</h1>
      <h2>Welcome {username}</h2>
      <form className='app__form'>
        <FormControl className='app__formControl'>
          <Input className="app__input" placeholder='Enter Message' value={input} onChange={e => setInput(e.target.value)} />
          <IconButton className="app__iconButton" disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}>
            <SendIcon/>
          </IconButton>
          {/*<Button disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}>Send Message</Button>*/}
        </FormControl>
        {/*<input value={input} onChange={e => setInput(e.target.value)} />*/}

      </form>
      <FlipMove>
      {
        messages.map(({id, message}) => (
          <Message key={id} username={username} message={message}/>
        ))
      }
      </FlipMove>
    </div>
  );
}

export default App;
