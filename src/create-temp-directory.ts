import { tmpdir } from 'os';
import { join } from 'path';
import { mkdtempSync, realpathSync, promises as fsPromises } from 'fs';
import rimraf from 'rimraf';

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
    const remove = () => rimraf(path);

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
    const remove = () => rimraf.sync(path);

    return { path: realpathSync(path), remove };
}
