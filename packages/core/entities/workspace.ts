import uuid from 'uuid-random'

export default class Workspace<C = Record<string, string>> {
    public id: string
    public name: string
    public driveName: string
    public config: C

    constructor(props: Omit<Workspace, 'id'>, id?: string) {
        this.id = id ?? uuid()

        this.name = props.name
        this.driveName = props.driveName
        this.config = props.config as C
    }
}
