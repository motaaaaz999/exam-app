import {
  BookOpenCheck,
  Brain,
  FolderCode,
  RectangleEllipsis,
} from "lucide-react";

export default function LoginSidebar() {
  return (
    /*
      Main container with radial gradient background
      - Uses dual radial gradients for visual depth (top-right and bottom-left)
    */
    <div className="h-full  bg-[radial-gradient(circle_at_top_right,_#bfdbfe,_transparent_60%),radial-gradient(circle_at_bottom_left,_#bfdbfe,_transparent_60%)] from-white to-white  p-12 flex  flex-col justify-center items-center">
      {/* Content */}
      <div className="max-w-lg mx-auto  flex flex-col justify-center  font-mono font-semibold   h-full w-full ">
        {/* Header */}
        <header className="text-blue-600 text-2xl flex  items-center flex-row gap-2 font-semibold">
          {/* Icon */}
          <FolderCode width={34} height={34} />

          {/* Title  */}
          <span>Exam App</span>
        </header>

        {/* Main Content section */}
        <section className="py-9  ">
          {/* Headline */}
          <h3 className="font-inter font-bold text-3xl text-gray-800 mb-[60px]">
            Empower your learning journey with our smart exam platform.
          </h3>

          {/* Item 1 */}
          <div className="grid grid-cols-7 mb-9  ">
            {/* Icon */}
            <div className="flex justify-center items-start ">
              <Brain className="w-9 h-9 border-[1.5px] text-blue-600 border-blue-600 " />
            </div>

            {/* Content area */}
            <div className="col-span-6  ">
              {/* Name */}
              <h4 className=" text-xl text-blue-600 font-semibold font-mono">
                Tailored Diplomas
              </h4>

              {/* Description */}
              <p className="mt-[10px] text-base text-gray-600 font-normal">
                Choose from specialized tracks like Frontend, Backend, and
                Mobile Development.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="grid grid-cols-7 mb-9  ">
            {/* Icon */}
            <div className="flex justify-center items-start ">
              <BookOpenCheck className="w-9 h-9 border-[1.5px] text-blue-600 border-blue-600 " />
            </div>

            {/* Content area */}
            <div className="col-span-6  ">
              {/* Name */}
              <h4 className=" text-xl text-blue-600 font-semibold font-mono">
                Focused Exams
              </h4>

              {/* Description */}
              <p className="mt-[10px] text-base text-gray-600 font-normal ">
                Access topic-specific tests including HTML, CSS, JavaScript, and
                more.
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="grid grid-cols-7  ">
            {/* Icon */}
            <div className="flex justify-center items-start ">
              <RectangleEllipsis className="w-9 h-9 border-[1.5px] text-blue-600 border-blue-600 " />
            </div>

            {/* Name */}
            <div className="col-span-6  ">
              <h4 className=" text-xl text-blue-600 font-semibold font-mono">
                Smart Multi-Step Forms
              </h4>

              {/* Description */}
              <p className="mt-[10px] text-base text-gray-600 font-normal">
                Choose from specialized tracks like Frontend, Backend, and
                Mobile Development.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
