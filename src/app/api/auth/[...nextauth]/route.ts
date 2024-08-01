import NextAuth, { AuthOptions, Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const nextAuthOptions:AuthOptions=({
  
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization:{
        params:{
          scope:"openid email profile https://www.googleapis.com/auth/gmail.send"
        }
      }
      
        
      
    })
  ],

  secret:process.env.NEXTAUTH_SECRET,
  session:{
    strategy:"jwt"
  },
  callbacks: {
    async jwt({ token, account,user }) {
      if(account){
        
        token.accessToken = account?.access_token;
        token.email = user.email;
      }

      
      return token;
    },
    async session({ session, token,}) {
      if(token){

        session.user.email = token.email!;
        session.accessToken = token.accessToken as string;


      }
      

      return { ...session, ...token };
    }
  }
});
const handler = NextAuth(nextAuthOptions)

export {handler as GET, handler as POST,nextAuthOptions}

