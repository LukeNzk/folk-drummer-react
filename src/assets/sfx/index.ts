
export interface SfxAsset { dir: string, files: Array<string>}
export interface SfxCollection {
  [category: string]: SfxAsset
}

const sfxList: SfxCollection = {
  skin: { dir: './skin/', files: [ 'skin-1', 'skin-2', 'skin-3' ] },
  bells: { dir: './bells/', files: [ 'bells-1', 'bells-2', 'bells-3', 'bells-4', 'bells-5'] },
  hybrid: { dir: './hybrid/', files: [ 'hybrid-1', 'hybrid-2', 'hybrid-3', 'hybrid-4'] }
};

let soundsLoaded = false;
const getSounds = async () => {
  if (soundsLoaded) {
    return sfxList;
  }
  
  const promises: Array<Promise<void>> = [];
  Object.keys(sfxList).forEach(key => {
    const category = sfxList[key];
    for(let i = 0; i < category.files.length; ++i) {
      const importing = import(category.dir + category.files[i] + '.wav').then(asset => {
        category.files[i] = asset.default;
      });
      promises.push(importing);
    }
  });
  
  await Promise.all(promises);
  soundsLoaded = true;
  return sfxList;
};

const assets = {
  sounds: getSounds
}

export default assets;
