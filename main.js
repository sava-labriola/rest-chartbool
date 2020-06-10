$(document).ready(function () {
    chiamata_ajax();
});

function chiamata_ajax() {
    $.ajax({
        'url': "http://157.230.17.132:4011/sales",
        'method': 'GET',
        'success': function(data) {
            vendite_mese(data);
            chart();
        },
        'error': function() {
            alert('errore');
        }
    });
}

function vendite_mese(array) {
var spese_mensili = {};
    for (var i = 0; i < array.length; i++) {
        var cifra = array[i].amount;
        console.log(cifra);
        var data = array[i].date;
        console.log(data);
        var formato_data = moment(data, 'DD/MM/YYYY');
        var mese = formato_data.format('MM');
        console.log(mese);
        if(!spese_mensili.hasOwnProperty(mese)) {
          spese_mensili[mese] = cifra;
        } else {
        spese_mensili[mese] += cifra;
        }
    }
    console.log(spese_mensili);
    chiavi = Object.keys(spese_mensili);

    valori = Object.values(spese_mensili);
}

function chart() {
    var ctx = $('#myChart')[0].getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chiavi,
            datasets: [{
                label: 'Vendite per mese',
                data: valori,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            }]
        },
    });
}
