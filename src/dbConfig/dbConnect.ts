import mongoose from 'mongoose';

export async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URL!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected');
        });

        connection.on('error', (err) => {
            console.log('mongoDB error is', err);
            process.exit();
        });
    } catch (error) {
        console.error('something went wrong is connecting to DB', error);
    }
}
