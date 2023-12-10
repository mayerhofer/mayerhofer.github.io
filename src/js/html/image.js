import { images64 } from "../templates";

export default function Image(name) {
  return `<img src="data:image/png;base64,${images64[name]}"/>`;
}