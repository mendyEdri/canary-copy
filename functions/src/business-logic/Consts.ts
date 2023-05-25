export enum Tickers {
    VIX1D = 'VIX1D',
    VIX9D = 'VIX9D',
    VIX = 'VIX',
    VIX3M = 'VIX3M',
    VIX6M = 'VIX6',
    VIX1Y = 'VIX1Y',
    SPY = 'SPY',
    SVIX = 'SVIX'
}

export const VIX_SYMBOLS = ['VIX9D', 'VIX', 'VIX3M', 'VIX6M', 'VIX1Y'];

export const VIX_SYMBOLS_EXCLUDE_9D = ['VIX', 'VIX3M', 'VIX6M', 'VIX1Y'];