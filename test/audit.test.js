process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");

var server = require('../index');
var Audit = require("../app/audit/audit");

var should = chai.should();
chai.use(chaiHttp);

var url = '/api/v1/audits';


describe('Audit', function() {

    Audit.collection.drop();

    beforeEach(function(done){
        done();
    });
    afterEach(function(done){
        Audit.collection.drop();
        done();
    });


    it('should add a SINGLE audit on /audits POST', function(done) {
        var audit = {
            "entityId": "123",
            "entityName": "User",
            "entityToString": "to string",
            "property": "username",
            "oldValue": "user.test",
            "newValue": "new.user.test",
            "operation": "CREATE",
            "authorId": "456",
            "authorName": "Angus Young"
        };

        chai.request(server)
        .post(url)
        .send(audit)
        .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.be.a('object');
            res.body.data.should.have.property('_id');
            res.body.data.should.have.property('entityId');
            res.body.data.should.have.property('entityName');
            res.body.data.should.have.property('entityToString');
            res.body.data.should.have.property('property');
            res.body.data.should.have.property('oldValue');
            res.body.data.should.have.property('newValue');
            res.body.data.should.have.property('operation');
            res.body.data.should.have.property('authorId');
            res.body.data.should.have.property('authorName');
            res.body.data.should.have.property('date');

            res.body.data.entityId.should.equal(audit.entityId);
            res.body.data.entityName.should.equal(audit.entityName);
            res.body.data.entityToString.should.equal(audit.entityToString);
            res.body.data.property.should.equal(audit.property);
            res.body.data.oldValue.should.equal(audit.oldValue);
            res.body.data.newValue.should.equal(audit.newValue);
            res.body.data.operation.should.equal(audit.operation);
            res.body.data.authorId.should.equal(audit.authorId);
            res.body.data.authorName.should.equal(audit.authorName);


            done();
        });
    });

});
