import type { Client, Options as Options2, TDataShape } from './client';
import type { DeleteApiV1ApiKeyByIdData, DeleteApiV1ApiKeyByIdErrors, DeleteApiV1ApiKeyByIdResponses, DeleteApiV1InternalUserByTenantIdByUserIdData, DeleteApiV1InternalUserByTenantIdByUserIdErrors, DeleteApiV1InternalUserByTenantIdByUserIdResponses, DeleteApiV1InvitedUserByIdData, DeleteApiV1InvitedUserByIdErrors, DeleteApiV1InvitedUserByIdResponses, DeleteApiV1TenantByIdData, DeleteApiV1TenantByIdErrors, DeleteApiV1TenantByIdResponses, DeleteApiV1UserByIdData, DeleteApiV1UserByIdErrors, DeleteApiV1UserByIdResponses, DeleteApiV1UserByOrganizationIdByEmailData, DeleteApiV1UserByOrganizationIdByEmailErrors, DeleteApiV1UserByOrganizationIdByEmailResponses, DeleteApiV2OrganizationByIdData, DeleteApiV2OrganizationByIdErrors, DeleteApiV2OrganizationByIdResponses, GetApiV1ApiKeyByIdData, GetApiV1ApiKeyByIdErrors, GetApiV1ApiKeyByIdResponses, GetApiV1ApiKeysByOrganizationIdData, GetApiV1ApiKeysByOrganizationIdErrors, GetApiV1ApiKeysByOrganizationIdResponses, GetApiV1ApiRequestsByTenantIdData, GetApiV1ApiRequestsByTenantIdErrors, GetApiV1ApiRequestsByTenantIdResponses, GetApiV1AuditLogsByTenantIdData, GetApiV1AuditLogsByTenantIdErrors, GetApiV1AuditLogsByTenantIdResponses, GetApiV1InvoicesByTenantIdData, GetApiV1InvoicesByTenantIdErrors, GetApiV1InvoicesByTenantIdResponses, GetApiV1MailLogsByTenantIdData, GetApiV1MailLogsByTenantIdErrors, GetApiV1MailLogsByTenantIdResponses, GetApiV1OrganizationByIdRotateSecretData, GetApiV1OrganizationByIdRotateSecretErrors, GetApiV1OrganizationByIdRotateSecretResponses, GetApiV1TenantByIdData, GetApiV1TenantByIdErrors, GetApiV1TenantByIdResponses, GetApiV1UserByIdData, GetApiV1UserByIdErrors, GetApiV1UserByIdResponses, GetApiV1UserByOrganizationIdByEmailData, GetApiV1UserByOrganizationIdByEmailErrors, GetApiV1UserByOrganizationIdByEmailResponses, GetApiV1UsersByOrganizationIdData, GetApiV1UsersByOrganizationIdErrors, GetApiV1UsersByOrganizationIdResponses, GetApiV2OrganizationByIdData, GetApiV2OrganizationByIdErrors, GetApiV2OrganizationByIdResponses, PostApiV1ApiKeyByIdData, PostApiV1ApiKeyByIdErrors, PostApiV1ApiKeyByIdResponses, PostApiV1ApiKeyData, PostApiV1ApiKeyErrors, PostApiV1ApiKeyResponses, PostApiV1InternalUserByTenantIdByUserIdData, PostApiV1InternalUserByTenantIdByUserIdErrors, PostApiV1InternalUserByTenantIdByUserIdResponses, PostApiV1InvitedUserData, PostApiV1InvitedUserErrors, PostApiV1InvitedUserResponses, PostApiV1OrganizationByIdActivateSecretData, PostApiV1OrganizationByIdActivateSecretErrors, PostApiV1OrganizationByIdActivateSecretResponses, PostApiV1TenantByIdData, PostApiV1TenantByIdErrors, PostApiV1TenantByIdResponses, PostApiV1UserByIdData, PostApiV1UserByIdErrors, PostApiV1UserByIdResponses, PostApiV1UserByOrganizationIdByEmailData, PostApiV1UserByOrganizationIdByEmailErrors, PostApiV1UserByOrganizationIdByEmailResponses, PostApiV1UserData, PostApiV1UserErrors, PostApiV1UserResponses, PostApiV1UsersByOrganizationIdData, PostApiV1UsersByOrganizationIdErrors, PostApiV1UsersByOrganizationIdResponses, PostApiV2OrganizationByIdData, PostApiV2OrganizationByIdErrors, PostApiV2OrganizationByIdResponses, PostApiV2OrganizationData, PostApiV2OrganizationErrors, PostApiV2OrganizationResponses } from './types.gen';
export type Options<TData extends TDataShape = TDataShape, ThrowOnError extends boolean = boolean> = Options2<TData, ThrowOnError> & {
    /**
     * You can provide a client instance returned by `createClient()` instead of
     * individual options. This might be also useful if you want to implement a
     * custom client.
     */
    client?: Client;
    /**
     * You can pass arbitrary values through the `meta` object. This can be
     * used to access values that aren't defined as part of the SDK function.
     */
    meta?: Record<string, unknown>;
};
/**
 * Delete an invited admin
 */
