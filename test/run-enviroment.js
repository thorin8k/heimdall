
before((done) => {
    console.log('Starting test env');

    //TODO ensure database connection
    require('../loadapp.js')(false).then(done);
})