'use client'
import { View } from "lucide-react"
import { Button } from "../ui/button"

interface HeroProps {
    onButtonClick: () => void;
}
const Hero: React.FC<HeroProps> = ({ onButtonClick }) => {

    return (
        <div className=" bg-[#0e0e0e] border-2 border-[#0e0e0e] rounded-2xl h-[70%] mt-[2.7%] ml-auto mr-[2.7%] w-[80%] flex flex-row items-center justify-center py-4">
            <div>
                <div className="text-white font-lexend bg-black rounded-2xl absolute top-[10%] w-[18rem] flex justify-center items-center mx-4 ">
                    <View className="text-orange-700" />
                    <h1 >
                        &#8203; Your reliable ai assistant is here
                    </h1>
                </div>
                <div className="flex flex-col p-5 w-[40vw]">
                    <span className="font-lexend text-white text-5xl">
                        The future is better
                    </span >
                    <span className="font-lexend text-[#4f4f4f] text-5xl">
                        with the human &
                    </span>
                    <span className="font-lexend text-[#4f4f4f] text-5xl">
                        machine interaction
                    </span>
                    <span className="font-lexend text-[#4f4f4f] text-sm mt-5">
                        AI-driven solutions for the future combining human insight with machine intelligence to
                        transform industries, where seamless collaboration between humans and technology.
                    </span>
                    <div className="flex flex-row gap-6 mt-[10%]">

                        <Button className="bg-orange-700 text-white hover:bg-orange-500 mt-10 rounded-lg" size={"lg"} onClick={onButtonClick}>
                            Try Now
                        </Button>
                        <h1 className=" mt-12 text-sm text-[#4f4f4f]">
                            Step Into Tomorrow - Unlock Your Potential With Our AI Technology
                        </h1>
                    </div>
                </div>
            </div>
            <div className="w-[40%] h-full bg-interviewImg bg-cover bg-center rounded-2xl border-2 border-[#0e0e0e]"></div>

        </div>
    )
}
export default Hero