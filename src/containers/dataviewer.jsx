import {connect} from 'react-redux';
import React from 'react';

import {
    closeTable,
    shrinkExpandTable,
    dragTable,
    startDrag,
    endDrag
} from '../reducers/dataviewer';

import DataviewerComponent from '../components/dataviewer/dataviewer.jsx';

const Dataviewer = function (props) {
    return <DataviewerComponent {...props} />;
};

const mapStateToProps = state => ({
    expanded: state.scratchGui.dataviewer.expanded,
    x: state.scratchGui.dataviewer.x,
    y: state.scratchGui.dataviewer.y,
    isRtl: state.locales.isRtl,
    vm: state.scratchGui.vm
});

const mapDispatchToProps = dispatch => ({
    onCloseTable: () => dispatch(closeTable()),
    onShrinkExpandTable: () => dispatch(shrinkExpandTable()),
    onDrag: (e_, data) => dispatch(dragTable(data.x, data.y)),
    onStartDrag: () => dispatch(startDrag()),
    onEndDrag: () => dispatch(endDrag())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dataviewer);
