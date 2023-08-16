import { RComponent } from "../framework/RComponent";

export default class Toast extends RComponent {
  constructor(props) { //type, header, text
    super(props);
  }

  render() {
    const toast = window.document.querySelector(".toast");
    const type = this.props.type;
    toast.classList.add("toast-" + type);
    toast.classList.remove("unshow");
    toast.querySelector(".toast-header p").textContent = this.props.header;
    toast.querySelector(".toast-details p").textContent = this.props.text;

    const closeButton = toast.querySelector(".toast-close");
    closeButton.onclick = () => {
      toast.classList.add("unshow");
      toast.classList.remove("toast-" + type);
    };
    //return
  }
}