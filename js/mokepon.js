
let ataqueJugador

function iniciarJuego() {
    let botonMascotaJugador = document.getElementById('button-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    let botonFuego = document.getElementById('button-fuego')
    botonFuego.addEventListener('clip', ataqueFuego)
    let botonAgua = document.getElementById('button-agua')
    botonAgua.addEventListener('clip', ataqueAgua)
    let botonTierra = document.getElementById('button-tierra')
    botonTierra.addEventListener('clip', ataqueTierra)
}

function ataqueFuego() {
    ataqueJugador = 'fuego'
    alert(ataqueJugador)
}

function ataqueAgua() {
    ataqueJugador = 'Agua'
    alert(ataqueJugador)
}

function ataqueTierra() {
    ataqueJugador = 'Tierra'
    alert(ataqueJugador)
}


function seleccionarMascotaJugador() {

    let inputHipodoge = document.getElementById('Hipodoge')
    let inputCapipepo = document.getElementById('Capipepo')
    let inputRatigueya = document.getElementById('Ratigueya')
    let spanMascotaJugador = document.getElementById('mascota-jugador')

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = ('Hipodoge')
    }

    else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = ('Capipepo')
    }

    else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = ('Ratigueya')
    }
    else {
        alert("selecciona una mascota")
    }

    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatorio = aleatorio(1, 3)
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo')

    if (mascotaAleatorio == 1) {
        spanMascotaEnemigo.innerHTML = 'Hipodoge'
    } else if (mascotaAleatorio == 2) {
        spanMascotaEnemigo.innerHTML = 'Capipepo'
    } else {
        spanMascotaEnemigo.innerHTML = 'Ratigueya'

    }
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego)


