import { promises as fs } from "fs";
import path from "path";
import chalk from "chalk";
import { copyComponent } from "../utils/fs";

export async function addCommand(component: string) {
  try {
    const cwd = process.cwd();
    const configPath = path.join(cwd, "crossui.config.json");
    // Ensure config exists
    let config;
    try {
      const configContent = await fs.readFile(configPath, "utf8");
      config = JSON.parse(configContent);
    } catch {
      console.error(
        chalk.red("crossui.config.json not found. Run `crossui init` first.")
      );
      return;
    }

    const adapter = config.adapter || "expo";
    const componentsDir = path.resolve(
      cwd,
      config.componentsDir || "components/ui"
    );
    const templatePath = path.resolve(
      __dirname,
      "..",
      "templates",
      adapter,
      `${component.charAt(0).toUpperCase() + component.slice(1)}.tsx`
    );

    await copyComponent(
      templatePath,
      path.join(
        componentsDir,
        `${component.charAt(0).toUpperCase() + component.slice(1)}.tsx`
      )
    );
    console.log(
      chalk.green(`Component ${component} added to ${componentsDir}`)
    );
  } catch (err) {
    console.error(chalk.red("Failed to add component:"), err);
  }
}
