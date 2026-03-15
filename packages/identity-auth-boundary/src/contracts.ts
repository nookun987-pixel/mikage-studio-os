import { z } from 'zod';

export const permissionScopeSchema = z.enum([
  'runtime.execute',
  'studio.query',
  'worklist.read',
  'session.manage',
  'job.manage',
  'diagnostics.read'
]);

export const identityUserSchema = z.object({
  userCode: z.string().min(1),
  displayName: z.string().min(1),
  email: z.string().email().nullable().default(null)
});

export const sessionOwnershipSchema = z.object({
  sessionCode: z.string().min(1),
  ownerUserCode: z.string().min(1)
});

export const permissionGrantSchema = z.object({
  scope: permissionScopeSchema,
  granted: z.boolean()
});

export const authContextSchema = z.object({
  authCode: z.string().min(1),
  authenticated: z.boolean().default(true),
  actor: identityUserSchema,
  sessionOwnerships: z.array(sessionOwnershipSchema).default([]),
  permissions: z.array(permissionGrantSchema).default([])
});

export const authDecisionSchema = z.object({
  decision: z.enum(['allow', 'deny']),
  missingScopes: z.array(permissionScopeSchema).default([])
});

export type PermissionScope = z.infer<typeof permissionScopeSchema>;
export type IdentityUser = z.infer<typeof identityUserSchema>;
export type SessionOwnership = z.infer<typeof sessionOwnershipSchema>;
export type AuthContext = z.infer<typeof authContextSchema>;
export type AuthDecision = z.infer<typeof authDecisionSchema>;

export const authorizeAuthContext = (
  rawContext: AuthContext,
  requiredScopes: PermissionScope[]
): AuthDecision => {
  const context = authContextSchema.parse(rawContext);
  const available = new Set(
    context.permissions.filter((grant) => grant.granted).map((grant) => grant.scope)
  );
  const missingScopes = requiredScopes.filter((scope) => !available.has(scope));

  return authDecisionSchema.parse({
    decision: missingScopes.length === 0 && context.authenticated ? 'allow' : 'deny',
    missingScopes
  });
};
