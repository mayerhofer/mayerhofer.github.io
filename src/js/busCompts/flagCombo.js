import { RComponent } from "../framework/RComponent";
import CountryAPI from "../servers/country";

export default class FlagCombo extends RComponent {
  constructor(props) {
    super(props);

    this.state = {
      country: this.props.country ?? 'Spain',
      countries: this.props.countryImg ?? [],
    };
  }
  // Load flag images
  componentDidMount() {
    // Inside asynchronous methods, context of this is lost.
    let field = this;

    // Load flags only if not already loaded to avoid infinite loop
    if (!Array.isArray(field.state.countries) || field.state.countries.length <= 0) {
      // Istead of getting all and then filtering, better to make multiple requests since we don't need many countries.
      CountryAPI.get(['PL', 'IT', 'CH', 'BR', 'ES']).then(data => {
        setTimeout(() => {
          field.setState({countries: data});
        }, 1000);
      });
    }
  }
  handleChange(e) {
    this.setState({country: e.title});

    this.props.handleChange(e.title);
  }
  buildCountryProps(c) {
    let id = this.id + c.name.replace(/\s/g, '');
    this.registerHandler(id, this.handleChange.bind(this));

    return {id, title: c.name, imgBase64: c.flag};
  }
  getFlagProps() {
    const found = this.state.countries ? this.state.countries.find(c => c.name === this.state.country) : undefined;
    const flag = found ? found.flag : '';

    return {id: this.state.country, imgBase64: flag, className: this.state.countries.length > 0 ? '': 'country-hide'};
  }
  render() {
    const mapCountry = c => this.fill('flag', this.buildCountryProps(c));
    return this.fill('countryField', {
      id: this.id, 
      selected: this.fill('flag', this.getFlagProps()),
      list: this.state.countries ? this.state.countries.map(mapCountry).join('') : '',
    });
  }
}