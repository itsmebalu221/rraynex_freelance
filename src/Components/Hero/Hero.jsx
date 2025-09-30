
export default function Hero(props) {
  return (
    <section className="products-hero">
        <div className="products-hero-content">
          <h1 className="products-hero-title">
            {props.title}
          </h1>
          <p className="products-hero-lead">
           {props.subtitle}
          </p>
          <div className="products-hero-cta">
            <a className="btn-primary" href={props.plink}>{props.ptitle}</a>
            <a className="btn-outline" href={props.slink} target="_blank" rel="noreferrer">{props.stitle}</a>
          </div>
        </div>
      </section>
  );
}