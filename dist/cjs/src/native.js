"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CentralAuthProvider = exports.CentralAuthContext = exports.useCentralAuth = exports.hash = void 0;
const buffer_1 = require("buffer");
const expo_crypto_1 = require("expo-crypto");
const expo_secure_store_1 = require("expo-secure-store");
const WebBrowser = __importStar(require("expo-web-browser"));
const react_1 = __importStar(require("react"));
const server_js_1 = require("./server.js");
// Polyfill Buffer for React Native
globalThis.Buffer = buffer_1.Buffer;
/**
 * This function takes a string input, applies SHA256 hashing, and converts the result
 * to base64url encoding by replacing URL-unsafe characters and removing padding.
 *
 * @param string - The input string to be hashed
 * @returns A Promise that resolves to the base64url-encoded SHA256 hash of the input string
 *
 * @example
 * ```typescript
 * const hashedValue = await hash("mySecretString");
 * console.log(hashedValue); // Returns base64url-encoded hash
 * ```
 */
const hash = (string) => __awaiter(void 0, void 0, void 0, function* () {
    const base64Hash = yield (0, expo_crypto_1.digestStringAsync)(expo_crypto_1.CryptoDigestAlgorithm.SHA256, string, { encoding: expo_crypto_1.CryptoEncoding.BASE64 });
    // Convert base64 to base64url
    return base64Hash
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
});
exports.hash = hash;
/**
 * Custom React hook for managing CentralAuth authentication in React Native applications.
 *
 * This hook provides authentication functionality including login, callback handling, and logout
 * operations using OAuth 2.0 with PKCE (Proof Key for Code Exchange) flow.
 *
 * @returns An object containing authentication methods and state:
 * - `login`: Initiates the OAuth login flow by generating PKCE parameters and opening the auth URL
 * - `handleCallback`: Processes the OAuth callback with authorization code and exchanges it for tokens
 * - `logout`: Clears stored access and ID tokens from both local state and secure storage
 * - `accessToken`: Current access token value
 * - `idToken`: Current ID token value
 * - `setAccessToken`: Function to set the access token
 * - `setIdToken`: Function to set the ID token
 * - `deleteAccessToken`: Function to delete the access token
 * - `deleteIdToken`: Function to delete the ID token
 *
 * @throws {ValidationError} When authentication fails or invalid parameters are provided
 *
 * @example
 * ```tsx
 * const { login, handleCallback, logout, accessToken } = useCentralAuth();
 *
 * // Initiate login
 * await login();
 *
 * // Handle callback from deep link
 * await handleCallback({ code: 'auth_code', errorCode: null, message: null });
 *
 * // Logout user
 * await logout();
 * ```
 */
