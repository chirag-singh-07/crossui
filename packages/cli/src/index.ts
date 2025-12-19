import { Command } from "commander";
import { initCommand } from "./commands/init";
import { addCommand } from "./commands/add";

export function runCLI() {
  const program = new Command();

  program
    .name("crossui")
    .description("CrossUI CLI for scaffolding components")
    .version("0.1.0");

  program
    .command("init")
    .description("Initialize CrossUI config")
    .action(initCommand);
  program
    .command("add <component>")
    .description("Add a UI component")
    .action(addCommand);

  program.parse(process.argv);
}
