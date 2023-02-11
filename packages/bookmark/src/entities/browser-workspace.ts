import Workspace from '@is/core/entities/workspace'

interface Config {
    directoryHandle?: FileSystemDirectoryHandle
}

export default class BrowserWorkspace extends Workspace<Config> {}
