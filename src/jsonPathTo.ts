// Used from https://github.com/nidu/vscode-copy-json-path


enum ColType {
  Object, // eslint-disable-line @typescript-eslint/naming-convention
  Array, // eslint-disable-line @typescript-eslint/naming-convention
}

interface Frame {
  colType: ColType;
  index?: number;
  key?: string;
}

export interface JsonFrame {
  key?: string;
  index?: number;
  path?: string;
  startLine?: number;
  endLine?: number;
  List?: JsonFrame[];
}




// 计算行号位置
function calculateLineBreaks(jsonString) {
  const lineBreaks = [];
  for (let i = 0; i < jsonString.length; i++) {
    if (jsonString[i] === '\n') {
      lineBreaks.push(i);
    }
  }
  return lineBreaks;
}

// 获取行号
function getLineNumber(position, lineBreaks) {
  let line = 1; // 行号从1开始
  for (const breakPos of lineBreaks) {
    if (position > breakPos) {
      line++;
    } else {
      break;
    }
  }
  return line;
}

// 跳过空白字符
function skipWhitespace(jsonString, position) {
  let char = jsonString[position];
  while (char === ' ' || char === '\n' || char === '\r' || char === '\t') {
    position++;
    char = jsonString[position];
  }
  return position;
}

// 提取键名
function extractKey(path) {
  if (!path) return undefined;

  const parts = path.split('.');
  const lastPart = parts[parts.length - 1];
  // 处理可能的数组路径，如 "items[0]"
  const keyMatch = lastPart.match(/^([^\[]+)/);
  return keyMatch ? keyMatch[1] : lastPart;
}

// 解析字符串
function parseString(jsonString, position) {
  let result = '';
  position++; // 跳过开头的引号
  let char = jsonString[position];

  while (char !== '"') {
    // 处理转义字符
    if (char === '\\') {
      position++;
      char = jsonString[position];
    }
    result += char;
    position++;
    char = jsonString[position];
  }

  position++; // 跳过结尾的引号

  return { value: result, position };
}

// 解析数字
function parseNumber(jsonString, position) {
  let start = position;
  let char = jsonString[position];

  while ((char >= '0' && char <= '9') || char === '.' || char === '-' || char === 'e' || char === 'E' || char === '+') {
    position++;
    char = jsonString[position];
  }

  return { value: parseFloat(jsonString.substring(start, position)), position };
}

// 解析布尔值或null
function parseLiteral(jsonString, position) {
  const char = jsonString[position];
  let value;

  if (char === 't') {
    // true
    position += 4;
    value = true;
  } else if (char === 'f') {
    // false
    position += 5;
    value = false;
  } else if (char === 'n') {
    // null
    position += 4;
    value = null;
  }

  return { value, position };
}

// 解析数组
function parseArray(jsonString, position, path, lineBreaks) {
  const startPos = position;
  const startLine = getLineNumber(startPos, lineBreaks);
  position++; // 跳过开头的 [

  const elements = [];
  const frame: JsonFrame = {
    path,
    startLine,
    List: []
  };

  position = skipWhitespace(jsonString, position);
  let char = jsonString[position];

  let index = 0;
  while (char !== ']') {
    const elementPath = `${path}[${index}]`;
    const result = parseValue(jsonString, position, elementPath, lineBreaks, index);

    position = result.position;
    elements.push(result.value);
    if (frame.List) {
      frame.List.push(result.frame);
    }

    position = skipWhitespace(jsonString, position);
    char = jsonString[position];

    // 检查是否有逗号
    if (char === ',') {
      position++;
      position = skipWhitespace(jsonString, position);
      char = jsonString[position];
    }

    index++;
  }

  position++; // 跳过结尾的 ]

  const endPos = position - 1;
  const endLine = getLineNumber(endPos, lineBreaks);
  frame.endLine = endLine;

  return { value: elements, frame, position };
}

// 解析对象
function parseObject(jsonString, position, path, lineBreaks) {
  const startPos = position;
  const startLine = getLineNumber(startPos, lineBreaks);
  position++; // 跳过开头的 {

  const obj = {};
  const frame: JsonFrame = {
    path,
    startLine,
    List: []
  };

  position = skipWhitespace(jsonString, position);
  let char = jsonString[position];

  while (char !== '}') {
    // 解析键
    const keyResult = parseString(jsonString, position);
    const key = keyResult.value;
    position = keyResult.position;

    position = skipWhitespace(jsonString, position);

    // 跳过冒号
    position++; // 跳过 :
    position = skipWhitespace(jsonString, position);

    // 解析值
    const childPath = path ? `${path}.${key}` : key;
    const valueResult = parseValue(jsonString, position, childPath, lineBreaks);

    position = valueResult.position;
    obj[key] = valueResult.value;
    if (frame.List) {
      frame.List.push(valueResult.frame);
    }

    position = skipWhitespace(jsonString, position);
    char = jsonString[position];

    // 检查是否有逗号
    if (char === ',') {
      position++;
      position = skipWhitespace(jsonString, position);
      char = jsonString[position];
    }
  }

  position++; // 跳过结尾的 }

  const endPos = position - 1;
  const endLine = getLineNumber(endPos, lineBreaks);
  frame.endLine = endLine;

  return { value: obj, frame, position };
}

// 解析值
function parseValue(jsonString, position, path, lineBreaks, index?) {
  position = skipWhitespace(jsonString, position);

  const startPos = position;
  const startLine = getLineNumber(startPos, lineBreaks);
  const char = jsonString[position];

  // 创建基本框架
  let frame: JsonFrame = {
    path,
    startLine
  };

  // 设置索引或键
  if (index !== undefined) {
    frame.index = index;
  } else if (path) {
    frame.key = extractKey(path);
  }

  let value;
  let result;

  // 根据当前字符决定解析类型
  if (char === '{') {
    result = parseObject(jsonString, position, path, lineBreaks);
    value = result.value;
    frame = result.frame;
    position = result.position;
  } else if (char === '[') {
    result = parseArray(jsonString, position, path, lineBreaks);
    value = result.value;
    frame = result.frame;
    position = result.position;
  } else if (char === '"') {
    result = parseString(jsonString, position);
    value = result.value;
    position = result.position;
    frame.endLine = getLineNumber(position - 1, lineBreaks);
  } else if (char === 't' || char === 'f' || char === 'n') {
    result = parseLiteral(jsonString, position);
    value = result.value;
    position = result.position;
    frame.endLine = getLineNumber(position - 1, lineBreaks);
  } else {
    result = parseNumber(jsonString, position);
    value = result.value;
    position = result.position;
    frame.endLine = getLineNumber(position - 1, lineBreaks);
  }

  if (index !== undefined) {
    frame.index = index;
  }
  return { value, frame, position };
}

// 解析JSON字符串主函数
export function parseJsonStructure(jsonString) {
  const lineBreaks = calculateLineBreaks(jsonString);
  const position = skipWhitespace(jsonString, 0);
  const result = parseValue(jsonString, position, "", lineBreaks);

  return result.frame;
}






export const traveljson = (obj: any, keyList: string[], stack: Frame[], map: Map<string, string>, selfStack: Frame[]) => {
  let match = false

  if (Array.isArray(obj)) {
    const frame = { colType: ColType.Array, index: 0 }
    stack.push(frame);

    const copyList = []

    for (let i = 0; i < obj.length; i++) {
      selfStack.push({ colType: ColType.Array, index: copyList.length });
      frame.index = i;

      const subMatch = traveljson(obj[i], keyList, stack, map, selfStack)
      if (subMatch) {
        match = true
        copyList.push(subMatch)
        map.set(pathToStringDot(selfStack), pathToStringDot(stack));
      }
      selfStack.pop();
    }

    stack.pop();
    return match ? copyList : undefined
  } else if (typeof obj === 'object') {
    const copyObj = {}

    for (let key in obj) {

      if (typeof obj[key] === 'object') {
        stack.push({ colType: ColType.Object, key });
        selfStack.push({ colType: ColType.Object, key });
        const subMatch = traveljson(obj[key], keyList, stack, map, selfStack)
        if (subMatch) {
          copyObj[key] = subMatch
          match = true
          map.set(pathToStringDot(selfStack), pathToStringDot(stack));
        }
        stack.pop();
        selfStack.pop();
      } else if (keyList.find(i => key.toLowerCase().includes(i.toLowerCase()))) {
        copyObj[key] = obj[key]
        match = true
        map.set(pathToStringDot(selfStack), pathToStringDot(stack));

      } else if (keyList.find(i => obj[key].toString().toLowerCase().includes(i.toLowerCase()))) {
        copyObj[key] = obj[key]
        match = true
        map.set(pathToStringDot(selfStack), pathToStringDot(stack));
      }

    }
    return match ? copyObj : undefined
  } else {
    if (keyList.find(i => obj.toString().toLowerCase().includes(i.toLowerCase()))) {
      return obj
    }
  }

}

export const parseJsonPath = (jsonPath: string): Frame[] => {
  const frames: Frame[] = [];
  const regex = /(?:\.?([^[.\]]+))|(?:\["([^"]+)"\])|(?:\[(\d+)\])/g;
  let match;

  while ((match = regex.exec(jsonPath)) !== null) {
    if (match[1]) {
      // 匹配对象键（不带引号）
      frames.push({ colType: ColType.Object, key: match[1] });
    } else if (match[2]) {
      // 匹配对象键（带引号）
      frames.push({ colType: ColType.Object, key: match[2] });
    } else if (match[3]) {
      // 匹配数组索引
      frames.push({ colType: ColType.Array, index: parseInt(match[3], 10) });
    }
  }

  return frames;
};



export function jsonPathPos(text: string, path: string) {
  let pos = 0;
  let stack: Frame[] = [];
  let isInKey = false;
  let isToNextItem = false;
  let frame1 = parseJsonPath(path);

  if (frame1.length === 0) {
    return -1;
  }

  while (pos < text.length) {
    const startPos = pos;
    switch (text[pos]) {
      case '"':
        const { text: s, pos: newPos } = readString(text, pos);
        if (stack.length) {
          const frame = stack[stack.length - 1];
          if (frame.colType === ColType.Object && isInKey) {
            frame.key = s;
            isInKey = false;
          }
        }
        pos = newPos;
        break;
      case "{":
        const frame = stack[stack.length - 1];
        stack.push({ colType: ColType.Object });
        isInKey = true;
        break;
      case "[":
        stack.push({ colType: ColType.Array, index: 0 });
        break;
      case "]":
        stack.pop();
        break;
      case "}":
        stack.pop();
        break;
      case ",":
        if (stack.length) {
          const frame = stack[stack.length - 1];
          if (frame) {
            if (frame.colType === ColType.Object) {
              isInKey = true;
            } else if (frame.index !== undefined) {
              frame.index++
            }
          }
        }
        break;
    }

    if (stack.length === frame1.length) {
      let match = true;
      for (let i = 0; i < frame1.length; i++) {
        if (frame1[i].colType !== stack[i].colType) {
          match = false;
          break;
        }
        if (frame1[i].colType === ColType.Object) {
          if (frame1[i].key !== stack[i].key) {
            match = false;
            break;
          }
        } else {
          if (frame1[i].index !== stack[i].index) {
            match = false;
            break;
          }
        }
      }
      if (match) {
        return pos;
      }
    }
    if (pos === startPos) {
      pos++;
    }
  }
  return -1;
}


export function jsonPathTo(text: string, offset: number, separatorType: string) {
  let pos = 0;
  let stack: Frame[] = [];
  let isInKey = false;

  while (pos < offset) {
    const startPos = pos;
    switch (text[pos]) {
      case '"':
        const { text: s, pos: newPos } = readString(text, pos);
        if (stack.length) {
          const frame = stack[stack.length - 1];
          if (frame.colType === ColType.Object && isInKey) {
            frame.key = s;
            isInKey = false;
          }
        }
        pos = newPos;
        break;
      case "{":
        stack.push({ colType: ColType.Object });
        isInKey = true;
        break;
      case "[":
        stack.push({ colType: ColType.Array, index: 0 });
        break;
      case "]":
        stack.pop();
        break;
      case "}":
        stack.pop();
        break;
      case ",":
        if (stack.length) {
          const frame = stack[stack.length - 1];
          if (frame) {
            if (frame.colType === ColType.Object) {
              isInKey = true;
            } else if (frame.index !== undefined) {
              frame.index++;
            }
          }
        }
        break;
    }
    if (pos === startPos) {
      pos++;
    }
  }

  if (separatorType === "dots") {
    return pathToStringDot(stack);
  } else if (separatorType === "indexes") {
    return pathToStringIndexes(stack);
  } else {
    return '';
  }
}

export function pathToStringDot(path: Frame[]): string {
  let s = "";
  for (const frame of path) {
    if (frame.colType === ColType.Object) {
      if (frame.key) {
        if (!frame.key.match(/^[a-zA-Z$#@&%~\-_][a-zA-Z\d$#@&%~\-_]*$/)) {
          s += `["${frame.key}"]`;
        } else {
          if (s.length) {
            s += ".";
          }
          s += frame.key;
        }
      }
    } else {
      if (frame.index != undefined) {
        s += `[${frame.index}]`;
      }
    }
  }
  return s;
}

function pathToStringIndexes(path: Frame[]): string {
  let s = "";
  for (const frame of path) {
    if (frame.colType === ColType.Object) {
      if (frame.key) {
        if (!frame.key.match(/^[a-zA-Z$#@&%~\-_][a-zA-Z\d$#@&%~\-_]*$/)) {
          s += `["${frame.key}"]`;
        } else {
          s += '["' + frame.key + '"]';
        }
      }
    } else {
      s += `[${frame.index}]`;
    }
  }
  return s;
}

function readString(text: string, pos: number): { text: string; pos: number } {
  let i = findEndQuote(text, pos + 1);
  var textPos = {
    text: text.substring(pos + 1, i),
    pos: i + 1,
  };

  return textPos;
}

// Find the next end quote
function findEndQuote(text: string, i: number) {
  while (i < text.length) {
    // Handle backtracking to find if this quote is escaped
    if (text[i] === "\\") {
      i += 2;
      continue;
    }

    if (text[i] === '"') {
      break;
    }
    i++;
  }

  return i;
}
