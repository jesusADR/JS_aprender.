
function iniciarJuego() {
    let botonMascotaJugador = document.getElementById('button-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
}

function seleccionarMascotaJugador() {

    let inputHipodoge = document.getElementById('Hipodoge')
    let inputCapipepo = document.getElementById('Capipepo')
    let inputRatigueya = document.getElementById('Ratigueya')

    if (inputHipodoge.checked) {
        alert('felicitaciones elegistes hipodoge')
    }

    else if (inputCapipepo.checked) {
        alert('felicitaciones alegiste capipepo')
    }

    else if (inputRatigueya.checked) {
        alert('felicitaciones elegiste Ratigueya')
    }
}

window.addEventListener('load', iniciarJuego)


