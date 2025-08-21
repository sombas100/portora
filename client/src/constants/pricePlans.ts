export interface pricePlan {
    title: string;
    price: string;
    features: string[]
}

export const pricePlans: pricePlan[] = [
    {
        title: 'Free',
        price: '£0.00',
        features: ['1 active client slot', 'Unlimited projects per client', 'File uploads']
    },
    {
        title: 'Starter',
        price: '£5.00',
        features: ['3 active client Slots', 'Unlimited projects per client', 'File uploads']
    },
    {
        title: 'Pro',
        price: '£8.00',
        features: ['5 active client Slots', 'Unlimited projects per client', 'File uploads', 'Access to live chat']
    },
    {
        title: 'Enterprise',
        price: '£12.00',
        features: ['10 active client Slots', 'Unlimited projects per client', 'File uploads', 'Access to live chat']
    },
]