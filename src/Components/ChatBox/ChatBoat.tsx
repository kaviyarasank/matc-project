import{ useState } from "react";
import API from "./API";
import BotMessage from "./BotMessage";
import "./ChatBot.scss";
import Header from "./Header";
import Input from "./Input";
import Messages from "./Message";
// import Dictaphone1 from "./SpeechRecognition";
import UserMessage from "./UserMessage";
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import "./ChatBot.scss";

function Chatbot() {
  const [messages, setMessages] = useState<any>([]);

  // useEffect(() => {
  //   async function loadWelcomeMessage() {
  //     setMessages([
  //       <Dictaphone1
  //       voice={voice}
  //       />
  //     ]);
      
  //   }
  //   loadWelcomeMessage();
  // }, []);

  const send = async (text: string) => {
    const newMessages = messages.concat(
      <UserMessage key={messages.length + 1} text={text} />,
      <BotMessage
        key={messages.length + 2}
        fetchMessage={async () => await API.GetChatbotResponse(text)}
      />
    );
    setMessages(newMessages);
  };
  // const [message, setMessage] = useState('');
  // const commands = [
  //   {
  //     command: 'reset',
  //     callback: () => resetTranscript()
  //   },
  //   {
  //     command: 'shut up',
  //     callback: () => setMessage('I wasn\'t talking.')
  //   },
  //   {
  //     command: 'Hello',
  //     callback: () => setMessage('Hi there!')
  //   },
  // ]
  // const {
  //   transcript,
  //   interimTranscript,
  //   finalTranscript,
  //   resetTranscript,
  //   listening,
  // } = useSpeechRecognition({ commands });


  // useEffect(() => {
  //   if (finalTranscript !== '') {
  //     console.log('Got final result:', finalTranscript);
  //     <BotMessage
  //     fetchMessage={async () => await API.GetChatbotResponse(finalTranscript)}
  //   />
  //   setMessages(transcript)
  //   }
  // }, [interimTranscript, finalTranscript, transcript]);
  // if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
  //   return null;
  // }
 
  // if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
  //   console.log('Your browser does not support speech recognition software! Try Chrome desktop, maybe?');
  // }
  // const listenContinuously = () => {
  //   SpeechRecognition.startListening({
  //     continuous: true,
  //     language: 'en-GB',
  //   });
  // };
  // console.log("propslll",messages)
  

  
  return (
    <div className="chatbot">
      <Header />
      {/* <div>
     <div>
       <span className='choicestext'>
         listening:
         {' '}
         {listening ? 'on' : 'off'}
       </span>
       <div className='speechReg mt-5'>
         <Button onClick={resetTranscript} name={"Reset"}></Button>
         <Button onClick={listenContinuously} name={"Listen"}></Button>
         <Button onClick={SpeechRecognition.stopListening} name={"Stop"}></Button>
       </div>
     </div>
     <div>
       {message}
     </div>
     <div>
       <span >{transcript}</span>
     </div>
   </div> */}
      <Messages messages={messages} />
      <Input onSend={send} />
    </div>
  );
}
export default Chatbot;