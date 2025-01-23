import { useSelector } from "react-redux";

export default function Footer() {
  const { darkMode } = useSelector((state) => state.darkmodeSlice);

  return (
    <div
      className={`lg:hidden mx-10 mb-10 border-t ${
        darkMode ? "border-white/50" : "border-black/50"
      }`}></div>
  );
}
