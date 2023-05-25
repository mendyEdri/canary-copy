import {scheduler} from 'firebase-functions/v2';
import {vixPrediction} from './business-logic/vix-prediction';

export const predictScheduled = scheduler.onSchedule("*/30 * * * *", async (event) => {
    try {
        await vixPrediction({templateMessage: 'Canary status has changed to:', forceSend: false});
      } catch (error) {
        console.log('error schedule', error);
      } 
});

export const onMarketOpenScheduled = scheduler.onSchedule("30 13 * * 1-5", async (event) => {
    try {
        await vixPrediction({templateMessage: 'Markets are open: Canary status - ', forceSend: true});
      } catch (error) {
        console.log('error schedule', error);
      } 
});

export const onMarketMidDayScheduled = scheduler.onSchedule("30 16 * * 1-5", async (event) => {
  try {
      await vixPrediction({templateMessage: 'Markets mid day: Canary status - ', forceSend: true});
    } catch (error) {
      console.log('error schedule', error);
    } 
});

export const onMarketCloseScheduled = scheduler.onSchedule("0 20 * * 1-5", async (event) => {
    try {
        await vixPrediction({templateMessage: 'Markets are close: Canary status - ', forceSend: true});
      } catch (error) {
        console.log('error schedule', error);
      } 
});