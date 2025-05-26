import HeaderButtons from "./headerButtons";

export default function Header() {
  return (
    <header className="bg-[#d9d9d9] shadow">
      <div className="mx-auto px-4 py-4 flex">
        <div className="w-[35px] h-[35px] bg-[#A86523] border border-black mx-5 rounded-sm ">Logo</div>
        <h1 className="text-[30px] font-poppins font-bold">WoodWise</h1>
        <h2 className="mx-4">Mill</h2>
        <div className="ml-auto"><HeaderButtons/></div>
      </div>
    </header>
  );
}
