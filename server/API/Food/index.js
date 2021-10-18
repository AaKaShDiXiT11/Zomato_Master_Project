//Libraries
import express from "express";
import passport from "passport";

//database Model
import {FoodModel} from "../../database/allModels";

//Validation
import {ValidateRestaurantId,ValidateCategory} from "../../Validation/food";

const Router = express.Router();


/*
Route        /
Des          Get all Foods baised on Particular restaurant
Params       _id
Access       Public
Method       GET
*/

Router.get("/:_id" , async(req,res) => {
  try {
    await ValidateRestaurantId(req.Params);

    const {_id} = req.Params;
    const foods = await FoodModel.find({restaurant: _id });

    return res.json({ foods});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});


/*
Route        /r
Des          Get all Foods baised on Particular restaurant
Params       category
Access       Public
Method       GET
*/

Router.get("/r/:category", async(req,res) => {
  try {

      await ValidateCategory(req.Params);

    const {category} = req.Params;
    const foods = await FoodModel.find({
      category: {$regex: category, $options: "i"}
    });

    return res.json({foods})
  } catch (e) {
    return res.status(500).json({error: error.message});
  }
});


export default Router;
