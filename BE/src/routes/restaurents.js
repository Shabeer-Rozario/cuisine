const express = require('express');

const ResaturentModel = require('../models/restaurents');

const router = express.Router()

router.get('/getRestaurent', async (req, res) => {
    try {
        const data = await ResaturentModel.find();
        var restaurentData = {
            "restaurent": data,
            "restaurenCount": data.length
        }
        res.status(200).json({ "status": 200, "data": restaurentData, "message": "Successfully", "error": false })
    }
    catch (error) {
        res.status(400).json({ "status": 400, "message": error.message, "error": true })
    }
})

router.get('/getRestaurent/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        const data = await ResaturentModel.find({ location_id: req.params.id });
        var restaurentData = {
            "restaurent": data,
            "restaurenCount": data.length
        }
        res.status(200).json({ "status": 200, "data": restaurentData, "message": "Successfully", "error": false })
    }
    catch (error) {
        res.status(400).json({ "status": 400, "message": error.message, "error": true })
    }
})

router.post('/addRestaurent', async (req, res) => {
    const requestData = req.body;
    const data = new ResaturentModel({
        name: requestData.name,
        city: requestData.city,
        city_id: requestData.city_id,
        location_id: requestData.location_id,
        locality: requestData.locality,
        thumb: requestData.thumb,
        aggregate_rating: requestData.aggregate_rating,
        rating_text: requestData.rating_text,
        min_price: requestData.min_price,
        contact_number: requestData.contact_number,
        cuisine: requestData.cuisine,
        image: requestData.image,
        mealtype_id: requestData.mealtype_id
    })
    try {
        const restaurentData = await data.save();
        res.status(200).json({ "status": 200, "data": restaurentData, "message": "Added Successfully", "error": false })
    }
    catch (error) {
        res.status(400).json({ "status": 400, "message": error.message, "error": true })
    }
})

router.post('/filter', async (req, res) => {
    try {
        var { searchFilter, sort, page } = req.body;

        if (searchFilter && typeof searchFilter != "object") {
            throw new Error("searchFilter must be present....");
        }

        page = page ? page : 0;

        const ItemPerPage = 3;
        var skip = ItemPerPage * page;

        if (!sort) {
            sort = { "name": 1 }
        } else if (typeof sort != 'object') {
            throw new Error("Sort must be Object.");
        }

        var tempData = {};
        console.log(searchFilter)
        for (var index in searchFilter) {
            console.log(index)
            if (searchFilter[index]) {
                if (index == "name" || index == "city" || index == "locality") {
                    tempData[index] = new RegExp(searchFilter[index], "i")
                } else {
                    tempData[index] = searchFilter[index];
                }
                console.log(tempData)
            }
        }
        var restaurentCheck = await ResaturentModel.aggregate([
            {
                $match: tempData,
            },
        ]);
        var restaurenCount = restaurentCheck.length;

        var restaurent = await ResaturentModel.aggregate([
            {
                $match: tempData,
            },
        ]).sort(sort).skip(skip).limit(ItemPerPage)

        var nextPage = (skip + ItemPerPage < restaurenCount) ? true : false;

        var totalPage = Math.ceil(restaurenCount / ItemPerPage);

        var finalData = {
            restaurent: restaurent,
            currentPage: page,
            totalPage: totalPage,
            nextPage: nextPage
        }

        res.status(200).json({ "status": 200, data: finalData, "message": "success", "error": false })


    } catch (err) {
        console.log("error", err)
        res.status(400).json({ "status": 400, "message": err.message, "error": true })
    }
})
router.get('/getRestaurentDetails/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        const data = await ResaturentModel.findOne({ _id: req.params.id });
        var restaurentData = {
            "restaurent": data,
            "restaurenCount": data.length
        }
        res.status(200).json({ "status": 200, "data": restaurentData, "message": "Successfully", "error": false })
    }
    catch (error) {
        res.status(400).json({ "status": 400, "message": error.message, "error": true })
    }
})

module.exports = router;  