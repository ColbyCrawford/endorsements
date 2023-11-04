import { initializeApp } from  'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js'
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js"

const appConfig = {
    databaseURL: "https://endorsement-scrimba-project-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appConfig)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "Endorsements")
const endorsementsList = document.getElementById("endorsements-list")

onValue(endorsementsInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        clearEndorsementsList()
    
        for (let i = 0; i < itemsArray.length; i++) {
            let endorsementEntry = Object.values(itemsArray[i])
            let endorsementData = endorsementEntry[1]
            let from = endorsementData.from
            let msg = endorsementData.msg
            let to = endorsementData.to
            let likes = endorsementData.likes
    
            let endorsement = new Endorsement(msg, to, from, likes)
    
            endorsementsList.appendChild(endorsement.element)
        }
    }
})

function Endorsement(msg, to, from, likes) {
    this.msg = msg
    this.to = to
    this.from = from
    this.likes = likes
    this.element = createEndorsmentEl(this)
}

function createEndorsmentEl(endorsement) {
    let endorsementEl = document.createElement("li")
    let msgEl = document.createElement("p")
    let toEl = document.createElement("span")
    let divEl = document.createElement("div")
    let fromEl = document.createElement("span")
    let likesEl = document.createElement("span")

    endorsementEl.appendChild(toEl)
    endorsementEl.appendChild(msgEl)
    endorsementEl.appendChild(divEl)
    divEl.appendChild(fromEl)
    divEl.appendChild(likesEl)

    msgEl.textContent = endorsement.msg;
    toEl.textContent = `To ${endorsement.to}`;
    fromEl.textContent = `From ${endorsement.from}`;
    likesEl.textContent = `❤ ${endorsement.likes}`;

    endorsementEl.classList.add("card")
    toEl.classList.add("u-color-text-gray", "u-bold", "u-inline-block", "u-m-b8")
    msgEl.classList.add("u-m-b12")
    divEl.classList.add("u-flex", "u-space-btwn")
    likesEl.classList.add("likes")
    fromEl.classList.add("u-color-text-gray", "u-bold")

    return endorsementEl
}

const publishBtn = document.getElementById("publish-btn")

publishBtn.addEventListener("click", function() {
    let to = document.getElementById("endorse-input-to").value
    let msg = document.getElementById("endorse-input-msg").value
    let from = document.getElementById("endorse-input-from").value

    if (to && msg && from) {
        let endorsement = new Endorsement(msg, to, from, "0")

        addEndorsementToDB(endorsement)
    } else {
        alert("fill out all the input fields")
    }
})

function addEndorsementToDB(endorsement) {
    push(endorsementsInDB, endorsement)
}

function clearEndorsementsList() {
    endorsementsList.innerHTML = ""
}
