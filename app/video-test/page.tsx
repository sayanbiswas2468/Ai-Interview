'use client';
import CheckBox from '@/components/custom/CheckBox';
import { Button } from '@/components/ui/button';
import Loader from '@/components/custom/Loader';
import { useEffect, useRef, useState } from 'react';

const Permissions: React.FC = () => {
  const cameraVideoRef = useRef<HTMLVideoElement | null>(null);
  const screenVideoRef = useRef<HTMLVideoElement | null>(null);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [screenSharingGranted, setScreenSharingGranted] = useState(false);
  const [microphoneGranted, setMicrophoneGranted] = useState(false);
  const [speakerChecked, setSpeakerChecked] = useState(false);
  const [stopSpeaker, setStopSpeaker] = useState(false);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const requestCameraAccess = async (): Promise<void> => {
    setLoading(true); 
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setPermissionsGranted(true);
      if (cameraVideoRef.current) {
        cameraVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing the camera:', error);
      alert('Please grant camera permissions to proceed.');
    } finally {
      setLoading(false); 
    }
  };

  const requestMicrophoneAccess = async (): Promise<void> => {
    setLoading(true); 
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicrophoneGranted(true);
    } catch (error) {
      console.error('Error accessing the microphone:', error);
      alert('Please grant microphone permissions to proceed.');
    } finally {
      setLoading(false);
    }
  };

  const requestScreenSharingAccess = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      setScreenSharingGranted(true);
      if (screenVideoRef.current) {
        screenVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing screen sharing:', error);
      alert('Please grant screen-sharing permissions to proceed.');
    } 
  };

  const checkSpeaker = (): void => {
    setLoading(true); 
    const audio = new Audio('/sample-audio.mp3');
    audioRef.current = audio;
    audio.addEventListener('canplaythrough', () => {
      console.log('Audio is ready to play.');
    });

    audio.addEventListener('error', (e) => {
      console.error('Error loading audio:', e);
      alert('Failed to load the audio. Check the file path or format.');
    });

    audio
      .play()
      .then(() => {
        setStopSpeaker(true);
        console.log('Audio playback started successfully.');
      })
      .catch((error) => {
        console.error('Error playing audio:', error);
        alert('Unable to play audio. Please check your speaker.');
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  const stopAudio = (): void => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      console.log('Audio playback stopped.');
    }
    setSpeakerChecked(true);
    setStopSpeaker(false);
  };

  useEffect(() => {
    requestCameraAccess();
    requestMicrophoneAccess();
    return () => {
      if (cameraVideoRef.current?.srcObject instanceof MediaStream) {
        const cameraTracks = cameraVideoRef.current.srcObject.getTracks();
        cameraTracks.forEach((track: MediaStreamTrack) => track.stop());
      }

      if (screenVideoRef.current?.srcObject instanceof MediaStream) {
        const screenTracks = screenVideoRef.current.srcObject.getTracks();
        screenTracks.forEach((track: MediaStreamTrack) => track.stop());
      }

      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="flex flex-row text-white">
      {loading && <Loader />}
      <div className="bg-[#0e0e0e] border-4 border-[#0e0e0e] rounded-lg w-[80vw] h-[80vh] flex justify-center items-center mt-[5%] ml-[2%]">
        <div className="w-[80%] mt-[5%] aspect-video flex flex-col items-center space-y-4">
          <video
            ref={cameraVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover transform scale-x-[-1] rounded-2xl"
          ></video>

          <div className="flex items-center justify-center gap-5">
            {!permissionsGranted && (
              <Button
                onClick={requestCameraAccess}
                className="px-4 py-2 text-white bg-orange-700  hover:bg-orange-500 rounded w-[15rem]"
              >
                Request Camera Access
              </Button>
            )}

            {!microphoneGranted && (
              <Button
                onClick={requestMicrophoneAccess}
                className="px-4 py-2 text-white bg-orange-700  hover:bg-orange-500 rounded w-[15rem]"
              >
                Grant Microphone Access
              </Button>
            )}

            {!screenSharingGranted && (
              <Button
                onClick={requestScreenSharingAccess}
                className="px-4 py-2 text-white bg-orange-700  hover:bg-orange-500 rounded w-[15rem]"
              >
                Grant Screen Sharing Access
              </Button>
            )}
            {!stopSpeaker ? (
              <Button
                onClick={checkSpeaker}
                className="px-4 py-2 text-white bg-orange-700  hover:bg-orange-500 rounded w-[15rem]"
              >
                Check Speaker
              </Button>
            ) : (
              <Button
                onClick={stopAudio}
                className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded"
              >
                Stop Audio
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-[#0e0e0e] border-4 border-[#0e0e0e] rounded-lg w-[34vw] h-[80vh] flex justify-center items-center mt-[5%] ml-[2%] mr-[2%]">
        <div className="mt-6 space-y-4">
          <CheckBox
            cameraPermission={permissionsGranted}
            screenSharePermission={screenSharingGranted}
            microphonePermission={microphoneGranted}
            speakerChecked={speakerChecked}
          />
        </div>
      </div>
    </div>
  );
};
export default Permissions;
