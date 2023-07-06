import "../Footer/Footer.css";
const Footer = () => {
  const year = new Date().getFullYear();

  return <footer>{`Copyright © Mern Stack Code ${year}`}</footer>;
};

export default Footer;