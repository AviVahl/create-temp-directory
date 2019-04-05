import { tmpdir } from 'os';
import { join } from 'path';
import { promisify } from 'util';
import { mkdtemp as mkdtempCb } from 'fs';
import rimrafCb from 'rimraf';

const rimraf = promisify(rimrafCb);
const mkdtemp = promisify(mkdtempCb);

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
    const path = await mkdtemp(join(tmpdir(), prefix));
    const remove = () => rimraf(path);

    return { path, remove };
}
