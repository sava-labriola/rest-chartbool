$(document).ready(function () {
    chiamata_ajax();
    modifica_vendite();
});

function modifica_ajax(venditore, mese, cifra) {
    $.ajax({
        'url': "http://157.230.17.132:4011/sales",
        'method': 'POST',
        'data': {
            'salesman': venditore,
            'date': mese ,
            'amount': cifra
        },
        'success': function(data) {
            chiamata_ajax();
        },
        'error': function() {
            alert('errore');
        }
    });
}

function chiamata_ajax() {
    $.ajax({
        'url': "http://157.230.17.132:4011/sales",
        'method': 'GET',
        'success': function(data) {
            console.log(data);
            vendite_mese(data);
            vendite_per_venditore(data);
            chart1();
            chart2();
        },
        'error': function() {
            alert('errore');
        }
    });
}

function vendite_mese(array) {
var vendite_mensili = {
    'January': 0,
    'February': 0,
    'March': 0,
    'April': 0,
    'May': 0,
    'June': 0,
    'July': 0,
    'August': 0,
    'September': 0,
    'October': 0,
    'November': 0,
    'December': 0
};
    for (var i = 0; i < array.length; i++) {
        if(isNaN(array[i].amount)) {
            array[i].amount = 0;
        }
        var cifra = parseInt(array[i].amount);
        var data = array[i].date;
        var formato_data = moment(data, 'DD/MM/YYYY');
        var mese = formato_data.format('MMMM');
        vendite_mensili[mese] += cifra;
    }
    chiavi = Object.keys(vendite_mensili);

    valori = Object.values(vendite_mensili);
}

function vendite_per_venditore(array) {
    var venditori = {};
    var vendite_totali = 0;
    for (var i = 0; i < array.length; i++) {
        vendite_totali += parseInt(array[i].amount);
        var cifra = parseInt(array[i].amount);
        var venditore = array[i].salesman;
        if(!venditori.hasOwnProperty(venditore)) {
            venditori[venditore] = cifra;
        } else {
            venditori[venditore] += cifra;
        }
    }
    for (var cifra_venditore in venditori) {
        var percentuale = (venditori[cifra_venditore] / vendite_totali) * 100;
        percentuale = percentuale.toFixed(1);
        venditori[cifra_venditore] = percentuale;
    }
    chiavi2 = Object.keys(venditori);

    valori2 = Object.values(venditori);
}

function modifica_vendite() {
    $('.add').click(function(){
        var venditore_selezionato = $('.venditore').val();
        var mese_selezionato = $('.mese').val();
        mese_selezionato = moment(mese_selezionato, "MMM");
        mese_selezionato = mese_selezionato.format("01/MM/2017");
        var cifra_selezionata = parseInt($('.utente').val());
        $('.utente').val("");
        modifica_ajax(venditore_selezionato, mese_selezionato, cifra_selezionata);
    })
}

function chart1() {
    var ctx = $('#myChart')[0].getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chiavi,
            datasets: [{
                label: 'Vendite per mese',
                data: valori,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            }]
        },
    });
}

function chart2() {
    var ctx = $('#myChart2')[0].getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: chiavi2,
            datasets: [{
                label: 'Vendite per mese',
                data: valori2,
                backgroundColor: [
                    'rgb(255, 165, 0, 0.2)',
                    'rgb(60, 179, 113, 0.2)',
                    'rgb(255, 0, 0, 0.2)',
                    'rgb(106, 90, 205, 0.2)',
                ],
                borderColor: [
                    'rgb(255, 165, 0, 1)',
                    'rgb(60, 179, 113, 1)',
                    'rgb(255, 0, 0, 1)',
                    'rgb(106, 90, 205, 1)',
                ],
                borderWidth: 1,
            }]
        },
    });
}
