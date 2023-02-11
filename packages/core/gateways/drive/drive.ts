import DirectoryEntry from '../../entities/directory-entry'
export default interface Drive {
    config: Record<string, any>
    exists: (path: string) => Promise<boolean>
    list: (path: string) => Promise<DirectoryEntry[]>
    get: (path: string) => Promise<DirectoryEntry | null>
    mkdir: (path: string) => Promise<DirectoryEntry>

    copy: (source: string, target: string) => Promise<void>
    move: (source: string, target: string) => Promise<void>
    read: (path: string) => Promise<Uint8Array | null>
    write: (path: string, bytes: Uint8Array) => Promise<void>

    delete(path: string): Promise<void>
}
