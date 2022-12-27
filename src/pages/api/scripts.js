import { connectToDatabase } from "../../lib/mongodb";
const ObjectId = require('mongodb').ObjectId;

const COLLECTION = "scripts"
export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getScripts(req, res);
        }

        case 'POST': {
            return addScript(req, res);
        }

        case 'PUT': {
            return updateScript(req, res);
        }

        case 'DELETE': {
            return deleteScript(req, res);
        }
    }
}

// Getting
async function getScripts(req, res) {
    try {
        let { db } = await connectToDatabase();
        let scripts = await db
            .collection(COLLECTION)
            .find({})
            .sort({ published: -1 })
            .toArray();
        return res.json({
            message: JSON.parse(JSON.stringify(scripts)),
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
async function addScript(req, res) {
    try {
        let { db } = await connectToDatabase();
        await db.collection(COLLECTION).insertOne(req.body);
        return res.json({
            message: 'Script added successfully',
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
async function updateScript(req, res) {
    const object = req.body;
    const id = object._id;
    delete object._id;
    try {
        let { db } = await connectToDatabase();

        await db.collection(COLLECTION).updateOne(
            {
                _id: new ObjectId(id),
            }, 
            { $set: req.body }, 
        );

        return res.json({
            message: 'Script updated successfully',
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
async function deleteScript(req, res) {
    try {
        let { db } = await connectToDatabase();
        const _id = new ObjectId(req.body._id);
        await db.collection(COLLECTION).deleteOne({
            _id: _id
        });

        return res.json({
            message: 'Script deleted successfully',
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}