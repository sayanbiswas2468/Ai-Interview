'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

const LiveVideo = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [chunks, setChunks] = useState([]);

  useEffect(() => {
    const handleFullScreenChange = () => {
      const isFullScreenActive =
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement;
      setIsFullScreen(!!isFullScreenActive);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
    document.addEventListener('mozfullscreenchange', handleFullScreenChange);
    document.addEventListener('MSFullscreenChange', handleFullScreenChange);

    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (e) => {
          if (e.data.size > 0) {
            setChunks((prev) => [...prev, e.data]);
          }
        };

        mediaRecorderRef.current.start(1000); 
      } catch (error) {
        console.error('Error accessing the camera:', error);
        alert('Please allow camera and microphone access to proceed.');
      }
    };

    getMedia();

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullScreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullScreenChange);

      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }

      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const enterFullScreen = () => {
    const docEl = document.documentElement;
    if (docEl.requestFullscreen) {
      docEl.requestFullscreen();
    } else if (docEl.mozRequestFullScreen) {
      docEl.mozRequestFullScreen();
    } else if (docEl.webkitRequestFullscreen) {
      docEl.webkitRequestFullscreen();
    } else if (docEl.msRequestFullscreen) {
      docEl.msRequestFullscreen();
    }
  };

  const sendChunksToAPI = async () => {
    const blob = new Blob(chunks, { type: 'video/webm' });
    const formData = new FormData();
    formData.append('file', blob, 'recording.webm');

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        alert('Recording uploaded successfully!');
        setChunks([]);
      } else {
        console.log('Failed to upload the recording.');
      }
    } catch (error) {
      console.error('Error uploading the recording:', error);
    }
  };

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.onstop = () => sendChunksToAPI();
        mediaRecorderRef.current.stop();
      }
    };
  }, [chunks]);

  return (
    <div className='flex flex-col items-center justify-center h-screen '>
      <div className='bg-[#0e0e0ee3] rounded-2xl w-[90vw] h-[90vh] flex justify-center items-center flex-col'>
        <div className='text-white border-2 w-[80%] bg-black py-4 px-6 rounded-2xl flex flex-col items-center gap-y-5'>
          <h1 className='text-4xl font-bold text-center mb-4'>Question</h1>
          <p className='text-2xl text-center'>
            What motivates you to achieve your goals, and can you share an example of a time when you overcame a significant challenge?
          </p>
        </div>
        <div className='w-[30%] aspect-video flex items-center mt-8'>
          <video
            ref={videoRef}
            className='w-full h-full object-cover transform scale-x-[-1] rounded-2xl'
            autoPlay
            muted
          ></video>
        </div>
        <div className='w-full flex justify-between px-8 mt-4 '>
          <Button className="bg-orange-700 text-white px-4 text-xl py-2 rounded-lg hover:bg-orange-600 w-[12vw] ">
            Prev
          </Button>
          <Link href='/test-comp'>
            <Button className="bg-orange-700 text-white px-4 py-2 text-xl rounded-lg hover:bg-orange-600 w-[12vw]">
              Next
            </Button>
          </Link>
        </div>
        {!isFullScreen && (
          <Button
            onClick={enterFullScreen}
            className="bg-orange-700 text-white px-4 py-2 rounded mt-4 hover:bg-white hover:text-black"
          >
            Enter Full Screen
          </Button>
        )}
      </div>
    </div>
  );
};

export default LiveVideo;
