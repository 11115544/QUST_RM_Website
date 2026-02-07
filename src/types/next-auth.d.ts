import 'next-auth';

export type SessionRole = 'SUPER_ADMIN' | 'MODULE_ADMIN' | 'MEMBER' | 'TEACHER' | 'GUEST';

declare module 'next-auth' {
  interface User {
    id: string;
    role?: SessionRole;
  }

  interface Session {
    user: User & {
      id: string;
      role: SessionRole;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: SessionRole;
  }
}
