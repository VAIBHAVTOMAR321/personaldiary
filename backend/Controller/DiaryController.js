const { json } = require("body-parser");
const Diary = require("../Model/Diary");
exports.getDiary = (req, res) => {
  Diary.find(
    {
      name: req.body.name,
    },
    (err, diary) => {
      if (err) {
        res.status(404).send(err);
      }
      res.status(200).json(diary);
    }
  ).sort({ date: -1 });
};
exports.postDiary = (req, res) => {
  const diary = new Diary({
    name: req.body.name,
    date: req.body.date,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
  });
  diary.save((err, diary) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).json(diary);
  });
};
exports.deleteDiary = (req, res) => {
  Diary.findByIdAndRemove(req.params.id, (err, diary) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).json(diary);
  });
};
exports.updateDiary = (req, res) => {
  //find and update and append new image url to imageUrl array and update the diary
  if(req.body.imageUrl){
  Diary.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        imageUrl: req.body.imageUrl,
      }
    },
    { new: true },
    (err, diary) => {
      if (err) {
        console.log(err);
       
      }
      console.log(diary);
    }
  );
  }

  Diary.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
      }
    },
    { new: true },
    (err, diary) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      res.status(200).json(diary);
    }
  );

}


exports.getDiaryById = (req, res) => {
  Diary.findById(req.params.id, (err, diary) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).json(diary);
  }).sort({ date: -1 });
};
