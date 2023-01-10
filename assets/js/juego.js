(() => {

    'use strict'

    let deck = [];

    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugador = 0,
        puntosComputadora = 0;

    const btnPedirCarta = document.querySelector('#btnPedirCarta'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevoJuego = document.querySelector('#btnNuevoJuego'),
          puntosJugadorHTML = document.querySelector('#puntosJugador'),
          puntosComputadoraHTML = document.querySelector('#puntosComputadora'),
          divCartasJugador = document.querySelector('#jugador-cartas'),
          divCartasComputadora = document.querySelector('#computadora-cartas');


    // Función para crear nueva baraja
    const crearDeck = () => {

        deck = [];

        for (let i = 2; i < 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }
        }

        return _.shuffle(deck);

    }

    // Función para tomar carta 
    const pedirCarta = () => {

        if (deck.length === 0)
            throw 'No hay cartas en la baraja';

        return deck.pop();

    }

    const getValorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1);

        if (isNaN(valor))
            return valor === 'A' ? 11 : 10;
        else
            return +valor;

    }

    btnPedirCarta.addEventListener('click', () => {

        const carta = pedirCarta();

        puntosJugador += getValorCarta(carta);

        puntosJugadorHTML.innerText = puntosJugador;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');

        divCartasJugador.appendChild(imgCarta);

        if (puntosJugador >= 21) {

            btnPedirCarta.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }

    })

    const turnoComputadora = (puntosMinimos) => {

        do {
            const carta = pedirCarta();

            puntosComputadora += getValorCarta(carta);

            puntosComputadoraHTML.innerText = puntosComputadora;

            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartasComputadora.appendChild(imgCarta);

        } while ((puntosComputadora < puntosMinimos) && puntosMinimos <= 21);

        setTimeout(() => {

            if (puntosComputadora === puntosMinimos)
                return alert('Es un empate!');

            if (puntosMinimos > 21)
                return alert('La computadora gana!');

            if (puntosComputadora > 21)
                return alert('Ganaste!');

            if(puntosMinimos > puntosComputadora)
                return alert('Ganaste!');
            else
                return alert('La computadora gana, vuelve a intentarlo!');

        }, 100);

    }

    btnDetener.addEventListener('click', () => {

        btnPedirCarta.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugador);

    })

    btnNuevoJuego.addEventListener('click', () => {

        window.location.reload();

    })

    const iniciarJuego = () => {

        deck = crearDeck();
    }

    iniciarJuego();

})();

