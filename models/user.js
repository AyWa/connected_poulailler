var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

//todo birthday //age based on birthday
var UserSchema = new Schema({
  // set up a mongoose model
  profile: {
    firstName: {type: String, trim: true, required: true },
    lastName: {type: String, trim: true, required: true },
  },
  data: {
    email: { type: String, unique: true, lowercase: true, trim: true, required: true },
    facebookId: {type: String, lowercase: true, trim: true},
    password: {type: String, trim: true},
    passwordResetToken: {type: String},
    passwordResetExpires: {type: Date},
    isAdmin: {type: Boolean, required: true, default: false},
  },
  poule:{
    nombre_poules: {type: Number, min: 0, max: 100,required: true},
    nombre_inside: {type: Number, min: 0, max: 100,required: true},
    time_ouverture: {
      hour:{type: Number, min: 0, max: 23,required: true},
      minute:{type: Number, min: 0, max: 59,required: true},
    },
    time_fermeture:  {
      hour:{type: Number, min: 0, max: 23, required: true},
      minute:{type: Number, min: 0, max: 59,required: true},
    },
    porte_ouverte: {type: Boolean, required: true}
  }
});

UserSchema.pre('save', function (next) {
    var user = this;
    if(typeof user.data.facebookId !== 'undefined' && user.data.facebookId !== null){
      console.log('facebook save =>no bscrypt');
      return next();
    }
    else if (this.isModified('password') || this.isNew) {
        console.log('not facebook save ==> bscrypt');
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.data.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.data.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.data.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
