import React, { Component } from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';
import { withContext } from '../context';

class Footer extends Component {
  onIndexSelect = (e, index) => {
    const { onCategorySelect, muscles } = this.props;
    onCategorySelect(index === 0 ? '' : muscles[index - 1]);
  };
  getIndex = () => {
    const { category, muscles } = this.props;
    return category ? muscles.findIndex(group => group === category) + 1 : 0;
  };

  render() {
    const { width, muscles } = this.props;
    return (
      <AppBar position="static">
        <Tabs
          value={this.getIndex()}
          onChange={this.onIndexSelect}
          indicatorColor="secondary"
          textColor="secondary"
          centered={width !== 'xs'}
          variant={width === 'xs' ? 'scrollable' : 'standard'}
          scrollButtons={width === 'xs' ? 'on' : 'auto'}
        >
          <Tab label="All" />
          {muscles.map((each, i) => (
            <Tab key={i} label={each} />
          ))}
        </Tabs>
      </AppBar>
    );
  }
}

export default withWidth()(withContext(Footer));
