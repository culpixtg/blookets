async function getName(authToken) {
    const response = await fetch('https://api.blooket.com/api/users/verify-token?token=JWT+' + authToken);
    const data = await response.json();

    return data.name
};

function addTokens() {
    const add_tokens = prompt('How many tokens do you want to add to your account? (500 daily)');
    const myToken = localStorage.token.split('JWT ')[1];

    if (add_tokens > 500) {
        alert('You can add up to 500 tokens daily')
    }

    fetch('https://api.blooket.com/api/users/addtokens', {
        method: "PUT",
        headers: {
            "referer": "https://www.blooket.com/",
            "content-type": "application/json",
            "authorization": localStorage.token
        },
        body: JSON.stringify({
            addedTokens: add_tokens,
            name: await getName(myToken)
        })
    }).then(response => {
        if (response.status == 200) {
            alert(`${add_tokens} added to your account!`)
        } else {
            alert('Tokens were not added. Probably because you already added 500 tokens to your account already..')
        };
    });

};

addTokens();
