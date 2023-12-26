const StateUtil = (function () {
  let _val;
  function useState(initVal) {
    const state = _val || initVal;
    console.log("useState called");
    const setState = (newVal) => (_val = newVal); //setter function
    return [state, setState];
  }

  return { useState, render };
})();

export default StateUtil;
