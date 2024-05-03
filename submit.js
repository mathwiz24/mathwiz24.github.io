import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js";

const uploadButton = document.getElementById("uploadButton");
const fileUpload = document.getElementById("fileUpload");
const imgElement = document.getElementById("uploadedImg");
const errorText = document.getElementById("errorMsg");
const eventSelector = document.getElementById("eventSelector");

const firebaseConfig = {
    apiKey: "AIzaSyDqxIylGeagMSSw4Tksbiy6d6QhWq2zeug",
    authDomain: "cubstart-final-project-4de18.firebaseapp.com",
    projectId: "cubstart-final-project-4de18",
    storageBucket: "cubstart-final-project-4de18.appspot.com",
    messagingSenderId: "324894554328",
    appId: "1:324894554328:web:cfb4a75ed9a8485627ffad"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const submissionsCollection = collection(db, 'submissions');


const storage = getStorage();

uploadButton.onclick = async (evt) => {

    if (fileUpload.files.length == 0) {
        console.log("no file uploaded");
        errorText.style.color = "red";
        errorText.innerHTML = "Upload a file first!";
    } else {
        console.log("Image uploading begin");
        errorText.style.color = "black";
        errorText.innerHTML = "Uploading...";
        const file = fileUpload.files[0];
        const storageRef = ref(storage, 'images/' + file.name);
        const eventName = eventSelector.value;

        const uploadTask = uploadBytes(storageRef, file).then(async (snapshot) => {
            console.log('file uploaded');
            await getDownloadURL(snapshot.ref).then(async (url) => {
                imgElement.src = url;
                console.log("save begin");
                await addDoc(submissionsCollection, {
                    URL: url,
                    event: eventName,
                    fileName: file.name,
                    author: "None"
                });
                errorText.style.color = "green";
                errorText.innerHTML = `Upload success! View your submission <a href="https://mathwiz24.github.io/${eventName}">here</a>!`;
                console.log("save end");
            });
        });
    }
}