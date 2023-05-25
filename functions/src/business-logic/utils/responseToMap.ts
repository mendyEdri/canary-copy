export const responseMatrixToMap = (data: any, key: string, key2: string) => {
    let map = new Map();
    for (let i = 0; i < data[0].length; i++) {
      map.set(data[0][i], {[key]: data[1][i], [key2]: data[2][i]});
    }

    return map;
}

export const responseToMap = (data: any, key: string) => {
  data = data.flat();
  
  let map = new Map();
  map.set(key, data[0]);

  return map;
}