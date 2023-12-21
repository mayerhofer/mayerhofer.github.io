import CategoryReport from "../busHtml/CategoryReport";
import { RComponent } from "../framework/RComponent";
import Button from "../html/button";
import Div from "../html/div";
import Image from "../html/image";
import EntityAPI from "../servers/entity";

const getStatusClass = value => {
  if (typeof value === 'number') {
    if (value > 0) {
      return " income";
    }
  }
  return "";
}
const buildRow = handleExpand => row => {
  const title = Div('cashflowProvider', row.category);
  const m0 =  Div('cashflowAmount' + getStatusClass(row.sum1), row.sum1);
  const m1 = Div('cashflowAmount' + getStatusClass(row.sum2), row.sum2);
  const m2 = Div('cashflowAmount' + getStatusClass(row.sum3), row.sum3);

  let actionButtons = '';
  if (handleExpand) {
    const expand = Button('act-btn', Image('expand'), 'ExpandBtn' + row.category, () => handleExpand(row.category));

    actionButtons += Div('actions-wrapper', expand);
  }

  return Div('table__row', title + m0 + m1 + m2 + actionButtons);
};

export default class BudgetTable extends RComponent {
  constructor(p) {
    super(p);

    this.state = {
      data: [],
      api: false
    }
  }

  componentDidMount() {
    const api = new EntityAPI('report');
    const self = this;
    
    api.get().then(data => {
      self.setState({data, api});
    });
  }

  handleClose() {
    this.setState({categoryReport: false});
  }

  handleExpand(category) {
    if (this.state.api) {
      this.state.api.get({category}).then(categoryReport => {
        this.setState({categoryReport});
      });
    }
  }

  render() {
    if (this.state.categoryReport) {
      return CategoryReport({data: this.state.categoryReport, handleClose: this.handleClose.bind(this)});
    }
    const headerData = {
      category: 'CATEGORIES',
      sum1: 'M 0',
      sum2: 'M-1',
      sum3: 'M-1',
    };
    const header = buildRow()(headerData);

    const rows = this.state.data.map(buildRow(this.handleExpand.bind(this)));

    return Div('div--scrollable table__wrapper', header + rows.join(''), this.id);
  }
}