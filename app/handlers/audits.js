
var AuditCtrl  = require('../audit/audit.ctrl');



module.exports = {

    get: function list(req, res) {
        return AuditCtrl.list(req, res);
    },

    post: function save(req, res) {
        return AuditCtrl.save(req, res);
    }

};
