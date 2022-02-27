let joggingDB = require('../model/jogging.js');///import jogging model
///Create a new jogging
exports.create = (req,res)=>{
  ///Check if the request body is not set
  if(!req.body){
    res.status(400).send({message:"The jogging data not found"});
    return;
  }
  //create new jogging
  const jogging = new joggingDB({
    date: req.body.date,
    distance: req.body.distance,
    time: req.body.time
  });
  //Save the jogging data in the database if every thing is good
jogging.save().then(data=>{
    //res.send(data)///That's for test rest apis with postman
    res.redirect("http://localhost:7000/view_jogging");
    //res.writeHead(200, {"Location": "/jogging_view"});
    return res.end();
  }).catch(err=>{
    res.status(500).send({message:err.message+' Error in saving jogging'||'failded saving the jogging info'})
  });
};
///View all jogging filter by date
exports.find = (req,res)=>{
  if(req.query.id){
    const id = req.query.id;
    joggingDB.findById(id).then(jogs=>{
      if(!jogs){
        res.status(404).send({message:'Error no jogging info found!'})
      }else{
        res.send(jogs)
      }
    }).catch(err=>{
      res.status(500).send({message:"Error in find the jogging"});
    });;
  }else{
    joggingDB.find().sort({date:-1}).then(jogs=>{
      console.log(jogs);
      res.send(jogs)
    }).catch(err=>{
      res.status(500).send({message:err.message|| 'Error while view jogging info'})
    })
  }
};
// Update jogging info by id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }
    const id = req.params.id;
    joggingDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update jogging with ${id}. Maybe jogging not found!`})
            }else{
                res.send(data)

            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update jogging information"})
        })
}

////delete jogging by id
exports.delete = (req,res)=>{
  const id = req.params.id;
  joggingDB.findByIdAndRemove(id).then(data=>{
    if(!data){
      res.status(404).send({message:`Sorry can not delete this jogging with id: ${id}`})
    }else{
      res.send({message:`Successfully deleting jogging of id: ${id}`});
    }
  }).catch(err=>{
    res.status(500).send({message:"Error during the deleting operation!"})
  });
};
