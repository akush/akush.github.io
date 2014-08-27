require(['js/login_module', 'js/xhr_module'], function (login, xhr) {
    if (!login.get()) {
        console.log('login');
        document.getElementById('login').style.display = 'block';
        document.getElementById('loginsubmit').onclick = function () {
            if (document.getElementById("inputRememberme").checked)
                login.setRemember(document.getElementById("inputUsername").value);
            else
                login.setSession(document.getElementById("inputUsername").value);
            console.log('submit');
            window.location.reload();
        }
    } else {
        console.log('inside');
        document.getElementById('container').style.display = 'block';
        getData(xhr);
    }

});
var errorCount = 0;

function getData(xhr) {
    xhr.get('services/stocks.json?_' + Math.floor(Math.random() * 10000)).then(function (data) {
        document.querySelector('#container table tbody').innerHTML = "";
        var count = 1;
        for (var index in data.stocks) {
            console.log(data.stocks[index]);
            var row = document.querySelector('#container table tbody').insertRow(-1);
            row.innerHTML = "<td class='serial'>" + count+++"</td>" +
                "<td class='name'>" + data.stocks[index]["name"] + "</td>" +
                "<td class='code'>" + data.stocks[index]["code"] + "</td>" +
                "<td class='yest'>" + data.stocks[index]["yesterday"] + "</td>" +
                "<td class='price'>" + data.stocks[index]["today"] +
                " <img src='images/" + (data.stocks[index]["yesterday"] < data.stocks[index]["today"] ? "up" : "down") + ".png'></td>";
        }
        setTimeout(function () {
            getData(xhr);
        }, 5000);


    }, function (err) {
        console.log(err);
        errorCount++;
        alert("Problem occured. Trying again.");
        setTimeout(function () {
            if (errorCount < 2) getData(xhr);
            else alert('Unable to reach server. Please refresh later.');
        }, 5000);
    });
}
