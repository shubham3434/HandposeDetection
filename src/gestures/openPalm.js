import {Finger, FingerCurl , FingerDirection , GestureDescription} from "fingerpose"

export const openPalmGesture = new GestureDescription("Open Palm");

// thumb
openPalmGesture.addCurl(Finger.Thumb,FingerCurl.NoCurl,2);
openPalmGesture.addDirection(Finger.Thumb,FingerDirection.HorizontalRight,1);
openPalmGesture.addDirection(Finger.Thumb,FingerDirection.HorizontalLeft,1);

// index
openPalmGesture.addCurl(Finger.Index,FingerCurl.NoCurl,2);
openPalmGesture.addDirection(Finger.Index,FingerDirection.VerticalUp,1);
openPalmGesture.addDirection(Finger.Index,FingerDirection.DiagonalUpRight,1);

// Pinky
openPalmGesture.addCurl(Finger.Pinky,FingerCurl.NoCurl,2);
openPalmGesture.addDirection(Finger.Pinky,FingerDirection.VerticalUp,1);
openPalmGesture.addDirection(Finger.Pinky,FingerDirection.DiagonalUpLeft,1);

// Middles
openPalmGesture.addCurl(Finger.Middle,FingerCurl.NoCurl,2);
openPalmGesture.addDirection(Finger.Middle,FingerDirection.VerticalUp,1);

// ring
openPalmGesture.addCurl(Finger.Ring,FingerCurl.NoCurl,2);
openPalmGesture.addDirection(Finger.Ring,FingerDirection.VerticalUp,1);