export declare const deleteApiV1InvitedUserById: <ThrowOnError extends boolean = false>(options: Options<DeleteApiV1InvitedUserByIdData, ThrowOnError>) => import("./client").RequestResult<DeleteApiV1InvitedUserByIdResponses, DeleteApiV1InvitedUserByIdErrors, ThrowOnError, "fields">;
/**
 * Invite an new admin to the tenant
 */
export declare const postApiV1InvitedUser: <ThrowOnError extends boolean = false>(options?: Options<PostApiV1InvitedUserData, ThrowOnError>) => import("./client").RequestResult<PostApiV1InvitedUserResponses, PostApiV1InvitedUserErrors, ThrowOnError, "fields">;
/**
 * Delete an internal user (admin) on a tenant
 */
export declare const deleteApiV1InternalUserByTenantIdByUserId: <ThrowOnError extends boolean = false>(options: Options<DeleteApiV1InternalUserByTenantIdByUserIdData, ThrowOnError>) => import("./client").RequestResult<DeleteApiV1InternalUserByTenantIdByUserIdResponses, DeleteApiV1InternalUserByTenantIdByUserIdErrors, ThrowOnError, "fields">;
/**
 * Update an existing internal user (admin) on a tenant
 */
export declare const postApiV1InternalUserByTenantIdByUserId: <ThrowOnError extends boolean = false>(options: Options<PostApiV1InternalUserByTenantIdByUserIdData, ThrowOnError>) => import("./client").RequestResult<PostApiV1InternalUserByTenantIdByUserIdResponses, PostApiV1InternalUserByTenantIdByUserIdErrors, ThrowOnError, "fields">;
/**
 * Delete an organization
 *
 * WARNING! When you delete an organizations, all users and settings will be deleted. This action cannot be undone.
 */
export declare const deleteApiV2OrganizationById: <ThrowOnError extends boolean = false>(options: Options<DeleteApiV2OrganizationByIdData, ThrowOnError>) => import("./client").RequestResult<DeleteApiV2OrganizationByIdResponses, DeleteApiV2OrganizationByIdErrors, ThrowOnError, "fields">;
/**
 * Get an organization
 */
export declare const getApiV2OrganizationById: <ThrowOnError extends boolean = false>(options: Options<GetApiV2OrganizationByIdData, ThrowOnError>) => import("./client").RequestResult<GetApiV2OrganizationByIdResponses, GetApiV2OrganizationByIdErrors, ThrowOnError, "fields">;
/**
 * Update an existing organization
 */
export declare const postApiV2OrganizationById: <ThrowOnError extends boolean = false>(options: Options<PostApiV2OrganizationByIdData, ThrowOnError>) => import("./client").RequestResult<PostApiV2OrganizationByIdResponses, PostApiV2OrganizationByIdErrors, ThrowOnError, "fields">;
/**
 * Create a new organization
 */
export declare const postApiV2Organization: <ThrowOnError extends boolean = false>(options?: Options<PostApiV2OrganizationData, ThrowOnError>) => import("./client").RequestResult<PostApiV2OrganizationResponses, PostApiV2OrganizationErrors, ThrowOnError, "fields">;
/**
 * Request a new client secret for the organization
 */
export declare const getApiV1OrganizationByIdRotateSecret: <ThrowOnError extends boolean = false>(options: Options<GetApiV1OrganizationByIdRotateSecretData, ThrowOnError>) => import("./client").RequestResult<GetApiV1OrganizationByIdRotateSecretResponses, GetApiV1OrganizationByIdRotateSecretErrors, ThrowOnError, "fields">;
/**
 * Activate the newly created client secret for the organization
 *
 * To create a new client secret, first use the /api/v1/organization/{id}/rotate_secret endpoint.
 */
