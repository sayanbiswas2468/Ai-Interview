const Page = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="text-white flex flex-col font-lexend justify-center items-center border-4 p-8 rounded-xl w-[50vw] bg-[#0e0e0e]">
                <h1 className="text-6xl text-center">You have successfully completed the test.</h1>
                <p className="text-xl text-center mt-4">We'll be in touch shortly.</p>
                <p className="text-[#4f4f4f] mt-3">You may close the window now !</p>
            </div>
        </div>
    );
};

export default Page;
