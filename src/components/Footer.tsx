import GithubLogo from "../assets/logos/githublogo.svg";
import FigmaLogo from "../assets/logos/figmalogo.svg";

const Footer = () => {
  return (
    <footer>
      <p>Ankieta na teraz - wszystkie prawa zastrzeżone.</p>
      <div>
        <figure>
          <img src={GithubLogo} alt="github logo" />
          <p>Github</p>
        </figure>
        <span>|</span>
        <figure>
          <img src={FigmaLogo} alt="figma logo" />
          <p>Figma</p>
        </figure>
      </div>
    </footer>
  );
};

export default Footer;
