import { RComponent } from "../framework/RComponent";
import EntityAPI from "../servers/entity";
import Div from "../html/div";
import Button from "../html/button";
import Image from "../html/image";

export default class GenericTable extends RComponent {
  // props: {
  //   entity: string;
  //   handleAdd: (data) => void;
  //   handleEdit: (row) => void;
  //   formatter: object; // (fields except mandatory date and elementId)
  // }
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      start: 0,
      end: 15,
      editing: null,
      increment: 15,
      showEdit: false,
      formatter: props.formatter,
    };
  }

  componentDidMount() {
    const api = new EntityAPI(this.props.entity);
    const self = this;
    
    api.get(this.props.filter).then(data => {
      // At the very least sort by date descending to present meaninful information right on top.
      // Should always have the most recent cashflows so next(elementId) can be passed to CREATE form.
      if (Array.isArray(data) && data.length > 0 && typeof data[0].date === 'number') {
        data.sort((a,b) => {
          return ((new Date(b.date)).getTime() - (new Date(a.date)).getTime())
        });
      }
      self.setState({data});
    });
  }

  handleDelete(element) {
    if (confirm('Delete?')) {
      const api = new EntityAPI(this.props.entity);
      const tableSelf = this;

      api.delete(element).then(() => {
        if (tableSelf.props.entity === 'cashflow') {
          const lApi = new EntityAPI('liability');
          lApi.get().then(res => {
            const found = res.find(l => l.cashflowId === element.elementId);
            if (found) {
              lApi.delete(found);
            }
          });
        }
        tableSelf.setState({...tableSelf.state, data: tableSelf.state.data.filter(ele => ele !== element)});
      });
    }
  }
  handleEdit(element) {
    this.setState({showEdit: true, editing: element});
  }
  handleSelect(element) {
    if (typeof this.props.handleSelect === 'function') {
      this.props.handleSelect(element, this.handleRemoveRow.bind(this));
    }
  }
  handleBack() {
    const inc = this.state.increment;
    this.setState({start: this.state.start - inc, end: this.state.end - inc});
  }
  handleForw() {
    const inc = this.state.increment;
    this.setState({start: this.state.start + inc, end: this.state.end + inc});
  }
  handleSaveOne(one) {
    const elements = this.state.data;
    const found = elements.find(o => o._id === one._id);
    if (found) {
      elements[elements.indexOf(found)] = one;
    } else {
      elements.unshift(one);
      elements.sort((a,b) => {
        return ((new Date(b.date)).getTime() - (new Date(a.date)).getTime())
      });
    }
    this.setState({data: elements});
  }
  handleClose() {
    this.setState({showEdit: false, editing: null});
  }

  handleRemoveRow(elementId) {
    this.setState({...this.state, data: this.state.data.filter(ele => ele.elementId !== elementId)});
  }

  buildCell(key, row, formatter) {
    return formatter[key](row);
  }

  rowToHtml(row) {
    const formatter = this.state.formatter;
    const fields = Object.keys(formatter).map(key => this.buildCell(key, row, formatter));

    let actionButtons = '';
    if (typeof this.props.buildEditComponent === 'function') {
      const editBtn = Button('act-btn', Image('edit'), this.id + 'EditBtn' + row.elementId, () => this.handleEdit.bind(this)(row));
      const delBtn = Button('act-btn', Image('delete'), this.id + 'DelBtn' + row.elementId, () => this.handleDelete.bind(this)(row));
      const selBtn = Button('act-btn', Image('select'), this.id + 'SelBtn' + row.elementId, () => this.handleSelect.bind(this)(row));

      actionButtons = Div('actions-wrapper', selBtn + editBtn + delBtn);
    }

    return Div('table__row', fields.join('') + actionButtons);
  }

  render() {
    if (this.state.showEdit) {
      const handleSave = this.handleSaveOne.bind(this);
      const scrollContent = this.buildRComponent({id: this.props.idEditComponent, handleSave, handleClose: this.handleClose.bind(this), data: this.state.data, element: this.state.editing}, this.props.buildEditComponent);
      const content = Div('div--scrollable', scrollContent, this.id + 'content');

      return Div('table__wrapper', content, this.id);
    } else {
      const rows = this.state.data.slice(this.state.start, this.state.end).map(this.rowToHtml.bind(this));
      const content = Div('table__wrapper', rows.join(''), this.id + 'content');
      const label = Div('table__header-label', (new Date()).toISOString().substring(0, 10));
      const count = Div('table__header-label', this.state.data.length + ': ' + (this.state.start +1) + '-' + (this.state.end > this.state.data.length ? this.state.data.length : this.state.end));
      const backwards = Button('table__header-add', '<span>&lt;</span>', this.id + 'Backwards', this.handleBack.bind(this), this.state.start === 0);
      const forwards = Button('table__header-add', '<span>&gt;</span>', this.id + 'Forwards', this.handleForw.bind(this), this.state.start + 16 >= this.state.data.length);
      const section = this.state.data && typeof this.props.header === 'function' ? this.buildRComponent({ id: this.id + "Header", data: this.state.data }, this.props.header) : '';
      let button = '';
      if (typeof this.props.buildEditComponent === 'function') {
        button = Button('table__header-add', '<span>+</span>', this.id +'AddNew' + this.props.entity, () => this.handleEdit.bind(this)());
      }
      const header = Div('table__header', label + count + backwards + forwards + button);

      return Div('div--scrollable', section + header + content, this.id);
    }
  }
}
