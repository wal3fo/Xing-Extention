var FullName = document.querySelector("#profile-xingid-container > div > div > div.styles-grid-grid-72b8c4f4 > div:nth-child(2) > div > div.userNamestyles__StyledUserNameRowContainer-ty21zw-0.eccoDT > h1");
var FullJob = document.querySelector("#ProfileTimelineModule > div > div > div > div:nth-child(2) > div.styles-grid-col-545463ec.styles-grid-default12-99c42219.styles-grid-wide10-80b5cf46 > div > div.js9jm7-0 > div:nth-child(2) > button > div > div > div:nth-child(1) > div.styles-grid-col-545463ec.styles-grid-default12-99c42219.styles-grid-confined9-4d3882de > h2");
var FullCompany = document.querySelector("#ProfileTimelineModule > div > div > div > div:nth-child(2) > div.styles-grid-col-545463ec.styles-grid-default12-99c42219.styles-grid-wide10-80b5cf46 > div > div.js9jm7-0 > div:nth-child(2) > button > div > div > div:nth-child(1) > div.styles-grid-col-545463ec.styles-grid-default12-99c42219.styles-grid-confined9-4d3882de > p.x85e3j-0.cxrdOr.sc-1qewlmx-11.djBspq");
var FullCountry = document.querySelector("#profile-xingid-container > div > div > div.styles-grid-grid-72b8c4f4 > div:nth-child(2) > div > div.userInformation__StyledContainer-sc-10ggxzm-0.gmDpNv > span > div");
var FullSince = document.querySelector("#ProfileTimelineModule > div > div > div > div:nth-child(2) > div.styles-grid-col-545463ec.styles-grid-default12-99c42219.styles-grid-wide10-80b5cf46 > div > div.js9jm7-0 > div:nth-child(2) > button > div > div > div:nth-child(1) > div.styles-grid-col-545463ec.styles-grid-default12-99c42219.styles-grid-confined9-4d3882de > div > p");
var FullProfil = document.querySelector("#profile-xingid-container > div > div > div.styles-grid-grid-72b8c4f4 > div.styles-grid-row-fed1719a.main-main-photoAndBadgeRow-4a8c75d0 > div > div > div > div > div > div > div > img");

var XingPermissions = window.location.hostname.toString();

if (this.XingPermissions == "www.xing.com") {
    if (this.FullName != null && this.FullName != undefined) {
        try {
            var elementoName = FullName.innerText;

            if (this.elementoName.includes("Basic")) {
                this.elementoName = this.elementoName.split("Basic")[0];
            }

            if (this.elementoName.includes("Premium")) {
                this.elementoName = this.elementoName.split("Premium")[0];
            }

            if (this.elementoName.includes("Moderator")) {
                this.elementoName = this.elementoName.split("Moderator")[0];
            }

            if (this.elementoName.includes("Administrator")) {
                this.elementoName = this.elementoName.split("Administrator")[0];
            }

            this.elementoName = this.elementoName.replace('Premium', '').replace('Basic', '').replace('Moderator', '').replace('Administrator', '');
            this.elementoName = this.elementoName.replace('Dipl.-Ing.', '').replace('Ing.', '').replace('Dipl.', '').replace('-Ing.', '');

            var elementoJob = "";
            var elementoCompany = "";
            var elementoCity = "";
            var elementoSince = "";
            var elementoProfil = "";


            if (this.FullJob == null) {
                this.elementoJob = "";
            } else {
                this.elementoJob = FullJob.innerText;
            }

            if (this.FullCompany == null) {
                this.elementoCompany = ""
            } else {
                this.elementoCompany = FullCompany.innerText;
            }

            if (this.FullCountry == null) {
                this.elementoCity = ""
            } else {
                this.elementoCity = FullCountry.innerText;
            }

            if (this.FullSince == null) {
                this.elementoSince = ""
            } else {
                this.elementoSince = FullSince.innerHTML;
            }

            if (this.FullProfil == null) {
                this.elementoProfil = "https://profile-images.xing.com/static/nobody_f.256x256.jpg"
            } else {
                this.elementoProfil = FullProfil.src;
            }

            chrome.runtime.sendMessage("FullName#" + this.elementoName + "#" + elementoJob + "#" + elementoCompany + "#" + elementoCity + '#' + elementoSince + '#' + elementoProfil);
        } catch (error) {
            console.log(error);
        } finally {
            //document.querySelector("#profile-xingid-container > div > div > div.styles-grid-grid-72b8c4f4 > div:nth-child(2) > div > div.userNamestyles__StyledUserNameRowContainer-ty21zw-0.eccoDT > h1").innerHTML = '<b style="font-size: 1rem;background-color: #1fabdb;color: #fff;padding: 4px;border-radius: 10px;">Ecstaddy</b><h1 class="wnpgbw-0 JQiMv ty21zw-2 cCdkaw">Sarah Ali <div class="sc-3akg3n-0 hjqihN"><div><span class="sc-1wua2u7-0 etiKYq user-flag-styles-flag-b6f7b286"><span class="x85e3j-0 bRKHRO sc-1wua2u7-1 ioQuhr">Moderator</span></span></div></div></h1>';
        }
    } else {
        console.log("is nulled")
    }
} else {
    chrome.runtime.sendMessage("DENIED");
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}