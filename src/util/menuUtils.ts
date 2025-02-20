interface GetButtonVariantParams {
  path: string;
  companyCode: string;
  currentPath: string;
}

export const getButtonVariant = ({
  path,
  companyCode,
  currentPath,
}: GetButtonVariantParams): "focusMenu" | "menu" => {
  const fullPath = `/${companyCode}${path}`;
  const isActive =
    path === "/datecheck" || path === "/setting"
      ? currentPath.includes(fullPath)
      : currentPath === fullPath;

  return isActive ? "focusMenu" : "menu";
};
