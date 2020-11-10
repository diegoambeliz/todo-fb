const admin = require('firebase-admin');
var Task = require('../models/task');

var serviceAccount = require('../../todo-practice-firebase-firebase-adminsdk-1snex-c2c4cfbecd.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://todo-practice-firebase.firebaseio.com/'
});

const db = admin.database();

var controller = {
    
    home: (req, res) => {
        
        db.ref('tasks').orderByKey().once('value', (snapshot) =>{
            let newdata = {}, inprogressdata = {}, finishedata = {};

            snapshot.forEach(
                taskForEach => {
                    let currentStatus = taskForEach.val().status;

                    let key = taskForEach.key;
                    let data = taskForEach.val();
                    
                    if(currentStatus == 'new'){
                        newdata[key] = data;
                    } 
                    
                    if(currentStatus == 'in progress'){
                        inprogressdata[key] = data;
                    } 
                    
                    if(currentStatus == 'finished'){
                        finishedata[key] = data;
                    } 

                    

                }
            )


            res.render('index', {
                newtasks:newdata,
                inprogresstasks: inprogressdata,
                finishedtasks: finishedata 
                });

        });

        

       

    },

    addTask: (req, res) =>{
        let params = req.body;
        let task = Task;
        task.name = params.name;
        task.description = params.description;
        task.creationDate = new Date();
        task.expirationDate = params.expirationDate;
        task.status = "new";

        db.ref('tasks').push(task, (err) =>{
            console.log(err);
        });
        res.redirect('/');

    },

    getTasks: (req, res) => {

    },

    getTasksByStatus: (req, res) => {

    },


    deleteTask: (req, res) => {

    },

    moveTaskToSomeStatus: (req, res) => {
        let status = req.params.status;
        let taskKey = req.params.key;

        db.ref('tasks').child(taskKey).update({
            "status": status
        })
        
        // db.ref('tasks').orderByKey().equalTo(taskKey).once('child_added').then(
        //     Response => {
        //         console.log(Response.val());
        //     }
        // );
        res.redirect('/');
    },

    updateTask: (req, res) => {

    }
}

module.exports = controller;