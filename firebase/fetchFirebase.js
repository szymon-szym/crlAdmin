// const firebase = require ('firebase')
const admin = require ('firebase-admin')

//initialize Firebase
// firebase.initializeApp({
//     apiKey: "AIzaSyCct9-AkSO11wODlldp6e7C9S96PATRpPM",
//     authDomain: "race-24f39.firebaseapp.com",
//     databaseURL: "https://race-24f39.firebaseio.com",
//     projectId: "race-24f39",
//     storageBucket: "",
//     messagingSenderId: "856271709860"
//   });

module.exports.verUsers = function() {
    return new Promise ((resolve) => {
        let tempUser = []
        let verRef = 'verifiedUsers'
        admin.database().ref(verRef).on('value', snap => {
            tempUser.push(snap.key)
        })
        resolve(tempUser)
    })
}
// export const fetchAllRaces = () => {
//     return new Promise ((resolve) => {
//             let tempUserRaces = []
//             let userRef = `userRaces/`
//             firebase.database().ref(userRef).on('child_added', snap => {
//               let tempRace = snap.val()
//               tempRace.key = snap.key
//               tempUserRaces.push(tempRace)
//             })
//             resolve (tempUserRaces);
//     })
// };

// export const fetchUserRaces = (user) => {
//     //take current user and return prom of his/her races
//     return new Promise ((resolve) => {
//         let tempUserRaces = []
//         let userRef = `userRaces/${user}`
//         firebase.database().ref(userRef).on('child_added', snap => {
//           let tempRace = snap.val()
//           tempRace.key = snap.key
//           tempUserRaces.push(tempRace)
//         })
//         resolve (tempUserRaces);
//         // resolve([
//         //     {name: 'race1', distance: 10, location: 'Pzn'},
//         //     {name: 'race2', distance: 20, location: 'Waw'}
//         // ])
//     })
// };
// export const fetchVerUsers = () => {
//     return new Promise ((resolve) => {
//         let tempUser = []
//         let verRef = 'verifiedUsers'
//         firebase.database().ref(verRef).on('child_added', snap => {
//             tempUser.push(snap.key)
//         })
//         resolve(tempUser)

//         // resolve ([
//         //     '1234',
//         //     '3456'
//         // ])
//     })
// };
// export const fetchVerRaces = verUsers => {  
//     let racesArr = [];  
//     for (let user of verUsers) {
//         let tempRaces = new Promise ((resolve) => {
//             let tempRaces = []
//             firebase.database().ref(`userRaces/${user}`).on('child_added', snap => {
//             let tempRace = snap.val()
//             tempRace.key = snap.key
//             tempRaces.push(tempRace)
//             })
//             .then(resolve(tempRaces))
//         })
//         racesArr.push(tempRaces)    
//         // console.log(racesArr)
//     }
//     return (racesArr);
//     //take ver users ids and return array of promises for each user
//     // new Promise ((resolve, reject) => {
//         //     let verPromArr = []
//         //     for (let user of verUsers) {
//             //         let verProm = new Promise((resolve, reject) => {
//                 //         let tempRacesArr = []
//     //                     firebase.database().ref('userRaces/' + user).on('child_added', snap => {
//         //                 let tempRace = snap.val()
//         //             tempRace.key = snap.key
//     //             tempRacesArr.push(tempRace)
//     //         })
//     //         resolve(tempRacesArr)
//     //         })
//     //         verPromArr.push(verProm)
//     //     }
//     // })
// };
// export const fetchCalendRaces = () => {
//     return new Promise (resolve => {
//         resolve([
//             {name: 'race1', distance: 10, location: 'Pzn'},
//             {name: 'race2', distance: 20, location: 'Waw'}
//         ])
//     })

//     // let calendRaces = []
//     //   let calendRef = 'calend'
//     //   firebase.database().ref(calendRef).on('child_added', snap => {
//         //     let tempRace = snap.val()
//     //     tempRace.key = snap.key
//     //     state.calendRaces.push(tempRace)
//     //   })

//     // export const fetchVerRaces = verUsers => {  
//     //     let racesArr = [];  
//     //     for (let user of verUsers) {
//     //         let tempRaces = new Promise ((resolve) => {
//     //             resolve([
//     //                 {name: 'race1', distance: 10, location: 'Pzn'},
//     //                 {name: 'race2', distance: 20, location: 'Waw'}
//     //             ])  
//     //         })
//     //         racesArr.push(tempRaces)    
//     //     }
//     //     return (racesArr);
// }