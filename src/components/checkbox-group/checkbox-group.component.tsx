import React, { Component } from 'react';
import './checkbox-group.component.css';

interface CheckBoxGroupComponentProps {
  options: CheckBoxInputOption[],
  change: Function
}

interface CheckBoxInputOption {
  key: string,
  label: string
}

class CheckBoxGroupComponent extends Component<CheckBoxGroupComponentProps> {
  checked: string[] = [];

  parseSelections(value: string) {
    const indexIfExists = this.checked.indexOf(value);
    if ( indexIfExists > -1) {
      this.checked.splice(indexIfExists, 1);
    } else {
      this.checked.push(value);
    }
  }

  onCheckBoxChange(value: string) {
    this.parseSelections(value);
    this.props.change(this.checked);
  }

  render() {
    return this.props.options.map(option => {
     return (
      <div className="checkbox-group-holder" key={'chkbx-grp-' + option.key}>
        <input
          className="checkbox-group-input"
          type="checkbox"
          name={'chkbx-grp-' + option.key}
          onChange={() => this.onCheckBoxChange(option.key)}
          value={option.key} /> 
       <div className="checkbox-group-item">
       </div>
       <div className="checkbox-group-label">
         <label htmlFor={'chkbx-grp-' + option.key}>
          {option.label}
        </label>
        </div>
      </div>
    )});
  };
}

export default CheckBoxGroupComponent;