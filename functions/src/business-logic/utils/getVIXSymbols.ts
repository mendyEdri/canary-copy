import {TickerItemType} from "../../../types";

export const getSymbols = (map: Map<string, TickerItemType>, symbols: string[]): Map<string, TickerItemType> => {
    let filteredData: Map<string, TickerItemType> = new Map();
    for (const [key, value] of map) {
        if (symbols.includes(key)) {
            filteredData.set(key, value);
        }
    }
    return filteredData;
}