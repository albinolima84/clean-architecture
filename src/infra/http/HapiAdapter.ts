import HttpServer from "./HttpServer";
import Hapi from "@hapi/hapi";

export default class HapiAdapter implements HttpServer {
    server: Hapi.Server;
    constructor(){
        this.server = Hapi.server({});
    }

    convertUrl(url: string) {
        return url.replace(/\$/g, "");
    }

    async on(method: string, url: string, callback: Function): Promise<void> {
        this.server.route({
            method,
            path: this.convertUrl(url),
            handler: async function(request: any, response: any){
                const data = await callback(request.params, request.payload);
                return data;
            }
        });
    }
    async listen(port: number): Promise<void> {
        this.server.settings.port = port;
        await this.server.start();
    }
}