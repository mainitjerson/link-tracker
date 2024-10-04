import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getDatabase, 
    ref, 
    push,
    onValue,
    remove } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://tracker-app-268be-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "tracker");//push data in firebase

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}
onValue(referenceInDB, function(snapshot){ //getvalues in firebase
        const snapshotDoesExist = snapshot.exists(); //check if snaphot exists
        if(snapshotDoesExist){
            const snapshotValues = snapshot.val();
            const tracker = Object.values(snapshotValues);
            render(tracker);
            console.log(tracker);
        }
        
    
});

deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB);
    ulEl.innerHTML = "";
})



inputBtn.addEventListener("click", function() {
    push(referenceInDB, inputEl.value);//push data in firebase
    inputEl.value = ""
    
})