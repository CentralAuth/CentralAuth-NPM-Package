"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withCentralAuthAutomaticLogin = exports.useUserRequired = exports.useUser = exports.AffirmationRequired = void 0;
const react_1 = require("react");
const swr_1 = __importDefault(require("swr"));
//This component checks if the children need affirmation to be rendered. If so, the user will be redirected to the affirmation API route.
//Param affirmationNeededAfter is the time in seconds after which the user needs to affirm again. This is checked by comparing the current time with the affirmationDate of the user. If the affirmationDate is older than the affirmationNeededAfter value, the user needs to affirm again.
//Param config can be used when the API route for affirmation is different from the default /api/auth/affirm
const AffirmationRequired = ({ user, affirmationNeededAfter, config, children }) => {
    const affirmationNeeded = (0, react_1.useMemo)(() => {
        if (user.affirmationDate) {
            const affirmationDate = new Date(user.affirmationDate);
            const now = new Date();
            //Check if the affirmation date is older than the affirmationNeededAfter value
            if (now.getTime() - affirmationDate.getTime() >= affirmationNeededAfter * 1000)
                return true;
            else
                return false;
        }
        else
            return false;
    }, [user, affirmationNeededAfter]);
    (0, react_1.useEffect)(() => {
        if (affirmationNeeded) {
            //Redirect to the affirmation page
            window.location.replace((config === null || config === void 0 ? void 0 : config.affirmationPath) || "/api/auth/affirm");
        }
    }, [affirmationNeeded]);
    return affirmationNeeded ? null : children;
};
exports.AffirmationRequired = AffirmationRequired;
//React hook to declaratively get the currently logged in user via SWR. See https://swr.vercel.app for more info on SWR.
//Param config can be used when the API route for /user is different from the default /api/auth/user
//Will return null when the user is not logged in or on error, and undefined when the request is still active
//The error object will be populated with the fetcher error when the request failed
const useUser = (config) => {
    const { data: user, error, isLoading, isValidating } = (0, swr_1.default)((config === null || config === void 0 ? void 0 : config.profilePath) || "/api/auth/user", (resource, init) => fetch(resource, init).then(res => res.json()), {});
    return { user: !error ? user : null, error, isLoading, isValidating };
};
exports.useUser = useUser;
//React hook to declaratively get the currently logged in user.
//When the user could not be fetched, redirect the user to the login page
//Returns the user object when the user is logged in, and null when the user is being fetched
const useUserRequired = (config) => {
    const { user, isLoading } = (0, exports.useUser)(config);
    (0, react_1.useEffect)(() => {
        if (!user && !isLoading) {
            //User is not logged in, redirect to the login page
            window.location.replace((config === null || config === void 0 ? void 0 : config.loginPath) || "/api/auth/login");
        }
    }, [user, isLoading]);
    return user || null;
};
exports.useUserRequired = useUserRequired;
//Wrapper for a React based client to redirect an anonymous user to CentralAuth when visiting a page that requires authentication
const withCentralAuthAutomaticLogin = (Component, config) => {
    return function WithCentralAuthAutomaticLogin(props) {
        const PlaceholderComponent = (config === null || config === void 0 ? void 0 : config.PlaceholderComponent) || null;
        const [user, setUser] = (0, react_1.useState)();
        (0, react_1.useEffect)(() => {
            fetch((config === null || config === void 0 ? void 0 : config.profilePath) || "/api/auth/user")
                .then(response => {
                response.json()
                    .then((userData) => {
                    if (userData == null)
                        window.location.replace((config === null || config === void 0 ? void 0 : config.loginPath) || "/api/auth/login");
                    else
                        setUser(userData);
                });
            });
        }, [config]);
        if (user)
            return (0, react_1.createElement)(Component, Object.assign({}, props));
        return PlaceholderComponent;
    };
};
exports.withCentralAuthAutomaticLogin = withCentralAuthAutomaticLogin;
