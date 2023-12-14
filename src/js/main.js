// Main JS file
import { application, RComponent } from "./framework/RComponent";
import EntityAPI from "./servers/entity";

// components
import FinanceForm from "./busCompts/financeForm";
import GenericTable from "./busCompts/genericTable.js";
import LiabilityForm from "./busCompts/liabilityForm";
import LiabilityReport from "./busCompts/liabilityReport";
import Toast from "./components/toast.js";
import Div from "./html/div.js";
import StackTrace from "./html/stackTrace.js";
import DateField from "./html/dateField.js";
import Button from "./html/button.js";
import Image from "./html/image.js";

window.application = application;

// Page - Components - End Liability Report 
/////////////////////////////////////////////
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
    api.save(saveObj);
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
    const dateValue = this.state.date.toISOString().split('T')[0];
    const date = DateField(this.id + 'Date', 'Date', dateValue, this.handleUpdateDate.bind(this));
    const labels = this.fill('labelsField', labelProps);
    
    const whatProps = buildProps('What');

    const save = Button('form-button', Image('save'), this.id + 'Save', this.handleSave.bind(this));
    const actionButtons = Div('buttons', save, this.id + 'ActionButtons');

    this.registerHandler(this.id + 'Labels', this.handleLabelChange.bind(this));

    return Div('page', actionButtons + date + buildTb(whatProps) + labels, this.id);
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

    return Div('form-date', `${strDay}/${strMonth}`);
  },
  amount: (row) => {
    const isIncome = (row.provider && row.direction) || (row.cashflowId && !row.liability);
    let content = '';
    if (typeof row.amount === 'number') {
      content = row.amount.toFixed(2);
    } else {
      content = '--';
    }
    return Div('cashflowAmount' + (isIncome ? ' income' : ' expense'), content);
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
        return Div('cashflowProvider', content);
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

        return Div('form-date' + (row.type === 'error' ? ' expense' : 'income'), `${day}/${month}<BR />${hour}:${minutes}`);
      },
      message: (row) => {
        return Div('longtext', `<span>${row.message}</span>`);
      },
      stackTrace: (row) => {
        return StackTrace(row._id, row.stackTrace.replace(new RegExp('\n    ', 'g'), '<BR />'));
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

    api.save(element).then(res => {
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
          return Div('cashflowProvider', content);
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
      category: row => { return Div('cashflowProvider', row.category); },
      sum1: row => { return Div('cashflowAmount', row.sum1); },
      sum2: row => { return Div('cashflowAmount', row.sum2); },
      sum3: row => { return Div('cashflowAmount', row.sum3); },

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
        return Div('cashflowProvider', row.what);
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
