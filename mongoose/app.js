const mongoose = require('mongoose');
// 'mongodb://localhost/'<name of the database>'
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/mongoose-intro')
    .then(() => {
        console.log('Connected to Mongo');
    })
// first we create a schema and then the model
const catSchema = mongoose.Schema({
    name: String,
    lives: Number
});
const Cat = mongoose.model('Cat', catSchema);
// another option would be insertMany() would get array as a parameter
// Cat.create({ name: 'Tom' })
//     .then(catFromDB => {
//         console.log(catFromDB)
//     })
//     .catch(err => {
//         console.log(`Error while creating cat: ${err}`);
//     })
// mongoose queries
// find() returns all documents from the collection - returns an array
// Cat.find().then(cats => {
//     console.log(cats);
// })

// Cat.findById('5fad513f2b582dd2ac98291c').then(cat => {
//     console.log(cat);
// })
// finds the first document that matches the search query
// Cat.findOne({ name: 'Tom' }).then(cat => console.log(cat))

// updates the first document where the search query matches
// Cat.updateOne({ name: 'Tom' }, { name: 'Garfield', lives: 13 }).then(cat => console.log(cat))
// updates all documents where the search query matches
// Cat.updateMany({ name: 'Tom' }, { name: 'Garfield', lives: 13 }).then(cat => console.log(cat))

// Cat.findByIdAndUpdate() 

// deletes the first document that matches the query
// Cat.deleteOne({ hungry: true }).then(result => {
//     console.log(result);
// });

// deletes the document matching the id
// Cat.deleteById('id439028');

// deletes all documents that match the query 
// Cat.deleteMany({ name: "Foo" }).then(result => {
//     console.log(result);
// });

// Cat.insertMany([{ name: 'John' }, { name: 'Paul' }, { name: 'Ringo' }])
//     .then(cats => console.log(cats))

const userSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 20,
        set: value => {
            return value
                .split(' ')
                .map(str => str[0].toUpperCase() + str.slice(1).toLowerCase())
                .join(' ')
        }
    },
    age: {
        type: Number,
        min: 18,
        max: 120
    },
    hobbies: [String],
    address: Object,
    address2: {
        street: String,
        zip: String
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: {
            message: 'Email must be lowercase',
            validator: value => {
                if (value.toLowerCase() === value && value.includes('@')) return true
                else return false
            }
        }
    }
})
const User = mongoose.model('User', userSchema);
User.create({ name: 'micky mouse', email: 'M@gmail.com' })
    .then(user => console.log(user))
    .catch(err => console.log(err))