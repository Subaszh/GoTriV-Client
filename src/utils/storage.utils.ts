class StorageUtils {
  readonly prefix = 'gotriv-';
  
  set(key: string, value: any) {
    if(typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    localStorage.setItem(this.prefix + key, value);
  }

  get(key: string) {
    return JSON.parse(localStorage.getItem(this.prefix + key) as string);
  }
}

export default StorageUtils