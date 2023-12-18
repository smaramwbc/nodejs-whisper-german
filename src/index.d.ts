export interface WhisperOptions {
	outputInText?: boolean
	outputInVtt?: boolean
	outputInSrt?: boolean
	outputInCsv?: boolean
	translateToEnglish?: boolean
	timestamps_length?: number
	wordTimestamps?: boolean
	splitOnWord?: boolean
	language?: string
}

export interface IOptions {
	modelName: string
	whisperOptions?: WhisperOptions
}

export declare function nodewhisper(filePath: string, options: IOptions): Promise<string>
