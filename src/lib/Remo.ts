import { Cloud, IAppliance } from 'nature-remo';

let remoClient: Cloud;

export function initRemo() {
    const accessToken = localStorage.getItem('remoAccessToken');
    if (validateAccessToken(accessToken)) {
        remoClient = new Cloud(accessToken!);
    } else {
        throw Error("error: access token is null.")
    }
}

export function validateAccessToken(accessToken: string | null): boolean {
    return accessToken !== null;
}

export function getRemoAppliances(): Promise<IAppliance[]> {
    return remoClient.getAppliances();
}

export async function validateRemoClient(): Promise<void> {
    try {
        await remoClient.getUser()
    } catch (error) {
        throw Error(error);
    }
}
