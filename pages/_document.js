// pages/_document.js

import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com/" />

          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <link href="https://fonts.googleapis.com/css2?family=Bungee+Shade&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Acme&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet" /> 
          <link href="https://fonts.googleapis.com/css2?family=Roboto+Serif:ital,wght@0,100;0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>

          </Head>

        <body>
          <Main />
          <div id='myportal' />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
