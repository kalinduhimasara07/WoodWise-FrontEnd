import HeaderButtons from "./headerButtons";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-[#f5e9da] via-[#f7f3ee] to-[#e7d3bc] shadow h-[70px]">
      <div className="max-w-8xl mx-10 flex items-center h-full">
        {/* Logo */}
        <div className="w-[48px] h-[48px] flex items-center justify-center rounded-full  shadow mr-4">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-10 h-10 object-contain"
          />
        </div>
        {/* Title & Role */}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-[#a86523] font-poppins leading-tight">
            WoodWise
          </h1>
          <span className="text-base font-semibold text-gray-700">Mill</span>
        </div>
        {/* Header Buttons */}
        <div className="ml-auto flex items-center">
          <HeaderButtons />
        </div>
      </div>
    </header>
  );
}
