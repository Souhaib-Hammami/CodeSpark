const { DataTypes } = require('sequelize');
const pgconnection = require('../postgresql/connection');

const users = require('./users')(pgconnection, DataTypes);
const groups = require('./groups')(pgconnection, DataTypes);
const files = require('./files')(pgconnection, DataTypes);
const groups_members = require('./groups_members')(pgconnection, DataTypes);

const ApplyRelation = require('./relations');
ApplyRelation(users, groups, groups_members, files);

module.exports = {pgconnection,users,groups,files,groups_members,};
