const Flight = require('../models/flight');

module.exports = {
    new: newFlight,
    create,
    index
}

function index(req, res) {
    Flight.find({}, function(err, flights) {
        flights.sort(function(a, b) {
            return a.departs - b.departs
        })
        console.log(flights)
        res.render('flights/index', {
            title: 'All Flights',
            flights
        });
    });
}

function create(req, res) {
    const flight = new Flight(req.body);
    flight.save(function(err) {
        if (err) return res.redirect('flights/new');
        console.log(flight);
        res.redirect('/flights');
    });
}

function newFlight(req, res) {
    let yearFromNow = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    let defaultDate = yearFromNow.toISOString().substr(0,19);
    res.render('flights/new', {
        title: 'Add Flight',
        defaultDate
    });
}