$(document).ready(function() {

  // Evento al click dell'icona invia
  $('.write-chat i.send').click(scriviEInviaMessaggio);

  // Evento al click del tasto invia della tastiera
  $(document).keypress(function() {
    if (event.which === 13) {
      scriviEInviaMessaggio();
    }

  });


});

// FUNZIONI
function scriviEInviaMessaggio() {
  // Creo una variabile con il valore dell'input(messaggio)
  var valoreText = $('.write-chat input').val();
  // Clono il template del messaggio
  var cloneText = $('.template li').clone();

  // Creo la variabile con le ore e minuti correnti
  var d = new Date();
  var minutes = d.getMinutes();
  var hours = d.getHours();
  var currentTime = hours.toString() + ':' + minutes.toString();

  // Scrivo all'interno del clone
  cloneText.children('p:first-child').text(valoreText);
  cloneText.children('p.time').text(currentTime);

  // Aggiungo la classe css per dare gli stili
  cloneText.addClass('green-text');

  // Appendo nell'html il clone del messaggio
  $('.read-chat ul').append(cloneText);

  // Rimuovo il contenuto dall'input iniziale
  $('.write-chat input').val('');
}
