import express from 'express';
import { MongoClient } from 'mongodb';
import path from 'path';
import dotenv from 'dotenv';

async function start() {
    dotenv.config();
    const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ozioz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    const dbName = 'fsv-db';
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const app = express();
    app.use(express.json());

    app.use('/images', express.static(path.join(__dirname, '../assets')));

    app.use(express.static(
        path.resolve(__dirname, '../dist'),
        { maxAge: '1y', etag: false },
    ));

    app.get('/api/products', async (req, res) => {
        const products = await db.collection('products').find({}).toArray();
        res.send(products);
    });

    async function populateCartIds(ids) {
        return Promise.all(ids?.map(id => db.collection('products').findOne({ id })));
    }

    app.get('/api/users/:userId/cart', async (req, res) => {
        const user = await db.collection('users').findOne({ id: req.params.userId });
        const populatedCart = await populateCartIds(user?.cartItems || []);
        res.json(populatedCart);
    });

    app.get('/api/products/:productId', async (req, res) => {
        const productId = req.params.productId;
        const product = await db.collection('products').findOne({ id: productId });
        res.json(product);
    });

    app.post('/api/users/:userId/cart', async (req, res) => {
        const userId = req.params.userId;
        const productId = req.body.id;

        const existingUser = await db.collection('users').findOne({ id: userId });

        if (!existingUser) {
            await db.collection('users').insertOne({ id: userId, cartItems: [] });
        }

        await db.collection('users').updateOne({id: userId}, {$addToSet: {cartItems: productId}});

        const user = await db.collection('users').findOne({ id: req.params.userId });
        const populatedCart = await populateCartIds(user?.cartItems || []);
        res.json(populatedCart);
    });

    app.delete('/api/users/:userId/cart/:productId', async (req, res) => {
        const productId = req.params.productId;
        const userId = req.params.userId;

        await db.collection('users').updateOne({ id: userId }, {
            $pull: { cartItems: productId}
        });

        const user = await db.collection('users').findOne({ id: req.params.userId });
        const populatedCart = await populateCartIds(user?.cartItems || []);
        res.json(populatedCart);
    });

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../dist/index.html'));
    });

    const port = process.env.PORT || 8000;

    app.listen(port, () => {
        console.log('Server is listening on port 8000');
    });
}

start();