import { useTranslation } from 'react-i18next';
import MUI_Login, {MUI_LoginSection} from './login'

const SectionTitle = (props) => {

    const { t } = useTranslation();

    return (

      <div className="container container">
        <h1 className="section__title">
          {t('$title_label')}
        </h1>
        <p className="section__subtitle">
          {t('$subtitle_label_part1')}
          {t('$subtitle_label_part2')}
          {t('$subtitle_label_part3')}.
        </p>
        <MUI_LoginSection LOGIN_URL={props.LOGIN_URL}></MUI_LoginSection>
      </div>

    )

}

export default SectionTitle
