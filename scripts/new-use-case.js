
const path = require('path')
const fs  = require('fs')
const upperFirst = require('lodash/upperFirst')
const camelCase = require('lodash/camelCase')
const kebabCase = require('lodash/kebabCase')

const BASE_PATH = path.resolve(__dirname, '..')

const [name] = process.argv.slice(2)


if (!name) {
    console.error('missing args')
    return
}

const useCase = `
import {{camelCaseName}}DTO from './{{kebabCaseName}}.dto'

export default class {{camelCaseName}} {
    constructor(){}

    public async execute({ data }: {{camelCaseName}}DTO.Input): Promise<{{camelCaseName}}DTO.Output> {
        return {
            data: {}
        }
    }
}
`

const dto = `
declare namespace {{camelCaseName}}DTO {
    export interface Input { data: any }

    export interface Output {
        data: {}
    }
}

export default {{camelCaseName}}DTO
`

const spec = `
import { test } from '@japa/runner'

import {{camelCaseName}} from './{{kebabCaseName}}'

test.group('{{kebabCaseName}} (use-case)', () => {

    const useCase = new {{camelCaseName}}()

    test('should test use-case', async ({ expect }) => {
        expect(1).toEqual(1)
    })

})
`
async function main(){
    const kebabCaseName  = kebabCase(name)
    const camelCaseName  = upperFirst(camelCase(name))

    const folderPath = path.resolve(BASE_PATH, 'packages', 'core', 'use-cases', kebabCaseName)

    await fs.promises.mkdir(folderPath)

    const items = [
        [path.resolve(folderPath, `${kebabCaseName}.dto.ts`), dto],
        [path.resolve(folderPath, `${kebabCaseName}.spec.ts`), spec],
        [path.resolve(folderPath, `${kebabCaseName}.ts`), useCase]
    ]

    for (const [filename, content] of items) {
        const parsed = content
            .replace(/{{kebabCaseName}}/g, kebabCaseName)
            .replace(/{{camelCaseName}}/g, camelCaseName)
            .trim()

        await fs.promises.writeFile(filename, parsed)
    }

}

main()