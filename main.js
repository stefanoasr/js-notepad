// global namespace
var app = app || {};

class Main {
    constructor() {
        this.textarea = document.getElementById("textarea-1");

        //temp
        this.storageObj = JSON.parse(localStorage.getItem('obj')) || {};

        this.loadData();
        this.saveData();
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
}