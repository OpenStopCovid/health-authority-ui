import Head from 'next/head'

const MUI_Head = () => {

    return (
        <Head>
          <title>
            Interface professionnel de santé | génération d'un code de validation
          </title>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="Génération d'un code de validation à destination des patients diagnostiqué covid-19, afin qu'ils puisse valider leur état de contaminé par le biais de leur application de contact tracing"
          />
         <link
           href="https://unpkg.com/template.data.gouv.fr@1.3.1/dist/main.min.css"
           rel="stylesheet"
         />
         <link href="/style.css" rel="stylesheet" />
        <script src="qrcode.js"></script>
       </Head>
    )
}




export default MUI_Head
