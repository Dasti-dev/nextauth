import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
// import { sendEmail } from '@/helpers/mailer';
import {NextRequest,NextResponse} from 'next/server';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        // validation
        console.log(reqBody);

        const user = await User.findOne({email});

        if(!user) {
            return NextResponse.json({
                error : "Invalid credentials"
            },{
                status: 400
            })
        }

        console.log('User exist');

        const validPassword = await bcryptjs.compare(password,user.password);

        if(!validPassword) {
            return NextResponse.json({msg : "Invalid password"},{status:400});
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1d'});

        const response = NextResponse.json({
            message: "Logged in Success",
            success: true
        });

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;

    } catch(error:any) {
        return NextResponse.json({
            error: error.message
        },
        {status : 500}
        );
    }
}