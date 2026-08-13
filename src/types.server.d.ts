/// <reference types="node" />
import { IncomingMessage, ServerResponse } from "node:http";
import type { User } from "./types.js";
export type CallbackParamsHTTP = {
    onStateReceived?: (req: Request, state: string) => Promise<boolean>;
    onAfterCallback?: (req: IncomingMessage, originalResponse: ServerResponse, responseToReturn: Response, user: User) => Promise<Response | void>;
};
