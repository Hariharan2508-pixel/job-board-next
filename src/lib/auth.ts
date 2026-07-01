import {getServerSession} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions={providers:[CredentialsProvider({
    name:"Credentials",
    credentials:{
        username:{},
        password:{},
    },
    async authorize(credentials)
    {
        if(credentials?.username === "admin" &&
            credentials?.password ==="1234"
        ){
            return{
                id:"1",
                name:"admin",
            }
        }
        return null;
    },

}),],
session:{
    strategy:"jwt" as const},
    pages:{signIn:"/login",},
    secret:process.env.NEXTAUTH_SECRET,};
export const auth=()=>getServerSession(authOptions);