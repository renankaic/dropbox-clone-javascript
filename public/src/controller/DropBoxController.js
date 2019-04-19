class DropBoxController {

    constructor(){

        this.btnSendFileEl = document.querySelector("#btn-send-file");
        this.inputFilesEl = document.querySelector("#files");
        this.snackModalEl = document.querySelector("#react-snackbar-root");
        this.progressBarEl = this.snackModalEl.querySelector(".mc-progress-bar-fg");
        this.namefileEl = this.snackModalEl.querySelector(".filename");
        this.timeleftEl = this.snackModalEl.querySelector(".timeleft");

        this.initEvents();

    }

    initEvents() {

        //Adds a event on upload file button
        this.btnSendFileEl.addEventListener('click', event => {

            this.inputFilesEl.click();

        });

        this.inputFilesEl.addEventListener('change', event => {

            //Get the files from the "target" (that means, the inputFilesEl)
            this.uploadTask(event.target.files);

            this.modalShow();

            this.inputFilesEl.value = '';

        });

    }

    modalShow(show = true) {

        this.snackModalEl.style.display =  (show) ? 'block' : 'none';

    }

    uploadTask(files){

        //Create promises to handle the uploaded files
        let promises = [];

        //Converts the files collection into array
        [...files].forEach( file => {

            //Pushes the promise to the promises array
            promises.push(new Promise((resolve, reject) => {

                let ajax = new XMLHttpRequest();

                ajax.open('POST', '/upload');

                ajax.onload = event => {

                    this.modalShow(false);

                    try {

                        resolve(JSON.parse(ajax.responseText));

                    } catch (e){

                        reject(e);

                    }

                };

                //Use this property to get the ajax progress
                ajax.upload.onprogress = event => {

                    this.uploadProgress(event, file);

                };

                ajax.onerror = event => {

                    this.modalShow(false);

                    reject(event);

                };

                //Lets use the formDataApi
                let formData = new FormData();

                //Sends the file inside the "input-file" named parameter to the server
                formData.append('input-file', file);

                //Gets the time that the upload started
                this.startUploadTime = Date.now();

                ajax.send(formData);

            }));

        });

        return Promise.all(promises);

    }

    uploadProgress(event, file) {

        let timespent = Date.now() - this.startUploadTime;

        let loaded = event.loaded;
        
        let total = event.total;

        //Gets the percentage of uploading
        let porcent = parseInt((loaded / total) * 100);

        //Calculates the timeleft
        let timeleft = ((100 - porcent) * timespent) / porcent;
    
        //Sets the progress bar width, showing to the user
        this.progressBarEl.style.width = `${porcent}%`;

        //Shows the file name
        this.namefileEl.innerHTML = file.name;

        //Shows the time left
        this.timeleftEl.innerHTML = this.formatTimeToHuman(timeleft);

    }

    formatTimeToHuman(duration) {

        let seconds = parseInt((duration / 1000)) % 60;
        let minutes = parseInt((duration / (1000 * 60)) % 60);
        let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        if (hours > 0){

            return `${hours} horas, ${minutes} minutos e ${seconds} segundos`;

        } else if (minutes > 0) {

            return `${minutes} minutos e ${seconds} segundos`;

        } else if (seconds > 0) {

            return `${seconds} segundos`;

        }

        return '0';

    }

}