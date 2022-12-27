import { connectToDatabase } from "../../lib/mongodb";
const ObjectId = require('mongodb').ObjectId;

const COLLECTION = "exchanges"
export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getExchanges(req, res);
        }

        case 'POST': {
            return addExchange(req, res);
        }

        case 'PUT': {
            return updateExchange(req, res);
        }

        case 'DELETE': {
            return deleteExchange(req, res);
        }
    }
}

// Getting
async function getExchanges(req, res) {
    try {
        let { db } = await connectToDatabase();
        let exchanges = await db
            .collection(COLLECTION)
            .find({})
            .sort({ published: -1 })
            .toArray();
        return res.json({
            message: JSON.parse(JSON.stringify(exchanges)),
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
async function addExchange(req, res) {
    try {
        let { db } = await connectToDatabase();
        await db.collection(COLLECTION).insertOne(req.body);
        return res.json({
            message: 'Exchange added successfully',
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
async function updateExchange(req, res) {
    try {
        let { db } = await connectToDatabase();

        await db.collection(COLLECTION).updateOne(
            {
                _id: new ObjectId(req.body),
            }
        );

        return res.json({
            message: 'Exchange updated successfully',
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
async function deleteExchange(req, res) {
    try {
        let { db } = await connectToDatabase();

        await db.collection(COLLECTION).deleteOne({
            _id: new ObjectId(req.body),
        });

        return res.json({
            message: 'Exchange deleted successfully',
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}