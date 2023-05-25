import {isUpTrend} from '../algorithms/isUpTrend';
import {TickerItemType} from '../../../../types'

const isYellow = (data: Map<string, TickerItemType>) => {
    return !isUpTrend(data);
}

export {isYellow};