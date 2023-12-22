import protobuf$1 from 'protobufjs';

type OptionType = {
    isDefinition?: boolean | undefined;
    isJsdoc?: boolean | undefined;
    inputDir?: string | undefined;
    outputDir?: string | undefined;
};

/**
 *
 * @param {string} source
 * @returns
 */
declare function getAllMethods(source: string): {
    [k: string]: protobuf.Method;
} | null;
/**
 *
 * @param {string} source
 * @param {string} methodName
 * @returns
 */
declare function mockResponse(source: string, methodName: string): Object | null;

/**
 * parse protobuf text plain
 * @param {string} source
 * @param {import('./typedef.js').OptionType=} _options
 * @returns
 */
declare function parseProto(source: string, _options?: OptionType | undefined): string;
/**
 * parse protobuf root object
 * @param {protobuf.Root} root
 * @param {import('./typedef.js').OptionType} options
 * @param {string=} packageName
 * @returns {string}
 */
declare function parseProtoRoot(root: protobuf$1.Root, options: OptionType, packageName?: string | undefined): string;
/**
 * @param {string[]} files
 * @param {import('./typedef.js').OptionType} options
 * @returns
 */
declare function parseProtoFiles(files: string[], options: OptionType): Map<any, any> | undefined;

/**
 * @param {{ input: string, output: string }} params
 */
declare function convertCommand(params: {
    input: string;
    output: string;
}): Promise<void>;

export { convertCommand, getAllMethods, mockResponse, parseProto, parseProtoFiles, parseProtoRoot };
