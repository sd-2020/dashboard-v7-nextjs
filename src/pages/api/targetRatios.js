import { connectToDatabase } from "../../lib/mongodb";
const ObjectId = require('mongodb').ObjectId;

const COLLECTION = "targetRatios"
export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getTargetRatios(req, res);
        }

        case 'POST': {
            return addTargetRatio(req, res);
        }

        case 'PUT': {
            return updateTargetRatio(req, res);
        }

        case 'DELETE': {
            return deleteTargetRatio(req, res);
        }
    }
}

// Getting
async function getTargetRatios(req, res) {
    try {
        let { db } = await connectToDatabase();
        let targetRatio = await db
            .collection(COLLECTION)
            .find({})
            .sort({ published: -1 })
            .toArray();
        return res.json({
            message: JSON.parse(JSON.stringify(targetRatio)),
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
async function addTargetRatio(req, res) {
    try {
        let { db } = await connectToDatabase();
        await db.collection(COLLECTION).insertOne(req.body);
        return res.json({
            message: 'TargetRatio added successfully',
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
async function updateTargetRatio(req, res) {
    try {
        let { db } = await connectToDatabase();

        await db.collection(COLLECTION).updateOne(
            {
                _id: new ObjectId(req.body),
            }
        );

        return res.json({
            message: 'TargetRatio updated successfully',
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
async function deleteTargetRatio(req, res) {
    try {
        let { db } = await connectToDatabase();

        await db.collection(COLLECTION).deleteOne({
            _id: new ObjectId(req.body),
        });

        return res.json({
            message: 'TargetRatio deleted successfully',
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}