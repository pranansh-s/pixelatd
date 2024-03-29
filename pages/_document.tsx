import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Poster/Movie guessing game, where you guess movies from their blurred posters and genres. Based along the wordle games, play it endlessly and increase your knowledge."
          />
          <meta
            name="keywords"
            content="movie, poster, poster guessing, wordle, wordle games, wordle like, movie guess, poster guess, games, movie knowledge, movie quiz, poster quiz, quiz, fun"
          />
          <meta property="og:title" content="Pixelatd" />
          <meta
            name="google-site-verification"
            content="GL83bwDes4GKEoNh1nM55lYwcAStf1a5dxKYgpvqtbQ"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Francois+One&family=Gidugu&family=Hind+Madurai:wght@600&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
