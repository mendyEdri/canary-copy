import {isUpTrend} from '../algorithms/isUpTrend';
import {isUnusualHighVIX} from '../algorithms/isUnusualHighVIX';
import {TickerItemType} from '../../../../types'
import {Tickers} from '../../Consts';
import { getSymbols } from '../../utils/getVIXSymbols';
import { VIX_SYMBOLS_EXCLUDE_9D } from '../../Consts';

const isRed = (data: Map<string, TickerItemType>) => {    
    const vixWithout9D = getSymbols(data, VIX_SYMBOLS_EXCLUDE_9D);
    if (!isUpTrend(vixWithout9D)) {
        console.log('is not up trend')
        return true;
    }
    
    if (isUnusualHighVIX(data)) {
        console.log('is unusual high VIX');
        return true;
    }

    if (data.get(Tickers.VIX).price >= data.get(Tickers.VIX3M).price) {
        return true;
    }
    return false;
}

export {isRed};