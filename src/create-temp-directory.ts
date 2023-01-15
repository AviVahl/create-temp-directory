import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { mkdtempSync, realpathSync, rmSync, promises as fsPromises } from 'node:fs';

export interface ITempDirectory {
    /**
     * Absolute path to created directory.
     */
    path: string;

    /**
     * Remove the directory and all its contents.
     */
    remove(): Promise<void>;
}

/**
 * Create an empty, unique directory in the current OS's temp directory.
 *
 * @param prefix optional prefix to add to the random name. (default: "temp-")
 * @returns an absolute `path` and a `remove()` function.
 */
export async function createTempDirectory(prefix = 'temp-'): Promise<ITempDirectory> {
    const path = await fsPromises.mkdtemp(join(tmpdir(), prefix));
    const remove = () => fsPromises.rm(path, {recursive: true, force: true});

    return { path: await fsPromises.realpath(path), remove };
}

export interface ITempDirectorySync {
    /**
     * Absolute path to created directory.
     */
    path: string;

    /**
     * Remove the directory and all its contents.
     */
    remove(): void;
}

/**
 * Create an empty, unique directory in the current OS's temp directory.
 *
 * @param prefix optional prefix to add to the random name. (default: "temp-")
 * @returns an absolute `path` and a `remove()` function.
 */
export function createTempDirectorySync(prefix = 'temp-'): ITempDirectorySync {
    const path = mkdtempSync(join(tmpdir(), prefix));
    const remove = () => rmSync(path, {recursive: true, force: true});

    return { path: realpathSync(path), remove };
}
