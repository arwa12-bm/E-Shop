import bcrypt from "bcrypt"
import prisma from "@/app/libs/prismadb"
import {NextResponse} from "next/server"


export async function POST(request: Request){
    const body = await request.json()
    const {name,email,password}=body

    const hashedPssword =await bcrypt.hash(password,10)

    const user = await prisma.user.create({
        data:{
            name,email,hashedPssword
        },
    })
    return NextResponse.json(user);
}