import { connectToDatabase } from "../../lib/mongodb";
const ObjectId = require('mongodb').ObjectId;

const COLLECTION = "expiries"
export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getExpiries(req, res);
        }

        case 'POST': {
            return addExpiry(req, res);
        }

        case 'PUT': {
            return updateExpiry(req, res);
        }

        case 'DELETE': {
            return deleteExpiry(req, res);
        }
    }
}

// Getting
async function getExpiries(req, res) {
    try {
        let { db } = await connectToDatabase();
        let expiries = await db
            .collection(COLLECTION)
            .find({})
            .sort({ published: -1 })
            .toArray();
        return res.json({
            message: JSON.parse(JSON.stringify(expiries)),
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
async function addExpiry(req, res) {
    try {
        let { db } = await connectToDatabase();
        await db.collection(COLLECTION).insertOne(req.body);
        return res.json({
            message: 'Expiry added successfully',
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
async function updateExpiry(req, res) {
    try {
        let { db } = await connectToDatabase();

        await db.collection(COLLECTION).updateOne(
            {
                _id: new ObjectId(req.body),
            }
        );

        return res.json({
            message: 'Expiry updated successfully',
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
async function deleteExpiry(req, res) {
    try {
        let { db } = await connectToDatabase();

        await db.collection(COLLECTION).deleteOne({
            _id: new ObjectId(req.body),
        });

        return res.json({
            message: 'Expiry deleted successfully',
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}