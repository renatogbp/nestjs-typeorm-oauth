import { Controller, Get, UseGuards, Res, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Provider } from './strategies/provider.enum';

@Controller('auth')
export class AuthController {
    @Get('google')
    @UseGuards(AuthGuard(Provider.GOOGLE))
    async googleLogin() {
        // initiate google oauth2 flow
    }

    @Get('google/callback')
    @UseGuards(AuthGuard(Provider.GOOGLE))
    async googleLoginCallback(@Req() req, @Res() res) {
        const jwt: string = req.user.jwt;
        if (jwt) {
            res.redirect('http://localhost:4200/login/succes/' + jwt);
        } else {
            res.redirect('http://localhost:4200/login/failure');
        }
    }
}
