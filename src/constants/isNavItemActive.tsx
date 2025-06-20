export const isNavItemActive = (currentPath: string, targetPath: string) =>
    currentPath === targetPath || currentPath.startsWith(targetPath + "/");
