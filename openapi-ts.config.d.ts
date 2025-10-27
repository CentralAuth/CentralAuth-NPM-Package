declare const _default: Promise<{
    input: "https://centralauth.com/api/openapi";
    output: string;
    parser: {
        transforms: {
            readWrite: {
                enabled: true;
            };
        };
    };
    plugins: ("@hey-api/client-fetch" | {
        name: "@hey-api/typescript";
    } | {
        name: "@hey-api/sdk";
    })[];
}>;
export default _default;
