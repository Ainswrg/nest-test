import { Injectable } from "@nestjs/common";

@Injectable()
export class RoutesService {
    private routes: Map<string, { handler: (res: any) => void; timeoutId: NodeJS.Timeout }> =
        new Map();

    getRouteHandler(routeName: string) {
        const route = this.routes.get(routeName);
        return route ? route.handler : null;
    }

    addRoute(name: string, handlerCode: string, ttl?: number) {
        try {
            const ttlInHours = ttl ?? 1;
            const ttlInSeconds = Math.min(ttlInHours, 8) * (60 * 60);
            const handlerFunction = new Function("res", handlerCode) as any;

            const timeoutId = setTimeout(() => {
                this.routes.delete(name);
                console.log(`Route ${name} has been removed after ${ttlInSeconds} seconds.`);
            }, ttlInSeconds * 1000);

            this.routes.set(name, { handler: handlerFunction, timeoutId });
            console.log(`Route ${name} added with TTL of ${ttlInSeconds} seconds.`);
        } catch (error) {
            console.error(`Failed to add route ${name}:`, error.message);
        }
    }

    removeRoute(name: string) {
        const route = this.routes.get(name);
        if (route) {
            clearTimeout(route.timeoutId);
            this.routes.delete(name);
            console.log(`Route ${name} has been removed manually.`);
        } else {
            console.error(`Route ${name} not found for removal.`);
        }
    }
}
