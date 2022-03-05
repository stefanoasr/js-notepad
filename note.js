// global namespace
var app = app || {};

class Note {
    constructor() {
        this.title = '';
        this.data = '';
    }

    load(note) {
        this.title = note.title;
        this.data = note.data;
    }

    clear() {
        this.title = '';
        this.data = '';
    }
}