import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { JWT } from 'next-auth/jwt';
import { Session } from 'next-auth';

// Генерируем fallback секрет если переменная окружения не установлена
const generateSecret = () => {
  if (process.env.NEXTAUTH_SECRET) {
    return process.env.NEXTAUTH_SECRET;
  }
  
  // Fallback для разработки - НЕ использовать в продакшене!
  console.warn('⚠️  NEXTAUTH_SECRET not set, using fallback secret. Set NEXTAUTH_SECRET in production!');
  return 'fallback-secret-key-for-development-only-change-in-production';
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email и пароль обязательны');
        }

        try {
          console.log('Attempting to authenticate:', credentials.email);

          const user = await prisma.user.findUnique({
            where: { 
              email: credentials.email.toLowerCase() 
            }
          });

          if (!user) {
            console.log('User not found:', credentials.email);
            throw new Error('Неверный email или пароль');
          }

          console.log('User found:', {
            id: user.id,
            email: user.email,
            role: user.role,
            isActive: user.isActive
          });

          console.log('Checking password for user:', credentials.email);
          const isValid = await bcrypt.compare(credentials.password, user.password);
          
          console.log('Password validation result:', isValid);

          if (!isValid) {
            console.log('Invalid password for user:', credentials.email);
            throw new Error('Неверный email или пароль');
          }

          if (!user.isActive) {
            console.log('Account is not active:', credentials.email);
            throw new Error('Аккаунт не активирован. Подтвердите email для входа.');
          }

          console.log('Authentication successful for:', credentials.email);

          const userObject = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role.toLowerCase(), // Приводим роль к нижнему регистру
          };

          return userObject;
        } catch (error: any) {
          console.error('Authentication error:', error);
          throw error;
        }
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT, user: any }) {
      console.log('JWT callback - User:', user);
      console.log('JWT callback - Token before:', token);
      
      if (user) {
        token.id = user.id;
        token.role = user.role;
        console.log('JWT callback - Updated token with user data');
      }
      
      console.log('JWT callback - Token after:', token);
      return token;
    },
    async session({ session, token }: { session: Session, token: JWT }) {
      console.log('Session callback - Token:', token);
      console.log('Session callback - Session before:', session);
      
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      
      console.log('Session callback - Session after:', session);
      return session;
    }
  },
  debug: process.env.NODE_ENV === 'development',
  secret: generateSecret(),
};