"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openapi_ts_1 = require("@hey-api/openapi-ts");
exports.default = (0, openapi_ts_1.defineConfig)({
    input: "https://centralauth.com/api/openapi",
    output: 'api',
    parser: {
        transforms: {
            readWrite: {
                enabled: true
            }
        }
    },
    plugins: [
        '@hey-api/client-fetch',
        {
            name: '@hey-api/typescript'
        },
        {
            name: '@hey-api/sdk',
        },
    ]
});
