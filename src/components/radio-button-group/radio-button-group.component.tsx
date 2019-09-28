import React, { Component } from 'react';
import './radio-button-group.component.css';

interface RadioButtonGroupComponentProps {
  options: RadioButtonInputOption[],
  change: Function
}

interface RadioButtonInputOption {
  key: string,
  label: string
}

class RadioButtonGroupComponent extends Component<RadioButtonGroupComponentProps> {
  static _uniqueId = 0;
  radioGrpName: string = `rad-grp-${RadioButtonGroupComponent._uniqueId++}`;

  onValueChange(value: string) {
    this.props.change([value]);
  }

  render() {
    return this.props.options.map(option => {
      return (
        <div className="radio-button-group-holder" key={'rad-grp-' + option.key}>
          <input
          className="radio-group-input"
          type="radio"
          name={this.radioGrpName}
          onChange={() => this.onValueChange(option.key)}
          value={option.key} /> 
          <div className="radio-group-item">
          </div>
          <div className="radio-group-label">
            <label htmlFor={'radio-grp-' + option.key}>
              {option.label}
            </label>
            </div>
        </div>
      )
    });
  }
}

export default RadioButtonGroupComponent