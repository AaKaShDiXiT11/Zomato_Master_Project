import express from "express";

import {ReviewModel} from "../../database/allModels";

const Router = express.Router();

/*
Route        /new
Des         add new Review
Params      none
Body         Review object
Access       Public
Method       POST
*/

Router.post("/new/:_id", async(req,res) => {
  try {
    const {reviewData } = req.body;

    await ReviewModel.create(reviewData);

    return res.json({review: "Successfully Created Review"});
  } catch (error ) {
    return res.status(500).json({error: error.message});
  }
});


/*
Route        /delete
Des         delete a Review
Params      _id
Access       Public
Method       Delete
*/

Router.post("/delete/:_id", async(req,res) => {
  try {
    const {_id } = req.params;

    await ReviewModel.findByIdAndDelete(reviewData);

    return res.json({review: "Successfully Deleted Review"});
  } catch (error ) {
    return res.status(500).json({error: error.message});
  }
});


export default Router;
