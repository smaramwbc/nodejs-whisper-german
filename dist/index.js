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
exports.nodewhisper = void 0;
const whisper_1 = require("./whisper");
const WhisperHelper_1 = require("./WhisperHelper");
const utils_1 = require("./utils");
const autoDownloadModel_1 = __importDefault(require("./autoDownloadModel"));
function nodewhisper(filePath, options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (options.autoDownloadModelName) {
            yield (0, autoDownloadModel_1.default)(options.autoDownloadModelName);
        }
        (0, utils_1.checkIfFileExists)(filePath);
        const outputFilePath = yield (0, utils_1.convertToWavType)(filePath);
        (0, utils_1.checkIfFileExists)(outputFilePath);
        const command = (0, WhisperHelper_1.constructCommand)(outputFilePath, options);
        console.log(`[Nodejs-whisper]  Executing command: ${command}\n`);
        const transcript = yield (0, whisper_1.executeCppCommand)(command);
        if (transcript.length === 0) {
            throw new Error('Something went wrong while executing the command.');
        }
        return transcript;
    });
}
exports.nodewhisper = nodewhisper;
//# sourceMappingURL=index.js.map