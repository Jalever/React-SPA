import React, { useEffect,useState } from "react";
import { connect } from "react-redux";

import {
    Tree,
    Input,
    Skeleton
} from "antd";
import "antd/dist/antd.css";
const Search = Input.Search;

import Cookies from "js-cookie";
import API from "./../../../utils/api.js";
import {
    addDirectoryTree,
    haveLoadedDirectoryTree,
    handleSelectedDirectory,
    handleDocumentTableData
} from "./../../../actions/index.jsx";

const DirectoryTree = Tree.DirectoryTree;
const {
    TreeNode
} = Tree;

import "./../style.scss";

/*
handleDocumentTableData: handle主页面表格数据显示
*/
const DirectoryTreeComponent = ({ directoryTreeReducers,handleSelectedDirectory, handleDocumentTableData, addDirectoryTree, directoryTreeState, haveLoadedDirectoryTree }) => {
    //获取到Cookies值
    let userInfo = JSON.parse(Cookies.get("userInfo"));

    //存储文件夹树状树形结构数据
    // let dirTreeArr = [];
    let dirTreeObj = {};
    // let dirTreeMap = new Map();

    //文档树
    let [directoryTree, setDirectoryTree] = useState([]);

    // let [subDirectoryTree, setSubDirectoryTree] = useState([]);

    //Official Antd Tree Component Render
    let [expandedKeys, setExpandedKeys] = useState([]);
    let [searchValue, setSearchValue] = useState("");
    let [expandParent, setExpandParent] = useState(true);

    let [loadData, setLoadData] = useState();
    let [loadDataKey, setLoadDataKey] = useState();

    useEffect( () => {
        //申请文件夹和文档API的参数
        let params = {
        	"key": "",
        	"entity": "both",
        	"page": "1",
        	"per_page": "10",
        	"sortby": "gtime",
        	"order": "asc"
        };

        //页面左侧文档树数据申请
        let response = API.fetchFoldersDocuments(JSON.stringify(params), userInfo.access_token);
        response.then(res => {

            let resArr = [];
            resArr = res.data.data.map((curValue, index) => {
                //添加到Redux - Store
                addDirectoryTree(curValue.parameter);

                // dirTreeObj[curValue.key] = curValue.name;

                return curValue.parameter;
            });

            //存储返还的文件夹节点数据
            // dirTreeArr = resArr;

            setDirectoryTree(resArr);

            // console.log("directoryTree");
            // console.log(resArr);
            // console.log("\n");
        }).then(() => {
            haveLoadedDirectoryTree(true);
        });

        return(() => {
            haveLoadedDirectoryTree(false)
        });
    }, [] );

    //
    // let x = 3;
    // let y = 2;
    // let z = 1;
    // let gData = [];
    //
    // //fn(子节点层数, 节点的起始数值, )
    // let generateData = (_level, _preKey, _firstDirectoryTreeNode) => {
    //     let preKey = _preKey || "0";
    //     let firstDirectoryTreeNode = _firstDirectoryTreeNode || gData;
    //
    //     let children = [];
    //
    //     for(let i = 0;i < x; i++) {
    //         let key = `${preKey}-${i}`;
    //
    //         firstDirectoryTreeNode.push({
    //             title: key,
    //             key
    //         });
    //
    //         //i小于2的有子节点，例如0-0,0-1
    //         if(i < y) {
    //             children.push(key);
    //         }
    //     }
    //
    //     //多少层子节点
    //     if(_level < 0) {
    //         return firstDirectoryTreeNode;
    //     }
    //
    //     //节点层数-1
    //     let level = _level - 1;
    //     children.forEach((curValue, index) => {
    //         firstDirectoryTreeNode[index].children = [];
    //
    //         return generateData(level, curValue, firstDirectoryTreeNode[index].children);
    //     });
    // };
    //
    // generateData(z, 2);
    //
    // let dataList = [];
    // let generateList = data => {
    //     for(let i = 0;i < data.length;i++) {
    //         let node = data[i];
    //         let key = node.key;
    //
    //         dataList.push({
    //             key,
    //             title: key
    //         });
    //
    //         if(node.children) {
    //             generateList(node.children);
    //         }
    //     }
    // };
    //
    // generateList(gData);
    //
    // //获取parentKey值
    // let getParentKey = (key, tree) => {
    //     let parentKey;
    //
    //     for(let i = 0;i < tree.length;i++) {
    //         let node = tree[i];
    //
    //         if(node.children) {
    //             if(node.children.some( item => {
    //                 return item.key === key;
    //             } )) {
    //                 parentKey = node.key;
    //             } else if(getParentKey( key, node.children )) {
    //                 parentKey = getParentKey(key, node.children);
    //             }
    //         }
    //     }
    //     return parentKey;
    // };
    //
    // //搜索框onchang监听事件
    // let handleDirectoryChange = e => {
    //     let value = e.target.value;
    //     let expandedKeys = dataList.map( item => {
    //         if(item.title.indexOf(value) > -1) {
    //             return getParentKey(item.key, gData);
    //         }
    //         return null;
    //     } ).filter( (item, i, self) => {
    //         return item && self.indexOf(item) === i;
    //     } );
    //
    //     setExpandedKeys(expandedKeys);
    //     setSearchValue(value);
    //     setExpandParent(true);
    // };

    //获取子文件夹，渲染主页面表格数据
    let getChildrenDirectoryArray = (key = "", parentDirTreeArr = directoryTree) => {

        // console.log("directoryTree--------------getChildrenDirectoryArray");
        // console.log(directoryTree);
        // console.log("\n");

        for(let curValue of parentDirTreeArr) {

            // console.log("looped key-----------------------------");
            // console.log(curValue.name + "              :              " + curValue.key);
            if(curValue.key === key) {

                // console.log("curValue.children");
                // console.log(curValue);
                // console.log(curValue.children);
                // console.log("\n");

                if(curValue.children) {
                    // console.log("parentDirTreeArr-----------------------------");
                    // console.log(parentDirTreeArr);
                    // console.log("target key-----------------------------");
                    // console.log(key);
                    // console.log("curValue.children-----------------------------");
                    // console.log(curValue.children);
                    return curValue.children;
                }
                // getChildrenDirectoryArray(key, curValue.children);
                // return curValue.children;
            } else {
                //遍历子数组
                if(curValue.children) {
                    getChildrenDirectoryArray(key, curValue.children);
                }
            }

        }

        // parentDirTreeArr.map(dir => {
        //
        //         console.log("looped key-----------------------------");
        //         console.log(dir.name + "___:___" + dir.key);
        //         console.log("key: ");
        //         console.log(key);
        //
        //         if(dir.key === key) {
        //         console.log("dir.children: ");
        //         console.log(key);
        //
        //             if(dir.children) {
        //                 console.log("target key-----------------------------");
        //                 console.log(key);
        //                 console.log("curValue.children-----------------------------");
        //                 console.log(dir.children);
        //                 return dir.children;
        //             }
        //         } else {
        //             //遍历子数组
        //             if(dir.children) {
        //                 getChildrenDirectoryArray(key, dir.children);
        //             }
        //         }
        // });
    };

    //点击文件夹时获取key值
    let handleSubDirectory = (key, node) => {
        // console.log("clicked node name --- onSelect");
        // console.log(node.node.props.title);
        // console.log("\n");
        //
        console.log("clicked node --- onSelect");
        console.log(node);
        console.log("\n");

        handleSelectedDirectory(...key);

        //
        // console.log("directoryTree --- onSelect");
        // console.log(directoryTree);
        // console.log("\n");

        // let handleDelayForChildrenArr = new Promise(() => {
        //     while() {
        //
        //     }
        // });

        let childrenArray = getChildrenDirectoryArray(...key);
        // console.log("childrenArray --- onSelect");
        // console.log(childrenArray);
        //
        // console.log("directoryTreeState: " + directoryTreeState.isLoaded);
        // console.log("\n");

        if(childrenArray !== undefined) {
            handleDocumentTableData(childrenArray);
        }


        //点击directory获取key值，赋值给loadDataKey
        setLoadDataKey(key);

        directoryTree.map(curValue => {
                dirTreeObj[curValue.key] = curValue.key;
        });

        // console.log("\n");
        // console.log("dirTreeObj");
        // console.log(dirTreeObj);
    };

    //文件夹树directory tree发起Fetch请求数据，其实我也不知道为什么这个不可以封装
    let handleFetchSubDirectory = node => {

        // console.log("Name  -- fetch request: ");
        // console.log(node.props.title);
        // console.log("\n");

        //当前返还的文件夹数据的longcode
        let subDirLongCode;
        //存储子文件夹父key的数组
        let subDirLongCodeArr;
        //当前返还的文件夹数据的层级
        let dirLevel;
        //异步返还的数据的父文件夹的层级
        let parentLevel;
        //异步返还的数据的父文件夹的key数组
        let subDirParentArr = [];

        return new Promise(() => {
            let response = fetch(`http://bosapi-demo.rickricks.com/bosdocumentservice/l77318a9442c41b8a167903441d8f884/folders/${node.props.eventKey}/folders?noRelation=false`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": userInfo.access_token
                }
            });

            response.then(res => res.json()).then(res => {
                // console.log("sub dir data of Clicked Node  --- fetch request: ");

                let resArr = res.data.data;
                //当前返还的文件夹数据的层级
                dirLevel = resArr.level;

                // console.log(resArr);
                // console.log("\n");

                //返还的数据中获取父文件夹的key值
                if(resArr[0] && resArr[0].parameter.longCode) {
                    subDirLongCode = resArr[0].parameter.longCode;

                    subDirLongCodeArr = subDirLongCode.split('※');
                    parentLevel = subDirLongCodeArr.length - 1;
                    for(let i = 0;i < parentLevel;i++) {
                        subDirParentArr.push(subDirLongCodeArr[i]);
                    }
                }

                // console.log("clicked node key  -- fetch request:");
                // console.log(node.props.eventKey);
                // console.log("node");
                // console.log(node);
                // node.props.loading = false;
                // console.log(node.props.loading);
                // console.log("\n");

                // console.log("subDirParentArr  -- fetch request:");
                // console.log(subDirParentArr);
                // console.log("\n");

                let loopSubDirForInsert = (parentKey = "", parentDirTreeArr = []) => {

                    // console.log("\n");
                    // console.log(`loopSubDirForInsert`);
                    // console.log(`parentKey  -----------loopSubDirForInsert------------`);
                    // console.log(parentKey);
                    // console.log("type of parentKey: " + typeof parentKey);
                    // console.log(`parentDirTreeArr  ------loopSubDirForInsert---------`);
                    // console.log(parentDirTreeArr);

                    for(let curValue of parentDirTreeArr) {
                        if(curValue.key === parentKey) {
                            // console.log(`curValue.key  ------loopSubDirForInsert---------`);
                            // console.log(curValue.key);
                            // console.log(`curValue.children  ------loopSubDirForInsert---------`);
                            // console.log(curValue.children);
                            if(curValue.children) {
                                return curValue.children;
                            } else {
                                //最后一次返回的是当前点击的文件夹{}
                                //若curValue对象中没有children属性，则添加children属性
                                //因为response的数据结构{parameter: {}, relationship:{}},所以只取parameter填充进数组
                                let validDirTreeArr = [];
                                validDirTreeArr = res.data.data.map((curValue, index) => {

                                    // dirTreeObj[curValue.key] = curValue.name;

                                    return curValue.parameter;
                                });

                                curValue.children = validDirTreeArr;

                                //点击文件夹后，文档管理页面主表格加载相关数据
                                handleDocumentTableData(validDirTreeArr);
                                return validDirTreeArr;
                            }
                        }
                    }

                    // console.log(`loopSubDirForInsert`);
                    // console.log("\n");
                };


                var loopDirArr;
                for(let i = 0;i < subDirParentArr.length;i++) {
                    // let loopDirArr;
                    (function(index) {
                        if(index === 0)  loopDirArr = directoryTree;

                        // console.log(`loopDirArr  ------------${index}----before-------`);
                        // console.log(loopDirArr);
                        // console.log(`loopDirArr  ----------------${index}-------`);
                        // console.log(directoryTree);
                        // console.log("\n");

                        loopDirArr = loopSubDirForInsert(subDirParentArr[index], loopDirArr);

                        // console.log(`loopDirArr  -------${index}---------after-------`);
                        // console.log(loopDirArr);
                    })(i);
                }


                // console.log("directoryTree  -- after inserted children:");
                // console.log(directoryTree);
                // console.log("\n");




            //子目录数组数据
            // setSubDirectoryTree(res.data.data);
            }).then(() => {

                let newArr = [];

                newArr.push(node.props.eventKey);

                // console.log("directoryTree");
                // console.log(directoryTree);

                //点击文件夹，主页面表格加载相关数据
                // let childrenDirectoryArr = getChildrenDirectoryArray(node.props.eventKey, directoryTree);
                // console.log("node.props.eventKey");
                // console.log(node.props.eventKey);
                // console.log("\n");
                // console.log("childrenDirectoryArr --- getChildrenDirectoryArray");
                // console.log(childrenDirectoryArr);
                // console.log("\n");

                //点击directory获取key值，赋值给loadDataKey
                setLoadDataKey(newArr);
            });
        });
    };

    //渲染子文件夹树
    let handleLoopSubDirectory = dir => {
        //当前dir不存在的话
        if(!dir) return;

        return dir.map(curValue => {
            if(!curValue.leaf) {
                return <TreeNode
                    key={ curValue.key }
                    title={ curValue.name }
                >
                    {
                        handleLoopSubDirectory(curValue.children)
                    }
                </TreeNode>;
            }

            return <TreeNode
                key={ curValue.key }
                title={ curValue.name }
                isLeaf
            />;
        });
    };


    // let loop = data => data.map( item => {
    //     let index = item.title.indexOf(searchValue);
    //     let beforeStr = item.title.substr(0, index);
    //     let afterStr = item.title.substr(index + searchValue.length);
    //
    //     let title = index > -1 ? (
    //         <span>
    //             { beforeStr }
    //
    //             <span
    //                 style={{ color: "#f50" }}
    //             > { searchValue } </span>
    //
    //             { afterStr }
    //         </span>
    //     ): (<span>{ item.title }</span>);
    //
    //     if(item.children) {
    //         return(
    //             <TreeNode
    //                 key={ item.key }
    //                 title={ title }
    //             >
    //                 {
    //                     loop(item.children)
    //                 }
    //             </TreeNode>
    //         );
    //     }
    //
    //     return <TreeNode key={item.key} title={title} />;
    // } );

    let handleDirectoryExpand = expandedKeys => {
        setExpandedKeys(expandedKeys);
        setExpandParent(false);
    };

    // let handleLoadedDirectory = (loadedKeys, event, node) => {
    //     console.log("loadedKeys");
    //     console.log(loadedKeys);
    //     console.log("event");
    //     console.log(event);
    //     console.log("node");
    //     console.log(node);
    // };

    return(
        <div
            className="doc_management_tree"
        >
            {/* 文档树标题 */}
            {
                <div
                    className="directoryTreeTitle"
                >Directory Tree</div>
            }

            {/* 文档树数据pending时显示skeleton */}
            {
                <Skeleton
                    loading={!directoryTreeState.isLoaded}
                />
            }

            {/* 文件夹树 */}
            {
                <DirectoryTree
                    multiple
                    onSelect={ (selectedKeys, node)=> handleSubDirectory(selectedKeys, node) }
                    loadData={ node => handleFetchSubDirectory(node) }
                    loadedKeys={ loadDataKey }
                >
                    {/*
                        directoryTree.map((curValue, index) => {
                            return curValue.leaf ? (
                                <TreeNode
                                    title={ curValue.name }
                                    key={ curValue.key }
                                    isLeaf
                                />
                            ) : (
                                handleLoopSubDirectory(curValue)
                            );
                        })
                    */}
                    {
                        handleLoopSubDirectory(directoryTree)
                    }
                </DirectoryTree>
            }

            <div>
                {/*
                    <Search
                        style={{ marginBottom: "8" }}
                        placeholder="Search..."
                        onChange={ e => handleDirectoryChange(e) }
                    />
                */}
                {/*
                    <Tree
                        onExpand={ expandedKeys => handleDirectoryExpand(expandedKeys) }
                        expandedKeys={ expandedKeys }
                        autoExpandParent={ expandParent }
                    >
                        { loop(gData) }
                    </Tree>
                */}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    let { directoryTreeReducers, directoryTreeState } = state;
    console.log("state");
    console.log(state);
    console.log("\n");
    return {
        directoryTreeReducers,
        directoryTreeState
    };
};

export default connect(
    mapStateToProps,
    {
        addDirectoryTree,
        handleSelectedDirectory,
        haveLoadedDirectoryTree,
        handleDocumentTableData
    }
)(DirectoryTreeComponent);
