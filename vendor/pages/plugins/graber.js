'use strict';

var APiSerp = 'a45af8d0b02b82573b15798e579a48593ea2a841f11fe38db1ab138ab587ac7d';
var APiHunter = '15c96503bd37e96b66e58d786a5609c296ad5be9';

window.addEventListener('load', function(evt) {
    chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
        file: 'payload.js'
    });;
});

var arrays = new Array();
var varName = "";
var varJob = "";
var varCompany = "";
var varCity = "";
var varSince = "";
var varProfil = "";

chrome.runtime.onMessage.addListener(function(message) {
    var type = message.split("#");
    if (type[0] != null && type[0] != undefined && type[1] != null && type[1] != undefined) {

        if (type[0] == "FullName") {
            varName = type[1];
            varJob = type[2]
            varCompany = type[3];
            varCity = type[4];
            varSince = type[5];
            varProfil = type[6];

            launchData();
        }
    } else if (message == "DENIED") {
        $('#FULLNAME').fadeOut();
        $('#FULLJOB').fadeOut();
        $('#FULLCITY').fadeOut();
        $('#FULLPROFIL').fadeOut();
        $('#FULLCOMPANY').fadeOut();
        $('body > div > div > section > div > div > div > div > div > div > div.card-body > div.card.p-3').fadeOut();
        $('body > div > div > section > div > div > div > div > div > div > div.card-body > div.card.p-3 > div > div > div.p-2.mt-2.bg-primaryjustify-content-between.rounded.text-white.stats').fadeOut();

        document.getElementById('Alertbox').innerHTML = '<div class="alert alert-danger"><i class="fas fa-exclamation-circle"></i> We couldn\'t find any options, Sometimes this is inevitable.</div>';
    }

});

var isSubdomain = function(url) {
    var regex = new RegExp(/^([a-z]+\:\/{2})?([\w-]+\.[\w-]+\.\w+)$/);
    return !!url.match(regex);
}

function cleanUrl(url) {
    if (isSubdomain(url)) {
        const firstDotIndex = url.indexOf('.');
        const domain = url.substring(firstDotIndex + 1);

        return domain;
    } else {
        return url;
    }
}

async function launchData() {
    try {
        document.getElementById('FULLNAME').innerText = varName;
        document.getElementById('FULLJOB').innerText = varJob;
        document.getElementById('FULLCITY').innerText = varCity;
        document.getElementById('FULLSINCE').innerHTML = varSince;
        document.getElementById('FULLCOMPANY').innerText = varCompany;
        document.getElementById('FULLPROFIL').src = varProfil;

        document.getElementById('startSearch').style.display = 'block';
    } catch (error) {
        console.log(error);
    }
};

function isEmpty(str) {
    return (!str || str.length === 0);
}

async function launchCancel() {
    document.getElementById('AlertListBox').innerHTML = "";
};

async function launchSearchDomain() {
    var domainName = document.getElementById('SearchDomainInput').value;

    if (isEmpty(domainName)) {
        document.getElementById('Alertbox').innerHTML = '<div class="alert alert-danger"><i class="fas fa-exclamation-circle"></i> We couldn\'t find this domain, Sometimes this is inevitable.</div>';
        document.getElementById('Alertbox').style.display = 'block';
    } else {
        launchSynch(domainName);
    }
};

async function launchRedirect() {
    window.location.reload();
}

async function launchCopy() {
    var copyTextarea = document.getElementById('Alertbox');
    copyTextarea = copyTextarea.innerText.replace('Result : ', '');

    navigator.clipboard.writeText(copyTextarea).then(function() {}, function(err) {});
};

async function launchAsyncProfil() {
    window.location('https://www.xing.com/profile/' + varName.replace(" ", "_") + "/cv");
}

async function launchSynch(message) {
    try {
        document.getElementById('Alertbox').innerHTML = '<div class="alert alert-info"><i class="fa fa-spinner fa-spin" aria-hidden="true"></i> Searching emails for : <b>' + varName + '</div>';
        document.getElementById('AlertListBox').innerHTML = "";

        $('#Alertbox').fadeIn(300);
        await sleep(600);

        var domainName = message;
        var json_obj = JSON.parse(getJSON("https://api.hunter.io/v2/email-finder?domain=" + domainName + "&first_name=" + varName.split(" ")[0] + "&last_name=" + varName.split(" ")[1] + "&api_key=" + APiHunter));

        $('#Alertbox').fadeOut(250);
        if (json_obj.data == null || json_obj.data.email == null) {
            document.getElementById('Alertbox').innerHTML = '<div class="alert alert-danger"><i class="fas fa-exclamation-circle"></i> We couldn\'t find this one Sometimes this is inevitable. Try searching for another profile.</div>';
        } else {
            document.getElementById('Alertbox').innerHTML = '<div class="alert alert-success"><i class="fas fa-check-circle"></i> Result : <b>' + json_obj.data.email.toString() + '</b></div>';
            $('#startCopy').fadeIn(300);
        }

        $('#Alertbox').fadeIn(300);

    } catch (error) {
        document.getElementById('Alertbox').innerHTML = '<div class="alert alert-danger"><i class="fas fa-exclamation-circle"></i> We couldn\'t find this one Sometimes this is inevitable. Try searching for another profile</div>';
    }
};

