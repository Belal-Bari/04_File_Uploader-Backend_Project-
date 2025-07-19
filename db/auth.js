const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { getUser, getUserThroughId } = require('./querries');

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await getUser(username);
            //Match User
            if(!user) {
                //console.log('auth.js user:', user);
                return done(null, false, {
                    message: "Incorrect Username"
                });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            //Match Password
            if(!isMatch) {
                console.log("password mismatch");
                return done(null, false, {
                    message: "Incorrect Password"
                });
            }
            return done(null, user)
        } catch (error) {
            console.log(error.message);  
            return done(error);          
        }
    })
)

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await getUserThroughId(id);
        if(!user) return done(null, false);

        return done(null, user);
    } catch (error) {
        done(error.message);
    }
})

module.exports = {
    passport,
}