import { useState,useRef } from 'react'
import './App.css'
import Webcam from 'react-webcam'
import * as handpose from '@tensorflow-models/handpose'
// require('@tensorflow/tfjs-backend-webgl');
import '@tensorflow/tfjs-backend-webgl'
import '@tensorflow/tfjs-core'
import "@tensorflow/tfjs-converter"
import * as fp from "fingerpose"
import { loveyouGesture } from './gestures/LoveYou'
import { openPalmGesture } from './gestures/openPalm'

function App() {
  const webcamref = useRef(null);
  const canvasref = useRef(null);
  const [detectedGestuer, setdetectedGestuer] = useState(null)

    const draw = (predictions,ctx)=>{
      predictions.forEach((prediction)=>{
        const landmarks = prediction.landmarks;
        let prev = landmarks[0];
        for(let i=0;i<landmarks.length;i++){
          if(i!=0){
            if(i%4==1) prev = landmarks[0];
            ctx.beginPath();
            ctx.moveTo(prev[0],prev[1]);
            ctx.lineTo(landmarks[i][0],landmarks[i][1]);
            ctx.strokeStyle = "plum";
            ctx.lineWidth = 4;
            ctx.stroke();
          }
           prev = landmarks[i];
           const x = landmarks[i][0];
           const y = landmarks[i][1];
           ctx.beginPath();
           ctx.arc(x,y,5,0,3*Math.PI);
           ctx.fill();
        }
      })
    }

    const detect = async(model,video)=>{
      const ctx = canvasref.current.getContext("2d");
      ctx.clearRect(0,0,canvasref.current.width,canvasref.current.height)
      // const predictions = await model.estimateHands(video); 
      const predictions = await model.estimateHands(document.querySelector("video")); 
      // console.log(predictions);
       if(predictions.length>0){
        const GE = new fp.GestureEstimator([
          fp.Gestures.VictoryGesture,
          fp.Gestures.ThumbsUpGesture,
          loveyouGesture,
          openPalmGesture
      ]);    
      const estimatedGestures = GE.estimate(predictions[0].landmarks, 8);
      // console.log(estimatedGestures);
      if(estimatedGestures.gestures!== undefined && estimatedGestures.gestures.length>0){
        const confidence = estimatedGestures.gestures.map((prediction)=> prediction.score);
        const maxconfidence = confidence.indexOf(
          Math.max.apply(null,confidence)
        );
        setdetectedGestuer(estimatedGestures.gestures[maxconfidence].name);
      }
        draw(predictions,ctx)
      }
      else{
        setdetectedGestuer(null);
      }
     }


  async function handss(){
    const model = await handpose.load();
    let video = null;
    if(webcamref.current != undefined && webcamref.current!=null){
      video = webcamref.current.video;
    }
    if(video==null){
      console.log("failed to load video");
      return;
    }
    const vheight = video.videoHeight;
    const vwidth = video.videoWidth;
    canvasref.current.width = vwidth;
    canvasref.current.height = vheight;
    setInterval(() => {
      detect(model,video)
    }, 100);
  }


  return (
    <>
    <div className='flex flex-col h-screen justify-center bg-neutral-800'>
      <Webcam ref={webcamref} style={
        {
          position:"absolute",
          marginLeft:"auto",
          marginRight:"auto",
          left:0,
          right:0,
          textAlign:"center",
          zIndex:9,
          width:640,
          height:480
        }
      }/>
      <canvas ref={canvasref} style={
        {
          position:"absolute",
          marginLeft:"auto",
          marginRight:"auto",
          left:0,
          right:0,
          textAlign:"center",
          zIndex:9,
          width:640,
          height:480
        }
      } />
      <div className='relative top-72 flex justify-center gap-60'>
      <button className='bg-blue-200 w-20 p-2 text-xl rounded-xl' onClick={handss}>Start</button>
      <div className='flex flex-col justify-center font-bold text-xl text-white '>Gesture Prediction: {detectedGestuer} </div>
      </div>
    </div>
    </>
     
  )
}

export default App