async function launchSearch() {
    try {
        /*        chrome.tabs.create({
                    url: 'http://127.0.0.1'
                }, function(tab) {
                    alert('hi');
                });*/

        $('#Alertbox').fadeOut(250);
        $('#startSearch').fadeOut(250);
        await sleep(600);

        document.getElementById('Alertbox').innerHTML = '<div class="alert alert-info"><i class="fa fa-spinner fa-spin" aria-hidden="true"></i> Searching datas for : <b>' + varName + '</div>';
        $('#Alertbox').fadeIn(250);

        await sleep(600);

        var json_obj = JSON.parse(getJSON("https://serpapi.com/search.json?api_key=" + APiSerp + "&engine=google&q=" + varCompany.toString()));

        var count = 0;
        var position = json_obj.organic_results;

        $('#Alertbox').fadeIn(250);
        $('#AlertResult').fadeIn(250);
        /*        $('#LTSeperator').fadeOut();
                $('#ProfilCard').fadeOut();*/

        await sleep(2024);

        for (var i = 0; i <= position.length; i++) {

            if (position[i] == null || position[i] == undefined) {
                continue;
            }
            var domain = (new URL(position[i].link.toString()));

            if (arrays.includes(domain.hostname)) {
                continue;
            }

            arrays.push(domain.hostname);

            var domainName = cleanUrl(domain.hostname);

            document.getElementById('AlertListBox').innerHTML = document.getElementById('AlertListBox').innerHTML + '<br>' + '<li class="listBox" id="CtBox-' + i + '">' + domainName + '</li>';
        }

        document.querySelectorAll('[id^="CtBox-"]').forEach(item => {
            item.addEventListener('click', event => {
                launchSynch(item.innerText);
            })
        });

        $('#Alertbox').fadeOut(250);
        await sleep(600);
        document.getElementById('Alertbox').innerHTML = '<div class="alert alert-success"> Found : <strong>' + arrays.length + '</strong> Rows for : ' + varName + '</div>';

        document.getElementById('startCancel').style.display = 'block';

    } catch (error) {}
};

document.addEventListener('DOMContentLoaded', function() {
    var forSearch = document.getElementById('startSearch');

    if (forSearch != null) {
        forSearch.addEventListener('click', launchSearch);
    }

    var forCopy = document.getElementById('startCopy');
    if (forCopy != null) {
        forCopy.addEventListener('click', launchCopy);
    }

    var forProfil = document.getElementById('SearchProfil');
    if (forProfil != null) {
        forProfil.addEventListener('click', launchAsyncProfil);
    }

    var forSearchDomain = document.getElementById('SearchDomain');
    if (forSearchDomain != null) {
        forSearchDomain.addEventListener('click', launchSearchDomain);
    }

    var forHomeDomain = document.getElementById('btnHome');
    if (forHomeDomain != null) {
        forHomeDomain.addEventListener('click', launchRedirect);
    }
});

async function launchSauve() {
    try {
        var enabled = false;

        var valor = document.querySelector("#CrmID").value;
        var json_obj = JSON.parse(getJSON("http://localhost/api/pages/getting.php?crmID=" + valor.toString()));
        var status = json_obj.status;

        if (status == "ERROR") {
            enabled = true;
        } else if (status == "SUCCESS") {
            enabled = false;
        }

        if (enabled == true) {
            document.querySelector("#startSearch").innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Saving ...';

            await sleep(250);

            $.post("http://localhost/api/pages/request.php", {
                firstName: document.querySelector("#FirstName").value,
                lastName: document.querySelector("#LastName").value,
                email: document.querySelector("#Email").value,
                gender: document.querySelector("#Gender").value,
                position: document.querySelector("#Position").value,
                phonenumber: document.querySelector("#PhoneNumber").value,
                zip: document.querySelector("#ZipCode").value,
                crmID: document.querySelector("#CrmID").value
            }, function(data) {});

            await sleep(250);

            document.querySelector("#startSearch").innerHTML = '<i class="fas fa-check-double"></i> Saved';
        } else {
            document.querySelector("#Alertbox").innerText = "Error, Item already saved.";
            document.querySelector("#Alertbox").style = "display:block;color: #fff;background-color: #e74c3c;border-color: #e74c3c;box-shadow: none;";
        }
    } catch (error) {
        alert(error);
    }
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


function getJSON(yourUrl) {
    try {
        var Httpreq = new XMLHttpRequest();
        Httpreq.open("GET", yourUrl, false);
        Httpreq.send(null);
        return Httpreq.responseText;
    } catch (error) {
        alert(error);
    }
}