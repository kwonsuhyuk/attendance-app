import darkModeStore from "@/store/darkmode.store";

const Footer = () => {
  const darkMode = darkModeStore(state => state.darkMode);

  return (
    <div className={`mb-10 h-[1px] w-full ${darkMode ? "bg-dark-text" : "bg-white-text"}`}></div>
  );
};

export default Footer;
