
import { User } from "../generated/graphql";
import { AuthTenantUserResponseDto } from "./auth-tenant-user-response.dto";

export class CurrentUser {

    authenticated:boolean;

    user?:AuthTenantUserResponseDto;

    constructor(user?:AuthTenantUserResponseDto) {
        this.user = user;
        this.authenticated = user && !this._isAnonymous() ? true : false;
    }

    getRole():string {
        if (!this.user)
            throw new Error("User not initialized. Is it authenticated?");
        return this.user.role;
    }

    /**
     * Returns current email domain
     */
    getDomain():string {
        if (!this.user)
            throw new Error("User not initialized. Is it authenticated?");
        return this.user.username.split("@")[1];
    }

    /** Checks if a User from Graphql lists is the same as this current user */
    isSameUser(user:User): boolean {
        if (!this.user)
            throw new Error("User not initialized. Is it authenticated?");
        return this.user.id === user.id;
    }

    hasRole(roles:string[]): boolean {
        return roles.includes(this.getRole());
    }

    hasNotRole(roles:string[]): boolean {
        return !this.hasRole(roles);
    }

    private _isAnonymous(): boolean {
        return this.user?.username === 'ANONYMOUS';
    }
}