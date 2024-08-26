'use server';

import clientPromise from '../lib/mongodb';

// ADD STREAK TO THE DATABASE
export const addStreakToDB = async (name: string, streak: number) => {
    const client = await clientPromise;
    const db = client.db('playersStreaks');

    const collection = db.collection('streaks');
    const result = await collection.insertOne({ name, streak });
};

// READ THE DATA FROM THE DATABASE
export const readDataFromDB = async () => {
    const client = await clientPromise;
    const db = client.db('playersStreaks');
    const collection = db.collection('streaks');
    const data = await collection.find({}).toArray();

    return data;
};

// UPDATE THE DATA IF STREAK IS HIGHER THAN THE CURRENT ONE

export async function updateData(name: string, streak: number) {
    const client = await clientPromise;
    const db = client.db('playersStreaks');
    const collection = db.collection('streaks');

    // Step 1: Fetch the current document
    const currentDocument = await collection.findOne({ name });

    if (!currentDocument) {
        addStreakToDB(name, streak);
        return { success: true, result: null };
    }

    // Assume we are updating a field called `value`
    const currentValue = currentDocument.streak;
    const newValue = streak;

    // Step 2: Check if new value is greater than current value
    if (newValue <= currentValue) {
        return {
            success: false,
            message: 'New value must be greater than current value',
        };
    }

    // Step 3: Perform the update
    const result = await collection.updateOne(
        { name }, // Filter to find the document
        { $set: { streak: newValue } } // Update operation
    );

    return { success: true, result };
}
