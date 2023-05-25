import { Firebase } from './business-logic/api/firebase';
import { predict } from './predict';
import { predictScheduled, onMarketOpenScheduled, onMarketCloseScheduled, onMarketMidDayScheduled} from './predict-schedule';
import { webhook } from './webhook';

Firebase.getInstance()

export {
  predict,
  predictScheduled,
  onMarketOpenScheduled,
  onMarketCloseScheduled,
  onMarketMidDayScheduled,
  webhook,
};
