((args) => {
    if (window.location.pathname != '/kingdom') return alert('You must be in a crazy kingdom game!');
    try {
        Object.values(document.querySelector('#app > div > div'))[1].children[1]._owner.stateNode.setState({ guestScore: args })
        alert('Set guests to ' + args)
    } catch (e) { }


    if (confirm('This code is from a github repository, do you want to see it?')) {
        window.open('https://github.com/glixzzy/blooket-hack', '_blank')
    }

})(Number(prompt('How many guests do you want?')))