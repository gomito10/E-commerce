export default function BlogLeyout({children}){
  return (
  <>
  <header>Cabecera</header>
    <main>{children}</main>
  <footer>pie de la página de blog</footer>
  </>
  );
  }