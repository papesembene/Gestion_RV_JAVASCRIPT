let form1 = document.querySelector('#form1')
let form2 = document.querySelector('#form2')
let tab1 = []
let tab2 = []
let input = form1.querySelectorAll('input')
let option = document.querySelector('select')

if (localStorage.getItem('form1')) {
    tab1 = JSON.parse(localStorage.getItem('form1'))
    display()

}

if (localStorage.getItem('form2')) {
    tab2 = JSON.parse(localStorage.getItem('form2'))
    displayRv()


}

function display() {
    let infos = `
            <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Specialite</th>
            <th>Action(s)</th>
            </tr>
        `
    for (let i = 0; i < tab1.length; i++) {
        infos += `
                <tr>
                <td>${i + 1}</td>
                <td>${tab1[i].nom}</td>
                <td>${tab1[i].prenom}</td>
                <td>${tab1[i].specialite}</td>
                <td>
                <button onclick="Modifier(${i})">Modifier</button>
                <button onclick="Supprimer(${i})" >Supprimer</button>
                </td>
                </tr>`
    }
    document.querySelector('#table1').innerHTML = infos

}

function Modifier(i) {
    document.querySelector('#sect1').innerHTML = `
                                <input type="text" placeholder="nom" id="nom"  required value="${tab1[i].nom}">
                                <br>
                               
                                <input type="text" placeholder="prenom" id="prenom" required value="${tab1[i].prenom}">
                                <br>
                                <input type="text" placeholder="specialite" id="specialite"  required value="${tab1[i].specialite}">
                                <br><br>
                                <button id="btn" type="submit">Modifier</button>`
    document.querySelector('#btn').addEventListener('click', () => {
        tab1[i].nom = document.querySelector('#nom').value
        tab1[i].prenom = document.querySelector('#prenom').value
        tab1[i].specialite = document.querySelector('#specialite').value

        localStorage.setItem('form1', JSON.stringify(tab1))
        window.location.reload()

    })

}

function Supprimer(i) {
    if (confirm('etes vous sur')) {
        tab1.splice(i, 1)
        localStorage.setItem('form1', JSON.stringify(tab1))
        display()
        return window.location.reload()
    } return false
}

form1.addEventListener('submit', function (e) {
    e.preventDefault()
    tab1.push(
        {
            nom: input[0].value,
            prenom: input[1].value,
            specialite: input[2].value
        }

    )
    display()
    localStorage.setItem('form1', JSON.stringify(tab1))
    return window.location.reload()

})

function displayRv() {
    let infos = `
        <tr>
        <th>#</th>
        <th>Medecin</th>
        <th>Patient</th>
        <th>Date</th>
        <th>Heure</th>
        <th>Diagnostic</th>
        <th>Action(s)</th>
        </tr>
    `
    for (let i = 0; i < tab2.length; i++) {
        infos += `
            <tr>
            <td>${i + 1}</td>
            <td>${tab2[i].medecin}</td>
            <td>${tab2[i].patient}</td>
            <td>${tab2[i].date}</td>
            <td>${tab2[i].heure}</td>
            <td>${tab2[i].diagnostic}</td>
            <td>
            <button onclick="ModifierRv(${i})">Modifier</button>
            <button onclick="SupprimerRv(${i})" >Supprimer</button>
            </td>
            </tr>`
    }
    document.querySelector('#table2').innerHTML = infos
}

form2.addEventListener('submit', function (e) {
    e.preventDefault()
    tab2.push(
        {
            medecin: option.value,
            patient: document.querySelector('#patient').value,
            date: document.querySelector('#date').value,
            heure: document.querySelector('#heure').value,
            diagnostic: document.querySelector('#diagnostic').value
        }
    )
    localStorage.setItem('form2', JSON.stringify(tab2))
    displayRv()
    this.reset()
    window.location.reload()
})

function ModifierRv(i) {

    document.querySelector('#sect2').innerHTML = `
                <select name=""></select>
                <br>
                <input type="text"  id="patient" value="${tab2[i].patient}"  required >
                <br>
                <input type="date"  id="date" value="${tab2[i].date}"  required>
                <br>
                <input type="time" id="heure" value="${tab2[i].heure}" required>
                <br>
                <textarea name="" id="diagnostic" cols="30" rows="5">${tab2[i].diagnostic}</textarea>
                <br>
                <button id="button" type="submit">Modifier RV </button>`;

    for (let j = 0; j < tab1.length; j++) {
        document.querySelector(' #sect2 select').innerHTML += `<option value="${tab1[j].nom}">
        ${tab1[j].nom} (${tab1[j].specialite})
        </option>`
    }
    document.querySelector('#button').addEventListener('click', () => {

        tab2[i].medecin = document.querySelector('#sect2 select').value
        tab2[i].patient = document.querySelector(' #sect2 #patient').value
        tab2[i].date = document.querySelector(' #sect2 #date').value
        tab2[i].heure = document.querySelector(' #sect2 #heure').value
        tab2[i].diagnostic = document.querySelector('#sect2 #diagnostic').value
        localStorage.setItem('form2', JSON.stringify(tab2))
        window.location.reload()
    })
}


function SupprimerRv(i) {
    if (confirm('etes vous sur')) {
        tab2.splice(i, 1)
        localStorage.setItem('form2', JSON.stringify(tab2));
        displayRv()
        return window.location.reload()
    } return false
}

window.addEventListener('load', () => {
    for (let i = 0; i < tab1.length; i++) {
        document.querySelector('select').innerHTML += `<option>${tab1[i].nom} (${tab1[i].specialite})</option>`
    }
});    