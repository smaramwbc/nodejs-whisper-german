"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructCommand = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const constants_1 = require("./constants");
const constructCommand = (filePath, args) => {
    if ((args === null || args === void 0 ? void 0 : args.modelName) == undefined) {
        throw new Error('[Nodejs-whisper] Error: Provide model name');
    }
    const isValidModelName = constants_1.MODELS_LIST.findIndex(model => model == args.modelName);
    if (isValidModelName == -1) {
        console.log('[Nodejs-whisper] Error: Enter a valid model name');
        console.log('[Nodejs-whisper] Available models are:\n', constants_1.MODELS_LIST);
        process.exit(1);
    }
    let anyModelExist = [];
    constants_1.MODELS.forEach(model => {
        if (!fs_1.default.existsSync(path_1.default.join(__dirname, '..', 'cpp', 'whisper.cpp', 'models', constants_1.MODEL_OBJECT[args === null || args === void 0 ? void 0 : args.modelName]))) {
        }
        else {
            anyModelExist.push(model);
        }
    });
    if (anyModelExist.length == 0) {
        console.log('[Nodejs-whisper] Error: Models do not exist. Please Select a downloaded model.\n');
        throw new Error('[Nodejs-whisper] Error: Model not found');
    }
    const modelName = constants_1.MODEL_OBJECT[args.modelName];
    if (constants_1.MODELS_LIST.indexOf(args === null || args === void 0 ? void 0 : args.modelName) === -1) {
        throw new Error('[Nodejs-whisper] Error: Model not found');
    }
    let command = `./main  ${constructOptionsFlags(args)} -l auto -m ./models/${modelName}  -f ${filePath}  `;
    return command;
};
exports.constructCommand = constructCommand;
const constructOptionsFlags = (args) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    let flag = '';
    if ((_a = args === null || args === void 0 ? void 0 : args.whisperOptions) === null || _a === void 0 ? void 0 : _a.outputInText) {
        flag += `-otxt `;
    }
    if ((_b = args === null || args === void 0 ? void 0 : args.whisperOptions) === null || _b === void 0 ? void 0 : _b.outputInVtt) {
        flag += `-ovtt `;
    }
    if ((_c = args === null || args === void 0 ? void 0 : args.whisperOptions) === null || _c === void 0 ? void 0 : _c.outputInSrt) {
        flag += `-osrt `;
    }
    if ((_d = args === null || args === void 0 ? void 0 : args.whisperOptions) === null || _d === void 0 ? void 0 : _d.outputInCsv) {
        flag += `-ocsv `;
    }
    if ((_e = args === null || args === void 0 ? void 0 : args.whisperOptions) === null || _e === void 0 ? void 0 : _e.translateToEnglish) {
        flag += `-tr `;
    }
    if ((_f = args === null || args === void 0 ? void 0 : args.whisperOptions) === null || _f === void 0 ? void 0 : _f.wordTimestamps) {
        flag += `-ml 1 `;
    }
    if ((_g = args === null || args === void 0 ? void 0 : args.whisperOptions) === null || _g === void 0 ? void 0 : _g.timestamps_length) {
        flag += `-ml ${args.whisperOptions.timestamps_length} `;
    }
    if ((_h = args === null || args === void 0 ? void 0 : args.whisperOptions) === null || _h === void 0 ? void 0 : _h.splitOnWord) {
        flag += `-sow true `;
    }
    if ((_j = args === null || args === void 0 ? void 0 : args.whisperOptions) === null || _j === void 0 ? void 0 : _j.language) {
        flag += `-l ${args.whisperOptions.language}`;
    }
    return flag;
};
//# sourceMappingURL=WhisperHelper.js.map