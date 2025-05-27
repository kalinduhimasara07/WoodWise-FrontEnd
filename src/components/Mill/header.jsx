import HeaderButtons from "./headerButtons";

export default function Header() {
  return (
    <header className="bg-[#d9d9d9] shadow h-[70px]">
      <div className="mx-auto px-4 py-3 flex">
        <div className="w-[35px] h-[35px] bg-[#A86523] border border-black mx-5 rounded-sm ">Logo</div>
        <div className="m-0 p-0">
          <h1 className="text-3xl font-poppins font-bold m-0 p-0">WoodWise</h1>
          <div className="flex justify-end"><h2 className="text-xl font-semibold m-0 p-0">Mill</h2></div>
        </div>
        <div className="ml-auto"><HeaderButtons/></div>
      </div>
    </header>
  );
}
