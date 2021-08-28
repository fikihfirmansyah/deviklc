import styles from './footer.module.scss';
import Brand from './footerViewBrand';
import Social from './footerViewSocial';
import CS from './footerViewCS';
import Legal from './footerViewLegal';
import Engine from './footerViewEngine';

const presenter = () => {
  const companyName = 'My Company';
  const companyEmail = 'support@my-company.com';
  const companyAddress = (
    <>
      Some Place in the World <br /> where My Company can Prosper
    </>
  );
  const companyPhone = '+00-000-0000-0000';
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Brand image="/assets/LogoPlace_420x160.png" name={companyName} />
        <Social
          fb_url="https://facebook.com"
          tw_url="https://twitter.com"
          insta_url="https://instragram.com"
          linkedin_url="https://linkedin.com"
          youtube_url="https://youtube.com"
        />
        <CS email={companyEmail} address={companyAddress} phone={companyPhone} />
        <Legal name={companyName} terms_url="/terms" privacy_url="/privacy" />
        <Engine />
      </div>
    </footer>
  );
};

export default presenter;
