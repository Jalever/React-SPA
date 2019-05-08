import {
    ID,
    PRIORITY,
    CONTENT,
    IS_COMPLETED
} from "@/constants/todolist.jsx";

const itemMap = {
    Id: {
        title: `${ID}`
    },
    Priority: {
        title: `${PRIORITY}`
    },
    Content: {
        title: `${CONTENT}`
    },
    IsCompleted: {
        title: `${IS_COMPLETED}`
    }
};

export default itemMap;
