import { Module } from "@nestjs/common";
import { RoutesService } from "@routes/routes.service";
import { RoutesController } from "@routes/routes.controller";

@Module({
    providers: [RoutesService],
    controllers: [RoutesController],
})
export class RoutesModule {}
