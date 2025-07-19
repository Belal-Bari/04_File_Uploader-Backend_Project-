const express = require('express');
require('dotenv').config();
const session = require('express-session');
const router = require('./routes/appRouter');
const path = require('node:path');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('./generated/prisma');
const app = express();
const { passport } = require('./db/auth');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: 'cats',
        resave: true,
        saveUninitialized: true,
        store: new PrismaSessionStore(
            new PrismaClient(),
            {
                checkPeriod: 2 * 60 * 1000,  //ms
                dbRecordIdIsSessionId: true,
                dbRecordIdFunction: undefined,
            }
        )
    })
);
app.use(passport.session());

app.use('/', router);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
})