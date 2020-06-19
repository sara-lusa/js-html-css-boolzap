$(document).ready(function() {

  // Se faccio .focus sull'input per scrivere messaggio
  // l'icona per inviare compare
  $('.write-chat input').focus(function() {
    $('.write-chat .sent-icons i.send').removeClass('fa-microphone').addClass('fa-paper-plane');
  });

  // Se faccio .blur furoi dall'input per scrivere messaggio
  // l'icona per inviare scompare
  $('.write-chat input').blur(function() {
    $('.write-chat .sent-icons i.send').addClass('fa-microphone').removeClass('fa-paper-plane');
  });

  // Evento al click dell'icona invia
  $('.write-chat i.send').click(function() {
    scriviEInviaMessaggio();
  });

  // Evento al click del tasto invia della tastiera
  $(document).keypress(function(event) {
    if (event.which === 13) {
      scriviEInviaMessaggio();
    }
  });

  // Appena scrivo dei caratteri nell'input,
  // Parte una verifica su ogni nome dei contatti
  $('.search input').keyup(function() {
    $('.contacts .single-contact .name').each(verificaSeStringaPresente);
  });

  // Quando passo con il cursor su un messaggio, compare la freccia
  // Che prima aveva classe hide
  $(document).on('mouseenter', '.single-text', function() {
    $(this).children('.dropdown-arrow').removeClass('hide');
  });

  // // Quando esco con il cursor da un messaggio, scompare la freccia
  // // a cui avevo rimosso la classe hide
  $(document).on('mouseleave', '.single-text', function() {
    $(this).children('.dropdown-arrow').addClass('hide');
  });

  // Quando clicco sulla icona-freccia dropdown-arrow, compare
  // una tendina dropdown, e tutte quelle già aperte si chiudono
  $(document).on('click', '.dropdown-arrow', function() {
    $(this).parents('.single-text').siblings('.single-text').find('.dropdown').addClass('hide')
    $(this).siblings('.dropdown').toggleClass('hide');
  });

  // Se clicco sulla li.delete, 'Cancella messaggio', l'intero messaggio(single-text),
  // Viene rimosso dalla pagina corrente
  $(document).on('click', '.dropdown li.delete', function() {
    $(this).parents('.single-text').remove();
  });

  // Se clicco sui singoli contatti, visualizzo la chat corrispondente sulla read-chat
  $('.single-contact').click(function() {

    // Al contatto selezionato si colora il background, aggiungendo
    // la classe .selected
    $('.single-contact').removeClass('selected');
    $(this).addClass('selected');

    // Dichiaro le varibili utili
    // L'attributo dell'elemento che rappresenta il contatto cliccato
    var singleContactAttr = $(this).attr('data-contact');
    // L'attributo dell'immagine contatto cliccato
    var singleContactImgAttr = $(this).find('img').attr('src');
    // Il testo della classe .name(quindi il nome) del contatto cliccato
    var singleContactName = $(this).find('.name').text();

    // Dichiaro il selettore: l'attributo è così dinamico
    var selettoreChat = '.texts[data-texts="' + singleContactAttr + '"]';

    // Alle chat che non sono state cliccate, viene tolta la classe .active
    // Per renderle così non visibili
    $(selettoreChat).siblings('.texts').removeClass('active');
    // Alla chat cliccata invece, viene aggiunta la classe .active
    // Per renderla così visibile
    $(selettoreChat).addClass('active');

    // Vengono poi modificati l'img e il nome che si trovano nell'header della chat-room
    $('.chat-room header .avatar img').attr('src', singleContactImgAttr);
    $('.chat-room header .name').text(singleContactName);


  });

});

// FUNZIONI

// Function che serve a trascrivere del testo da un input ad un template
// dell'html clonato, per poi appenderlo con classe .green-text ad una lista
// NESSUN argomento
// NESSUN return
function scriviEInviaMessaggio() {
  // Creo una variabile con il valore dell'input(messaggio)
  var valoreText = $('.write-chat input').val();

  if(valoreText != ''){
    // Clono il template del messaggio
    var cloneText = $('.template .single-text').clone();

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
    $('.read-chat ul.texts.active').append(cloneText);

    // La pagina fa lo scroll fino al nuovo scriviEInviaMessaggio
    $('.read-chat').scrollTop($('.read-chat').prop('scrollHeight'));

    // Rimuovo il contenuto dall'input iniziale
    $('.write-chat input').val('');

    // // Scrivo il valore dell'input anche nel sottotitolo del contatto
    var attributChat = $('.read-chat ul.texts.active').attr('data-texts');
    var selettoreContatto = '.single-contact[data-contact="' + attributChat + '"]';

    $(selettoreContatto).find('.subtitle').text(valoreText);

    window.setTimeout(riceviMessaggio, 1000);
  }

}

// Function che serve a trascrivere del testo da un input ad un template
// dell'html clonato, per poi appenderlo con classe .white-text ad una lista
// NESSUN argomento
// NESSUN return
function riceviMessaggio() {
  // Clono il template del messaggio
  var cloneText = $('.template .single-text').clone();

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
  $('.read-chat ul.texts.active').append(cloneText);

  // La pagina fa lo scroll fino al nuovo scriviEInviaMessaggio
  $('.read-chat').scrollTop($('.read-chat').prop('scrollHeight'));

  // // Scrivo il valore dell'input anche nel sottotitolo del contatto
  var attributChat = $('.read-chat ul.texts.active').attr('data-texts');
  var selettoreContatto = '.single-contact[data-contact="' + attributChat + '"]'

  $(selettoreContatto).find('.subtitle').text('ok');
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
// NESSUN argomento
// NESSUN return
function verificaSeStringaPresente() {

  // Dichiaro in una variabile(valoreRicerca) il testo digitato nell'input
  var valoreRicerca = $('.search input').val();

  // Standardizzo valoreRicerca e i valori in cui dovrò poi cercare la stringa stessa(nomeListaStandardizzato)
  var valoreRicercaStandardizzato = valoreRicerca.toLowerCase();
  var nomeListaStandardizzato = $(this).text().toLowerCase();

  // Se nel nomeListaStandardizzato non compare valoreRicercaStandardizzato,
  // Aggiungo la classe hide per far scomparire nomeListaStandardizzato
  if (nomeListaStandardizzato.includes(valoreRicercaStandardizzato) === false) {
    $(this).parents('.single-contact').addClass('hide');
  }

  // Se nel nomeListaStandardizzato compare valoreRicercaStandardizzato,
  // Rimuovo la classe hide, se fosse presente, altrimenti non faccio nulla
  else if (nomeListaStandardizzato.includes(valoreRicercaStandardizzato) === true) {
    $(this).parents('.single-contact').removeClass('hide');
  }

}
