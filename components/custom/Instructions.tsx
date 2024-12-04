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
}

const Instructions: React.FC<InsProps> = ({ trigger, setTrigger }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (trigger) {
            setIsOpen(true);
        }
    }, [trigger]);

    const handleClose = () => {
        setIsOpen(false);
        setTrigger(false);
    };

    const handleStartClick = async () => {
        if (document.documentElement.requestFullscreen) {
            await document.documentElement.requestFullscreen();
        } else if ((document.documentElement as any).webkitRequestFullscreen) {
            // Safari support
            await (document.documentElement as any).webkitRequestFullscreen();
        } else if ((document.documentElement as any).msRequestFullscreen) {
            // IE/Edge support
            await (document.documentElement as any).msRequestFullscreen();
        }
        handleClose();
    };

    return (
        <div>
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent
                    className="bg-black text-white w-[70vw] max-w-[95vw] h-[70vh] max-h-[95vh] p-6 rounded-lg "
                >
                    <AlertDialogHeader className="ml-20 justify-center">
                        <AlertDialogTitle className="text-4xl">Instructions</AlertDialogTitle>
                        <AlertDialogDescription className="flex flex-col text-lg">
                            <span>1. Find a quiet, well-lit room with minimal distractions and background noise.</span>
                            <span>2. Preferably use Google Chrome or Microsoft Edge for compatibility. Ensure it is updated to the latest version.</span>
                            <span>3. A stable connection with a minimum speed of 10 Mbps is recommended. Use a wired connection if possible.</span>
                            <span>4. Ensure your webcam is functional and positioned at eye level.</span>
                            <span>5. Dress in professional or smart-casual attire. Treat this as you would an in-person interview.</span>
                            <span>6. Maintain eye contact by looking at the camera, not the screen.</span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            className="text-black hover:bg-gray-300 w-[5rem]"
                            onClick={handleClose}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <Link href='ques-screen'>
                            <AlertDialogAction
                                className="bg-orange-700 hover:bg-orange-500 w-[5rem]"
                                onClick={handleStartClick}>
                                Start
                            </AlertDialogAction>
                        </Link>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default Instructions;
