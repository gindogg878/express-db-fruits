const React = require("react");
const Nav = require("../components/Nav");

class IndexVeg extends React.Component {
  render() {
    const { vegetables } = this.props;
    return (
      <div>
        <Nav link="/vegetables/new" text="Create Vegetable" />
        <Nav link="/fruits" text="See fruits" />
        <h1>Vegetables Index Page</h1>
        <ul>
          {vegetables.map((vegetable, i) => {
            return (
              <li link={i}>
                The{" "}
                <a href={`/vegetables/${vegetable._id}`}>{vegetable.name}</a> is{" "}
                {vegetable.color} <br></br>
                {vegetable.readyToEat
                  ? `It is ready to eat`
                  : `It is not ready to eat`}
                <br />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

module.exports = IndexVeg;
