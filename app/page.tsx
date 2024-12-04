'use client'
import Guidelines from '@/components/custom/Guidelines'
import Sidebar from '@/components/custom/Sidebar'
import { useState } from 'react'
import Hero from '../components/custom/Hero'
import Loader from '@/components/custom/Loader'
const Home = () => {
  const [trigger, setTrigger] = useState(false)
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setTrigger((prev) => !prev)
  }
  const checkPermissions = async () => {
    setLoading(true);
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setPermissionsGranted(true);
    } catch (error) {
      if (error instanceof DOMException) {
        if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
          if (error.message.includes("display")) {
            console.error("Screen-sharing permission denied:", error);
            alert("Please grant screen-sharing permissions to proceed.");
          } else {
            console.error("Camera or microphone permission denied:", error);
            alert("Please grant camera and microphone permissions to proceed.");
          }
        } else {
          console.error("An unexpected error occurred:", error);
          alert("An error occurred while checking permissions. Please try again.");
        }
      } else {
        console.error("Unknown error:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Hide loader
    }
  };



  return (
    <div className=' h-screen flex flex-col'>
      <Hero onButtonClick={handleClick} />
      <Guidelines trigger={trigger} setTrigger={setTrigger} checkPermissions={checkPermissions} />
      <Sidebar />
      {loading && <Loader />}
    </div>
  )
}
export default Home