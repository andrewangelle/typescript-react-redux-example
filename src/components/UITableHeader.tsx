// external deps, type defs, utils
import React, { Component } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// app level utils
import { setTableFilter } from '../store/posts/actions'
// UI related imports
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Select from 'antd/lib/select';
import '../styles/table.scss';

// component level type defs
interface ConnectedProps { setTableFilter: typeof setTableFilter; }
interface InheritedProps extends ConnectedProps { title: string; values: Array<number> | Array<string>; }
type ComponentState = { formValue: string };
type ComponentProps = InheritedProps & ConnectedProps;


class UITableHeader extends Component<ComponentProps, ComponentState> {
  public state: ComponentState;

  constructor(props: ComponentProps & ComponentState) {
    super(props);
    this.state = { formValue: '' }
  }

  render() {
    const { formValue } = this.state;
    const { title, values } = this.props;
    let Option = Select.Option;

    return (
      <span>
        {title}
        <Form>
          <Select
            onChange={(value: string) => this.updateFilters(value)}
            value={formValue}
            className={'filter-dropdown'}
          >
            {values ?
              ((values as any).map(value =>
                <Option
                  key={value}
                  title={`${title}`}
                  value={(this.renderOptionValueProp(value, title))}
                >
                  {value}
                </Option>
              ))
            : null}
          </Select>
        </Form>

        <Button onClick={() => this.clearFilters()}>
          Reset
        </Button>
      </span>
     )
  }

  private updateLocalFormState = (value: string) => {
    this.setState({ formValue: value })
  }

  private updateFilters = (value: string) => {
    const options = { filterBy: this.props.title, currentValue: value }
    this.props.setTableFilter(options)
    this.updateLocalFormState(value)
  }

  private clearFilters = () => {
    const options = { filterBy: 'none', currentValue: 'none' }
    this.props.setTableFilter(options)
    this.updateLocalFormState('')
  }

  private renderOptionValueProp = (value: string, title: string) => {
    /*
      The value prop of AntD's option form elements are passed as strings when selected.
      This methods takes care of the explicit edge cases where we need the value as an integer
    */
    let valueAsNumber: number

    if (title === 'User Id' || title === 'Id'){
      valueAsNumber = parseInt(value, 10);
      return valueAsNumber
    }

    if (title === 'Body' || title === 'Title') {
      return value
    }
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ConnectedProps>): ConnectedProps => ({
  ...bindActionCreators({setTableFilter}, dispatch)
});

export default connect(null, mapDispatchToProps)(UITableHeader);