import * as io from 'socket.io-client';

export class SockService {
    private url = 'http://localhost:3000';
    private socket;    

    constructor() {
        // this.socket = io(this.url);
    }

    public sendMessage(message) {
        // this.socket.emit('new-message', message);
    }
}