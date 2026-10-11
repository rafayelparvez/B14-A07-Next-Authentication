import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  /**
   * NEXT_PUBLIC_ prefix is required — this file runs in the browser
   * ("use client" components import it), and Next.js only inlines env
   * vars with that prefix into the client bundle. Without it,
   * process.env.BETTER_AUTH_URL is `undefined` on the client.
   *
   * Add to .env.local:
   *   NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
   * (or your deployed URL in production)
   */
  baseURL: process.env.BETTER_AUTH_URL,
});

export const { useSession, signIn, signUp, signOut } = authClient;