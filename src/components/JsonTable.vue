<template>
  <div ref="container" class="json-grid-container"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  data: {
    type: [Object, Array],
    required: true
  },
  selectedPath: {
    type: Array,
    default: () => []
  },
  selectionMode: {
    type: String,
    default: 'single'
  }
});

const emit = defineEmits(['node-select', 'node-deselect']);
const container = ref(null);

// 常量定义
const CSS = {
  EXPANDER: 'expander',
  SHRINKED: 'shrinked',
  CONTAINER: 'json-grid-container',
  TABLE: 'table',
  SELECTED: 'selected-node',
  PATH_NODE: 'path-node',
  TYPES: {
    NULL: 'null',
    STRING: 'string',
    NUMBER: 'number',
    BOOLEAN: 'boolean',
    OBJECT: 'object'
  }
};

const ATTR = {
  TARGET_ID: 'data-target-id',
  PATH: 'data-path',
  PARENT_ID: 'data-parent-id'
};

// 实例计数器用于生成唯一ID
let instanceCounter = 0;

// DOM 和渲染助手
class Helper {
  // 创建DOM元素
  static createElement(type, className = '', id = null) {
    const element = document.createElement(type);
    if (className) {
      element.className = Array.isArray(className) ? className.join(' ') : className;
    }
    if (id) element.id = id;
    return element;
  }

