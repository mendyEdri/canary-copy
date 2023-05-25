const admin = require('firebase-admin');
import { getFirestore } from 'firebase-admin/firestore';

const VIX_DB_NAME = 'vix-collection-db';
// const VIX_HISTORY_DOC_NAME = 'history';
const VIX_LAST_VALUE_DOC_NAME = 'last-status';

export class Firebase {
  private static instance: Firebase;

  private constructor() {
    // init firebase admin
  }

  private getVIXRecentStatusCollection = () => {
    return this.getFirestoreDB().collection(VIX_DB_NAME).doc(VIX_LAST_VALUE_DOC_NAME);
  }

  public static getInstance = () => {
    if (!this.instance) {
      this.instance = new Firebase();
    }
    return this.instance;
  };

  public getFirestoreDB = () => {
    return getFirestore();
  };

  public appendLastVIXStatus = async (status: string, data: any): Promise<{result?: any; error?: Error | unknown;}> => {
    try {
      const {result, error} = await this.setLastStatus(status, data);
      // await this.appendToHistory(status, data);

      return {result, error};
    } catch (error) {
      return {error};
    }
  };

  public getLastVIXStatus = async (): Promise<{result?: any; error?: Error | unknown;}> => {
    try {
      const docRef = this.getVIXRecentStatusCollection();
      const result = await docRef.get();
      return {result}
    } catch (error) {
      return {error};
    }
  }

  private setLastStatus = async (status: string, data: any) => {
    const lastStatusDoc = this.getVIXRecentStatusCollection()
    try {
      const result = await lastStatusDoc.set({
        status,
        value: JSON.stringify(Object.fromEntries(data)),
        date: new Date(),
      });
      return {result};
    } catch (error) {
      return {error};
    }
  }
}