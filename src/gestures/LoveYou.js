import {Finger, FingerCurl , FingerDirection , GestureDescription} from "fingerpose"

export const loveyouGesture = new GestureDescription("Love_you");

// thumb
loveyouGesture.addCurl(Finger.Thumb,FingerCurl.NoCurl,3);
loveyouGesture.addDirection(Finger.Thumb,FingerDirection.HorizontalRight,1);
loveyouGesture.addDirection(Finger.Thumb,FingerDirection.HorizontalLeft,1);

// index
loveyouGesture.addCurl(Finger.Index,FingerCurl.NoCurl,3);
loveyouGesture.addDirection(Finger.Index,FingerDirection.VerticalUp,1);

// Pinky
loveyouGesture.addCurl(Finger.Pinky,FingerCurl.NoCurl,3);
loveyouGesture.addDirection(Finger.Pinky,FingerDirection.VerticalUp,1);

// Middles
loveyouGesture.addCurl(Finger.Middle,FingerCurl.FullCurl,1);
loveyouGesture.addDirection(Finger.Middle,FingerDirection.VerticalDown,1);

// ring
loveyouGesture.addCurl(Finger.Ring,FingerCurl.FullCurl,1);
loveyouGesture.addDirection(Finger.Ring,FingerDirection.VerticalDown,1);