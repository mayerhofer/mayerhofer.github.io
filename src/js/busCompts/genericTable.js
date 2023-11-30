import { RComponent } from "../framework/RComponent";
import { images64 } from "../templates";
import EntityAPI from "../servers/entity";

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
  handleInsertOne(one) {
    const cfs = this.state.data;
    cfs.unshift(one);
    this.setState({data: cfs});
  }
  handleUpdateOne(one) {
    const cfs = this.state.data;
    const found = cfs.find(o => o._id === one._id);
    if (found) {
      cfs[cfs.indexOf(found)] = Object.assign({}, one);
      this.setState({data: cfs});
    }
  }
  handleClose() {
    this.setState({showEdit: false, editing: null});
  }

  handleRemoveRow(elementId) {
    this.setState({...this.state, data: this.state.data.filter(ele => ele.elementId !== elementId)});
  }

  buildCell(key, row, formatter) {
    const format = formatter[key](row);

    return this.fill(format.tagName, format);
  }

  rowToHtml(row) {
    const formatter = this.state.formatter;
    const fields = Object.keys(formatter).map(key => this.buildCell(key, row, formatter));

    let buttons = '';
    if (typeof this.props.buildEditComponent === 'function') {
      const editImg = this.fill('image', {img: images64['edit']});
      const editBtn = this.fill('button', {id: this.id + 'EditBtn' + row.elementId, className: 'act-btn', content: editImg});
      const delBtn = this.fill('button', {id: this.id + 'DelBtn' + row.elementId, className: 'act-btn', content: this.fill('image', {img: images64['delete']})});
      const selBtn = this.fill('button', {id: this.id + 'SelBtn' + row.elementId, className: 'act-btn', content: this.fill('image', {img: images64['select']})});

      this.registerHandler(this.id + 'EditBtn' + row.elementId, () => this.handleEdit.bind(this)(row));
      this.registerHandler(this.id + 'SelBtn' + row.elementId, () => this.handleSelect.bind(this)(row));

      buttons = selBtn + editBtn + delBtn;
    }
    const actionButtons = this.fill('simplediv', {className: 'actions-wrapper', content: buttons});

    this.registerHandler(this.id + 'DelBtn' + row.elementId, () => this.handleDelete.bind(this)(row));

    return this.fill('simplediv', {className: 'table__row', content: fields.join('') + actionButtons});
  }

  render() {
    if (this.state.showEdit) {
      const handleInsert = this.handleInsertOne.bind(this);
      const handleUpdate = this.handleUpdateOne.bind(this);
      const content = this.fill('scrollDiv', {
        id: this.id + 'content', 
        content: this.buildRComponent({id: this.props.idEditComponent, handleInsert, handleUpdate, handleClose: this.handleClose.bind(this), data: this.state.data, element: this.state.editing}, this.props.buildEditComponent)
      });

      return this.fill('div', {id: this.id, className: 'table__wrapper', content: content });
    } else {
      const content = this.fill('div', {
        id: this.id + 'content',
        className: 'table__wrapper',
        content: this.state.data.slice(this.state.start, this.state.end).map(this.rowToHtml.bind(this)).join(''),
      });
      const label = this.fill('simplediv', {className: 'table__header-label', content: (new Date()).toISOString().substring(0, 10)});
      const count = this.fill('simplediv', {className: 'table__header-label', content: this.state.data.length + ': ' + (this.state.start +1) + '-' + (this.state.end > this.state.data.length ? this.state.data.length : this.state.end)});
      const backwards = this.fill('button', {id: this.id + 'Backwards', className: 'table__header-add' + (this.state.start === 0 ? ' disabled' : ''), content: '<span>&lt;</span>'});
      const forwards = this.fill('button', {id: this.id + 'Forwards', className: 'table__header-add' + (this.state.start + 16 >= this.state.data.length ? ' disabled' : ''), content: '<span>&gt;</span>'});
      const section = this.state.data && typeof this.props.header === 'function' ? this.buildRComponent({ id: this.id + "Header", data: this.state.data }, this.props.header) : '';
      let button = '';
      if (typeof this.props.buildEditComponent === 'function') {
        const buttonId = this.id +'AddNew' + this.props.entity;
        button = this.fill('button', {id: buttonId, className: 'table__header-add', content: '<span>+</span>'});

        this.registerHandler(buttonId, () => this.handleEdit.bind(this)());
      }
      const header = this.fill('simplediv', {className: 'table__header', content: label + count + backwards + forwards + button});

      this.registerHandler(this.id + 'Backwards', () => this.handleBack.bind(this)());
      this.registerHandler(this.id + 'Forwards', () => this.handleForw.bind(this)());

      return this.fill('div', {id: this.id, className: 'div--scrollable', content: section + header + content });
    }
  }
}
