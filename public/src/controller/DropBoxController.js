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
            this.uploadTask(event.target.files);

            this.snackModalEl.style.display = "block";

        });

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

                    try {

                        resolve(JSON.parse(ajax.responseText));

                    } catch (e){

                        reject(e);

                    }

                };

                ajax.onerror = event => {

                    reject(event);

                }

                //Lets use the formDataApi
                let formData = new FormData();

                //Sends the file inside the "input-file" named parameter to the server
                formData.append('input-file', file);

                ajax.send(formData);

            }));

        });

        return Promise.all(promises);

    }

}