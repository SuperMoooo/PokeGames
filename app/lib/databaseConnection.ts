import { getClient } from '../lib/mongodb';

async function run() {
    let client; // Declare client variable to close it later

    try {
        // Get the connected client from clientPromise
        client = await getClient();

        // Send a ping to confirm a successful connection (optional)
        await client.db('admin').command({ ping: 1 });
        console.log(
            'Pinged your deployment. You successfully connected to MongoDB!'
        );
    } catch (error) {
        console.error('An error occurred while connecting to MongoDB:', error);
    } finally {
        // Ensure the client is closed after operations are complete
        if (client) {
            await client.close();
            console.log('MongoDB connection closed.');
        }
    }
}

run().catch(console.dir);
