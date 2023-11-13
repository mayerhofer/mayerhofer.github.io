import { RComponent } from "../framework/RComponent";
import EntityAPI from "../servers/entity";

export default class LiabilityReport extends RComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      cashflows: [],
    };
  }

  componentDidMount() {
    const cfApi = new EntityAPI("cashflow");
    const self = this;
    const filter = {
      year: (new Date()).getFullYear(),
      month: (new Date()).getMonth(),
    };
    cfApi.get(filter).then(data => {
      const result = data.filter(cf => self.props.data.find(l => l.cashflowId === cf.elementId));
      self.setState({cashflows: result});
    });
  }

  getCf(liability) {
    return this.state.cashflows.find(cf => cf.elementId === liability.cashflowId);
  }

  render() {
    // a = array of debtors. b = liability object.
    const self = this;
    const report = this.props.data.reduce((a, b) => {
      let row = a.find(obj => obj.debtor === b.source && obj.currency === self.getCf(b)?.currency);
      if (! row) {
        a.push({
          debtor: b.source,
          credit: b.liability ? 0 : b.amount,
          debit: b.liability ? b.amount : 0,
          currency: self.getCf(b)?.currency,
        });
      } else {
        if (b.liability) {
          row.debit += b.amount;
        } else {
          row.credit += b.amount;
        }
      }
      return a;
    }, []);
    report.forEach(row => {
      row.debit = Math.round(100 * row.debit) / 100;
      row.credit = Math.round(100 * row.credit) / 100;
    });
    const fields = {
      id: this.id,
      className: 'liabilityReport',
      content: report.map(k => this.fill('liabRepRow', k))
    };
    return this.fill('liabilityReport', fields);
  }
}
