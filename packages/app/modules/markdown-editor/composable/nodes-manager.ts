import { Node } from '@language-kit/markdown'

const key = Symbol('editor:nodes')

interface Observer {
    name: string
    callback: () => void
}

function create() {
    const nodes = ref<Node[]>([])

    const observers: Observer[] = []

    function on(name: string, callback: () => void) {
        observers.push({ name, callback })
    }
    function emit(name: string) {
        observers.filter((o) => o.name === name).forEach((o) => o.callback())
    }

    function updateNodeByIndex(index: number, node: Node) {
        nodes.value[index] = node
    }

    function removeNode(node: Node) {
        const index = nodes.value.indexOf(node)

        if (index === -1) return

        nodes.value.splice(index, 1)

        emit('remove')
    }

    return reactive({
        nodes,
        on,
        emit,
        updateNodeByIndex,
        removeNode,
    })
}

export function provideManager() {
    const state = create()

    provide(key, state)

    return state
}

export function useManger() {
    return inject(key, create())
}
