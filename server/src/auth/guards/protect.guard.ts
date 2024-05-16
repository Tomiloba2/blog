import { CanActivate, ExecutionContext, Global, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Global()
@Injectable()
export class ProtectedRouteGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()
        return request.isAuthenticated()
    }
}