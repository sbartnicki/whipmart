import './style.scss';

const Loader = () => {
  // Generating 10 divs that will be animated via scss
  const generateDivs = () => {
    const divs = [];
    for (let i = 0; i < 10; i++) {
      divs.push(<div key={i} className="wave"></div>);
    }
    return divs;
  };

  return <div className="loading">{generateDivs()}</div>;
};

export default Loader;
