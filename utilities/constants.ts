export const ACCESS_TOKEN = "__server_token__";
export const USER_ID = "__user_id__";
export const NAME = "__name__";
export const EMAIL = "__email__";

/**
 * How long the auth cookie lives, in seconds.
 *
 * Must stay in step with TOKEN_TTL_SECONDS in the backend's
 * userController — when the cookie outlived the token (or vice versa)
 * users were silently signed out mid-session while the token itself
 * stayed valid far longer.
 */
export const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60;
