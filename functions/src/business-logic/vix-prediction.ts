import {getVIXData} from './clients/google';
import {getLastStatusApi, setLastStatusApi} from './api/statusApi';
import { sendMessage } from './api/sendMessage';
import {getColor} from './strategy/vix-flow';
import {getSymbols} from './utils/getVIXSymbols';
import { VIX_SYMBOLS } from './Consts';

export const vixPrediction = async ({templateMessage, forceSend}: {templateMessage: string, forceSend?: boolean}) => {
    try {
      const data = await getVIXData();
      const filteredVIX = getSymbols(data, VIX_SYMBOLS);
      const lastStatus = await getLastStatusApi();

      const color = getColor(filteredVIX) || 'undefined';
      
      setLastStatusApi({status: color, data});
      const hasChanged = lastStatus.data.status !== color;
    
      if (hasChanged || forceSend) {
        console.log({hasChanged, forceSend, lastStatus});
        await sendMessage(color, templateMessage, data);
      }
  
      return {hasChanged, color};
    } catch(error) {
      return {
        error: JSON.stringify({ error: 'Failed fetching data' }),
      };
    }   
  }