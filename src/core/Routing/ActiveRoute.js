export class ActiveRoute {
    static get current() {
        return window.location.hash.slice(1)
    }

    static get param() {
        return ActiveRoute.current.split('/')[1]
    }

    static navigate(name) {
        window.location.hash = name
    }
}
