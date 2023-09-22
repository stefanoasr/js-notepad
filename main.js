// global namespace
var app = app || {};

class Main {
    constructor() {
        this.titleInput = document.querySelectorAll('.note-title');
        this.textarea = document.getElementById("note-body");

        this.note = new Note();
        this.storageObj = JSON.parse(localStorage.getItem('obj'));
        if (this.storageObj && Object.keys(this.storageObj).length !== 0) {
            this.note.load(this.storageObj);
        }

        this.loadData();
        this.saveData();
        this.clear();
        this.textareaTab();
        this.darkMode();
    }

    loadData() {
        this.titleInput[0].value = this.note.title;
        this.textarea.value = this.note.data;
    }

    saveData() {
        var self = this;

        var saveIntervalID = setInterval(saveCallback, 5000);

        self.titleInput[0].addEventListener('focusout', function () {
            saveCallback();
        });

        self.textarea.addEventListener('focusout', function () {
            saveCallback();
        });

        function saveCallback() {
            self.note.title = self.titleInput[0].value;
            self.note.data = self.textarea.value;
            localStorage.setItem('obj', JSON.stringify(self.note));
        }
    }

    clear() {
        var self = this;

        var clearButton = document.getElementById('clear');
        
        clearButton.addEventListener('click', function (e) {
            e.preventDefault();

            if (window.confirm('Are you sure?')) {
                self.note.clear();
                self.loadData();
                localStorage.setItem('obj', JSON.stringify(self.note));
            }
        });
    }

    textareaTab() {
        this.textarea.addEventListener('keydown', function (e) {
            if (e.key == 'Tab') {
                e.preventDefault();
                var start = this.selectionStart;
                var end = this.selectionEnd;

                // set textarea value to: text before caret + tab + text after caret
                this.value = this.value.substring(0, start) + '\t' + this.value.substring(end);

                // put caret at right position again
                this.selectionStart = this.selectionEnd = start + 1;
            }
        });
    }

    darkMode() {
        var self = this;

        var body = document.body;
        var navbar = document.getElementsByTagName('nav');
        var darkModeDiv = document.getElementById('dark-mode');
        var darkModeSwitch = document.getElementById('darkmode-switch');

        var darkModeState = localStorage.getItem('dark-mode');
        if(darkModeState) {
            switch (darkModeState) {
                case 'light':
                    darkModeSwitch.checked = false;
                    darkModeOff();
                    break;
                
                case 'dark':
                    darkModeSwitch.checked = true;
                    darkModeOn();
                    break;
            
                default:
                    break;
            }
        }
        
        darkModeSwitch.addEventListener('change', function () {
            if (darkModeSwitch.checked) {
                darkModeOn();
            } else {
                darkModeOff();
            }
        });

        function darkModeOff() {
            body.classList.remove('bg-dark');
            navbar[0].classList.remove('navbar-dark', 'bg-dark');
            self.textarea.classList.remove('bg-dark', 'text-white');
            self.titleInput[0].classList.remove('bg-dark', 'text-white');
            darkModeDiv.classList.remove('text-white');
            darkModeSave('light');
        }

        function darkModeOn() {
            body.classList.add('bg-dark');
            navbar[0].classList.add('navbar-dark', 'bg-dark');
            self.textarea.classList.add('bg-dark', 'text-white');
            self.titleInput[0].classList.add('bg-dark', 'text-white');
            darkModeDiv.classList.add('text-white');
            darkModeSave('dark');
        }

        function darkModeSave(state) {
            localStorage.setItem('dark-mode', state);
        }
    }
}