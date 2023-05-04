const React = require("react");
const DefaultLayout = require("../layout/Default");

class Show extends React.Component {
  render() {
    //getting props from show-res.render obj props
    const fruit = this.props.fruit;
    return (
      <DefaultLayout title="Your New Fruit" link="/fruits" text="Home">
        The {fruit.name} is {fruit.color} <br />
        {fruit.readyToEat
          ? "Its is ready to eat"
          : "It is not ready to eat... Cant touch this"}
        <br />
      </DefaultLayout>
    );
  }
}

module.exports = Show;
