import fs from "fs";
import path from "path";

/**
 * Detect if the current project is an Expo project.
 * Checks for presence of `expo` dependency in package.json
 * or existence of `app.json` / `app.config.js`.
 */
export async function detectExpoProject(cwd: string): Promise<boolean> {
  // Check package.json dependencies
  try {
    const pkgPath = path.join(cwd, "package.json");
    const pkgContent = await fs.promises.readFile(pkgPath, "utf8");
    const pkg = JSON.parse(pkgContent);
    const deps = {
      ...(pkg.dependencies || {}),
      ...(pkg.devDependencies || {}),
    };
    if (deps["expo"]) return true;
  } catch {
    // ignore errors, continue detection
  }

  // Check for app.json or app.config.js
  const possibleFiles = ["app.json", "app.config.js", "app.config.ts"];
  for (const file of possibleFiles) {
    if (fs.existsSync(path.join(cwd, file))) return true;
  }
  return false;
}
