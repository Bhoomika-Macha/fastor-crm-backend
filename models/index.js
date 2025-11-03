const sequelize = require('../config/database');
const Employee = require('./employee');
const Enquiry = require('./enquiry');

Employee.hasMany(Enquiry, { foreignKey: 'counselorId' });
Enquiry.belongsTo(Employee, { foreignKey: 'counselorId' });

module.exports = { sequelize, Employee, Enquiry };
