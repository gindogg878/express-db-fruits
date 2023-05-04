const React = require("react");
const DefaultLayout = require("../layout/Default");

class Index extends React.Component {
  render() {
    const { fruits } = this.props;
    return (
      <DefaultLayout
        title="Fruit Index Page"
        link="/fruits/new"
        text="Create a Fruit"
      >
        <ul>
          {fruits.map((fruit, i) => {
            return (
              <li key={i}>
                The <a href={`/fruits/${fruit._id}`}>{fruit.name}</a> is{" "}
                {fruit.color} <br></br>
                {fruit.readyToEat
                  ? `It is ready to eat`
                  : `It is not ready to eat`}
                <br />
                <a href={`/fruits/${fruit._id}/edit`}>Edit this fruit</a>
                {/*delete button ,use form because we need to make request to database, we cant use handleclick in server side*/}
                {/*forms can only make post and get methods */}
                <form
                  action={`/fruits/${fruit._id}?_method=DELETE`}
                  method="POST"
                >
                  <input type="submit" value="DELETE" />
                </form>
              </li>
            );
          })}
        </ul>
      </DefaultLayout>
    );
  }
}

module.exports = Index;
