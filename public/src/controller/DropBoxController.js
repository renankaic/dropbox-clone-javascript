class DropBoxController {

    constructor(){

        this.btnSendFileEl = document.querySelector("#btn-send-file");
        this.inputFilesEl = document.querySelector("#files");
        this.snackModalEl = document.querySelector("#react-snackbar-root");

        this.initEvents();

    }

    initEvents() {

        //Adds a event on upload file button
        this.btnSendFileEl.addEventListener('click', event => {

            this.inputFilesEl.click();

        });

        this.inputFilesEl.addEventListener('change', event => {

            //Get the files from the "target" (that means, the inputFilesEl)
            console.log(event.target.files);

            this.snackModalEl.style.display = "block";

        });

    }

}