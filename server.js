'use strick';
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const firebase = require('firebase');
const fireFetch = require('./firebase/fetchFirebase')

let users = [] //container for users objects
let verUsers = [] //cont for ver users

//initialize server
const app = express();
app.use(bodyParser.json())


//initialize Firebase admin SDK
const serviceAccount = require('./race-306f39c927fb.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://race-24f39.firebaseio.com'
})

//functions for fetching data from DB//
//printing users
function listAllUsers(nextPageToken) {
  return new Promise (function(resolve, reject) {
    // List batch of users, 1000 at a time.
    const listOfUsers = admin.auth().listUsers(1000, nextPageToken)
    .then(function(listUsersResult) {
      let usersList = [];
      listUsersResult.users.forEach(function(userRecord) {
        usersList.push(userRecord.toJSON()) 
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken)
      }
      // console.log(usersList)
      return usersList;
    });
    resolve(listOfUsers);
  })
};
//get ver users

function getVerUser () {
  verUsers = [];
  admin.database().ref('verifiedUsers').once('value')
  // admin.database().ref('vertest').once('value')
  .then(function (snap) { 
    for (let user in snap.val()) {
      verUsers.push(user)
    } 
    // console.log(verUsers)
  }) 
}
    // console.log(getVerUserProm())
    
//after resolving promises from Firebase set get/ for server
serveUsers = function() {
    getVerUser();
    listAllUsers()
    .then(function (result) {
      usersArr = [];
      for (user of result) {
        let userRecord = {};
        userRecord.name = user.email;
        userRecord.uid = user.uid;
        usersArr.push(userRecord);
      }
      // console.log(usersArr);
      return usersArr;
    })
    .then(function (result) {
      let usersArr = result;
      // console.log(usersArr);
      app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname + '/index.html'));
        },
        app.get("/getUsers", function (req, res) {
          let usersObj = {
            usersArr,
            verUsers
          }
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify(usersObj));
    
          // res.send('test')
        })
      );
    });
  }
serveUsers();

app.post("/addVer", function (req, res){
  console.log('post');
  // console.log(req.body);
  let user = req.body;
  userRef = admin.database().ref('verifiedUsers/' + user.uid);
  // console.log(userRef);
  userRef.set({
    location: user.location
  })
  serveUsers();
})

app.post("/remVer", function (req, res){
  console.log('rem');
  // console.log(req.body);
  let user = req.body;
  userRef = admin.database().ref('verifiedUsers/' + user.uid);
  // console.log(userRef);
  userRef.remove()
  serveUsers();
})

app.listen (3000, function() {
  console.log('app is listening on port 3000');
});




