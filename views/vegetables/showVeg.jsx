const React = require("react");
const Nav = require("../components/Nav");

class ShowVeg extends React.Component {
  render() {
    const vegetables = this.props.vegetables;

    return (
      <div>
        <Nav link="/vegetables" text="Home" />
        <h1> Show Page </h1>
        The {vegetables.name} is {vegetables.color} <br />
        {vegetables.readyToEat
          ? "Its is ready to eat"
          : "It is not ready to eat... Cant touch this"}
      </div>
    );
  }
}

module.exports = ShowVeg;
