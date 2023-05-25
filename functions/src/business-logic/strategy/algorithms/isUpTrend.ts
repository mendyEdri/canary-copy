import {TickerItemType} from '../../../../types'

const isUpTrend = (map: Map<string, TickerItemType>) => {
    let previousPrice;
    for (let [_, value] of map) {
        if (!previousPrice) {
            previousPrice = value.price;
            continue;
        }
        if (previousPrice >= value.price) {
            return false;
        }
        previousPrice = value.price;
    }
    return true;
}

export {isUpTrend};