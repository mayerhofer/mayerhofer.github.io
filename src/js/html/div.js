export default function Div(className, content, id) {
  const idText = id ? `id="${id}" `: '';

  return `<div ${idText}class="${className}">${content}</div>`;
}
