import {
    Controller,
    Get,
    Param,
    Res,
    Post,
    Body,
    Delete,
    Headers,
    HttpException,
    HttpStatus,
} from "@nestjs/common";
import { RoutesService } from "./routes.service";

@Controller()
export class RoutesController {
    constructor(private readonly routesService: RoutesService) {}

    @Get(":routeName")
    handleRoute(@Param("routeName") routeName: string, @Res() res) {
        const routeHandler = this.routesService.getRouteHandler(routeName);
        if (!routeHandler) {
            return res.status(404).send("Route not found");
        }
        return routeHandler(res);
    }

    @Post("add-route")
    addRoute(
        @Body() body: { name: string; handler: string; ttl: number | undefined },
        @Headers("authorization") authHeader: string,
    ) {
        const isAuthorized = this.basicAuth(authHeader);
        if (!isAuthorized) {
            throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        this.routesService.addRoute(body.name, body.handler, body.ttl);
        return { message: `Route ${body.name} added` };
    }

    private basicAuth(authHeader: string): boolean {
        const username = "login123";
        const password = "password123";
        const base64Credentials = Buffer.from(`${username}:${password}`).toString("base64");
        const expectedAuthHeader = base64Credentials;
        return authHeader === expectedAuthHeader;
    }

    @Delete("remove-route")
    removeRoute(@Body() body: { name: string }, @Headers("authorization") authHeader: string) {
        const isAuthorized = this.basicAuth(authHeader);
        if (!isAuthorized) {
            throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        this.routesService.removeRoute(body.name);
        return { message: `Route ${body.name} removed` };
    }
}
