import { IType, IField, IMapField } from 'protobufjs';
import { OptionType } from './interface';

const TYPES: {
  [key: string]: string;
} = {
  double: 'number',
  float: 'number',
  int32: 'number',
  int64: 'string',
  uint32: 'number',
  uint64: 'string',
  sint32: 'number',
  sint64: 'string',
  fixed32: 'number',
  fixed64: 'string',
  sfixed32: 'number',
  sfixed64: 'string',
  bool: 'boolean',
  string: 'string',
  bytes: 'string'
};

function getKeyType(p: Partial<IMapField>) {
  if (p.keyType) {
    return TYPES[p.keyType] || p.keyType;
  }
  return '';
}

function readField(
  name: string,
  content: {
    [k: string]: IField;
  }
) {
  const params = Object.keys(content).map(paramName => {
    const paramValue = content[paramName];

    return {
      type: TYPES[paramValue.type] || paramValue.type,
      keyType: getKeyType(paramValue),
      name: paramName,
      rule: paramValue.rule,
      id: paramValue.id
    };
  });

  return {
    category: 'fields',
    name: name,
    params: params.sort((a, b) => a.id - b.id)
  };
}

export function printField(
  name: string,
  fieldParams: IType,
  options: OptionType
) {
  const content = fieldParams.fields;

  const item = readField(name, content);

  const strs = item.params.map(param => {
    if (param.rule === 'repeated') {
      return `  ${param.name}?: ${param.type}[];\n`;
    }
    if (param.keyType) {
      return `  ${param.name}?: {[key: ${param.keyType}]: ${param.type}};\n`;
    }
    return `  ${param.name}?: ${param.type};\n`;
  });

  // if (fieldParams.nested) {
  //   Object.keys(fieldParams.nested).forEach(key => {
  //     strs.push(`  ${key}: ${key};\n`);
  //   });
  // }
  const prefix = options.isDefinition ? '' : 'export ';

  return `${prefix}interface ${item.name} {\n${strs.join('')}}\n\n`;
}
