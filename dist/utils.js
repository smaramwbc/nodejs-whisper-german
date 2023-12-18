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
exports.convertToWavType = exports.checkIfFileExists = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const shelljs_1 = __importDefault(require("shelljs"));
const ffmpeg_static_1 = __importDefault(require("ffmpeg-static"));
const checkIfFileExists = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = fs_1.default.existsSync(filePath);
    if (!isExist) {
        console.error(`[Nodejs-whisper] Error: No such file : ${filePath}\n`);
        process.exit(1);
    }
});
exports.checkIfFileExists = checkIfFileExists;
const convertToWavType = (inputFilePath) => __awaiter(void 0, void 0, void 0, function* () {
    const fileExtension = inputFilePath.split('.').pop();
    const outputFilePath = path_1.default.join(path_1.default.dirname(inputFilePath), path_1.default.basename(inputFilePath, path_1.default.extname(inputFilePath)));
    if (fileExtension !== 'wav') {
        console.log('[Nodejs-whisper]  Converting audio to wav File Type...\n');
        const command = `${ffmpeg_static_1.default} -nostats -loglevel 0 -i ${inputFilePath} -ar 16000 -ac 1 -c:a pcm_s16le  ${outputFilePath}.wav`;
        shelljs_1.default.exec(command);
        return `${outputFilePath}.wav`;
    }
    else {
        return inputFilePath;
    }
});
exports.convertToWavType = convertToWavType;
//# sourceMappingURL=utils.js.map