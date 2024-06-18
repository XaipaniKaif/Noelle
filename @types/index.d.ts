declare global {
    interface CommandsObject {
        data: Function;
    };
    interface CommandsHandler {
        execute: Function,
        autocomplate: Function
    };
}

export {};