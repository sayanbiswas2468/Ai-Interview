const Sidebar = () => {
  return (
    <div className="text-white bg-[#0e0e0e]">
      <button
        data-drawer-target="separator-sidebar"
        data-drawer-toggle="separator-sidebar"
        aria-controls="separator-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm rounded-lg sm:hidden"
      >
        button
      </button>

      <aside
        id="separator-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-[#0e0e0e]"
        aria-label="Sidebar"

      >
        <h1 className="text-3xl font-offside font-bold p-4 flex items-center space-y-2 ml-4" >Zeko.AI</h1>
        <div className="h-full px-3 py-4 overflow-y-auto text-[1rem] font-bold ">
          <ul className="space-y-2 ">
            <li>
              <a href="#" className="flex items-center p-2 rounded-lg">
                <span className="ms-3 text-orange-700">Home</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 rounded-lg">
                <span className="ms-3">Login/Sign Up</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 rounded-lg">
                <span className="ms-3">Report a Problem</span>
              </a>
            </li>
          </ul>
          <ul className="pt-4 mt-4 space-y-2 font-semibold border-t">
            <li>
              <a href="#" className="flex items-center p-2 rounded-lg">
                <span className="ms-3">Help</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 rounded-lg">
                <span className="ms-3">Contact Us</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
