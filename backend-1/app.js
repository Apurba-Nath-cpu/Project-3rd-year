// require('@tensorflow/tfjs-backend-cpu');
// require('@tensorflow/tfjs-backend-webgl');
// // const cocoSsd = require('@tensorflow-models/coco-ssd');

// (async () => {
//   const img = document.getElementById('img');

//   // Load the model.
//   const model = await cocoSsd.load();

//   // Classify the image.
//   const predictions = await model.detect(img);

//   console.log('Predictions: ');
//   console.log(predictions);
// })();


const express = require('express');

const app = express()

const cookieParser = require('cookie-parser')

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.listen(3000)
app.use(cookieParser())

users = {}

const userRouter = require('./routers/userRouters')
// const authRouter = require('./routers/authRouters');
const t_costModel = require('./models/t_costModel');

app.use('/users', userRouter)
// app.use('/auth', authRouter)

