import { connectToDatabase } from "../../lib/mongodb";
const ObjectId = require('mongodb').ObjectId;

const COLLECTION = "optionNames"
export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getOptionNames(req, res);
        }

        case 'POST': {
            return addOptionName(req, res);
        }

        case 'PUT': {
            return updateOptionName(req, res);
        }

        case 'DELETE': {
            return deleteOptionName(req, res);
        }
    }
}

// Getting
async function getOptionNames(req, res) {
    try {
        let { db } = await connectToDatabase();
        let optionNames = await db
            .collection(COLLECTION)
            .find({})
            .sort({ published: -1 })
            .toArray();
        return res.json({
            message: JSON.parse(JSON.stringify(optionNames)),
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

// Adding
async function addOptionName(req, res) {
    try {
        let { db } = await connectToDatabase();
        await db.collection(COLLECTION).insertOne(req.body);
        return res.json({
            message: 'OptionName added successfully',
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

// Updating
async function updateOptionName(req, res) {
    try {
        let { db } = await connectToDatabase();

        await db.collection(COLLECTION).updateOne(
            {
                _id: new ObjectId(req.body),
            }
        );

        return res.json({
            message: 'OptionName updated successfully',
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

// deleting
async function deleteOptionName(req, res) {
    try {
        let { db } = await connectToDatabase();

        await db.collection(COLLECTION).deleteOne({
            _id: new ObjectId(req.body),
        });

        return res.json({
            message: 'OptionName deleted successfully',
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}