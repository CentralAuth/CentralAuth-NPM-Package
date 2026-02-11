"use client"

import { ReactElement, ReactNode, createElement, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import type { WithCentralAuthAutomaticLogin } from "./react.types";
import type { BasePaths, User } from "./types";

//This component checks if the children need affirmation to be rendered. If so, the user will be redirected to the affirmation API route.
//Param affirmationNeededAfter is the time in seconds after which the user needs to affirm again. This is checked by comparing the current time with the affirmationDate of the user. If the affirmationDate is older than the affirmationNeededAfter value, the user needs to affirm again.
//Param config can be used when the API route for affirmation is different from the default /api/auth/affirm
export const AffirmationRequired = ({ user, affirmationNeededAfter, config, children }: { user: User, affirmationNeededAfter: number, config?: Pick<BasePaths, "affirmationPath">, children: ReactNode }) => {
  const affirmationNeeded = useMemo(() => {
    if (user.affirmationDate) {
      const affirmationDate = new Date(user.affirmationDate);
      const now = new Date();

      //Check if the affirmation date is older than the affirmationNeededAfter value
      if (now.getTime() - affirmationDate.getTime() >= affirmationNeededAfter * 1000)
        return true;
      else
        return false;
    } else
      return false;
  }, [user, affirmationNeededAfter]);

  useEffect(() => {
    if (affirmationNeeded) {
      //Redirect to the affirmation page
      window.location.replace(config?.affirmationPath || "/api/auth/affirm");
    }
  }, [affirmationNeeded]);

  return affirmationNeeded ? null : children;
}


//React hook to declaratively get the currently logged in user via SWR. See https://swr.vercel.app for more info on SWR.
//Param config can be used when the API route for /user is different from the default /api/auth/user
//Will return null when the user is not logged in or on error, and undefined when the request is still active
//The error object will be populated with the fetcher error when the request failed
export const useUser = (config?: Pick<BasePaths, "profilePath">) => {
  const { data: user, error, isLoading, isValidating } = useSWR<User | null>(config?.profilePath || "/api/auth/user", (resource, init) => fetch(resource, init).then(res => res.json()), {});

  return { user: !error ? user : null, error, isLoading, isValidating };
}
//React hook to declaratively get the currently logged in user.
//When the user could not be fetched, redirect the user to the login page
//Returns the user object when the user is logged in, and null when the user is being fetched
export const useUserRequired = (config?: Pick<BasePaths, "profilePath" | "loginPath">) => {
  const { user, isLoading } = useUser(config);

  useEffect(() => {
    if (!user && !isLoading) {
      //User is not logged in, redirect to the login page
      window.location.replace(config?.loginPath || "/api/auth/login");
    }
  }, [user, isLoading]);

  return user || null;
}

//Wrapper for a React based client to redirect an anonymous user to CentralAuth when visiting a page that requires authentication
export const withCentralAuthAutomaticLogin: WithCentralAuthAutomaticLogin = (Component, config) => {
  return function WithCentralAuthAutomaticLogin(props): ReactElement<any, any> | null {
    const PlaceholderComponent = config?.PlaceholderComponent || null;
    const [user, setUser] = useState<User>();

    useEffect(() => {
      fetch(config?.profilePath || "/api/auth/user")
        .then(response => {
          response.json()
            .then((userData: User) => {
              if (userData == null)
                window.location.replace(config?.loginPath || "/api/auth/login");
              else
                setUser(userData);
            })
        })

    }, [config]);

    if (user)
      return createElement(Component, Object.assign({}, props));

    return PlaceholderComponent;
  };
};