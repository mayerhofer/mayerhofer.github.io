import React from "react";
import { createRoot } from "react-dom/client";
import { PageProvider, usePage } from "./hooks/usePage";
import { ToastProvider } from "./hooks/useToast";
import Toast from "./components/toast";
import Menu from "./busCompts/menu";
import FinanceForm from "./busCompts/financeForm";
import GenericTable from "./busCompts/genericTable";
import LiabilityForm from "./busCompts/liabilityForm";
import LiabilityReport from "./busCompts/liabilityReport";
import BlogPage from "./busCompts/blogPage";
import WishListForm from "./busCompts/wishListForm";
import LogInForm from "./busCompts/loginPage";
import StackTrace from "./html/stackTrace";
import TesseractFileReaderForm from "./busCompts/tesseractForm";
// Add other imports as needed

const commonFormatters = {
  date: (row) => {
    let obj = new Date(row.date);
    let day = obj.getDate();
    let month = obj.getMonth();
    let strDay = day < 10 ? '0' + day.toString() : day.toString();
    let strMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month];

    return (<div key={`${row.elementId}-date`} className="form-date">{`${strDay}/${strMonth}`}</div>);
  },
  amount: (row) => {
    const isIncome = (row.provider && row.direction) || (row.cashflowId && !row.liability);
    let content = '';
    if (typeof row.amount === 'number') {
      content = row.amount.toFixed(2);
    } else {
      content = '--';
    }
    return (<div key={`${row.elementId}-amount`} className={"cashflowAmount" + (isIncome ? ' income' : ' expense')}>{content}</div>);
  },
};

const CashflowsReport = () => {
    const rangeDate = new Date(2024, 3, 1);
    rangeDate.setMonth(rangeDate.getMonth() - 1);
    const [year, setYear] = React.useState(rangeDate.getFullYear());
    const [month, setMonth] = React.useState(rangeDate.getMonth());

    const handleAdd = (delta) => {
        let newDate = new Date(year, month + delta, 1);
        setMonth(newDate.getMonth());
        setYear(newDate.getFullYear());
    };

    return (
        <div>
            <button type="button" className="table__header-add" onClick={() => handleAdd(-1)}><span>&lt;</span></button>
            {year}-{month + 1}
            <button type="button" className="table__header-add" onClick={() => handleAdd(1)}><span>&gt;</span></button>
            <GenericTable
                entity="cashflow"
                id="cfMainTable"
                filter={{year, month}}
                idEditComponent="fincForm"
                buildEditComponent={(props) => <FinanceForm {...props} />}
                formatter={{
                    ...commonFormatters,
                    provider: (row) => {
                        const str = row.provider;
                        let content = '';
                        if (typeof str === 'string') {
                          content = str.length > 17 ? str.substring(0, 15) + '...' : str;
                        } else {
                          content = 'error: invalid provider';
                        }
                        return (<div key={`${row.elementId}-provider`} className="cashflowProvider">{content}</div>);
                    },
                    }} />
        </div>
    );
}

const errorLogFormatter = {
  time: (row) => {
    const addZero = num => num < 10 ? '0' + num.toString() : num.toString();
    const obj = new Date(row.time);
    const minutes = addZero(obj.getMinutes());
    const hour = addZero(obj.getHours());
    const day = addZero(obj.getDate());
    const month = addZero(obj.getMonth() + 1);

    return (
      <div className={"form-date" + (row.type === 'error' ? ' expense' : 'income')}>
        {`${day}/${month}`}<BR />{`${hour}:${minutes}`}
      </div>);
  },
  message: (row) => {
    return (<div className="longtext"><span>{row.message}</span></div>);
  },
  stackTrace: (row) => {
    return (<StackTrace id={row._id} key={row._id} content={row.stackTrace.split('\n    ').map(line => (<span>{line}<BR /></span>))} />);
  }
}

// Page component: renders the correct page based on activePage
function Page() {
  const { activePage } = usePage();

  // You can expand this logic to fetch data as needed
  switch (activePage) {
    case "Finance":
    case "finance":
      return <CashflowsReport />;
    case "Liability":
    case "liability":
      return (
        <GenericTable
          entity="liability"
          id="liabilityTable"
          idEditComponent='liabilityForm'
          buildEditComponent={(props) => <LiabilityForm {...props} />}
          header={(props) => <LiabilityReport {...props} />}
          formatter={{
            ...commonFormatters,
            provider: (row) => {
              const str = row.cashflowProvider;
              let content = '';
              if (typeof str === 'string') {
                content = str.length > 17 ? str.substring(0, 15) + '...' : str;
              } else {
                content = 'error: invalid provider';
              }
              return (<div key={`${row.elementId}-provider`} className="cashflowProvider">{content}</div>);
            },
          }} />);
    case "Finance Report":
    case "financeReport":
      return <GenericTable entity="report" id="finReport" formatter={{
        category: row => (<div key={`${row.elementId}-provider`} className="cashflowProvider">{row.category}</div>),
        sum1: row => (<div key={`${row.elementId}-amount1`} className="cashflowAmount">{row.sum1}</div>),
        sum2: row => (<div key={`${row.elementId}-amount2`} className="cashflowAmount">{row.sum2}</div>),
        sum3: row => (<div key={`${row.elementId}-amount3`} className="cashflowAmount">{row.sum3}</div>),
      }} />;
    case "Blog":
    case "blog":
      return <BlogPage />;
    case "Wish List":
    case "wishlist":
      return (
        <GenericTable 
          entity="wish" 
          id="wishListTable" 
          buildEditComponent={(props) => <WishListForm {...props} />}
          formatter={{
            date: commonFormatters.date,
            what: (row) => (<div className="cashflowProvider">{row.what}</div>),
          }} />);
    case "Error Log":
    case "errors":
      return <GenericTable entity="errorLog" id="logMainTable" formatter={errorLogFormatter} />;
    case "Import Receipt":
    case "tesseract":
      return <TesseractFileReaderForm />;
    case "Log In":
    case "login":
      return <LogInForm />;
    default:
      return <div>Welcome to Money Manager!</div>;
  }
}

function App() {
  return (
    <ToastProvider>
      <PageProvider initialPage="finance">
        <Menu />
        <Toast />
        <div className="wrapper">
          <div className="content">
            <div id="app-content">
              <Page />
            </div>
          </div>
          <div className="footer">
            <div className="copyright">Copyright 2022 Mayerhofer IT | All Rights Reserved</div>
          </div>
        </div>
      </PageProvider>
    </ToastProvider>
  );
}

const root = createRoot(document.getElementById("app"));
root.render(<App />);
