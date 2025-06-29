<template>
    <el-container style="height: 100%; width: 100%;">
        <el-header height="3%">
            <div style="display: flex; justify-content: center; align-items: center;margin: 5px;">
                <el-link v-for="node in selectedNode" style="white-space: pre;" @click="setMainPath(node.path, true)">
                    {{ `${node.frame.key || node.frame.index} ${!node.isLast ? '->' : ''} ` }}
                </el-link>
                <el-button v-if="selectedNode.length" style="margin-left: 30px;" @click="copyPath">copyPath</el-button>
                <el-button v-if="selectedNode.length" @click="samePathNode">samePathNode</el-button>
                <el-button v-if="selectedNode.length" @click="pickNode">pickNode</el-button>
            </div>
        </el-header>
        <el-container style="height: 97%;">
            <el-aside width="20%">
                <div style="height: 20%;width: 100%;">
                    <el-card style="width: 100%; height: 100%; overflow-y: auto;border: 0;">
                        <template #header>
                            <el-input v-model="filterInput" style="width: 80%;float: left;" placeholder="Please input"
                                @keyup.enter="handleEnter" />
                        </template>


                        <div v-for="tag in filterCondition" :key="tag" @close="handleClose(tag)"
                            style="display: flex; align-items: center; margin-bottom: 8px;">
                            <el-select size="small" v-model="tag.type" placeholder="Select"
                                style="margin-right: 10px; width: 100px;">
                                <el-option v-for="type in Object.values(SearchType)" :key="type"
                                    :label="SearchType[type]" :value="type" />
                            </el-select>
                            <el-text class="mx-1" style="margin-right: 10px;">{{ tag.value }}</el-text>
                            <el-button :icon="Delete" circle @click="handleClose(tag)" size="small" />
                        </div>
                    </el-card>
                </div>
                <json-editor-vue class="editor" v-model="subJson" ref="subEditor" style="width: 100%; height: 80%"
                    currentMode="code" @textSelectionChange="subEditorSelect" />
            </el-aside>
            <el-main style="padding:0">
                <el-tabs v-model="activeName" style="height: 100%">
                    <el-tab-pane label="text" name="text" style="height: 100%">
                        <json-editor-vue class="editor" style="height: 100%" v-model="mainJson"
                            @textSelectionChange="mainEditorSelect" ref="mainEditor" currentMode="code"
                            @change="mainEditorChange" />
                    </el-tab-pane>
                    <el-tab-pane label="table" name="table" style="overflow: auto;height: 100%;">
                        <JsonTable :data="mainJson" />
                    </el-tab-pane>
                </el-tabs>
            </el-main>
            <el-aside width="30%">
                <div>
                    <el-input v-model="treeFilterText" class="w-60 mb-2" placeholder="Filter keyword" />
                    <div style="overflow-y: auto; height: 100%">
                        <el-tree ref="treeRef" :data="tree" node-key="path" :highlight-current="true"
                            class="filter-tree" :filter-node-method="filterNode" @node-contextmenu="selectTreeNode" />
                    </div>
                </div>
            </el-aside>
        </el-container>
    </el-container>
</template>



<script setup>
import JsonEditorVue from 'json-editor-vue3'
import JsonTable from '@/components/JsonTable.vue'
import { nextTick, onMounted, ref, watch } from 'vue';
import { parseJsonPath, pathToStringDot, parseJsonStructure } from "./jsonPathTo";
import { traveljson as traveljson2, SearchType } from "./jsonPathTo2";
import { shallowRef, toRaw } from '@vue/reactivity'
import { debounce } from 'lodash-es';
import {
    Delete
} from '@element-plus/icons-vue'
import demoData from './demo.json'


const mainEditor = ref(null)
const subEditor = ref(null)
const mainJsonStruct = shallowRef()
const subJsonStruct = shallowRef()
const pathMap = new Map()


const selectNodePath = ref('')
const selectedNode = ref([])

