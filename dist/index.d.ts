import { WhisperOptions } from './types';
export interface IOptions {
    modelName: string;
    autoDownloadModelName?: string;
    whisperOptions?: WhisperOptions;
}
export declare function nodewhisper(filePath: string, options: IOptions): Promise<any>;