  // 为元素添加路径和父节点引用
  static setupElement(element, path = null, parentId = null) {
    if (!element.id) {
      element.id = `node-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    }

    if (path) element.setAttribute(ATTR.PATH, JSON.stringify(path));
    if (parentId) element.setAttribute(ATTR.PARENT_ID, parentId);

    return element;
  }

  // 创建可选择的节点
  static makeSelectable(element, path, onSelect) {
    if (path) {
      element.onclick = (e) => {
        e.stopPropagation();

        // 移除所有选中样式，但仅限于当前容器内
        const containerElement = element.closest(`.${CSS.CONTAINER}`);
        if (containerElement) {
          containerElement.querySelectorAll(`.${CSS.SELECTED}, .${CSS.PATH_NODE}`).forEach(el => {
            el.classList.remove(CSS.SELECTED);
            el.classList.remove(CSS.PATH_NODE);
          });
        }

        // // 添加选中样式
        element.classList.add(CSS.SELECTED);

        // // 高亮父节点路径
        // let current = element;
        // while (current && current.getAttribute(ATTR.PARENT_ID)) {
        //   const parentId = current.getAttribute(ATTR.PARENT_ID);
        //   const parent = document.getElementById(parentId);
        //   if (parent) {
        //     parent.classList.add(CSS.PATH_NODE);
        //     current = parent;
        //   } else break;
        // }

        // 展开父级表格
        current = element;
        while (current && current.parentElement) {
          current = current.parentElement;
          const collapsedTable = current.closest(`.${CSS.TABLE}.${CSS.SHRINKED}`);
          if (collapsedTable) {
            const expander = document.querySelector(`span.${CSS.EXPANDER}[${ATTR.TARGET_ID}='${collapsedTable.id}']`);
            if (expander) expander.click();
          }
        }

        // 触发选择事件
        if (onSelect) onSelect(path);
      };
    }
    return element;
  }

  // 创建展开/折叠控件
  static createExpander(itemCount, targetId) {
    const expander = this.createElement('span', CSS.EXPANDER);
    expander.textContent = `[+] ${itemCount} items`;
    expander.setAttribute(ATTR.TARGET_ID, targetId);

    expander.onclick = (e) => {
      const target = document.getElementById(targetId);
      if (target) {
        target.classList.toggle(CSS.SHRINKED);
        const isExpanded = !target.classList.contains(CSS.SHRINKED);
        e.target.textContent = `[${isExpanded ? '-' : '+'}] ${itemCount} items`;
      }
    };

    return expander;
  }
}

// JSON渲染器类
class JsonRenderer {
  constructor(data, container, selectedPath = [], onSelect = null) {
    this.data = data;
    this.container = container;
    this.instanceId = instanceCounter++;
    this.selectedPath = selectedPath;
    this.onSelect = onSelect;
  }

  // 渲染JSON
  render() {
    if (!this.container || this.data === undefined) return;

    try {
      this.container.innerHTML = '';
      this.container.appendChild(this.generateDOM());
    } catch (error) {
      console.error('Error rendering JSON:', error);
      this.container.innerHTML = `<div class="json-error">Error: ${error.message}</div>`;
    }
  }

  // 路径是否匹配
  isPathMatch(path1, path2) {
    if (!path1 || !path2) return false;
    if (path1.length !== path2.length) return false;
    return JSON.stringify(path1) === JSON.stringify(path2);
  }

  // 生成DOM结构
  generateDOM(currentPath = [], parentId = null) {
    // 处理null值
    if (this.data === null) {
      const span = Helper.createElement('span', CSS.TYPES.NULL);
      span.textContent = 'null';

      if (this.isPathMatch(currentPath, this.selectedPath)) {
        span.classList.add(CSS.SELECTED);
      }

      Helper.setupElement(span, currentPath, parentId);
      return Helper.makeSelectable(span, currentPath, this.onSelect);
    }

    // 处理基本类型
    if (typeof this.data !== 'object') {
      const type = typeof this.data;
      const span = Helper.createElement('span', type);
      span.textContent = String(this.data);

      if (this.isPathMatch(currentPath, this.selectedPath)) {
        span.classList.add(CSS.SELECTED);
      }

      Helper.setupElement(span, currentPath, parentId);
      return Helper.makeSelectable(span, currentPath, this.onSelect);
    }

    // 处理对象或数组
    const container = Helper.createElement('div');
    Helper.setupElement(container, currentPath, parentId);

    const tableId = `table-${this.instanceId}-${Date.now()}`;
    const table = Helper.createElement('table', [CSS.TABLE, this.instanceId !== 0 ? CSS.SHRINKED : ''], tableId);
    Helper.setupElement(table, currentPath, container.id);

    const tbody = Helper.createElement('tbody');
    table.appendChild(tbody);

    // 添加展开/折叠控件
    const keys = Array.isArray(this.data) ? this.data : Object.keys(this.data);
    if (keys.length > 0) {
      const expander = Helper.createExpander(keys.length, tableId);
      container.appendChild(expander);
    }

    // 根据类型处理数据
    const content = Array.isArray(this.data) ?
      this.renderArray(currentPath, table.id) :
      this.renderObject(currentPath, table.id);

    // 添加内容
    if (content.headers?.length) {
      content.headers.forEach(header => tbody.appendChild(header));
    }

    if (content.rows?.length) {
      content.rows.forEach(row => tbody.appendChild(row));
    }

    container.appendChild(table);
    return container;
  }

  // 渲染数组
  renderArray(parentPath = [], parentId = null) {
    if (this.data.length === 0) {
      const row = Helper.createElement('tr');
      const emptyTd = Helper.createElement('td');
      emptyTd.textContent = '[ ]';
      emptyTd.colSpan = 2;
      row.appendChild(emptyTd);
      return { rows: [row] };
    }

    // 检测是简单类型数组还是对象数组
    const hasObjects = this.data.some(item => item && typeof item === 'object');
    const objectKeys = hasObjects ?
      [...new Set(this.data
        .filter(item => item && typeof item === 'object')
        .flatMap(item => Object.keys(item)))] : [];

    if (objectKeys.length === 0) {
      return this.renderSimpleArray(parentPath, parentId);
    } else {
      return this.renderObjectArray(objectKeys, parentPath, parentId);
    }
  }

  // 渲染简单类型数组
  renderSimpleArray(parentPath = [], parentId = null) {
    // 创建表头
    const header = Helper.createElement('tr');

    const indexHeader = Helper.createElement('th');
    indexHeader.textContent = 'Index';
    header.appendChild(indexHeader);

    const valueHeader = Helper.createElement('th');
    valueHeader.textContent = 'Value';
    header.appendChild(valueHeader);

    // 创建行数据
    const rows = this.data.map((item, index) => {
      const tr = Helper.createElement('tr');
      const currentPath = [...parentPath, index];
      Helper.setupElement(tr, currentPath, parentId);

      // 索引单元格
      const indexTd = Helper.createElement('td');
      indexTd.textContent = index;
      tr.appendChild(indexTd);

      // 值单元格
      const valueTd = Helper.createElement('td');
      Helper.setupElement(valueTd, currentPath, tr.id);

      if (item === null || typeof item !== 'object') {
        const valueType = item === null ? CSS.TYPES.NULL : typeof item;
        const valueSpan = Helper.createElement('span', valueType);
        valueSpan.textContent = item === null ? 'null' : String(item);

        if (this.isPathMatch(currentPath, this.selectedPath)) {
          valueSpan.classList.add(CSS.SELECTED);
        }

        Helper.setupElement(valueSpan, currentPath, valueTd.id);
        Helper.makeSelectable(valueSpan, currentPath, this.onSelect);
        valueTd.appendChild(valueSpan);
      } else {
        // 递归处理嵌套对象
        const childRenderer = new JsonRenderer(item, null, this.selectedPath, this.onSelect);
        valueTd.appendChild(childRenderer.generateDOM(currentPath, valueTd.id));
      }

      tr.appendChild(valueTd);
      return tr;
    });

    return { headers: [header], rows };
  }

  // 渲染对象数组
  renderObjectArray(keys, parentPath = [], parentId = null) {
    // 创建表头
    const header = Helper.createElement('tr');

    const indexHeader = Helper.createElement('th');
    indexHeader.textContent = 'Index';
    header.appendChild(indexHeader);

    keys.forEach(key => {
      const th = Helper.createElement('th');
      th.textContent = key;
      header.appendChild(th);
    });

    // 创建行数据
    const rows = this.data.map((obj, index) => {
      const tr = Helper.createElement('tr');
      const rowPath = [...parentPath, index];
      Helper.setupElement(tr, rowPath, parentId);

      // 索引单元格
      const indexTd = Helper.createElement('td');
      indexTd.textContent = index;
      tr.appendChild(indexTd);

      // 处理null对象
      if (obj == null) {
        const nullTd = Helper.createElement('td', CSS.TYPES.NULL);
        nullTd.colSpan = keys.length;
        nullTd.textContent = 'null';
        tr.appendChild(nullTd);
        return tr;
      }

      // 添加所有列
      keys.forEach(key => {
        const td = Helper.createElement('td');
        const value = obj[key];
        const cellPath = [...rowPath, key];
        Helper.setupElement(td, cellPath, tr.id);

        if (value === null) {
          const nullSpan = Helper.createElement('span', CSS.TYPES.NULL);
          nullSpan.textContent = 'null';

          if (this.isPathMatch(cellPath, this.selectedPath)) {
            nullSpan.classList.add(CSS.SELECTED);
          }

          Helper.setupElement(nullSpan, cellPath, td.id);
          Helper.makeSelectable(nullSpan, cellPath, this.onSelect);
          td.appendChild(nullSpan);
        } else if (value === undefined) {
          td.textContent = '';
        } else if (typeof value === 'object') {
          // 递归处理嵌套对象
          const childRenderer = new JsonRenderer(value, null, this.selectedPath, this.onSelect);
          td.appendChild(childRenderer.generateDOM(cellPath, td.id));
        } else {
          const valueSpan = Helper.createElement('span', typeof value);
          valueSpan.textContent = String(value);

          if (this.isPathMatch(cellPath, this.selectedPath)) {
            valueSpan.classList.add(CSS.SELECTED);
          }

          Helper.setupElement(valueSpan, cellPath, td.id);
          Helper.makeSelectable(valueSpan, cellPath, this.onSelect);
          td.appendChild(valueSpan);
        }

        tr.appendChild(td);
      });

      return tr;
    });

    return { headers: [header], rows };
  }

  // 渲染对象
  renderObject(parentPath = [], parentId = null) {
    const keys = Object.keys(this.data);

    // 处理空对象
    if (keys.length === 0) {
      const row = Helper.createElement('tr');
      const emptyTd = Helper.createElement('td');
      emptyTd.textContent = '{ }';
      emptyTd.colSpan = 2;
      row.appendChild(emptyTd);
      return { rows: [row] };
    }

    // 处理正常对象
    const rows = keys.map(key => {
      const tr = Helper.createElement('tr');
      const currentPath = [...parentPath, key];
      Helper.setupElement(tr, currentPath, parentId);

      // 键单元格
      const keyTd = Helper.createElement('td', 'key-cell');
      const keySpan = Helper.createElement('span');
      keySpan.textContent = key;
      Helper.setupElement(keySpan, currentPath, tr.id);
      keyTd.appendChild(keySpan);
      tr.appendChild(keyTd);

      // 值单元格
      const value = this.data[key];
      const valueTd = Helper.createElement('td');
      Helper.setupElement(valueTd, currentPath, tr.id);

      if (value === null) {
        const nullSpan = Helper.createElement('span', CSS.TYPES.NULL);
        nullSpan.textContent = 'null';

        if (this.isPathMatch(currentPath, this.selectedPath)) {
          nullSpan.classList.add(CSS.SELECTED);
        }

        Helper.setupElement(nullSpan, currentPath, valueTd.id);
        Helper.makeSelectable(nullSpan, currentPath, this.onSelect);
        valueTd.appendChild(nullSpan);
      } else if (typeof value === 'object') {
        // 递归处理嵌套对象
        const childRenderer = new JsonRenderer(value, null, this.selectedPath, this.onSelect);
        valueTd.appendChild(childRenderer.generateDOM(currentPath, valueTd.id));
      } else {
        const valueSpan = Helper.createElement('span', typeof value);
        valueSpan.textContent = String(value);

        if (this.isPathMatch(currentPath, this.selectedPath)) {
          valueSpan.classList.add(CSS.SELECTED);
        }

        Helper.setupElement(valueSpan, currentPath, valueTd.id);
        Helper.makeSelectable(valueSpan, currentPath, this.onSelect);
        valueTd.appendChild(valueSpan);
      }

      tr.appendChild(valueTd);
      return tr;
    });

    return { rows };
  }
}

// 处理节点选择
function handleNodeSelect(path) {
  emit('node-select', path);
}

// 渲染JSON数据
function renderGrid() {
  if (!container.value) return;

  try {
    container.value.innerHTML = '';
    const renderer = new JsonRenderer(props.data, container.value, props.selectedPath, handleNodeSelect);
    renderer.render();
  } catch (error) {
    console.error('Failed to render JSON grid:', error);
    container.value.innerHTML = `<div class="json-error">Error: ${error.message}</div>`;
  }
}

// 组件挂载时渲染
onMounted(renderGrid);

// 监听数据和选择路径变更重新渲染
watch(() => [props.data, props.selectedPath], renderGrid, { deep: true });
</script>

<style>
.json-grid-container {
  font-family: "Roboto Mono", monospace;
  font-size: 12px;
  display: inline-block;
}

.json-grid-container table {
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  border-spacing: 0;
  margin: 5px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.json-grid-container th,
.json-grid-container td {
  text-align: left;
  padding: 2px 8px;
  border: 0.5px solid #e0e0e0;
  vertical-align: top;
}

.json-grid-container th,
.json-grid-container td.key-cell {
  font-weight: 500;
  color: #386eb4;
  background-color: #f5f5f5;
}

.json-grid-container table.shrinked {
  display: none;
}

/* 类型样式 */
.json-grid-container .string {
  color: #a31515;
}

.json-grid-container .number {
  color: #09885a;
}

.json-grid-container .boolean {
  color: #0000ff;
}

.json-grid-container .null {
  color: #808080;
}

/* 展开器样式 */
.json-grid-container .expander {
  cursor: pointer;
  color: #0066cc;
  font-weight: 500;
  padding: 2px 5px;
  user-select: none;
}

.json-grid-container .expander:hover {
  text-decoration: underline;
  background-color: rgba(0, 102, 204, 0.05);
}

/* 选中和路径节点样式 */
.json-grid-container .selected-node {
  background-color: rgba(51, 153, 255, 0.3);
  outline: 1px solid rgba(51, 153, 255, 0.7);
  font-weight: bold;
}

.json-grid-container .path-node {
  background-color: rgba(51, 153, 255, 0.1);
  border-left: 2px solid rgba(51, 153, 255, 0.5);
}

.json-grid-container span {
  border-radius: 2px;
  padding: 1px 2px;
}

.json-grid-container span:hover {
  background-color: rgba(224, 224, 224, 0.5);
}
</style>