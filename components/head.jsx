import Head from 'next/head'
import { useTranslation } from 'react-i18next';

const MUI_Head = () => {

    const { t } = useTranslation();

    return (

      <Head>
        <title>
          {t('$home_label')}
        </title>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content={t('$site_description')}/>
        <link
          href="https://unpkg.com/template.data.gouv.fr@1.3.1/dist/main.min.css"
          rel="stylesheet"/>
        <link href="/style.css" rel="stylesheet" />
        <script src="qrcode.js"></script>
      </Head>

    )
}

export default MUI_Head
