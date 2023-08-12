import { spawnSync, SpawnSyncOptions } from 'child_process';

/**
 * Executes a command.
 *
 * @beta
 */
export function exec(cmd: string, args: string[], options?: SpawnSyncOptions) {
  const proc = spawnSync(cmd, args, options);
  if (proc.error) {
    throw proc.error;
  }
  if (proc.status !== 0) {
    if (proc.stdout || proc.stderr) {
      throw new Error(`[Status ${proc.status}] stdout: ${proc.stdout?.toString().trim()}\n\nstderr: ${proc.stderr?.toString().trim()}`);
    }
    throw new Error(`${cmd} ${args.join(' ')} ${options?.cwd ? `run in directory ${options.cwd}` : ''} exited with status ${proc.status}`);
  }
  return proc;
}
