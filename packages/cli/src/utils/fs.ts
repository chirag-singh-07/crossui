import { promises as fs } from "fs";
import path from "path";
import chalk from "chalk";

/**
 * Safely copy a component template to the destination.
 * If the destination file already exists, it will be skipped and a warning shown.
 */
export async function copyComponent(src: string, dest: string): Promise<void> {
  try {
    // Ensure source exists
    await fs.access(src);
  } catch {
    console.error(chalk.red(`Template not found at ${src}`));
    return;
  }

  try {
    await fs.access(dest);
    console.log(
      chalk.yellow(`File ${path.basename(dest)} already exists. Skipping copy.`)
    );
    return;
  } catch {
    // dest does not exist, proceed
  }

  // Ensure destination directory exists
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.copyFile(src, dest);
  console.log(chalk.green(`Copied ${path.basename(src)} to ${dest}`));
}
