(() => {
    if (window.location.pathname != '/kingdom') return alert('You must be in a crazy kingdom game!');
    try {
        Object.values(document.querySelector('#app > div > div'))[1].children[1]._owner.stateNode.taxCounter = Number.MAX_VALUE;
    } catch (e) { }


    if (confirm('This code is from a github repository, do you want to see it?')) {
        window.open('https://github.com/glixzzy/blooket-hack', '_blank')
    }
})()