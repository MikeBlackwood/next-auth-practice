import {hash, compare } from 'bcryptjs';
export async function hashPassword(password){
    const hashedPass = await hash(password,12);
    return hashedPass
}

export async function verifyPassword(password, hashedPassword){
    return await compare(password, hashedPassword);
}