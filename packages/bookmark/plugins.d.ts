// import Vue from 'vue'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $t: (key: string, args?: string[] | number) => string
    }
}

export {} // Important! See note.
