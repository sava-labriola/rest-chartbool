$(document).ready(function () {
    chiamata_ajax();
});

function chiamata_ajax() {
    $.ajax({
        'url': "http://157.230.17.132:4011/sales",
        'method': 'GET',
        'success': function(data) {
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
var spese_mensili = {
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
        var cifra = array[i].amount;
        var data = array[i].date;
        var formato_data = moment(data, 'DD/MM/YYYY');
        var mese = formato_data.format('MMMM');
        if(spese_mensili.hasOwnProperty(mese)) {
            spese_mensili[mese] += cifra;
        }
    }
    chiavi = Object.keys(spese_mensili);

    valori = Object.values(spese_mensili);
}

function vendite_per_venditore(array) {
    var venditori = {};
    var spese_totali = 0;
    for (var i = 0; i < array.length; i++) {
        spese_totali += array[i].amount;
        var cifra = array[i].amount;
        var venditore = array[i].salesman;
        if(!venditori.hasOwnProperty(venditore)) {
            venditori[venditore] = cifra;
        } else {
            venditori[venditore] += cifra;
        }
    }
    chiavi2 = Object.keys(venditori);

    valori2 = Object.values(venditori);
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
