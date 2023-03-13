import connectToDB from "../../../lib/db";
import {hashPassword} from "../../../lib/auth";


async function handler(req, res) {
    if(req.method !== 'POST')
    {
        return;
    }

    const data = req.body;
    const {email, password} = data;

    if(!email || !email.includes('@') || !password || password.trim().length < 7){
        res.status(422).json({
            message: 'Invalid input'
        })
    }
    const hashedPassword = await  hashPassword(password);
    const client = await connectToDB();
    const db = client.db();
    const existingUser = await db.collection('users').findOne({email})
    console.log(existingUser)
    if(existingUser)
    {
        res.status(422).json({message: 'User exists already!'});

        return;
    }
   const result = await db.collection('users').insertOne({
        email: email,
        password: hashedPassword
    });
    res.status(201).json({message: 'Created user !'});
}

export default handler;