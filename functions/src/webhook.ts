import {onRequest} from "firebase-functions/v2/https";
import { vixPrediction } from './business-logic/vix-prediction';

export const webhook = onRequest(async (req: any, res: any) => {
  const payload = JSON.parse(JSON.stringify(req.body.entry[0].changes[0]));

  if (payload?.field !== 'messages'){
    return res.sendStatus(400)
  }

  const message = payload.value.messages[0]?.text.body;
  if (message?.toUpperCase() === 'CANARY') {
    await vixPrediction({templateMessage: 'Canary Status is:', forceSend: true});
  }
  try {
    res.send(req?.query?.hub?.challenge);
  } catch (error) {
    console.log(error);
    res.json({statusCode: 500, body: {error}});
  }
});