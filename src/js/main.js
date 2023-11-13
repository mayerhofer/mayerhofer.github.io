// Main JS file
import { application, RComponent } from "./framework/RComponent";
import { images64 } from "./templates";
import EntityAPI from "./servers/entity";

// components
import FinanceForm from "./busCompts/financeForm";
import LiabilityForm from "./busCompts/liabilityForm";
import LiabilityReport from "./busCompts/liabilityReport";
import Toast from "./components/toast.js";

window.application = application;

// Page - Components - End Liability Report 
/////////////////////////////////////////////
/////////////////////////////////////////////
// Page - Business Components - Generic Data Table
class GenericTable extends RComponent {
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
    const content = this.fill('scrollDiv', {
      id: this.id + 'content', 
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

    return this.fill('div', {id: this.id, className: 'table__wrapper', content: section + header + content });
  }
  }
}
// Page - Business Components - End Generic Data Table
/////////////////////////////////////////////
class FileForm extends RComponent {
  constructor(props) {
    super(props);
  }
  handleInputFileChange(e) {
    console.log(e)
    var file = e.files[0];

    Tesseract.recognize(
      file,
      'cat',
      { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
      const re = new RegExp(/(0?[1-9]|[12][0-9]|3[01])[.\/\-](0?[1-9]|1[012])[.\/\-](\d{4}|\d{2})/);
      const datesFound = text.match(re);
      if (datesFound) {
        console.log('Date: ' + datesFound[0]);
      }
      console.log(text);
    });
  }
  render() {
    this.registerHandler("myTesseractFile", (e) => this.handleInputFileChange.bind(this)(e));
    return this.fill('tesseractForm', {id: "myTesseractFile" /*this.id*/});
  }
}
// ///////////////////////////////////////////
// Page - Components - BlogPage
class BlogPage extends RComponent {
  constructor(props) {
    super(props);
  }

  render() {
    let posts = this.props.posts.map(post => this.fill('blogPost', post));
	  
    return this.fill('blogContainer', { children: posts });
  }
}

