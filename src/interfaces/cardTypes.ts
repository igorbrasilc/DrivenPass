export type CardCorrected = {
    title: string;
    number: number;
    username: string;
    CVC: string;
    expirationDate: Date;
    password: string;
    isVirtual: boolean;
    userId: number;
    cardTypeId: number;
}

export type CardPartial = Partial<CardCorrected>;

export type CardPartialInput = CardPartial & {
    cardType: 'credit' | 'debit' | 'both'
}

export type CardAndUser = CardPartialInput & {
    userId: number
};
