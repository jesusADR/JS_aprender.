
let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

function iniciarJuego() {

    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'none'

    let sectionreiniciar = document.getElementById('button-reiniciar')
    sectionreiniciar.style.display = 'none'

    let botonMascotaJugador = document.getElementById('button-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    let botonFuego = document.getElementById('button-fuego')
    botonFuego.addEventListener('click', ataqueFuego)

    let botonAgua = document.getElementById('button-agua')
    botonAgua.addEventListener('click', ataqueAgua)

    let botonTierra = document.getElementById('button-tierra')
    botonTierra.addEventListener('click', ataqueTierra)

    let botonReiniciar = document.getElementById('button-reiniciar')
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() {

    let sectionSeleccionarMascota = document.getElementById('Seleccionar-Mascotas')
    sectionSeleccionarMascota.style.display = 'none'
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'block'

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

function ataqueFuego() {
    ataqueJugador = 'Fuego 🔥'
    ataqueAleatorioEnemigo()
}

function ataqueAgua() {
    ataqueJugador = 'Agua 💧'
    ataqueAleatorioEnemigo()
}

function ataqueTierra() {
    ataqueJugador = 'Tierra 🌿'
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1, 3)

    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'Fuego 🔥'

    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'Agua 💧'

    } else if (ataqueAleatorio == 3) {
        ataqueEnemigo = 'Tierra 🌿'
    }

    combate()
}

function combate() {
    let spanVidasJugador = document.getElementById('vidas-jugador')
    let sapanVidasEnemigo = document.getElementById('vidas-enemigo')

    if (ataqueEnemigo == ataqueJugador) {
        crearMensaje("EMPATE")

    } else if (ataqueJugador == 'Fuego 🔥' && ataqueEnemigo == 'Tierra 🌿') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        sapanVidasEnemigo.innerHTML = vidasEnemigo

    } else if (ataqueJugador == 'Agua 💧' && ataqueEnemigo == 'Fuego 🔥') {
        vidasEnemigo--
        sapanVidasEnemigo.innerHTML = vidasEnemigo
        crearMensaje("GANASTE")



    } else if (ataqueJugador == 'Tierra 🌿' && ataqueEnemigo == 'Agua 💧') {
        vidasEnemigo--
        sapanVidasEnemigo.innerHTML = vidasEnemigo
        crearMensaje("GANASTE")

    } else {
        crearMensaje("PERDISTE")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }

    revisarVidas()
}

function revisarVidas() {
    if (vidasEnemigo == 0) {
        crearMensajeFinal('FELICITACIONES!!! ganaste 🥳🥳 ')
    }

    else if (vidasJugador == 0) {
        crearMensajeFinal('LO SIENTO!!!, perdiste 😢😢')
    }
}

function crearMensaje(resultado) {
    let sectionMensajes = document.getElementById('mensajes')
    let parrafo = document.createElement('p')
    parrafo.innerHTML = 'tu mascota ataco con ' + ataqueJugador + ', las mascota del enemigo ataco con ' + ataqueEnemigo + '-' + resultado

    sectionMensajes.appendChild(parrafo)
}

function crearMensajeFinal(resultadoFinal) {

    let sectionMensajes = document.getElementById('mensajes')
    let parrafo = document.createElement('p')
    parrafo.innerHTML = resultadoFinal

    sectionMensajes.appendChild(parrafo)

    let botonFuego = document.getElementById('button-fuego')
    botonFuego.disabled = true

    let botonAgua = document.getElementById('button-agua')
    botonAgua.disabled = true

    let botonTierra = document.getElementById('button-tierra')
    botonTierra.disabled = true

    let sectionreiniciar = document.getElementById('button-reiniciar')
    sectionreiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego)

