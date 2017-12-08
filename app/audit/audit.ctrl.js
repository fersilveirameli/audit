var Audit = require('./audit');

var OPERATIONS = ['CREATE','UPDATE','REMOVE'];

module.exports = {

    list: function(req, res) {
        var onSuccess = function(audits) {
            res.json(audits);
        };

        Audit.find(parameters(req)).exec().then(onSuccess).catch(onError);
    },

    get: function(id, res) {
        var onSuccess = function(audit) {
            res.json(audit);
        };
        Audit.findOne({ _id: id}).then(onSuccess).catch(onError);
    },

    save: function(req, res) {

        var audit = new Audit(req.body);
        audit.operation = OPERATIONS.indexOf(req.body.operation);
        audit.date = new Date();

        Audit.find(paramPersister(audit)).exec().then(function(persisters){

            if(persisters.length===0){

                var onSuccess = function(audit) {
                    audit.operation = OPERATIONS[audit.operation];
                    res.json({ message: 'Saved!', data:audit });
                };
                audit.save().then(onSuccess).catch(onError);
            }else{
                res.json({ message: 'Not Modified!'});
            }
        }).catch(onError);

    }

};

var paramPersister = function(audit){
    return {
        entityId: audit.entityId,
        entityName: audit.entityName,
        property: audit.property,
        oldValue: audit.oldValue,
        newValue: audit.newValue,
        authorId: audit.authorId,
        authorName: audit.authorName
    };
};

var parameters = function (req){
    var param = {};
    if(req.query.entityId){
        param.entityId = req.query.entityId;
    }
    if(req.query.entityName){
        param.entityName = req.query.entityName;
    }
    if(req.query.property){
        param.property = req.query.property;
    }
    return  param;
};

var onError = function(err){
    if (err) {
        logger.error(err.message);
    }
};
