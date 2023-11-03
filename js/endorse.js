import { initializeApp } from  'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js'
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js"

const appConfig = {
    databaseURL: "https://endorsement-scrimba-project-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appConfig)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "Endorsements")

onValue(endorsementsInDB, function(snapshot) {
    let itemsArray = Object.entries(snapshot.val())

    let endorsementsList = document.getElementById("endorsements-list")

    for (let i = 0; i < itemsArray.length; i++) {
        let endorsementEntry = Object.values(itemsArray[i])
        let endorsementObject = endorsementEntry[1]

        endorsementsList.appendChild += createEndorsmentEl()
    }
})

function Endorsement(msg, to, from) {
    this.msg = msg
    this.to = to
    this.from = from
}

function createEndorsmentEl() {
    let el = document.createElement("li")
    el.textContent = "lol"

    return el
}

// let endorsementOne = new Endorsement("Life is awesome!", "Colby", "Chase")

// console.log(endorsementOne)