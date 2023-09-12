const VIEW_TABLE = 'scratch-gui/dataviewer/VIEW_TABLE';
const CLOSE_TABLE = 'scratch-gui/dataviewer/CLOSE_TABLE';
const SHRINK_EXPAND_TABLE = 'scratch-gui/dataviewer/SHRINK_EXPAND_TABLE';
const DRAG_TABLE = 'scratch-gui/dataviewer/DRAG_TABLE';
const START_DRAG = 'scratch-gui/dataviewer/START_DRAG';
const END_DRAG = 'scratch-gui/dataviewer/END_DRAG';

const initialState = {
    visible: false,
    expanded: true,
    x: 0,
    y: 0,
    dragging: false
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case VIEW_TABLE:
        return Object.assign({}, state, {
            expanded: true,
            visible: true
        });
    case CLOSE_TABLE:
        return Object.assign({}, state, {
            visible: false
        });
    case SHRINK_EXPAND_TABLE:
        return Object.assign({}, state, {
            expanded: !state.expanded
        });
    case DRAG_TABLE:
        return Object.assign({}, state, {
            x: action.x,
            y: action.y
        });
    case START_DRAG:
        return Object.assign({}, state, {
            dragging: true
        });
    case END_DRAG:
        return Object.assign({}, state, {
            dragging: false
        });
    default:
        return state;
    }
};

const viewTable = function () {
    return {type: VIEW_TABLE};
};

const closeTable = function () {
    return {type: CLOSE_TABLE};
};

const shrinkExpandTable = function () {
    return {type: SHRINK_EXPAND_TABLE};
};

const dragTable = function (x, y) {
    return {type: DRAG_TABLE, x, y};
};

const startDrag = function () {
    return {type: START_DRAG};
};

const endDrag = function () {
    return {type: END_DRAG};
};

export {
    reducer as default,
    initialState as dataviewerInitialState,
    viewTable,
    closeTable,
    shrinkExpandTable,
    dragTable,
    startDrag,
    endDrag
};
