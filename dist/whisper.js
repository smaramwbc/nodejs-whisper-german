"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCppCommand = exports.whisperShell = void 0;
const path_1 = __importDefault(require("path"));
const shelljs_1 = __importDefault(require("shelljs"));
const WHISPER_CPP_PATH = path_1.default.join(__dirname, '..', 'cpp', 'whisper.cpp');
const WHISPER_CPP_MAIN_PATH = './main';
const defaultShellOptions = {
    silent: true, // true: won't print to console
    async: true,
};
const projectDir = process.cwd();
function whisperShell(command, options = defaultShellOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                // docs: https://github.com/shelljs/shelljs#execcommand--options--callback
                shelljs_1.default.exec(command, options, (code, stdout, stderr) => {
                    if (code === 0) {
                        if (stdout.match(/^error:/gm)) {
                            shelljs_1.default.cd(projectDir);
                            throw new Error('whisper.cpp error:\n' + stdout);
                        }
                        console.log('[Nodejs-whisper] Transcribing Done!');
                        shelljs_1.default.cd(projectDir);
                        resolve(stdout);
                    }
                    else {
                        shelljs_1.default.cd(projectDir);
                        reject(stderr);
                    }
                });
            }
            catch (error) {
                reject(error);
            }
        }));
    });
}
exports.whisperShell = whisperShell;
const executeCppCommand = (command) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        shelljs_1.default.cd(WHISPER_CPP_PATH);
        if (!shelljs_1.default.which(WHISPER_CPP_MAIN_PATH)) {
            shelljs_1.default.echo('[Nodejs-whisper] whisper.cpp not initialized.', __dirname);
            shelljs_1.default.echo("[Nodejs-whisper] Attempting to run 'make' command in /whisper directory...");
            shelljs_1.default.exec('make');
            if (!shelljs_1.default.which(WHISPER_CPP_MAIN_PATH)) {
                console.log(" [Nodejs-whisper] 'make' command failed. Please run 'make' command in /whisper.cpp directory. Current shelljs directory: ", __dirname);
                shelljs_1.default.cd(projectDir);
                process.exit(1);
            }
            else {
                console.log("[Nodejs-whisper] 'make' command successful. Current directory: ", __dirname);
                return yield whisperShell(command, defaultShellOptions);
            }
        }
        else {
            return yield whisperShell(command, defaultShellOptions);
        }
    }
    catch (error) {
        shelljs_1.default.cd(projectDir);
        console.log('[Nodejs-whisper] Error in whisper.ts catch block.');
        throw error;
    }
});
exports.executeCppCommand = executeCppCommand;
//# sourceMappingURL=whisper.js.map