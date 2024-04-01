import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import {NextRequest,NextResponse} from 'next/server';
import { getDataFromToken } from '@/helpers/getDataFromToken';

connect();

export async function POST(request: NextRequest ,response : NextResponse) {
    // extract data from token
    
    const userId = await getDataFromToken(request);
    
    const user = await User.findOne({_id:userId}).select("-password");
    
    // check if no user
    if(!user) {
        return NextResponse.json({
            Message: "User not found",
        },{
            status: 400,
        })
    }
    return NextResponse.json({
        message: "User found",
        data: user,
    })
}