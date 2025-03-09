export default function BlogLeyout({children}){
  return (
  <>
  <header>Cabecera de blog</header>
    <main>{children}</main>
  <footer>pie de la página de blog</footer>
  </>
  );
  }