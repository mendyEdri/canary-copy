import { getVIXDataApi } from '../api/getVIXDataApi';
import {TickerItemType} from '../../../types';
import { responseMatrixToMap } from '../utils';

export async function getVIXData(): Promise<Map<string, TickerItemType>> {
  const rows = await getVIXDataApi();
  return responseMatrixToMap(rows, 'price', 'ratio');
}