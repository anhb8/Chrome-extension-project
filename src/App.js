import Header from "./component/Header/Header";
import Body from "./component/Body/Body";
import Footer from "./component/Footer/Footer";
import classes from "./App.module.css";

function App() {
  return (
      <div className={classes.background}>
        <Header />
        <Body />
        <Footer />
      </div>
  );
}

export default App;
