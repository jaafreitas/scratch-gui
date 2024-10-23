import classNames from 'classnames';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import VM from 'scratch-vm';

import Box from '../box/box.jsx';
import Button from '../button/button.jsx';
import ToggleButtons from '../toggle-buttons/toggle-buttons.jsx';
import Controls from '../../containers/controls.jsx';
import {getStageDimensions} from '../../lib/screen-utils';
import {STAGE_SIZE_MODES} from '../../lib/layout-constants';

import dataviewerTableIcon from './icon--table-dataviewer.png';

import fullScreenIcon from './icon--fullscreen.svg';
import largeStageIcon from './icon--large-stage.svg';
import smallStageIcon from './icon--small-stage.svg';
import unFullScreenIcon from './icon--unfullscreen.svg';

import playdataLogo from '../menu-bar/playdata-logo.png';
import styles from './stage-header.css';

const messages = defineMessages({
    dataviewerTable: {
        defaultMessage: 'PlayData Table',
        description: 'Button to PlayData Table',
        id: 'gui.stageHeader.dataviewerTable'
    },
    largeStageSizeMessage: {
        defaultMessage: 'Switch to large stage',
        description: 'Button to change stage size to large',
        id: 'gui.stageHeader.stageSizeLarge'
    },
    smallStageSizeMessage: {
        defaultMessage: 'Switch to small stage',
        description: 'Button to change stage size to small',
        id: 'gui.stageHeader.stageSizeSmall'
    },
    fullStageSizeMessage: {
        defaultMessage: 'Enter full screen mode',
        description: 'Button to change stage size to full screen',
        id: 'gui.stageHeader.stageSizeFull'
    },
    unFullStageSizeMessage: {
        defaultMessage: 'Exit full screen mode',
        description: 'Button to get out of full screen mode',
        id: 'gui.stageHeader.stageSizeUnFull'
    },
    fullscreenControl: {
        defaultMessage: 'Full Screen Control',
        description: 'Button to enter/exit full screen mode',
        id: 'gui.stageHeader.fullscreenControl'
    }
});

const StageHeaderComponent = function (props) {
    const {
        isFullScreen,
        isPlayerOnly,
        onKeyPress,
        dataviewerVisible,
        onOpenDataviewerTable,
        onSetStageLarge,
        onSetStageSmall,
        onSetStageFull,
        onSetStageUnFull,
        showBranding,
        stageSizeMode,
        vm
    } = props;

    const onOpenDataviewerTableTimeLine = () => {
        vm.emit('openDataviewerTable*');
        onOpenDataviewerTable();
    };

    let header = null;

    if (isFullScreen) {
        const stageDimensions = getStageDimensions(null, true);
        const stageButton = showBranding ? (
            <div className={styles.embedScratchLogo}>
                <a
                    href="https://playdatalab.github.io/"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <img
                        alt="PlayData"
                        src={playdataLogo}
                    />
                </a>
            </div>
        ) : (
            <div className={styles.unselectWrapper}>
                <Button
                    className={styles.stageButton}
                    onClick={onSetStageUnFull}
                    onKeyPress={onKeyPress}
                >
                    <img
                        alt={props.intl.formatMessage(messages.unFullStageSizeMessage)}
                        className={styles.stageButtonIcon}
                        draggable={false}
                        src={unFullScreenIcon}
                        title={props.intl.formatMessage(messages.fullscreenControl)}
                    />
                </Button>
            </div>
        );
        header = (
            <Box className={styles.stageHeaderWrapperOverlay}>
                <Box
                    className={styles.stageMenuWrapper}
                    style={{width: stageDimensions.width}}
                >
                    <Controls vm={vm} />
                    {stageButton}
                </Box>
            </Box>
        );
    } else {
        const dataviewerControls = (
            <div className={styles.stageSizeToggleGroup}>
                <div>
                    <Button
                        className={classNames(
                            styles.stageButton,
                            styles.stageDataviewerButton,
                            dataviewerVisible ? styles.stageDataviewerButtonOff : null
                        )}
                        onClick={dataviewerVisible ? null : onOpenDataviewerTableTimeLine}
                    >
                        <img
                            alt={props.intl.formatMessage(messages.dataviewerTable)}
                            className={styles.stageDataviewerButtonIcon}
                            draggable={false}
                            src={dataviewerTableIcon}
                            title={props.intl.formatMessage(messages.dataviewerTable)}
                        />
                    </Button>
                </div>
            </div>
        );
        const stageControls =
            isPlayerOnly ? (
                []
            ) : (
                <div className={styles.stageSizeToggleGroup}>
                    <ToggleButtons
                        buttons={[
                            {
                                handleClick: onSetStageSmall,
                                icon: smallStageIcon,
                                iconClassName: styles.stageButtonIcon,
                                isSelected: stageSizeMode === STAGE_SIZE_MODES.small,
                                title: props.intl.formatMessage(messages.smallStageSizeMessage)
                            },
                            {
                                handleClick: onSetStageLarge,
                                icon: largeStageIcon,
                                iconClassName: styles.stageButtonIcon,
                                isSelected: stageSizeMode === STAGE_SIZE_MODES.large,
                                title: props.intl.formatMessage(messages.largeStageSizeMessage)
                            }
                        ]}
                    />
                </div>
            );
        header = (
            <Box className={styles.stageHeaderWrapper}>
                <Box className={styles.stageMenuWrapper}>
                    <Controls vm={vm} />
                    <div className={styles.stageSizeRow}>
                        {dataviewerControls}
                        {stageControls}
                        <div>
                            <Button
                                className={styles.stageButton}
                                onClick={onSetStageFull}
                            >
                                <img
                                    alt={props.intl.formatMessage(messages.fullStageSizeMessage)}
                                    className={styles.stageButtonIcon}
                                    draggable={false}
                                    src={fullScreenIcon}
                                    title={props.intl.formatMessage(messages.fullscreenControl)}
                                />
                            </Button>
                        </div>
                    </div>
                </Box>
            </Box>
        );
    }

    return header;
};

const mapStateToProps = state => ({
    // This is the button's mode, as opposed to the actual current state
    stageSizeMode: state.scratchGui.stageSize.stageSize,
    dataviewerVisible: state.scratchGui.dataviewer.visible
});

StageHeaderComponent.propTypes = {
    intl: intlShape,
    isFullScreen: PropTypes.bool.isRequired,
    isPlayerOnly: PropTypes.bool.isRequired,
    onKeyPress: PropTypes.func.isRequired,
    dataviewerVisible: PropTypes.bool.isRequired,
    onOpenDataviewerTable: PropTypes.func.isRequired,
    onSetStageFull: PropTypes.func.isRequired,
    onSetStageLarge: PropTypes.func.isRequired,
    onSetStageSmall: PropTypes.func.isRequired,
    onSetStageUnFull: PropTypes.func.isRequired,
    showBranding: PropTypes.bool.isRequired,
    stageSizeMode: PropTypes.oneOf(Object.keys(STAGE_SIZE_MODES)),
    vm: PropTypes.instanceOf(VM).isRequired
};

StageHeaderComponent.defaultProps = {
    stageSizeMode: STAGE_SIZE_MODES.large
};

export default injectIntl(connect(
    mapStateToProps
)(StageHeaderComponent));
