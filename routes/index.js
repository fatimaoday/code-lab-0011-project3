var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
mongoose.connect('mongodb://fatima:fatima@ds235388.mlab.com:35388/project4').then(

    function () {
        console.log("connected")
    }

).catch(
    function (error) {
        console.log(error.message)
    }
)

var cartoon = mongoose.model('cartoon',{
    name:String,
    description: String,
    image:String,
    song:String,
    planet:String
})

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});
router.get('/add', function(req, res) {
    res.render('add');
});
router.get('/api',function (req,res) {
    cartoon.find(function (error,bobo) {
        res.json(bobo)
    })
});

router.post('/api',function (req,res) {
    var newCartoon=req.param('cartoon')
    var databaseCartoon = new cartoon(newCartoon);

    databaseCartoon.save().then(function () {
        res.json({
            isSuccess:true,
            message:"Cartoon saved !"
        })
    }).catch(function (error) {
        res.json({
            isSuccess:false,
            message: error.message
        })
    })
})

router.delete('/api/cartoon',function (req,res) {
    var id= req.param('id')

    cartoon.findByIdAndRemove(id).then(function () {
        console.log("deleted")
    }).catch(function (error) {
        console.log(error)
    })
})



module.exports = router;
