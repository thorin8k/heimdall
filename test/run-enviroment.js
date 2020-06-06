
before((done) => {
    console.log('Starting test env');

    require('../loadapp.js')(false).then(() => {
        console.log('started')
        setTimeout(done, 300);
    }).catch(done);
})