const useCentralAuth = () => {
    //Get the auth context data
    const { clientId, authBaseUrl, callbackUrl, appId, deviceId, accessToken, idToken, setAccessToken, setIdToken, deleteAccessToken, deleteIdToken } = (0, react_1.useContext)(exports.CentralAuthContext);
    // Handle login logic
    const login = (0, react_1.useCallback)((config) => __awaiter(void 0, void 0, void 0, function* () {
        //Create a random state and store it in secure storage
        const state = (0, expo_crypto_1.randomUUID)();
        yield (0, expo_secure_store_1.setItemAsync)("state", state);
        //Create a code verifier and store it in secure storage
        const codeVerifier = (0, expo_crypto_1.randomUUID)();
        yield (0, expo_secure_store_1.setItemAsync)("code_verifier", codeVerifier);
        //Calculate the SHA256 hash as code challenge
        const codeChallenge = yield (0, exports.hash)(codeVerifier);
        //Build the URL to CentralAuth
        const loginURL = new URL(`${authBaseUrl}/login`);
        if (clientId)
            loginURL.searchParams.append("client_id", clientId);
        loginURL.searchParams.append("response_type", "code");
        loginURL.searchParams.append("redirect_uri", callbackUrl);
        loginURL.searchParams.append("state", state);
        loginURL.searchParams.append("code_challenge", codeChallenge);
        loginURL.searchParams.append("code_challenge_method", "S256");
        loginURL.searchParams.append("app_id", appId);
        loginURL.searchParams.append("device_id", deviceId || "");
        if (config === null || config === void 0 ? void 0 : config.email)
            loginURL.searchParams.append("email", config.email);
        if (config === null || config === void 0 ? void 0 : config.errorMessage)
            loginURL.searchParams.append("error_description", config.errorMessage);
        if (config === null || config === void 0 ? void 0 : config.translations)
            loginURL.searchParams.append("translations", buffer_1.Buffer.from(JSON.stringify(config.translations)).toString("base64"));
        //Open the URL in a Web Browser tab
        yield WebBrowser.openAuthSessionAsync(loginURL.toString(), callbackUrl);
    }), [clientId, authBaseUrl, callbackUrl, appId, deviceId]);
    //Handle the callback from CentralAuth
    const handleCallback = (0, react_1.useCallback)((_a) => __awaiter(void 0, [_a], void 0, function* ({ code, state, error, error_description }) {
        if (error_description || !code)
            throw new server_js_1.ValidationError({ errorCode: error || "codeChallengeInvalid", message: error_description || "Code verification failed" });
        //Get the code verifier and state from secure storage
        const codeVerifier = yield (0, expo_secure_store_1.getItemAsync)("code_verifier");
        const storedState = yield (0, expo_secure_store_1.getItemAsync)("state");
        //Validate the state
        if (!state || !storedState)
            throw new server_js_1.ValidationError({ errorCode: "stateMissing", message: "State is missing" });
        if (state !== storedState)
            throw new server_js_1.ValidationError({ errorCode: "stateInvalid", message: "Invalid state" });
        const formData = new FormData();
        formData.append("code", code);
        formData.append("redirect_uri", callbackUrl);
        formData.append("code_verifier", codeVerifier || "");
        //Make a call to the verification endpoint
        const response = yield fetch(`${authBaseUrl}/api/v1/verify`, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            const error = yield response.json();
            throw new server_js_1.ValidationError(error);
        }
        const data = yield response.json();
        //Set both tokens in the local state and secure storage
        yield setAccessToken(data.access_token);
        yield setIdToken(data.id_token);
        //Return the token response
        return data;
    }), [authBaseUrl, callbackUrl, setAccessToken, setIdToken]);
    const logout = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield deleteAccessToken();
        yield deleteIdToken();
    }), [deleteAccessToken, deleteIdToken]);
    return { login, handleCallback, logout, accessToken, idToken, setAccessToken, setIdToken, deleteAccessToken, deleteIdToken };
};
exports.useCentralAuth = useCentralAuth;
//Context provider for React Native apps
exports.CentralAuthContext = (0, react_1.createContext)({
    clientId: null,
    appId: "",
    deviceId: null,
    authBaseUrl: "",
    callbackUrl: "",
    accessToken: undefined,
    idToken: undefined,
    setAccessToken: function (token) {
        throw new Error("Function not implemented.");
    },
    setIdToken: function (token) {
        throw new Error("Function not implemented.");
    },
    deleteAccessToken: function () {
        throw new Error("Function not implemented.");
    },
    deleteIdToken: function () {
        throw new Error("Function not implemented.");
    }
});
/**
 * CentralAuth Provider component that manages authentication state and token storage.
 *
 * This component provides authentication context to its children, handling access tokens
 * and ID tokens with secure storage persistence. It automatically loads stored tokens
 * on initialization and provides methods to update and delete tokens.
 *
 * @param props - The provider configuration props
 * @param props.clientId - The OAuth client identifier
 * @param props.appId - The application identifier
 * @param props.deviceId - The unique device identifier
 * @param props.callbackUrl - The URL to redirect to after authentication
 * @param props.authBaseUrl - The base URL for the authentication service
 * @param props.children - React children components that will have access to the auth context
 *
 * @returns JSX element that provides authentication context to its children
 *
 * @example
 * ```tsx
 * <CentralAuthProvider
 *   clientId="your-client-id"
 *   appId="your-app-id"
 *   deviceId="unique-device-id"
 *   callbackUrl="https://yourapp.com/callback"
 *   authBaseUrl="https://centralauth.com"
 * >
 *   <App />
 * </CentralAuthProvider>
 * ```
 */
const CentralAuthProvider = ({ clientId, appId, deviceId, callbackUrl, authBaseUrl, children }) => {
    const [accessTokenState, setAccessTokenState] = (0, react_1.useState)();
    const [idTokenState, setIdTokenState] = (0, react_1.useState)();
    //Get the tokens from secure storage and set it in the state the first time the provider renders
    (0, react_1.useEffect)(() => {
        const accessTokenFromStorage = (0, expo_secure_store_1.getItem)("access_token");
        const idTokenFromStorage = (0, expo_secure_store_1.getItem)("id_token");
        setAccessTokenState(accessTokenFromStorage);
        setIdTokenState(idTokenFromStorage);
    }, []);
    const setAccessToken = (0, react_1.useCallback)((token) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, expo_secure_store_1.setItemAsync)("access_token", token);
        setAccessTokenState(token);
    }), []);
    const setIdToken = (0, react_1.useCallback)((token) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, expo_secure_store_1.setItemAsync)("id_token", token);
        setIdTokenState(token);
    }), []);
    const deleteAccessToken = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, expo_secure_store_1.deleteItemAsync)("access_token");
        setAccessTokenState(null);
    }), []);
    const deleteIdToken = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, expo_secure_store_1.deleteItemAsync)("id_token");
        setIdTokenState(null);
    }), []);
    return (react_1.default.createElement(exports.CentralAuthContext.Provider, { value: { clientId, appId, deviceId, callbackUrl, authBaseUrl, accessToken: accessTokenState, idToken: idTokenState, setAccessToken, setIdToken, deleteAccessToken, deleteIdToken } }, children));
};
exports.CentralAuthProvider = CentralAuthProvider;