export declare const postApiV1OrganizationByIdActivateSecret: <ThrowOnError extends boolean = false>(options: Options<PostApiV1OrganizationByIdActivateSecretData, ThrowOnError>) => import("./client").RequestResult<PostApiV1OrganizationByIdActivateSecretResponses, PostApiV1OrganizationByIdActivateSecretErrors, ThrowOnError, "fields">;
/**
 * Delete a tenant
 *
 * WARNING! When you delete a tenant, all organizations, users and settings will be deleted. This action cannot be undone.
 */
export declare const deleteApiV1TenantById: <ThrowOnError extends boolean = false>(options: Options<DeleteApiV1TenantByIdData, ThrowOnError>) => import("./client").RequestResult<DeleteApiV1TenantByIdResponses, DeleteApiV1TenantByIdErrors, ThrowOnError, "fields">;
/**
 * Get a tenant
 */
export declare const getApiV1TenantById: <ThrowOnError extends boolean = false>(options: Options<GetApiV1TenantByIdData, ThrowOnError>) => import("./client").RequestResult<GetApiV1TenantByIdResponses, GetApiV1TenantByIdErrors, ThrowOnError, "fields">;
/**
 * Update an existing tenant
 */
export declare const postApiV1TenantById: <ThrowOnError extends boolean = false>(options: Options<PostApiV1TenantByIdData, ThrowOnError>) => import("./client").RequestResult<PostApiV1TenantByIdResponses, PostApiV1TenantByIdErrors, ThrowOnError, "fields">;
/**
 * Get all invoices for a tenant
 */
export declare const getApiV1InvoicesByTenantId: <ThrowOnError extends boolean = false>(options: Options<GetApiV1InvoicesByTenantIdData, ThrowOnError>) => import("./client").RequestResult<GetApiV1InvoicesByTenantIdResponses, GetApiV1InvoicesByTenantIdErrors, ThrowOnError, "fields">;
/**
 * Delete a user
 *
 * Note that a user can create a new user object by logging in again. It is not necessary to create a new user object first.
 */
export declare const deleteApiV1UserById: <ThrowOnError extends boolean = false>(options: Options<DeleteApiV1UserByIdData, ThrowOnError>) => import("./client").RequestResult<DeleteApiV1UserByIdResponses, DeleteApiV1UserByIdErrors, ThrowOnError, "fields">;
/**
 * Get a user
 */
export declare const getApiV1UserById: <ThrowOnError extends boolean = false>(options: Options<GetApiV1UserByIdData, ThrowOnError>) => import("./client").RequestResult<GetApiV1UserByIdResponses, GetApiV1UserByIdErrors, ThrowOnError, "fields">;
/**
 * Update an existing user
 *
 * Note that it is not possible to edit the email address of a user.
 */
export declare const postApiV1UserById: <ThrowOnError extends boolean = false>(options: Options<PostApiV1UserByIdData, ThrowOnError>) => import("./client").RequestResult<PostApiV1UserByIdResponses, PostApiV1UserByIdErrors, ThrowOnError, "fields">;
/**
 * Delete a user by email address
 *
 * Note that a user can create a new user object by logging in again. It is not necessary to create a new user object first.
 */
export declare const deleteApiV1UserByOrganizationIdByEmail: <ThrowOnError extends boolean = false>(options: Options<DeleteApiV1UserByOrganizationIdByEmailData, ThrowOnError>) => import("./client").RequestResult<DeleteApiV1UserByOrganizationIdByEmailResponses, DeleteApiV1UserByOrganizationIdByEmailErrors, ThrowOnError, "fields">;
/**
 * Get a user by email address
 */
export declare const getApiV1UserByOrganizationIdByEmail: <ThrowOnError extends boolean = false>(options: Options<GetApiV1UserByOrganizationIdByEmailData, ThrowOnError>) => import("./client").RequestResult<GetApiV1UserByOrganizationIdByEmailResponses, GetApiV1UserByOrganizationIdByEmailErrors, ThrowOnError, "fields">;
/**
 * Update an existing user by email address
 *
 * Note that it is not possible to edit the email address of a user.
 */
export declare const postApiV1UserByOrganizationIdByEmail: <ThrowOnError extends boolean = false>(options: Options<PostApiV1UserByOrganizationIdByEmailData, ThrowOnError>) => import("./client").RequestResult<PostApiV1UserByOrganizationIdByEmailResponses, PostApiV1UserByOrganizationIdByEmailErrors, ThrowOnError, "fields">;
/**
 * Create a new user
 *
 * Note that it is not necessary to create a user before this user can log in. When a user does not exist when they try to log for in the first time, the user will be created automatically.
 */
