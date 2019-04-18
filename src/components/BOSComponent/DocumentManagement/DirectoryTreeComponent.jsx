import React, { useEffect,useState } from "react";
import { connect } from "react-redux";

import {
    Tree,
    Skeleton
} from "antd";
import "antd/dist/antd.css";

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
    //文档树
    let [directoryTree, setDirectoryTree] = useState([]);

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
                //添加到Redux - Store中
                addDirectoryTree(curValue.parameter);
                return curValue.parameter;
            });

            setDirectoryTree(resArr);
        }).then(() => {
            haveLoadedDirectoryTree(true);
        });
        return(() => {
            haveLoadedDirectoryTree(false)
        });
    }, [] );

    return(
        <div
            className="doc_management_tree"
        >
            {
                <Skeleton
                    loading={!directoryTreeState.isLoaded}
                />
            }
            <DirectoryTree
                multiple
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
                            </TreeNode>
                        );

                    })
                }
            </DirectoryTree>
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
