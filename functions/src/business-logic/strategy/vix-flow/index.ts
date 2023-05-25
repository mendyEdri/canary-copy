import {isYellow} from './yellow';
import {isRed} from './red';
import {TickerItemType} from '../../../../types'

const getColor = (data: Map<string, TickerItemType>) => {
  if (isRed(data)) {
    return 'Red';
  } 
  
  if (isYellow(data)) {
    return 'Yellow';
  }
  return 'Green';
};

export {getColor};