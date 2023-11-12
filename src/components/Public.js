import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    // section that has: a header with a h1 thats a welcome section, a main that talks about the address, and a footer that has a link to the login page so this will be the splash page when someone looks for this app but how about the other one we created?
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">Dan D. Repairs!</span>
        </h1>
      </header>
      <main className="public__main">
        <p>
          Located in Beautiful Downtown Foo City, Dan D. Repairs provides a
          trained staff ready to meet your tech repair needs.
        </p>
        <address className="public__addr">
          Dan D. Repairs
          <br />
          555 Foo Drive
          <br />
          Foo City, CA 12345
          <br />
          <a href="tel:+15555555555">(555) 555-5555</a>
        </address>
        <br />
        <p>Owner: Dan Davidson</p>
      </main>
      <footer>
        {/* used react router link here to a /login path so under the public we have a login page and we need a component to show when someone goes to that path */}
        <Link to="/login">Employee Login</Link>
      </footer>
    </section>
  );
  return content;
};
export default Public;

// this page just gives info about the website and an address and then allows users to go to the login page