const filterInput = ref('')
const filterCondition = ref([])
onMounted(() => {
    filterCondition.value.push({
        "type": SearchType.JsonPath,
        "value": "data.HotelListData.hotelList[:].price"
    }),
    filterCondition.value.push({
        "type": SearchType.JsonPath,
        "value": "data.HotelListData.hotelList[:].hasFlag.vrPicture"
    })
})

const tree = ref([])
const treeRef = ref()
const treeFilterText = ref('')

const activeName = ref('text')


const copyPath = () => {
    navigator.clipboard.writeText(selectNodePath.value)
}

const samePathNode = () => {
    const path = selectNodePath.value
    if (path) {
        filterCondition.value.push({
            "type": SearchType.JsonPath,
            "value": path.replace(/\[-?\d+\]/g, '[:]')
        })
    }
}

const pickNode = () => {
    const path = selectNodePath.value
    if (path) {
        filterCondition.value.push({
            "type": SearchType.JsonPath,
            "value": path
        })
    }
}

const setMainPath = (path, foucuNode) => {
    if (!mainJsonStruct.value || !path) {
        return
    }
    var list = toRaw(mainJsonStruct.value).List
    var node = undefined

    while (true) {
        var hasFind = false
        for (const value of list) {
            if (path === value.path) {
                hasFind = true
                node = value
                break
            } else if ((path.startsWith(value.path + ".") || path.startsWith(value.path + "[")) && value.List) {
                hasFind = true
                list = value.List
                break
            }
        }
        if (node || !list || !hasFind) {
            break
        }
    }

    if (node) {
        selectNodePath.value = node.path
        const frame = parseJsonPath(node.path);
        if (frame) {
            selectedNode.value = []
            for (var i = 0; i < frame.length; i++) {
                selectedNode.value.push({
                    i: i,
                    frame: frame[i],
                    path: pathToStringDot(frame.slice(0, i + 1)),
                    isLast: i === frame.length - 1
                })
            }
        }


        if (foucuNode) {
            mainEditor.value.editor.setTextSelection({ row: node.startLine, column: 0 }, { row: node.endLine + 1, column: 0 })
        }
    }
}

const getPath = (editor, jsonStruct) => {
    const line = editor.value.editor.getTextSelection().start.row;

    if (!jsonStruct.value) {
        return
    }
    var list = toRaw(jsonStruct.value).List
    var path = undefined
    while (true) {
        var hasFind = false
        for (const value of list) {
            if (line == value.startLine || line == value.endLine) {
                hasFind = true
                path = value.path
                break
            } else if (line > value.startLine && line < value.endLine) {
                hasFind = true
                list = value.List
                break
            } else if (line < value.startLine || line > value.endLine) {
                continue
            }
        }
        if (path || !list || !hasFind) {

            if (!path) {
                path = ""
            }
            break
        }
    }
    return path
}

const mainEditorSelect = (editor, start, end) => {
    const path = getPath(mainEditor, mainJsonStruct)
    setMainPath(path, false)
}

const subEditorSelect = (editor, start, end) => {
    if (!filterCondition) {
        return
    }

    var path = getPath(subEditor, subJsonStruct)

    if (pathMap.has(path)) {
        path = pathMap.get(path)
    } else {
        const frames = parseJsonPath(path)
        if (frames) {
            while (frames.length > 0) {
                var prePath = pathToStringDot(frames)
                if (pathMap.has(prePath)) {
                    var replacePrePath = pathMap.get(prePath)
                    path = path.replace(prePath, replacePrePath)
                    break
                }
                frames.pop()
            }
        }
    }
    setMainPath(path, true)
}

// const mapPos = (editorTemp, start, end) => {
//   if (start.column === end.column) {
//     return
//   }

//   if (editorTemp.aceEditor.selection?.doc?.$lines) {
//     var offset = editorTemp.cursorInfo.column - 1;
//     for (var i = 0; i < editorTemp.cursorInfo.line - 1; i++) {
//       offset += editorTemp.aceEditor.selection.doc.$lines[i].length + 1;
//     }

