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
    haveLoadedDirectoryTree
} from "./../../../actions/index.jsx";

const DirectoryTree = Tree.DirectoryTree;
const {
    TreeNode
} = Tree;

import "./../style.scss";

const DirectoryTreeComponent = ({ directoryTreeReducers, addDirectoryTree, directoryTreeState, haveLoadedDirectoryTree }) => {
    //获取到Cookies值
    let userInfo = JSON.parse(Cookies.get("userInfo"));

    //存储文件夹数据
    // let dirTreeArr = [];
    // let dirTree = [];

    //文档树
    let [directoryTree, setDirectoryTree] = useState([]);

    let [subDirectoryTree, setSubDirectoryTree] = useState([]);

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

        let response = API.fetchFoldersDocuments(JSON.stringify(params), userInfo.access_token);
        response.then(res => {

            let resArr = [];
            resArr = res.data.data.map((curValue, index) => {
                //添加到Redux - Store
                addDirectoryTree(curValue.parameter);

                return curValue.parameter;
            });

            //存储返还的文件夹节点数据
            // dirTreeArr = resArr;

            setDirectoryTree(resArr);
        }).then(() => {
            haveLoadedDirectoryTree(true);
        });

        return(() => {
            haveLoadedDirectoryTree(false)
        });
    }, [] );


    let x = 3;
    let y = 2;
    let z = 1;
    let gData = [];

    //fn(子节点层数, 节点的起始数值, )
    let generateData = (_level, _preKey, _firstDirectoryTreeNode) => {
        let preKey = _preKey || "0";
        let firstDirectoryTreeNode = _firstDirectoryTreeNode || gData;

        let children = [];

        for(let i = 0;i < x; i++) {
            let key = `${preKey}-${i}`;

            firstDirectoryTreeNode.push({
                title: key,
                key
            });

            //i小于2的有子节点，例如0-0,0-1
            if(i < y) {
                children.push(key);
            }
        }

        //多少层子节点
        if(_level < 0) {
            return firstDirectoryTreeNode;
        }

        //节点层数-1
        let level = _level - 1;
        children.forEach((curValue, index) => {
            firstDirectoryTreeNode[index].children = [];

            return generateData(level, curValue, firstDirectoryTreeNode[index].children);
        });
    };

    generateData(z, 2);

    let dataList = [];
    let generateList = data => {
        for(let i = 0;i < data.length;i++) {
            let node = data[i];
            let key = node.key;

            dataList.push({
                key,
                title: key
            });

            if(node.children) {
                generateList(node.children);
            }
        }
    };

    generateList(gData);

    //获取parentKey值
    let getParentKey = (key, tree) => {
        let parentKey;

        for(let i = 0;i < tree.length;i++) {
            let node = tree[i];

            if(node.children) {
                if(node.children.some( item => {
                    return item.key === key;
                } )) {
                    parentKey = node.key;
                } else if(getParentKey( key, node.children )) {
                    parentKey = getParentKey(key, node.children);
                }
            }
        }
        return parentKey;
    };

    //搜索框onchang监听事件
    let handleDirectoryChange = e => {
        let value = e.target.value;
        let expandedKeys = dataList.map( item => {
            if(item.title.indexOf(value) > -1) {
                return getParentKey(item.key, gData);
            }
            return null;
        } ).filter( (item, i, self) => {
            return item && self.indexOf(item) === i;
        } );

        setExpandedKeys(expandedKeys);
        setSearchValue(value);
        setExpandParent(true);
    };

    //点击文件夹时获取key值
    let handleSubDirectory = (key, node) => {
        console.log("key");
        console.log(key);
        console.log("node");
        console.log(node);

        //点击directory获取key值，赋值给loadDataKey
        setLoadDataKey(key);
    };

    //文件夹树directory tree发起Fetch请求数据，其实我也不知道为什么这个不可以分装
    let handleFetchSubDirectory = node => {
        console.log("node");
        console.log(node.props.eventKey);

        return new Promise(() => {
            let response = fetch(`http://bosapi-demo.rickricks.com/bosdocumentservice/l77318a9442c41b8a167903441d8f884/folders/${node.props.eventKey}/folders?noRelation=false`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": userInfo.access_token
                }
            });

            response.then(res => res.json()).then(res => {
                console.log("res");
                console.log(res.data.data);

                // dirTreeArr.push(res.data.data);
                //不依赖状态subDirectory进行子文件夹渲染
                // handleLoopSubDirectory(res.data.data);

                // dirTreeArr.push(res.data.data);
                //根目录数组数据
                setSubDirectoryTree(res.data.data);
            });
        });
    };

    //渲染子文件夹树
    let handleLoopSubDirectory = () => {
        // let len = dirTreeArr.length;
        // let arr = dirTreeArr[len-1];
        // console.log("dirTreeArr");
        // console.log(dirTreeArr);

        return subDirectoryTree.map(curValue => {
            return curValue.parameter.leaf ? (<TreeNode
                    title={ curValue.parameter.name }
                    key={ curValue.parameter.key }
                    isLeaf
                />) : (<TreeNode
                    title={ curValue.parameter.name }
                    key={ curValue.parameter.key }
                >
                </TreeNode>);
        });
    };

    let loop = data => data.map( item => {
        let index = item.title.indexOf(searchValue);
        let beforeStr = item.title.substr(0, index);
        let afterStr = item.title.substr(index + searchValue.length);

        let title = index > -1 ? (
            <span>
                { beforeStr }

                <span
                    style={{ color: "#f50" }}
                > { searchValue } </span>

                { afterStr }
            </span>
        ): (<span>{ item.title }</span>);

        if(item.children) {
            return(
                <TreeNode
                    key={ item.key }
                    title={ title }
                >
                    {
                        loop(item.children)
                    }
                </TreeNode>
            );
        }

        return <TreeNode key={item.key} title={title} />;
    } );

    let handleDirectoryExpand = expandedKeys => {
        setExpandedKeys(expandedKeys);
        setExpandParent(false);
    };

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
                    {
                        directoryTree.map((curValue, index) => {
                            return curValue.leaf ? (
                                <TreeNode
                                    title={ curValue.name }
                                    key={ curValue.key }
                                    isLeaf
                                />
                            ) : (
                                <TreeNode
                                    title={ curValue.name }
                                    key={ curValue.key }
                                >

                                    { /* 渲染子文件夹树 */ }
                                    { handleLoopSubDirectory() }

                                </TreeNode>
                            );
                        })
                    }
                </DirectoryTree>
            }

            <div>
                <Search
                    style={{ marginBottom: "8" }}
                    placeholder="Search..."
                    onChange={ e => handleDirectoryChange(e) }
                />
                <Tree
                    onExpand={ expandedKeys => handleDirectoryExpand(expandedKeys) }
                    expandedKeys={ expandedKeys }
                    autoExpandParent={ expandParent }
                >
                    { loop(gData) }
                </Tree>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    let { directoryTreeReducers, directoryTreeState } = state;
    return {
        directoryTreeReducers,
        directoryTreeState
    };
};

export default connect(
    mapStateToProps,
    { addDirectoryTree, haveLoadedDirectoryTree }
)(DirectoryTreeComponent);
