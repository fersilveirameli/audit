var mongoose=require('mongoose');
var fieldsAliasPlugin = require('mongoose-aliasfield');
var Schema=mongoose.Schema;
var ObjectId = Schema.ObjectId;

var schema = new Schema({
    entityId: {'type' : String, 'alias': 'entity_id'},
    entityName: {'type' : String, 'alias': 'entity_name'},
    entityToString: {'type' : String, 'alias': 'entity_to_string'},
    property: {'type' : String, 'alias': 'entity_property'},
    oldValue: {'type' : String, 'alias': 'old_value'},
    newValue: {'type' : String, 'alias': 'new_value'},
    operation: {'type' : String, 'alias': 'operation_type'},
    authorId: {'type' : String, 'alias': 'author_id'},
    authorName: {'type' : String, 'alias': 'author_name'},
    table: {'type' : String},
    date: Date
}, { collection: 'audit' });

schema.plugin(fieldsAliasPlugin);

module.exports = mongoose.model('Audit', schema);
