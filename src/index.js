import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      course: "",

    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitCourse = this.handleSubmitCourse.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();       /* "method tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be " */
  }

  handleSubmitCourse(event) {
    event.preventDefault();
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleChangeCourse = event => {
    this.setState({ course: event.target.value });
  };

  getUnique(arr, comp) {
    const unique = arr
      //lagra olika jämförelse-värden i en array
      .map(e => e[comp])

      // lagra nycklar för unika objekt *tror ej detta används nu*
      .map((e, i, final) => final.indexOf(e) === i && i)

      // ta bort döda nycklar och lägg till unika objekt *osäker om detta används *
      .filter(e => arr[e])

      .map(e => arr[e]);

    return unique;
  }

  componentDidMount() {   
    const courses = require("./courses.json");    /*Hämtar information från min json fil.*/
    this.setState({ courses: courses });          /*lägger den i variable courses.*/
  }

  render() {
    const uniqueCouse = this.getUnique(this.state.courses, "tag");

    const courses = this.state.courses;
    const course = this.state.course;


    const filterDropdown = courses.filter(function(result) {
      return result.tag === course;
    });

    return (
      <div>
        <form onSubmit={this.handleSubmitCourse}>
          <br />
          <label>
            Välj din utbildning för att få HETA tips från andra.
            <select
              value={this.state.course}
              onChange={this.handleChangeCourse}
            >
              {uniqueCouse.map(course => (
                <option key={course.id} value={course.tag}>
                  {course.tag}
                </option>
              ))}
            </select>
          </label>
          <input type="submit" value="Välj" />
          <div>
            {filterDropdown.map(course => (                 
              <div key={course.id} style={{ margin: "10px" }}>
                Studerar: {course.course}
                <br/>
                Ålder: {course.ålder}
                <br />
                Bästa studietips: {course.info}
              </div>
            ))}
          </div>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));