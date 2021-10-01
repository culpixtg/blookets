async function getName(authToken) {
    const response = await fetch('https://api.blooket.com/api/users/verify-token?token=JWT+' + authToken.replace('JWT ', ''));
    const data = await response.json();
    return data.name
};
var box = prompt('Which box would you like to open?')
var amount = parseInt(prompt('How many boxes would you like to open?'))
async function openBoxes(token, box, amount) {
    var name = await getName(token),
        tokens = await fetch("https://api.blooket.com/api/users/tokens?name=" + name),
        price = getPrice(box),
        opens = Math.floor(amount * price > tokens ? Math.floor(tokens / 25) : amount * price / 25)
    let interval = setInterval(function () {
        if (!opens) return clearInterval(interval)
        fetch("https://api.blooket.com/api/users/unlockblook", {
            "headers": {
                "accept": "application/json, text/plain, /",
                "accept-language": "en-US,en;q=0.9",
                "authorization": token,
                "content-type": "application/json;charset=UTF-8",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "sec-gpc": "1"
            },
            "referrer": "https://www.blooket.com/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": `{"name":"${name}","box":"${box}"}`,
            "method": "PUT",
            "mode": "cors",
            "credentials": "include"
        }).then(function (response) {
            if (response.status != 200) return clearInterval(interval)
        }).catch(function (e) {
            clearInterval(interval)
        });
        opens--
        if (!opens) clearInterval(interval)
    }, 128)
}

function getPrice(box) {
    switch (box.toLowerCase()) {
        case "aquatic": return 25
        case "bot": return 20
        case "space": return 20
        case "breakfast": return 15
        case "medieval": return 15
        case "wonderland": return 20
    }
}
openBoxes(localStorage.token, box, amount)
