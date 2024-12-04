'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { useEffect, useState } from "react";

interface InsProps {
    trigger: boolean;
    setTrigger: (value: boolean) => void;
    checkPermissions: () => void;
}

const Guidelines: React.FC<InsProps> = ({ trigger, setTrigger, checkPermissions }) => {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        if (trigger) {
            setIsOpen(true);
        }
    }, [trigger]);

    const handleClose = () => {
        setIsOpen(false)
        setTrigger(false)
    };
    return (
        <div>
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent className="bg-black text-white text-lg">
                    <AlertDialogHeader >
                        <AlertDialogTitle className="text-2xl">Guidelines</AlertDialogTitle>
                        <AlertDialogDescription className="flex flex-col text-lg ">
                            <span>
                                1. Ensure your device settings and browser allow camera
                            </span>
                            <span className="ml-[1.2rem]">
                                access for the interview platform.
                            </span>
                            <span>
                                2. Align the camera at eye level for natural eye contact,
                            </span>
                            <span className="ml-[1.2rem]">
                                and ensure your face is well-lit and visible.
                            </span>
                            <span>
                                3. Avoid moving the camera during the interview.

                            </span>
                            <span>
                                4. Grant microphone permission for the platform through
                            </span>
                            <span className="ml-[1.2rem]">your device or browser settings.</span>
                            <span>
                                5. Enable screen-sharing permissions in browser or system
                            </span>
                            <span className="ml-[1.2rem]">settings.</span>

                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="text-black hover:bg-gray-300" onClick={handleClose}>Cancel</AlertDialogCancel>
                        <Link href='/video-test'>
                            <AlertDialogAction className="bg-orange-700 hover:bg-orange-500 " onClick={() => {
                                handleClose()
                                checkPermissions()
                            }}>
                                Continue
                            </AlertDialogAction>
                        </Link>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
export default Guidelines