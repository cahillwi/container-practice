import express from 'express';
import mongoose from "mongoose";
import session from "express-session";
import redis from "redis";
import cors from "cors";

//const mongoose = require("mongoose");
//const session = require("express-session");
//const redis = require("redis");
//const cors = require("cors");
let RedisStore = require("connect-redis")(session);

const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('./config/config');
let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT
});

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

mongoose
    .connect(mongoURL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log("Successfully connected to DB"))
    .catch((e: Error) => console.log(e));



app.enable("trust proxy");
app.use(cors({}));
app.use(session({
    store: new RedisStore({client: redisClient}),
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        //resave: false,
        //saveUninitialized: false,
        httpOnly: true,
        maxAge: 60000,
    },
    resave: false,
    saveUninitialized: false
}));
app.use(express.json());

// define a route handler for the default home page
app.get( "/", ( req: any, res ) => {
    //const user = req.userContext ? req.userContext.userinfo : null;
    res.render( "/views/index");
} );

app.get("/api", (req,res) => {
    res.send("<h2>Hi There!</h2> ");
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port: ${port}`));

