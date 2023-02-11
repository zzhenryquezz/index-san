import Drive from '@is/core/gateways/drive/drive'
import DirectoryEntry from '@is/core/entities/directory-entry'

export default class BrowserDrive implements Drive {
    public config = {}

    public list(path: string): Promise<DirectoryEntry[]> {
        throw new Error('Method not implemented.')
    }

    public exists(path: string): Promise<boolean> {
        throw new Error('Method not implemented.')
    }

    public get(path: string): Promise<DirectoryEntry | null> {
        throw new Error('Method not implemented.')
    }

    public read(path: string): Promise<Uint8Array | null> {
        throw new Error('Method not implemented.')
    }

    public write(path: string, bytes: Uint8Array): Promise<void> {
        throw new Error('Method not implemented.')
    }

    public mkdir(path: string): Promise<DirectoryEntry> {
        throw new Error('Method not implemented.')
    }

    public copy(source: string, target: string): Promise<void> {
        throw new Error('Method not implemented.')
    }

    public move(source: string, target: string): Promise<void> {
        throw new Error('Method not implemented.')
    }

    public delete(path: string): Promise<void> {
        throw new Error('Method not implemented.')
    }
}
