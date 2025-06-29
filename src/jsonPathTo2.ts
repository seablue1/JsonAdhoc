// Used from https://github.com/nidu/vscode-copy-json-path

import { pathToStringDot } from "./jsonPathTo";

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

// 搜索条件类型枚举
export enum SearchType {
  KeyOrValueContain = 'keyOrValueContain',
  JsonPath = 'jsonPath',
  ValueContain = 'valueContain',
  KeyContain = 'keyContain',
  ValueEqual = 'valueEqual',
  KeyEqual = 'keyEqual'
}

// 搜索条件接口
interface SearchCondition {
  type: SearchType;
  value: string;
}

const isPathMatching = (stack: Frame[], searchConditions: SearchCondition[]): boolean => {
  return searchConditions.some(condition => {
    if (condition.type === SearchType.JsonPath) {
      const currentPath = pathToStringDot(stack);
      const pathPattern = condition.value
        .replace(/\[\:\]/g, '[\\d+]')
        .replace(/\./g, '\\.')
        .replace(/\[/g, '\\[')
        .replace(/\]/g, '\\]');
      const regex = new RegExp(pathPattern);
      return regex.test(`^${currentPath}$`);
    }
    return false;
  });
};

const isKeyValueMatching = (key: string, value: any, searchConditions: SearchCondition[]): boolean => {
  return searchConditions.some(condition => {
    const valueStr = value != null ? String(value) : '';
    switch (condition.type) {
      case SearchType.KeyOrValueContain:
        return key.toLowerCase().includes(condition.value.toLowerCase()) ||
               valueStr.toLowerCase().includes(condition.value.toLowerCase());
      case SearchType.KeyContain:
        return key.toLowerCase().includes(condition.value.toLowerCase());
      case SearchType.ValueContain:
        return valueStr.toLowerCase().includes(condition.value.toLowerCase());
      case SearchType.KeyEqual:
        return key.toLowerCase() === condition.value.toLowerCase();
      case SearchType.ValueEqual:
        return valueStr.toLowerCase() === condition.value.toLowerCase();
    }
    return false;
  });
};

const mapPath = (map: Map<string, string>, selfStack: Frame[], stack: Frame[]) => {
  map.set(pathToStringDot(selfStack), pathToStringDot(stack));
};

export const traveljson = (
  obj: any, 
  searchConditions: SearchCondition[], 
  stack: Frame[] = [], 
  map: Map<string, string> = new Map(), 
  selfStack: Frame[] = [],
  currentKey?: string
): any => {
  if (obj == null) return;

  // 分支1: 处理基本数据类型且有currentKey的情况
  if (currentKey !== undefined && typeof obj !== 'object') {
    // 这个分支会在以下情况走到：
    // 1. 当前值不是对象或数组，而是字符串、数字等基本类型
    // 2. 且调用时传入了currentKey参数
    // 这通常发生在处理对象的属性值为基本类型时
    stack.push({ colType: ColType.Object, key: currentKey });
    selfStack.push({ colType: ColType.Object, key: currentKey });

    const pathMatch = isPathMatching(stack, searchConditions);
    const keyMatch = isKeyValueMatching(currentKey, String(obj), searchConditions);

    if (pathMatch || keyMatch) {
      mapPath(map, selfStack, stack);
      stack.pop();
      selfStack.pop();
      return obj;
    }

    stack.pop();
    selfStack.pop();
    return undefined;
  }

  // 分支2: 处理数组的情况
  if (Array.isArray(obj)) {
    const arrayPathMatch = isPathMatching(stack, searchConditions);
    if (arrayPathMatch) {
      // 这个分支会在以下情况走到：
      // 当整个数组的路径与搜索条件匹配时
      // 例如，如果搜索条件是jsonPath: "root.array"，而当前正好处理到这个路径的数组
      mapPath(map, selfStack, stack);
      return obj;
    }

    const frame = { colType: ColType.Array, index: undefined };
    stack.push(frame);
    const result = [];

    for (let i = 0; i < obj.length; i++) {
      frame.index = i;
      selfStack.push({ colType: ColType.Array, index: result.length });

      const elementPathMatch = isPathMatching(stack, searchConditions);
      const sub = traveljson(obj[i], searchConditions, stack, map, selfStack);

      if (elementPathMatch || sub !== undefined) {
        result.push(elementPathMatch ? obj[i] : sub);
        mapPath(map, selfStack, stack);
      }

      selfStack.pop();
    }

    stack.pop();
    return result.length ? result : undefined;
  } 
  // 分支3: 处理对象的情况
  else if (typeof obj === 'object') {
    const result = {};
    let hasMatch = false;

    const objectPathMatch = isPathMatching(stack, searchConditions);

    if (objectPathMatch) {
      // 这个分支会在以下情况走到：
      // 当整个对象的路径与搜索条件匹配时
      // 例如，如果搜索条件是jsonPath: "root.obj"，而当前正好处理到这个路径的对象
      mapPath(map, selfStack, stack);
      return obj;
    }

    for (const key in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

      const val = obj[key];

      if (typeof val === 'object' && val !== null) {
        stack.push({ colType: ColType.Object, key });
        selfStack.push({ colType: ColType.Object, key });

        const sub = traveljson(val, searchConditions, stack, map, selfStack);
        if (sub !== undefined) {
          result[key] = sub;
          hasMatch = true;
          mapPath(map, selfStack, stack);
        } else if (isKeyValueMatching(key, val, searchConditions)) {
          result[key] = val;
          hasMatch = true;
          mapPath(map, selfStack, stack);
        }

        stack.pop();
        selfStack.pop();
      } else {
        const matchedValue = traveljson(val, searchConditions, stack, map, selfStack, key);
        if (matchedValue !== undefined) {
          result[key] = matchedValue;
          hasMatch = true;
        }
      }
    }

    return hasMatch ? result : undefined;
  } 
  // 分支4: 处理顶层基本类型的情况
  else {
    // 这个分支会在以下情况走到：
    // 1. 值是基本类型(字符串、数字等)
    // 2. 且没有提供currentKey
    // 这通常是处理顶层值为基本类型时，或者是在数组遍历时遇到的基本类型元素
    return isKeyValueMatching('', obj, searchConditions) ? obj : undefined;
  }
};
