import darkModeStore from "@/store/darkmode.store";

const Footer = () => {
  const darkMode = darkModeStore(state => state.darkMode);

  return (
    <div
      className={`lg:hidden mx-10 mb-10 border-t ${
        darkMode ? "border-white/50" : "border-black/50"
      }`}
    ></div>
  );
};

export default Footer;
