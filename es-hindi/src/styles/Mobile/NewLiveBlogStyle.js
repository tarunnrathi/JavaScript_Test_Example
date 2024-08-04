import css from 'styled-jsx/css';

export default css.global `

  
  * {
    outline: 0;
  }
  body {
    margin: 0;
    padding: 0;
    font-size: 13px;
    line-height: 19px;
  }
  article,
  aside,
  div,
  figure,
  form,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  li,
  p,
  section,
  ul {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  article,
  aside,
  figure,
  section {
    display: block;
  }
  a,
  a:hover {
    text-decoration: none;
  }
  li,
  ul {
    list-style: none;
  }
  a {
    color: #282828;
  }
  img {
    max-width: 100%;
    border: 0;
  }
  .mobile_header {
    position: sticky;
    top: 0;
    background: #fff;
    z-index: 99;
  }
  .mobile_header .main_header {
    display: flex;
    justify-content: space-between;
    padding: 6px 10px;
    align-items: center;
    border-bottom: 1px solid #707070;
  }
  .Hamburger_icon {
    position: relative;
  }
  .Hamburger_icon,
  .Hamburger_icon::after,
  .Hamburger_icon::before {
    content: "";
    width: 15px;
    height: 1px;
    background: #959595;
  }
  .Hamburger_icon::before,
  .Hamburger_icon::after {
    width: 23px;
    position: absolute;
  }
  .Hamburger_icon::before {
    top: -7px;
  }
  .Hamburger_icon::after {
    bottom: -7px;
  }
  .main_header .logo_box a {
    display: block;
  }
  .main_header .header_right {
    display: flex;
  }
  .main_header .header_right li {
    margin-right: 15px;
  }
  .main_header .header_right li:last-child {
    margin-right: 0;
  }
  .main_header .header_right li a {
    display: block;
  }
  .main_header .header_right li a img {
    height: 20px;
    display: block;
  }

  .mobile_header .L1_menu {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    overflow: auto;
    white-space: nowrap;
    padding: 0 5px;
  }
  .mobile_header .L1_menu li a {
    padding: 3px 5px;
    display: block;
    font-size: 12px;
  }
  .headerProgressBar {
    width: 100%;
    height: 2px;
    background: #93a5aa;
    position: relative;
  }
  .headerProgressBar .progress {
    position: absolute;
    height: 100%;
    background: #ed2128;
  }
  
  .LiveBlog_Wrapper {
  }
  .breadcumWrap {
    display: flex;
    justify-content: space-between;
    background: #11203e;
    color: #fff;
    align-items: center;
    padding: 8px 10px;
  }
  .breadcumWrap .langWrap .langList {
    display: none;
  }
  .breadcumWrap .langWrap .langClick {
    background: #fff;
    color: #0a2040;
    font-size: 12px;
    text-transform: uppercase;
    padding: 1px 39px 1px 20px;
    border-radius: 11px;
    position: relative;
  }
  .breadcumWrap .langWrap .langClick::after {
    content: "";
    width: 0px;
    height: 0px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #0a2040;
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translate(0, -50%);
  }
  .TopStoryBox {
    margin-top: 12px;
    margin-bottom: 18px;
  }
  .TopStoryBox .TstoryHead {
    padding: 0 10px;
    margin-bottom: 10px;
  }
  .liveNow {
    background: red;
    color: #fff;
    text-transform: uppercase;
    font-size: 11px;
    line-height: 16px;
    padding: 3px 12px;
    border-radius: 12px;
    margin-bottom: 4px;
    display: table;
    height: 10px;
  }
  .TopStoryBox .TstoryHead .heading_1 {
    font-size: 30px;
    font-family: "mukta";
    line-height: 33px;
    letter-spacing: -1px;
    font-size: 26px;
    line-height: 32px;
    color: #001d42;
    font-weight: bold;
    padding: 5px 0px 10px;
  }
  .TopStoryBox .TstoryImg {
    display: block;
    position: relative;
    margin-bottom: 12px;
  }
  .TopStoryBox .TstoryImg span img {
    width: 100%;
  }
  .TopStoryBox .TstoryDis {
    padding: 0 10px;
  }
  .TopStoryBox .TstoryDis .text {
    font-size: 14px;
    color: #5a5a5a;
    line-height: 18px;
    padding-bottom: 15px;
    font-weight: 600;

    font-size: 18px;
    line-height: 28px;

    color: #404040;
    font-size: 18px;
    line-height: 28px;
    font-weight: bold;
  }

  .TopStoryBox .socalWrap {
    display: flex;
  }
  .TopStoryBox .socalWrap ul {
    display: flex;
    margin-right: auto;
  }
  .TopStoryBox .socalWrap ul li {
    margin-right: 2px;
  }
  .TopStoryBox .socalWrap ul li a {
    width: 30px;
    height: 30px;
    display: block;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-size: 240px;
    background-image: url("data:image/webp;base64,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");
  }
  .TopStoryBox .socalWrap ul li a.whatsapp_icon {
    background-color: #57c914;
    background-position: 8px 7px;
  }
  .TopStoryBox .socalWrap ul li a.fb_icon {
    background-color: #215bc4;
    background-position: -61px 7px;
  }
  .TopStoryBox .socalWrap ul li a.tw_icon {
    background-color: #00bcff;
    background-position: -129px 8px;
  }
  .TopStoryBox .socalWrap ul li a.gmail_icon {
    background-color: #ed2128;
    background-position: -199px 7px;
  }
  .TopStoryBox .socalWrap ul li a.paperPlan_icon {
    background-color: #3377d3;
    background-position: 5px -28px;
  }
  .TopStoryBox .socalWrap ul li a.more_icon {
    width: initial;
    height: initial;
    border-radius: initial;
    background: none;
    font-size: 10px;
    line-height: 10px;
    text-transform: uppercase;
    font-weight: bold;
    color: #5a5a5a;
  }
  .TopStoryBox .socalWrap ul li a.more_icon span {
    background-color: #5a5a5a;
    width: 22px;
    height: 22px;
    display: block;
    border-radius: 50%;
    margin-right: 0;
    margin-bottom: 2px;
    background-repeat: no-repeat;
    background-size: 175px;
    background-position: -44px -22px;
    background-image: url("data:image/webp;base64,UklGRnIhAABXRUJQVlA4WAoAAAAQAAAAIwIAEwEAQUxQSPoXAAAB8Ift/zwl/f/dGAYYB3EakJAQCUNFIkIixBB9oZIZkmuIuLxx13yZLzUXUtJwX0DCBcl9y3Dft8yXkrttprT50ozUzF3KXbz9Mc9t5sk8oPdGREwA/vulsXn39PR2vn9DmbP4sGP5UH8N5YuT3IXEa9hVSg41VraEFpNkgUV/sSVU2dckHu0on+kuLMErSXJvlI2XuzAYBlO6tLnecii5dXTzIbk/2PCr+qIRTQGpH6wmi7JZYRlkG+dn7rm5qKjoOJWeLyoqKlqaoBPjTyQ5N9JiBACTb1/aJgrGagFpQ3ZUNovKD/k7v2RqfT5IF8azJPdGGqDQOoIkE8XiJwHJJdlRSSKV35/R18/pdSf35mh4kayviyKSuT5QGUPydpRIBJTJ3L+7szkEsYAkc8xyy1WQeV4ikAANM3UyluQsC1S3JLndRyAiKHk10svLHULB27FSfrfVbPaHCERrMVIfRpJLrQB83ZUhhWR/8TjrD4EcIUGejrIJpcrlvnD6sWUSEYMzFPYMkNjg43hLycdRgG8p2V8Z9pLFQZUa9WVIFsaoi4OzN08hbZKpvCTYhmzpcCTHuwNFJL8KVBZKcpChMgOZCrSMcnZRVyhlHbz/lMLNyQYpzrc4VhuScQBom6YMx8nlZjEIK6XyoUZBiO99QFySKB0NwN2k0AjI8Li/QxWQq81ArMRyk7I08mq4GERQZaa7IOTQriFOLlORahnGOFQxOc0IQGKEQVkEyVgh6QhBHGGX8wFOLktB2FEqnmtREOtQj8neAPAVyUIrVJJMFZIkUfB/aI+lXs6vRCqOyov8pI47GsnuNmEkS0I16CskCaKAsfZIhtN7HJNKstBqtQaHhARLhoQEWq3RD8kforrrBYtJLrSo6y8GsAanSd1NDAmxQhzztLsb7PzuhyDyOMl2VpXjSWb6orNujJdJFlgA49DW7graCAIQIXXWH0JpSL6i1Xh3IYB1GMk8G/++HW1CT5NXEw1wvPNkltEGgSR5MxYLSfY1AYghGVe5EXKIWodDDIDY8+TNeGtMKXnI3zqI5NwAQAfzyX0+Egii0sUmIIc8HVi5gZ1aZbkLA3zGk7xMyTKSHd2hixiSLaUQVKRgsxk4S85yr+QI1+hsMMQBSLxO8n67ISS5MhjSDgeSee5ScE+XSwVSSHZGJQeiHmvSGkIRcZ3cHgI0v0ru9NXNSJJJMoA1YT/JK20MwEVyu7XSA16Db6rraxCKVJKZVgAI3k6eD9cLSGYZ5QCjT1CgGcB8kqmo/AB6qhrtDoEwTyHZ0QBJr7EkU3TiSzINGqaQnO9VCRJXSrWdDRCI4CLyVAQUtiM5zayLoeT5EA1mkDwUhEqNyNHrfqD64nCIoVQCycUBUBx+nPwmVA8XyAKTsXdelCLfkyRLIlC5YRpJDdMtEAjDSJL9zVDpt5BkouP5kjxdSttUd6mY/SR5IASVHEDIeBWXu/tCGLN4v+Vq8m6iAaoN6SQz+jvaUCq/cuoCpbN8UPkBWIKS1z22OTujZaAJAplF2w0h0DT+Mm0dq0Rq3WYJ+XUREE1RAWDwslgsXiYIpkSGFRoHFzqcL0kujPc1GH1abpYp6R1sROWJoErY26Hil4+I8jFA0mjxCwwJCvA1QUTdO07KycnJSUAlacJN+232cyQY8fe0l5+/nX2NqPJ/lf+r/F/l/yr/V/n//yI2xEVVdtRKnb1xh9otc3oGCcnQk78cGlcexZ8mWRzo1AxDZmk4KUIg6i56TI0LI8RjA23nlTde4yk9y+TMfO5Ty2FGYXjnKe2YKRrvUbpluRKygfJH/Z2ZLzXNEIbxtD2xdqXaT48+Jcl8wfhdZlf5YexeQsmLU0rJDdbKin4kmRsMLQOySDJLLO7LfFteeE2h9M5ocyTJDKOzOxTrp9IXguhL8kkCtI68STJUKG7JHC4f4o5SenSwEYglmQhnt90PYrqaZBy0DyF5RCgKZPqXA8b0UkqebecD20EkIyspniE5Fxq/+0kUMJJkPZEw7JRYDN0HL6f00ggzgGDAlENeDBIMw6zVAWKQRtKiKPKttPbRBpu65EUAf5GjRQIYcab0xwnQe/MfKD0o0AAg4fztcPgeIDf7iIWhgDwQIAQLyBOQt0w5S9vf8p4DrH8wH8BGcrVYAF7QuWUSpfcm+gCA7wYyFQglmWEUi94kWRQgAtvIlXLtr1P+QW/A2gQAZpPbRUPnoVspPSPUHQCMg0imAIgmmQixsO4kyaIAAdhFLpcZTts/L96m7TRIZ5M7RSg4bcKEUW/Wtpt7z8uULOkZAMmwo2RZPACkkYwWDPjuJsmiAOe3g1wp1YYkNyRaXLzil5NkX6nZ5A6RaFpUdPDgwaKDQQCq7Sw6ePBgUVEM6qyi5OOFfnaxzKD01igzJL1ySJbFAoBpFnm3vmjAZzFJFgWIg+kRybch3eIxyVpC0p3SkQBqUNrn2fuUvxOnnf92So8MNkK6dRnJsljY+h0gD/gJB7zGk2RRgDBMJtkB8rEkFwhJe5kwANVvS9wb8xsVJ2rlv4+2PyT7QNZvO0nuD4VkKMlZJvGAKZMkiwIEweUauQtKPyYf1xCkx1R5302jBJJcGGGGrHEobfcFQTqGZGsIQkh8gsKWKYdIsihADCJJvqaoDslEQVI/RKM4G2YFyERfoe2+IMh2JxktCKbd1LIoQAg6k3+6KkIJOVjQijSyLLYh748PAHyWU3JNAGRNOeTd+oJgPq4JU4SgJ/krlH9DjhOn9V1adlgnd1YjWEdLkCw7QOkpVsj7HSAP+IlMoa8QpJC3XZSdJ4cIUzZsR8mUaAVYohdKyE/ygsKQ++QMkyBgcOF2pXsl1gVCCF4l2UiRbxmZJEr/gfTXUle0AwzW6IUKJnlBaRTJ1hAFGN0VWobZFAZCDIx3yEJFM0n6iNJ7Ml2k/rAHAEPkKal0IxQnkYwSB8XpJHm0PgQBc0g2VVCP5GqIUgeZf0hdtROMmVJhUGwcSzJMRNJJsiQSwuBN8nG8TPh1knWF6S2ZtlI37IUEia/8lfnuJ08FCEg6SZZEQxzQgyTnhQOoN50kMyBM7dXctlvIFZsCL8RfPR4uE3KfnGUSj3SSLImG899FLpfCNNqWnLlA26WQziZ3ik5bNbfsZs61meQVT5JpUlEkUyEcnWmbDAHcoQQDn1LhWMjmkDtEp7VMkqOgtU16OiVzvWySSMaJR9BFkp0hggvJw3J4Ie+2xIPFL0O+kPxEdF6XedNhwh6SXEPZIn/AOJZkmHgg4iI7Qwh7kU9NcoClZf+MQa2fhdKb5Aei00qmjcNYllM6Zyht28BvP3kqQEAQEAQxfJbkRCUa9iH5kii1dhh0l+ppRPQFkhwWdZmcZRIRcdxBMtQO3g/I0xCdlo5X/6pNGgAEFVI2FUJQnJagMt4qCM+TvPWiZgG/kIwRplaOgzZ3WZoMSa+hMlFioOEQoxhgLMmnoyyamAb+SXIBKiDw8vWCfNx1m0x3QckQBeSTZOnWebPVzt10jSQ3oEKi0id59NBQCKDgYCLtOR+CmSITAcCL0m/IvCFFxxPH5L4a9gyCOMbs0uyLlhDNpFLpBgA8S0ol/yHzj1LJEnGr8n+V/6v8X+X/Kv9X+f9/MzWZ3f5bhPHvBEO9uDdTB4wYOyk7L3/RihWL8vOyJ419b2DXpKb13Zyam4fh7wOXaVdpxxtzqjsxVyMQHqE0vBLP/D354NypQ9vWLM3PnjEl64MPsqbMyJ6/9JOtX5w6d4/8rZbzckHdn6n8W/9yIfqT7/sDmT+sjqhM2cQ/O5iguXubi/zGeQFrqLagXOhLNgQSyGTdNfzxr6/vPHr06NGlrx/trK4vs4aeZrEIJiNhV7/HfM2J5auarr8EI9DjSUTgc68/jQWqJ+jK448b33HLgoKCBT/wM27W00fU9uGHIjGaB2HnVZztxKybL/2u9NIaTwDV9GQ5SAMwkpL9gBe4zqyj5xgPvl29enWvXGIFdVTMxd1T0lS/nb6WewRiPUfZqz/3OTEALkph+9H11c/ppwfZrXEpTxUOHrK+mL+/MppsryM/DsQ2SmZix1/62cQ60DiKM8XhAFMUPVtDgw78xrmp9iR5b6ybXmq2mE+WtoNkGskxzbx1NQZI7NixY5OawNZbuqnJkdB8IcXhFBOVtHhSOsJF1es868yGbdysdMMAoMZdkrzQVSfAazwGABc/B4DT9IeeXTkKkq71u3T7lV1e0kkMg7RrJhAX2UTJMpK/9FTTmH84sXepthe8Sm3Ifa/pICYBuPcb6vVzRcE4mAb4udy/CrRtqJtwDpc6RvLJHXKgPqL4vAjdYSMleSw6TX7VStmLvOvEPlO1CTVkyKW1AYPBoc4ybhpfwUc0AoA3R6Ej+8Rzp078D5G9pTbRAo/qddewji4asb52rQTiAcOV5PJdTCgjtzZSEsInTuxNVc1hUcB7Y1zhWCR5BKheyyPUxS3M6OcB/EySbvr4kqnsLhXCfd4AXmZr/b05UVSeMlRZHvDcXJL5HnLPk04Mkf0HDlI4IAzKyP/EwqEntE3jOADoQlM0GwHAYqa0H++qjysl3sx/UQLtyGtZaMVA/SVxo1lMqCYHAPx+InvI1XFuql3U8LBjAd5Mwa4U+MS7er7mgWHbMZDQbdQ9ksyTgNc/bz9CCx6a5Ku318jzzUUoF0Dsqqe8HSYIz7Ro2SpRvmV1qHnU3tGC2Bm3/glbAzD/KtJZTTfVHmU/FziVIRLApofwPUEm6y2eJJuIyFM1oxG+nmS2FfJBTu3l61ReUk/Fmhfg5lADX2jG0QDQlW6xbAQA8xj1ch+DPmreXz94xIYrfjKf3QEQzbZ6a0pypFVEHjBc2aKJJBfVhdIQPnFim6h2paKDLQCTyaFIco+NXxfDM13MNt+RpJs+0IMkv3JRFsUkvSXwXBQUikQpI5UsJcntjaA8jPec2HRVmbDKXO4DuFbz9HCoa+xbwCDMJGwtHIqmHDeEh6GbQAxkA2VhbKu3jtvdISaXGKvkn+ShRKh9ldecmMeCb05Jn/7u1Hff5hrh/adN2UQvwOxpdoNDJ6XBxG+RmO2O9M7w/CgCl54A7zTTS+MbRft/KjYrqvYGk3UQxWAlnlDeXCBOs5US9OgE9a14zolp6U2ShSGA2dPT5ArHT+bHAFB2BgD2MBJ6XsWf2A2yn9+B4QbZWgcxrKNEbVOBOMi3FWnant86LYNBmb+NwXUrjycCZi9PD1c4vtuzw8hjL0GyyS9k95ouOjpz3oMT4GI22+y9aV7MqemeOniWQ7WbIxCbOMxe/bnfabm6uMw6clT6yNeXfvkyC64GvATA6OZmgB57kMO6krtGdUobt5/s/BHZRkepZfwzyEryByMwj+Qk6HMXa2kVzjnikMWt9lrFXKdlwAdUOxQuAFxcoNcXSukCvzmUnGnBizz+rI7cuAlAv+HDkwEsYV5T6NTwC2d27KBhxwU8CnGMIAPt88xjxjmx3arWQe/e/+UJxD1NbPRSCv0BnxTo2YsrG8Q18a5Rwz8+NvHxz9Cv6yJqPAsieZgXW3vYofGPPAOnbUTT+ypuN9KdbRpZC2hCvgm9D6LSsuY6AmDxtqr2rgGx9L1M3vvh0LbVS+bMmvJh5pgRw0e9n/nhtJwFK7Yc/PYSeSvIebkZEdShU6dOnTp3aGeb7Itysc2Z0sFA5p2vmukOgZGNIiUbRXijolsj7wbt+PQTfzhvD5MH/kY0NkjsOmDY6PGTZ+bOLViybGH+3I+mTxz33sC0tq9a4cw9TB6Srn8PVPm/yv9V/q/yf5X/q/xf5fWm2WvXFq5fOsjlvzGE7f4ir0tUWOuM7cf+9d8Wel6a4ALpVl9uEZewFi1atPAo96J+KP2wcqLH9Sgo3bJHUFxX0jao3DtBMsphYt52VdVq+xd7Nm2w3biraGdaRaLh1VAoPzjdgbp885kLlpwa5xC1ly4tWDZvRJzF49Ux8xfnFywLcbQZlKztAC/17hMLoJZWtfuOGpeRkZEx7p+va3ScZBMH6XCafE/VKCpfUpHYPQIqPX96yXH68XNgMqc5QsNzI73xQurUjwvmLprWPtjlmaG/RDuWV6lUsFbxb8hNI8npb+6J1qg3lR6qoUnkeU50dYRakx/wbB+uUpV1xyOqx6S932x459UAnFtfgXitCKonL3eQeU2ANY+Xrr5UDNRe+Iy9jqRA2uIL6TYnjQ4VSpJrcudbtVrIeKkelL7wVnVNWvFEkwYv1AuqW692nR48rAngAQdssZ1cEwkwXdWi9dWGA3Cr2ajL8rpZ+ysQedPUheyt5hC7OBxLyDt/kPtMCfzLaJ9hnwKoEwRZN1cAK0Y4VADJ27DjTHKoxGmZ+73dtTBcuglZ193pA9hMiy4r5he4Y87mLQ1DNxbtnW7SwjDod/JDeOb7JTFYlavJo3nKB+u/fkIy282rAvFpB3VYF+8QfeddvMeRtQBLz4e8tHC0wT67ogAMeU/ubgaAxhscqp5NdTtkkixK8wRKZP4LmpqYD6DOgjP/7mDmeXCeFutIeoPkr49I8qRBVXAe+V1nIP3RWJe5D9xVvNg5c/WVp5T9t+HD3pEVhsIoDRb3dAiANwGMzQNwkGbYt3khUC919drUEJvE4Z06jfYAVjZyoGMXSPL897/4a2UqJsnLuzOuyFi18eDHQGPyyhPOqv2cCxdpMY+8/wwuUH6Aivqry7j2ZeD5E0wCfrsElSep/KrPfV6vOERosLCXA6REYyvdUj5Aah/0GYtfL6BWP3tMzQJip//74LQYm1lX8OJfFmD6aAei7F2zVh2/KKPKIK0Wo9q1xw2BuXwF1TnfPrnt8kluUnGCOzwATCCjAOPDRWp2fBMWFCj/fDCqbyuuMKxtrcGaNxyAnMS+WLQDAGZ9gRc5/gntsTAJAIZlQPbcCADoOk8He6H1R1RbDO1imQ4Ad36CyU5FAM6RG1WkXCz7LaNTMR/UB/A8e6mZMtaUm529YMWC7OzsnOzZm+p3X1lhWPS+Ot/d3g7w09e8BwALUht/CgA/8tvD9ljsYxMXL5edZNNwkQP9/AfJst8vTdOsVqmaJXZowaY2vz2Ah53GANhC7lYBc5c9JP8TAAApDFWTNrQDST6m7NDuwysMHXape3cjHNCA9b9iUARmd4pagNpDsOYK7FoA2eTcGdNnD4S028cOZGhA8pbVAO0jPn+kLN4OdbkCQEMuhtlOIwHsIXeqATCT9IdtHqE2YVAyucri6lnAnxNe68V30rtWGHD8LVVfv+EIwKfnsK0j6vvVCMcrn2H+RfvMlWnyU8+uXbv+kCKFBQ4Ef5I3DbBn4T1FxbAD8ri+8QA+tMLMfLu8D2CvNhG8g/UbAHzzs6rnGvTkHky4uv4UL4wZk8Mx4REVhzYXPVRMmg9HnNPv5i0AOJPx1u8AcITvZNpjnsyJJAAIPVtdao4j1SN5y2IP05dU3FQrE3MB5JD8uREArtCHy+2SneTXz4DrVQHvsEEKz+Sv+vLBigVbORWuFQdMLXZTNIivOwR5nqHo2t8dcG//L7jc+560xyqpiUsh+f4eqQXlCYwfl9yXmwmt3bgPAGr2aAIA4RyuxXwHwFyySRj5L/bXYCC9xzM/Bg2vJTbrxxxUKHPPtpbz+nRf2tdvOcKScbj3PZbug3sNzD2J5UT3bfbY0sGm/Y/VpLBujU3Nz8oVoOsNmRXQPp+tIe9WTIsW60laQXI2gJ/IM1rUnNIM8D3BGzU16MdM/MqnptFPT359hlMrFuhzalOvF1zg3eqjk6s90OxWBwcAUItZAPLWAujN12HfuJ/Tg8Knn20E+fUHWrk0/2lg+VGtWdvBa+5QOht2dP2K3xQsWbZs2bL8rWQ3aNmuoCDbiCkFBW0AvFtQMFgL2eYB0IRt0dC1Lf9TwyOWsysYcBu1afu6jZt3FsQAQONbnRyhejj5qTcAuM4kW3rbB41X5C/M8YHSQevyN/RCOTLiBmU/awa7GufdpuyJliiH3yG5Z8JukiwjZ1U0ANSIiKoD2Vdvvu0AnzOvLR8WZs9cc4lpo3nV3T7lYBhJWrUDrO3H7/r+24L3G8H+PhZbHxPK5X58TNtHZSQ5uQKi8pVbXez35p1WwD7evcc/gMDrPVzKudrXS0t/rmYPUazRoG5w3bp1gyVDfSo6iLz9rt3gbsbz1/YDOXwRbq74W77pRPsBGPnXNiCvdBmqFglWUDggUgkAAJBSAJ0BKiQCFAE+zWKrUielI6KiMklo8BmJZ278OpmLxBggP1VdpX+AH6zc4AtmjBSKv0/9Nwk7rx8r/G/g78FNu55h/5D/gPWh9G28ZegB0p/+X/5HpTap36J/wHbx/hvxguDpyIcRJgcSOky/QvMB6IWdd669gbdGf2uFXxhikgxSQYpIMUkGKSDFJBikgxSQYpIMUkGKSDFJBikgxSQYpIMUkGKSDFJBikgxSQYpIMUkGKSDFJBikgxSQYpIMUkGKSDFJBikgxSQYpIMUkGKSDFI/sp8aNPp5P1Ro51RxIkSJEhZ3cUnZBikgxSQYpIMUigw9hZ7MKalLcIOaSJEiRIgJuCY8eMzsgxSQYpIMUihzlPR00EIIOHDhw4Nkon3rKmZ2QYpIMUkGKVeTsgxSQYpIMUkGKSDFJBikgxSQYpIMUkGKSDFJBikgsh1ZDpZl7QJWsTkNSLa1VTZ0XYvDvfCuDe9pfVqPAe72v7ikgxSQYpEW9FA7pGRBdv8/t1HGPnW1L3HiqMWTlGBNzZxj8lIkjmD3j9/91eZvJW6jQVerF9Pn9ZQrmVLwSK+ZlJeJWJfOkk/P9xSU81JBikgxSQYdNBwO5OHl1V7WhFjDx9HrOsPe5Pr1D/ZM4JgxUTOn2hcCDgfkjYTY2qZnZBixHVG0qiz/cUkGKSDFJBikgxSQYqLA7QypmdkGKR/01Jr0HXHQFcIVXm1+o66pEjelguMwkvAalYABlB59lsfsJx6AM3/o5KjtZugyCvfUa2o6OPGZ2QYfH5VzhpaqPeYZnHlP2I6eVGqnf1o8PFoYnBjL96+q6eAen/gl2B4wz4FV4UYFaMCdDnkgxSQYogcXWLgMOHDu7WJohkYQmjGEJoxhCaAx3g47wbgAAD+9frwAfAAAAAAAAALJHxamSj6Yt8cWBf9JjYzp+ZLBsm26V+rkGfQqgAHZ94Lb92vlJ1ZzJsBEVFzFOIz7a+TQoX/dhUwAAyBgNtnS2YMJu9BHQIuuwRcYDpAAAAAAD6KgenJdqR8OY1gFlf58hdRVcy5Nt/FzeBcYHzR1e2c6MyE6TnXbTP1RfCS8yAZb902vAO/TVdUZQNgoRsP/U4zremQ55TVCvkgHJg8CCog3GR7fhhCaxnf4ork8GtoFsTEQK4wD+Y9bUfeqOVWJcUMbpKxozpy4W1/GVE7PWefFxrvGvIsIuKh0SSaYGU7In6Mdl7KCknXWVQK1v9VuNo09bhGRghSSpNdW9CNivDyK1VB9iNJW4ssqmzNFKQseT6DpKP4D40nebV+IRfc0AA1rOrmK+NSzJqHq1iaQcxhv9AmoW3P4f9PFO3401Mpe7SBTIyKeLjrSn2634FNdRmwfPNh09jmKqbEcRDalS17ESYLFtZngdwuQP+XLuu7bKqxvth43+nmDgPoNHZ/SOFktFB02/GkLws82lmGJxNKggVuB2b1rAVHEJoez6Wr6Hz0J+hkjDWZmKgCUed46ve7ihkgEbF52d7mx5YuCf2dXS1AS0IuOpFdOhHOYab4/s4JK9uZueWnCVsp9n0lEk5f37oPphHqxotvyZAgtJLlJDQaGBwu6r+UwMeRela/Bi3w60IeOL1l4oxF26fw9HUOGfygzGEZFcAqUVubuw141t7sp3x+HsohChaLh60JaqdsRyDGZJERIHFotgpzr76HodLcZDOOeiamYlz04p2DyVxVOhDc3r/QDxLflYawnNkE9YlijvgWyIuR373Bg9wxiRdTKnqvAqx1iybMjYGqLnF7eCPXjEn6QDAIRsSrpTRwDINZWS/l2I16661LGnHvYYh1p43pTan91gYgcrZ9/Q3+7usbW5IjbN6L26q5UflVfmeyzo21hgHsHjBj617Ue6LtuwG25F3av3tvC/iWhMp3U34YwER8tjMN9r+9gOiCEFbbYEZ+Nhq/pj2gKcj5tmPn6VJPS0HNavDc/JaoOw1yaTAmH6cFAlV/RPUC36yyo9QoNmyCoFqZ5wSEztE+X27IAgO2f2w1SOhl+KMs4Fq49CFwk5eHe2/pJe8ogA+zf+w/hdyDxKetbeOmiYsG8jxLDsu5MYe7gqvsL+vEPNrad15Y2KdGERtoHoa0CGOAnpO8m3BXWOh5wVbaf5Ew9TEwiJUZw0no+B6v4NV5e5xo6uMoRwp3le0wZ/QxbPiTOp1soHRFnXyWL6zXs8HuZRSS+PG5Z5qvO3d7sAZv67jMAtR1FEVEgYjlkDEcsgcsgHFmT6OAAKrZJ//Q6/s3v/+8HFW7jxDnbvuIS/nLaul9rLfWkkkzpNkNC5raxTYVXi/QNj886E4gF8dUy3G+WEK8j2v6zcJwlBjtvaBt0GeKhVgawc89D/mfL71K1l97CejQxJDidUsv81c1FRB90HmtFsqA3vyJ9cAiJHOCCVrBlak4TG1DgR7JO3akDU7z/0WvWNZIikBVBVBUOlazoYuQlboMYg/1U/DJmMMMRysBy84tngcUmJYDxhrLvb1SvuTr9IuSunP+2Ra3EIp1v3o89Lj35tPz8DhFcogmESQgfu2MxYdTEcA28PRLuBShDaSuVPhMbFKOMcfyWHlj9oK3fJOngVk4RHoa+UMX4wyxAxcTIH581Lv6v3xhzu/YcBqHGtews0njO6dOD83ravkPdxdp1g6keUduvxnXIYfq9N5z5qAxjE+oRPTP1YSIWBE9IymDJ/9am+J0pGVRvD4yrB5gBYg7703jarocB//1CHsuFK/L8naHpQWw+FnTbkwRyMJZBwIWSIZztvKRnGVoji4parwOE6UqZzRbVumchAn/YLqyY+fFk5geUL0f60jLCyd6pMQPzi3nepLXBZytw5z0TvNXq202gf5Ju86iU/MQPEX/feJXR+HYU2UVRwHzZN6FuYNR7D07sykNHZfv3VJoMy+tI42EpziGB6MaxA3u25eoYOId7wrFzac0DLCoaPu73shpVHiN/s/htLLK9/zTRf7F6xtwHwHO2mpHYFOww6UeQfrWCDb4XgWv6vFhTcEsQXSq8kjRBtCmA5KYlYgbyLK97u3rO/0AYNibGWkJdl7qJYnmI0lBeil90YjMYvUXv1Vg4vUAcol6qyELT1DrO+uRdUFvSc8yNl0t0R5Op02J4r0yA+eaAes8zTQe/lRsnVFQi5O18Sj/4de+MN0gAAAAAF7Lwt36dMAAAAA=");
  }
  .TopStoryBox .socalWrap ul li:last-child {
    margin-right: 0;
  }
  .TopStoryBox .socalWrap .ScrollTopBtn {
    width: 30px;
    height: 30px;
    background: #999999;
    border-radius: 50%;
    position: relative;
  }
  .TopStoryBox .socalWrap .ScrollTopBtn::before {
    content: "";
    width: 8px;
    height: 8px;
    border-left: 3px solid #fff;
    border-top: 3px solid #fff;
    position: absolute;
    left: 10px;
    top: 11px;
    transform: rotate(45deg);
  }
  .LiveBlog_shortDis {
    padding: 0 10px;
    // font-family: "Crimson Pro", serif;
    font-size: 22px;
    line-height: 28px;
    margin-bottom: 10px;
    font-weight: 500;
    color: #000000;
  }
  .LiveBlog_shortDis a {
    // border-bottom: 5px solid #0a2040;
    color: #0000ff;
    font-size: 14px;
    text-transform: uppercase;
    // font-family: "Recursive";
    font-weight: bold;
    text-decoration: underline;
  }
  .keyEvents .keyEventsHead {
    background: #ed2128;
    color: #fff;
    font-size: 16px;
    text-transform: uppercase;
    font-weight: bold;
    padding: 8px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .keyEvents .keyEventsHead > * {
    pointer-events: none;
  }
  .keyEvents .keyEventsHead .icon {
    width: 22px;
    height: 22px;
    border: 1px solid #fff;
    border-radius: 50%;
    position: relative;
  }
  .keyEvents .keyEventsHead.active .icon {
    transform: rotate(180deg);
  }
  .keyEvents .keyEventsHead .icon::before {
    content: "";
    width: 6px;
    height: 6px;
    border-left: 1px solid #fff;
    border-top: 1px solid #fff;
    position: absolute;
    left: 7px;
    top: 8px;
    transform: rotate(45deg);
  }
  .keyEvents .keyEventsContent {
    background: #0a2040;
    padding: 16px 10px;
    display: none;
  }
  .keyEvents .keyEventsContent.active {
    display: block;
  }
  .keyEvents .keyEventsContent li a {
    padding: 5px 0px 5px 25px;
    color: #fff;
    font-size: 18px;
    display: block;
    position: relative;
  }
  .keyEvents .keyEventsContent li a::before {
    content: "";
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #fff;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
  }

  .feedsWrapper {
    background: #ededed;
  }
  .feedsWrapper .tabs {
    display: flex;
    background: #fff;
    padding: 0 10px;
  }
  .feedsWrapper .tabs li a {
    font-size: 14px;
    color: #959595;
    text-transform: uppercase;
    padding: 1px 8px;
    display: block;
  }
  .feedsWrapper .tabs li.active a {
    background: #ededed;
    color: #ed2128;
    font-weight: bold;
  }
  .liveUpdatesWrapper {
    background: #0a2040;
  }

  .PageContentWrapper {
    background: #ededed;
    padding: 15px 10px;
    overflow: hidden;
  }
  .PageContentWrapper .feedBox_outer {
    background: #fff;
    border-top: 1px solid #c3c3c3;
    margin-bottom: 19px;
    box-shadow: 0 0 10px #00000029;
  }
  .updateBtn {
    position: relative;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .updateBtn a::before {
    background-repeat: no-repeat;
    display: table;
    content: "";
    height: 22px;
    background-position: -395px -2px;
    margin-right: 7px;
  }
  .feedBox_outer .feed_inner {
    padding: 0 28px;
    padding-top: 16px;
    margin-bottom: 10px;
  }
  .feed_inner .feed_timeWrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
  }
  .feed_inner .feed_timeWrap .feed_time {
    font-size: 12px;
    line-height: 22px;
    color: #959595;
  }
  .feed_inner .feed_timeWrap .feed_time span {
    font-weight: bold;
  }
  .feed_inner .nw18Feed {
    margin-bottom: 16px;
  }
  .feed_inner .nw18Feed .logo {
    display: table;
    width: 63px;
    margin-bottom: 10px;
  }
  .feed_inner .nw18Feed .logo img {
    display: block;
    width: 100%;
  }
  .feed_inner .nw18Feed .content {
    color: #5a5a5a;
    font-size: 14px;
    line-height: 18px;
    font-weight: bold;
  }
  .feed_inner .feed_heading {
    font-size: 20px;
    line-height: 28px;
    font-weight: bold;
    margin-bottom: 10px;
    font-family: "mukta";
  }
  .feed_inner .feed_heading a {
    display: block;
    color: #000000;
  }
  .feed_inner .feed_heading2 {
    font-size: 22px;
    line-height: 28px;
    font-weight: bold;
  }
  .feed_inner .feed_heading2 a {
    display: block;
    color: #000000;
  }
  .feed_inner .feed_author {
    color: #114da5;
    font-size: 10px;
    text-transform: uppercase;
    line-height: 28px;
    font-weight: bold;
  }
  .feed_inner .feed_cont {
    font-size: 20px;
    line-height: 28px;
    color: #000000;
    margin-bottom: 10px;
  }
  .feed_inner .feed_cont mark {
    background: #fff;
    color: #0000ff;
    font-weight: bold;
  }
  .feed_inner .feed_cont:last-child {
    margin-bottom: 0;
  }
  .feed_inner .feed_timeWrap .liveTvBtn {
    border: 1px solid #0a2040;
    color: #ed2128;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 12px;
    padding: 1px 9px;
    display: flex;
    align-items: center;
  }
  .feed_inner .feed_timeWrap .liveTvBtn span {
    width: 19px;
    height: 15px;
    display: table;
    margin-right: 5px;
    background-repeat: no-repeat;
    background-position: -482px -6px;
  }
  .feedBox_outer .feed_ftr {
    display: flex;
    justify-content: right;
    padding: 0 28px;
    align-items: center;
    padding-bottom: 21px;
  }
  .feedBox_outer .feed_ftr .feed_social {
    display: flex;
  }
  .feedBox_outer .feed_ftr .feed_social li {
    margin-right: 15px;
  }
  .feedBox_outer .feed_ftr .feed_social li a {
    width: 34px;
    height: 34px;
    display: block;
    border: 1px solid #707070;
    border-radius: 50%;
    background-image: url(/images/siteimages/live-blog-sprite.png);
    background-repeat: no-repeat;
    background-position: 0 0;
  }
  .feedBox_outer .feed_ftr .feed_social li a.fb {
    background-position: -6px 1px;
  }
  .feedBox_outer .feed_ftr .feed_social li a.tw {
    background-position: -56px 1px;
  }
  .feedBox_outer .feed_ftr .feed_social li a.in {
    background-position: -111px 1px;
  }
  .feedBox_outer .feed_ftr .feed_social li a.wapp {
    background-position: -163px 2px;
  }
  .feedBox_outer .feed_ftr .feed_pin {
    width: 16px;
    height: 16px;
    background-repeat: no-repeat;
    background-position: -316px -5px;
  }
  .feedBox_outer .feed_liveTvebox {
    padding-top: 6px;
    padding-bottom: 6px;
    position: relative;
    margin-bottom: 10px;
  }
  .feedBox_outer .feed_liveTvebox::before,
  .feedBox_outer .feed_liveTvebox::after {
    content: "";
    width: 100%;
    height: 6px;
    background: #ed2128;
    position: absolute;
  }
  .feedBox_outer .feed_liveTvebox::before {
    top: 0;
  }
  .feedBox_outer .feed_liveTvebox::after {
    bottom: 0;
  }
  .feedBox_outer .feed_liveTvebox img {
    width: 100%;
    display: block;
  }
  .feed_inner .feed_tweeter {
    margin-bottom: 10px;
  }
  .feed_inner .feed_tweeter img {
    width: 100%;
    display: block;
  }
  .PageContentWrapper .feedBox_outer.nw18Feed_outer {
    border-top: 3px solid #114da5;
    border-bottom: 3px solid #114da5;
  }

  .PageContentWrapper .HighlightWrap {
    padding: 16px 28px;
    background: #fff;
    border-top: 1px solid #c3c3c3;
    margin-bottom: 5px;
    box-shadow: 0 0 10px #00000029;
  }
  .PageContentWrapper .HighlightWrap .Highlight_time {
    font-size: 12px;
    line-height: 22px;
    color: #959595;
  }
  .PageContentWrapper .HighlightWrap .Highlight_time span {
    font-weight: bold;
  }
  .PageContentWrapper .HighlightWrap .Highlight_heading {
    font-size: 20px;
    line-height: 28px;
    font-weight: bold;
    color: #000000;
  }
  .PageContentWrapper .HighlightWrap .Highlight_heading a {
    display: block;
    color: #0000ff;
  }

  .PageContentWrapper .comments_btn_1 {
    background: #0000ff;
    font-size: 12px;
    color: #fff;
    text-transform: uppercase;
    padding: 5px 20px;
    font-weight: bold;
    display: table;
    margin: 0 auto;
    margin-bottom: 13px;
    border-radius: 18px;
  }
  .PageContentWrapper .commentRow {
    margin-bottom: 20px;
  }
  .PageContentWrapper .commentBox {
    background: #fff;
    padding: 15px 25px;
    border-radius: 15px;
    font-size: 20px;
    line-height: 28px;
    color: #000000;
    position: relative;
    margin-bottom: 30px;
  }
  .PageContentWrapper .commentBox::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-width: 20px 17px 0 0px;
    border-color: #ffffff transparent transparent transparent;
    border-style: solid;
    top: 100%;
    left: 30px;
  }
  .PageContentWrapper .commentAuthor {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
  .PageContentWrapper .Commentleft {
    display: flex;
    align-items: center;
  }
  .PageContentWrapper .commentImage {
    background: #5a5a5a;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 7px;
  }
  .PageContentWrapper .commentImage.small {
    width: 40px;
    height: 40px;
  }
  .PageContentWrapper .commentImage img {
    display: block;
  }
  .PageContentWrapper .commentContent .name {
    color: #ed2128;
    font-size: 14px;
    // font-family: "Recursive";
  }
  .PageContentWrapper .commentContent .name a {
    color: #ed2128;
  }
  .PageContentWrapper .commentContent .time {
    font-size: 12px;
    color: #959595;
  }
  .PageContentWrapper .commentContent .time span {
    font-weight: bold;
  }
  .PageContentWrapper .CommentRight .reply {
    font-size: 12px;
    color: #ed2128;
    font-weight: bold;
    display: flex;
    align-items: center;
    line-height: 12px;
  }
  .PageContentWrapper .CommentRight .reply span {
    width: 12px;
    height: 11px;
    display: table;
    margin-right: 4px;
    position: relative;
  }
  .PageContentWrapper .CommentRight .reply span::before {
    content: "";
    width: 12px;
    height: 6px;
    border: 1px solid #ed2128;
    display: block;
    position: absolute;
    border-left: 0;
    border-top: 0;
  }
  .PageContentWrapper .CommentRight .reply span::after {
    content: "";
    border-top: 1px solid #ed2128;
    border-left: 1px solid #ed2128;
    width: 6px;
    height: 6px;
    -webkit-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
    position: absolute;
    left: 1px;
    top: 3px;
  }
  .PageContentWrapper .CommentRight .report {
    font-size: 12px;
    color: #959595;
  }

  .PageContentWrapper .relatedWrap {
    padding: 17px;
    background: #fff;
  }
  .relatedWrap .relatedBigStory {
    border-bottom: 4px solid #ededed;
    padding-bottom: 14px;
  }
  .relatedWrap .relatedBigStory .related_image {
    display: block;
    margin-bottom: 10px;
  }
  .relatedWrap .relatedBigStory .related_image img {
    display: block;
    width: 100%;
  }
  .relatedWrap .relatedBigStory .related_heading_1 {
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 8px;
  }
  .relatedWrap .relatedBigStory .related_heading_1 a {
    color: #5a5a5a;
  }
  .relatedWrap .relatedBigStory .related_author {
    color: #ed2128;
    font-size: 10px;
    line-height: 12px;
    display: block;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 4px;
  }
  .relatedWrap .relatedBigStory .related_date {
    display: block;
    color: #5a5a5a;
    font-size: 10px;
    line-height: 12px;
    display: block;
    text-transform: uppercase;
  }

  .relatedWrap .relatedSmallStory {
    padding: 14px 0;
    border-bottom: 4px solid #ededed;
    display: flex;
    justify-content: space-between;
  }
  .relatedWrap .relatedSmallStory .related_image {
    flex-shrink: 0;
    width: 157px;
    margin-right: 11px;
  }
  .relatedWrap .relatedSmallStory .related_image img {
    display: block;
    width: 100%;
  }
  .relatedWrap .relatedSmallStory .related_content {
    width: 100%;
  }
  .relatedWrap .relatedSmallStory .related_heading_1 {
    font-size: 16px;
    line-height: 20px;
    font-weight: normal;
    margin-bottom: 10px;
  }
  .relatedWrap .relatedSmallStory .related_heading_1 a {
    color: #5a5a5a;
  }
  .relatedWrap .relatedSmallStory .related_author {
    color: #ed2128;
    font-size: 10px;
    line-height: 12px;
    display: block;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 4px;
  }
  .relatedWrap .relatedSmallStory .related_date {
    color: #5a5a5a;
    font-size: 10px;
    line-height: 12px;
    display: block;
    text-transform: uppercase;
  }
  .relatedWrap .relatedSmallStory:last-child {
    border: 0;
  }
  .PageContentWrapper .relatedViewMore {
    background: #0000ff;
    color: #fff;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
    padding: 7px 11px;
    border-radius: 18px;
    margin: 0 auto;
    display: table;
    margin-top: -18px;
    position: relative;
    padding-left: 40px;
  }
  .PageContentWrapper .relatedViewMore .icon {
    width: 16px;
    height: 16px;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    left: 17px;
  }
  .PageContentWrapper .relatedViewMore .icon::before,
  .PageContentWrapper .relatedViewMore .icon::after {
    content: "";
    width: 1px;
    height: 16px;
    background: #fff;
    position: absolute;
    left: 7px;
  }
  .PageContentWrapper .relatedViewMore .icon::after {
    transform: rotate(90deg);
    width: 1.4px;
  }

  .feedBox_outer.liveTvFeed {
    margin-bottom: 0;
    border-top: 3px solid #ed2128;
  }
  .feed_inner .feed_image {
    margin-bottom: 10px;
    border: 1px solid #114da5;
  }
  .feed_inner .feed_image img {
    width: 100%;
    display: block;
  }
  .liveBlog_tags {
    display: flex;
    margin-top: 10px;
    flex-wrap: wrap;
  }
  .liveBlog_tags li {
    margin-right: 5px;
    margin-bottom: 10px;
  }
  .liveBlog_tags li a {
    padding: 1px 13px;
    display: block;
    border-radius: 5px;
    background: #fff;
  }
  .liveBlog_tags li.active a {
    background: #5a5a5a;
    color: #fff;
  }
  .feedBox_outer .feed_slider_wrapper {
    position: relative;
    background: #ed2128;
    padding: 15px 20px;
    margin-bottom: 10px;
  }
  .feed_slider {
    width: 100%;
    box-sizing: border-box;
  }
  .feed_slider .glide * {
    box-sizing: inherit;
  }
  .feed_slider .glide__track {
    overflow: hidden;
  }
  .feed_slider .glide__slides {
    position: relative;
    width: 100%;
    list-style: none;
    backface-visibility: hidden;
    transform-style: preserve-3d;
    touch-action: pan-Y;
    overflow: hidden;
    padding: 0;
    white-space: nowrap;
    display: flex;
    flex-wrap: nowrap;
    will-change: transform;
  }
  .feed_slider .glide__slides--dragging {
    user-select: none;
  }
  .feed_slider .glide__slide {
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    white-space: initial;
    user-select: none;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
  }
  .feed_slider .glide__slide a {
    user-select: none;
    -webkit-user-drag: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
  .feed_slider .glide__arrows {
    -webkit-touch-callout: none;
    user-select: none;
  }
  .feed_slider .left-arrow {
    width: 16px;
    height: 16px;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    left: 2px;
    z-index: 3;
  }
  .feed_slider .right-arrow {
    width: 16px;
    height: 16px;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    right: 2px;
    z-index: 3;
  }
  .feed_slider .left-arrow:before {
    content: "";
    border-top: 2px solid #fff;
    border-left: 2px solid #fff;
    width: 8px;
    height: 8px;
    transform: rotate(-45deg);
    position: absolute;
    left: 2px;
    top: 3px;
  }
  .feed_slider .left-arrow:after {
    content: "";
    width: 15px;
    height: 2px;
    position: absolute;
    background: #fff;
    top: -1px;
  }
  .feed_slider .right-arrow:before {
    content: "";
    border-top: 2px solid #fff;
    border-left: 2px solid #fff;
    width: 8px;
    height: 8px;
    transform: rotate(132deg);
    position: absolute;
    left: 5px;
    top: -1px;
  }
  .feed_slider .right-arrow:after {
    content: "";
    width: 14px;
    height: 2px;
    position: absolute;
    background: #fff;
    top: 3px;
  }
  .feed_slider .imageBox {
    border: 1px solid #fff;
    margin-bottom: 7px;
  }
  .feed_slider .imageBox img {
    width: 100%;
    display: block;
  }
  .feed_slider .contentBox {
    color: #fff;
    font-size: 10px;
    line-height: 14px;
  }

  .PageContentWrapper .liveOption {
    background: #fff;
    border-top: 1px solid #c3c3c3;
    box-shadow: 0 0 10px #00000029;
    padding: 0 28px;
    padding-top: 16px;
    margin-bottom: 30px;
    position: relative;
    padding-bottom: 10px;
  }
  .PageContentWrapper .liveOption .heading_box {
    border: 1px solid #0a2040;
    display: table;
    margin-left: auto;
    margin-right: auto;
    margin-top: -24px;
    margin-bottom: 10px;
    background: #fff;
    font-size: 12px;
    line-height: 18px;
    color: #0000ff;
    text-transform: uppercase;
    font-weight: bold;
    padding: 1px 16px;
  }
  .PageContentWrapper .liveOption .heading_1 {
    font-size: 20px;
    line-height: 28px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .PageContentWrapper .liveOption .heading_1 a {
    display: block;
    color: #000000;
  }

  .Option_row {
    position: relative;
    min-height: 1.5rem;
    padding-left: 1.5rem;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  .Option_row .option_input {
    position: absolute;
    z-index: -1;
    opacity: 0;
    box-sizing: border-box;
    padding: 0;
  }
  .option_label {
    width: 100%;
    position: relative;
    margin-bottom: 0;
    vertical-align: top;
  }
  .option_label {
    cursor: pointer;
  }
  .option_label::before {
    position: absolute;
    top: 4px;
    left: -1.5rem;
    display: block;
    width: 16px;
    height: 16px;
    pointer-events: none;
    content: "";
    background-color: #fff;
    border: #adb5bd solid 1px;
    box-sizing: border-box;
  }
  .option_label::before {
    border-radius: 2px;
  }
  .option_label::after {
    position: absolute;
    top: 4px;
    left: -1.5rem;
    display: block;
    width: 1rem;
    height: 1rem;
    content: "";
    background: no-repeat 50%/50% 50%;
  }
  .option_input:checked ~ .option_label::before {
    color: #fff;
    border-color: #007bff;
    background-color: #007bff;
  }
  .option_input:checked ~ .option_label::after {
    background-image: url(../image/check.png);
  }
  .OptionWrap .votebox {
    width: 100%;
    height: 26px;
    background: #fff;
    border: 1px solid #bababa;
    border-radius: 3px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 7px;
    font-size: 16px;
    color: #000000;
    font-weight: bold;
    text-transform: uppercase;
  }
  .OptionWrap .votepersentage {
    color: #5a5a5a;
    font-size: 14px;
    margin-top: 4px;
  }
  .OptionWrap .votebox .progressbar {
    left: 0px;
    position: absolute;
    background: #ededed;
    height: 100%;
  }
  .OptionWrap .votebox .txt {
    position: relative;
    z-index: 9;
  }

  .liveOption .commentWrapper {
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: -12px;
    width: 100%;
    left: 0;
    padding: 0 28px;
  }
  .liveOption .commentWrapper .btn {
    background: #0000ff;
    color: #fff;
    font-size: 12px;
    line-height: 18px;
    padding: 2px 20px;
  }

  .liveUpdatesSlider {
    width: 100%;
    position: relative;
    box-sizing: border-box;
    background: #0a2040;
    padding: 28px 0 0;
  }
  .liveUpdatesSlider .heading_box {
    border: 1px solid #0a2040;
    display: table;
    margin-left: auto;
    margin-right: auto;
    margin-top: -37px;
    margin-bottom: 16px;
    background: #fff;
    font-size: 12px;
    line-height: 18px;
    color: #0000ff;
    text-transform: uppercase;
    font-weight: bold;
    padding: 1px 16px;
  }
  .liveUpdatesSlider * {
    box-sizing: inherit;
  }
  .liveUpdatesSlider .glide__track {
    overflow: hidden;
  }
  .liveUpdatesSlider .glide__slides {
    position: relative;
    width: 100%;
    list-style: none;
    backface-visibility: hidden;
    transform-style: preserve-3d;
    touch-action: pan-Y;
    overflow: hidden;
    padding: 0;
    white-space: nowrap;
    display: flex;
    flex-wrap: nowrap;
    will-change: transform;
  }
  .liveUpdatesSlider .glide__slides--dragging {
    user-select: none;
  }
  .liveUpdatesSlider .glide__slide {
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    white-space: initial;
    user-select: none;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
  }
  .liveUpdatesSlider .glide__slide a {
    user-select: none;
    -webkit-user-drag: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
  .liveUpdatesSlider .glide__arrows {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 19px 0;
  }
  .liveUpdatesSlider .glide__bullets {
    -webkit-touch-callout: none;
    user-select: none;
    text-align: center;
    display: flex;
  }
  .liveUpdatesSlider .glide__bullets button:focus {
    outline: none;
  }
  .liveUpdatesSlider .glide__bullets button.glide__bullet {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    border: 0;
    background: #ffffff;
    margin: 0 5px;
    padding: 0;
  }
  .liveUpdatesSlider
    .glide__bullets
    button.glide__bullet.glide__bullet--active {
    background: #e1261d;
    width: 6px;
    height: 6px;
  }
  .liveUpdatesSlider .glide--rtl {
    direction: rtl;
  }
  .liveUpdatesSlider .left-arrow {
    width: 16px;
    height: 16px;
    position: relative;
    font-size: 0;
    margin-right: 40px;
  }
  .liveUpdatesSlider .left-arrow:before {
    content: "";
    border-top: 2px solid #959595;
    border-left: 2px solid #959595;
    width: 8px;
    height: 8px;
    -webkit-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
    position: absolute;
    left: 2px;
    top: 3px;
  }
  .liveUpdatesSlider .left-arrow:after {
    content: "";
    width: 16px;
    height: 2px;
    background-color: #959595;
    display: block;
    left: 0;
    position: absolute;
    top: 7px;
  }
  .liveUpdatesSlider .right-arrow {
    position: relative;
    font-size: 0;
    width: 16px;
    height: 16px;
    margin-left: 40px;
  }
  .liveUpdatesSlider .right-arrow:after {
    content: "";
    width: 14px;
    height: 2px;
    background-color: #959595;
    display: block;
    left: 0;
    position: absolute;
    top: 6px;
  }
  .liveUpdatesSlider .right-arrow:before {
    content: "";
    border-top: 2px solid #959595;
    border-left: 2px solid #959595;
    width: 8px;
    height: 8px;
    -webkit-transform: rotate(132deg);
    -ms-transform: rotate(132deg);
    transform: rotate(132deg);
    position: absolute;
    top: 2px;
    left: 5px;
    background: transparent;
  }
  .liveUpdatesSlider .glide__slide a .image {
    display: block;
    margin-bottom: 10px;
    border: 1px solid #fff;
  }
  .liveUpdatesSlider .glide__slide a .image img {
    display: block;
    width: 100%;
  }
  .liveUpdatesSlider .glide__slide a .text {
    color: #fff;
    text-align: center;
    font-size: 16px;
    line-height: 20px;
  }
  .hide {
    display: none;
  }

  .rmc {
    width: 100%;
    background: #5a5a5a;
    margin-top: 10px;
  }
  .rmc .readMoreHeading {
    background: #0a2040;
    color: #fff;
    padding: 10px;
    text-transform: uppercase;
    font-size: 16px;
  }
  .rmc .rmc {
    color: #fff;
    color: #fff;
    padding: 10px;
  }
  .rmc .rmc p {
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 15px;
  }
  .new_count {
    position: fixed !important;
    top: 0;
    left: 0;
    right: 0;
    align-items: center;
    z-index: 9999;
  }
  .updateBtn a {
    font-size: 14px;
    color: red;
    padding: 6px 10px;
    border: 1px solid;
    font-weight: bold;
    border-radius: 20px;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background: #fff;
    cursor: pointer;
  }

  .LiveBlog_shortDis p {
    font-size: 14px;
    color: #5a5a5a;
    line-height: 18px;
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    color: #404040;
    font-size: 18px;
    line-height: 28px;
    font-weight: bold;
  }
  .ad-container {
    position: relative;
    padding: 16px 0;
    line-height: 0;
    text-align: center;
    background: #dbdde3 !important;
    z-index: 1;
    min-height: 290px;
  }
  ul.art_social_share {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    width: 100%;
  }
  ul.art_social_share li {
    color: #6b6b6b;
    font-size: 14px;
    margin-left: 15px;
    text-transform: uppercase;
    line-height: 0;
    background-color: #ccc;
  }
  ul.art_social_share li:first-child {
    margin-left: 0px;
  }

  .spriteshare {
    background: url(/images/siteimages/sprite_img_1.svg)
      0 0 no-repeat;
    width: 40px;
    height: 40px;
    display: block;
  }
  .spriteshare.art-facebook-icon {
    background-position: 0px 0px;
  }
  .spriteshare.art-twitter-icon {
    background-position: 0px -50px;
  }
  .spriteshare.art-linkedin-icon {
    background-position: 0px -100px;
  }
  .spriteshare.art-whatsapp-icon {
    background-position: 0px -150px;
  }
  .spriteshare.art-telegram-icon {
    background-position: 0 -200px;
  }
  .spriteshare.art-email-icon {
    background-position: 0 -250px;
  }
  .topDate {
    font-family: mukta;

    font-size: 12px;
    line-height: 22px;
    color: #959595;
    margin-bottom: 20px;
    border-bottom: 5px solid #0a2040;
    display: block;
    padding-bottom: 8px;
    display: flex;
  }

  .topDate li:first-child {
    padding-right: 5px;
  }

  .sprite_cls {
    background-image: url(/images/siteimages/live-blog-sprite.png);
    width: 35px;
    height: 34px;
    background-repeat: no-repeat;
  }

  .sprite_cls {
    width: 24px;
    height: 20px;
    background-position: -340px -4px;
  }

  .LiveNowWrap {
    font-size: 13px;
    line-height: 19px;
    outline: 0;
    margin: 0;
    box-sizing: border-box;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    padding: 8px 10px;
    // border-top: 1px dotted #939393;
    -webkit-box-align: center;
    align-items: center;
  }

  .refresh-box {
    font-size: 13px;
    line-height: 19px;
    outline: 0;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    margin-left: auto;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
  }

  .autoRegreshBrder {
    font-size: 13px;
    line-height: 19px;
    outline: 0;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border-top: 0.5px solid #dddddd;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .refresh-box .rfs-h {
    font-size: 14px;
    text-transform: uppercase;
    margin-right: 10px;
    color: #0a2040;
    font-weight: bold;
  }

  .auto-switch {
    position: relative;
    display: inline-block;
    width: 56px;
    height: 24px;
  }

  .auto-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  input.on + .auto-slider::before {
    background-color: #33800b;
  }

  .auto-slider {
    border-radius: 34px;
    position: absolute;
    border: 1px solid #11203e;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f5f5f5;
    -webkit-transition: 0.4s;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    font-size: 12px;
    text-transform: uppercase;
    color: #484848;
    padding-left: 4px;
  }

  .auto-switch .switchOn {
    width: 50%;
    padding-right: 8px;
    margin-left: auto;
    text-align: center;
  }

  .auto-refresh {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: mukta;
  }

  .input.on + .auto-slider::before {
    background-color: #33800b;
  }

  input.on + .auto-slider:before {
    -webkit-transform: translateX(0px);
    -ms-transform: translateX(0px);
    transform: translateX(0px);
  }

  .auto-slider:before {
    -webkit-transform: translateX(30px);
    -ms-transform: translateX(30px);
    transform: translateX(30px);
    border-radius: 50%;
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: #ff0000;
    -webkit-transition: 0.4s;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .rmc a {
    color: yellowgreen;
  }

  .auto-slider .switchOff {
    padding: 0px;
  }
  .twitter-tweet {
    margin: 0 auto !important;
  }
  .instagram-media {
    margin: 0 auto!important;
    min-width: 100% !important;
    max-width: 100% !important;
    width: calc(100% - 2px) !important;
    overflow: hidden;
  }
  .twitter-tweet iframe{
    margin: 0 auto!important;
    min-width: 100% !important;
    max-width: 100% !important;
    width: 100% !important;
    overflow: hidden;
  }
  .feedBox_outer {
    overflow: hidden;
  }
  .TstoryImg {
    text-align: center;
  }
  .TstoryImg > div {
    width: 100%;
  }
  .related_nws_sec {
    background: #3e3e3e;
    margin: 0px -15px 20px;
  }
  .rltd_nws_hdng {
    font-size: 18px;
    justify-content: center;
    line-height: 18px;
    padding-top: 5px;
    height: 36px;
    color: #fff;
    font-weight: bold;
    font-family: "Mukta", sans-serif !important;
    background-color: #e1261d;
    display: flex;
    align-items: center;
  }
  .rltd_lists_sldr {
    display: flex;
    padding: 15px;
  }
  .rltd_lists_sldr li {
    flex-shrink: 0;
    border: 1px solid #9b9b9b;
    overflow: hidden;
  }
  .rltd_lists_sldr_img {
    overflow: hidden;
  }
  .rltd_lists_sldr_img img {
    width: 100%;
    display: block;
  }
  .rltd_lists_sldr p {
    margin-bottom: 0px;
    color: #fff;
    font-size: 15px;
    background: #1a1a1a;
    line-height: 1.5;
    padding: 8px;
    font-weight: bold;
    font-family: "Mukta", sans-serif !important;
    text-align: left;
    height: 120px;
  }
  .rltd_lists_sldr li:last-child {
    margin-right: 0px;
  }

  .related_nws_slidr {
    width: 100%;
    overflow: hidden;
  }
  .related_nws_slidr .glide__bullets {
    display: inline-flex;
    justify-content: center;
    position: relative;
    top: -8px;
    margin: 0 auto;
    text-align: center;
    left: 50%;
    right: 50%;
    transform: translate(-50%, -50%);
  }
  .related_nws_slidr .glide__bullets button.glide__bullet {
    width: 6px;
    height: 6px;
    background: #bababa;
    display: block;
    margin-right: 8px;
    border-radius: 50%;
    overflow: hidden !important;
    outline: none;
    border: none;
    cursor: pointer;
  }
  .related_nws_slidr .glide_arroe_buttons {
    position: relative;
    top: 17px;
    display: flex;
    justify-content: space-between;
    padding: 0px 70px;
  }

  .related_nws_slidr .left-arrow,
  .related_nws_slidr .right-arrow {
    width: 15px;
    height: 15px;
    transform: translate(0, -50%);
  }
  .related_nws_slidr .left-arrow::before {
    content: "";
    border-top: 2px solid #fff;
    border-left: 2px solid #fff;
    width: 8px;
    height: 8px;
    transform: rotate(-45deg);
    position: absolute;
    left: 2px;
    top: 3px;
  }
  .related_nws_slidr .left-arrow::after {
    content: "";
    width: 10px;
    height: 2px;
    background: #fff;
    position: absolute;
    left: 3px;
    top: 7px;
  }

  .related_nws_slidr .right-arrow::before {
    content: "";
    border-bottom: 2px solid #fff;
    border-right: 2px solid #fff;
    width: 8px;
    height: 8px;
    transform: rotate(-45deg);
    position: absolute;
    right: 2px;
    top: 3px;
  }
  .related_nws_slidr .right-arrow::after {
    content: "";
    height: 2px;
    width: 10px;
    position: absolute;
    right: 3px;
    top: 7px;
    background: #fff;
  }
  .glide__bullets .glide__bullet--active {
    background: #e1261d !important;
    border-radius: 5px !important;
    width: 18px !important;
  }
  .tops {
    margin-top: 15px;
  }
  .button-up {
    bottom: 108px;
    right: 30px;
    z-index: 999;
    font-size: 18px;
    border: none;
    outline: none;
    background-color: red;
    color: white;
    cursor: pointer;
    padding: 15px;
    border-radius: 4px;
    height: 40px;
    width: 45px;
    position: fixed;
    display: none;
  }

  .button-up:hover {
    transform: translate3d(0, -10px, 0);
    cursor: pointer;
  }

  .button-up::after {
    content: "";
    position: relative;
    z-index: 11;
    display: block;
    width: 15px;
    height: 15px;
    border-top: 2px solid #fff;
    border-left: 2px solid #fff;
    transform: rotate(45deg);
  }
  .LiveBlog_shortDis a {
    color: #ed2128;
    display: block;
    text-align: center;
  }
  .feedsWrapper .tabs li a {
    padding: 10px 15px 5px 15px;
  }
  .LiveBlog_shortDis {
    margin-top: 10px;
  }
  .rmc .rmc p {
    font-size: 15px;
    line-height: 26px;
    margin-bottom: 20px;
  }
  .autoRegreshBrder {
    display: none;
  }
  .feedBox_outer table {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .feedBox_outer table td {
    padding: 8px;
    vertical-align: top;
    font-size: 14px;
    border: 1px solid #eee;
    text-align: left;
  }
  .feedBox_outer table tr:first-of-type td {
    background: #666;
    color: #fff;
    font-weight: bold;
  }
  .feedBox_outer table {
    width: 100%;
    border-collapse: collapse;
    overflow: scroll;
    display: block;
  }

  .live_feed_intro img,
  .live_feed_intro figure {
    width: 100% !important;
    height: auto;
  }

  .feed_inner .feed_cont img,
  .feed_inner .feed_cont p img {
    width: 100% !important;
    height: auto;
  }
  .nw18boardresultdiv iframe {
    height: 650px !important;
  }
  .feedBox_outer .feed_inner p a {
    color: #e1261d;
}
.feed_inner .feed_cont ul, .feed_inner .feed_cont ol {
  margin: 0 1em;
}
.feed_inner .feed_cont li {
  list-style: inherit;
}
.feed_inner .feed_cont ul {
  list-style: disc;
}
.feed_inner .feed_cont ol {
  list-style: decimal;
}
.feed_inner .feed_cont p iframe {
  min-width: 100%;
  min-height: 360px;
  max-width: 100%;   
  overflow: scroll !important;    
}
// .feed_inner .feed_cont p iframe {
//   height: auto;
// }

.contnt_img img, .contnt_img figure, .contnt_img div {
  display: block;
  max-width: 100%;
  border-radius: 0 !important;
}
.contnt_img iframe {
  width: 100% !important;
}
.L_wrap{margin-bottom:30px;}
.al_sldr .slide:focus::after, .al_sldr .slide:hover::after{ content: ""; background-color: #EC2128;}
.al_sldr .slide:hover .name{text-decoration: underline;}

.live_feed_intro ol, .live_feed_intro ul {
  margin: initial;
  padding: 0 0px 0 30px;
}
.live_feed_intro ul li {
  list-style: initial;
}
.live_feed_intro ol li {
  list-style: decimal;
  margin: initial;
  padding: 0 10px;
}
.mimg-vdo {display: table;margin: 0 auto;}

`;