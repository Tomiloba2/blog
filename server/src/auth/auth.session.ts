import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private prisma: PrismaService) {
        super()
    }
    serializeUser(user: any, done: (err:Error,user:any)=>void) {
        done(null,  {id:user.id})
    }
    async deserializeUser(payload: any, done: Function) {
        const user = await this.prisma.user.findUnique({ where: { id: payload.id } })
        if (!user) {
            return done(
              `Could not deserialize user`,
              null,
            );
          }
        done(null, user)
    }
}