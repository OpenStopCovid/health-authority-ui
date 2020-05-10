import Link from 'next/link'
import { useTranslation, initReactI18next } from 'react-i18next';

const MUI_Title = () => {

    const { t } = useTranslation();

    return (

          <Link href="/#home">
            <a className="navbar__home">
            {t('$home_label')}
            </a>
           </Link>

    )

}

export default MUI_Title
