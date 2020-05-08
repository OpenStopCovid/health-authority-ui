import MUI_Login, {MUI_LoginSection} from './login'


const SectionTitle = () => {

    return (

      <div className="container container">
        <h1 className="section__title">
          Générer un code de validation pour l'application de contact tracing
        </h1>
        <p className="section__subtitle">
          Ce code de validation est à transmettre au patient que vous venez de
          diagnostiquer covid+, afin qu'il puisse déclarer son statut de malade
          dans son application de contact tracing.
        </p>
        <MUI_LoginSection></MUI_LoginSection>
      </div>

    )

}



export default SectionTitle
