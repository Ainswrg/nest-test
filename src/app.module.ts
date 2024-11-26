import { Module } from "@nestjs/common";
import { AppController } from "@src/app.controller";
import { AppService } from "@src/app.service";
import { RoutesModule } from "@src/routes/routes.module";

@Module({
    imports: [RoutesModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
