// Main JS file
import { application, RComponent } from "./framework/RComponent";
import EntityAPI from "./servers/entity";

// Legacy components
import Toast from "./components/toast.js";
import StackTrace from "./html/stackTrace.js";

// React components
import FinanceForm from "./busCompts/financeForm";
import GenericTable from "./busCompts/genericTable.js";
import LiabilityForm from "./busCompts/liabilityForm";
import LiabilityReport from "./busCompts/liabilityReport";
import BlogPage from "./busCompts/blogPage";
import WishListForm from "./busCompts/wishListForm.js";
import LogInForm from "./busCompts/logInForm.js";
import TesseractFileReaderForm from "./busCompts/tesseractFileReaderForm.js";

// Create React root
const reactRoot = ReactDOM.createRoot(document.getElementById('app'));

window.application = application;

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

    return (<div className="form-date">{`${strDay}/${strMonth}`}</div>);
  },
  amount: (row) => {
    const isIncome = (row.provider && row.direction) || (row.cashflowId && !row.liability);
    let content = '';
    if (typeof row.amount === 'number') {
      content = row.amount.toFixed(2);
    } else {
      content = '--';
    }
    return (<div className={"cashflowAmount" + (isIncome ? ' income' : ' expense')}>{content}</div>);
  },
};

window.app = {};

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
    const props = {
      id: 'liabilityTable',
      entity: 'liability',
      handleSelect,
      idEditComponent: 'liabilityForm',
      buildEditComponent: (props) => <LiabilityForm {...props} />,
      formatter: {
        ...commonFormatters,
        provider: (row) => {
          const found = res.find(cf => cf.elementId === row.cashflowId);
          const str = found ? found.provider : '';
          let content = '';
          if (typeof str === 'string') {
            content = str.length > 17 ? str.substring(0, 15) + '...' : str;
          } else {
            content = 'error: invalid provider';
          }
          return (<div className="cashflowProvider">{content}</div>);
        },
      },
      header: (props) => <LiabilityReport {...props} {...repProps} />
    };
    reactRoot.render(<GenericTable {...props} />);
  });
}

