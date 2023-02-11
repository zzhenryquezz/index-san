import uuid from 'uuid-random'

interface Field {
    columnId: string
    type: 'text' | 'page-url'
}

export default class Form {
    public id: string
    public name: string
    public collectionId: string
    public fields: Field[] = []

    constructor(props: Omit<Form, 'id'>, id?: string) {
        Object.assign(this, props)

        this.id = id ?? uuid()
    }
}
