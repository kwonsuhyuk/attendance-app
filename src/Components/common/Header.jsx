import MenuBar from "../MenuBar";

export default function Header({ currentCompany }) {
  return (
    <div className="overflow-auto px-10 md:px-20 py-10">
      <MenuBar
        companyName={currentCompany?.companyName}
        companyLogo={currentCompany?.companyLogo}
      />
    </div>
  );
}
