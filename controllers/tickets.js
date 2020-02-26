const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
    new: newTicket,
    create
}

function create(req, res) {
    Ticket.create(req.body, function(err, ticket) {
        res.redirect('/flights')
    });
}

function newTicket(req, res) {
    Ticket.find({}, function(err, tickets) {
        Flight.findById(req.params.id, function(err, flight) {
            res.render('tickets/new', {
                title: "Add Ticket",
                tickets,
                flight
            });
        })
    });
}