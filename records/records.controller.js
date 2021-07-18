const express = require('express');
const app = express();
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('../_middleware/authorize');
const recordServices = require('./record.service');


app.use(express.json);
app.use(express.urlencoded({ extended: true }));

// routes
router.post('/create-record', authorize(), createSchema, create);
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function createSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    recordServices.create(req.body)
        .then(() => res.json({ message: 'Reocord Created Successfully' }))
        .catch(next);
}

function getAll(req, res, next) {
    recordServices.getAll()
        .then(records => res.json(records))
        .catch(next);
}

function getById(req, res, next) {
    recordServices.getById(req.params.id)
        .then(record => res.json(record))
        .catch(next);
}

function updateSchema(req, res, next) {
    
    const schema = Joi.object({
        name: Joi.string().empty(''),
        address: Joi.string().empty(''),
        city: Joi.string().empty(''),
        state: Joi.string().empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    recordServices.update(req.params.id, req.body)
        .then(record => res.json(record))
        .catch(next);
}

function _delete(req, res, next) {
    recordServices.delete(req.params.id)
        .then(() => res.json({ message: 'Record deleted sucessfully' }))
        .catch(next);
}