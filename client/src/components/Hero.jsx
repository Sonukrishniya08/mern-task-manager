function Hero(props) {
  return (
    <div className="hero">
      <h1>{props.title}</h1>

      <p>{props.subtitle}</p>
    </div>
  );
}

export default Hero;