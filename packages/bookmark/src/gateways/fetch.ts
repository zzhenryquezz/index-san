import type IFetchService from '@is/core/gateways/fetch/fetch'

export default class FetchProvider implements IFetchService {
    public provide() {
        return window.fetch.bind(window)
    }
}
