import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET': {
            return getDomainData(req, res);
        }
    }
}

async function getDomainData(req, res) {
    try {
        let { db } = await connectToDatabase();
        const strategies = await db
            .collection("strategies")
            .find({})
            .sort({ published: -1 })
            .toArray();
        const expiries = await db
            .collection("expiries")
            .find({})
            .sort({ published: -1 })
            .toArray();
        const types = await db
            .collection("types")
            .find({})
            .sort({ published: -1 })
            .toArray();
        const tradeTypes = await db
            .collection("tradeTypes")
            .find({})
            .sort({ published: -1 })
            .toArray();
        const trailingPercentages = await db
            .collection("trailingPercentages")
            .find({})
            .sort({ published: -1 })
            .toArray();
        const exchanges = await db
            .collection("exchanges")
            .find({})
            .sort({ published: -1 })
            .toArray();
        const targetRatios = await db
            .collection("targetRatios")
            .find({})
            .sort({ published: -1 })
            .toArray();
        return res.json({
            message: JSON.parse(JSON.stringify({
                strategies,
                expiries,
                types,
                tradeTypes,
                trailingPercentages,
                exchanges,
                targetRatios
            })),
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}
