import GithubLogo from "../assets/logos/githublogo.svg";
import FigmaLogo from "../assets/logos/figmalogo.svg";

const Footer = () => {
  return (
    <footer>
      <p>Ankieta na teraz - wszystkie prawa zastrzeżone.</p>
      <div>
        <a href="https://github.com/Szymi76/survey-app-2.0" target={"_blank"}>
          <img src={GithubLogo} alt="github logo" />
          <p>Github</p>
        </a>
        <span>|</span>
        <a
          href="https://www.figma.com/file/WkmbpZJGX4KYsdNoPuoUJT/Ankieta-na-teraz?t=k0wezkJTgA1O3sB4-0"
          target={"_blank"}
        >
          <img src={FigmaLogo} alt="figma logo" />
          <p>Figma</p>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
