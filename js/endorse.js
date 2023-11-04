import { initializeApp } from  'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js'
import { getDatabase, ref, push, onValue, set } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js"

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
            let endorsementKey = endorsementEntry[0]
            let endorsementData = endorsementEntry[1]
            let from = endorsementData.from
            let msg = endorsementData.msg
            let to = endorsementData.to
            let likes = endorsementData.likes
    
            let endorsement = new Endorsement(msg, to, from, likes)
            let endorsementEl = createEndorsmentEl(endorsementKey, endorsement)

            endorsementsList.appendChild(endorsementEl)
        }
    }
})

function Endorsement(msg, to, from, likes) {
    this.msg = msg
    this.to = to
    this.from = from
    this.likes = likes
}

function createEndorsmentEl(key, endorsement) {
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

    msgEl.textContent = endorsement.msg
    toEl.textContent = `To ${endorsement.to}`
    fromEl.textContent = `From ${endorsement.from}`
    likesEl.textContent = `❤ ${endorsement.likes}`

    likesEl.addEventListener("click", function() {
        let numOfLikes = parseInt(endorsement.likes)
        numOfLikes += 1;
        endorsement.likes = numOfLikes.toString()
        likesEl.textContent = `❤ ${endorsement.likes}`

        let likesInDB = ref(database, `Endorsements/${key}/likes`)

        set(likesInDB, endorsement.likes)
    })

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
    let toInput = document.getElementById("endorse-input-to")
    let msgInput = document.getElementById("endorse-input-msg")
    let fromInput = document.getElementById("endorse-input-from")

    if (toInput.value && msgInput.value && fromInput.value) {
        let endorsement = new Endorsement(msgInput.value, toInput.value, fromInput.value, "0")

        addEndorsementToDB(endorsement)

        toInput.value = ""
        msgInput.value = ""
        fromInput.value = ""
    } else {
        alert ("Please fill out all input fields to continue")
    }

})

function addEndorsementToDB(endorsement) {
    push(endorsementsInDB, endorsement)
}

function clearEndorsementsList() {
    endorsementsList.innerHTML = ""
}