//     let path = jsonPathTo(editorTemp.getText(), offset, 'dots')
//     console.log('main offset:', offset, 'main path:', path);

//     if (pathMap.has(path)) {
//       path = pathMap.get(path)
//     } else {

//       const frames = parseJsonPath(path)
//       if (frames) {
//         while (frames.length > 0) {
//           var prePath = pathToStringDot(frames)
//           if (pathMap.has(prePath)) {
//             var replacePrePath = pathMap.get(prePath)
//             path = path.replace(prePath, replacePrePath)
//             break
//           }
//           frames.pop()
//         }
//       }
//     }


//     const leftOffset = jsonPathPos(mainEditor.value.editor.getText(), path)
//     console.log('sub offset:', leftOffset, 'sub path:', path);
//     console.log('use map:', pathMap);

//     setMainPath(path, true)
//   }


// }


const selectTreeNode = (event, data) => {
    console.log(data);
    setMainPath(data.frame.path, true)
    // mainEditor.value.editor.aceEditor.scrollToLine(data.frame.startLine)
    // mainEditor.value.editor.setTextSelection({ row: data.frame.startLine, column: 0 }, { row: data.frame.endLine + 1, column: 0 })
}

const filterNode = (value, data) => {
    if (!value) return true
    return data.label.toLowerCase().includes(value.toLowerCase())
}


watch(treeFilterText, debounce((val) => {
    treeRef.value.filter(val);
}, 300));

const handleEnter = () => {
    if (filterInput.value) {
        // 正则表达式（宽松匹配）
        const pattern = /^(\$)?([a-zA-Z_]\w*)(\.[a-zA-Z_]\w*|\[[0-9:*\-]+\])*$/;
        if (filterInput.value.indexOf(".") > 0 && pattern.test(filterInput.value)) {
            filterCondition.value.push({
                "type": SearchType.JsonPath,
                "value": filterInput.value
            })
        } else {
            filterCondition.value.push({
                "type": SearchType.KeyOrValueContain,
                "value": filterInput.value
            })
        }
    }
}
const handleClose = (tag) => {
    let index = filterCondition.value.indexOf(tag);
    if (index !== -1) {
        filterCondition.value.splice(index, 1);
    }
}

watch(filterCondition, () => {
    pathMap.clear()
    subJson.value = traveljson2(mainJson.value, filterCondition.value, [], pathMap, [])
    nextTick(() => {
        subJsonStruct.value = parseJsonStructure(subEditor.value.editor.getText())
    })
}, { deep: true, flush: 'post' })


onMounted(() => {
    mainEditorChange(mainJson.value)
})

const mainEditorChange = (json) => {
    if (json && Object.prototype.toString.call(json.target).indexOf("Element") != -1) {
        return
    }
    mainJsonStruct.value = parseJsonStructure(mainEditor.value.editor.getText())
    tree.value = mainJsonStruct.value.List.map(child => convertToTree(child));
}

// const subEditorChange = (json) => {
//   if (json && Object.prototype.toString.call(json.target).indexOf("Element") != -1) {
//     return
//   }
//   subJsonStruct.value = parseJsonStructure(subEditor.value.editor.getText())
// }

// 将 JsonFrame 转换为 Tree 结构
function convertToTree(frame) {
    // 生成节点标签
    const label = generateLabel(frame);

    const treeNode = {
        label: label,
        frame: frame,
        path: frame.path
    };

    // 递归处理子节点
    if (frame.List && frame.List.length > 0) {
        treeNode.children = frame.List.map(childFrame => convertToTree(childFrame));
    }

    return treeNode;
}

// 生成节点标签的逻辑
function generateLabel(frame) {
    // 优先显示数组索引
    if (frame.index !== undefined) {
        return `[${frame.index}]`;
    }

    // 其次显示对象键名
    if (frame.key) {
        return frame.key;
    }

    // 最后显示路径的最后一部分
    const pathParts = frame.path.split('.');
    return pathParts[pathParts.length - 1] || 'root';
}




const subJson = ref({})
const mainJson = ref(demoData);


</script>

<style scoped></style>
