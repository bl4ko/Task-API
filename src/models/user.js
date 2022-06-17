const mongoose = require('mongoose')
const validator = require('validator')
const bycript = require("bcryptjs")
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,      
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        },
        trim: true, 
        lowercase: true,
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"');
            }
        },
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

// Virtual property = relationship between two entities (user and tasks)
// Relation between two schemas
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner' // field on the task that creates relationship
})

// How to convert userschema 
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

// methods available on instances ()
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismysecret')

    // add token to the database
    user.tokens = user.tokens.concat({ token });
    await user.save()

    return token;
}

// static methods accessable on models (like static in java)
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email });

    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bycript.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Unable to login");
    }

    return user;
}

// Hash the plain text password before saving
// before users are saved this function executes
userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bycript.hash(user.password, 8);
    }

    next();
})

// Delete all of the user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this;
    await Task.deleteMany({ owner: user._id })
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User