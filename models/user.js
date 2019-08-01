const mongoose = require('mongoose');
const schema = mongoose.Schema;
const validator = require('validator');
const userSchema = new schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        validate: {
            validator: function(v) {
                if (validator.isEmail(v)) return true;
                return false;
            },
            message: props =>
                `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
}

const User = mongoose.model('User', userSchema);



const getAllUsers = (callback) => {
    User.find(callback)
}

const getUserByEmail = (emailId, callback) => {
    query = {
        email: emailId
    }
    User.findOne(query, callback)
}

const addUser = (user, callback) => {
    const newUser = new User(user);
    newUser.save(callback);
}



const updateUser = (user, callback) => {
    const ID = user._id;
    delete user._id;
    User.findByIdAndUpdate(ID, user, callback);
}


module.exports = {
    getAllUsers,
    getUserByEmail,
    addUser,
    updateUser
}