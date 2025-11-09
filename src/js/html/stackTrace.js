import React from "react";

export default function StackTrace({id, content}) {
  return (
    <div id={id} className="btn-trace">
      <input id={`cb${id}`} className="m-modal__toggle" type="checkbox" />
      <div className="m-modal__backdrop"></div>
      <div className="m-modal__content">{content}</div>
      <img className="img-swap" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAD50lEQVR4nO2bSWxOURSAv6JolAjCQv8UIaaGijE0kWClJCQ2FhZWIiwkWLBpYiEiQQ1dGCJiilBdGTaIKCJYGRZmgkQXpuqiE7/FOS/v+Yfnvf/NzfuSm75zev57z33v5dx7zv1/SElJScknAzQD7dpagMmRehQiGeArkM1pX4GqCP0KjWZkwleRCVcB11R30WJ3D2jN+WwUugrgNXAmfyql0Y5M1vq0M6r7adEZbwYR68ap/I4S6OfSPteZxDOggO4GsBo4BmxQ3THL/wzukn9DotC1Aa+ABypXq9+rgAbgEi6ZTPEgOMltZyFTDXRi+ryt1I6qkID3U1sz8Z88wDDgJhIQF0bsS0oiKIvagQBoAOr0uhXYFaEvRakBGoFnQIe2Z6qr8dh3G2YQ/OKxL98ZCDQBv8lfZYzWCxxW21KoBpZpq/bor68MRCJ0FlmqDgLzgSHa5iMT71KbG5R+E2JJEzKxT8BMG7tatckCh0LwKxRqkFe7E3Pydin3LORN6AWmuxzrHPBG21lPXvtII/JED6rsJOU+orr9Lsd6aenvhSevfeQ54tA8lZ2k3AtUfupyrApggrYKT177iJFiV+bIdin3UJXbg3TMbTpcKl36d5ADWyPTM2w7XYwT21LeHWRiy1VuUfka4nQGuK66ZrVZofJth2PEupS3HXHmtMpOUu6zqtvqcAynpbxIyCC7vy7Mp2GXcmeAbmQZHOtwDKelvMi4jPNl7QDun5zdDfjhop/AmIc48wsYaWM3CkmOssAcF/07iSuRYzjUaGNzSG2uuOw7EaW8WiQWdANTCvx/KtCjNjNK6D8RpbxTFH/CRtQ+GapHITMG+I5MtN6iX6m6b8DoCPwKlU3IZN8jtYBK4IPqNnrotwyJM0Y2eNybm8HRH3iMTHgfsjRmgYd4254PAD5iBsD73twMlrnIRsdoPcBsH/o1ssHxQLkP/QXKHsyntTsKB6Iuiw8Gbun1EtxlfsWoA6bp9QPgiQ99JoZyZI9hvFVv//eBQqfDSaYHyR6NswWnqXRKkrFG+gtITBkR5IBx+W4QSIWpF1insrG3eIQclXtiKLAWidRW4vLdIDArTXtVHotZFl+PA+x2XZuB89rCKp66JfeGfAYWA1vwoQYwEUlMssBOi74VKXISA90iJJ+oJyCWIpuTo0ENkASGE/2OMSVM7mFG3Nxlp89RKLr/sVz3uW+GppTASKSCkyR8OyQ1lsETvrkWPL4dkhbbCMUpFyik8+2QdId+qIV/g2WccoFCOt8OSSuBNcQ7GXJ7A/IOSe0qQh0UTiji8juBYjqnv3fosyTikDRoEnFImpKSEj1/AXMIxHDg9hd1AAAAAElFTkSuQmCC"/>
    </div>
  );
}