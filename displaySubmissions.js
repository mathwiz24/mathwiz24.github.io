import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const imageContainer = document.getElementById("imageContainer");
const eventName = document.getElementsByName("event-title")[0].content;
console.log(eventName);

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
const submissionCollection = collection(db, "submissions");

console.log("Building query");
const q = query(submissionCollection, where("event", "==", eventName));
const submissionDocs = await getDocs(q);
console.log(submissionDocs);

let rendered = [];

submissionDocs.forEach((doc) => {
    const docData = doc.data()
    if (!rendered.includes(docData.filename)) {
      rendered.push(docData.filename);
      const img = document.createElement('img');
      img.src = doc.data().URL;
      img.width = 400;
      img.height = 300;
      imageContainer.appendChild(img);
    }
});