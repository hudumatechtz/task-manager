const { User } = require('../models/user');
const { bcrypt } = require('bcrypt');

exports.postRegister = async (req, res, next) => {
    const { username, password } = req.body;
    console.log("%s and %s", username, password);
    try {
        
    } catch (error) {
        
    }
}
exports.postLogin = async(req, res, next) => {}