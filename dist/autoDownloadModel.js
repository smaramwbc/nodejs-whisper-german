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
const path_1 = __importDefault(require("path"));
const shelljs_1 = __importDefault(require("shelljs"));
const constants_1 = require("./constants");
const fs_1 = __importDefault(require("fs"));
function autoDownloadModel(autoDownloadModelName) {
    return __awaiter(this, void 0, void 0, function* () {
        const projectDir = process.cwd();
        try {
            if (autoDownloadModelName) {
                if (!constants_1.MODELS_LIST.includes(autoDownloadModelName))
                    throw new Error('[Nodejs-whisper] Error: Provide valid model name');
                shelljs_1.default.cd(path_1.default.join(__dirname, '..', './cpp/whisper.cpp/models'));
                let anyModelExist = [];
                constants_1.MODELS.forEach(model => {
                    if (fs_1.default.existsSync(path_1.default.join(__dirname, '..', `./cpp/whisper.cpp/models/${model}`))) {
                        anyModelExist.push(model);
                        // console.log('anyModelExist found', model)
                    }
                });
                return new Promise((resolve, reject) => {
                    if (anyModelExist.length > 0) {
                        console.log('[Nodejs-whisper] Models already exist. Skipping download.');
                        resolve('Models already exist. Skipping download.');
                        // console.log('Models already exist. Skipping download.')
                    }
                    else {
                        console.log(`[Nodejs-whisper] Autodownload Model: ${autoDownloadModelName}\n`);
                        let scriptPath = './download-ggml-model.sh';
                        if (process.platform === 'win32')
                            scriptPath = 'download-ggml-model.cmd';
                        shelljs_1.default.chmod('+x', scriptPath);
                        shelljs_1.default.exec(`${scriptPath} ${autoDownloadModelName}`);
                        console.log('[Nodejs-whisper] Attempting to compile model...\n');
                        shelljs_1.default.cd('../');
                        shelljs_1.default.exec('make');
                        resolve('Model Downloaded Successfully');
                    }
                });
            }
        }
        catch (error) {
            console.log('[Nodejs-whisper] Error Caught in downloadModel\n');
            console.log(error);
            shelljs_1.default.cd(projectDir);
            return error;
        }
    });
}
exports.default = autoDownloadModel;
//# sourceMappingURL=autoDownloadModel.js.map