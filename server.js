const express = require('express');
const app = express();
const  bodyParser = require('body-parser');
const cors =require('cors');
const mongoose = require('mongoose')
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
const {ApolloServer} = require('apollo-server')
require("dotenv").config();

const resolvers = require('./gql/resolvers')
const typeDefs = require('./gql/typeDefs')

app.get('/index',(req,res)=>{
  res.send("HI girls");
})



const server = new ApolloServer({
  typeDefs,
  resolvers,
  context:({req}) =>({req})
})
mongoose.connect('mongodb+srv://showkuay97:970sad36ed@cluster0.dvcrz.mongodb.net/Libary?retryWrites=true&w=majority',
{
  useNewUrlParser:true
}).then(()=>{
  console.log(`Mongodb Connected!`);
  
  return server.listen(process.env.API_PORT)
}).then((res)=>{
  console.log(`server running at ${res.url}`);
})
// server.listen(5000,()=>{
//   console.log(`gql running at port 5000`);
// })
app.use((req,res)=>{
  res.status(404).send('URL not found ');
})
