function Carousel ({ images }) {
  return (
    <div className="carousel">
      {images.map((image, index) => (
        <img key={index} src={image} alt={`carousel-${index}`} style={{
          width: '100%',
          height: 200,
          objectFit: 'cover'
        }} />
      ))}
    </div>
  );
}

export default Carousel;
