import prisma from '../config/database.js';
import { WifiInputAndUser } from '../interfaces/wifiTypes.js';

export async function createWifi(wifiData: WifiInputAndUser) {
    await prisma.wifi.create({ data: wifiData });
}

export async function getWifis(userId: number) {
    return prisma.wifi.findMany({ where: { userId } });
}

export async function getWifiById(userId: number, wifiId: number) {
    return prisma.wifi.findFirstOrThrow({ where: { id: wifiId, userId } });
}

export async function deleteWifiById(userId: number, wifiId: number) {
    return prisma.wifi.deleteMany({ where: { id: wifiId, userId } });
}
