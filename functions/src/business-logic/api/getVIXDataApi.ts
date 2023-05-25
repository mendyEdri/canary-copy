import {google} from 'googleapis';
import { isMockedEnabled, mockedData } from '../mocks';

export const getVIXDataApi = async () => {
    const sheets = google.sheets('v4');
    if (isMockedEnabled) {
        return mockedData
    }
    const {data} = await sheets.spreadsheets.values.get({
        key: process.env.GOOGLESHEETS_KEY, 
        spreadsheetId: process.env.VIX_SPREADSHEET_ID, 
        range: '1:3'
    });
    return data?.values;
}