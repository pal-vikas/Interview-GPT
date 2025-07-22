import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

  const recognition = new (  window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.continuous = true;
  recognition.interimResults = true;

function App() {

  const[isListening, setisListening ] = useState(false);
  const[transcript, settranscript] = useState('');
  const [feedbackLoadingStatus, setfeedbackLoadingStatus ] = useState(false);

  //speech recognition

  useEffect(()=>{

    recognition.onresult =(e)=>{
        const current = e.resultIndex;
        const transcript = e.results[current][0].transcript;
        settranscript(transcript);

    } 

    recognition.onend =()=>{
      setisListening(false);
      getFeedback();
    }

  }, [isListening])

 
  function handleStopListening()
  {
        setisListening(false)
        recognition.stop();
        getFeedback();
        
  }

  function handleStartListening()
  {
      setisListening(true);
      recognition.start();
  }


  function getFeedback ()
  {
    setfeedbackLoadingStatus(true);
  }

  return (
    <>
          <div className="w-full h-screen overflow-hidden">
            <div className="max-w-4xl mx-auto">
              <div className="max-w-xl">
                <h1 className='text-xl font-semibold mt-24'>What is variable in Javascript ?</h1>

                <p className='mt-10'>Record your answer</p>
                <p className='text-sm text-neutral-700 mb-5'>Try to answer the question in an accurate manner and to the points in max 2 minutes & then the assistant will analyze your answer and give you Feedback.</p>
                  <button onClick={isListening ? handleStopListening : handleStartListening} className={` py-2 px-5 rounded-full text-white cursor-pointer ${isListening ? 'bg-black' : 'bg-green-600'} `}>{isListening ? 'Submit Answer ' : 'Start Answering' }</button>
                  <p className='text-red-600 mt-8'>{transcript}</p>
              </div>
                {/*. Feedback Container  */}
                <div className="">
                  <p>{feedbackLoadingStatus ? 'Loading Feedback' : "Click on submit to analyze"}</p>
                </div>
            </div>
          </div>
    </>
  )
}

export default App





