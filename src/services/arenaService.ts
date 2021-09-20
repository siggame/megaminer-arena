import { logger } from "../utils/logger";

export enum Mode {
  MatchMaking,
  Tournament,
}

let mode: Mode = Mode.MatchMaking;

export function changeMode(newMode: Mode) {
  mode = newMode;
}

export async function runArena() {
  logger.info(`Running arena in ${Mode[mode]} mode...`);
  setTimeout(() => {
    runArena();
  }, 2000);
}
