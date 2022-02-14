// global namespace
var app = app || {};

class Main {
    constructor() {
        this.textarea = document.getElementById("textarea-1");

        //temp
        this.storageObj = JSON.parse(localStorage.getItem('obj')) || {};

        this.loadData();
        this.saveData();
        this.textareaTab();
    }

    loadData() {
        this.textarea.value = localStorage.getItem('data');

        //temp
        console.log(this.storageObj);
    }

    saveData() {
        var self = this;

        var saveIntervalID = setInterval(saveCallback, 5000);

        function saveCallback() {
            var text = self.textarea.value;
            localStorage.setItem('data', text);
        }
    }

    textareaTab() {
        this.textarea.addEventListener('keydown', function (e) {
            if (e.key == 'Tab') {
                e.preventDefault();
                var start = this.selectionStart;
                var end = this.selectionEnd;

                // set textarea value to: text before caret + tab + text after caret
                this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);

                // put caret at right position again
                this.selectionStart = this.selectionEnd = start + 1;
            }
        });
    }
}