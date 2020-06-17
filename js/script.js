$(document).ready(function() {

  // Evento al click dell'icona invia
  $('.write-chat i.send').click(function() {
    scriviEInviaMessaggio();
    // window.setTimeout(riceviMessaggio, 1000);
  });

  // Evento al click del tasto invia della tastiera
  $(document).keypress(function(event) {
    if (event.which === 13) {
      scriviEInviaMessaggio();
      // window.setTimeout(riceviMessaggio, 1000);
    }
  });

  $('.search input').keyup(function() {
    $('.contacts ul li .name').each(verificaSeStringaPresente);
  });

  //// FUNZIONE DA AGGIUNGERE
  // // Scrivo il valore dell'input anche nel sottotitolo del contatto
  // var attributoChat = $('.read-chat .texts').attr();
  // $('.single-contact .name-subtitle .subtitle').text(valoreText);

});

// FUNZIONI

// Function che serve a trascrivere del testo da un input ad un template
// dell'html clonato, per poi appenderlo ad una lista
// NESSUN argomento
// NESSUN return
function scriviEInviaMessaggio() {
  // Creo una variabile con il valore dell'input(messaggio)
  var valoreText = $('.write-chat input').val();

  if(valoreText != ''){
    // Clono il template del messaggio
    var cloneText = $('.template li').clone();

    // Creo la variabile con le ore e minuti correnti
    var d = new Date();
    var minutes = d.getMinutes();
    var hours = d.getHours();
    var currentTime = aggiungiZero(hours) + ':' + aggiungiZero(minutes);

    // Scrivo all'interno del clone
    cloneText.children('p:first-child').text(valoreText);
    cloneText.children('p.time').text(currentTime);

    // Aggiungo la classe css per dare gli stili
    cloneText.addClass('green-text');

    // Appendo nell'html il clone del messaggio
    $('.read-chat ul').append(cloneText);

    // La pagina fa lo scroll fino al nuovo scriviEInviaMessaggio
    $('.read-chat').scrollTop($('.read-chat').height());

    // Rimuovo il contenuto dall'input iniziale
    $('.write-chat input').val('');

    window.setTimeout(riceviMessaggio, 1000);
  }

}

function riceviMessaggio() {
  // Clono il template del messaggio
  var cloneText = $('.template li').clone();

  // Creo la variabile con le ore e minuti correnti
  var d = new Date();
  var minutes = d.getMinutes();
  var hours = d.getHours();
  var currentTime = aggiungiZero(hours) + ':' + aggiungiZero(minutes);

  // Scrivo all'interno del clone
  cloneText.children('p:first-child').text('ok');
  cloneText.children('p.time').text(currentTime);

  // Aggiungo la classe css per dare gli stili
  cloneText.addClass('white-text');

  // Appendo nell'html il clone del messaggio
  $('.read-chat ul').append(cloneText);

  // La pagina fa lo scroll fino al nuovo scriviEInviaMessaggio
  $('.read-chat').scrollTop($('.read-chat').height());
}

// Function che appende uno zero davanti ai numeri inferiori a 10
// Argomento: number, un numero
// return: newNumber, il numero immutato oppure con lo zero aggiunto
function aggiungiZero(number) {
  var newNumber = number;
  if(number < 10) {
    newNumber = '0' + number;
  }

  return newNumber;
}

// Function per cercare una stringa dentro ad un'altra stringa
function verificaSeStringaPresente() {
  var valoreRicerca = $('.search input').val();
  var valoreRicercaStandardizzato = valoreRicerca.toLowerCase();
  var nomeListaStandardizzato = $(this).text().toLowerCase();

  if (nomeListaStandardizzato.includes(valoreRicerca) === false) {
    $(this).parents('.single-contact').addClass('hide');
    // console.log(nomeListaStandardizzato.includes(valoreRicerca));
  } else if (nomeListaStandardizzato.includes(valoreRicerca) === true) {
    $(this).parents('.single-contact').removeClass('hide');
  } else if (valoreRicerca === '') {
    $('.contacts ul li').removeClass('hide');
  }

}
