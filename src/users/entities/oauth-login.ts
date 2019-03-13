import { Column } from 'typeorm';

export class OAuthLogin {
    constructor(init?: Partial<OAuthLogin>) {
        Object.assign(this, init);
    }

    @Column()
    provider: string;

    @Column()
    providerId: string;
}
