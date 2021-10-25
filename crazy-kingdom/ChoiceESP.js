(() => {
    if (window.location.pathname != '/kingdom') return alert('You must be in a crazy kingdom game!');
    let interval = setInterval(() => {
        try {
            if (window.location.pathname != '/kingdom') return clearInterval(interval);
            Array.from(document.getElementsByClassName('choiceESP')).forEach(x => x.remove())
            let elements = {
                materials: Array.from(document.querySelectorAll('div')).find(x => Array.from(x.children).find(e => e.className.includes('tree'))),
                people: Array.from(document.querySelectorAll('div')).find(x => Array.from(x.children).find(e => e.className.includes('users') && e.parentElement.className.includes('statContainer'))),
                happiness: Array.from(document.querySelectorAll('div')).find(x => Array.from(x.children).find(e => e.className.includes('grin'))),
                gold: Array.from(document.querySelectorAll('div')).find(x => Array.from(x.children).find(e => e.className.includes('coins')))
            }
            let data = Object.values(document.querySelector('#app > div > div'))[1].children[1]._owner.stateNode.state.guest;
            Object.entries(data.yes).forEach(x => {
                if (x[0] == 'msg') return;
                let element = document.createElement('div');
                element.className = 'choiceESP';
                element.style = 'font-size: 24px; color: rgb(75, 194, 46); font-weight: bolder;';
                element.innerText = String(x[1])
                elements[x[0]].appendChild(element);
            })
            Object.entries(data.no).forEach(x => {
                if (x[0] == 'msg') return;
                let element = document.createElement('div');
                element.className = 'choiceESP';
                element.style = 'font-size: 24px; color: darkred; font-weight: bolder;';
                element.innerText = String(x[1])
                elements[x[0]].appendChild(element);
            })
        } catch (e) { }
    }, 0)

    if (confirm('This code is from a github repository, do you want to see it?')) {
        window.open('https://github.com/glixzzy/blooket-hack', '_blank')
    }
})()