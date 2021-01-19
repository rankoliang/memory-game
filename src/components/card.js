function Card({ img: { src, alt }, caption }) {
  return (
    <div className="card">
      <img src={src} alt={alt} />
      <figcaption>{caption}</figcaption>
    </div>
  );
}

export default Card;
