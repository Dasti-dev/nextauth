import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

export const getDataFromToken = async (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedToken:any = jwt.verify(token,process.env.TOKEN_SECRET!);

        return decodedToken.id;
    } catch (error:any) {
        console.log('error form extracting data from token');
        throw new Error(error.message);
    }
}