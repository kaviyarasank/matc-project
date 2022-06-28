import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Button from '../CustomButton/Button';
import "./ChatBot.scss";
type SubItemProps={
  voice: any;
}
const Dictaphone1 = ({voice}:SubItemProps) => {
 const [message, setMessage] = useState('');
 const commands = [
   {
     command: 'reset',
     callback: () => resetTranscript()
   },
   {
     command: 'shut up',
     callback: () => setMessage('I wasn\'t talking.')
   },
   {
     command: 'Hello',
     callback: () => setMessage('Hi there!')
   },
 ]
 const {
   transcript,
   interimTranscript,
   finalTranscript,
   resetTranscript,
   listening,
 } = useSpeechRecognition({ commands });

 useEffect(() => {
   if (finalTranscript !== '') {
     console.log('Got final result:', finalTranscript);
   }
 }, [interimTranscript, finalTranscript]);
 if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
   return null;
 }

 if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
   console.log('Your browser does not support speech recognition software! Try Chrome desktop, maybe?');
 }
 const listenContinuously = () => {
   SpeechRecognition.startListening({
     continuous: true,
     language: 'en-GB',
   });
 };
 const handle=()=>{
   voice(transcript)
 }
 return (
   <div>
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
       <span onChange={handle}>{transcript}</span>
     </div>
   </div>
 );
};

export default Dictaphone1;