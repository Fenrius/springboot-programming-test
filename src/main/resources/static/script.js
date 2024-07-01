const counter= document.getElementById("counter");
const backendcallbutton = document.getElementById("backendcall");
const tableBody = document.querySelector("#userAgentTable tbody");

let solutionArrayLength = 0;

getApi();

backendcallbutton.addEventListener("click", postApi);


async function getApi() {
    const response = await fetch("http://localhost:8080/CounterData")
    const solution = await response.json();
    solutionArrayLength = solution.length;
    counter.innerText = "Count : " + solutionArrayLength;

    for(let i = 0; i <= solution.length; i++) {
        let entries = solution[i];

        let row = document.createElement("tr");

        let id = document.createElement("td");
        id.textContent = entries.id;

        let browser = document.createElement("td");
        browser.textContent = entries.browser;

        let deleteButton = document.createElement("td");
        deleteButton.innerHTML = "<button onclick='deleteApi(this)'>Delete</button>";

        row.appendChild(id);
        row.appendChild(browser);
        row.appendChild(deleteButton);

        tableBody.appendChild(row);
    }
}

async function postApi(){
    let coda ="";
    let userAgent = navigator.userAgent;
    // Detect Firefox
    if (/Firefox/.test(userAgent)) {
        coda = "Firefox";
    }
    // Detect Chromium-based Edge
    else if (/Edg/.test(userAgent)) {
        coda = "Edge";
    }
    // Detect Chrome
    else if (/Chrome/.test(userAgent) && !/Chromium/.test(userAgent)) {
        coda = "Chrome";
    }
    // Detect Safari
    else if (/Safari/.test(userAgent)) {
        coda = "Safari";
    }
    // Detect Internet Explorer
    else if (/Trident/.test(userAgent)) {
        coda = "Internet Explorer";
    }
    else {
        coda = "Other";
    }


    await fetch("http://localhost:8080/CounterData",
    {
        method: "POST",
        headers:{
            "Accept": "application/json",
            "Content-type": "application/json"
    },
        body: coda
    })
    if (coda !== null || undefined) {
        alert("Call Successful");
    } else {
        alert("Call Unsuccessful");
    }
        location.reload()
}

async function deleteApi(button) {
    cellId =  button.parentNode.parentNode.cells[0].innerText

   await fetch("http://localhost:8080/CounterData/" + cellId, {
       method: "DELETE"
        })
    location.reload()

}