/////////////////////////////////////////////
// Page - Components - LogInForm
class LogInForm extends RComponent {
  constructor(props) {
    super(props);

    this.state = {
      countryUrl: '',
      entityUrl: ''
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  handleCountryUrlUpdate(e) {
    try {
      if (localStorage) {
        localStorage.setItem("countryUrl", e.value);
        this.setState({countryUrl: e.value});
      } else {
        alert(" no local storage ");
        window.myStorage = Object.assign({}, {countryUrl: e.value}, window.myStorage);
      }
      alert("country updated: " + e.value);
    } catch (ex) {
      alert(ex.message);
    }
  }
  handleEntityUrlUpdate(e) {
    try {
      if (localStorage) {
        localStorage.setItem("entityUrl", e.value);
        this.setState({entityUrl: e.value});
        
      } else {
	alert(" no local storage ");
        window.myStorage = Object.assign({}, {entityUrl: e.value}, window.myStorage);
      }
      alert("entity update: " + e.value);
    } catch (ex) {
      alert(ex.message);
    }
  }

  handleLogIn(e) {
    e.preventDefault();

    localStorage.setItem("countryUrl", this.state.countryUrl);
    localStorage.setItem("entityUrl", this.state.entityUrl);
  }

  render() {
    this.registerHandler(this.id + 'CountryChange', this.handleCountryUrlUpdate.bind(this));
    this.registerHandler(this.id + 'EntityChange', this.handleEntityUrlUpdate.bind(this));
    this.registerHandler(this.id + 'Submit', this.handleLogIn.bind(this));
	  
    return this.fill('LogInForm', {id: this.id});
  }
}

// ///////////////////////////////////////////
// Page - Components - Wish List Form
class WishListForm extends RComponent {
  constructor(props) {
    super(props);

    if (typeof (this.props.element) === 'object') {
      this.isEditMode = true;
    } else if (Array.isArray(this.props.data)) {
      this.isEditMode = false;
    } else {
      throw 'Missing prop cashflow array or cashflow element';
    }

    this.state = {
      nextElementId: this.isEditMode ? this.props.element.elementId : this.props.data.length > 0 ?
        this.props.data.map(d => d.elementId).filter(id => id > 0).sort((a,b)=>a-b).pop() + 1 : 1,
      date: this.isEditMode ? new Date(props.element.date) : new Date(),
      what: this.isEditMode ? props.element.what : '',
      labels: this.isEditMode ? [props.element.label] : [''],
      validationState: {
        what: {
          validDef: {
            required: true,
            restricted: false,
          },
        },
        labels: {
          validDef: {
            required: true,
            restricted: true,
            options: props.labelOptions,
          },
        },
      },
    };
  }

  handleUpdateDate(e) {
    this.setState({date: new Date(e.value)});
  }
  handleWhatChange(what) {
    this.setState({what});
  }
  handleLabelChange(e) {
    this.setState({labels: [e.value]});
  }

  handleSave() {
    const dt = this.state.date;
    const id = this.state.nextElementId;
    const element = {
      date: Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate()),
      what: this.state.what,
      label: this.state.labels.length > 0 ? this.state.labels[0] : '',
      elementId: id,
    };
    const saveObj = this.isEditMode ? Object.assign({}, this.props.element, element) : element;

    //log('info', {message: 'Saving cashflow', stackTrace: element.provider });

    const api = new EntityAPI('wish');
    if (this.isEditMode) {
      api.update(saveObj);
    } else {
      api.insert(saveObj);
    }
  }

  render() {
    // Util Functions
    const buildTb = props => this.buildRComponent(props, p => new TextField(p));
    const buildProps = label => {
      return {
        id: this.id + label,
        label,
        value: this.state[label.toLowerCase()],
        validDef: this.state.validationState[label.toLowerCase()].validDef,
        update: this[`handle${label}Change`].bind(this),
      };
    };

    const labelImgArray = labelImages.map(label => 
      this.fill('labelField', {id: this.id + 'Labels', checked: Array.isArray(this.state.labels) && this.state.labels.indexOf(label.label) >= 0 ? 'checked' : '', ...label}));
      
    const labelProps = {
      id: this.id + 'Labels',
      content: labelImgArray.slice(0, 7).join('') + '</ul><ul class="direction">' + labelImgArray.slice(7).join(''),
    };
    const date = this.fill('dateTextField', {id: this.id + 'Date', label: 'Date', value: this.state.date.toISOString().split('T')[0]});
    const labels = this.fill('labelsField', labelProps);
    
    const whatProps = buildProps('What');

    const save = this.fill('imgButton', {id: this.id + 'Save', disabled: '', className: 'financeSave', img: "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAADt0lEQVRoge2YvWsUQRjGn9m7fBg/iJLEJo2NAbFRtPQfSCEpFOwshPSpYhMUq4CojQr+C4JRCyWNgqAgsVUkhSAYNGcgGtDkEnPvY7E7u7Ozs7O3J5tEuBfm9m5m7+b3zPsxswd0rWtd69pumsobOPNydZxUD0iMEgBArC4343FuNfH+wgigFBQAAgAJkhDzKgIRQihgdBUhRAQtEUjciImFLdQOHflJUTc+TgzfaUdAkDdgw4eEaQthjGbAkwQluoIgEfUjHgeTn6Z+JQahePvE48b1dgTU8wWk4R38EAknVUqFq48IDkjgjXb6/uvU999cORuCh6pAPQkBUera2JPv/YsTI1d9AvI9YMO7PCAShopefQ0tAjJsYngiu0g0vJJMrN8qcnpsrjHbkYAieAARtBlCOr6ZhJMkYZUvIAkpJoORCkwfn1ueKi+gAB5AnHy6UYuwhNArQIcdM/B6fgU1k8eQnwMWvBNAomlVci9jz6UTVkSyC2B7wAEfdR0uLaAIHgg9EMInChjNbMLrkpqZglFZjUPICQ9fGOQLKIAHwhW0XaXvTycoQWY9YFaqsKKVgy8UYMK7dLjCwtzQ4rKakwM6V2jc74T3aPDsA354qADL6y2M9CebuZmEjPMgaa8unzIqk8QeEApWmoxxbHifDzxl1IInEAQJrKr34OaHJr6tb2eOBa24pEqmUqXKrYbfIO59DhD07XPDd+IBGx4A+g/UsPGrBQoBpfDu9wAuvf0DcLtoHbRsADVHt0JvXx1BX28peK8AG54g6vUABweDdEix1wgde9L08SCvziddbvjOQ8iq7Slh0YcdgfdUQu9OvNfh/QL+A3ivgL0E79NRHEJ7GN4vYC/Be0QUl1EL/txQD2ZODmCkT8UPNOaJ0/fZPPfYfY2m4NanGhbWggw8PQoKd2J75f8dPtsvIhjqIaaObZeCB4pOo46wqQJevx/qsUPRjC23eZLYHfNVwacfatqD9wrIS9gq4ZPn4jR8Z2XUAR9Wm+rgRaQUvF9ATqmsFJ7l4L0C8up8lfA6hGx4epQU7sSZTapCeA3aLrxfgAseqBQ+bO3DFwjIwusfrQre/JMgBd9JFXLBo2L4JITS8D4/FJbRr4/m0Xj4NDmYVQhv5sGP+RdYe/bcKiZlBETKg9YmatubumtH4GHOW6DA99/oEoDRoxfPx/Ag0GgSw73VwK9sqXjyQ+Pj8aQkvpT2gBCT+ovmIswutrDclErg7y7ttzbQEF4UJ3Nd0LWuda1ru2p/ASsCdZ0lM904AAAAAElFTkSuQmCC"});
    const actionButtonProps = {id: this.id + 'ActionButtons', className: 'buttons', content: [save].join('')};
    const actionButtons = this.fill('simplediv', actionButtonProps);

    this.registerHandler(this.id + 'Labels', this.handleLabelChange.bind(this));
    this.registerHandler(this.id + 'Save', this.handleSave.bind(this));
    this.registerHandler(this.id + 'Date', this.handleUpdateDate.bind(this));

    const containerProps = {
      id: this.id, 
      className: 'page', 
      content: [actionButtons, date, buildTb(whatProps), labels].join(''),
    };
    return this.fill('container', containerProps);
  }
}

// Page - Components - End Wish List Form
/////////////////////////////////////////////
/////////////////////////////////////////////
// Page - Components - Modal


/*{ADDED_CODE}*/
/////////////////////////////////////////////
// Page - Menu Loaders

const commonFormatters = {
  date: (row) => {
    let obj = new Date(row.date);
    let day = obj.getDate();
    let month = obj.getMonth();
    let strDay = day < 10 ? '0' + day.toString() : day.toString();
    let strMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month];

    return {tagName: 'simplediv', className: 'form-date', content: `${strDay}/${strMonth}`};
  },
  amount: (row) => {
    const isIncome = (row.provider && row.direction) || (row.cashflowId && !row.liability);
    let content = '';
    if (typeof row.amount === 'number') {
      content = row.amount.toFixed(2);
    } else {
      content = '--';
    }
    return {tagName: 'simplediv', className: 'cashflowAmount' + (isIncome ? ' income' : ' expense'), content};
  },
};

