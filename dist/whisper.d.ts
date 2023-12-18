export interface IShellOptions {
    silent: boolean;
    async: boolean;
}
export declare function whisperShell(command: string, options?: IShellOptions): Promise<any>;
export declare const executeCppCommand: (command: string) => Promise<any>;
