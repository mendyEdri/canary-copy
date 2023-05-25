import {Firebase} from './firebase';

export const setLastStatusApi = async ({status, data}: {status: string, data: any}) => {
    const {result, error} = await Firebase.getInstance().appendLastVIXStatus(status, data);
    return {
      result,
      error
    }
}

export const getLastStatusApi = async () => {
  const {result, error} = await Firebase.getInstance().getLastVIXStatus();
  return {data: result.data(), error};
}