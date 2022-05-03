import Document, {
    Html,
    Head,
    Main,
    NextScript,
  } from 'next/document'
  
  class MyDocument extends Document {
    static async getInitialProps(ctx:any) {
      const initialProps = await Document.getInitialProps(ctx)
  
      return initialProps
    }
  
    render() {
      return (
        <Html>
          <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="Movie guessing game derived from the wordle fad"/>
          <link href="https://fonts.googleapis.com/css2?family=Francois+One&family=Gidugu&family=Hind+Madurai:wght@600&display=swap" rel="stylesheet" />
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      )
    }
  }
  
  export default MyDocument