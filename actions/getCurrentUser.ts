import { authOptions } from '@/app/libs/AuthOptions'
import prisma from '@/app/libs/prismadb'
import { getServerSession } from 'next-auth'

export async function getSession() {
    return await getServerSession(authOptions)
}


export async function getCurrentUser() {
    try{
        const session = await getSession()
        if(!session?.user?.email){
            return null
        }
        const currentUser = await prisma.user.findUnique({
            where:{
                email : session?.user?.email,
            }
        })
        if(!currentUser){
            return null;
        }
        console.log("function user",currentUser);
        
        return{
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt : currentUser.updatedAt.toISOString(),
            emailVerified : currentUser.emailVerified?.toISOString() || null
        }

    }catch(error:any){
        console.log(error);
        
        return null
    }
}


