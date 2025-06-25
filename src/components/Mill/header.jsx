import SearchBar from "../Store/searchBar";
import HeaderButtons from "./headerButtons";

export default function Header() {
  return (
    <header className="bg-[#d9d9d9] shadow h-[70px]">
      <div className="mx-auto px-4 py-3 flex">
        <div className="w-[45px] h-[45px] mx-2">
          <img src="/logo.png" alt="Logo" />
        </div>
        <div className="m-0 p-0">
          <h1 className="text-3xl font-poppins font-bold m-0 p-0">WoodWise</h1>
          <div className="flex justify-end">
            <h2 className="text-xl font-semibold m-0 p-0">Mill</h2>
          </div>
        </div>
        <SearchBar/>
        <div className="ml-auto">
          <HeaderButtons />
        </div>
      </div>
    </header>
  );
}
