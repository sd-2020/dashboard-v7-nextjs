import { connectToDatabase } from "../../lib/mongodb";
const ObjectId = require('mongodb').ObjectId;

const COLLECTION = "tradeTypes"
export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getTradeTypes(req, res);
        }

        case 'POST': {
            return addTradeType(req, res);
        }

        case 'PUT': {
            return updateTradeType(req, res);
        }

        case 'DELETE': {
            return deleteTradeType(req, res);
        }
    }
}

// Getting
async function getTradeTypes(req, res) {
    try {
        let { db } = await connectToDatabase();
        let tradeTypes = await db
            .collection(COLLECTION)
            .find({})
            .sort({ published: -1 })
            .toArray();
        return res.json({
            message: JSON.parse(JSON.stringify(tradeTypes)),
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
async function addTradeType(req, res) {
    try {
        let { db } = await connectToDatabase();
        await db.collection(COLLECTION).insertOne(req.body);
        return res.json({
            message: 'TradeType added successfully',
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
async function updateTradeType(req, res) {
    try {
        let { db } = await connectToDatabase();

        await db.collection(COLLECTION).updateOne(
            {
                _id: new ObjectId(req.body),
            }
        );

        return res.json({
            message: 'TradeType updated successfully',
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
async function deleteTradeType(req, res) {
    try {
        let { db } = await connectToDatabase();

        await db.collection(COLLECTION).deleteOne({
            _id: new ObjectId(req.body),
        });

        return res.json({
            message: 'TradeType deleted successfully',
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}