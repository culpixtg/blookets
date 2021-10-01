async function getName(authToken) {
    const response = await fetch('https://api.blooket.com/api/users/verify-token?token=JWT+' + authToken);
    const data = await response.json();

    return data.name
};

async function openBoxes() {
    const box = prompt('What box would you like to open?');
    const myToken = localStorage.token.split('JWT ')[1];
    const blooketName = await getName(myToken);

    setInterval(async () => {
        
        if (box.includes('Box')) {
            const _box = box.split(' Box')[0];

            const response = await fetch('https://api.blooket.com/api/users/unlockblook', {
                method: "PUT",
                headers: {
                    "referer": "https://www.blooket.com/",
                    "content-type": "application/json",
                    "authorization": localStorage.token
                },
                body: JSON.stringify({
                    box: _box,
                    name: blooketName
                }),
            });
            const data = await response.json();

            if (response.status == 500) {
                alert('You don\'t have enough tokens to buy this box.');
            };

            console.log({ blook: data.unlockedBlook, tokens: data.tokens, newBlook: data.isNewBlook });

        } else {
            alert('Please include full box name, refresh your page now. EXAMPLE: Aquatic Box');
        };

    }, 1000); //this is ms so 1000ms equals 1 second. You can edit the ms if you'd like to
};

openBoxes();
