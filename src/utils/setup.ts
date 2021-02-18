import { runArena } from "../services/arenaService";
import { logger } from "./logger";

/**
 * Run any functions required to start running the application server.
 */
export async function setupApplication() {
  runArena();
}
