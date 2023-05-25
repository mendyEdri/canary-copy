import {TickerItemType} from '../../../../types'
import {Tickers} from '../../Consts';
import {VIX_PRICE_THRESHOLD} from '../Constants';

const isUnusualHighVIX = (map: Map<string, TickerItemType>) => {
    return map.get(Tickers.VIX)?.price >= VIX_PRICE_THRESHOLD;
}

export {isUnusualHighVIX};