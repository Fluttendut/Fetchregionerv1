console.log("vi er i fetchregioner")
const urlRegioner = "https://api.dataforsyningen.dk/regioner"
const urlPostRegion = "http://localhost:8080/region"

function fetchAny(url) {
    console.log(url)
    //calls(fetch(GET)) an url and gets a text response, then converts that into a JSON object
    return fetch(url).then((response) => response.json())
}

const ddRegioner = document.getElementById("ddRegioner")
function fillRegionerDropDown(region) {
    //fills out the drop-down menu with the information from the region object(parameter region)
    const el = document.createElement("option")
    el.textContent = region.navn
    el.value = region.kode
    el.region = region
    ddRegioner.appendChild(el)
}

regionList = []
async function fetchRegioner() {
    //await is used when you want to let the browser work with other things while you wait for the answer
    //If you don't do this, then the browser will wait for the answer and do nothing else till it receives the answer
    regionList = await fetchAny(urlRegioner);
    //Checking that the regionList works in the console by printing
    console.log(regionList)
    //Loops and filles in the dropDown in the regionList array (In the browser)
    regionList.forEach(fillRegionerDropDown)
}
let body = {}
const postRegionRequest = {
    method: "POST",
    headers: {
        "content-type": "application/json"
    },
    body: body
}
function postRegioner(region) {
    body = JSON.stringify(region)
    console.log(body)
    postRegionRequest.body = body
    fetch(urlPostRegion, postRegionRequest).catch((error) => console.log(error));
}
function actionPostAllRegioner() {
    if (regionList) {
        console.log("post alle regioner")
        regionList.forEach(postRegioner)
    } else {
        console.log("tryk på fetchregion knappen fjols")
    }
}

const pbFetchRegioner = document.getElementById("pbFetchRegioner")
pbFetchRegioner.addEventListener('click', fetchRegioner)
const pbPostRegioner = document.getElementById("pbPostRegioner")
pbPostRegioner.addEventListener('click', actionPostAllRegioner)