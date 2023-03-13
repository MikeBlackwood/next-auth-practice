import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import connectToDB from "../../../lib/db";
import {verifyPassword} from "../../../lib/auth";
export default NextAuth({
    providers: [Providers.Credentials({
        session: {
            jwt: true
        },
        async authorize(credentials, req) {
            const client = await connectToDB();
            const userCollections =  client.db().collection('users');
            const user = await userCollections.findOne({email: credentials.email})
            if (!user)
            {
                client.close()
                throw new Error('No user found')
            }
            const isValid =await verifyPassword(credentials.password, user.password);
            if(!isValid)
            {
                client.close()
                throw new Error('Check password')
            }
            client.close()
            return {
                email: user.email
            }

        }
    })]

});