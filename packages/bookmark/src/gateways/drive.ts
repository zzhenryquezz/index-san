import Drive from '@is/core/gateways/drive/drive'
import DirectoryEntry from '@is/core/entities/directory-entry'
import BrowserWorkspace from '../entities/browser-workspace'

export default class BrowserDrive implements Drive {
    public config: BrowserWorkspace['config'] = {}

    public async showHandle() {
        if (!this.config.directoryHandle) {
            throw new Error('Access files Error')
        }

        const permission = await this.config.directoryHandle.queryPermission()

        if (permission !== 'granted') {
            throw new Error('Access files permission Error')
        }

        return this.config.directoryHandle
    }

    public list(path: string): Promise<DirectoryEntry[]> {
        throw new Error('Method not implemented.')
    }

    public exists(path: string): Promise<boolean> {
        throw new Error('Method not implemented.')
    }

    public get(path: string): Promise<DirectoryEntry | null> {
        throw new Error('Method not implemented.')
    }

    public async fileExists(handle: FileSystemDirectoryHandle, name: string) {
        for await (const entry of handle.values()) {
            if (entry.name === name) {
                return true
            }
        }

        return false
    }

    public async getHandle(path: string) {
        const args = path.split('/')

        const handle = await this.showHandle()

        const target = args.pop() as string

        let currentFolder = handle

        for await (const p of args) {
            if (!(await this.fileExists(currentFolder, p))) return null

            const entry = await currentFolder.getDirectoryHandle(p, { create: false })

            if (!entry || entry.kind !== 'directory') return null

            currentFolder = entry
        }

        let result: FileSystemDirectoryHandle | FileSystemFileHandle | undefined = undefined

        for await (const entry of currentFolder.values()) {
            if (entry.name === target) {
                result = entry
                break
            }
        }

        return result || null
    }

    public async read(path: string): Promise<Uint8Array | null> {
        const handle = await this.getHandle(path)

        if (!handle || handle.kind !== 'file') return null

        const file = await handle.getFile()

        const buffer = await file.arrayBuffer()

        return new Uint8Array(buffer)
    }

    public async write(path: string, bytes: Uint8Array): Promise<void> {
        const dirname = DirectoryEntry.dirname(path)
        const basename = DirectoryEntry.basename(path)

        const folderHandle = await this.getHandle(dirname)

        if (!folderHandle || folderHandle.kind !== 'directory') return

        const fileHandle = await folderHandle.getFileHandle(basename, {
            create: true,
        })

        const writable = await fileHandle.createWritable()

        await writable.write(bytes)

        await writable.close()
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
