(() => {

    'use strict'

    let deck = [];

    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    const btnPedirCarta = document.querySelector('#btnPedirCarta'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevoJuego = document.querySelector('#btnNuevoJuego'),
          puntosHTML = document.querySelectorAll('.puntosJugadores'),
          divCartasJugadores = document.querySelectorAll('.divCartas');


    const iniciarJuego = (numJugadores = 2) => {

        deck = crearDeck();
        puntosJugadores = [];

        for( let i = 0; i < numJugadores; i++ ) {

            puntosJugadores.push(0);

            puntosHTML[i].innerText = 0;
            divCartasJugadores[i].innerHTML = '';
            
        }
        
        btnDetener.disabled = false;
        btnPedirCarta.disabled = false;

    }

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

        const puntosJugador = acumularPuntos(0, carta);

        crearCarta(0, carta);

        if (puntosJugador >= 21) {

            btnPedirCarta.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }

    })

    const acumularPuntos = (turno, carta) => {

        puntosJugadores[turno] += getValorCarta(carta);

        puntosHTML[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];

    }

    const crearCarta = (turno, carta) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');

        divCartasJugadores[turno].appendChild(imgCarta);

    }

    const getGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {

            if (puntosComputadora === puntosMinimos)
                return alert('Es un empate!');

            if (puntosMinimos > 21)
                return alert('La computadora gana!');

            if (puntosComputadora > 21)
                return alert('Ganaste!');

            if (puntosMinimos > puntosComputadora)
                return alert('Ganaste!');
            else
                return alert('La computadora gana, vuelve a intentarlo!');

        }, 100);
    
    }

    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();

            puntosComputadora = acumularPuntos(puntosJugadores.length - 1, carta);

            crearCarta(puntosJugadores.length - 1, carta);

        } while ((puntosComputadora < puntosMinimos) && puntosMinimos <= 21);

        getGanador();

    }

    btnDetener.addEventListener('click', () => {

        btnPedirCarta.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugadores[0]);

    })

    btnNuevoJuego.addEventListener('click', () => {

        iniciarJuego();

    })

})();

