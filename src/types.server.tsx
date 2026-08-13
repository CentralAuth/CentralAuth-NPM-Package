/// <reference types="node" />
import { IncomingMessage, ServerResponse } from "node:http";
import type { User } from "./types.js";

//Type for the parameters of the callback HTTP method
//The originalResponse is the HTTP response object
//The responseToReturn is the Response object that will be sent back to the user. This object can be altered in the callback method and returned to alter the Response that will be returned by the callback function.
export type CallbackParamsHTTP = {
  onStateReceived?: (req: Request, state: string) => Promise<boolean>;
  onAfterCallback?: (req: IncomingMessage, originalResponse: ServerResponse, responseToReturn: Response, user: User) => Promise<Response | void>;
}
