import DirectoryEntry from '@core/entities/directory-entry'

import type Drive from '@core/gateways/drive/drive'

export default class ChromeDrive implements Drive {
    public config = { path: '' }

    public exists(entryPath: string): Promise<boolean> {
        throw new Error('Method not implemented.')
    }

    public list(entryPath: string): Promise<DirectoryEntry[]> {
        throw new Error('Method not implemented.')
    }

    public get(entryPath: string): Promise<DirectoryEntry | null> {
        throw new Error('Method not implemented.')
    }

    public mkdir(entryPath: string): Promise<DirectoryEntry> {
        throw new Error('Method not implemented.')
    }

    public move(source: string, target: string): Promise<void> {
        throw new Error('Method not implemented.')
    }

    public read(entryPath: string): Promise<Uint8Array | null> {
        throw new Error('Method not implemented.')
    }

    public write(entryPath: string, bytes: Uint8Array): Promise<void> {
        throw new Error('Method not implemented.')
    }

    public delete(entryPath: string): Promise<void> {
        throw new Error('Method not implemented.')
    }
}
