import {onRequest} from "firebase-functions/v2/https";
import { vixPrediction } from './business-logic/vix-prediction';

export const predict = onRequest(async (req: any, res: any) => {
  try {
    const {hasChanged, color} = await vixPrediction({templateMessage: 'Canary Status is:', forceSend: false});
    res.json({statusCode: 200, body: {hasChanged, color}});
  } catch (error) {
    res.json({statusCode: 500, body: {error}});
  }
});