export declare const postApiV1User: <ThrowOnError extends boolean = false>(options?: Options<PostApiV1UserData, ThrowOnError>) => import("./client").RequestResult<PostApiV1UserResponses, PostApiV1UserErrors, ThrowOnError, "fields">;
/**
 * Get a list of users
 *
 * Get a pager object with all users in an organization
 */
export declare const getApiV1UsersByOrganizationId: <ThrowOnError extends boolean = false>(options: Options<GetApiV1UsersByOrganizationIdData, ThrowOnError>) => import("./client").RequestResult<GetApiV1UsersByOrganizationIdResponses, GetApiV1UsersByOrganizationIdErrors, ThrowOnError, "fields">;
/**
 * Create a batch of users
 *
 * Any duplicate entries will be skipped. Note that it is not necessary to create a user before this user can log in. When a user does not exist when they try to log for in the first time, the user will be created automatically.
 */
export declare const postApiV1UsersByOrganizationId: <ThrowOnError extends boolean = false>(options: Options<PostApiV1UsersByOrganizationIdData, ThrowOnError>) => import("./client").RequestResult<PostApiV1UsersByOrganizationIdResponses, PostApiV1UsersByOrganizationIdErrors, ThrowOnError, "fields">;
/**
 * Delete an API key
 */
export declare const deleteApiV1ApiKeyById: <ThrowOnError extends boolean = false>(options: Options<DeleteApiV1ApiKeyByIdData, ThrowOnError>) => import("./client").RequestResult<DeleteApiV1ApiKeyByIdResponses, DeleteApiV1ApiKeyByIdErrors, ThrowOnError, "fields">;
/**
 * Get an API key
 */
export declare const getApiV1ApiKeyById: <ThrowOnError extends boolean = false>(options: Options<GetApiV1ApiKeyByIdData, ThrowOnError>) => import("./client").RequestResult<GetApiV1ApiKeyByIdResponses, GetApiV1ApiKeyByIdErrors, ThrowOnError, "fields">;
/**
 * Update an existing API key
 */
export declare const postApiV1ApiKeyById: <ThrowOnError extends boolean = false>(options: Options<PostApiV1ApiKeyByIdData, ThrowOnError>) => import("./client").RequestResult<PostApiV1ApiKeyByIdResponses, PostApiV1ApiKeyByIdErrors, ThrowOnError, "fields">;
/**
 * Create a new API key
 */
export declare const postApiV1ApiKey: <ThrowOnError extends boolean = false>(options?: Options<PostApiV1ApiKeyData, ThrowOnError>) => import("./client").RequestResult<PostApiV1ApiKeyResponses, PostApiV1ApiKeyErrors, ThrowOnError, "fields">;
/**
 * Get all API keys for a tenant or organization
 */
export declare const getApiV1ApiKeysByOrganizationId: <ThrowOnError extends boolean = false>(options: Options<GetApiV1ApiKeysByOrganizationIdData, ThrowOnError>) => import("./client").RequestResult<GetApiV1ApiKeysByOrganizationIdResponses, GetApiV1ApiKeysByOrganizationIdErrors, ThrowOnError, "fields">;
/**
 * Get a list of API requests
 *
 * Get a pager object with all API requests made under this tenant
 */
export declare const getApiV1ApiRequestsByTenantId: <ThrowOnError extends boolean = false>(options: Options<GetApiV1ApiRequestsByTenantIdData, ThrowOnError>) => import("./client").RequestResult<GetApiV1ApiRequestsByTenantIdResponses, GetApiV1ApiRequestsByTenantIdErrors, ThrowOnError, "fields">;
/**
 * Get a list of audit logs
 *
 * Get a pager object with all audit logs created under a tenant
 */
export declare const getApiV1AuditLogsByTenantId: <ThrowOnError extends boolean = false>(options: Options<GetApiV1AuditLogsByTenantIdData, ThrowOnError>) => import("./client").RequestResult<GetApiV1AuditLogsByTenantIdResponses, GetApiV1AuditLogsByTenantIdErrors, ThrowOnError, "fields">;
/**
 * Get a list of mail logs
 *
 * Get a pager object with all mail logs created under the organizations of a tenant
 */
export declare const getApiV1MailLogsByTenantId: <ThrowOnError extends boolean = false>(options: Options<GetApiV1MailLogsByTenantIdData, ThrowOnError>) => import("./client").RequestResult<GetApiV1MailLogsByTenantIdResponses, GetApiV1MailLogsByTenantIdErrors, ThrowOnError, "fields">;
