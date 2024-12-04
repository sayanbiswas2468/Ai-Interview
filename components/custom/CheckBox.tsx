import { Cast, Mic, Video, Volume2 } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useState } from "react";
import Instructions from "./Instructions";
import Loader from "./Loader";

interface CheckBoxProps {
    cameraPermission: boolean;
    screenSharePermission: boolean;
    microphonePermission: boolean;
    speakerChecked: boolean;
}

const CheckBox: React.FC<CheckBoxProps> = ({
    cameraPermission,
    screenSharePermission,
    microphonePermission,
    speakerChecked,
}) => {
    const allChecked =
        cameraPermission &&
        screenSharePermission &&
        microphonePermission &&
        speakerChecked;
    const [trigger, setTrigger] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);
        setTimeout(() => {
            setTrigger((prev) => !prev);
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="relative flex flex-col gap-y-8 font-lexend">
            {loading && <Loader />}

            {!loading && (
                <>
                    <div className="flex items-center border-2 border-orange-700 p-3 rounded-md w-[23vw]">
                        <Video className="mr-2" />
                        <Label htmlFor="camera" className="text-xl flex-1 ml-7">
                            Check Camera
                        </Label>
                        <Checkbox
                            id="camera"
                            className="h-6 w-6 text-orange-700 border-2 border-white rounded-md "
                            checked={cameraPermission}
                            disabled
                        />
                    </div>
                    <div className="flex items-center border-2 border-orange-700 p-3 rounded-md w-[23vw]">
                        <Mic className="mr-2" />
                        <Label
                            htmlFor="microphone"
                            className="text-xl flex-1 ml-7"
                        >
                            Check Microphone
                        </Label>
                        <Checkbox
                            id="microphone"
                            className="h-6 w-6 text-orange-700 border-2 border-white rounded-md"
                            checked={microphonePermission}
                            disabled
                        />
                    </div>
                    <div className="flex items-center border-2 border-orange-700 p-3 rounded-md w-[23vw]">
                        <Volume2 className="mr-2" />
                        <Label htmlFor="speaker" className="text-xl flex-1 ml-7">
                            Check Speaker
                        </Label>
                        <Checkbox
                            id="speaker"
                            className="h-6 w-6 text-orange-700 border-2 border-white rounded-md"
                            checked={speakerChecked}
                            disabled
                        />
                    </div>
                    <div className="flex items-center border-2 border-orange-700 p-3 rounded-md w-[23vw]">
                        <Cast className="mr-2" />
                        <Label
                            htmlFor="screenShare"
                            className="text-xl flex-1 ml-7"
                        >
                            Enable Screen Share
                        </Label>
                        <Checkbox
                            id="screenShare"
                            className="h-6 w-6 text-orange-700 border-2 border-white rounded-md "
                            checked={screenSharePermission}
                            disabled
                        />
                    </div>
                    <div className="flex justify-center items-center mt-[10vh]">
                        <Button
                            className={`bg-orange-700 hover:bg-white hover:text-black w-[9rem] h-[2.7rem] text-lg font-semibold ${allChecked
                                ? ""
                                : "opacity-50 cursor-not-allowed"
                                }`}
                            disabled={!allChecked}
                            onClick={handleClick}
                        >
                            Start Interview
                        </Button>
                    </div>
                    <Instructions
                        trigger={trigger}
                        setTrigger={setTrigger}
                    />
                </>
            )}
        </div>
    );
};

export default CheckBox;