window.app = {};

window.app.loadBlog = function() {
  const postApi = new EntityAPI('post');
  postApi.get().then(posts => {
    RComponent.buildRoot({id: 'blog', posts}, p => new BlogPage(p));
  });
};

window.app.loadFinance = function() {
  // Register root node
  const props = {
    id: 'cfMainTable',
    entity: 'cashflow',
    filter: {
      year: (new Date()).getFullYear(),
      month: (new Date()).getMonth(),
    },
    idEditComponent: 'fincForm',
    buildEditComponent: p => new FinanceForm(p),
    formatter: {
      ...commonFormatters,
      provider: (row) => {
        const str = row.provider;
        let content = '';
        if (typeof str === 'string') {
          content = str.length > 17 ? str.substring(0, 15) + '...' : str;
        } else {
          content = 'error: invalid provider';
        }
        return {tagName: 'simplediv', className: 'cashflowProvider', content};
      },
    },
  };

  RComponent.buildRoot(props, p=>new GenericTable(p));
}

window.app.loadErrors = function() {
  // Register root node
  RComponent.buildRoot({
    id: 'logMainTable',
    entity: 'errorLog',
    formatter: {
      time: (row) => {
        const addZero = num => num < 10 ? '0' + num.toString() : num.toString();
        const obj = new Date(row.time);
        const minutes = addZero(obj.getMinutes());
        const hour = addZero(obj.getHours());
        const day = addZero(obj.getDate());
        const month = addZero(obj.getMonth() + 1);

        return {
          tagName: 'simplediv',
          className: 'form-date' + (row.type === 'error' ? ' expense' : 'income'), 
          content: `${day}/${month}<BR />${hour}:${minutes}`
        };
      },
      message: (row) => {
        return {tagName: 'simplediv', className: 'longtext', content: `<span>${row.message}</span>`};
      },
      stackTrace: (row) => {
        return {
          id: row._id,
          tagName: 'showStackTrace',
          className: 'btn-trace',
          content: row.stackTrace.replace(new RegExp('\n    ', 'g'), '<BR />')
        };
      }
    },
  }, p=>new GenericTable(p));
}

