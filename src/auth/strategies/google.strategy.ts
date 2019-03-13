import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { ConfigService } from 'src/config/config.service';
import { AuthService } from '../auth.service';
import { Provider } from './provider.enum';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, Provider.GOOGLE) {
    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthService) {
        super({
            clientID    : configService.getGoogleClientId(),
            clientSecret: configService.getGoogleClientSecret(),
            callbackURL : 'http://localhost:3000/api/auth/google/callback',
            passReqToCallback: true,
            scope: ['profile email'],
        });
    }

    async validate(request: any, accessToken: string, refreshToken: string, profile: any, done: any) {
        try {
            console.log(profile);

            const jwt: string = await this.authService.validateOAuthLogin(profile, Provider.GOOGLE);
            const user = {
                jwt,
            };

            done(null, user);
        } catch (err) {
            console.log(err);
            done(err, false);
        }
    }
}
