import { createContext } from 'react';
import AudioUtils from './AudioUtils';

const AudioUtilsContext = createContext(new AudioUtils());

export const AudioUtilsConsumer = AudioUtilsContext.Consumer;
export const AudioUtilsProvider = AudioUtilsContext.Provider;
export { AudioUtilsContext };
export default AudioUtils;