window.app.loadLiability = function() {
  const handleSelect = (element, removeHandler) => {
    if (typeof element !== 'object')
      return;
    if (typeof removeHandler !== 'function')
      return;
    const api = new EntityAPI('liability');
    element.payed = true;
    element.updated = (new Date()).getTime();

    api.update(element).then(res => {
      removeHandler(element.elementId);
      (new Toast({id: 'Toast' + element.elementId, type: 'info', header: 'Payed liability', text: `CF id: ${element.cashflowId}, amount: ${element.amount}`})).render();
    });
  }
  const repProps = {
    id: 'liabilityReport'
  };
  const cfApi = new EntityAPI('cashflow');
  cfApi.get({
    year: (new Date()).getFullYear(),
    month: (new Date()).getMonth(),
  }).then(res => {
    RComponent.buildRoot({
      id: 'liabilityTable',
      entity: 'liability',
      handleSelect,
      idEditComponent: 'liabilityForm',
      buildEditComponent: p => new LiabilityForm(p),
      formatter: {
        ...commonFormatters,
        provider: (row) => {
          //console.log(res)
          const found = res.find(cf => cf.elementId === row.cashflowId);
          const str = found ? found.provider : '';
          let content = '';
          if (typeof str === 'string') {
            content = str.length > 17 ? str.substring(0, 15) + '...' : str;
          } else {
            content = 'error: invalid provider';
          }
          return {tagName: 'simplediv', className: 'cashflowProvider', content};
        },
      },
      header: p => new LiabilityReport(Object.assign({}, p, repProps))
    }, p => new GenericTable(p));
  });
}

window.app.loadFinanceReport = function() {
  RComponent.buildRoot({
    id: 'finReport',
    entity: 'report',
    formatter: {
      category: row => { return { tagName: 'simplediv', className: 'cashflowProvider', content: row.category }; },
      sum1: row => { return { tagName: 'simplediv', className: 'cashflowAmount', content: row.sum1 }; },
      sum2: row => { return { tagName: 'simplediv', className: 'cashflowAmount', content: row.sum2 }; },
      sum3: row => { return { tagName: 'simplediv', className: 'cashflowAmount', content: row.sum3 }; },

    }
  }, p => new GenericTable(p));
}

window.app.login = function() {
  // Register root node
  const handleEdit = (data, element) => {
    RComponent.buildRoot({id: 'wishListForm', data, element}, p => new WishListForm(p));
  };
  RComponent.buildRoot({
    id: 'loginForm',
  }, p=>new LogInForm(p));
}

window.app.loadWishlist = function() {
  // Register root node
  const handleEdit = (data, element) => {
    RComponent.buildRoot({id: 'wishListForm', data, element}, p => new WishListForm(p));
  };
  RComponent.buildRoot({
    id: 'wishListTable',
    entity: 'wish',
    handleEdit,
    formatter: {
      date: commonFormatters.date,
      what: (row) => {
        return {tagName: 'simplediv', className: 'cashflowProvider', content: row.what};
      },
    },
  }, p=>new GenericTable(p));
}

window.app.loadTesseract = function() {
  RComponent.buildRoot({
    id: 'tesseractForm',
    entity: 'tesseract',
    formatter: commonFormatters,
  }, p => new FileForm(p));
}

const handleTesseractSubmitFile = function() {
  alert('handling tesseract file')
  let img = document.getElementById("myTesseractFile").files[0];
  //let fullPath = document.getElementById("myTesseractFile").val();
  console.log(img.mozFullPath)

  Tesseract.recognize(
    img, //'https://tesseract.projectnaptha.com/img/eng_bw.png',
    'cat',
    { logger: m => console.log(m) }
  ).then(({ data: { text } }) => {
    console.log(text);
  })

  return false;
}
