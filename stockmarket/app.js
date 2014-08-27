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
        document.getElementById('chooseColumn').style.display = 'block';
        document.getElementById('logout').style.display = 'block';
        document.getElementById('logout').onclick = function() {
            login.logoff();
            window.location.reload();
        }
        getData(xhr);
    }

});

function toggleChooseColumn() {
    if (document.getElementById('chooseColumnDiv').style.display != 'none')
        document.getElementById('chooseColumnDiv').style.display = 'none';
    else
        document.getElementById('chooseColumnDiv').style.display = 'block';
}

var columnConfig = {};

function getColumnConfig() {
    if (typeof (Storage) !== "undefined") {
        var config = localStorage.getItem("columnConfig");
        if (config) {
            columnConfig = JSON.parse(config);
            console.log(columnConfig);
        }
        for (var name in columnConfig) {
            document.getElementById('choose' + name).checked = columnConfig[name];
            showHideColumns(name, columnConfig[name], true);
        }
    } else {
        console.log("Column configuration saving not available.");
    }
}
getColumnConfig();

function saveColumnConfig() {
    if (typeof (Storage) !== "undefined") {
        var config = JSON.stringify(columnConfig);
        localStorage.setItem("columnConfig", config);
        console.log('config saved', columnConfig);
    }
}

function showHideColumns(name, value, dontsave) {
    if (value) {
        for (var index in document.querySelectorAll('td.' + name)) {
            if (document.querySelectorAll('td.' + name)[index].style)
                document.querySelectorAll('td.' + name)[index].style.display = "block";
        }
    } else {
        for (var index in document.querySelectorAll('td.' + name)) {
            if (document.querySelectorAll('td.' + name)[index].style)
                document.querySelectorAll('td.' + name)[index].style.display = "none";
        }
    }
    if (!dontsave) {
        columnConfig[name] = value;
        saveColumnConfig();
    }
}

function getColumnDisplay(name) {
    if (typeof columnConfig[name] !== 'undefined')
        return columnConfig[name] ? 'block' : 'none';
    return 'block';
}

var errorCount = 0;

function getData(xhr) {
    xhr.get('services/stocks.json?_' + Math.floor(Math.random() * 10000)).then(function (data) {
        document.querySelector('#stocktable tbody').innerHTML = "";
        var count = 1;
        for (var index in data.stocks) {
            var row = document.querySelector('#stocktable tbody').insertRow(-1);
            row.innerHTML = "<td class='serial' style='display:" + getColumnDisplay('serial') + "'>" + count+++"</td>" +
                "<td class='name' style='display:" + getColumnDisplay('name') + "'>" + data.stocks[index]["name"] + "</td>" +
                "<td class='code' style='display:" + getColumnDisplay('code') + "'>" + data.stocks[index]["code"] + "</td>" +
                "<td class='yest' style='display:" + getColumnDisplay('yest') + "'>" + data.stocks[index]["yesterday"] + "</td>" +
                "<td class='price' style='display:" + getColumnDisplay('price') + "'>" + data.stocks[index]["today"] +
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
